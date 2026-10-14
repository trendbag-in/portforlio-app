import { useEffect, useState } from 'react';

const clamp01 = (n) => Math.min(1, Math.max(0, n));
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --p: 0 as the element enters the viewport bottom, 1 as it leaves the top.
// --t: share of a viewport its top has scrolled past (0 until it reaches the top).
const writeProgress = (el) => {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  el.style.setProperty('--p', clamp01((vh - r.top) / (vh + r.height)).toFixed(4));
  el.style.setProperty('--t', clamp01(-r.top / vh).toFixed(4));
};

// Runs `write(el)` once per frame while the element is on screen. CSS reads the vars,
// gated behind prefers-reduced-motion, so this never runs for users who opted out.
export function useScrollProgress(ref, write = writeProgress) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    let raf = 0;
    let visible = false;
    const frame = () => { raf = 0; write(el); };
    const schedule = () => { if (visible && !raf) raf = requestAnimationFrame(frame); };
    // Also writes on exit, so a fast fling still lands on the final state.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!raf) raf = requestAnimationFrame(frame);
    });

    io.observe(el);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref, write]);
}

// Steps an index through 0..n-1 every `ms` while not paused. Never ticks for
// reduced-motion users, who keep the first frame and can still step by hand.
export function useCycle(n, ms, paused = false) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms, paused]);
  return [i, setI];
}

const TILT_VARS = ['--rx', '--ry', '--gx', '--gy'];

// Mouse-only pointer tilt: writes --rx/--ry (deg) and --gx/--gy (glare position) on the element.
export const tilt = {
  onPointerMove(e) {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${((0.5 - y) * 10).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((x - 0.5) * 12).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
  },
  onPointerLeave(e) {
    TILT_VARS.forEach((v) => e.currentTarget.style.removeProperty(v));
  }
};

export const SPOTLIGHT = '.tb-tile, .cx-store, .term-card, .stack-card, .persona-card';

// Mouse-only: writes the pointer position relative to each on-screen card as --mx/--my,
// once per frame, so nearby card edges catch the light.
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    let raf = 0;
    let x = 0;
    let y = 0;
    const frame = () => {
      raf = 0;
      document.querySelectorAll(SPOTLIGHT).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        el.style.setProperty('--mx', `${(x - r.left).toFixed(0)}px`);
        el.style.setProperty('--my', `${(y - r.top).toFixed(0)}px`);
      });
    };
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);
}

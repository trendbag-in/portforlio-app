import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LOOKS } from '../../data/looks';
import { prefersReducedMotion } from '../../hooks/motion';
import './Intro.css';

// Cut lengths (ms) for the reel of looks through the letters: fast, then slowing to a hold.
const CUTS = [60, 60, 60, 60, 60, 70, 70, 80, 90, 110, 130, 160, 210, 600];
const EXIT_MS = 1100;

const setIntro = (v) => { document.documentElement.dataset.intro = v; };

/* Opening title: letterboxed black, the wordmark with a reel of real looks cutting
   through its letters, then the camera pushes through the word into the page.
   Any click, key or scroll skips straight to the exit. */
const Intro = () => {
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? 'done' : 'reel'));
  const [frame, setFrame] = useState(0);
  const loaded = useRef(new Set());

  useLayoutEffect(() => {
    if (phase === 'done') return undefined;
    setIntro('on');
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, [phase]);

  useEffect(() => {
    LOOKS.forEach((l, i) => {
      const img = new Image();
      img.onload = () => loaded.current.add(i);
      img.src = l.src;
    });
  }, []);

  // Each cut moves to the next look that has loaded; unloaded ones are skipped.
  useEffect(() => {
    if (phase !== 'reel') return undefined;
    let step = 0;
    let at = 0;
    let t;
    const cut = () => {
      if (step >= CUTS.length) { setPhase('exit'); return; }
      for (let k = 1; k <= LOOKS.length; k += 1) {
        const next = (at + k) % LOOKS.length;
        if (loaded.current.has(next)) { at = next; break; }
      }
      setFrame(at);
      t = setTimeout(cut, CUTS[step]);
      step += 1;
    };
    t = setTimeout(cut, 350);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exit') return undefined;
    setIntro('done');
    const t = setTimeout(() => setPhase('done'), EXIT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'reel') return undefined;
    const skip = () => setPhase('exit');
    const opts = { once: true, passive: true };
    window.addEventListener('pointerdown', skip, opts);
    window.addEventListener('keydown', skip, opts);
    window.addEventListener('wheel', skip, opts);
    window.addEventListener('touchmove', skip, opts);
    return () => ['pointerdown', 'keydown', 'wheel', 'touchmove'].forEach((e) => window.removeEventListener(e, skip));
  }, [phase]);

  if (phase === 'done') return null;

  const look = LOOKS[frame];
  return (
    <div className={`intro is-${phase}`} aria-hidden="true">
      <div className="intro-bar intro-bar--top" />
      <div className="intro-stage">
        <p
          className="intro-word"
          style={loaded.current.size ? { backgroundImage: `url(${look.src})`, backgroundPosition: `50% ${look.fy}%` } : undefined}
        >
          trendbag
        </p>
        <p className="intro-kicker">Fashion <span>/</span> Social <span>/</span> Shoppable</p>
      </div>
      <div className="intro-bar intro-bar--bottom" />
    </div>
  );
};

export default Intro;

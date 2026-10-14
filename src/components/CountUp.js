import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/motion';

const inr = (n) => n.toLocaleString('en-IN');

// Counts from 0 to `to` once, the first time it scrolls into view.
const CountUp = ({ to, prefix = '', format = inr }) => {
  const ref = useRef(null);
  const [v, setV] = useState(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1200);
        setV(Math.round(to * (1 - (1 - k) ** 3)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  return <span ref={ref} className="tb-num">{prefix}{format(v)}</span>;
};

export default CountUp;

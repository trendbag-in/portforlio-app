import React, { useCallback, useRef } from 'react';
import { useScrollProgress } from '../../hooks/motion';
import './Pinned.css';

const STICK_TOP = 72; // navbar height
const clamp01 = (n) => Math.min(1, Math.max(0, n));

/* Holds its content on screen for `extra` svh of scrolling so a scroll-driven scene
   plays out in full before the page moves on. Writes --pin (0 → 1) for the CSS and
   passes it to onPin. Reduced motion: no hold, --pin stays unset. */
const Pinned = ({ extra = 100, onPin, className = '', children }) => {
  const track = useRef(null);
  const write = useCallback((el) => {
    const r = el.getBoundingClientRect();
    const pin = clamp01((STICK_TOP - r.top) / Math.max(1, r.height - el.firstElementChild.offsetHeight));
    el.style.setProperty('--pin', pin.toFixed(4));
    if (onPin) onPin(pin);
  }, [onPin]);
  useScrollProgress(track, write);

  return (
    <div className={`pin-track ${className}`} ref={track} style={{ '--extra': extra }}>
      <div className="pin-sticky">{children}</div>
    </div>
  );
};

export default Pinned;

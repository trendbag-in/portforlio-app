import React, { useCallback, useRef, useState } from 'react';
import { useScrollProgress, prefersReducedMotion } from '../../hooks/motion';
import './StackDeck.css';

// Navbar height; must match .stack-sticky { top } in StackDeck.css.
const STICK_TOP = 72;

/* A pile of cards that deals itself as the page scrolls. The track is tall; a
   full-width band (copy, deck and parallax backdrop) stays pinned inside it, and
   --pin (0 → 1) decides which card is on top. Reduced-motion users get a short
   track and step through by clicking instead. */
const StackDeck = ({ items, renderCard, header, footer, label, aside, backdrop }) => {
  const track = useRef(null);
  const n = items.length;
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(null);

  const write = useCallback((el) => {
    const r = el.getBoundingClientRect();
    const stuck = el.firstElementChild.offsetHeight;
    const pin = Math.min(1, Math.max(0, (STICK_TOP - r.top) / Math.max(1, r.height - stuck)));
    el.style.setProperty('--pin', pin.toFixed(4));
    setActive(Math.round(pin * (n - 1)));
  }, [n]);
  useScrollProgress(track, write);

  const goTo = (i) => {
    const target = (i + n) % n;
    if (prefersReducedMotion()) {
      setManual(target);
      setActive(target);
      return;
    }
    const el = track.current;
    const r = el.getBoundingClientRect();
    const span = r.height - el.firstElementChild.offsetHeight;
    window.scrollTo({ top: window.scrollY + r.top - STICK_TOP + (span * target) / (n - 1), behavior: 'smooth' });
  };

  const trackStyle = { '--n': n };
  if (manual !== null) trackStyle['--pin'] = manual / (n - 1);

  return (
    <div className="stack-track" ref={track} style={trackStyle}>
      <div className="stack-sticky">
        {backdrop && <div className="stack-backdrop" aria-hidden="true">{backdrop}</div>}
        <div className="container stack-band">
          {aside && <div className="stack-aside">{aside}</div>}
          <div className="stack-deck">
            {header && header(active, goTo)}
            <div className="stack-cards" role="list" aria-label={label}>
              {items.map((item, i) => (
                <div
                  key={i}
                  role="listitem"
                  className={`stack-card ${i === active ? 'is-active' : ''}`}
                  style={{ '--i': i, '--tilt': `${i % 2 ? 2.5 : -2}deg` }}
                  aria-hidden={i !== active}
                  onClick={() => i === active && goTo(i + 1)}
                >
                  {renderCard(item, i, i === active)}
                </div>
              ))}
            </div>
            {footer && footer(active, goTo)}
          </div>
        </div>
      </div>
    </div>
  );
};

/* One parallax layer for a backdrop: drifts --sx/--sy px (and turns --rot deg) across
   the whole pin, so layers with bigger numbers read as nearer. */
export const Layer = ({ className = '', sx = 0, sy = 0, rot = 0, style, children }) => (
  <div className={`stack-layer ${className}`} style={{ '--sx': sx, '--sy': sy, '--rot': rot, ...style }}>
    {children}
  </div>
);

export default StackDeck;

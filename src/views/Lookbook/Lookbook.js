import React, { useCallback, useRef } from 'react';
import { useScrollProgress } from '../../hooks/motion';
import { LOOKS } from '../../data/looks';
import './Lookbook.css';

const STEP = 36; // degrees between neighbouring looks on the ring
const STICK_TOP = 72;
const MID = (LOOKS.length - 1) / 2;
const clamp01 = (n) => Math.min(1, Math.max(0, n));

// --a: the look's angle from the front of the ring; --o fades it out near the edges.
const place = (a) => ({ '--a': `${a}deg`, '--o': clamp01((88 - Math.abs(a)) / 28), '--f': clamp01(1 - Math.abs(a) / STEP) });

/* Real looks on the inside of a ring that turns as the page scrolls, so each one in
   turn swings to the front and into focus. Reduced motion: a still ring, middle look in front. */
const Lookbook = () => {
  const track = useRef(null);
  const count = useRef(null);

  const write = useCallback((el) => {
    const r = el.getBoundingClientRect();
    const pin = clamp01((STICK_TOP - r.top) / Math.max(1, r.height - el.firstElementChild.offsetHeight));
    const turn = pin * (LOOKS.length - 1) * STEP;
    el.querySelectorAll('.look-card').forEach((card, i) => {
      Object.entries(place(i * STEP - turn)).forEach(([k, v]) => card.style.setProperty(k, typeof v === 'number' ? v.toFixed(3) : v));
    });
    count.current.textContent = String(Math.round(turn / STEP) + 1).padStart(2, '0');
  }, []);
  useScrollProgress(track, write);

  return (
    <section id="looks" className="looks">
      <div className="looks-track" ref={track}>
        <div className="looks-sticky">
          <div className="container looks-head">
            <p className="tb-kicker">Looks</p>
            <h2>Real outfits, worn by real people.</h2>
            <p className="section-lede">
              Every day people post what they wore and tag the pieces. Tap a tag and you are in the shop.
            </p>
          </div>

          <div className="looks-stage" role="list" aria-label="Looks posted on TrendBag">
            {LOOKS.map((l, i) => (
              <figure key={l.id} role="listitem" className="look-card" style={place((i - MID) * STEP)}>
                <img src={l.src} alt="An outfit posted on TrendBag" loading="lazy" decoding="async" style={{ objectPosition: `50% ${l.fy}%` }} />
                <span className="look-tag">#ootd</span>
              </figure>
            ))}
          </div>

          <p className="looks-count tb-num" aria-hidden="true">
            <span ref={count}>{String(Math.round(MID) + 1).padStart(2, '0')}</span> / {String(LOOKS.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;

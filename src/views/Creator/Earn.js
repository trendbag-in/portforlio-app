import React, { useCallback, useRef, useState } from 'react';
import { useScrollProgress } from '../../hooks/motion';
import { LOOKS } from '../../data/looks';
import { G } from '../../data/garments';
import './Earn.css';

const WALLPAPER = LOOKS[0];
const BASE = 36840;

// Sales arriving from your looks, newest last. Example figures.
const SALES = [
  { img: G.beigePolo, item: 'Beige polo', earn: 129, ago: '2h' },
  { img: G.linenShirt, item: 'Linen shirt', earn: 189, ago: '1h' },
  { img: G.whiteTrousers, item: 'White trousers', earn: 219, ago: '34m' },
  { img: G.sunglasses, item: 'Sunglasses', earn: 99, ago: '12m' },
  { img: G.pinkKurta, item: 'Pink kurta', earn: 249, ago: '3m' },
  { img: G.brogues, item: 'Brogues', earn: 349, ago: 'now' }
];

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

/* A phone's lock screen: sales from your looks land as notifications while the
   month's earnings tick up above them, one sale at a time as the page scrolls. */
const Earn = () => {
  const ref = useRef(null);
  const [count, setCount] = useState(SALES.length);

  const write = useCallback((el) => {
    const r = el.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
    const n = Math.max(0, Math.min(SALES.length, Math.floor((p - 0.22) * 18)));
    setCount((c) => (c === n ? c : n));
  }, []);
  useScrollProgress(ref, write);

  const shown = SALES.slice(Math.max(0, count - 4), count).reverse();
  const total = BASE + SALES.slice(0, count).reduce((s, x) => s + x.earn, 0);

  return (
    <section id="earn" className="earn section-block" ref={ref}>
      <div className="container earn-inner">
        <div className="earn-copy">
          <p className="tb-kicker tb-kicker--start">Earnings</p>
          <h2>Every order you drove, and what you made from it.</h2>
          <p className="section-lede">
            When someone buys a piece you tagged, the sale is counted to you and your commission
            lands in your wallet: gross, platform fee and net, day by day.
          </p>
          <dl className="earn-ledger">
            <div className="tb-keyval"><dt>Orders driven</dt><dd className="tb-num">128</dd></div>
            <div className="tb-keyval"><dt>Sales value</dt><dd className="tb-num">₹3,84,200</dd></div>
            <div className="tb-keyval"><dt>Paid to your bank</dt><dd className="tb-num">₹14,700</dd></div>
          </dl>
        </div>

        <div className="lock" aria-label="Example: sales notifications on a phone">
          <img className="lock-wall" src={WALLPAPER.src} alt="" loading="lazy" style={{ objectPosition: `50% ${WALLPAPER.fy}%` }} />
          <div className="lock-top">
            <span className="lock-date">Thursday, 14 October</span>
            <span key={total} className="lock-total tb-num">{inr(total)}</span>
            <span className="lock-label">earned this month · example</span>
          </div>
          <ul className="lock-stack">
            {shown.map((s) => (
              <li key={s.item} className="lock-note">
                <img src={s.img} alt="" />
                <span>
                  <strong>New sale from your look</strong>
                  {s.item} · you earn {inr(s.earn)}
                </span>
                <em>{s.ago}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Earn;

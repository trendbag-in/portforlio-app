import React from 'react';
import Pinned from '../../components/Pinned/Pinned';
import { LOOKS } from '../../data/looks';
import { G } from '../../data/garments';
import './Insights.css';

const LOOK = LOOKS.find((l) => l.id.startsWith('a168c231'));

// One look's attribution, printed line by line as the section scrolls. Example figures.
const LINES = [
  { k: 'Views', v: '12,480' },
  { k: 'Tag taps', v: '1,932' },
  { k: 'Orders', v: '46' },
  { rule: true },
  { k: 'Black polo × 28', v: '₹36,120', img: G.blackPolo },
  { k: 'Black trousers × 18', v: '₹39,420', img: G.blackTrousers },
  { rule: true },
  { k: 'Sales', v: '₹75,540', strong: true },
  { k: 'Creator commission 10%', v: '− ₹7,554' },
  { k: 'You keep', v: '₹67,986', strong: true, accent: true }
];

/* The question brands ask — which looks sell my products — answered as a receipt
   that prints out of the look it belongs to. */
const Insights = () => (
  <section id="insights" className="ix">
    <Pinned extra={100}>
      <div className="container ix-inner">
        <div className="ix-copy">
          <p className="tb-kicker tb-kicker--start">Analytics</p>
          <h2>See which looks sell your products.</h2>
          <p className="section-lede pin-more">
            Every order is traced back to the look that drove it: views, tag taps, orders and
            sales, with what you owe the creator worked out for you.
          </p>
        </div>

        <div className="ix-scene">
          <figure className="ix-look">
            <img src={LOOK.src} alt="A look tagged with two products" loading="lazy" style={{ objectPosition: `50% ${LOOK.fy}%` }} />
            <span className="ix-pin" style={{ left: '4%', top: '50%' }}><img src={G.blackPolo} alt="" />Black polo</span>
            <span className="ix-pin" style={{ left: '50%', top: '76%' }}><img src={G.blackTrousers} alt="" />Black trousers</span>
          </figure>

          <div className="ix-printer" aria-label="Example attribution for one look">
            <div className="ix-slot" />
            <div className="ix-receipt">
              <p className="ix-receipt-head">
                <span>TRENDBAG · LOOK REPORT</span>
                <span>#ootd · last 30 days</span>
              </p>
              <ul>
                {LINES.map((l, i) =>
                  l.rule ? (
                    <li key={i} className="ix-rule" style={{ '--i': i }} />
                  ) : (
                    <li key={l.k} className={`${l.strong ? 'is-strong' : ''} ${l.accent ? 'is-accent' : ''}`} style={{ '--i': i }}>
                      <span>{l.img && <img src={l.img} alt="" />}{l.k}</span>
                      <span>{l.v}</span>
                    </li>
                  )
                )}
              </ul>
              <p className="ix-receipt-foot">Example figures</p>
            </div>
          </div>
        </div>
      </div>
    </Pinned>
  </section>
);

export default Insights;

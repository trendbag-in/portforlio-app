import React, { useCallback, useRef, useState } from 'react';
import { useScrollProgress } from '../../hooks/motion';
import { G } from '../../data/garments';
import './Connect.css';

const STICK_TOP = 72;
const W = 660; // the scene is drawn at this width and scaled to fit
const clamp01 = (n) => Math.min(1, Math.max(0, n));

// Store rows on the left, and where each lands in the app's 2×2 grid on the right.
const PRODUCTS = [
  { name: 'Linen shirt', sku: 'LS-014', stock: 12, price: 1890, img: G.linenShirt },
  { name: 'Beige polo', sku: 'BP-221', stock: 8, price: 1290, img: G.beigePolo },
  { name: 'White trousers', sku: 'WT-305', stock: 15, price: 2190, img: G.whiteTrousers },
  { name: 'Brogues', sku: 'BR-090', stock: 5, price: 3490, img: G.brogues }
].map((p, i) => ({
  ...p,
  from: [26, 74 + i * 84],
  to: [425 + (i % 2) * 112, 88 + Math.floor(i / 2) * 156],
  start: 0.06 + i * 0.1
}));

const SOLD = 1; // the polo sells
const STEPS = [
  { at: 0, title: 'Install the connector', body: 'On Shopify or WooCommerce, in a few clicks.' },
  { at: 0.12, title: 'Your catalogue syncs in', body: 'Products, variants and stock — no re-listing.' },
  { at: 0.62, title: 'Orders flow back to you', body: 'Stock drops on both sides, so you never oversell.' }
];

/* A pinned scene: products lift off the store's list and land as cards in the app,
   then an order travels back and the stock count drops on both sides. */
const Connect = () => {
  const track = useRef(null);
  const [stage, setStage] = useState({ step: 0, sold: false });

  const write = useCallback((el) => {
    const r = el.getBoundingClientRect();
    const sticky = el.firstElementChild;
    const pin = clamp01((STICK_TOP - r.top) / Math.max(1, r.height - sticky.offsetHeight));
    el.style.setProperty('--pin', pin.toFixed(4));
    const scene = el.querySelector('.cx-scene-fit');
    el.style.setProperty('--fit', Math.min(1, scene.clientWidth / W).toFixed(4));
    PRODUCTS.forEach((p, i) => el.style.setProperty(`--e${i}`, clamp01((pin - p.start) / 0.22).toFixed(4)));
    const step = STEPS.reduce((s, x, i) => (pin >= x.at ? i : s), 0);
    const sold = pin > 0.84;
    setStage((s) => (s.step === step && s.sold === sold ? s : { step, sold }));
  }, []);
  useScrollProgress(track, write);

  const stock = (i) => PRODUCTS[i].stock - (stage.sold && i === SOLD ? 1 : 0);

  return (
    <section id="connect" className="cx">
      <div className="cx-track" ref={track}>
        <div className="cx-sticky">
          <div className="container cx-band">
            <div className="cx-copy">
              <p className="tb-kicker tb-kicker--start">Connect</p>
              <h2>Your store, on TrendBag, without re-listing a thing.</h2>
              <ol className="cx-steps">
                {STEPS.map((s, i) => (
                  <li key={s.title} className={i === stage.step ? 'is-on' : i < stage.step ? 'is-done' : ''}>
                    <span className="cx-step-n tb-num">0{i + 1}</span>
                    <span><strong>{s.title}</strong>{s.body}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="cx-scene-fit">
              <div className="cx-scene" aria-label="Products syncing from your store to TrendBag" role="img">
                <div className="cx-store">
                  <p className="cx-store-head">
                    <span className="cx-store-dot" />Your store
                    <span className="cx-store-tag">Shopify · WooCommerce</span>
                  </p>
                  <ul>
                    {PRODUCTS.map((p, i) => (
                      <li key={p.sku} className="cx-row" style={{ '--i': i }}>
                        <span className="cx-row-thumb"><img src={p.img} alt="" /></span>
                        <span className="cx-row-name"><strong>{p.name}</strong><em className="tb-num">{p.sku}</em></span>
                        <span className={`cx-row-stock tb-num ${stage.sold && i === SOLD ? 'is-tick' : ''}`}>{stock(i)} in stock</span>
                        <span className="cx-row-synced" aria-hidden="true" />
                      </li>
                    ))}
                  </ul>
                  <p className={`cx-order ${stage.sold ? 'is-in' : ''}`}>
                    <span className="tb-num">#TB-20418</span> Beige polo · M · paid
                  </p>
                </div>

                <div className="cx-phone">
                  <p className="cx-phone-head">trendbag</p>
                  <ul className="cx-grid">
                    {PRODUCTS.map((p, i) => (
                      <li key={p.sku} className="cx-slot" style={{ '--i': i }}>
                        <span className="cx-slot-img" />
                        <span className="cx-slot-name">{p.name}</span>
                        <span className="cx-slot-meta tb-num">
                          ₹{p.price.toLocaleString('en-IN')}
                          <em className={stage.sold && i === SOLD ? 'is-tick' : ''}>{stock(i)} left</em>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* The flying copies: each starts on its store row and settles into its slot. */}
                {PRODUCTS.map((p, i) => (
                  <img
                    key={p.sku}
                    className="cx-fly"
                    src={p.img}
                    alt=""
                    style={{ '--e': `var(--e${i}, 1)`, '--x0': `${p.from[0]}px`, '--y0': `${p.from[1]}px`, '--x1': `${p.to[0]}px`, '--y1': `${p.to[1]}px` }}
                  />
                ))}

                <span className="cx-receipt tb-num" aria-hidden="true">₹1,290</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;

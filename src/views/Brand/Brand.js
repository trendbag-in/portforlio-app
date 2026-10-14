import React, { useRef } from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import StackDeck, { Layer } from '../../components/StackDeck/StackDeck';
import CountUp from '../../components/CountUp';
import { useScrollProgress } from '../../hooks/motion';
import { G } from '../../data/garments';
import './Brand.css';

/* Mirrors the brand side: the Shopify / WooCommerce connector (/connect), the partner
   app's Orders, Boxes, Fulfillment and Returns pages, and Analytics. Figures are
   examples and labelled as such. */

const SYNC = [
  { name: 'Products & variants', dir: 'in' },
  { name: 'Inventory levels', dir: 'in' },
  { name: 'Orders', dir: 'out' }
];

const Connect = () => (
  <section id="connect" className="connect section-block">
    <div className="container connect-inner">
      <RevealOnScroll className="connect-text">
        <p className="tb-kicker tb-kicker--start">Connect</p>
        <h2>Your store, on TrendBag, without re-listing a thing.</h2>
        <p className="section-lede">
          Install the connector on Shopify or WooCommerce, accept the payout terms and start the
          initial sync. Stock stays in sync to help prevent overselling.
        </p>
      </RevealOnScroll>

      <div className="sync" aria-label="What gets synced">
        <div className="sync-node">
          <span className="sync-badges"><span>Shopify</span><span>WooCommerce</span></span>
          <strong>Your store</strong>
        </div>

        <ul className="sync-lanes">
          {SYNC.map((s, i) => (
            <li key={s.name} className={`sync-lane is-${s.dir}`} style={{ '--i': i }}>
              <span className="sync-track" aria-hidden="true"><span /><span /><span /></span>
              <span className="sync-label">{s.name}</span>
            </li>
          ))}
        </ul>

        <div className="sync-node sync-node--tb">
          <img src="/favicon.svg" alt="" width="36" height="36" />
          <strong>TrendBag marketplace</strong>
        </div>
      </div>
    </div>
  </section>
);

const ORDERS = [
  { id: '#TB-20418', item: 'Linen shirt · M', img: G.linenShirt, status: 'To pack' },
  { id: '#TB-20417', item: 'Beige polo · L', img: G.beigePolo, status: 'To pack' },
  { id: '#TB-20412', item: 'Brogues · 9', img: G.brogues, status: 'Shipped' }
];

const BOXES = [
  { name: 'Mailer S', size: '25 × 20 × 5 cm', kg: '0.5 kg' },
  { name: 'Box M', size: '35 × 28 × 12 cm', kg: '1.2 kg', on: true },
  { name: 'Box L', size: '45 × 35 × 20 cm', kg: '2.5 kg' }
];

const STAGES = [
  {
    tab: 'Orders',
    title: 'Orders placed with your store',
    body: (
      <ul className="ff-orders">
        {ORDERS.map((o) => (
          <li key={o.id}>
            <img src={o.img} alt="" loading="lazy" />
            <span><strong className="tb-num">{o.id}</strong>{o.item}</span>
            <em className={o.status === 'Shipped' ? 'is-done' : ''}>{o.status}</em>
          </li>
        ))}
      </ul>
    )
  },
  {
    tab: 'Pack',
    title: 'Package presets for fulfilment',
    body: (
      <ul className="ff-boxes">
        {BOXES.map((b) => (
          <li key={b.name} className={b.on ? 'is-on' : ''}>
            <span className="ff-box-icon" aria-hidden="true" />
            <span><strong>{b.name}</strong>{b.size}</span>
            <em className="tb-num">{b.kg}</em>
          </li>
        ))}
      </ul>
    )
  },
  {
    tab: 'Print',
    title: 'Label and invoice, one print',
    body: (
      <div className="ff-print">
        <div className="ff-label">
          <span className="tb-overline">Ship to</span>
          <strong>A. Sharma, Bengaluru 560034</strong>
          <span className="ff-barcode" aria-hidden="true" />
          <span className="tb-num">AWB 1490 2283 7710</span>
        </div>
        <p className="ff-note">Stick the label on the box · put the invoice inside.</p>
      </div>
    )
  },
  {
    tab: 'Returns',
    title: 'Quality-check items received at your hub',
    body: (
      <div className="ff-return">
        <div className="ff-return-item">
          <img src={G.pinkKurta} alt="" loading="lazy" />
          <span><strong>Pink kurta · M</strong>Reason: size too small</span>
        </div>
        <div className="ff-return-actions">
          <span className="ff-accept">Accept (refund + restock)</span>
          <span className="ff-reject">Reject (reship + penalty)</span>
        </div>
      </div>
    )
  }
];

const Stage = (s) => (
  <div className="ff-card">
    <p className="ff-title">{s.title}</p>
    {s.body}
  </div>
);

const FulfilCopy = (
  <>
    <p className="tb-kicker tb-kicker--start">Fulfilment</p>
    <h2>Pack it, print it, ship it.</h2>
    <p className="section-lede stack-aside-more">
      Orders land in one queue. Pick a box preset, print the label and invoice as one
      merged pack, and quality-check returns when they reach your hub.
    </p>
  </>
);

const Fulfil = () => (
  <section id="fulfil" className="fulfil">
    <StackDeck
      items={STAGES}
      label="From order to shipped"
      renderCard={Stage}
      aside={FulfilCopy}
      backdrop={<Layer className="stack-word" sx={500}>Ship</Layer>}
      header={(active, goTo) => (
        <div className="stack-tabs" role="tablist" aria-label="Stages">
          {STAGES.map((s, i) => (
            <button
              key={s.tab}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`stack-tab ${i === active ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
            >
              {s.tab}
            </button>
          ))}
        </div>
      )}
    />
  </section>
);

// Revenue & Orders Trend, normalised 0–1 — an example month.
const TREND = [0.18, 0.22, 0.2, 0.31, 0.36, 0.33, 0.42, 0.5, 0.47, 0.58, 0.64, 0.6, 0.72, 0.81];
const PATH = TREND.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (TREND.length - 1)) * 100} ${100 - v * 90}`).join(' ');

const TOP = [
  { name: 'Linen shirt', img: G.linenShirt, share: 1 },
  { name: 'Beige polo', img: G.beigePolo, share: 0.72 },
  { name: 'White trousers', img: G.whiteTrousers, share: 0.55 }
];

const LOOKS = ['/img/creator-400.jpg', '/img/shopper-400.jpg', '/img/hero-portrait-460.jpg', '/img/brands-400.jpg'];

const Insights = () => {
  const ref = useRef(null);
  useScrollProgress(ref);

  return (
    <section id="insights" className="insights section-block" ref={ref}>
      <div className="container insights-inner">
        <RevealOnScroll className="insights-text">
          <p className="tb-kicker tb-kicker--start">Analytics</p>
          <h2>See which looks sell your products.</h2>
          <p className="section-lede">
            Sales, orders and product performance in one place, with what you owe the creators
            who drove them — and the looks from customers and creators wearing your products.
          </p>
        </RevealOnScroll>

        <div className="insights-board">
          <span className="tb-example tb-overline">Example figures</span>
          <div className="tb-tile insights-trend" style={{ '--speed': 70 }}>
            <p className="tb-overline">Revenue &amp; Orders Trend</p>
            <div className="insights-stats">
              <div><span>Revenue</span><strong><CountUp to={612400} prefix="₹" /></strong></div>
              <div><span>Orders</span><strong><CountUp to={418} /></strong></div>
            </div>
            <svg className="insights-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d={PATH} pathLength="1" />
            </svg>
          </div>

          <div className="tb-tile" style={{ '--speed': 150 }}>
            <p className="tb-overline">Top Products</p>
            <ul className="insights-top">
              {TOP.map((t, i) => (
                <li key={t.name} style={{ '--s': t.share, '--i': i }}>
                  <img src={t.img} alt="" loading="lazy" />
                  <span>{t.name}<span className="insights-bar"><span /></span></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="tb-tile" style={{ '--speed': 110 }}>
            <p className="tb-overline">Creator Payouts</p>
            <ul>
              <li><span>@ananya.trends</span><strong className="tb-num">₹8,240</strong></li>
              <li><span>@kabir.fits</span><strong className="tb-num">₹5,960</strong></li>
              <li><span>@meera.wears</span><strong className="tb-num">₹3,110</strong></li>
            </ul>
          </div>

          <div className="tb-tile insights-looks" style={{ '--speed': 210 }}>
            <p className="tb-overline">Looks wearing your products</p>
            <div className="insights-strip">
              {LOOKS.map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Brand = () => (
  <>
    <Connect />
    <Fulfil />
    <Insights />
  </>
);

export default Brand;

import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import StackDeck, { Layer } from '../../components/StackDeck/StackDeck';
import { G } from '../../data/garments';
import Connect from './Connect';
import Insights from './Insights';
import './Brand.css';

/* Mirrors the brand side: the Shopify / WooCommerce connector (/connect), the partner
   app's Orders, Boxes, Fulfillment and Returns pages, and Analytics. Figures are
   examples and labelled as such. */

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

const Brand = () => (
  <>
    <Connect />
    <Fulfil />
    <Insights />
  </>
);

export default Brand;

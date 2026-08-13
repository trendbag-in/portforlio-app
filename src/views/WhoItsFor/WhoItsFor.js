import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import './WhoItsFor.css';

/* Replaces the old DiscoveryUniverse, which rendered three full-height sections
   with blue and pink nebula gradients — a second and third accent, and a space
   metaphor at odds with a printed-magazine brand. */
const PANELS = [
  {
    n: '01',
    title: 'Shoppers',
    photo: 'shopper',
    alt: 'Someone browsing looks on their phone in warm daylight',
    body: 'Discover through people whose taste you already trust, keep a digital wardrobe of what you own, and buy without leaving the feed.',
    points: ['Shop straight from a creator post', 'Save looks to personal boards', 'Size and fit predicted per brand'],
    cta: 'Explore shopping'
  },
  {
    n: '02',
    title: 'Creators',
    photo: 'creator',
    alt: 'A creator filming an outfit video beside a clothing rail',
    body: 'Turn taste into income. Tag the pieces you are already wearing, and earn commission on every sale your content drives.',
    points: ['Automatic product tagging', 'Conversion analytics per post', 'Transparent, scheduled payouts'],
    cta: 'Join as a creator'
  },
  {
    n: '03',
    title: 'Brands',
    photo: 'brands',
    alt: 'A warm flat-lay of folded garments and accessories',
    body: 'Reach an audience that is already shopping. Sync your Shopify catalog once and distribute it across every creator storefront.',
    points: ['One-click Shopify integration', 'Creator matching by audience', 'Inventory synced across storefronts'],
    cta: 'Partner with us'
  }
];

const WhoItsFor = () => (
  <section id="who-its-for" className="who section-block">
    <div className="container">
      <RevealOnScroll className="section-head">
        <p className="tb-kicker tb-kicker--start">Who it's for</p>
        <h2>Three ways in.</h2>
        <p className="section-lede">
          One platform serving the whole loop — the people who shop, the people whose
          taste they follow, and the brands behind the pieces.
        </p>
      </RevealOnScroll>

      <div className="who-grid">
        {PANELS.map((p, i) => (
          <RevealOnScroll key={p.n} className="who-panel" delay={i * 120}>
            <figure className="who-photo tb-media">
              <img
                src={`/img/${p.photo}-400.jpg`}
                srcSet={`/img/${p.photo}-400.jpg 400w, /img/${p.photo}-800.jpg 800w`}
                sizes="(max-width: 860px) 90vw, 33vw"
                width="400"
                height="299"
                alt={p.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>

            <div className="who-marker">
              <span className="tb-num who-num">{p.n}</span>
              <span className="who-rule" />
            </div>

            <h3 className="who-title">{p.title}</h3>
            <p className="who-body">{p.body}</p>

            <ul className="tb-dashed-list tb-arrow-list who-points">
              {p.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>

            <a href="#contact" className="who-cta">
              {p.cta}
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default WhoItsFor;

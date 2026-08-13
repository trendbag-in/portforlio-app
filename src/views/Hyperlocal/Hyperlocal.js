import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import './Hyperlocal.css';

/* Positions are percentages on the plotting surface, laid out to read roughly
   like the map of India without drawing an actual coastline. */
const CITIES = [
  { name: 'Delhi', x: 33, y: 18 },
  { name: 'Kolkata', x: 72, y: 40 },
  { name: 'Hyderabad', x: 47, y: 62 },
  { name: 'Bengaluru', x: 38, y: 78 },
  { name: 'Chennai', x: 55, y: 84 },
  { name: 'Ahmedabad', x: 18, y: 44 }
];

const TAGS = ['Oversized', 'Linen', 'Co-ords', 'Mules'];

const Hyperlocal = () => (
  <section className="hyperlocal section-block">
    <div className="container hyperlocal-inner">
      <RevealOnScroll className="hyperlocal-text">
        <p className="tb-kicker tb-kicker--start">Hyperlocal</p>
        <h2>What your city is wearing this week.</h2>
        <p className="section-lede">
          Trends do not move at the same speed everywhere. We read creator posts, saves and
          purchases by city, so the feed reflects what is actually being worn around you.
        </p>

        <dl className="hyperlocal-specs">
          <div className="tb-keyval">
            <dt>Cities</dt>
            <dd>38 across India</dd>
          </div>
          <div className="tb-keyval">
            <dt>Updated</dt>
            <dd>Every 6 hours</dd>
          </div>
          <div className="tb-keyval">
            <dt>Signals</dt>
            <dd>Creator posts, saves, purchases</dd>
          </div>
        </dl>
      </RevealOnScroll>

      <RevealOnScroll className="hyperlocal-visual" delay={160}>
        <div className="hyperlocal-panel">
          <div className="hyperlocal-tags">
            {TAGS.map((t) => (
              <span key={t} className="hyperlocal-tag tb-overline">{t}</span>
            ))}
          </div>

          <div className="hyperlocal-grid" role="img" aria-label="A plot of Indian cities with Mumbai currently trending">
            {CITIES.map((c) => (
              <span key={c.name} className="hyperlocal-pin" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                <span className="hyperlocal-dot" />
                <span className="hyperlocal-label">{c.name}</span>
              </span>
            ))}

            <span className="hyperlocal-pin is-active" style={{ left: '20%', top: '58%' }}>
              <span className="hyperlocal-dot" />
              <span className="hyperlocal-label hyperlocal-label--active">Mumbai</span>
            </span>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

export default Hyperlocal;

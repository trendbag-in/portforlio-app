import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import './AboutUs.css';

/* Numbered editorial rows rather than emoji cards — the numerals, the dashed
   rules and the column rhythm are the whole design here. */
const REASONS = [
  {
    n: '01',
    title: 'AI that understands taste',
    body: 'Models trained on real Indian fashion behaviour rather than a generic recommendation engine bolted onto a catalog.',
    points: ['Look and garment recognition', 'Per-brand size prediction']
  },
  {
    n: '02',
    title: 'Verified and safe',
    body: 'Verified creator badges, secure payments and transparent reviews on every collaboration, so nobody is trading on trust alone.',
    points: ['Verified creator badges', 'Escrowed campaign payments']
  },
  {
    n: '03',
    title: 'Measurable outcomes',
    body: 'Creators and brands see exactly which posts drove which sales, instead of guessing from reach and impressions.',
    points: ['Per-post conversion data', 'Attribution down to the item']
  },
  {
    n: '04',
    title: 'India-first',
    body: 'Built around Indian sizing, Indian brands, Indian occasions and Indian price points — not a western platform with a currency switch.',
    points: ['38 cities and counting', 'Rupee pricing throughout']
  }
];

/* Infrastructure, stated plainly and without icons. This is a consumer site, so
   the row stays quiet rather than becoming a logo wall. */
const STACK = ['Go', 'gRPC', 'MongoDB', 'PostgreSQL', 'Redis', 'OpenSearch', 'ClickHouse', 'Kafka', 'AWS', 'Bedrock', 'Shopify', 'Razorpay'];

const AboutUs = () => (
  <>
    <section id="about-us" className="about section-block">
      <div className="container">
        <RevealOnScroll className="section-head">
          <p className="tb-kicker tb-kicker--start">Why TrendBag</p>
          <h2>Built for how people actually shop.</h2>
        </RevealOnScroll>

        <div className="about-rows">
          {REASONS.map((r, i) => (
            <RevealOnScroll key={r.n} className="about-row" delay={i * 80}>
              <span className="tb-num about-num">{r.n}</span>
              <div className="about-main">
                <h3>{r.title}</h3>
                <p className="about-body">{r.body}</p>
              </div>
              <ul className="tb-arrow-list about-points">
                {r.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="about-stack">
          <p className="tb-overline about-stack-label">Running on</p>
          <div className="about-stack-row">
            {STACK.map((s) => <span key={s} className="about-stack-item">{s}</span>)}
          </div>
        </RevealOnScroll>
      </div>
    </section>

    <section id="mission" className="mission">
      <div className="mission-media">
        <img
          src="/img/mission-1376.jpg"
          srcSet="/img/mission-768.jpg 768w, /img/mission-1376.jpg 1376w"
          sizes="100vw"
          width="1376"
          height="768"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <div className="mission-scrim tb-scrim-bottom" />
      </div>

      <div className="container mission-inner">
        <RevealOnScroll className="mission-content">
          <p className="tb-overline mission-label">Our mission</p>
          <h2 className="mission-title">
            Fashion discovery that starts with a person, not a search box.
          </h2>
          <p className="mission-body">
            We are closing the gap between the creators who shape taste, the brands who make
            the pieces, and the people who want to wear them.
          </p>
          <a href="#contact" className="tb-btn tb-btn--primary">Book a demo</a>
        </RevealOnScroll>
      </div>
    </section>
  </>
);

export default AboutUs;

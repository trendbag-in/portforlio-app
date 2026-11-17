import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import { ContactView, FooterView } from '../../views';
import { META } from '../../content/pages';
import ErCalculator from './ErCalculator';
import './MarketingPage.css';

const Cta = ({ cta, className = '' }) =>
  cta.href.startsWith('http') ? (
    <a className={`tb-btn tb-btn--primary ${className}`} href={cta.href} target="_blank" rel="noopener noreferrer">
      {cta.label}
    </a>
  ) : (
    <a className={`tb-btn tb-btn--primary ${className}`} href={cta.href}>{cta.label}</a>
  );

// Hero photo with example UI chips that float in one after another (labelled as an example).
const HeroVisual = ({ hero }) => (
  <figure className="mk-hero-visual">
    <img
      className="mk-hero-img"
      src={hero.src}
      srcSet={hero.srcSet}
      sizes="(min-width: 900px) 45vw, 100vw"
      alt={hero.alt}
      style={{ objectPosition: hero.pos }}
      fetchpriority="high"
    />
    {hero.pins?.map((p, i) => (
      <span key={p.text} className="mk-pin" style={{ left: `${p.x}%`, top: `${p.y}%`, '--i': i }}>
        {p.text}
      </span>
    ))}
    {hero.pins && <figcaption className="mk-pin-note">Example</figcaption>}
  </figure>
);

const Section = ({ s }) => (
  <section id={s.id} className="mk-section section-block">
    <div className="container">
      <RevealOnScroll className="section-head">
        <h2>{s.heading}</h2>
        {s.intro && <p className="section-lede">{s.intro}</p>}
      </RevealOnScroll>
      {s.layout === 'list' ? (
        <ul className="tb-dashed-list mk-list">
          {s.items.map((it) => (
            <li key={it.title}>
              <strong>{it.title}</strong>
              <span>{it.body}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ol className={`mk-grid mk-grid--${s.layout}`}>
          {s.items.map((it, i) => (
            <li key={it.title} className="tb-card tb-card--ruled mk-card">
              {s.layout === 'steps' && <span className="tb-num mk-step">{String(i + 1).padStart(2, '0')}</span>}
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  </section>
);

// One template for every marketing route; the page itself is data (src/content/pages-*.json).
const MarketingPage = ({ page }) => (
  <>
    <Navbar minimal cta={page.cta} />
    <main id="main" tabIndex={-1} className="mk-page">
      <header id="top" className="mk-hero section-block">
        <div className={`container${page.hero ? ' mk-hero-split' : ''}`}>
          <div className="mk-hero-text">
          <nav className="mk-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{page.kicker}</span>
          </nav>
          <p className="tb-kicker tb-kicker--start">
            {page.kicker}
            {page.status === 'early-access' && <span className="mk-badge">Early access</span>}
          </p>
          <h1 className="tb-display mk-h1">{page.h1}</h1>
          <p className="section-lede mk-lede">{page.lede}</p>
          <Cta cta={page.cta} className="mk-hero-cta" />
          </div>
          {page.hero && <HeroVisual hero={page.hero} />}
        </div>
      </header>

      {page.tool === 'er-calculator' && <ErCalculator />}

      {page.sections.map((s) => <Section key={s.id} s={s} />)}

      <section id="faq" className="mk-section section-block">
        <div className="container mk-faq">
          <h2>Frequently asked questions</h2>
          {page.faq.map((f) => (
            <details key={f.q} className="mk-faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {page.related?.length > 0 && (
        <section className="mk-section mk-related">
          <div className="container">
            <p className="tb-overline">Keep reading</p>
            <ul className="mk-related-list">
              {page.related.filter((p) => META[p]).map((p) => (
                <li key={p}>
                  <Link to={p} className="tb-card mk-related-card">
                    <strong>{META[p].h1 || META[p].title}</strong>
                    <span>{META[p].description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactView defaultRole={page.persona} />
    </main>
    <FooterView />
  </>
);

export default MarketingPage;

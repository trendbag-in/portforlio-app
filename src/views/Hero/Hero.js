import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import './Hero.css';

const Hero = () => (
  <section id="hero" className="hero">
    <div className="container hero-inner">
      <div className="hero-text">
        <RevealOnScroll delay={100}>
          <p className="tb-kicker tb-kicker--start">Fashion / Social / Shoppable</p>
        </RevealOnScroll>

        <RevealOnScroll delay={180}>
          <h1 className="hero-title">
            Shop what<br />
            creators<br />
            <span className="tb-accent-word">actually</span> wear.
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={260}>
          <p className="hero-lede">
            Discover the looks people you follow are wearing, build a digital wardrobe of
            what you already own, and buy it all in one place.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={340}>
          <div className="hero-actions">
            <a
              href="https://app.trendbag.in"
              target="_blank"
              rel="noopener noreferrer"
              className="tb-btn tb-btn--primary"
            >
              Start exploring
            </a>
            <a href="#features" className="tb-btn tb-btn--secondary">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
              </svg>
              See how it works
            </a>
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="hero-visual" delay={420}>
        <figure className="hero-photo tb-media">
          <img
            src="/img/hero-portrait-460.jpg"
            srcSet="/img/hero-portrait-460.jpg 460w, /img/hero-portrait-896.jpg 896w"
            sizes="(max-width: 900px) 90vw, 460px"
            alt="A creator wearing a tailored linen co-ord in warm natural light"
            width="460"
            height="616"
            fetchpriority="high"
            decoding="async"
          />
        </figure>

        <div className="hero-card hero-card--product tb-card tb-card--ruled">
          <div className="hero-product">
            <span className="hero-product-thumb">
              <img
                src="/img/product-160.jpg"
                srcSet="/img/product-160.jpg 160w, /img/product-320.jpg 320w"
                sizes="56px"
                width="56"
                height="72"
                alt=""
                aria-hidden="true"
                decoding="async"
              />
            </span>
            <div>
              <p className="tb-overline">Studio Label</p>
              <p className="hero-product-name">The Editorial Carryall</p>
              <p className="tb-num hero-product-price">₹14,999</p>
            </div>
          </div>
        </div>

        <div className="hero-card hero-card--creator tb-card">
          <span className="hero-avatar" aria-hidden="true">A</span>
          <div className="hero-creator-meta">
            <p className="hero-creator-name">@ananya.trends</p>
            <p className="tb-num hero-creator-count">142K followers</p>
          </div>
          <span className="hero-follow">Follow</span>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

export default Hero;

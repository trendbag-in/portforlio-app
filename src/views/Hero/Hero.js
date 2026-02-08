import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Button from '../../components/Button';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <RevealOnScroll className="hero-badge" delay={100}>
              <span className="badge-text">#1 Fashion Tech Platform</span>
            </RevealOnScroll>

            <RevealOnScroll className="hero-title" delay={200}>
              <h1>
                Shop What <br />
                <span className="text-gradient">Creators Love</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll className="hero-subtitle" delay={300}>
              <p>
                Discover trending styles from your favorite influencers.
                TrendBag connects you directly with the brands creators are wearing.
              </p>
            </RevealOnScroll>

            <RevealOnScroll className="hero-actions" delay={400}>
              <a
                href="https://app.trendbag.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Start Exploring
              </a>
            </RevealOnScroll>
          </div>

          <RevealOnScroll className="hero-visual" delay={600}>
            <div className="visual-circle-bg"></div>

            <div className="phone-mockup-container">
              <div className="app-screen">
                <div className="app-header">
                  <div className="app-nav-line"></div>
                </div>
                <div className="app-grid">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="app-card">
                      <div className="app-card-img"></div>
                      <div className="app-card-text">
                        <div className="app-card-line"></div>
                        <div className="app-card-line" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="float-card float-card-1">
              <div className="float-icon">✨</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Trending</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>+24% this week</div>
              </div>
            </div>

            <div className="float-card float-card-2">
              <div className="float-icon">🛍️</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Shop Now</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Direct from post</div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Hero;

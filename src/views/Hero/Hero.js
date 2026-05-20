import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Button from '../../components/Button';
import './Hero.css';

const products = [
  { emoji: '👗', name: 'Floral Midi Dress', brand: 'Zara', price: '₹2,499', bg: 'linear-gradient(135deg, #fde68a, #f59e0b)' },
  { emoji: '👜', name: 'Quilted Shoulder Bag', brand: 'H&M', price: '₹1,799', bg: 'linear-gradient(135deg, #fbcfe8, #ec4899)' },
  { emoji: '👟', name: 'Retro Court Sneakers', brand: 'Nike', price: '₹4,995', bg: 'linear-gradient(135deg, #bfdbfe, #3b82f6)' },
  { emoji: '🕶️', name: 'Oversized Shades', brand: 'Ray-Ban', price: '₹3,200', bg: 'linear-gradient(135deg, #ddd6fe, #8b5cf6)' },
];

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
                  <div className="app-brand">
                    <span className="app-brand-logo" aria-hidden="true">
                      <svg viewBox="0 0 64 64" width="20" height="20">
                        <rect width="64" height="64" rx="14" fill="#E55A2B" />
                        <path d="M21 28 A11 11 0 0 1 43 28" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
                        <path d="M12 28 L52 28 L47.5 51 Q47 54.5 42.5 54.5 L21.5 54.5 Q17 54.5 16.5 51 Z" fill="#fff" />
                        <rect x="12" y="30.8" width="40" height="3.4" rx="1.7" fill="#E55A2B" />
                        <circle cx="26" cy="41" r="2.6" fill="#E55A2B" />
                        <circle cx="38" cy="41" r="2.6" fill="#E55A2B" />
                        <path d="M26 46.5 Q32 51.5 38 46.5" fill="none" stroke="#E55A2B" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="app-brand-name">trendbag</span>
                  </div>

                  <div className="app-creator">
                    <span className="app-avatar" aria-hidden="true">A</span>
                    <div className="app-creator-info">
                      <span className="app-creator-name">@ava.styles</span>
                      <span className="app-creator-sub">Shop her 12 looks</span>
                    </div>
                    <span className="app-follow">Follow</span>
                  </div>
                </div>

                <div className="app-grid">
                  {products.map(p => (
                    <div key={p.name} className="app-card">
                      <div className="app-card-img" style={{ background: p.bg }}>
                        <span className="app-card-emoji" aria-hidden="true">{p.emoji}</span>
                        <span className="app-card-like" aria-hidden="true">♥</span>
                      </div>
                      <div className="app-card-text">
                        <div className="app-card-name">{p.name}</div>
                        <div className="app-card-meta">
                          <span className="app-card-brand">{p.brand}</span>
                          <span className="app-card-price">{p.price}</span>
                        </div>
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

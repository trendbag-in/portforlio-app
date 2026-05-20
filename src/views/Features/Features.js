import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import './Features.css';

// Marquee AI features drawn from the product roadmap, balanced across the
// three audiences the platform serves: shoppers, creators, and brands.
const features = [
  {
    icon: '📸',
    title: 'Steal Her Style',
    audience: 'shopper',
    description: 'Upload any Instagram or street-style photo — AI identifies the look and finds similar pieces in our catalog.',
  },
  {
    icon: '🪞',
    title: 'Virtual Try-On',
    audience: 'shopper',
    description: 'See any garment rendered on your own body before you buy — fewer returns, more confidence.',
  },
  {
    icon: '📏',
    title: 'Size Predictor',
    audience: 'shopper',
    description: 'One photo predicts your right size for every brand using their actual size charts. No more sizing roulette.',
  },
  {
    icon: '💸',
    title: 'Dupes Detector',
    audience: 'shopper',
    description: 'Upload a pricey Zara or luxury piece and AI surfaces affordable D2C dupes at lower price points.',
  },
  {
    icon: '👚',
    title: 'Wardrobe Analyzer',
    audience: 'shopper',
    description: 'Snap your closet and AI tells you what’s missing — “80% casual, nothing for a wedding.”',
  },
  {
    icon: '📍',
    title: 'Trending in My City',
    audience: 'shopper',
    description: 'A hyperlocal feed of what creators near you are wearing and what’s selling in your cohort.',
  },
  {
    icon: '🎨',
    title: 'AI Content Studio',
    audience: 'creator',
    description: 'One outfit photo becomes 5 styled images, captions, hashtags, and a 15-second Reel script.',
  },
  {
    icon: '🏷️',
    title: 'Auto-Tag Products',
    audience: 'creator',
    description: 'Post a video and AI detects every product across frames, tagging them shoppable from the catalog.',
  },
  {
    icon: '📊',
    title: 'Performance Coach',
    audience: 'creator',
    description: 'AI tells you what to post next based on what your audience actually engages with and buys.',
  },
  {
    icon: '🤝',
    title: 'Creator Match',
    audience: 'brand',
    description: 'Find creators whose audience precisely matches your target customer — at scale, no agency needed.',
  },
  {
    icon: '🔮',
    title: 'Trend Forecasting',
    audience: 'brand',
    description: 'Predict which colors, cuts, and categories will trend in the next 30–90 days to plan inventory.',
  },
  {
    icon: '🖼️',
    title: 'AI Product Photography',
    audience: 'brand',
    description: 'Upload one product shot and generate 10 lifestyle and model variations — no expensive shoot.',
  },
];

const audienceLabel = { shopper: 'Shoppers', creator: 'Creators', brand: 'Brands' };

const Features = () => {
  return (
    <section id="features" className="features section-block">
      <div className="container">
        <RevealOnScroll className="features-header">
          <span className="features-eyebrow">AI-Native Platform</span>
          <h2 className="features-title">
            Built for <span className="text-gradient">shoppers, creators &amp; brands</span>
          </h2>
          <p className="features-subtitle">
            A suite of AI features that turn discovery into purchase, content into commerce, and
            data into a competitive edge — across the entire fashion journey.
          </p>
        </RevealOnScroll>

        <div className="features-grid">
          {features.map((f, i) => (
            <RevealOnScroll key={f.title} className="feature-card" delay={(i % 3) * 100}>
              <div className="feature-card-top">
                <div className="feature-icon" aria-hidden="true">{f.icon}</div>
                <span className={`feature-tag feature-tag--${f.audience}`}>{audienceLabel[f.audience]}</span>
              </div>
              <h3 className="feature-title-sm">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

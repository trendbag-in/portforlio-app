import React, { useState } from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Icon from '../../components/Icon';
import './Features.css';

/* Chips are the system's universal tab mechanism — there are no underline
   indicators anywhere, so the audience filter is a chip strip. */
const AUDIENCES = [
  { id: 'shopper', label: 'For shoppers' },
  { id: 'creator', label: 'For creators' },
  { id: 'brand', label: 'For brands' }
];

const FEATURES = [
  { audience: 'shopper', icon: 'camera', title: 'Steal her style', desc: 'Upload any street-style photo and AI finds every piece in the catalog.' },
  { audience: 'shopper', icon: 'mirror', title: 'Virtual try-on', desc: 'See a garment on your own body before you buy — fewer returns, more confidence.' },
  { audience: 'shopper', icon: 'ruler', title: 'Size predictor', desc: 'One photo predicts your size for every brand, using their real size charts.' },
  { audience: 'shopper', icon: 'tag', title: 'Dupes detector', desc: 'Find affordable alternatives to a pricey piece at lower price points.' },
  { audience: 'shopper', icon: 'hanger', title: 'Wardrobe analyzer', desc: 'Snap your closet and see what is missing from it before the next occasion.' },
  { audience: 'shopper', icon: 'pin', title: 'Trending near you', desc: 'A hyperlocal feed of what people around you are wearing and buying.' },

  { audience: 'creator', icon: 'sparkle', title: 'AI content studio', desc: 'One outfit photo becomes five styled images, captions and a short reel script.' },
  { audience: 'creator', icon: 'tag', title: 'Auto-tag products', desc: 'Post a video and AI detects every product across frames, tagged and shoppable.' },
  { audience: 'creator', icon: 'chart', title: 'Performance coach', desc: 'See what to post next based on what your audience engages with and buys.' },
  { audience: 'creator', icon: 'wallet', title: 'Transparent payouts', desc: 'Track commission on every sale your content drives, settled on a clear schedule.' },

  { audience: 'brand', icon: 'handshake', title: 'Creator match', desc: 'Find creators whose audience matches your customer — at scale, without an agency.' },
  { audience: 'brand', icon: 'crystal', title: 'Trend forecasting', desc: 'Predict which colours, cuts and categories will move in the next 30 to 90 days.' },
  { audience: 'brand', icon: 'image', title: 'AI product photography', desc: 'Turn one product shot into ten lifestyle variations without a studio booking.' },
  { audience: 'brand', icon: 'plug', title: 'One-click Shopify sync', desc: 'Connect your catalog and keep inventory in step across every creator storefront.' }
];

const Features = () => {
  const [audience, setAudience] = useState('shopper');
  const shown = FEATURES.filter((f) => f.audience === audience);

  return (
    <section id="features" className="features section-block">
      <div className="container">
        <RevealOnScroll className="section-head section-head--center">
          <p className="tb-kicker">AI-native platform</p>
          <h2>One platform, three audiences.</h2>
          <p className="section-lede">
            A suite of AI tools that turn discovery into purchase, content into commerce,
            and data into an edge — across the whole fashion journey.
          </p>
        </RevealOnScroll>

        <div className="features-chips" role="tablist" aria-label="Choose an audience">
          {AUDIENCES.map((a) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={audience === a.id}
              className={`tb-chip ${audience === a.id ? 'tb-chip--active' : ''}`}
              onClick={() => setAudience(a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="features-grid tb-stagger">
          {shown.map((f, i) => (
            <RevealOnScroll key={f.title} delay={(i % 3) * 80}>
              <article className="tb-card tb-card--ruled feature-card">
                <div className="feature-card-top">
                  <Icon name={f.icon} size={36} />
                  <span className="tb-num feature-num">
                    {String(FEATURES.indexOf(f) + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

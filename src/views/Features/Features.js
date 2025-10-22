import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      number: "1",
      title: "Three-Sided Marketplace",
      description: "Connect brands, influencers, and fashion enthusiasts in one seamless ecosystem. Discover, collaborate, and shop with AI-powered recommendations.",
      illustration: "🛍️",
      layout: "right"
    },
    {
      number: "2", 
      title: "AI Wardrobe Intelligence",
      description: "Smart AI analyzes your closet, suggests purchases, and provides instant styling feedback. Your personal stylist powered by artificial intelligence.",
      illustration: "🤖",
      layout: "left"
    },
    {
      number: "3",
      title: "Smart Collaboration Hub",
      description: "Streamlined partnerships between brands and influencers with contract management, campaign tracking, and automated payment systems.",
      illustration: "🤝",
      layout: "right"
    },
    {
      number: "4",
      title: "Instagram Supercharged",
      description: "Seamlessly sync your Instagram posts, auto-tag products, and automate customer responses. Supercharge your social media workflow.",
      illustration: "📱",
      layout: "left"
    },
    {
      number: "5",
      title: "AI-Powered Discovery",
      description: "Intelligent content and product discovery with personalized feeds, visual search, and trend predictions tailored to your style.",
      illustration: "🔍",
      layout: "right"
    },
    {
      number: "6",
      title: "Trust & Verification",
      description: "Building confidence through verified badges, secure payment systems, and transparent reviews for authentic partnerships.",
      illustration: "✅",
      layout: "left"
    }
  ];

  return (
    <section id="features" className="features section-medium">
      <div className="container">
        <div className="features-header">
          <h2 className="features-title">
            How TrendBag
            <span className="text-gradient"> Works</span>
          </h2>
          <p className="features-subtitle">
            Six powerful features that revolutionize your fashion experience
          </p>
        </div>
        
        <div className="features-content">
          {features.map((feature, index) => (
            <div key={index} className={`feature-section ${feature.layout}`}>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              <div className="feature-illustration">
                <div className="illustration-container">
                  <div className="illustration-icon">{feature.illustration}</div>
                  <div className="illustration-bg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

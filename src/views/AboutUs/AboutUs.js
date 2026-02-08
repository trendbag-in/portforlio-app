import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Button from '../../components/Button';
import './AboutUs.css';

const AboutUs = () => {
  // Why Choose Us data
  const differentiators = [
    {
      icon: "🤖",
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms that understand your style, predict trends, and optimize collaborations."
    },
    {
      icon: "🔒",
      title: "Trust & Security",
      description: "Verified badges, secure payments, and transparent reviews ensure safe and authentic partnerships."
    },
    {
      icon: "📈",
      title: "Proven Results",
      description: "You can expect significant increases in earnings and campaign ROI with our AI-powered optimization tools."
    },
    {
      icon: "🇮🇳",
      title: "India-First Community",
      description: "Connect with fashion enthusiasts, brands, and influencers across India's vibrant fashion landscape."
    }
  ];

  // Tech stack
  const integrations = [
    { name: "MongoDB", icon: "🍃", description: "Database & data storage" },
    { name: "JanusGraph", icon: "🕸️", description: "Graph database for relationships" },
    { name: "Shopify", icon: "🛒", description: "E-commerce platform" },
    { name: "Instagram", icon: "📱", description: "Social media integration" },
    { name: "Razorpay", icon: "💳", description: "Payment processing" },
    { name: "OpenAI", icon: "🧠", description: "AI-powered intelligence" },
    { name: "AWS", icon: "☁️", description: "Cloud infrastructure" }
  ];

  return (
    <>
      <section id="about-us" className="about-us-snap">
        <div className="container">
          {/* Header */}
          <RevealOnScroll className="about-header">
            <h2 className="about-title">
              Why to Choose
              <span className="text-gradient"> TrendBag</span>
            </h2>
            <p className="about-subtitle">
              Join thousands of fashion enthusiasts, influencers, and brands who trust TrendBag
            </p>
          </RevealOnScroll>

          {/* Why Choose Us Section */}
          <div className="differentiators-section">
            <div className="differentiators-list">
              {differentiators.map((item, index) => (
                <RevealOnScroll
                  key={index}
                  className="differentiator-item"
                  delay={index * 200}
                >
                  <span className="differentiator-icon">{item.icon}</span>
                  <div className="differentiator-content">
                    <h4 className="differentiator-title">{item.title}</h4>
                    <p className="differentiator-description">{item.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="integrations" className="integrations-snap">
        <div className="container">
          <RevealOnScroll className="integrations-section">
            <h3 className="section-subtitle">Powered by</h3>
            <div className="integrations-scroll-container">
              {/* Row 1: Normal Scroll */}
              <div className="integrations-scroll">
                {integrations.map((integration, index) => (
                  <div
                    key={`r1-1-${index}`}
                    className="integration-card"
                  >
                    <div className="integration-icon">{integration.icon}</div>
                    <h4 className="integration-name">{integration.name}</h4>
                    <p className="integration-description">{integration.description}</p>
                  </div>
                ))}
                {integrations.map((integration, index) => (
                  <div
                    key={`r1-2-${index}`}
                    className="integration-card"
                  >
                    <div className="integration-icon">{integration.icon}</div>
                    <h4 className="integration-name">{integration.name}</h4>
                    <p className="integration-description">{integration.description}</p>
                  </div>
                ))}
              </div>

              {/* Row 2: Reverse Scroll */}
              <div className="integrations-scroll reverse">
                {integrations.map((integration, index) => (
                  <div
                    key={`r2-1-${index}`}
                    className="integration-card"
                  >
                    <div className="integration-icon">{integration.icon}</div>
                    <h4 className="integration-name">{integration.name}</h4>
                    <p className="integration-description">{integration.description}</p>
                  </div>
                ))}
                {integrations.map((integration, index) => (
                  <div
                    key={`r2-2-${index}`}
                    className="integration-card"
                  >
                    <div className="integration-icon">{integration.icon}</div>
                    <h4 className="integration-name">{integration.name}</h4>
                    <p className="integration-description">{integration.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="mission" className="mission-snap">
        <div className="container">
          {/* Company Mission */}
          <RevealOnScroll className="mission-section">
            <div className="mission-content">
              <h3 className="mission-title">Our Mission</h3>
              <p className="mission-text">
                We are revolutionizing the way the world discovers fashion by bridging the gap between creators, brands, and trendsetters.
                We empower you to define your unique style through AI-driven insights, fostering a community where authenticity thrives and every connection creates value.
              </p>
            </div>
          </RevealOnScroll>

          {/* CTA Section */}
          <RevealOnScroll className="cta-section" delay={200}>
            <h3 className="cta-title">Ready to Transform Your Fashion Journey?</h3>
            <div className="cta-buttons">
              <Button variant="gradient" size="large">
                Coming Soon
              </Button>
              <Button variant="outline" size="large">
                Partner With Us
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

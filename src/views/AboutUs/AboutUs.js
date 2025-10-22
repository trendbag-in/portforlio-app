import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';
import './AboutUs.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef(null);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Fashion Influencer",
      avatar: "👩‍💼",
      rating: 5,
      quote: "TrendBag transformed my influencer journey! The AI matching helped me connect with perfect brands, and my earnings increased by 300% in just 3 months.",
      location: "Los Angeles, CA"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Brand Manager",
      avatar: "👨‍💼",
      rating: 5,
      quote: "The collaboration hub is game-changing. We've streamlined our influencer partnerships and seen a 250% increase in campaign ROI.",
      location: "New York, NY"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Fashion Enthusiast",
      avatar: "👩‍🎨",
      rating: 5,
      quote: "Finally, an app that understands my style! The AI wardrobe intelligence is like having a personal stylist 24/7. I've never looked better!",
      location: "London, UK"
    },
  ];

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
      description: "Our users see 300% average increase in earnings and 250% improvement in campaign ROI."
    },
    {
      icon: "🌍",
      title: "Global Community",
      description: "Connect with fashion enthusiasts, brands, and influencers from over 50 countries worldwide."
    }
  ];

  // Integration partners
  const integrations = [
    { name: "Instagram", icon: "📱", description: "Seamless sync & auto-tagging" },
    { name: "Stripe", icon: "💳", description: "Secure payment processing" },
    { name: "OpenAI", icon: "🧠", description: "AI-powered recommendations" },
    { name: "Shopify", icon: "🛒", description: "E-commerce integration" },
    { name: "Google AI", icon: "🔍", description: "Visual search technology" },
    { name: "PayPal", icon: "💰", description: "Global payment solutions" },
    { name: "Meta", icon: "📘", description: "Social media integration" },
    { name: "AWS", icon: "☁️", description: "Cloud infrastructure" },
    { name: "Microsoft", icon: "🪟", description: "Enterprise solutions" },
    { name: "Apple", icon: "🍎", description: "iOS integration" },
    { name: "Android", icon: "🤖", description: "Android platform" },
    { name: "TikTok", icon: "🎵", description: "Short-form content" },
    { name: "YouTube", icon: "📺", description: "Video platform" },
    { name: "Twitter", icon: "🐦", description: "Social engagement" },
    { name: "LinkedIn", icon: "💼", description: "Professional network" },
    { name: "Pinterest", icon: "📌", description: "Visual discovery" },
    { name: "Snapchat", icon: "👻", description: "AR experiences" },
    { name: "Twitch", icon: "🎮", description: "Live streaming" },
    { name: "Discord", icon: "💬", description: "Community platform" },
    { name: "Slack", icon: "💬", description: "Team collaboration" }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="about-us" className="about-us section-large" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`about-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="about-title">
            Why Fashion Leaders Choose
            <span className="text-gradient"> TrendBag</span>
          </h2>
          <p className="about-subtitle">
            Join thousands of fashion enthusiasts, influencers, and brands who trust TrendBag to revolutionize their fashion journey
          </p>
        </div>

        {/* Testimonials Section */}
        <div className={`testimonials-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h3 className="section-subtitle">What Our Community Says</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <p className="testimonial-location">{testimonial.location}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className={`differentiators-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h3 className="section-subtitle">Why Choose TrendBag?</h3>
          <div className="differentiators-list">
            {differentiators.map((item, index) => (
              <div 
                key={index} 
                className="differentiator-item"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="differentiator-icon">{item.icon}</span>
                <div className="differentiator-content">
                  <h4 className="differentiator-title">{item.title}</h4>
                  <p className="differentiator-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Showcase */}
        <div className={`integrations-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h3 className="section-subtitle">Powered by Industry Leaders</h3>
          <div className="integrations-scroll-container">
            <div className="integrations-scroll">
              {/* First set of integrations */}
              {integrations.map((integration, index) => (
                <div 
                  key={`first-${index}`} 
                  className={`integration-card ${index % 2 === 0 ? 'gradient' : ''}`}
                >
                  <div className="integration-icon">{integration.icon}</div>
                  <h4 className="integration-name">{integration.name}</h4>
                  <p className="integration-description">{integration.description}</p>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {integrations.map((integration, index) => (
                <div 
                  key={`second-${index}`} 
                  className={`integration-card ${index % 2 === 0 ? 'gradient' : ''}`}
                >
                  <div className="integration-icon">{integration.icon}</div>
                  <h4 className="integration-name">{integration.name}</h4>
                  <p className="integration-description">{integration.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Mission */}
        <div className={`mission-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="mission-content">
            <h3 className="mission-title">Our Mission</h3>
            <p className="mission-text">
              To democratize fashion by connecting brands, influencers, and enthusiasts through AI-powered technology. 
              We believe everyone deserves access to personalized style, authentic partnerships, and seamless shopping experiences.
            </p>
            <div className="mission-stats">
              <div className="mission-stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="mission-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Brand Partners</span>
              </div>
              <div className="mission-stat">
                <span className="stat-number">2K+</span>
                <span className="stat-label">Influencers</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`cta-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h3 className="cta-title">Ready to Transform Your Fashion Journey?</h3>
          <p className="cta-subtitle">Join the fashion revolution today</p>
          <div className="cta-buttons">
            <Button variant="gradient" size="large">
              Coming Soon
            </Button>
            <Button variant="outline" size="large">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

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
            Why to Choose
            <span className="text-gradient"> TrendBag</span>
          </h2>
          <p className="about-subtitle">
            Join thousands of fashion enthusiasts, influencers, and brands who trust TrendBag to revolutionize their fashion journey
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className={`differentiators-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
        
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
          <h3 className="section-subtitle">Powered by</h3>
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

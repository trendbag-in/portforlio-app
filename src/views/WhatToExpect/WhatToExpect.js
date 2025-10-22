import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import './WhatToExpect.css';

const WhatToExpect = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('what-to-expect');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const userTypes = [
    {
      id: 'brands',
      title: 'Fashion Brands',
      subtitle: 'Amplify Your Reach',
      icon: '🏢',
      steps: [
        {
          icon: '📊',
          title: 'Brand Profile Creation',
          description: 'You will be able to set up your brand presence and showcase your products to millions'
        },
        {
          icon: '🎯',
          title: 'AI-Powered Influencer Matching',
          description: 'Our AI will help you discover influencers who align perfectly with your brand values'
        },
        {
          icon: '🤝',
          title: 'Collaboration Management',
          description: 'Facilitate partnerships with influencers through streamlined communication and contract tools'
        },
        {
          icon: '📈',
          title: 'Campaign Management',
          description: 'Create and manage influencer campaigns, track deliverables, and monitor campaign performance'
        },
        {
          icon: '📱',
          title: 'Instagram Integration',
          description: 'Auto-sync your Instagram posts, tag products, and automatically send product links to users via DM'
        },
        {
          icon: '📊',
          title: 'Performance Analytics',
          description: 'Track ROI, engagement, and sales with comprehensive analytics and reporting'
        }
      ],
      cta: 'Join Brand Waitlist',
      color: 'primary'
    },
    {
      id: 'influencers',
      title: 'Content Creators',
      subtitle: 'Monetize Your Influence',
      icon: '📸',
      steps: [
        {
          icon: '🚀',
          title: 'Creator Program Access',
          description: 'Join our exclusive influencer program with instant verification process'
        },
        {
          icon: '📱',
          title: 'Instagram Integration',
          description: 'Sync your Instagram posts and tag products to earn from your content'
        },
        {
          icon: '🤝',
          title: 'Brand Partnership Matching',
          description: 'Get matched with relevant brands and start earning from meaningful partnerships'
        },
        {
          icon: '💰',
          title: 'Performance Tracking & Payments',
          description: 'Monitor your performance and receive automatic payments for successful campaigns'
        }
      ],
      cta: 'Join Creator Waitlist',
      color: 'primary'
    },
    {
      id: 'users',
      title: 'Fashion Enthusiasts',
      subtitle: 'Discover Your Perfect Style',
      icon: '👥',
      steps: [
        {
          icon: '📱',
          title: 'Easy App Setup',
          description: 'Download the app and create your personalized profile in under 2 minutes'
        },
        {
          icon: '🎯',
          title: 'AI Style Learning',
          description: 'Our AI will learn your preferences and analyze your existing wardrobe'
        },
        {
          icon: '🛍️',
          title: 'Personalized Shopping',
          description: 'Receive personalized recommendations and shop from verified brands'
        },
        {
          icon: '✨',
          title: 'Style Creation & Sharing',
          description: 'Create stunning outfits and share your style with our community'
        }
      ],
      cta: 'Get Early Access',
      color: 'primary'
    },
  ];

  return (
    <section id="what-to-expect" className="what-to-expect section-medium">
      <div className="container">
        <div className={`what-to-expect-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="what-to-expect-title">
            What to Expect from
            <span className="text-gradient"> TrendBag</span>
          </h2>
          <p className="what-to-expect-subtitle">
            Discover the exciting features coming to revolutionize your fashion experience
          </p>
        </div>

        <div className="user-type-tabs">
          {userTypes.map((userType, index) => (
            <button
              key={userType.id}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="tab-icon">{userType.icon}</span>
              <span className="tab-title">{userType.title}</span>
            </button>
          ))}
        </div>

        <div className="user-journey">
          <div className={`journey-content ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <div className="journey-header">
              <h3 className="journey-title">{userTypes[activeTab].title}</h3>
              <p className="journey-subtitle">{userTypes[activeTab].subtitle}</p>
            </div>

            <div className="steps-container">
              {userTypes[activeTab].steps.map((step, index) => (
                <div
                  key={index}
                  className={`step-item ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-content">
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-description">{step.description}</p>
                  </div>
                  {index < userTypes[activeTab].steps.length - 1 && (
                    <div className="step-connector"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="journey-cta">
              <Button
                variant={userTypes[activeTab].color}
                size="large"
                onClick={() => console.log(`CTA clicked for ${userTypes[activeTab].id}`)}
              >
                {userTypes[activeTab].cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;

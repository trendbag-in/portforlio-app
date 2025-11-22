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
          description: 'Set up your brand presence and showcase your products to millions of engaged users.'
        },
        {
          icon: '🎯',
          title: 'AI Matching',
          description: 'Our AI discovers influencers who align perfectly with your brand values and aesthetics.'
        },
        {
          icon: '📈',
          title: 'Campaign Analytics',
          description: 'Track ROI, engagement, and sales with comprehensive real-time analytics.'
        }
      ],
      cta: 'Join Brand Waitlist',
      color: 'primary'
    },
    {
      id: 'influencers',
      title: 'Creators',
      subtitle: 'Monetize Your Influence',
      icon: '📸',
      steps: [
        {
          icon: '🚀',
          title: 'Creator Access',
          description: 'Join our exclusive influencer program with instant verification process.'
        },
        {
          icon: '🤝',
          title: 'Brand Partnerships',
          description: 'Get matched with relevant brands and start earning from meaningful partnerships.'
        },
        {
          icon: '💰',
          title: 'Smart Payments',
          description: 'Monitor your performance and receive automatic payments for successful campaigns.'
        }
      ],
      cta: 'Join Creator Waitlist',
      color: 'primary'
    },
    {
      id: 'users',
      title: 'Enthusiasts',
      subtitle: 'Discover Your Style',
      icon: '✨',
      steps: [
        {
          icon: '🎯',
          title: 'Style AI',
          description: 'Our AI learns your preferences and analyzes your existing wardrobe for perfect matches.'
        },
        {
          icon: '🛍️',
          title: 'Smart Shopping',
          description: 'Receive personalized recommendations and shop directly from verified brands.'
        },
        {
          icon: '👗',
          title: 'Virtual Try-On',
          description: 'Visualize how items will look on you before you buy with AR technology.'
        }
      ],
      cta: 'Get Early Access',
      color: 'primary'
    }
  ];

  return (
    <section id="what-to-expect" className="what-to-expect">
      <div className="container">
        <div className={`what-to-expect-header ${isVisible ? 'animate-fade-up' : ''}`}>
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

        <div className="journey-content">
          <div className={`journey-info ${isVisible ? 'animate-fade-up' : ''}`}>
            <h3 className="journey-title">{userTypes[activeTab].title}</h3>
            <p className="journey-subtitle">{userTypes[activeTab].subtitle}</p>

            <div className="journey-cta">
              <Button
                variant="primary"
                size="large"
                onClick={() => console.log(`CTA clicked for ${userTypes[activeTab].id}`)}
              >
                {userTypes[activeTab].cta}
              </Button>
            </div>
          </div>

          <div className="steps-container">
            {userTypes[activeTab].steps.map((step, index) => (
              <div
                key={index}
                className={`step-item ${isVisible ? 'animate-fade-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="step-header">
                  <div className="step-icon">{step.icon}</div>
                  <h4 className="step-title">{step.title}</h4>
                </div>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;

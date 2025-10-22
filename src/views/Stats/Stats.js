import React, { useState, useEffect, useRef } from 'react';
import './Stats.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    users: 0,
    products: 0,
    satisfaction: 0,
    brands: 0,
    influencers: 0,
    revenue: 0
  });
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 'users',
      icon: '👥',
      number: 50000,
      suffix: '+',
      label: 'Active Users',
      description: 'Fashion enthusiasts discovering their perfect style'
    },
    {
      id: 'products',
      icon: '🏷️',
      number: 1000000,
      suffix: '+',
      label: 'Products Tagged',
      description: 'Items successfully identified and catalogued'
    },
    {
      id: 'satisfaction',
      icon: '⭐',
      number: 95,
      suffix: '%',
      label: 'Satisfaction Rate',
      description: 'Users love their personalized recommendations'
    },
    {
      id: 'brands',
      icon: '🏢',
      number: 500,
      suffix: '+',
      label: 'Brand Partners',
      description: 'Fashion brands growing their reach'
    },
    {
      id: 'influencers',
      icon: '📸',
      number: 2000,
      suffix: '+',
      label: 'Active Influencers',
      description: 'Content creators monetizing their influence'
    },
    {
      id: 'revenue',
      icon: '💰',
      number: 10,
      suffix: 'M+',
      label: 'Revenue Generated',
      description: 'Total value created for our community'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat) => {
      let currentStep = 0;
      const increment = stat.number / steps;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(Math.floor(increment * currentStep), stat.number);
        
        setCounters(prev => ({
          ...prev,
          [stat.id]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <section id="stats" ref={sectionRef} className="stats section-medium">
      <div className="container">
        <div className={`stats-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="stats-title">
            Trusted by Millions
            <span className="text-gradient"> Worldwide</span>
          </h2>
          <p className="stats-subtitle">
            Join the fashion revolution that's transforming how people discover, create, and share style
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`stat-card ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">
                <span className="number-value">
                  {stat.id === 'revenue' ? formatNumber(counters[stat.id]) : counters[stat.id].toLocaleString()}
                </span>
                <span className="number-suffix">{stat.suffix}</span>
              </div>
              <h3 className="stat-label">{stat.label}</h3>
              <p className="stat-description">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className={`stats-cta ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <p className="cta-text">Ready to be part of the future of fashion?</p>
          <button className="cta-button">
            Join TrendBag Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;

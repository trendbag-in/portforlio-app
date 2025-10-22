import React from 'react';
import Button from '../../components/Button';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero section-hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title animate-fade-in-up">
              The Revolutionary
              <span className="text-gradient"> AI-Powered</span>
              <br />
              Fashion Platform
            </h1>
            
            <p className="hero-subtitle animate-fade-in-up">
              Connecting brands, influencers, and fashion enthusiasts in one seamless ecosystem.
              <br />
              <strong>Your Personal Stylist, Shopping Companion, and Fashion Community - All in One</strong>
            </p>
            
            <div className="hero-buttons animate-fade-in-up">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => console.log('Coming Soon')}
              >
                Coming Soon on iOS & Android
              </Button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-interface">
                  <div className="app-header">
                    <div className="app-nav"></div>
                  </div>
                  <div className="app-content">
                    <div className="content-card"></div>
                    <div className="content-card"></div>
                    <div className="content-card"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

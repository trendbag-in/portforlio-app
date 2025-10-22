import React from 'react';
import Card from '../../../components/Card';
import './Trust.css';

const Trust = () => {
  return (
    <div className="trust-feature">
      <div className="feature-header">
        <div className="feature-icon">✅</div>
        <h3>Trust & Verification</h3>
        <p>Building confidence through transparency and security</p>
      </div>
      
      <div className="trust-grid">
        <Card variant="default" className="trust-card">
          <div className="card-icon">🏆</div>
          <h4>Verified Badges</h4>
          <p>Authentic brands and influencers get verified badges to ensure trust and credibility in the marketplace.</p>
        </Card>
        
        <Card variant="default" className="trust-card">
          <div className="card-icon">🔒</div>
          <h4>Secure Payment System</h4>
          <p>Safe and secure payment processing for all collaborations with automated escrow and milestone-based releases.</p>
        </Card>
        
        <Card variant="default" className="trust-card">
          <div className="card-icon">⭐</div>
          <h4>Transparent Reviews</h4>
          <p>Honest reviews and ratings system that helps users make informed decisions and builds community trust.</p>
        </Card>
      </div>
    </div>
  );
};

export default Trust;

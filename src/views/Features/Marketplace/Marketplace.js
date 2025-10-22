import React from 'react';
import Card from '../../../components/Card';
import './Marketplace.css';

const Marketplace = () => {
  return (
    <div className="marketplace-feature">
      <div className="feature-header">
        <div className="feature-icon">🛍️</div>
        <h3>Three-Sided Marketplace</h3>
        <p>Connecting all stakeholders in the fashion ecosystem</p>
      </div>
      
      <div className="marketplace-grid">
        <Card variant="gradient" className="marketplace-card">
          <div className="card-icon">👥</div>
          <h4>End Users</h4>
          <p>Discover, shop, and get AI-powered style recommendations tailored to your unique taste and preferences.</p>
        </Card>
        
        <Card variant="gradient" className="marketplace-card">
          <div className="card-icon">📸</div>
          <h4>Influencers</h4>
          <p>Monetize content, collaborate with brands, and get automated engagement tools to grow your audience.</p>
        </Card>
        
        <Card variant="gradient" className="marketplace-card">
          <div className="card-icon">🏢</div>
          <h4>Brands</h4>
          <p>Reach targeted audiences, get verified badges, and build meaningful partnerships with top influencers.</p>
        </Card>
      </div>
    </div>
  );
};

export default Marketplace;

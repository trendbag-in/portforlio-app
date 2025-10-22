import React from 'react';
import Card from '../../../components/Card';
import './Discovery.css';

const Discovery = () => {
  return (
    <div className="discovery-feature">
      <div className="feature-header">
        <div className="feature-icon">🔍</div>
        <h3>AI-Powered Discovery</h3>
        <p>Intelligent content and product discovery tailored to you</p>
      </div>
      
      <div className="discovery-grid">
        <Card variant="glass" className="discovery-card">
          <div className="card-icon">🎯</div>
          <h4>Personalized Content Feed</h4>
          <p>AI recommends products, outfits, and influencers based on your unique style DNA and preferences.</p>
        </Card>
        
        <Card variant="glass" className="discovery-card">
          <div className="card-icon">📷</div>
          <h4>Visual Search</h4>
          <p>Find products by uploading photos or describing styles. AI understands what you're looking for instantly.</p>
        </Card>
        
        <Card variant="glass" className="discovery-card">
          <div className="card-icon">📈</div>
          <h4>Trend Predictions</h4>
          <p>Stay ahead with AI trend forecasting that predicts what will be popular before it hits mainstream.</p>
        </Card>
      </div>
    </div>
  );
};

export default Discovery;

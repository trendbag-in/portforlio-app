import React from 'react';
import Card from '../../../components/Card';
import './Collaboration.css';

const Collaboration = () => {
  return (
    <div className="collaboration-feature">
      <div className="feature-header">
        <div className="feature-icon">🤝</div>
        <h3>Smart Collaboration Hub</h3>
        <p>Streamlined partnerships between brands and influencers</p>
      </div>
      
      <div className="collaboration-grid">
        <Card variant="default" className="collaboration-card">
          <div className="card-icon">📋</div>
          <h4>Contract Management</h4>
          <p>Built-in collaboration agreements between brands and influencers with automated payment tracking and milestone management.</p>
        </Card>
        
        <Card variant="default" className="collaboration-card">
          <div className="card-icon">📊</div>
          <h4>Campaign Tracking</h4>
          <p>Monitor performance, engagement, and ROI with real-time analytics and detailed reporting for all campaigns.</p>
        </Card>
      </div>
    </div>
  );
};

export default Collaboration;

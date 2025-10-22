import React from 'react';
import Card from '../../../components/Card';
import './Instagram.css';

const Instagram = () => {
  return (
    <div className="instagram-feature">
      <div className="feature-header">
        <div className="feature-icon">📱</div>
        <h3>Instagram Supercharged</h3>
        <p>Seamless integration with your existing Instagram workflow</p>
      </div>
      
      <div className="instagram-grid">
        <Card variant="gradient" className="instagram-card">
          <div className="card-icon">🔄</div>
          <h4>Seamless Sync</h4>
          <p>Import Instagram posts without re-uploading. Your content flows seamlessly into TrendBag's ecosystem.</p>
        </Card>
        
        <Card variant="gradient" className="instagram-card">
          <div className="card-icon">🏷️</div>
          <h4>Auto Product Tagging</h4>
          <p>Tag products on synced posts instantly with AI-powered recognition and smart tagging suggestions.</p>
        </Card>
        
        <Card variant="gradient" className="instagram-card">
          <div className="card-icon">💬</div>
          <h4>DM Automation</h4>
          <p>Automated comment responses sending product links directly to customer DMs for seamless shopping experience.</p>
        </Card>
      </div>
    </div>
  );
};

export default Instagram;

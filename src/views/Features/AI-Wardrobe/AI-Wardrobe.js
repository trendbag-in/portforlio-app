import React from 'react';
import Card from '../../../components/Card';
import './AI-Wardrobe.css';

const AIWardrobe = () => {
  return (
    <div className="ai-wardrobe-feature">
      <div className="feature-header">
        <div className="feature-icon">🤖</div>
        <h3>AI Wardrobe Intelligence</h3>
        <p>Smart AI that understands your style and wardrobe</p>
      </div>
      
      <div className="ai-features-grid">
        <Card variant="glass" className="ai-feature-card">
          <div className="card-icon">👔</div>
          <h4>Smart Wardrobe Analyzer</h4>
          <p>AI scans your closet and suggests what to buy next based on gaps, style preferences, and current trends.</p>
        </Card>
        
        <Card variant="glass" className="ai-feature-card">
          <div className="card-icon">📸</div>
          <h4>OOTD Analyzer</h4>
          <p>Upload your outfit and get instant styling feedback and improvement suggestions from your existing wardrobe.</p>
        </Card>
        
        <Card variant="glass" className="ai-feature-card">
          <div className="card-icon">🎯</div>
          <h4>Personal Style AI</h4>
          <p>Quick product discovery matching your unique taste and preferences with AI-powered recommendations.</p>
        </Card>
      </div>
    </div>
  );
};

export default AIWardrobe;

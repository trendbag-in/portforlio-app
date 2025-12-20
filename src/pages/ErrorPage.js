import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">
            <span className="error-number">404</span>
          </div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-message">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <div className="error-actions">
            <Link to="/" className="error-button primary">
              Go Back Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="error-button secondary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;


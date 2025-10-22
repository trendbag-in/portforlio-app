import React from 'react';
import { Link } from 'react-router-dom';
import SurveyView from '../views/Survey';

const SurveyPage = () => {
  return (
    <div className="SurveyPage">
      {/* Home Button */}
      <div className="survey-home-btn">
        <Link to="/" className="home-button">
          ← Back to Home
        </Link>
      </div>
      
      <SurveyView />
    </div>
  );
};

export default SurveyPage;

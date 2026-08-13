import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => (
  <div className="error-page">
    <div className="error-content">
      <p className="error-eyebrow">Error 404</p>

      {/* Single-weight line art in ink-tertiary — no fill, no colour, no shading. */}
      <svg
        className="error-art"
        viewBox="0 0 96 96"
        width="120"
        height="120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 32h60l-5 46a6 6 0 01-6 5H29a6 6 0 01-6-5z" />
        <path d="M36 32V22a12 12 0 0124 0v10" />
        <path d="M38 52h20" />
      </svg>

      <h1 className="error-title">This page isn't here.</h1>
      <p className="error-message">
        The link may have moved or expired. The home page is the fastest way back to
        everything else.
      </p>

      <div className="error-actions">
        <Link to="/" className="tb-btn tb-btn--primary">Back to home</Link>
        <button onClick={() => window.history.back()} className="tb-btn tb-btn--secondary">
          Go back
        </button>
      </div>
    </div>
  </div>
);

export default ErrorPage;

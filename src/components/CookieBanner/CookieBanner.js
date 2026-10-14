import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, setConsent, OPEN_EVENT } from '../../hooks/consent';
import './CookieBanner.css';

// Asks once per device; the footer's "Cookie settings" brings it back.
const CookieBanner = () => {
  const [open, setOpen] = useState(() => getConsent() === null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  const choose = (value) => {
    setConsent(value);
    if (value === 'all') {
      // Keep what the visitor already picked this visit.
      try {
        localStorage.setItem('theme', document.documentElement.getAttribute('data-theme') || 'dark');
        const persona = new URLSearchParams(window.location.search).get('for');
        if (persona) localStorage.setItem('tb-persona', persona);
      } catch (e) { /* storage blocked */ }
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <section className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <p className="cookie-text">
        We use essential storage to run this site. With your OK we also remember your theme
        and who you said you are. No ads, no tracking. <Link to="/cookies">Cookie policy</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn" onClick={() => choose('essential')}>Essential only</button>
        <button type="button" className="cookie-btn cookie-btn--primary" onClick={() => choose('all')}>Accept all</button>
      </div>
    </section>
  );
};

export default CookieBanner;

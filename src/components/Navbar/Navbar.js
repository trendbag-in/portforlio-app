import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('light'); // Default to light for Wishlink vibe

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'shoppers', label: 'What we do' }, // Linked to the first Discovery section
    { id: 'about-us', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  // Theme Toggle Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Removed scroll-based visibility logic as Navbar is now static at top

  // Navigation Logic
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Optional: Wait for navigation then scroll, but for 'hero' usually top is fine.
      // If jumping to specific section from other page is needed, we'd need a context or query param.
      // For now, logo -> home (top) is sufficient.
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      return;
    }

    const element = document.getElementById(sectionId);
    const appContainer = document.querySelector('.App');
    if (element) {
      // Natural scroll
      const yOffset = -0;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <button className="brand-button" onClick={() => scrollToSection('hero')}>
            <span className="brand-text">Trend<span>Bag</span></span>
          </button>
        </div>

        {/* Navigation items removed as per user request */}
        <div className="navbar-menu">
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <div className="nav-contact-info">
            <a href="tel:+918005377342" className="nav-contact-link">+91 8005377342</a>
            <a href="mailto:team@trendabg.in" className="nav-contact-link">team@trendabg.in</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

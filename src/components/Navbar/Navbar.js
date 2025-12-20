import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('light'); // Default to light for Wishlink vibe

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'what-to-expect', label: 'For Brands' }, // Renamed for clearer value prop
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);

      if (scrollTop > lastScrollY && scrollTop > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${!isVisible ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <button className="brand-button" onClick={() => scrollToSection('hero')}>
            <span className="brand-text">Trend<span>Bag</span></span>
          </button>
        </div>

        <div className="navbar-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`navbar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <a 
            href="https://app.trendbag.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-download-btn"
          >
            Download App
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

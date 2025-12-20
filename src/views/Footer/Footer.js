import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#hero', isRoute: false },
    { label: 'About Us', href: '#about-us', isRoute: false },
    { label: 'Survey', href: '#/survey', isRoute: true },
    { label: 'Contact', href: '#contact', isRoute: false },
    { label: 'App', href: 'https://app.trendbag.in', isExternal: true }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: '📱', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <button className="footer-logo" onClick={scrollToTop}>
              <span className="brand-text">TrendBag</span>
            </button>
            <p className="footer-tagline">
              Your Personal Stylist, Shopping Companion, and Fashion Community - All in One
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isExternal ? (
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  ) : link.isRoute ? (
                    <Link to={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} TrendBag. All rights reserved.
            </p>
            <div className="legal-links">
              {legalLinks.map((link, index) => (
                <a key={index} href={link.href} className="legal-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

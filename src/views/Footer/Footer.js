import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  // ... (links definitions omitted for brevity if not changing) ...


  /* 
    const scrollToTop = () => {
      if (location.pathname !== '/') {
          navigate('/');
          window.scrollTo(0, 0);
          return;
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  */

  const quickLinks = [
    { label: 'Home', href: '#hero', isRoute: false },
    { label: 'About Us', href: '#about-us', isRoute: false },
    { label: 'Survey', href: '/survey', isRoute: true },
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
    { label: 'Privacy Policy', href: '/privacy', isRoute: true }
  ];

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo(0, 0);
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (href) => {
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    const appContainer = document.querySelector('.App');

    if (element && appContainer) {
      appContainer.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Consolidated handleLinkClick
  const handleLinkClick = (e, link) => {
    // If it's an external link, let default behavior happen
    if (link.isExternal) return;

    e.preventDefault();

    // If it's a route (like /survey), navigate to it
    if (link.isRoute) {
      // scroll to top handled by router or useEffect usually, but we can force it
      navigate(link.href);
      window.scrollTo(0, 0);
      return;
    }

    // If we are not on home page, navigate home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const elementId = link.href.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          const yOffset = -0;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
      return;
    }

    // If we are on home page, just scroll
    const elementId = link.href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -0;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo" onClick={scrollToTop} role="button" tabIndex={0}>
              <span className="brand-text">Trend<span>Bag</span></span>
            </div>
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
                    <a
                      href={link.href}
                      className="footer-link"
                      onClick={(e) => handleLinkClick(e, link)}
                    >
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

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-links">
              <li><a href="tel:+918005377342" className="footer-link">+91 8005377342</a></li>
              <li><a href="mailto:team@trendabg.in" className="footer-link">team@trendabg.in</a></li>
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
                link.isRoute ? (
                  <Link key={index} to={link.href} className="legal-link">
                    {link.label}
                  </Link>
                ) : (
                  <a key={index} href={link.href} className="legal-link">
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

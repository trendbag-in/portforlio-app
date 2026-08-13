import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Icon from '../../components/Icon';
import './Footer.css';

const PRODUCT_LINKS = [
  { label: 'Features', href: '#features' },
  { label: "Who it's for", href: '#who-its-for' },
  { label: 'Open the app', href: 'https://app.trendbag.in', external: true },
  { label: 'Book a demo', href: '#contact' }
];

const COMPANY_LINKS = [
  { label: 'About', href: '#about-us' },
  { label: 'Contact', href: '#contact' }
];

const LEGAL_LINKS = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Community guidelines', to: '/community-guidelines' },
  { label: 'Refunds', to: '/refund' },
  { label: 'Returns', to: '/returns' },
  { label: 'Shipping', to: '/shipping' }
];

const SOCIALS = [
  { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/trendbag.in' },
  { name: 'X', icon: 'x', url: 'https://x.com/trendbag_in' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/company/trendbag' },
  { name: 'YouTube', icon: 'youtube', url: 'https://youtube.com/@trendbag' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const goToAnchor = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        window.scrollTo({ top: el ? el.offsetTop : 0, behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset, behavior: 'smooth' });
  };

  const renderLink = (link) =>
    link.external ? (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-link">
        {link.label}
      </a>
    ) : (
      <a href={link.href} className="footer-link" onClick={(e) => goToAnchor(e, link.href)}>
        {link.label}
      </a>
    );

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-mark">
              <Logo size={28} />
              <span className="footer-wordmark">trendbag</span>
            </div>
            <p className="footer-tagline">
              Discover what creators wear, keep a wardrobe of what you own, and buy it
              in one place.
            </p>
            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                  aria-label={s.name}
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <p className="tb-overline footer-col-title">Product</p>
            <ul>{PRODUCT_LINKS.map((l) => <li key={l.label}>{renderLink(l)}</li>)}</ul>
          </div>

          <div className="footer-col">
            <p className="tb-overline footer-col-title">Company</p>
            <ul>{COMPANY_LINKS.map((l) => <li key={l.label}>{renderLink(l)}</li>)}</ul>
          </div>

          <div className="footer-col">
            <p className="tb-overline footer-col-title">Contact</p>
            <ul>
              <li><a href="tel:+918005377342" className="footer-link">+91 80053 77342</a></li>
              <li><a href="mailto:team@trendbag.in" className="footer-link">team@trendbag.in</a></li>
            </ul>
            <address className="footer-address">
              Holygrims Private Limited<br />
              D-9 Sector 3, Noida<br />
              Gautam Buddha Nagar 201301<br />
              Uttar Pradesh, India
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {currentYear} TrendBag. All rights reserved.</p>
          <nav className="footer-legal" aria-label="Legal">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="footer-legal-link">{l.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

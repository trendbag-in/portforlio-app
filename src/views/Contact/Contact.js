import React, { useEffect, useState } from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Icon from '../../components/Icon';
import { usePersona } from '../../hooks/persona';
import './Contact.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'https://api.trendbag.in';

/* Mirrors models.ValidLeadRoles in services/user-service — the API rejects
   anything outside this set. */
const ROLES = [
  { id: 'shopper', label: 'Shopper' },
  { id: 'creator', label: 'Creator' },
  { id: 'brand', label: 'Brand' },
  { id: 'other', label: 'Something else' }
];

// Brands pick their store platform instead of writing a message; the API still gets one message.
const PLATFORMS = ['Shopify', 'WooCommerce', 'Magento', 'Wix', 'Other'];

// defaultRole pins the role chip on pages that already know the visitor (/brands, /creators).
const Contact = ({ defaultRole }) => {
  const picked = usePersona();
  const persona = defaultRole || picked;
  const [role, setRole] = useState(persona);
  useEffect(() => setRole(persona), [persona]);
  const [formData, setFormData] = useState({ name: '', email: '', query: '', store: '' });
  const [platform, setPlatform] = useState('');
  const isBrand = role === 'brand';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBrand && !platform) {
      setError('Pick the platform your store runs on.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    const message = isBrand
      ? [`Platform: ${platform}`, formData.store && `Store: ${formData.store}`].filter(Boolean).join('\n')
      : formData.query;

    try {
      const res = await fetch(`${API_BASE}/api/user/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-APP': 'portfolio' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message,
          role
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'That did not send. Please try again.');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', query: '', store: '' });
      setPlatform('');
      setTimeout(() => setIsSuccess(false), 2500);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'That did not send. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact section-block">
      <div className="container contact-inner">
        <RevealOnScroll className="contact-side">
          <p className="tb-kicker tb-kicker--start">Get in touch</p>
          <h2>Tell us what you're building.</h2>
          <p className="section-lede">
            Partnership, press, or a question about how any of this works — we read
            everything that comes through here.
          </p>

          <div className="contact-rows">
            <a className="contact-row" href="tel:+918005377342">
              <span className="contact-icon"><Icon name="phone" size={18} /></span>
              <span>
                <span className="tb-overline">Phone</span>
                <span className="contact-value">+91 80053 77342</span>
              </span>
            </a>
            <a className="contact-row" href="mailto:team@trendbag.in">
              <span className="contact-icon"><Icon name="mail" size={18} /></span>
              <span>
                <span className="tb-overline">Email</span>
                <span className="contact-value">team@trendbag.in</span>
              </span>
            </a>
            <div className="contact-row">
              <span className="contact-icon"><Icon name="pin" size={18} /></span>
              <span>
                <span className="tb-overline">Office</span>
                <span className="contact-value">D-9 Sector 3, Noida 201301</span>
              </span>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="contact-form-side" delay={160}>
          <div className="contact-panel tb-card--ruled">
            <h3>{isBrand ? 'Tell us about your store' : 'Send us a message'}</h3>
            <p className="contact-panel-lede">We usually reply within two working days.</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <fieldset className="contact-field contact-roles">
                <legend>I'm a</legend>
                <div className="contact-role-chips">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      aria-pressed={role === r.id}
                      className={`tb-chip ${role === r.id ? 'tb-chip--active' : ''}`}
                      onClick={() => setRole(r.id)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="name">Full name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              {isBrand ? (
                <>
                  <fieldset className="contact-field contact-roles">
                    <legend>Your store runs on</legend>
                    <div className="contact-role-chips">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          aria-pressed={platform === p}
                          className={`tb-chip ${platform === p ? 'tb-chip--active' : ''}`}
                          onClick={() => setPlatform(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div className="contact-field">
                    <label htmlFor="store">Store website</label>
                    <input
                      type="text"
                      inputMode="url"
                      id="store"
                      name="store"
                      value={formData.store}
                      onChange={handleInputChange}
                      placeholder="yourbrand.com"
                    />
                  </div>
                </>
              ) : (
                <div className="contact-field">
                  <label htmlFor="query">Your message</label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    placeholder="Tell us what you have in mind."
                    rows="5"
                    required
                  />
                </div>
              )}

              {error && <p className="contact-error" role="alert">{error}</p>}

              <button type="submit" className="tb-btn tb-btn--primary contact-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending' : isSuccess ? 'Sent' : 'Send message'}
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;

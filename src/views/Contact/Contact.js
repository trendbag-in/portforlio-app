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

// Tap-to-answer questions per role instead of a free-text message; all required.
const QUESTIONS = {
  brand: [{ id: 'platform', label: 'Your store runs on', options: ['Shopify', 'WooCommerce', 'Magento', 'Wix', 'Other'] }],
  creator: [
    { id: 'niche', label: 'You mostly post about', options: ['Fashion', 'Beauty', 'Lifestyle', 'Fitness', 'Travel', 'Food', 'Other'] },
    { id: 'followers', label: 'Instagram followers', options: ['Under 1K', '1K–10K', '10K–50K', '50K–100K', '100K+'] },
    { id: 'source', label: 'Where did you hear about us', options: ['Instagram', 'A friend or creator', 'Google', 'College', 'LinkedIn', 'Other'] }
  ]
};
// Optional text field per role.
const EXTRA = {
  brand: { id: 'store', label: 'Store website', placeholder: 'yourbrand.com', inputMode: 'url' },
  creator: { id: 'handle', label: 'Instagram handle', placeholder: '@yourhandle' }
};

// defaultRole pins the role chip on pages that already know the visitor (/brands, /creators).
const Contact = ({ defaultRole }) => {
  const picked = usePersona();
  const persona = defaultRole || picked;
  const [role, setRole] = useState(persona);
  useEffect(() => setRole(persona), [persona]);
  const [formData, setFormData] = useState({ name: '', email: '', store: '', handle: '' });
  const [answers, setAnswers] = useState({});
  const isBrand = role === 'brand';
  const questions = QUESTIONS[role] || [];
  const extra = EXTRA[role];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = questions.find((q) => !answers[q.id]);
    if (missing) {
      setError(`Pick an answer for "${missing.label}".`);
      return;
    }
    setIsSubmitting(true);
    setError('');
    // No free-text message any more; the API still requires one, so send what the form knows.
    const lines = [
      ...questions.map((q) => `${q.label}: ${answers[q.id]}`),
      extra && formData[extra.id] && `${extra.label}: ${formData[extra.id]}`
    ].filter(Boolean);
    const message = lines.length ? lines.join('\n') : `Contact request (${ROLES.find((r) => r.id === role)?.label || 'Other'})`;

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
      setFormData({ name: '', email: '', store: '', handle: '' });
      setAnswers({});
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
            <h3>{isBrand ? 'Tell us about your store' : role === 'creator' ? 'Tell us about your page' : 'Leave your details'}</h3>
            <p className="contact-panel-lede">We usually get back within two working days.</p>

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

              {questions.map((q) => (
                <fieldset key={q.id} className="contact-field contact-roles">
                  <legend>{q.label}</legend>
                  <div className="contact-role-chips">
                    {q.options.map((o) => (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={answers[q.id] === o}
                        className={`tb-chip ${answers[q.id] === o ? 'tb-chip--active' : ''}`}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: o }))}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}

              {extra && (
                <div className="contact-field">
                  <label htmlFor={extra.id}>{extra.label}</label>
                  <input
                    type="text"
                    inputMode={extra.inputMode}
                    id={extra.id}
                    name={extra.id}
                    value={formData[extra.id]}
                    onChange={handleInputChange}
                    placeholder={extra.placeholder}
                  />
                </div>
              )}

              {error && <p className="contact-error" role="alert">{error}</p>}

              <button type="submit" className="tb-btn tb-btn--primary contact-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending' : isSuccess ? 'Sent' : 'Send'}
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;

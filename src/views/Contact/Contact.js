import React, { useState } from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Button from '../../components/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = process.env.REACT_APP_API_BASE || 'https://api.trendbag.in';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/user/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-APP': 'portfolio'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.query
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', query: '' });

      // Reset button state after 2 seconds
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact section-large">
      <div className="container">
        {/* Header */}
        {/* Contact Content */}
        <div className="contact-content">
          {/* Header / Left Column */}
          <RevealOnScroll className="contact-header-side">
            <h2 className="contact-title">
              Get in
              <span className="text-gradient"> Touch</span>
            </h2>
            <p className="contact-subtitle">
              Ready to revolutionize your fashion journey? Let's connect and explore how TrendBag can transform your experience.
            </p>
          </RevealOnScroll>

          {/* Contact Form / Right Column */}
          <RevealOnScroll className="contact-form-section" delay={200}>
            <div className="form-container">
              <h3 className="form-title">Send us a Message</h3>
              <p className="form-subtitle">
                Have questions about partnerships, features, or just want to say hello? We'd love to hear from you.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-col">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="form-col">
                  <label htmlFor="query" className="form-label">Your Message</label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us about your inquiry, partnership interest, or any questions you have..."
                    rows="5"
                    required
                  />
                </div>
                <div className="form-col form-button-container"></div>
                {error && (
                  <p className="form-error" role="alert" style={{ color: '#e5484d', marginBottom: '1rem' }}>
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  variant={isSuccess ? "success" : "gradient"}
                  size="large"
                  className={`submit-button ${isSubmitting ? 'submitting' : ''} ${isSuccess ? 'success' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : isSuccess ? '✓ Sent!' : 'Send Message'}
                </Button>
              </form>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};

export default Contact;

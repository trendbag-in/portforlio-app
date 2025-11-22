import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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

    // Send data to Google Sheets via Google Apps Script (using GET to avoid CORS)
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      message: formData.query,
      timestamp: new Date().toISOString(),
      source: 'TrendBag Contact Form'
    });

    // Start the request but don't wait for it
    fetch(`https://script.google.com/macros/s/AKfycbwfxDnOnNGvqagJ2BUTBli8G3dvCXnX0Sm_u6MBZwQTwi11rjf7BfOHiNK81Ifw3OIh/exec?${params}`, {
      method: 'GET',
      mode: 'no-cors'
    });

    // Show success and reset form after 2 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form in sync with success animation
      setFormData({
        name: '',
        email: '',
        query: ''
      });

      // Reset button state after another 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }, 2000);
  };

  return (
    <section id="contact" className="contact section-large" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        {/* Contact Content */}
        <div className="contact-content">
          {/* Header / Left Column */}
          <div className={`contact-header-side ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <h2 className="contact-title">
              Get in
              <span className="text-gradient"> Touch</span>
            </h2>
            <p className="contact-subtitle">
              Ready to revolutionize your fashion journey? Let's connect and explore how TrendBag can transform your experience.
            </p>
          </div>

          {/* Contact Form / Right Column */}
          <div className={`contact-form-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      query: ''
    });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <section id="contact" className="contact section-large" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`contact-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="contact-title">
            Get in
            <span className="text-gradient"> Touch</span>
          </h2>
          <p className="contact-subtitle">
            Ready to revolutionize your fashion journey? Let's connect and explore how TrendBag can transform your experience.
          </p>
        </div>

        {/* Contact Content */}
        <div className="contact-content">
          {/* Contact Form */}
          <div className={`contact-form-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <div className="form-container">
              <h3 className="form-title">Send us a Message</h3>
              <p className="form-subtitle">
                Have questions about partnerships, features, or just want to say hello? We'd love to hear from you.
              </p>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
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

                <Button 
                  type="submit" 
                  variant="gradient" 
                  size="large"
                  className="submit-button"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className={`contact-map-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <h3 className="map-title">Visit Our Office</h3>
            <p className="map-subtitle">
              Located in the heart of the fashion district, our office is easily accessible and always welcoming.
            </p>
            
            {/* Google Map */}
            <div className="google-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635789123456!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TrendBag Office Location"
              ></iframe>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="contact-info-item">
                <span className="info-icon">📍</span>
                <span className="info-text">123 Fashion Avenue, New York, NY 10001, United States</span>
              </div>
              
              <div className="contact-info-item">
                <span className="info-icon">📞</span>
                <span className="info-text">+1 (555) 123-4567</span>
              </div>
              
              <div className="contact-info-item">
                <span className="info-icon">📧</span>
                <span className="info-text">hello@trendbag.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';
import './Survey.css';

const Survey = () => {
  const [formData, setFormData] = useState({
    businessType: '',
    monthlyRevenue: '',
    commissionRate: '',
    currentCPA: '',
    monthlySpend: '',
    influencerExperience: '',
    biggestChallenge: [],
    preferredFeatures: [],
    concerns: '',
    additionalComments: '',
    brandUrl: '',
    contactName: '',
    email: '',
    phoneNumber: ''
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

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value) 
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Send data to Google Sheets via Google Apps Script
    const params = new URLSearchParams({
      timestamp: new Date().toISOString(),
      contactName: formData.contactName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      brandUrl: formData.brandUrl,
      businessType: formData.businessType,
      monthlyRevenue: formData.monthlyRevenue,
      commissionRate: formData.commissionRate,
      currentCPA: formData.currentCPA,
      monthlySpend: formData.monthlySpend,
      influencerExperience: formData.influencerExperience,
      biggestChallenge: formData.biggestChallenge.join(', '),
      preferredFeatures: formData.preferredFeatures.join(', '),
      concerns: formData.concerns,
      additionalComments: formData.additionalComments,
      source: 'TrendBag Survey'
    });

    // Start the request but don't wait for it
    fetch(`https://script.google.com/macros/s/AKfycbzPZTJexzDAHa2hOYR0DUs2gt7EnS3IP_eLyZnGPzBz_K1BcTHONIgZZ86KfCFJk0vV/exec?${params}`, {
      method: 'GET',
      mode: 'no-cors'
    });
    
    // Show success and reset form after 2 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form in sync with success animation
      setFormData({
        businessType: '',
        monthlyRevenue: '',
        commissionRate: '',
        currentCPA: '',
        monthlySpend: '',
        influencerExperience: '',
        biggestChallenge: [],
        preferredFeatures: [],
        concerns: '',
        additionalComments: '',
        brandUrl: '',
        contactName: '',
        email: '',
        phoneNumber: ''
      });
      
      // Reset button state after another 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }, 2000);
  };

  return (
    <section id="survey" className="survey section-large" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`survey-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="survey-title">
            Shopify Store
            <span className="text-gradient"> Survey</span>
          </h2>
          <p className="survey-subtitle">
            Help us understand your influencer marketing needs and preferences for our commission-only social commerce platform.
          </p>
        </div>

        {/* Survey Content */}
        <div className="survey-content">
          {/* Survey Form */}
          <div className={`survey-form-section ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <div className="form-container">
              <h3 className="form-title">Share Your Insights</h3>
              <p className="form-subtitle">
                Your responses will help us build the perfect platform for Shopify store owners like you.
              </p>
              
              <form onSubmit={handleSubmit} className="survey-form">
                {/* Row 1: Contact Information */}
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="contactName" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-col">
                    <label htmlFor="email" className="form-label">Email Address *</label>
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

                {/* Row 2: Phone and Brand */}
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-col">
                    <label htmlFor="brandUrl" className="form-label">Brand/Store URL *</label>
                    <input
                      type="url"
                      id="brandUrl"
                      name="brandUrl"
                      value={formData.brandUrl}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://yourstore.com"
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Business Type and Revenue */}
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="businessType" className="form-label">What type of products do you sell?</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select your business type</option>
                      <option value="fashion-apparel">Fashion & Apparel</option>
                      <option value="beauty-cosmetics">Beauty & Cosmetics</option>
                      <option value="home-garden">Home & Garden</option>
                      <option value="electronics">Electronics</option>
                      <option value="health-wellness">Health & Wellness</option>
                      <option value="sports-fitness">Sports & Fitness</option>
                      <option value="jewelry-accessories">Jewelry & Accessories</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-col">
                    <label htmlFor="monthlyRevenue" className="form-label">What's your average monthly revenue?</label>
                    <select
                      id="monthlyRevenue"
                      name="monthlyRevenue"
                      value={formData.monthlyRevenue}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select your monthly revenue</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-5000">$1,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="25000-50000">$25,000 - $50,000</option>
                      <option value="over-50000">Over $50,000</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Commission and CPA */}
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="commissionRate" className="form-label two-line">What commission rate would you be willing to pay for guaranteed influencer promotion?</label>
                    <select
                      id="commissionRate"
                      name="commissionRate"
                      value={formData.commissionRate}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select commission rate</option>
                      <option value="5-10">5-10%</option>
                      <option value="10-15">10-15%</option>
                      <option value="15-20">15-20%</option>
                      <option value="20-25">20-25%</option>
                      <option value="25-30">25-30%</option>
                      <option value="over-30">Over 30%</option>
                    </select>
                  </div>
                  <div className="form-col">
                    <label htmlFor="currentCPA" className="form-label two-line">What's your current average cost per acquisition (CPA) from paid ads?</label>
                    <select
                      id="currentCPA"
                      name="currentCPA"
                      value={formData.currentCPA}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select your current CPA</option>
                      <option value="under-10">Under $10</option>
                      <option value="10-25">$10-$25</option>
                      <option value="25-50">$25-$50</option>
                      <option value="50-100">$50-$100</option>
                      <option value="over-100">Over $100</option>
                      <option value="dont-know">Don't know</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Monthly Spend and Influencer Count */}
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="monthlySpend" className="form-label two-line">How much do you currently spend monthly on influencer marketing?</label>
                    <select
                      id="monthlySpend"
                      name="monthlySpend"
                      value={formData.monthlySpend}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select your monthly spend</option>
                      <option value="0">$0</option>
                      <option value="0-100">$0-$100</option>
                      <option value="100-300">$100-$300</option>
                      <option value="300-500">$300-$500</option>
                      <option value="500-1000">$500-$1,000</option>
                      <option value="over-1000">Over $1,000</option>
                    </select>
                  </div>
                  <div className="form-col">
                    <label htmlFor="influencerExperience" className="form-label two-line">How many influencers do you currently work with?</label>
                    <select
                      id="influencerExperience"
                      name="influencerExperience"
                      value={formData.influencerExperience}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select your current influencer count</option>
                      <option value="0">0 (not using influencers)</option>
                      <option value="1-5">1-5 influencers</option>
                      <option value="5-15">5-15 influencers</option>
                      <option value="15-50">15-50 influencers</option>
                      <option value="over-50">Over 50 influencers</option>
                    </select>
                  </div>
                </div>

                {/* Multi-Select Questions Container */}
                <div className="multiselect-container">
                  <div className="multiselect-question">
                    <label className="form-label">Which FREE features would be most valuable to your business?</label>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="preferredFeatures"
                          value="AI-powered influencer matching"
                          checked={formData.preferredFeatures.includes('AI-powered influencer matching')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">AI-powered influencer matching</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="preferredFeatures"
                          value="Automated campaign management"
                          checked={formData.preferredFeatures.includes('Automated campaign management')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">Automated campaign management</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="preferredFeatures"
                          value="Real-time analytics dashboard"
                          checked={formData.preferredFeatures.includes('Real-time analytics dashboard')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">Real-time analytics dashboard</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="preferredFeatures"
                          value="Content creation tools"
                          checked={formData.preferredFeatures.includes('Content creation tools')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">Content creation tools</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="preferredFeatures"
                          value="Fraud protection"
                          checked={formData.preferredFeatures.includes('Fraud protection')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">Fraud protection</span>
                      </label>
                    </div>
                  </div>

                  <div className="multiselect-question">
                    <label className="form-label">What's your biggest challenge with current influencer marketing costs?</label>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="biggestChallenge"
                          value="Paying upfront with no guaranteed results"
                          checked={formData.biggestChallenge.includes('Paying upfront with no guaranteed results')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">Paying upfront with no guaranteed results</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="biggestChallenge"
                          value="High monthly subscription fees"
                          checked={formData.biggestChallenge.includes('High monthly subscription fees')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">High monthly subscription fees</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="biggestChallenge"
                          value="Unpredictable ROI"
                          checked={formData.biggestChallenge.includes('Unpredictable ROI')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">Unpredictable ROI</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="biggestChallenge"
                          value="Hidden costs and fees"
                          checked={formData.biggestChallenge.includes('Hidden costs and fees')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">Hidden costs and fees</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="biggestChallenge"
                          value="All of the above"
                          checked={formData.biggestChallenge.includes('All of the above')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-text">All of the above</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Concerns */}
                <div className="form-col full-width">
                  <label htmlFor="concerns" className="form-label">What concerns do you have about commission-only pricing?</label>
                  <textarea
                    id="concerns"
                    name="concerns"
                    value={formData.concerns}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Share any concerns or questions about our commission-only model..."
                    rows="3"
                  />
                </div>

                {/* Additional Comments */}
                <div className="form-col full-width">
                  <label htmlFor="additionalComments" className="form-label">Any additional comments or suggestions?</label>
                  <textarea
                    id="additionalComments"
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us anything else that would help us build the perfect platform for you..."
                    rows="3"
                  />
                </div>
              </form>
              
              {/* Submit Button - Outside Grid */}
              <div className="form-button-container">
                <Button 
                  type="submit" 
                  variant={isSuccess ? "success" : "gradient"} 
                  size="large"
                  className={`submit-button ${isSubmitting ? 'submitting' : ''} ${isSuccess ? 'success' : ''}`}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? 'Submitting...' : isSuccess ? '✓ Submitted!' : 'Submit Survey'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Survey;

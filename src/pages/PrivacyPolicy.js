import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { FooterView } from '../views';
import './PrivacyPolicy.css'; // We'll create a basic CSS file for it

const PrivacyPolicy = () => {
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Privacy Policy</h1>
                <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="privacy-section">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to TrendBag. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>2. Data We Collect</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform on the devices you use to access this website.</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>3. How We Use Your Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>To provide the services you have requested.</li>
                        <li>To improve our website and services.</li>
                        <li>To communicate with you about updates or offers.</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>4. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:team@trendabg.in">team@trendabg.in</a>.
                    </p>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default PrivacyPolicy;

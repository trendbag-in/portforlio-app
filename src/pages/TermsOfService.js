import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LegalToc from '../components/LegalToc';
import { FooterView } from '../views';
import './PrivacyPolicy.css'; // Reuse the shared legal-page styles

const TermsOfService = () => {
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Terms of Service</h1>
                <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

                <LegalToc />

                <div className="privacy-body">
                    <div className="privacy-section">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        These Terms of Service ("Terms") govern your access to and use of TrendBag's
                        website, applications, and services (collectively, the "Service"). By accessing
                        or using the Service, you agree to be bound by these Terms. If you do not agree,
                        please do not use the Service.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>2. Accounts and Sign-In</h2>
                    <p>
                        You may sign in to TrendBag using a third-party provider such as Google. When you
                        do, we receive basic profile information (such as your name and email address) to
                        create and secure your account. You are responsible for maintaining the
                        confidentiality of your account and for all activity that occurs under it.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>3. Use of the Service</h2>
                    <p>
                        TrendBag provides fashion discovery, styling, and shopping features. You agree to
                        use the Service only for lawful purposes and not to:
                    </p>
                    <ul>
                        <li>Violate any applicable law or regulation.</li>
                        <li>Infringe the intellectual property or privacy rights of others.</li>
                        <li>Attempt to disrupt, reverse-engineer, or gain unauthorized access to the Service.</li>
                        <li>Upload content that is unlawful, harmful, or misleading.</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>4. Content</h2>
                    <p>
                        You retain ownership of content you submit to the Service. By submitting content,
                        you grant TrendBag a non-exclusive, worldwide license to host and display it for
                        the purpose of operating and improving the Service.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>5. Privacy</h2>
                    <p>
                        Your use of the Service is also governed by our <a href="/privacy">Privacy Policy</a>,
                        which explains how we collect, use, and protect your data.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>6. Disclaimers and Limitation of Liability</h2>
                    <p>
                        The Service is provided "as is" without warranties of any kind. To the maximum
                        extent permitted by law, TrendBag is not liable for any indirect, incidental, or
                        consequential damages arising from your use of the Service.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>7. Changes to These Terms</h2>
                    <p>
                        We may update these Terms from time to time. Continued use of the Service after
                        changes take effect constitutes acceptance of the revised Terms.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>8. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at: <a href="mailto:team@trendbag.in">team@trendbag.in</a>.
                    </p>
                </div>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default TermsOfService;

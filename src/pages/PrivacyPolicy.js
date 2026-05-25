import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { FooterView } from '../views';
import './PrivacyPolicy.css';

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
                        TrendBag (“TrendBag”, “we”, “us”, or “our”) operates the website at
                        https://www.trendbag.in and the TrendBag application (together, the “Service”) — an
                        AI-powered fashion discovery and social-commerce platform connecting shoppers,
                        creators, and brands. We respect your privacy and are committed to protecting your
                        personal data. This Privacy Policy explains what information we collect, why we
                        collect it, how we use and share it, and the choices and rights you have.
                    </p>
                    <p>
                        By using the Service, you agree to the collection and use of information in
                        accordance with this policy.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>2. Information We Collect</h2>
                    <p>We collect the following categories of information:</p>
                    <ul>
                        <li>
                            <strong>Information you provide:</strong> name, username, email address, phone
                            number, password, profile photo, style preferences, and any content you submit
                            (messages, posts, reviews, or wardrobe images).
                        </li>
                        <li>
                            <strong>Information from social and Google sign-in:</strong> when you choose to
                            sign in with Google, Instagram, or another provider, we receive basic profile
                            information such as your name, email address, and profile picture, as permitted
                            by the scopes you approve. We only request the minimum access needed to create
                            and operate your account.
                        </li>
                        <li>
                            <strong>Usage and technical data:</strong> IP address, device and browser type,
                            operating system, app interactions, pages viewed, and approximate location
                            derived from your IP, collected via cookies and similar technologies.
                        </li>
                        <li>
                            <strong>Transaction data:</strong> when you make a purchase, payment is processed
                            by our payment partner. We receive confirmation and order details but do not
                            store your full card or bank credentials.
                        </li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>3. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul>
                        <li>Create, authenticate, and manage your account.</li>
                        <li>Provide and personalize the Service, including AI-powered style and product recommendations.</li>
                        <li>Process orders, payments, and creator payouts.</li>
                        <li>Communicate with you about your account, updates, security, and support requests.</li>
                        <li>Maintain the safety, security, and integrity of the Service and prevent fraud.</li>
                        <li>Comply with legal obligations and enforce our terms.</li>
                    </ul>
                    <p>We do not use the information we collect for purposes unrelated to those described above without your consent.</p>
                </div>

                <div className="privacy-section">
                    <h2>4. How We Share Your Information</h2>
                    <p>
                        We do <strong>not</strong> sell your personal data. We share information only in the
                        following limited circumstances:
                    </p>
                    <ul>
                        <li>
                            <strong>Service providers:</strong> trusted vendors who process data on our behalf,
                            such as cloud hosting (AWS), authentication providers (Google, Instagram), payment
                            processing (Razorpay), and analytics — under contracts that require them to protect
                            your data.
                        </li>
                        <li>
                            <strong>Other users, where you choose:</strong> content you publish (e.g. a public
                            profile or post) is visible according to your settings.
                        </li>
                        <li>
                            <strong>Legal reasons:</strong> when required by law, regulation, legal process, or
                            to protect the rights, property, or safety of TrendBag, our users, or the public.
                        </li>
                        <li>
                            <strong>Business transfers:</strong> in connection with a merger, acquisition, or
                            sale of assets, subject to this policy.
                        </li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>5. Google User Data and Limited Use</h2>
                    <p>
                        TrendBag’s use and transfer of information received from Google APIs adheres to the{' '}
                        <a
                            href="https://developers.google.com/terms/api-services-user-data-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google API Services User Data Policy
                        </a>
                        , including its Limited Use requirements. We use Google user data only to provide and
                        improve the features you request (such as signing in and setting up your profile). We do
                        not transfer or sell this data to third parties except as necessary to provide the
                        Service, comply with applicable law, or as part of a merger or acquisition; and we do
                        not use it for advertising.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>6. Data Retention</h2>
                    <p>
                        We retain your personal data for as long as your account is active or as needed to
                        provide the Service, comply with our legal obligations, resolve disputes, and enforce
                        our agreements. When data is no longer required, we delete or anonymize it.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>7. Your Rights and Choices</h2>
                    <p>
                        Depending on your location, you may have the right to access, correct, export, or
                        delete your personal data, object to or restrict certain processing, and withdraw
                        consent. You can update most account information directly in the app, and you can
                        revoke TrendBag’s access to your Google account at any time via your{' '}
                        <a
                            href="https://myaccount.google.com/permissions"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Account permissions
                        </a>{' '}
                        page.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>8. How to Delete Your Data</h2>
                    <p>
                        You may delete your account and associated personal data at any time from within the
                        app settings, or by emailing us at{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a> with the subject “Data Deletion
                        Request.” We will process verified requests within 30 days, except where we are
                        required to retain certain data by law.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>9. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures — including encryption
                        in transit, access controls, and secure infrastructure — to protect your personal
                        data. No method of transmission or storage is completely secure, but we work
                        continuously to safeguard your information.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>10. Children’s Privacy</h2>
                    <p>
                        The Service is not directed to children under 13 (or the minimum age required in your
                        jurisdiction). We do not knowingly collect personal data from children. If you believe
                        a child has provided us with personal data, please contact us so we can remove it.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>11. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will post the updated version
                        on this page and revise the “Last Updated” date above. Significant changes will be
                        communicated through the Service or by email.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>12. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy or our privacy practices, contact
                        us at: <a href="mailto:team@trendbag.in">team@trendbag.in</a>.
                    </p>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default PrivacyPolicy;

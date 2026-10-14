import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LegalToc from '../components/LegalToc';
import { FooterView } from '../views';
import { openConsent } from '../hooks/consent';
import './PrivacyPolicy.css'; // Reuse the shared legal-page styles

const CookiePolicy = () => {
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Cookie Policy</h1>
                <p className="last-updated">Last Updated: 14 October 2026</p>

                <LegalToc />

                <div className="privacy-body">
                    <div className="privacy-section">
                        <h2>1. Overview</h2>
                        <p>
                            This Cookie Policy explains how Holygrims Private Limited (“TrendBag”, “we”, “us”,
                            or “our”) uses cookies and similar technologies, such as your browser’s local
                            storage, on trendbag.in and in the TrendBag app at app.trendbag.in. It should be
                            read together with our <a href="/privacy">Privacy Policy</a>.
                        </p>
                        <p>
                            Cookies are small text files a website stores in your browser. Local storage works
                            the same way but stays on your device and is not sent with every request. We call
                            both “cookies” below.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>2. What We Do Not Do</h2>
                        <ul>
                            <li>We do not use advertising or cross-site tracking cookies.</li>
                            <li>We do not sell or share cookie data with advertisers.</li>
                            <li>We do not build profiles of you from your browsing on other sites.</li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2>3. Cookies We Use</h2>
                        <p><strong>Strictly necessary.</strong> These are needed for the service to work and cannot be switched off:</p>
                        <ul>
                            <li>
                                <strong>Your cookie choice</strong> (<code>tb-consent</code>, local storage on
                                trendbag.in): remembers whether you chose “Accept all” or “Essential only”.
                            </li>
                            <li>
                                <strong>Sign-in session</strong> (app.trendbag.in): keeps you signed in to your
                                TrendBag account on that device.
                            </li>
                            <li>
                                <strong>Security</strong>: our hosting and network provider, Cloudflare, may set
                                cookies to detect bots and protect the site from abuse.
                            </li>
                            <li>
                                <strong>Payments</strong>: when you check out, our payment partners Razorpay and
                                PhonePe may set cookies on their own payment pages to process the payment and
                                prevent fraud.
                            </li>
                        </ul>

                        <p><strong>Preferences.</strong> Only stored if you choose “Accept all”:</p>
                        <ul>
                            <li>
                                <strong>Theme</strong> (<code>theme</code>, local storage on trendbag.in): whether
                                you picked light or dark mode.
                            </li>
                            <li>
                                <strong>Who you are here as</strong> (<code>tb-persona</code>, local storage on
                                trendbag.in): whether you picked shopper, creator or brand, so the page opens on
                                your sections next time.
                            </li>
                        </ul>

                        <p><strong>Diagnostics.</strong> The TrendBag app reports crashes and errors to our
                            error-monitoring provider so we can fix them. These reports describe the error and
                            your device and app version; they are not used for advertising.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>4. Third-Party Sign-In and Content</h2>
                        <p>
                            If you sign in with Google, or connect Instagram or YouTube, you are taken to that
                            provider, which sets its own cookies under its own cookie policy. We do not control
                            those cookies.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>5. Managing Your Choice</h2>
                        <ul>
                            <li>
                                You can change your choice at any time:{' '}
                                <button type="button" className="legal-inline-btn" onClick={openConsent}>
                                    open cookie settings
                                </button>
                                . Choosing “Essential only” deletes the preference cookies we stored.
                            </li>
                            <li>
                                You can also clear or block cookies in your browser settings. Blocking strictly
                                necessary cookies may stop parts of the service, such as signing in, from working.
                            </li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2>6. Changes to This Policy</h2>
                        <p>
                            We may update this policy when we change the cookies we use. The date at the top
                            shows when it was last updated.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>7. Contact Us</h2>
                        <p>
                            Holygrims Private Limited, D-9 Sector 3, Noida, Gautam Buddha Nagar 201301, Uttar
                            Pradesh, India. Email <a href="mailto:team@trendbag.in">team@trendbag.in</a> or call{' '}
                            <a href="tel:+918005377342">+91 80053 77342</a>.
                        </p>
                    </div>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default CookiePolicy;

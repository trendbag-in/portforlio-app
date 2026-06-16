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
                        https://www.trendbag.in, the TrendBag application, and our Shopify app (together, the
                        “Service”) — an AI-powered fashion discovery and social-commerce platform connecting
                        shoppers, creators, brands, and Shopify merchants. We respect your privacy and are committed to protecting your
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
                            <strong>Information from Google, Instagram, and YouTube:</strong> when you choose
                            to sign in with Google or another provider, or connect your Instagram or YouTube
                            account, we receive basic profile information (such as your name, email address,
                            and profile picture) and, where you grant access, content you authorize us to read
                            via their APIs — for example your Instagram handle and media, or your YouTube
                            channel and videos — to build your creator profile and showcase your content. We
                            only request the minimum scopes needed for the features you use.
                        </li>
                        <li>
                            <strong>Usage and technical data:</strong> IP address, device and browser type,
                            operating system, app interactions, pages viewed, and approximate location
                            derived from your IP, collected via cookies and similar technologies.
                        </li>
                        <li>
                            <strong>Transaction data:</strong> when you make a purchase, payment is processed
                            by our payment partners (Razorpay and PhonePe). We receive confirmation and order
                            details but do not store your full card, UPI, or bank credentials.
                        </li>
                        <li>
                            <strong>Shopify store and customer data:</strong> if you are a merchant who
                            installs our Shopify app — or a customer of such a merchant — we access store,
                            product, and order information and protected customer data (such as customer name,
                            contact details, and order history) through Shopify’s APIs, solely to provide the
                            features the merchant has enabled. See “Shopify Merchant and Customer Data” below.
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
                            such as cloud hosting (AWS); authentication and content providers (Google,
                            Instagram, YouTube); payment processing (Razorpay and PhonePe); our commerce
                            platform (Shopify); and analytics — under contracts that require them to protect
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
                    <h2>6. Instagram and YouTube Data</h2>
                    <p>
                        When you connect your Instagram or YouTube account, we access only the data you
                        authorize through Meta’s and Google/YouTube’s APIs — such as your handle, profile
                        details, and the posts or videos you choose to feature — and use it solely to display
                        and link your content within your TrendBag creator profile. TrendBag’s use of
                        information received from YouTube APIs complies with the{' '}
                        <a
                            href="https://developers.google.com/youtube/terms/api-services-terms-of-service"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            YouTube API Services Terms of Service
                        </a>{' '}
                        and the{' '}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Privacy Policy
                        </a>
                        . We do not sell this data or use it for advertising, and you can disconnect a linked
                        account at any time from your profile settings or by revoking access in your Instagram
                        or Google account settings.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>7. Shopify Merchant and Customer Data</h2>
                    <p>
                        If you install our Shopify app, TrendBag accesses your store data — including products,
                        collections, and orders, as well as protected customer data such as customer names,
                        contact details, and order history — through Shopify’s APIs, acting as a data processor
                        on your behalf. We access and process this data only to provide the features you have
                        enabled, and we follow Shopify’s{' '}
                        <a
                            href="https://shopify.dev/docs/apps/launch/protected-customer-data"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Protected Customer Data requirements
                        </a>
                        :
                    </p>
                    <ul>
                        <li>
                            <strong>Data minimization:</strong> we request only the scopes and fields needed
                            for the app’s functionality.
                        </li>
                        <li>
                            <strong>Purpose limitation:</strong> we use merchant and customer data solely to
                            deliver the app’s features — never to build advertising profiles or to sell data.
                        </li>
                        <li>
                            <strong>Retention and deletion:</strong> we retain this data only while the app is
                            installed and as needed to provide the service, and we delete it when the app is
                            uninstalled or upon request.
                        </li>
                        <li>
                            <strong>Compliance webhooks:</strong> we honor Shopify’s mandatory privacy
                            webhooks — “customers/data_request”, “customers/redact”, and “shop/redact” — to
                            fulfill data access and erasure requests from merchants and their customers.
                        </li>
                    </ul>
                    <p>
                        Merchants and customers may contact us at{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a> to exercise data access or
                        deletion rights with respect to Shopify data.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>8. Data Retention</h2>
                    <p>
                        We retain your personal data for as long as your account is active or as needed to
                        provide the Service, comply with our legal obligations, resolve disputes, and enforce
                        our agreements. When data is no longer required, we delete or anonymize it.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>9. Your Rights and Choices</h2>
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
                    <h2>10. How to Delete Your Data</h2>
                    <p>
                        You may delete your account and associated personal data at any time from within the
                        app settings, or by emailing us at{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a> with the subject “Data Deletion
                        Request.” We will process verified requests within 30 days, except where we are
                        required to retain certain data by law.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>11. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures — including encryption
                        in transit, access controls, and secure infrastructure — to protect your personal
                        data. No method of transmission or storage is completely secure, but we work
                        continuously to safeguard your information.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>12. Children’s Privacy</h2>
                    <p>
                        The Service is not directed to children under 13 (or the minimum age required in your
                        jurisdiction). We do not knowingly collect personal data from children. If you believe
                        a child has provided us with personal data, please contact us so we can remove it.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>13. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will post the updated version
                        on this page and revise the “Last Updated” date above. Significant changes will be
                        communicated through the Service or by email.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>14. Contact Us</h2>
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

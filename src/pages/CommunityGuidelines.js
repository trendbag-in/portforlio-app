import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { FooterView } from '../views';
import './PrivacyPolicy.css'; // Reuse the shared legal-page styles

const CommunityGuidelines = () => {
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Community Guidelines</h1>
                <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="privacy-section">
                    <h2>1. Our Community</h2>
                    <p>
                        TrendBag is a fashion discovery community built on authenticity, creativity,
                        and respect. These Community Guidelines explain what we expect from everyone
                        who uses the Service so that it stays a safe and inspiring place. By using
                        TrendBag, you agree to follow these guidelines alongside our{' '}
                        <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>2. Be Respectful</h2>
                    <p>
                        Treat other members the way you would want to be treated. We do not tolerate:
                    </p>
                    <ul>
                        <li>Harassment, bullying, or threats toward any individual or group.</li>
                        <li>Hate speech or content that attacks people based on identity.</li>
                        <li>Impersonating others or misrepresenting your affiliation.</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>3. Share Authentic Content</h2>
                    <p>
                        Post content you have the right to share, and give credit where it is due.
                        Do not upload content that is spam, misleading, or infringes the intellectual
                        property or privacy rights of others.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>4. Keep It Safe</h2>
                    <p>
                        To protect our community, the following are not allowed:
                    </p>
                    <ul>
                        <li>Nudity, sexually explicit material, or content that sexualizes minors.</li>
                        <li>Graphic violence or content that promotes self-harm.</li>
                        <li>Promotion of illegal goods, services, or dangerous activities.</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>5. No Scams or Manipulation</h2>
                    <p>
                        Do not use TrendBag to deceive others, run scams, artificially inflate
                        engagement, or attempt to disrupt, reverse-engineer, or gain unauthorized
                        access to the Service.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>6. Reporting and Enforcement</h2>
                    <p>
                        If you see content or behavior that violates these guidelines, please report it.
                        We review reports and may remove content, limit features, or suspend accounts
                        that break the rules. Serious or repeated violations may result in permanent
                        removal from the Service.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>7. Changes to These Guidelines</h2>
                    <p>
                        We may update these Community Guidelines from time to time. Continued use of the
                        Service after changes take effect constitutes acceptance of the revised guidelines.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>8. Contact Us</h2>
                    <p>
                        If you have any questions about these guidelines or want to report a concern,
                        please contact us at: <a href="mailto:team@trendbag.in">team@trendbag.in</a>.
                    </p>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default CommunityGuidelines;

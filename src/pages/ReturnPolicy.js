import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LegalToc from '../components/LegalToc';
import { FooterView } from '../views';
import './PrivacyPolicy.css'; // Reuse the shared legal-page styles

const ReturnPolicy = () => {
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Return &amp; Exchange Policy</h1>
                <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

                <LegalToc />

                <div className="privacy-body">
                    <div className="privacy-section">
                    <h2>1. Overview</h2>
                    <p>
                        This Return &amp; Exchange Policy explains the conditions under which items purchased
                        through TrendBag may be returned or exchanged. It should be read together with our{' '}
                        <a href="/refund">Refund &amp; Cancellation Policy</a> and{' '}
                        <a href="/shipping">Shipping Policy</a>.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>2. Return Window</h2>
                    <p>
                        You may request a return within 7 days of delivery. Requests raised after this window
                        cannot be accepted, except where required by applicable law.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>3. Conditions for a Valid Return</h2>
                    <p>To be eligible for a return, the item must be:</p>
                    <ul>
                        <li>Unused, unworn, unwashed, and undamaged.</li>
                        <li>In its original condition with all tags, labels, and packaging intact.</li>
                        <li>Accompanied by the original invoice or proof of purchase.</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>4. Non-Returnable Items</h2>
                    <p>For hygiene, safety, and other reasons, the following cannot be returned unless they arrive damaged or defective:</p>
                    <ul>
                        <li>Intimate apparel and innerwear.</li>
                        <li>Cosmetics, fragrances, and personal-care products.</li>
                        <li>Customized or made-to-order items.</li>
                        <li>Items marked “final sale” or “non-returnable”, and free gifts or promotional items.</li>
                    </ul>
                    <p>
                        In addition, brands and sellers on TrendBag may designate specific products as
                        non-returnable or non-exchangeable. Where an item is non-returnable, this is clearly
                        indicated on the product page and at checkout before you place your order. By
                        purchasing such an item you accept that it cannot be returned or exchanged unless it
                        arrives damaged, defective, or different from what you ordered.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>5. Returns Due to Customer-Side Reasons</h2>
                    <p>
                        Where a return is requested for a customer-side reason — i.e. it is not our fault, such
                        as a change of mind, ordering the wrong size or colour, or ordering by mistake — the
                        following apply:
                    </p>
                    <ul>
                        <li>Return / reverse-shipping charges are borne by you.</li>
                        <li>The original forward-shipping charges are non-refundable.</li>
                        <li>The item must still meet all conditions in Section 3; otherwise the return will be rejected and the item returned to you.</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>6. Returns Due to Our Error</h2>
                    <p>
                        If you received a damaged, defective, or wrong item, we will arrange a free pickup and
                        provide a full refund or a replacement at no extra cost. Please report such issues
                        within 48 hours of delivery, along with clear photos, to{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a>.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>7. Exchanges</h2>
                    <p>
                        Exchanges for a different size or colour are subject to stock availability. If the
                        requested item is unavailable, we will process a refund as per our{' '}
                        <a href="/refund">Refund &amp; Cancellation Policy</a>. Exchanges arising from
                        customer-side reasons may attract the return-shipping charges described in
                        Section 5.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>8. How to Initiate a Return</h2>
                    <p>
                        To start a return or exchange, email us at{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a> with your order ID, the item(s)
                        you wish to return, and the reason. Our team will guide you through pickup or drop-off
                        and confirm eligibility.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>9. Refunds</h2>
                    <p>
                        Once a returned item is received and inspected, any eligible refund is processed in
                        accordance with our <a href="/refund">Refund &amp; Cancellation Policy</a>.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>10. Contact Us</h2>
                    <p>
                        If you have any questions about this Return &amp; Exchange Policy, contact us at:{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a>.
                    </p>
                </div>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default ReturnPolicy;

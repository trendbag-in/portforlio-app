import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LegalToc from '../components/LegalToc';
import { FooterView } from '../views';
import './PrivacyPolicy.css'; // Reuse the shared legal-page styles

// Platform defaults, mirrored from the LIVE economics config (verified 2026-09-18) (brand_category_terms,
// return_cost_rules, brand_penalty_configs). A store's exact terms are shown inside the TrendBag
// app; this page is the public reference linked from the Shopify App Store listing.
const DEFAULT_MARGIN_PCT = 35;
const EXAMPLE_RETAIL = 1000;

const RETURN_SPLIT = [
    { reason: 'Wrong or defective item (brand fault)', trendbag: 0, brand: 100, courier: 0 },
    { reason: 'Size or fit (customer fault)', trendbag: 100, brand: 0, courier: 0 },
    { reason: 'Damaged in transit', trendbag: 0, brand: 40, courier: 60 },
    { reason: 'Unclear, decided on review', trendbag: 0, brand: 100, courier: 0 },
];

const inr = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const SellerTerms = () => {
    const payout = 100 - DEFAULT_MARGIN_PCT;
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Seller Terms &amp; Payouts</h1>
                <p className="last-updated">Last Updated: 18 September 2026</p>

                <LegalToc />

                <div className="privacy-body">
                    <div className="privacy-section">
                        <h2>1. Overview</h2>
                        <p>
                            These terms explain how TrendBag pays brands that sell through the TrendBag
                            marketplace via the TrendBag sales channel for Shopify. They should be read together
                            with our <a href="/terms">Terms of Service</a> and{' '}
                            <a href="/returns">Return Policy</a>.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>2. Free to Install, Nothing Billed to Your Store</h2>
                        <p>
                            The TrendBag app is free to install. There are no monthly fees, no per-order fees,
                            and nothing is ever charged to your Shopify account.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>3. How You Are Paid</h2>
                        <p>
                            TrendBag is a marketplace sales channel and the merchant of record for orders placed
                            there. For each order, TrendBag buys the item from you at a wholesale price: your
                            Shopify retail price less an agreed margin. The platform default margin is{' '}
                            {DEFAULT_MARGIN_PCT}%, which means you are paid {payout}% of the retail price. A
                            different rate may be agreed when your store is activated, and your store&apos;s
                            exact rate is always shown inside the app under Settings.
                        </p>
                        <p>
                            Example: an item listed at {inr(EXAMPLE_RETAIL)} earns you{' '}
                            {inr((EXAMPLE_RETAIL * payout) / 100)} at the default margin. Payouts are made to
                            your bank account in INR.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>4. Shipping and Returns</h2>
                        <p>
                            TrendBag arranges and pays for delivery of every order. When a customer returns an
                            item, the return shipping cost is split depending on the reason for the return:
                        </p>
                        <ul>
                            {RETURN_SPLIT.map((r) => (
                                <li key={r.reason}>
                                    <strong>{r.reason}:</strong> TrendBag {r.trendbag}%, your store {r.brand}%
                                    {r.courier ? `, courier claim ${r.courier}%` : ''}.
                                </li>
                            ))}
                        </ul>
                        <p>Your store&apos;s share is deducted from a later payout. It is never billed separately.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>5. Quality Checks and Penalties</h2>
                        <p>
                            Returned items are sent back to your store for a quality check. Checks must be
                            completed within 48 hours; a late check incurs a {inr(50)} charge. If a parcel weighs
                            more than you declared when packing, the extra shipping cost is recovered from your
                            store in full. Repeated issues can lead to a review of the store&apos;s listing.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>6. Where to See Your Exact Terms</h2>
                        <p>
                            Open the TrendBag app in your Shopify admin. The rate agreed for your store, the
                            return-cost split and the penalty terms are shown on first run and under Settings,
                            and every order lists the retail value, what TrendBag pays you, and the margin.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>7. Contact</h2>
                        <p>
                            Questions about these terms: <a href="mailto:team@trendbag.in">team@trendbag.in</a>
                        </p>
                    </div>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default SellerTerms;

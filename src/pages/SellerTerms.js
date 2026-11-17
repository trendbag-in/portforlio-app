import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LegalToc from '../components/LegalToc';
import { FooterView } from '../views';
import './PrivacyPolicy.css'; // Reuse the shared legal-page styles

// Platform defaults, mirrored from the LIVE economics config (verified 2026-10-20):
// brand_category_terms global row (agreed_margin 15, base_creator_rate 3) and
// SHOPIFY_BILLING_MIN_PER_ORDER=5. A store's exact rate is shown inside the TrendBag app.
const DEFAULT_COMMISSION_PCT = 15;
const MIN_FEE_INR = 5;
const CREATOR_RATE_PCT = 3;
const EXAMPLE_SUBTOTAL = 1000;

const inr = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const SellerTerms = () => {
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Shopify Sellers &amp; Terms</h1>
                <p className="last-updated">Last Updated: 20 October 2026</p>

                <LegalToc />

                <div className="privacy-body">
                    <div className="privacy-section">
                        <h2>1. Overview</h2>
                        <p>
                            These terms explain what TrendBag charges brands that sell through the TrendBag
                            sales channel for Shopify, and how those charges are collected. TrendBag is a
                            discovery and referral channel: shoppers find your products on TrendBag and buy
                            them on your own Shopify checkout. They should be read together with our{' '}
                            <a href="/terms">Terms of Service</a>.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>2. How the Sale Works</h2>
                        <p>
                            Every order is placed on your store&apos;s own Shopify checkout. Your store is the
                            merchant of record: you collect the payment, issue the consumer invoice under your
                            own GSTIN, fulfil the order and handle returns and refunds exactly as you do for
                            any other Shopify order.
                        </p>
                        <p>
                            TrendBag never holds your inventory, never collects the consumer&apos;s payment and
                            never issues the consumer invoice. Orders that originate on TrendBag are tagged in
                            your Shopify admin so you can tell them apart.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>3. Platform Commission</h2>
                        <p>
                            The TrendBag app is free to install. TrendBag charges a commission on each order
                            placed through TrendBag, calculated on the order subtotal before shipping and
                            taxes. The platform default is {DEFAULT_COMMISSION_PCT}%, with a minimum of{' '}
                            {inr(MIN_FEE_INR)} per order. A different rate may be agreed with the TrendBag
                            team by email; the rate in force for your store is always shown inside the TrendBag app,
                            and you are asked to accept it before it applies.
                        </p>
                        <p>
                            Example: an order with a subtotal of {inr(EXAMPLE_SUBTOTAL)} incurs a commission
                            of {inr((EXAMPLE_SUBTOTAL * DEFAULT_COMMISSION_PCT) / 100)} at the default rate.
                        </p>
                        <p>
                            The commission is billed through Shopify as a usage charge on your Shopify bill.
                            When you install the app you approve this charge on Shopify&apos;s own confirmation
                            screen; no charge is made until you approve it. Shopify collects the amount with
                            your regular Shopify invoice. Orders already placed settle at the rate in force at
                            the time of the order.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>4. Creator Attribution</h2>
                        <p>
                            When a TrendBag creator&apos;s content leads to an order, TrendBag pays that creator
                            a standard attribution reward (default {CREATOR_RATE_PCT}% of the order subtotal).
                            This reward is funded by TrendBag out of the platform commission. It is not an
                            additional charge to your store.
                        </p>
                        <p>
                            Collaboration deals are different: a rate your store agrees directly with a named
                            creator for a specific campaign. Commissions on collaboration orders are invoiced
                            to your store by TrendBag, separately from the Shopify charge, and are payable by
                            the payment link on the invoice.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>5. Other Services</h2>
                        <p>
                            Marketing placements, campaigns and any other services you order from TrendBag are
                            quoted and agreed by email and invoiced separately. They are never added to your
                            Shopify bill.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>6. Returns and Refunds</h2>
                        <p>
                            Returns and refunds are handled by your store on Shopify under your own policies.
                            The commission is charged when the order is placed. If an order is cancelled or
                            refunded in full, write to{' '}
                            <a href="mailto:team@trendbag.in">team@trendbag.in</a> with the order number and
                            TrendBag will credit the commission on that order against your next charges.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>7. Taxes and Invoices</h2>
                        <p>
                            Shopify issues the invoice for the usage charge as part of your Shopify bill, and
                            any GST on that charge follows Shopify&apos;s billing terms for your region.
                            Invoices for collaboration commissions and other services are issued by TrendBag
                            under TrendBag&apos;s GSTIN, with GST added where applicable, and are sent to your
                            store&apos;s registered email.
                        </p>
                        <p>
                            TrendBag may ask for business KYC details and a bank account before settling any
                            amount owed to your store. These are used only for billing and payouts.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>8. Product Warranties and Indemnity</h2>
                        <p>
                            Your store warrants that everything it lists is genuine, safe, lawful to sell and
                            accurately described. Your store indemnifies TrendBag against consumer claims,
                            product liability and regulatory action arising from counterfeit or unauthorised
                            products, defective or unsafe products, incorrect product descriptions, or
                            infringement of another party&apos;s intellectual property. TrendBag may remove
                            listings, suspend the channel or recover legal costs and fines from amounts owed
                            to your store.
                        </p>
                    </div>

                    <div className="privacy-section">
                        <h2>9. Contact</h2>
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

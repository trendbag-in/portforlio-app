import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LegalToc from '../components/LegalToc';
import { FooterView } from '../views';
import './PrivacyPolicy.css'; // Reuse the shared legal-page styles

const RefundPolicy = () => {
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Refund &amp; Cancellation Policy</h1>
                <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

                <LegalToc />

                <div className="privacy-body">
                    <div className="privacy-section">
                    <h2>1. Overview</h2>
                    <p>
                        This Refund &amp; Cancellation Policy explains when and how cancellations and refunds
                        are handled for purchases made through TrendBag (“TrendBag”, “we”, “us”, or “our”).
                        Payments are processed by our payment partners, Razorpay and PhonePe. By placing an
                        order, you agree to this policy together with our{' '}
                        <a href="/terms">Terms of Service</a>, <a href="/returns">Return Policy</a>, and{' '}
                        <a href="/shipping">Shipping Policy</a>.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>2. Order Cancellation</h2>
                    <ul>
                        <li>
                            <strong>Before dispatch:</strong> you may cancel an order free of charge any time
                            before it is dispatched, and you will receive a full refund.
                        </li>
                        <li>
                            <strong>After dispatch:</strong> once an order is dispatched it can no longer be
                            cancelled. You may refuse delivery or raise a return as per our{' '}
                            <a href="/returns">Return Policy</a>. Cancellations after dispatch may be subject
                            to logistics and handling charges (see Section 5).
                        </li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>3. When You Are Eligible for a Full Refund</h2>
                    <p>You are entitled to a full refund, including shipping charges, when the issue is on our side, such as:</p>
                    <ul>
                        <li>The item was not delivered within the committed timeline.</li>
                        <li>You received a damaged, defective, or expired item.</li>
                        <li>You received the wrong item or wrong size (different from what you ordered).</li>
                        <li>The item went out of stock after your order was confirmed.</li>
                    </ul>
                    <p>
                        For damaged, defective, or wrong items, please report the issue within 48 hours of
                        delivery with clear photos so we can verify and resolve it quickly.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>4. When Refunds Are Reduced or Not Available (Customer-Side Reasons)</h2>
                    <p>
                        Where a cancellation, return, or failed delivery results from a customer-side reason —
                        i.e. it is not our fault — refunds may be partial or unavailable, and applicable
                        charges may be deducted. These situations include:
                    </p>
                    <ul>
                        <li>Change of mind after the order has been dispatched.</li>
                        <li>An incorrect, incomplete, or unreachable delivery address provided by you.</li>
                        <li>
                            Repeated failed delivery attempts, unavailability to receive the order, or refusal
                            to accept delivery without a valid reason (resulting in a Return-to-Origin / RTO).
                        </li>
                        <li>
                            Items returned used, worn, washed, altered, or without their original tags,
                            packaging, or invoice.
                        </li>
                        <li>Damage caused by mishandling or misuse after delivery.</li>
                        <li>
                            Non-returnable items — such as intimate/innerwear, cosmetics, customized or
                            made-to-order items, items marked “final sale”, and any item a brand has
                            designated as non-returnable (clearly indicated before purchase) — which cannot be
                            returned unless they arrive damaged or defective.
                        </li>
                    </ul>
                    <p>In these cases the following apply:</p>
                    <ul>
                        <li>Return / reverse-shipping charges are borne by you.</li>
                        <li>The original forward-shipping charges are non-refundable.</li>
                        <li>Cash-on-Delivery (COD), handling, and convenience fees are non-refundable.</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>5. Fees and Deductions</h2>
                    <ul>
                        <li>
                            <strong>Return / reverse-shipping fee:</strong> approximately ₹100 (or the actual
                            courier charge) for returns initiated due to customer-side reasons.
                        </li>
                        <li>
                            <strong>Payment gateway charges:</strong> for prepaid orders, payment processing
                            fees charged by Razorpay or PhonePe may be deducted where a cancellation or refund
                            arises from a customer-side reason.
                        </li>
                        <li>
                            <strong>COD / convenience fee:</strong> non-refundable.
                        </li>
                        <li>
                            <strong>RTO / failed-delivery charge:</strong> shipping costs incurred for orders
                            returned to us due to wrong address, unavailability, or refusal may be deducted
                            from any refund due.
                        </li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>6. Refund Method &amp; Timeline</h2>
                    <ul>
                        <li>
                            Approved refunds are credited to your original payment method (UPI, card, or
                            net-banking via Razorpay or PhonePe). COD orders are refunded to your bank account
                            or UPI ID.
                        </li>
                        <li>
                            Refunds are initiated within 5–7 business days of approval. Your bank or card
                            issuer may take additional time to reflect the credit.
                        </li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>7. How to Request a Refund</h2>
                    <p>
                        To request a cancellation or refund, email us at{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a> with your order ID and the
                        reason for the request. For damaged, defective, or wrong items, please include photos.
                        Requests should be raised within 7 days of delivery.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>8. Contact Us</h2>
                    <p>
                        If you have any questions about this Refund &amp; Cancellation Policy, contact us at:{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a>.
                    </p>
                </div>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default RefundPolicy;

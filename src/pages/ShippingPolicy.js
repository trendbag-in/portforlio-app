import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { FooterView } from '../views';
import './PrivacyPolicy.css'; // Reuse the shared legal-page styles

const ShippingPolicy = () => {
    return (
        <div className="privacy-page">
            <Navbar />
            <div className="privacy-container container">
                <h1>Shipping &amp; Delivery Policy</h1>
                <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="privacy-section">
                    <h2>1. Overview</h2>
                    <p>
                        This Shipping &amp; Delivery Policy explains how orders placed through TrendBag are
                        processed, shipped, and delivered. It should be read together with our{' '}
                        <a href="/refund">Refund &amp; Cancellation Policy</a> and{' '}
                        <a href="/returns">Return Policy</a>.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>2. Order Processing Time</h2>
                    <p>
                        Orders are typically processed and dispatched within 1–2 business days of confirmation.
                        Orders placed on weekends or public holidays are processed on the next business day.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>3. Delivery Timelines</h2>
                    <ul>
                        <li>Metro and major cities: approximately 3–7 business days.</li>
                        <li>Other and remote locations: approximately 7–10 business days.</li>
                    </ul>
                    <p>
                        Delivery timelines are estimates and begin from the date of dispatch. Actual delivery
                        may vary based on the courier and destination.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>4. Shipping Charges</h2>
                    <p>
                        Shipping charges, if any, are calculated and shown at checkout before you pay. Orders
                        above a stated threshold may qualify for free shipping, and Cash-on-Delivery (COD)
                        orders may carry an additional convenience fee.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>5. Serviceable Locations</h2>
                    <p>
                        We currently ship across India. Some pin codes may not be serviceable by our courier
                        partners; if your area is not serviceable, we will inform you and arrange a refund for
                        any prepaid order.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>6. Order Tracking</h2>
                    <p>
                        Once your order is dispatched, we will share tracking details so you can follow your
                        shipment until it is delivered.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>7. Delays Beyond Our Control</h2>
                    <p>
                        Deliveries may occasionally be delayed due to factors outside our control, such as
                        weather, natural events, strikes, courier disruptions, or regulatory restrictions. We
                        will make reasonable efforts to keep you informed in such cases.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>8. Incorrect Address &amp; Failed Delivery (Customer-Side Reasons)</h2>
                    <p>
                        It is your responsibility to provide a complete and accurate delivery address and a
                        reachable contact number. Where a delivery fails for a customer-side reason, additional
                        charges may apply:
                    </p>
                    <ul>
                        <li>
                            If a shipment is returned to us because of a wrong or incomplete address, a
                            re-shipping fee will apply for re-delivery.
                        </li>
                        <li>
                            If a delivery fails due to your unavailability, repeated missed attempts, or
                            refusal to accept the order, the resulting Return-to-Origin (RTO) shipping costs
                            may be deducted from any refund due, as set out in our{' '}
                            <a href="/refund">Refund &amp; Cancellation Policy</a>.
                        </li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>9. Damaged or Tampered Shipments</h2>
                    <p>
                        If your package arrives visibly damaged or tampered with, please refuse delivery where
                        possible and notify us within 48 hours at{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a> with photos, so we can resolve
                        it promptly.
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>10. Contact Us</h2>
                    <p>
                        If you have any questions about this Shipping &amp; Delivery Policy, contact us at:{' '}
                        <a href="mailto:team@trendbag.in">team@trendbag.in</a>.
                    </p>
                </div>
            </div>
            <FooterView />
        </div>
    );
};

export default ShippingPolicy;

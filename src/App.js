import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ThesisView,
  PersonaView,
  CreatorView,
  BrandView,
  WardrobeView,
  TripView,
  AestheticsView,
  LookbookView,
  AboutUsView,
  ContactView,
  FooterView
} from './views';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CommunityGuidelines from './pages/CommunityGuidelines';
import RefundPolicy from './pages/RefundPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import SellerTerms from './pages/SellerTerms';
import CookiePolicy from './pages/CookiePolicy';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import CookieBanner from './components/CookieBanner/CookieBanner';
import Marquee from './components/Marquee/Marquee';
import Intro from './components/Intro/Intro';

import ScrollToTop from './components/ScrollToTop';
import { usePersona } from './hooks/persona';
import { useSpotlight } from './hooks/motion';

// The landing page: everyone gets the hero and the picker, then their own sections.
const Landing = () => {
  const persona = usePersona();
  return (
    <>
      <Intro />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <PersonaView />
        <LookbookView />
        {persona === 'shopper' && (
          <>
            <WardrobeView />
            <TripView />
            <AestheticsView />
          </>
        )}
        {persona === 'creator' && <CreatorView />}
        {persona === 'brand' && <BrandView />}
        <Marquee />
        <ThesisView />
        <AboutUsView />
        <ContactView />
      </main>
      <FooterView />
    </>
  );
};

// Legal pages have no <main>; their heading is the start of the content there.
const skipToContent = (e) => {
  e.preventDefault();
  const target = document.getElementById('main') || document.querySelector('h1');
  if (!target) return;
  target.setAttribute('tabindex', '-1');
  target.focus();
  target.scrollIntoView();
};

function App() {
  useSpotlight();
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <a href="#main" className="skip-link" onClick={skipToContent}>Skip to content</a>
        <ScrollProgress />
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Privacy Policy Page */}
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Terms of Service Page */}
          <Route path="/terms" element={<TermsOfService />} />

          {/* Community Guidelines Page */}
          <Route path="/community-guidelines" element={<CommunityGuidelines />} />

          {/* Refund & Cancellation Policy Page */}
          <Route path="/refund" element={<RefundPolicy />} />

          {/* Return & Exchange Policy Page */}
          <Route path="/returns" element={<ReturnPolicy />} />

          {/* Shipping & Delivery Policy Page */}
          <Route path="/shipping" element={<ShippingPolicy />} />

          {/* Seller (brand) payout terms — linked from the Shopify App Store listing */}
          <Route path="/sellers/terms" element={<SellerTerms />} />

          {/* Cookie Policy Page */}
          <Route path="/cookies" element={<CookiePolicy />} />

          {/* Error Page - Catch all unmatched routes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;

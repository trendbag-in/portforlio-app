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
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';

import ScrollToTop from './components/ScrollToTop';
import { usePersona } from './hooks/persona';

// The landing page: everyone gets the hero and the picker, then their own sections.
const Landing = () => {
  const persona = usePersona();
  return (
    <>
      <Navbar />
      <PersonaView />
      {persona === 'shopper' && (
        <>
          <WardrobeView />
          <TripView />
          <AestheticsView />
        </>
      )}
      {persona === 'creator' && <CreatorView />}
      {persona === 'brand' && <BrandView />}
      <ThesisView />
      <AboutUsView />
      <ContactView />
      <FooterView />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
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

          {/* Error Page - Catch all unmatched routes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

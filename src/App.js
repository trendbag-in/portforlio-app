import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroView, FeaturesView, DiscoveryUniverseView, AboutUsView, ContactView, FooterView } from './views';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CommunityGuidelines from './pages/CommunityGuidelines';
import RefundPolicy from './pages/RefundPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <ScrollProgress />
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={
            <>
              <Navbar />
              <HeroView />
              <FeaturesView />
              <DiscoveryUniverseView />
              <AboutUsView />
              <ContactView />
              <FooterView />
            </>
          } />

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

          {/* Error Page - Catch all unmatched routes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

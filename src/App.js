import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroView, DiscoveryUniverseView, AboutUsView, ContactView, FooterView } from './views';
import SurveyPage from './pages/SurveyPage';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollProgress />
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={
            <>
              <Navbar />
              <HeroView />
              <DiscoveryUniverseView />
              <AboutUsView />
              <ContactView />
              <FooterView />
            </>
          } />

          {/* Survey Page */}
          <Route path="/survey" element={<SurveyPage />} />

          {/* Error Page - Catch all unmatched routes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

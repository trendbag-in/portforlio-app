import React from 'react';
import { HeroView, FeaturesView, WhatToExpectView, StatsView, AboutUsView, ContactView, FooterView } from './views';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroView />
      <FeaturesView />
      <WhatToExpectView />
      <StatsView />
      <AboutUsView />
      <ContactView />
      <FooterView />
    </div>
  );
}

export default App;

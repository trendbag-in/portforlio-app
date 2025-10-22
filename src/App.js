import React from 'react';
import { HeroView, WhatToExpectView, AboutUsView, ContactView, FooterView } from './views';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroView />
      <WhatToExpectView />
      <AboutUsView />
      <ContactView />
      <FooterView />
    </div>
  );
}

export default App;

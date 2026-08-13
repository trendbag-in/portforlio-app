import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import './Thesis.css';

/* The single sanctioned gradient on the whole site. DESIGN.md carves out one
   exception the way the product carves one out for the Minis launcher. */
const Thesis = () => (
  <section className="thesis">
    <div className="container">
      <RevealOnScroll>
        <blockquote className="thesis-panel">
          <p className="tb-overline thesis-label">Our thesis</p>
          <p className="thesis-quote">
            Search assumes you already know what you want. Discovery starts with{' '}
            <strong>a person whose taste you trust</strong> — and that is where fashion
            has always actually begun.
          </p>
        </blockquote>
      </RevealOnScroll>
    </div>
  </section>
);

export default Thesis;

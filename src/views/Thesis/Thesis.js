import React, { useRef } from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import { useScrollProgress } from '../../hooks/motion';
import './Thesis.css';

// [text, emphasised] runs, split into words so each can light up in reading order.
const QUOTE = [
  ['Search assumes you already know what you want. Discovery starts with', false],
  ['a person whose taste you trust', true],
  ['— and that is where fashion has always actually begun.', false]
];
const WORDS = QUOTE.flatMap(([text, strong]) => text.split(' ').map((w) => [w, strong]));

/* The single sanctioned gradient on the whole site. DESIGN.md carves out one
   exception the way the product carves one out for the Minis launcher. */
const Thesis = () => {
  const ref = useRef(null);
  useScrollProgress(ref);

  return (
    <section className="thesis" ref={ref}>
      <div className="container">
        <RevealOnScroll>
          <blockquote className="thesis-panel">
            <p className="tb-overline thesis-label">Our thesis</p>
            <p className="thesis-quote" style={{ '--n': WORDS.length }}>
              {WORDS.map(([w, strong], i) => {
                const Tag = strong ? 'strong' : 'span';
                return (
                  <React.Fragment key={i}>
                    <Tag className="thesis-word" style={{ '--i': i }}>{w}</Tag>{' '}
                  </React.Fragment>
                );
              })}
            </p>
          </blockquote>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Thesis;

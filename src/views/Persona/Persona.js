import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import { tilt } from '../../hooks/motion';
import { PERSONAS, PERSONA_NAV, usePersona, setPersona } from '../../hooks/persona';
import './Persona.css';

const CARDS = {
  shopper: { img: 'shopper', line: 'Turn your closet into outfits, plan trips from it, and find your aesthetic.' },
  creator: { img: 'creator', line: 'Post looks and loops, tag what you wore, and earn on every sale they drive.' },
  brand: { img: 'brands', line: 'Sync your Shopify or WooCommerce store, ship orders, and see which looks sell.' }
};

// The home screen: "Who are you?" picks which set of sections the rest of the page shows.
const Persona = () => {
  const persona = usePersona();
  const choose = (id) => {
    setPersona(id);
    // Let the new sections mount, then bring the first one into view.
    requestAnimationFrame(() => {
      const el = document.getElementById(PERSONA_NAV[id][0].id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    });
  };

  return (
    <section id="hero" className="persona">
      <div className="container persona-inner">
        <RevealOnScroll className="persona-head">
          <p className="tb-kicker">Fashion / Social / Shoppable</p>
          <h1 className="persona-title">Who are you here as?</h1>
          <p className="section-lede">Pick one and the rest of the page is about you.</p>
        </RevealOnScroll>

        <div className="persona-grid" role="radiogroup" aria-label="I am a">
          {PERSONAS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={persona === p.id}
              className={`persona-card ${persona === p.id ? 'is-active' : ''}`}
              style={{ '--i': i }}
              onClick={() => choose(p.id)}
              {...tilt}
            >
              <img
                src={`/img/${CARDS[p.id].img}-400.jpg`}
                srcSet={`/img/${CARDS[p.id].img}-400.jpg 400w, /img/${CARDS[p.id].img}-800.jpg 800w`}
                sizes="(max-width: 700px) 90vw, 33vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span className="persona-copy">
                <span className="persona-name">I'm a {p.label.toLowerCase()}</span>
                <span className="persona-line">{CARDS[p.id].line}</span>
              </span>
              <span className="persona-check" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Persona;

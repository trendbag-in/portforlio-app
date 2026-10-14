import React, { useRef } from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import { useScrollProgress } from '../../hooks/motion';
import './Aesthetics.css';

/* Names, covers and lines come from the live app (clients/mobile/constants/aesthetics.ts
   and the hero images it serves), so the deck shows what Explore actually shows. */
const HERO = 'https://assets.trendbag.in/wardrobe-aesthetics/heroes';

const AESTHETICS = [
  { slug: 'desi-streetwear', name: 'Desi Streetwear', line: 'Oversized fits carrying desi identity' },
  { slug: 'indo-western', name: 'Indo-Western', line: 'A kurta over jeans, done deliberately' },
  { slug: 'old-money', name: 'Old Money', line: 'Tailored neutrals, no visible logos' },
  { slug: 'y2k', name: 'Y2K', line: 'Low-rise, baby tees, glossy futurism' },
  { slug: 'wedding-couture', name: 'Wedding Couture', line: 'Zardozi, pearls and heavy work' }
];

const MID = (AESTHETICS.length - 1) / 2;

const Aesthetics = () => {
  const ref = useRef(null);
  useScrollProgress(ref);

  return (
    <section id="aesthetics" className="aesthetics section-block" ref={ref}>
      <div className="container aesthetics-inner">
        <RevealOnScroll className="aesthetics-text">
          <p className="tb-kicker tb-kicker--start">Aesthetics</p>
          <h2>Find your aesthetic. Then shop it.</h2>
          <p className="section-lede">
            Over a hundred style aesthetics, from Desi Streetwear to Old Money. Each one
            brings together the looks people post, products that match, and the pieces in
            your own wardrobe that already fit it.
          </p>

          <dl className="aesthetics-specs">
            <div className="tb-keyval">
              <dt>Looks</dt>
              <dd>Posted by people who wear it</dd>
            </div>
            <div className="tb-keyval">
              <dt>Products</dt>
              <dd>Pieces to buy in the aesthetic</dd>
            </div>
            <div className="tb-keyval">
              <dt>Wardrobe</dt>
              <dd>What you own that already fits</dd>
            </div>
          </dl>
        </RevealOnScroll>

        <div className="aesthetics-deck" role="list" aria-label="Aesthetics on TrendBag">
          {AESTHETICS.map((a, i) => {
            const k = i - MID;
            return (
              <a
                key={a.slug}
                role="listitem"
                className="aesthetic-card"
                href={`https://app.trendbag.in/public/aesthetic/${a.slug}?slug=${a.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--k': k, '--d': Math.abs(k), zIndex: 10 - Math.abs(k) }}
              >
                <img src={`${HERO}/${a.slug}.jpg`} alt="" loading="lazy" decoding="async" />
                <span className="aesthetic-card-copy">
                  <span className="aesthetic-card-name">{a.name}</span>
                  <span className="aesthetic-card-line">{a.line}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Aesthetics;

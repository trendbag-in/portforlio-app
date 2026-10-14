import React from 'react';
import Pinned from '../../components/Pinned/Pinned';
import { AESTHETICS } from '../../data/aesthetics';
import './Aesthetics.css';

const ON_LINE = AESTHETICS;
const SAG = 70; // px the line dips at its middle
const TILTS = [-5, 3, -2, 4, -4, 2, -3, 5, -1, 3, -4, 2];

/* Aesthetics as polaroids pegged along a sagging clothesline that is wider than the
   screen: scrolling slides the line past, and each polaroid swings as it travels. */
const Aesthetics = () => (
  <section id="aesthetics" className="aesthetics">
    <Pinned extra={160} className="aesthetics-pin">
      <div className="aesthetics-stage">
      <div className="container aesthetics-head">
        <div className="aesthetics-text">
          <p className="tb-kicker tb-kicker--start">Aesthetics</p>
          <h2>Find your aesthetic. Then shop it.</h2>
          <p className="section-lede pin-more">
            Over a hundred style aesthetics, from Desi Streetwear to Old Money. Each one
            brings together the looks people post, products that match, and the pieces in
            your own wardrobe that already fit it.
          </p>
        </div>

        <dl className="aesthetics-specs pin-more">
          <div className="tb-keyval"><dt>Looks</dt><dd>Posted by people who wear it</dd></div>
          <div className="tb-keyval"><dt>Products</dt><dd>Pieces to buy in the aesthetic</dd></div>
          <div className="tb-keyval"><dt>Wardrobe</dt><dd>What you own that already fits</dd></div>
        </dl>
      </div>

      <div className="line-scroll">
        <div className="line" style={{ '--n': ON_LINE.length, '--sag': `${SAG}px` }}>
          <svg className="line-string" viewBox={`0 0 100 ${SAG + 4}`} preserveAspectRatio="none" aria-hidden="true">
            <path d={`M0 2 Q50 ${SAG * 2 + 2} 100 2`} />
          </svg>
          <ul className="line-items" aria-label="Aesthetics on TrendBag">
            {ON_LINE.map((a, i) => {
              const t = (i + 0.5) / ON_LINE.length;
              return (
                <li
                  key={a.slug}
                  className="line-item"
                  style={{ '--drop': `${(SAG * 4 * t * (1 - t)).toFixed(1)}px`, '--tilt': `${TILTS[i]}deg`, '--i': i }}
                >
                  <span className="peg" aria-hidden="true" />
                  <a className="polaroid" href={a.href} target="_blank" rel="noopener noreferrer">
                    <img src={a.img} alt="" loading="lazy" decoding="async" />
                    <span className="polaroid-name">{a.name}</span>
                    <span className="polaroid-line">{a.line}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      </div>
    </Pinned>
  </section>
);

export default Aesthetics;

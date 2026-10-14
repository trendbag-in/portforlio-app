import React from 'react';
import { AESTHETICS } from '../../data/aesthetics';
import { LOOKS } from '../../data/looks';
import './Marquee.css';

// One pass of the strip: aesthetic names, filled and outlined in turn, with a look between each.
const Row = ({ hidden }) => (
  <ul className="marquee-row" aria-hidden={hidden || undefined}>
    {AESTHETICS.map((a, i) => (
      <li key={a.slug} className={i % 2 ? 'is-outline' : ''}>
        <span>{a.name}</span>
        <img src={LOOKS[i % LOOKS.length].src} alt="" loading="lazy" decoding="async" />
      </li>
    ))}
  </ul>
);

// A slow strip of aesthetics between sections. Two copies make the loop seamless.
const Marquee = () => (
  <section className="marquee" aria-label="Some of the aesthetics on TrendBag">
    <div className="marquee-track">
      <Row />
      <Row hidden />
    </div>
  </section>
);

export default Marquee;

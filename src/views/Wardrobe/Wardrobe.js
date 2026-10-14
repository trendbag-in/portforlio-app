import React from 'react';
import StackDeck, { Layer } from '../../components/StackDeck/StackDeck';
import { G } from '../../data/garments';
import './Wardrobe.css';

/* Real outfits from the app's Outfits gallery: names, scores and verdicts as the
   outfit review wrote them (one trimmed to fit). */
const OUTFITS = [
  { name: 'Beige And White Ease', score: 8.8, verdict: 'Good color and material, but fit could be better.', pieces: [G.beigePolo, G.whiteTrousers, G.brogues] },
  { name: 'Casual Plaid Harmony', score: 8.3, verdict: 'Brown plaid shirt and blue jeans blend well.', pieces: [G.plaidShirt, G.jeans, G.sneakers] },
  { name: 'Contrast Casual Chic', score: 8.8, verdict: 'Pink kurta and black pants create striking contrast.', pieces: [G.pinkKurta, G.blackTrousers, G.brogues] },
  { name: 'Monochromatic Night Out', score: 7.0, verdict: 'A cohesive, understated dark monochrome look.', pieces: [G.blackPolo, G.blackTrousers, G.sneakers] },
  { name: 'Casual Linen Breeze', score: 6.7, verdict: 'White linen shirt clashes with light wash jeans.', pieces: [G.linenShirt, G.lightJeans, G.sneakers] }
];

const STEPS = [
  { n: '01', title: 'Snap it', body: 'Add a photo and every garment in it becomes an item, as a clean product shot.' },
  { n: '02', title: 'Mix & match', body: 'Shuffle pieces into sets yourself, or have it generate outfits from what you own.' },
  { n: '03', title: 'Rate it', body: 'Every outfit gets a score out of 10 with the reason, so you know what to change.' }
];

const Outfit = (o) => (
  <div className="outfit-card">
    <span className="outfit-score tb-num">{o.score.toFixed(1)}<small>/10</small></span>
    <div className="outfit-pieces">
      {o.pieces.map((src, k) => (
        <span key={k} className={`outfit-piece outfit-piece--${k}`}><img src={src} alt="" loading="lazy" decoding="async" /></span>
      ))}
    </div>
    <div className="outfit-meta">
      <p className="outfit-name">{o.name}</p>
      <span className="outfit-bar"><span style={{ '--s': o.score / 10 }} /></span>
      <p className="outfit-verdict">{o.verdict}</p>
    </div>
  </div>
);

const Copy = (
  <>
    <p className="tb-kicker tb-kicker--start">Wardrobe</p>
    <h2>Your closet, styled into outfits.</h2>
    <p className="section-lede stack-aside-more">
      Everything you own, in one place, put to work. Nothing to type in, nothing to tag by hand.
    </p>

    <ol className="wardrobe-steps stack-aside-more">
      {STEPS.map((s) => (
        <li key={s.n}>
          <span className="tb-num wardrobe-step-n">{s.n}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  </>
);

// Far layers drift slowly, near ones fast: the giant word, then loose pieces.
const Backdrop = (
  <>
    <Layer className="stack-word" sx={500}>Outfits</Layer>
    <Layer className="float float--sunglasses" sy={420} rot={-14}><img src={G.sunglasses} alt="" /></Layer>
    <Layer className="float float--sneakers" sy={900} rot={10}><img src={G.sneakers} alt="" /></Layer>
    <Layer className="float float--brogues" sy={1300} rot={-8}><img src={G.brogues} alt="" /></Layer>
  </>
);

const Wardrobe = () => (
  <section id="wardrobe" className="wardrobe">
    <StackDeck
      items={OUTFITS}
      label="Outfits built from one closet"
      renderCard={Outfit}
      aside={Copy}
      backdrop={Backdrop}
      footer={(active, goTo) => (
        <div className="outfit-controls">
          <button type="button" className="outfit-arrow" onClick={() => goTo(active - 1)} aria-label="Previous outfit">‹</button>
          <span className="tb-num outfit-count">{active + 1} / {OUTFITS.length}</span>
          <button type="button" className="outfit-arrow" onClick={() => goTo(active + 1)} aria-label="Next outfit">›</button>
        </div>
      )}
    />
  </section>
);

export default Wardrobe;

import React from 'react';
import StackDeck, { Layer } from '../../components/StackDeck/StackDeck';
import { G } from '../../data/garments';
import './Trip.css';

/* Mirrors the app's trip planner (minis/trip-planner): the same inputs, a day deck
   of Day / Night outfits from the closet, and a pack list tagged Closet / Missing / Own. */
const DAYS = [
  { day: 'Day 1', temp: 33, sky: 'sun', look: [G.linenShirt, G.whiteTrousers, G.sneakers], night: [G.blackPolo, G.blackTrousers, G.brogues] },
  { day: 'Day 2', temp: 32, sky: 'sun', look: [G.beigePolo, G.lightJeans, G.sneakers], night: [G.pinkKurta, G.whiteTrousers, G.brogues] },
  { day: 'Day 3', temp: 31, sky: 'cloud', look: [G.plaidShirt, G.jeans, G.sneakers], night: [G.linenShirt, G.blackTrousers, G.brogues] },
  { day: 'Day 4', temp: 33, sky: 'sun', look: [G.blackPolo, G.lightJeans, G.sneakers], night: [G.beigePolo, G.whiteTrousers, G.brogues] }
];

const PACK = [
  { item: 'White linen shirt', tag: 'Closet' },
  { item: 'Beige polo', tag: 'Closet' },
  { item: 'Pink kurta', tag: 'Closet' },
  { item: 'White trousers', tag: 'Closet' },
  { item: 'Light wash jeans', tag: 'Closet' },
  { item: 'Sunglasses', tag: 'Own' },
  { item: 'Swim shorts', tag: 'Missing' }
];

const Sky = ({ kind }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    {kind === 'sun' ? (
      <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
    ) : (
      <path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 2A3 3 0 0 0 7 18z" />
    )}
  </svg>
);

const Fit = ({ label, pieces }) => (
  <div className="trip-fit">
    <span className="tb-overline trip-fit-label">{label}</span>
    <div className="trip-fit-pieces">
      {pieces.map((src, k) => <span key={k}><img src={src} alt="" loading="lazy" decoding="async" /></span>)}
    </div>
  </div>
);

const PACKED = PACK.filter((p) => p.tag !== 'Missing').length;

const DayCard = (d) => (
  <div className="trip-card">
    <p className="trip-card-head">
      <strong>{d.day}</strong>
      <span className="trip-day-temp"><Sky kind={d.sky} />{d.temp}°</span>
    </p>
    <div className="trip-fits">
      <Fit label="Day" pieces={d.look} />
      <Fit label="Night" pieces={d.night} />
    </div>
  </div>
);

const PackCard = () => (
  <div className="trip-card trip-pack">
    <p className="trip-card-head">
      <strong>Pack list</strong>
      <span className="tb-num">{PACKED}/{PACK.length} packed</span>
    </p>
    <ul>
      {PACK.map((p, i) => (
        <li key={p.item} className={`trip-pack-item is-${p.tag.toLowerCase()}`} style={{ '--i': i }}>
          <span className="trip-check" aria-hidden="true" />
          <span className="trip-pack-name">{p.item}</span>
          <span className="trip-tag">{p.tag}</span>
        </li>
      ))}
    </ul>
    <p className="trip-gap">Missing 1 piece · <span>shop them</span></p>
  </div>
);

// The days deal off the pile first; the pack list is the last card.
const CARDS = [...DAYS, null];
const TABS = [...DAYS.map((d) => d.day), 'Pack'];

const Copy = (
  <>
    <p className="tb-kicker tb-kicker--start">Trip planner</p>
    <h2>Pack from your closet, not from scratch.</h2>
    <p className="section-lede stack-aside-more">
      Say where you are going and what the plan is. It checks the weather, plans a fit for
      every day and night from clothes you already own, and flags anything missing so you can shop it.
    </p>

    <div className="trip-form stack-aside-more" aria-hidden="true">
      <div className="trip-field"><span>Where to?</span><strong>Goa</strong></div>
      <div className="trip-field"><span>Dates</span><strong>4 days</strong></div>
      <div className="trip-field trip-field--wide">
        <span>What's the plan?</span>
        <span className="trip-chips">
          <span className="tb-chip tb-chip--active">Beach</span>
          <span className="tb-chip tb-chip--active">Parties</span>
          <span className="tb-chip">Sightseeing</span>
        </span>
      </div>
      <div className="trip-field"><span>Bag</span><strong>Cabin · 12</strong></div>
      <div className="trip-field"><span>Laundry</span><strong>None</strong></div>
    </div>
  </>
);

const Backdrop = (
  <>
    <Layer className="stack-word trip-word" sx={-500}>Goa</Layer>
    <Layer className="float trip-sun" sy={300} rot={40}><Sky kind="sun" /></Layer>
    <Layer className="float float--shirt" sy={800} rot={-10}><img src={G.linenShirt} alt="" /></Layer>
    <Layer className="float float--shades" sy={1250} rot={16}><img src={G.sunglasses} alt="" /></Layer>
  </>
);

const Trip = () => (
  <section id="trip" className="trip">
    <StackDeck
      items={CARDS}
      label="Goa, four days of outfits and a pack list"
      renderCard={(d) => (d ? DayCard(d) : PackCard())}
      aside={Copy}
      backdrop={Backdrop}
      header={(active, goTo) => (
        <div className="trip-plan-head">
          <strong>Goa · 4 days</strong>
          <div className="trip-days" role="tablist" aria-label="Trip days">
            {TABS.map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`trip-day ${i === active ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    />
  </section>
);

export default Trip;

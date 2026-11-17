import React from 'react';
import Pinned from '../../components/Pinned/Pinned';
import './Collabs.css';

const TERMS = [
  { type: 'Percentage', value: '12%', line: 'of every sale you drive' },
  { type: 'Flat rate', value: '₹250', line: 'per order' },
  { type: 'Hybrid', value: '₹120 + 6%', line: 'a fixed fee plus a cut', on: true }
];

// Same deal memo from either side of the table.
const SIDES = {
  creator: {
    kicker: 'Brand collaborations',
    h2: 'Get brand deals, on terms you can read.',
    lede: 'Fashion brands invite you, or you pitch them. Agree how you are paid before anything goes live, and see what each collab earned. Paid UGC briefs are in early access.',
    steps: ['Find brands that fit your style', 'Pitch them, or answer their invite', 'Agree the commission', 'See what each collab earned'],
    creator: '@you',
    brand: 'Linen & Loom'
  },
  brand: {
    kicker: 'Influencer marketing',
    h2: 'Creators who wear your pieces, on terms you set.',
    lede: 'Invite fashion creators or answer their requests, agree a commission, and every look they tag links to your product. Paid UGC briefs are in early access.',
    steps: ['Find creators by niche and reach', 'Invite them, or answer their request', 'Agree the commission', 'See which creator sold what'],
    creator: '@creator',
    brand: 'Your brand'
  }
};

/* A deal memo on paper: the parties, the commission picked from the three kinds the
   app offers, two signatures, and an AGREED stamp that lands as you scroll. */
const Collabs = ({ side = 'creator' }) => {
  const c = SIDES[side];
  return (
  <section id="collabs" className="collabs">
    <Pinned extra={90}>
      <div className="container collabs-inner">
        <div className="collabs-copy">
          <p className="tb-kicker tb-kicker--start">{c.kicker}</p>
          <h2>{c.h2}</h2>
          <p className="section-lede pin-more">{c.lede}</p>
          <ol className="collabs-steps pin-more">
            {c.steps.map((s, i) => <li key={s}><span className="tb-num">0{i + 1}</span>{s}</li>)}
          </ol>
        </div>

        <article className="memo" aria-label="Example collaboration agreement">
          <header className="memo-head">
            <span className="tb-overline">Collaboration agreement</span>
            <span className="tb-num">No. 0418 · example</span>
          </header>

          <dl className="memo-parties">
            <div><dt>Brand</dt><dd>{c.brand}</dd></div>
            <div><dt>Creator</dt><dd>{c.creator}</dd></div>
          </dl>

          <p className="memo-label">Commission</p>
          <ul className="memo-terms">
            {TERMS.map((t) => (
              <li key={t.type} className={t.on ? 'is-on' : ''}>
                <span className="memo-radio" aria-hidden="true" />
                <span><strong>{t.type}</strong>{t.line}</span>
                <em className="tb-num">{t.value}</em>
              </li>
            ))}
          </ul>

          <p className="memo-note">Live from 20 Oct · paid on delivered orders · tracked in Analytics</p>

          <div className="memo-sign">
            <span><i>{c.brand}</i>Brand</span>
            <span><i>{c.creator.replace('@', '')}</i>Creator</span>
          </div>

          <span className="memo-stamp" aria-hidden="true">Agreed</span>
        </article>
      </div>
    </Pinned>
  </section>
  );
};

export default Collabs;

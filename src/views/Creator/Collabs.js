import React from 'react';
import Pinned from '../../components/Pinned/Pinned';
import './Collabs.css';

const TERMS = [
  { type: 'Percentage', value: '12%', line: 'of every sale you drive' },
  { type: 'Flat rate', value: '₹250', line: 'per order' },
  { type: 'Hybrid', value: '₹120 + 6%', line: 'a fixed fee plus a cut', on: true }
];

const STEPS = ['Discover brands', 'Request, or answer theirs', 'Agree the commission', 'Track it in Analytics'];

/* A deal memo on paper: the parties, the commission picked from the three kinds the
   app offers, two signatures, and an AGREED stamp that lands as you scroll. */
const Collabs = () => (
  <section id="collabs" className="collabs">
    <Pinned extra={90}>
      <div className="container collabs-inner">
        <div className="collabs-copy">
          <p className="tb-kicker tb-kicker--start">Collaborations</p>
          <h2>Work with brands on terms you can read.</h2>
          <p className="section-lede pin-more">
            Browse brands, send a request or answer theirs, and agree how you are paid before
            anything goes live. Each collaboration gets its own analytics.
          </p>
          <ol className="collabs-steps pin-more">
            {STEPS.map((s, i) => <li key={s}><span className="tb-num">0{i + 1}</span>{s}</li>)}
          </ol>
        </div>

        <article className="memo" aria-label="Example collaboration agreement">
          <header className="memo-head">
            <span className="tb-overline">Collaboration agreement</span>
            <span className="tb-num">No. 0418 · example</span>
          </header>

          <dl className="memo-parties">
            <div><dt>Brand</dt><dd>Linen &amp; Loom</dd></div>
            <div><dt>Creator</dt><dd>@you</dd></div>
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
            <span><i>Linen &amp; Loom</i>Brand</span>
            <span><i>you</i>Creator</span>
          </div>

          <span className="memo-stamp" aria-hidden="true">Agreed</span>
        </article>
      </div>
    </Pinned>
  </section>
);

export default Collabs;

import React, { useRef } from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import StackDeck, { Layer } from '../../components/StackDeck/StackDeck';
import CountUp from '../../components/CountUp';
import { useScrollProgress } from '../../hooks/motion';
import { G } from '../../data/garments';
import './Creator.css';

/* Everything here mirrors the creator side of the app: the Create screen's four
   formats, Business → Performance / Earnings, and Collaborations. Figures are
   examples and labelled as such. */

const FORMATS = [
  { kind: 'looks', name: 'Looks', line: "Post today's outfit and tag what you wore", meta: 'Up to 5 photos · tag products & hashtags' },
  { kind: 'loops', name: 'Loops', line: 'Short videos (< 60s)', meta: 'Tag the products in your content' },
  { kind: 'stories', name: 'Stories', line: 'Text, photo or video (24h)', meta: 'Gone tomorrow' },
  { kind: 'collections', name: 'Collections', line: 'Curated product sets', meta: 'Shop the whole edit' }
];

const Media = ({ kind }) => {
  if (kind === 'looks') {
    return (
      <div className="fmt-media">
        <img src="/img/creator-800.jpg" alt="" loading="lazy" />
        <span className="fmt-tag" style={{ left: '22%', top: '30%' }}><img src={G.linenShirt} alt="" />Linen shirt</span>
        <span className="fmt-tag" style={{ left: '48%', top: '64%' }}><img src={G.lightJeans} alt="" />Light wash jeans</span>
      </div>
    );
  }
  if (kind === 'loops') {
    return (
      <div className="fmt-media">
        <img src="/img/hero-portrait-896.jpg" alt="" loading="lazy" />
        <span className="fmt-play" aria-hidden="true" />
        <span className="fmt-time tb-num">0:42</span>
        <span className="fmt-chips"><span>Linen</span><span>Co-ords</span><span>Workwear</span></span>
      </div>
    );
  }
  if (kind === 'stories') {
    return (
      <div className="fmt-media">
        <img src="/img/shopper-800.jpg" alt="" loading="lazy" />
        <span className="fmt-bars" aria-hidden="true"><span /><span /><span /></span>
        <span className="fmt-time tb-num">24h</span>
      </div>
    );
  }
  return (
    <div className="fmt-media fmt-grid">
      {[G.beigePolo, G.whiteTrousers, G.sunglasses, G.brogues].map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
    </div>
  );
};

const Format = (f) => (
  <div className="fmt-card">
    <Media kind={f.kind} />
    <div className="fmt-foot">
      <p className="fmt-name">{f.name}</p>
      <p className="fmt-line">{f.line}</p>
      <p className="tb-overline fmt-meta">{f.meta}</p>
    </div>
  </div>
);

const CreateCopy = (
  <>
    <p className="tb-kicker tb-kicker--start">Create</p>
    <h2>Post what you wear. Get paid when it sells.</h2>
    <p className="section-lede stack-aside-more">
      Four ways to post, all shoppable. Tag the pieces in a look or a loop, and every
      order that comes through your content is counted to you.
    </p>
  </>
);

// Daily commission, ₹ — an example fortnight.
const DAILY = [820, 1240, 960, 1810, 2400, 1530, 1190, 2860, 3320, 2140, 1760, 2980, 3640, 2730];
const MAX = Math.max(...DAILY);

const WALLET = [
  { k: 'Available', v: 12600 },
  { k: 'Pending', v: 8940 },
  { k: 'Reserved', v: 2180 },
  { k: 'Withdrawn', v: 14700 }
];

const Earn = () => {
  const ref = useRef(null);
  useScrollProgress(ref);

  return (
    <section id="earn" className="earn section-block" ref={ref}>
      <div className="container earn-inner">
        <RevealOnScroll className="earn-text">
          <p className="tb-kicker tb-kicker--start">Earnings</p>
          <h2>Every order you drove, and what you made from it.</h2>
          <p className="section-lede">
            Performance shows the orders and sales your content drove. Earnings shows your wallet
            and every commission — gross, platform fee and net — day by day.
          </p>
        </RevealOnScroll>

        <div className="earn-board">
          <span className="tb-example tb-overline">Example figures</span>
          <div className="tb-tile tb-tile--stats" style={{ '--speed': 60 }}>
            <p className="tb-overline">Performance</p>
            <div className="earn-stats">
              <div><span>Orders Driven</span><strong><CountUp to={128} /></strong></div>
              <div><span>Sales Value</span><strong><CountUp to={384200} prefix="₹" /></strong></div>
              <div><span>You Earned</span><strong className="is-accent"><CountUp to={38420} prefix="₹" /></strong></div>
            </div>
          </div>

          <div className="tb-tile tb-tile--chart" style={{ '--speed': 140 }}>
            <p className="tb-overline">Daily commission</p>
            <div className="earn-bars" aria-hidden="true">
              {DAILY.map((v, i) => <span key={i} style={{ '--h': v / MAX, '--i': i }} />)}
            </div>
          </div>

          <div className="tb-tile tb-tile--wallet" style={{ '--speed': 100 }}>
            <p className="tb-overline">Wallet</p>
            <ul>
              {WALLET.map((w) => (
                <li key={w.k}><span>{w.k}</span><strong className="tb-num">₹{w.v.toLocaleString('en-IN')}</strong></li>
              ))}
            </ul>
          </div>

          <div className="tb-tile tb-tile--fees" style={{ '--speed': 200 }}>
            <p className="tb-overline">Commissions</p>
            <ul>
              <li><span>Gross</span><strong className="tb-num">₹42,690</strong></li>
              <li><span>Platform fee</span><strong className="tb-num">− ₹4,270</strong></li>
              <li className="is-net"><span>Net earned</span><strong className="tb-num">₹38,420</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const TERMS = [
  { type: 'Percentage', value: '12%', line: 'of every sale you drive' },
  { type: 'Flat rate', value: '₹250', line: 'per order, whatever the basket' },
  { type: 'Hybrid', value: '₹120 + 6%', line: 'a fixed fee plus a cut' }
];

const STEPS = ['Discover partners', 'Request collaboration', 'Agree the commission', 'Track it in Analytics'];

const Collabs = () => {
  const ref = useRef(null);
  useScrollProgress(ref);

  return (
    <section id="collabs" className="collabs section-block" ref={ref}>
      <div className="container collabs-inner">
        <RevealOnScroll className="collabs-text">
          <p className="tb-kicker tb-kicker--start">Collaborations</p>
          <h2>Work with brands on terms you can read.</h2>
          <p className="section-lede">
            Browse brands, send a request or answer theirs, and agree how you are paid before
            anything goes live. Each collaboration gets its own analytics.
          </p>
          <ol className="collabs-steps">
            {STEPS.map((s, i) => <li key={s} style={{ '--i': i }}><span className="tb-num">0{i + 1}</span>{s}</li>)}
          </ol>
        </RevealOnScroll>

        <div className="collabs-fan" aria-label="Commission types">
          {TERMS.map((t, i) => (
            <article key={t.type} className="term-card" style={{ '--k': i - 1, '--d': Math.abs(i - 1) }}>
              <p className="tb-overline">{t.type}</p>
              <p className="term-value tb-num">{t.value}</p>
              <p className="term-line">{t.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Creator = () => (
  <>
    <section id="create" className="create">
      <StackDeck
        items={FORMATS}
        label="Four ways to post"
        renderCard={Format}
        aside={CreateCopy}
        backdrop={<Layer className="stack-word" sx={500}>Create</Layer>}
        header={(active, goTo) => (
          <div className="stack-tabs" role="tablist" aria-label="Formats">
            {FORMATS.map((f, i) => (
              <button
                key={f.kind}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`stack-tab ${i === active ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
              >
                {f.name}
              </button>
            ))}
          </div>
        )}
      />
    </section>
    <Earn />
    <Collabs />
  </>
);

export default Creator;

import React from 'react';
import StackDeck, { Layer } from '../../components/StackDeck/StackDeck';
import { G } from '../../data/garments';
import Earn from './Earn';
import Collabs from './Collabs';
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

// /find-creators and /find-creators/<niche>: static pages from the public creator directory API, read at build time.
// API down or empty: the niche list in src/content/creator-niches.json (user-service creatorintel/config.yaml), no creators.
const L = require('./landing-pages');
const { esc } = require('./landing-ui');
const NICHES = require('../src/content/creator-niches.json');

const API = (process.env.REACT_APP_API_BASE || 'https://api.trendbag.in').replace(/\/+$/, '');
const CREATOR_SIGNUP = 'https://app.trendbag.in/auth/signup?return=/creator/become-creator';
const BRAND_CTA = { label: 'Request early access', href: '#contact' }; // the /brands page's CTA, its lead form
const TIERS = { ugc: 'UGC', nano: 'Nano', micro: 'Micro', mid: 'Mid-tier', macro: 'Macro' };
const PHOTO = { fashion: 'kurta', beauty: 'blazer', fitness: 'rocks', food: 'couch', travel: 'sea', lifestyle: 'steps', comedy: 'film', parenting: 'couch', tech: 'film', home: 'wardrobe', education: 'planner' };
const PER_SECTION = 8; // two rows of four: one screen

async function get(path) {
  const res = await fetch(API + path, { signal: AbortSignal.timeout(8000), headers: { Accept: 'application/json', 'X-APP': 'portfolio' } });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
}
const https = (u) => (typeof u === 'string' && /^https:\/\/[^\s"'<>]+$/.test(u) ? u : '');
const strs = (a) => (Array.isArray(a) ? a.filter((x) => typeof x === 'string' && x.trim()).map((x) => x.trim()) : []);

// only the fields the contract makes public
const creator = (c) => ({
  id: /^[a-f0-9]{8,64}$/.test(c.id || '') ? c.id : '',
  handle: String(c.masked_handle || '').trim(),
  name: String(c.first_name || '').trim(),
  avatar: https(c.avatar),
  tier: TIERS[c.tier] || '',
  niches: strs(c.niches).slice(0, 3),
  formats: strs(c.formats).slice(0, 2),
  languages: strs(c.languages).slice(0, 3),
  band: String(c.engagement_band || '').trim(),
  posts: (Array.isArray(c.posts) ? c.posts : []).map((x) => https(x && x.thumbnail)).filter(Boolean).slice(0, 3)
});

// every niche with its creators; never throws, so a failed API leaves the static list and empty states
async function load() {
  const niches = new Map(NICHES.map((n) => [n.slug, { ...n, count: 0, creators: [] }]));
  let api = 'down';
  try {
    const r = await get('/api/user/public/creators/niches');
    for (const n of Array.isArray(r && r.niches) ? r.niches : []) {
      if (!n || !/^[a-z0-9_-]{1,40}$/.test(n.slug || '') || !(Number(n.count) > 0)) continue;
      niches.set(n.slug, { ...(niches.get(n.slug) || { slug: n.slug, label: String(n.label || n.slug), creators: [] }), count: 0 });
    }
    api = 'ok';
  } catch (e) {
    console.warn(`directory: ${API} niches failed (${e.message}); static niche list, no creators`);
  }
  if (api === 'ok') {
    // one at a time: the public endpoint is rate-limited
    for (const n of niches.values()) {
      try {
        const r = await get(`/api/user/public/creators?niche=${encodeURIComponent(n.slug)}&limit=24&offset=0`);
        n.creators = (Array.isArray(r && r.creators) ? r.creators : []).map(creator).filter((c) => c.handle);
        n.count = n.creators.length ? Math.max(Number(r.total) || 0, n.creators.length) : 0;
      } catch (e) {
        console.warn(`directory: creators for ${n.slug} failed (${e.message}); empty state`);
      }
    }
  }
  // a niche only the API knows gets a page while it has creators to show
  const list = [...niches.values()].filter((n) => n.creators.length || NICHES.some((s) => s.slug === n.slug));
  console.log(`directory: API ${api}, ${list.length} niches, ${list.reduce((a, n) => a + n.creators.length, 0)} creators`);
  return list;
}

const lower = (label) => label.charAt(0).toLowerCase() + label.slice(1);
const titleCase = (label) => label.replace(/\b[a-z]/g, (c) => c.toUpperCase());
const countText = (n) => (n === 1 ? '1 creator listed' : n ? `${n} creators listed` : 'Joining now');
const initials = (c) => (c.name || c.handle).replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2).toUpperCase();

function card(c, i) {
  const meta = [c.formats.join(', '), c.languages.join(', ')].filter(Boolean).join(' · ');
  const posts = [0, 1, 2].map((k) => (c.posts[k] ? `<img src="${esc(c.posts[k])}" alt="Recent post" width="96" height="96" loading="lazy" decoding="async">` : '<span aria-hidden="true"></span>')).join('');
  return `<article class="card tb-creator span-3"${c.id ? ` data-cid="${c.id}"` : ''}>
    <div class="tb-creator__head"><span class="tb-creator__av" data-tone="${(i % 5) + 1}" aria-hidden="true">${esc(initials(c))}${c.avatar ? `<img src="${esc(c.avatar)}" alt="" width="40" height="40" loading="lazy" decoding="async">` : ''}</span><div><h3>${esc(c.handle)}</h3>${c.name ? `<span class="t-small muted">${esc(c.name)}</span>` : ''}</div>${c.tier ? `<span class="tb-chip">${esc(c.tier)}</span>` : ''}</div>
    <div class="tb-creator__posts">${posts}</div>
    ${c.niches.length ? `<div class="tb-creator__tags">${c.niches.map((n) => `<span class="tb-chip tb-chip--plain">${esc(n)}</span>`).join('')}</div>` : ''}
    ${meta ? `<p class="t-small">${esc(meta)}</p>` : ''}
    <div class="tb-creator__foot">${c.band ? `<span class="t-small">Engagement <b>${esc(c.band)}</b></span>` : '<span></span>'}<a class="btn btn--secondary" href="#request" aria-label="Contact ${esc(c.handle)} through TrendBag">Contact</a></div>
  </article>`;
}

function creatorSections(n) {
  // even sections, so the last screen is never one or two lone cards
  const per = Math.ceil(n.creators.length / Math.ceil(n.creators.length / PER_SECTION));
  const out = [];
  for (let i = 0; i < n.creators.length; i += per) {
    const id = i ? `creators-${i / per + 1}` : 'creators';
    const head = i
      ? `<div class="section-head"><h2 id="${id}-h">More ${esc(lower(n.label))} creators</h2></div>`
      : `<div class="section-head"><h2 id="${id}-h">${esc(n.label)} creators listed on TrendBag</h2></div>`;
    out.push(`<section class="section" id="${id}" aria-labelledby="${id}-h"><div class="wrap">${head}<div class="grid tb-creators">${n.creators.slice(i, i + per).map(card).join('')}</div></div></section>`);
  }
  return out;
}

function emptySection(n) {
  return `<section class="section" id="creators" aria-labelledby="creators-h"><div class="wrap">
    <div class="grid fill tb-split">
      <div class="span-6 tb-col">
        <div class="section-head"><h2 id="creators-h">Creators in ${esc(lower(n.label))} are joining now</h2><p>No ${esc(lower(n.label))} creator has turned on the listing yet. Creators appear here once they join TrendBag and choose to be shown to brands.</p></div>
        <ul class="rows tb-rows">
          <li><span class="rows__name">Join TrendBag as a creator</span><p>Free to join, with no follower minimum.</p></li>
          <li><span class="rows__name">Connect your Instagram</span><p>TrendBag reads your public posts to work out your niches, formats and languages.</p></li>
          <li><span class="rows__name">Turn on the brand directory</span><p>In Account &amp; privacy, switch on Show me in the brand directory. You can switch it off at any time.</p></li>
        </ul>
        <div class="btn-row tb-empty__cta"><a class="btn btn--primary" href="${CREATOR_SIGNUP}">Join as a creator</a></div>
      </div>
      <div class="frame frame--photo frame--fill span-6 start-7">${L.img(PHOTO[n.slug] || 'film')}</div>
    </div>
  </div></section>`;
}

function nichesSection(list, { id, heading, intro, skip, photo }) {
  const items = list.filter((n) => n.slug !== skip);
  return `<section class="section" id="${id}" aria-labelledby="${id}-h"><div class="wrap">
    <div class="grid fill tb-split">
      <div class="span-6 tb-col">
        <div class="section-head"><h2 id="${id}-h">${esc(heading)}</h2>${intro ? `<p>${esc(intro)}</p>` : ''}</div>
        <ul class="tb-niches">${items.map((n) => `<li><a class="tb-niche" href="/find-creators/${n.slug}"><span class="tb-niche__t">${esc(n.label)}</span><span class="t-small muted">${countText(n.count)}</span></a></li>`).join('')}</ul>
      </div>
      <div class="frame frame--photo frame--fill span-6 start-7">${L.img(photo)}</div>
    </div>
  </div></section>`;
}

const CONTACT = {
  id: 'how-contact-works',
  heading: 'How contact works in the creator directory',
  items: [
    { title: 'Creators choose to be listed', body: 'A creator appears only after turning on Show me in the brand directory in the TrendBag app, and can turn it off at any time.' },
    { title: 'Handles stay partly hidden', body: 'You see the first letters of the Instagram handle, a first name, tier, niches, languages, an engagement range and up to three recent posts.' },
    { title: 'No contact details on the page', body: 'Phone numbers, emails, rates and exact follower counts are never shown. You reach creators through TrendBag by inviting them to a paid brief.' }
  ]
};

const FAQ = [
  { q: 'Who is listed in the creator directory?', a: 'Only creators on TrendBag who turned on Show me in the brand directory in the app. A creator who turns it off leaves this page at its next update.' },
  { q: 'What can brands see about a creator?', a: 'A partly hidden Instagram handle, first name, tier, niches, content formats, languages, an engagement range and up to three recent post thumbnails. Never contact details.' },
  { q: 'How do I contact a creator?', a: 'Request early access for your brand. Once your store is on TrendBag, you invite creators to a paid brief from the app, and they apply or decline there.' },
  { q: 'I am a creator. How do I get listed?', a: 'Join TrendBag as a creator and connect your Instagram. Once your profile is analysed, turn on Show me in the brand directory in Account & privacy.' }
];

const page = (o) => ({ persona: 'brand', cta: BRAND_CTA, kicker: 'Creator directory', ...o });
const hero = (k, pins) => ({ src: L.PH[k].src, alt: L.PH[k].alt, pos: L.PH[k].pos || '50% 50%', pins: pins.map((text) => ({ text })) });
const PROOF = 'Only creators who turned the listing on in the TrendBag app appear here.';
// the form's photograph is never the hero's
const plan = (heroPhoto) => ({ hero: 'split', faqPhotos: ['steps', 'temple'], requestPhoto: heroPhoto === 'couch' ? 'hill' : 'couch' });

function pages(list) {
  const total = list.reduce((a, n) => a + n.count, 0);
  const index = page({
    path: '/find-creators',
    title: 'Find Instagram Creators in India by Niche | TrendBag',
    description: 'Browse Instagram creators in India by niche, from fashion and beauty to food and travel. Every creator listed opted in, and contact goes through TrendBag.',
    h1: 'Find Instagram creators in India by niche',
    lede: 'Browse creators who chose to be listed for brand work. Handles are partly hidden, and you contact creators through TrendBag, never by phone or email.',
    image: L.PH.film.src,
    hero: hero('film', [total ? countText(total) : 'Listing opens as creators join', 'Opt-in only', 'Contact through TrendBag']),
    landing: { proof: PROOF, second: ['Browse niches', '#niches'] },
    faq: FAQ,
    faqTopic: 'the creator directory',
    crumbs: [['Home', '/'], ['Find creators', '/find-creators']],
    priority: '0.8'
  });
  index.html = (ctx) => L.shell(index, {
    ...ctx, hero: 'split', moments: ['liquid-hover'], grow: { request: 362 },
    body: [
      L.heroHtml(index, plan('film')),
      nichesSection(list, { id: 'niches', heading: 'Creators by niche', photo: 'pillar' }),
      L.sectionHtml(index, CONTACT, { comp: 'list-photo', photo: 'blazer', moment: 'liquid-hover' }),
      L.faqHtml(index, plan('film')),
      L.formHtml(index, plan('film'))
    ]
  });

  const niche = list.map((n) => {
    const l = lower(n.label);
    const photo = PHOTO[n.slug] || 'film';
    const p = page({
      path: `/find-creators/${n.slug}`,
      title: `${titleCase(n.label)} Creators in India | TrendBag`,
      description: n.count
        ? `Browse ${countText(n.count).replace(' listed', '')} in ${l} on TrendBag who opted in to brand work. See tier, niches, languages and recent posts, then contact them through TrendBag.`
        : `${n.label} creators on TrendBag who opt in to brand work are listed here, with tier, niches, languages and recent posts. Contact goes through TrendBag.`,
      h1: `${n.label} creators in India`,
      lede: n.count
        ? `${countText(n.count).replace(/^./, (c) => c.toUpperCase())} in ${l}, each one opted in to brand work. Handles are partly hidden, and contact goes through TrendBag.`
        : `Creators in this niche are joining now. Everyone listed here chose to be shown to brands, with handles partly hidden and contact through TrendBag.`,
      image: L.PH[photo].src,
      hero: hero(photo, [n.count ? countText(n.count) : 'Listing opens as creators join', 'Opt-in only', 'Contact through TrendBag']),
      landing: { proof: PROOF, second: n.count ? ['See the creators', '#creators'] : ['Join as a creator', CREATOR_SIGNUP] },
      crumbs: [['Home', '/'], ['Find creators', '/find-creators'], [n.label, `/find-creators/${n.slug}`]],
      priority: '0.6',
      noindex: !n.count, // thin until a niche has creators
      niche: n.slug
    });
    p.html = (ctx) => L.shell(p, {
      ...ctx, hero: 'split', moments: ['liquid-hover'], grow: { request: 362 },
      body: [
        L.heroHtml(p, plan(photo)),
        ...(n.creators.length ? creatorSections(n) : [emptySection(n)]),
        L.sectionHtml(p, CONTACT, { comp: 'list-photo', photo: 'blazer', moment: 'liquid-hover' }),
        nichesSection(list, { id: 'niches', heading: 'Browse other niches', skip: n.slug, photo: photo === 'pillar' ? 'polo' : 'pillar' }),
        L.formHtml(p, plan(photo))
      ]
    });
    return p;
  });
  return [index, ...niche];
}

module.exports = { load, pages, creator };

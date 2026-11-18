// The eight marketing landing pages as static tasteskill kit pages (public/assets), one per JSON page.
// Content comes from src/content/pages-*.json; this file only holds layout, the deal and UI sample rows.
const U = require('./landing-ui');
const { esc, LOGO, icon } = U;
// a drawn card for the triptych collage (assets/layout/demo.css d-card)
const dCard = (title, status, lines) => `<div class="d-card__row"><h5>${esc(title)}</h5>${status ? `<span class="d-chip">${esc(status)}</span>` : ''}</div>${lines.map((l) => `<div class="d-note__line"><i>✓</i><span>${l}</span></div>`).join('')}`;

const ARROW = '<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8"/><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5"/></svg>';
const HANDLES = ['@ritu.styles', '@kabir.fits', '@ananya.wears', '@meher.edits', '@aarav.drapes', '@ishita.ootd', '@noor.looks', '@tara.threads', '@dev.menswear', '@sana.hauls'];
const PH = {
  knit: { src: '/img/brands-800.jpg', alt: 'Folded knitwear, a shirt and trousers laid out for a shoot', w: 800, h: 597 },
  film: { src: '/img/creator-800.jpg', alt: 'A fashion creator filming a Reel by a window with a ring light', w: 800, h: 597 },
  couch: { src: '/img/shopper-800.jpg', alt: 'A woman in cream loungewear reading her phone on an armchair', w: 800, h: 597 },
  blazer: { src: '/img/hero-portrait-896.jpg', sm: ['/img/hero-portrait-460.jpg', 460], alt: 'A creator in a tailored blazer standing by a sunlit window', w: 896, h: 1200, pos: '50% 30%' },
  hill: { src: '/img/looks/1103090b.jpg', sm: ['/img/looks/1103090b-360.jpg', 360], alt: 'A creator in a floral top and jeans on a hilltop', w: 720, h: 960, pos: '50% 35%' },
  sea: { src: '/img/looks/1627aa69.jpg', sm: ['/img/looks/1627aa69-360.jpg', 360], alt: 'A creator in a white top standing in the sea', w: 720, h: 960, pos: '50% 50%' },
  kurta: { src: '/img/looks/61acb212.jpg', sm: ['/img/looks/61acb212-360.jpg', 360], alt: 'A creator in a red kurta on a lit street at night', w: 720, h: 960, pos: '50% 45%' },
  pillar: { src: '/img/looks/84847218.jpg', sm: ['/img/looks/84847218-360.jpg', 360], alt: 'A menswear creator in a white shirt leaning on a carved stone pillar', w: 720, h: 960, pos: '50% 22%' },
  polo: { src: '/img/looks/a168c231.jpg', sm: ['/img/looks/a168c231-360.jpg', 360], alt: 'A creator wearing a black polo and black trousers', w: 720, h: 960, pos: '50% 22%' },
  steps: { src: '/img/looks/b4b61dce.jpg', sm: ['/img/looks/b4b61dce-360.jpg', 360], alt: 'A creator in a blue dress sitting on steps outside a glass building', w: 720, h: 960, pos: '50% 60%' },
  rocks: { src: '/img/looks/c5c9b85b.jpg', sm: ['/img/looks/c5c9b85b-360.jpg', 360], alt: 'A creator in a tee and jeans by rocks and palm trees', w: 720, h: 960, pos: '50% 40%' },
  beach: { src: '/img/looks/df1c1997.jpg', sm: ['/img/looks/df1c1997-360.jpg', 360], alt: 'A creator in a printed dress on beach rocks at dusk', w: 720, h: 960, pos: '50% 45%' },
  temple: { src: '/img/looks/e562fd0d.jpg', sm: ['/img/looks/e562fd0d-360.jpg', 360], alt: 'A creator in a white kurta seated at a stone temple', w: 720, h: 960, pos: '50% 60%' },
  stylist: { src: '/img/minis/stylist.jpg', sm: ['/img/minis/stylist-512.jpg', 512], alt: 'Fabric lengths, a tape measure and outfit sketches on a studio table', w: 1024, h: 1024 },
  wardrobe: { src: '/img/minis/wardrobe.jpg', sm: ['/img/minis/wardrobe-512.jpg', 512], alt: 'Garments hung on a pale wall shelf', w: 1024, h: 1024 },
  planner: { src: '/img/minis/planner.jpg', sm: ['/img/minis/planner-512.jpg', 512], alt: 'A week of outfits planned on a tablet beside a sketchbook', w: 1024, h: 1024 }
};
// sizes: the width the picture is shown at; a small variant (sm) serves cards and phone thumbnails
const img = (k, sizes = '(max-width: 639px) 342px, 628px') => {
  const p = PH[k];
  const set = p.sm ? ` srcset="${p.sm[0]} ${p.sm[1]}w, ${p.src} ${p.w}w" sizes="${sizes}"` : '';
  return `<img class="frame__img" src="${p.src}"${set} alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy" style="object-position:${p.pos || '50% 50%'}" data-source="client" data-subject="${esc(p.alt)}">`;
};

// ---------------------------------------------------------------- sample UI per page
const ORDERS = (n = 6) => HANDLES.slice(0, n).map((h, i) => [`#${1042 + i * 3}`, h, ['Delivered', 'Delivered', 'Shipped', 'Packed', 'Delivered', 'Shipped'][i], ['₹0.00'][0]]);
const appWin = {
  brand: (open) => U.win({
    crumb: 'Briefs', open,
    side: [['Briefs', '4'], ['Creators', '38'], ['Orders', '9'], ['Videos', '6'], ['Leaderboard']],
    cols: ['Creator', 'Brief', 'Status', 'Age'],
    rows: [
      [HANDLES[0], 'Festive edit Reel · ethnic wear', 'Confirmed', 'done', '2h'],
      [HANDLES[1], 'Festive edit Reel · menswear', 'Applied', '', '3h'],
      [HANDLES[2], 'Linen drop · try-on', 'Video in review', 'you', '5h'],
      [HANDLES[3], 'Festive edit Reel · jewellery', 'Applied', '', '6h'],
      [HANDLES[4], 'Wedding guest looks', 'Confirmed', 'done', '1d'],
      [HANDLES[5], 'Linen drop · GRWM', 'Approved', 'done', '1d'],
      [HANDLES[6], 'Sneaker drop · unboxing', 'Applied', '', '2d'],
      [HANDLES[7], 'Wedding guest looks', 'Shipped', '', '2d'],
      [HANDLES[8], 'Festive edit Reel · menswear', 'Applied', '', '3d']
    ]
  })
};

const BRIEF_APPLICANTS = {
  title: 'Festive edit Reel', meta: '12 applied', chipText: 'Funded',
  facts: [['Fee', '₹2,500 per approved video'], ['Rights', 'Paid ads, 30 days'], ['Ships', '₹0 Shopify order', 'shopify'], ['Due', '10 days after delivery']],
  cols: [['Creator', 'minmax(0,1.6fr)'], ['Niche', 'minmax(0,1.1fr)'], ['Language', 'minmax(0,.9fr)'], ['Engagement', 'minmax(0,.8fr)'], ['Status', 'minmax(0,1fr)']],
  rows: [
    [HANDLES[0], 'Ethnic wear', 'Hindi', '5.2%', { chip: 'Confirmed', kind: 'ink' }],
    [HANDLES[3], 'Jewellery', 'English', '4.1%', { chip: 'Shortlisted' }],
    [HANDLES[1], 'Menswear', 'Hinglish', '3.8%', { chip: 'Shortlisted' }],
    [HANDLES[6], 'Modest wear', 'Hindi', '6.0%', { chip: 'Applied', kind: 'plain' }],
    [HANDLES[9], 'Budget hauls', 'Tamil', '4.6%', { chip: 'Applied', kind: 'plain' }],
    [HANDLES[7], 'Ethnic wear', 'Marathi', '3.3%', { chip: 'Applied', kind: 'plain' }],
    [HANDLES[4], 'Menswear', 'English', '2.9%', { chip: 'Applied', kind: 'plain' }],
    [HANDLES[5], 'Streetwear', 'Hinglish', '5.5%', { chip: 'Applied', kind: 'plain' }],
    [HANDLES[2], 'Western wear', 'English', '4.4%', { chip: 'Applied', kind: 'plain' }]
  ],
  accent: 0
};
const BOARD = {
  title: 'Leaderboard', meta: 'Festive edit Reel', chipText: 'Last click, 7 days',
  cols: [['Creator', 'minmax(0,1.6fr)'], ['Views', 'minmax(0,.8fr)'], ['Clicks', 'minmax(0,.7fr)'], ['Orders', 'minmax(0,.7fr)'], ['Revenue', 'minmax(0,1fr)'], ['ROAS', 'minmax(0,.6fr)']],
  rows: [
    [HANDLES[0], '48,210', '1,932', '28', '₹75,540', '30.2'],
    [HANDLES[3], '31,870', '1,104', '17', '₹41,820', '16.7'],
    [HANDLES[1], '22,450', '806', '11', '₹27,390', '11.0'],
    [HANDLES[5], '19,300', '611', '8', '₹19,760', '7.9'],
    [HANDLES[9], '12,080', '342', '4', '₹9,980', '4.0'],
    [HANDLES[7], '9,640', '215', '2', '₹4,780', '1.9'],
    [HANDLES[4], '7,110', '188', '1', '₹2,490', '1.0'],
    [HANDLES[2], '5,920', '96', '0', '₹0', '0.0'],
    [HANDLES[8], '4,370', '71', '0', '₹0', '0.0']
  ],
  accent: 0
};
const SEED_ORDERS = {
  title: 'Seeding orders', meta: 'Festive edit Reel', chipText: 'Shopify',
  cols: [['Order', 'minmax(0,.8fr)'], ['Creator', 'minmax(0,1.6fr)'], ['Items', 'minmax(0,1.4fr)'], ['Total', 'minmax(0,.7fr)'], ['Status', 'minmax(0,1fr)']],
  rows: [
    ['#1042', HANDLES[0], 'Kurta set, size M', '₹0.00', { chip: 'Delivered', kind: 'ink' }],
    ['#1045', HANDLES[3], 'Jhumka pair', '₹0.00', { chip: 'Delivered', kind: 'ink' }],
    ['#1048', HANDLES[1], 'Nehru jacket, size L', '₹0.00', { chip: 'Shipped' }],
    ['#1051', HANDLES[6], 'Anarkali, size S', '₹0.00', { chip: 'Shipped' }],
    ['#1054', HANDLES[9], 'Co-ord set, size M', '₹0.00', { chip: 'Packed', kind: 'plain' }],
    ['#1057', HANDLES[7], 'Saree with blouse', '₹0.00', { chip: 'Packed', kind: 'plain' }],
    ['#1060', HANDLES[4], 'Linen shirt, size XL', '₹0.00', { chip: 'Packed', kind: 'plain' }],
    ['#1063', HANDLES[5], 'Sneakers, UK 7', '₹0.00', { chip: 'Packed', kind: 'plain' }],
    ['#1066', HANDLES[2], 'Wrap dress, size M', '₹0.00', { chip: 'Packed', kind: 'plain' }]
  ],
  accent: 2
};
const ADS = {
  title: 'Partnership ads', meta: 'Festive edit Reel', chipText: 'Meta ad account',
  cols: [['Creator', 'minmax(0,1.6fr)'], ['Spend', 'minmax(0,.9fr)'], ['CPM', 'minmax(0,.6fr)'], ['Hook', 'minmax(0,.6fr)'], ['Hold', 'minmax(0,.6fr)'], ['ROAS', 'minmax(0,.6fr)']],
  rows: [
    [HANDLES[0], '₹18,400', '₹96', '41%', '23%', '4.8'],
    [HANDLES[3], '₹12,000', '₹104', '36%', '19%', '3.9'],
    [HANDLES[5], '₹9,500', '₹88', '33%', '21%', '3.1'],
    [HANDLES[1], '₹7,200', '₹117', '29%', '14%', '2.2'],
    [HANDLES[9], '₹5,000', '₹122', '24%', '12%', '1.6'],
    [HANDLES[7], '₹4,000', '₹131', '22%', '11%', '1.2'],
    [HANDLES[4], '₹3,000', '₹140', '19%', '9%', '0.9'],
    [HANDLES[2], '₹2,500', '₹146', '17%', '8%', '0.7'],
    [HANDLES[8], '₹2,000', '₹151', '15%', '7%', '0.5']
  ],
  accent: 0
};
const CREATOR_JOBS = {
  title: 'My jobs', meta: 'Balance ₹6,500', chipText: 'Payout from ₹100',
  cols: [['Brief', 'minmax(0,1.8fr)'], ['Fee', 'minmax(0,.9fr)'], ['Rights', 'minmax(0,1fr)'], ['Status', 'minmax(0,1fr)']],
  rows: [
    ['Linen co-ords, try-on Reel', '₹2,500', 'Brand organic', { chip: 'Approved', kind: 'ink' }],
    ['Festive edit, GRWM', '₹3,000', 'Paid ads, 30 days', { chip: 'Approved', kind: 'ink' }],
    ['Sneaker drop, unboxing', '₹1,000', 'Creator posts', { chip: 'Revision 1 of 2' }],
    ['Wedding guest looks', '₹2,000', 'Paid ads, 60 days', { chip: 'Product shipped' }],
    ['Jhumka pairing, styling', '₹1,500', 'Brand organic', { chip: 'Applied', kind: 'plain' }],
    ['Office to evening, 3 ways', '₹1,800', 'Creator posts', { chip: 'Applied', kind: 'plain' }],
    ['Monsoon edit, haul', '₹1,200', 'Brand organic', { chip: 'Applied', kind: 'plain' }],
    ['Kurta fit check', '₹900', 'Creator posts', { chip: 'Invited', kind: 'plain' }],
    ['Saree drape, tutorial', '₹2,200', 'Paid ads, 30 days', { chip: 'Invited', kind: 'plain' }]
  ],
  accent: 2
};
const AUDIT = {
  title: '@ritu.styles', meta: 'Estimated from public data', chipText: 'Mini report',
  facts: [['Engagement rate', '5.2%'], ['Niche', 'Ethnic wear'], ['Posting', '4 posts a week'], ['Followers', '18.4K']],
  cols: [['Recent post', 'minmax(0,1.8fr)'], ['Likes', 'minmax(0,.7fr)'], ['Comments', 'minmax(0,.8fr)'], ['Brands tagged', 'minmax(0,1.2fr)']],
  rows: [
    ['Diwali kurta try-on', '1,240', '86', '2 brands'],
    ['Jhumka pairing, 3 ways', '980', '54', '1 brand'],
    ['GRWM, sangeet night', '1,102', '71', '3 brands'],
    ['Haul, festive edit', '860', '49', '2 brands'],
    ['Saree drape in 60s', '1,315', '92', '1 brand'],
    ['Office to evening', '742', '38', 'None'],
    ['Navratri look 4', '1,056', '63', '2 brands'],
    ['Fit check, anarkali', '911', '47', '1 brand'],
    ['Wedding guest, day 2', '1,188', '80', '2 brands']
  ],
  accent: 0
};
const PROFILE = {
  handle: '@dev.menswear', name: 'Menswear · Bengaluru', niche: ['Menswear', 'Smart casual'], langs: ['English', 'Kannada'],
  er: '4.8%', peer: [62, 44, 'median 3.1%'], cities: [['Bengaluru', 34], ['Mumbai', 18], ['Hyderabad', 11]],
  scores: [['Organic', '82'], ['Ads', '74'], ['Reliability', '91'], ['Authenticity', 'Low risk']]
};

// one diagram-free picture per section: a frame with a photograph, or a stage with UI
const stageUI = (inner, place = 'at-rise fit', vars = '--fit-max:520px;--ax:max(32px, 50% - 260px);--ay:48px', fade = 'stage--fade-b') =>
  `<div class="stage ${fade}"><div class="${place}" style="${vars}">${inner}</div></div>`;

const PAGES = {
  '/brands': { grow: {'why-brands': 370, 'rights-and-disclosure': 110, 'request': 362}, faqPhotos: ['rocks','beach'], requestPhoto: 'couch',
    hero: 'collage', moments: ['counter-rolls', 'liquid-hover'],
    heroWin: { crumb: 'Briefs', open: 'Festive edit Reel', btn: 'Invite creators', tabs: ['Applied 12', 'Shortlisted 4', 'Confirmed 3'], rows: [[HANDLES[0], 'Ethnic wear · Hindi', '5.2%', 'Confirmed', ''], [HANDLES[3], 'Jewellery · English', '4.1%', 'Shortlisted', 'low'], [HANDLES[1], 'Menswear · Hinglish', '3.8%', 'Shortlisted', 'low'], [HANDLES[6], 'Modest wear · Hindi', '6.0%', 'Applied', 'out'], [HANDLES[9], 'Budget hauls · Tamil', '4.6%', 'Applied', 'out'], [HANDLES[7], 'Ethnic wear · Marathi', '3.3%', 'Applied', 'out']] },
    app: { list: appWin.brand('Festive edit Reel'), pane: U.table(BRIEF_APPLICANTS) },
    sec: {
      'how-it-works': { comp: 'steps', ui: U.brief({ title: 'Festive edit Reel', status: 'Funded', product: { src: '/img/looks/1627aa69-96.jpg', name: 'Linen co-ord set', meta: 'Live price ₹2,890 · 46 in stock' }, rows: [['Fee', '₹2,500 per approved video'], ['Usage', 'Paid ads, 30 days'], ['Shipping', '₹0 order from Shopify', 'shopify'], ['Deadline', '10 days after delivery'], ['Budget held', '₹30,000 for 12 videos']] }) },
      'why-brands': { comp: 'cards-photo', photos: ['kurta', { ui: U.note({ title: 'Diwali drop · Reel brief', status: 'Funded', lines: [['Product delivered <b>2 Oct</b>'], ['Video due <b>12 Oct</b>, 10 days later'], ['Drop goes live <b>20 Oct</b>']] }) }, 'knit', 'film'] },
      'rights-and-disclosure': { comp: 'list-photo', photo: 'blazer', moment: 'liquid-hover', facts: true },
      platform: { comp: 'cards-links', photo: 'steps' }
    }
  },
  '/platform/briefs': { grow: {'brief-lifecycle': 314, 'request': 362}, faqPhotos: ['film','steps'], requestPhoto: 'couch',
    hero: 'triptych', moments: ['marquee-row', 'counter-rolls'],
    app: { list: appWin.brand('Festive edit Reel'), pane: U.table(BRIEF_APPLICANTS) },
    sec: {
      'whats-in-a-brief': { comp: 'cards-ui' },
      shortlisting: { comp: 'list-photo', photo: 'pillar' },
      'brief-lifecycle': { comp: 'steps', facts: true, ui: U.note({ title: 'Festive edit Reel · @ritu.styles', status: 'Approved', accent: true, lines: [['Brief funded, <b>₹30,000</b> held'], ['Video delivered, original audio'], ['Revision <b>1 of 2</b> requested'], ['Approved, <b>₹2,500</b> released'], ['Live with the <b>Paid partnership</b> label']] }) },
      'brief-ideas': { comp: 'cards-photo', photos: ['rocks', 'beach', { ui: U.note({ title: 'Fit check · wrap dress', status: '3 sizes', lines: [['<b>@ananya.wears</b> · size S'], ['<b>@sana.hauls</b> · size M'], ['<b>@noor.looks</b> · size XL']] }) }, 'hill'], marquee: true }
    }
  },
  '/platform/product-seeding': { grow: {'request': 362}, faqPhotos: ['beach','temple'], requestPhoto: 'hill',
    hero: 'collage', moments: ['iris-opens', 'letters-assemble'],
    heroWin: { crumb: 'Orders', open: 'Seeding', btn: 'Create ₹0 order', tabs: ['Packed 4', 'Shipped 2', 'Delivered 3'], rows: [['#1042 · ' + HANDLES[0], 'Kurta set, size M', '₹0.00', 'Delivered', ''], ['#1045 · ' + HANDLES[3], 'Jhumka pair', '₹0.00', 'Delivered', ''], ['#1048 · ' + HANDLES[1], 'Nehru jacket, size L', '₹0.00', 'Shipped', 'low'], ['#1051 · ' + HANDLES[6], 'Anarkali, size S', '₹0.00', 'Shipped', 'low'], ['#1054 · ' + HANDLES[9], 'Co-ord set, size M', '₹0.00', 'Packed', 'out'], ['#1057 · ' + HANDLES[7], 'Saree with blouse', '₹0.00', 'Packed', 'out']] },
    app: { list: appWin.brand('Festive edit Reel'), pane: U.table(SEED_ORDERS) },
    sec: {
      'how-seeding-works': { comp: 'steps', ui: U.note({ title: 'Order #1048 · ₹0.00', status: 'Shipped', accent: true, lines: [['Created when you confirmed <b>@kabir.fits</b>'], ['Packed with your usual box'], ['Courier tracking back on the brief'], ['Deadline starts on delivery', 'warn']] }) },
      'why-shopify-orders': { comp: 'cards-photo', photos: ['knit', { ui: U.note({ title: 'Kurta set, size M', status: '45 in stock', lines: [['Sold online · <b>−1</b>'], ['Seeded to <b>@ritu.styles</b> · <b>−1</b>'], ['Stock matches the shelf']] }) }, 'polo', 'steps'], moment: 'iris-opens' },
      'seeding-tips': { comp: 'list-photo', photo: 'kurta' }
    },
    statementAfter: 'how-seeding-works'
  },
  '/platform/attribution': { grow: {'how-attribution-works': 369, 'leaderboard': 91, 'request': 362}, faqPhotos: ['film','kurta'], requestPhoto: 'hill',
    hero: 'collage', moments: ['giant-type-pass', 'line-carries-colour'],
    heroWin: { crumb: 'Leaderboard', open: 'Festive edit Reel', btn: 'Export', tabs: ['Orders 71', 'Revenue ₹1.8L', 'ROAS 9.4'], rows: [[HANDLES[0], 'Black polo · 28 orders', '₹75,540', 'ROAS 30.2', ''], [HANDLES[3], 'Jhumka pair · 17 orders', '₹41,820', 'ROAS 16.7', ''], [HANDLES[1], 'Nehru jacket · 11 orders', '₹27,390', 'ROAS 11.0', 'low'], [HANDLES[5], 'Sneakers · 8 orders', '₹19,760', 'ROAS 7.9', 'low'], [HANDLES[9], 'Co-ord set · 4 orders', '₹9,980', 'ROAS 4.0', 'out'], [HANDLES[7], 'Saree · 2 orders', '₹4,780', 'ROAS 1.9', 'out']] },
    app: { list: appWin.brand('Festive edit Reel'), pane: U.table(BOARD) },
    sec: {
      'how-attribution-works': { comp: 'steps', ui: U.note({ title: 'Order #2231 · ₹2,698', status: 'Credited', accent: true, lines: [['Tapped <b>@ritu.styles</b>’ link, 3 days ago'], ['Checkout on your Shopify store'], ['Web Pixel cookie on your domain'], ['Credit to the last click within <b>7 days</b>']] }) },
      leaderboard: { comp: 'cards-ui' },
      'privacy-and-accuracy': { comp: 'list-photo', photo: 'couch', moment: 'line-carries-colour' }
    },
    statementAfter: 'leaderboard', statementPhoto: 'polo'
  },
  '/creators': { grow: {'how-it-works': 241, 'faq': 379, 'request': 56}, faqPhotos: ['polo','steps'], requestPhoto: 'couch',
    hero: 'triptych', moments: ['pinned-chapters', 'liquid-type'],
    app: { list: U.win({ crumb: 'Jobs', open: 'Open briefs', side: [['Briefs', '24'], ['Applied', '4'], ['Jobs', '3'], ['Payouts'], ['Profile']], cols: ['Brand brief', 'Fee', 'Status', 'Due'], rows: [['Linen co-ords', 'Try-on Reel · ₹2,500', 'Approved', 'done', 'Paid'], ['Festive edit', 'GRWM · ₹3,000', 'Approved', 'done', 'Paid'], ['Sneaker drop', 'Unboxing · ₹1,000', 'Revision', 'you', '2d'], ['Wedding guest', 'Styling · ₹2,000', 'Shipped', '', '9d'], ['Jhumka pairing', 'Styling · ₹1,500', 'Applied', '', '12d'], ['Office to evening', '3 ways · ₹1,800', 'Applied', '', '14d'], ['Monsoon edit', 'Haul · ₹1,200', 'Open', '', '15d'], ['Kurta fit check', 'Fit check · ₹900', 'Invited', '', '16d'], ['Saree drape', 'Tutorial · ₹2,200', 'Invited', '', '18d']], words: ['Open', 'Applied', 'Approved'] }), pane: U.table(CREATOR_JOBS) },
    sec: {
      'how-it-works': { comp: 'steps', ui: U.note({ title: 'Linen co-ords, try-on Reel', status: 'Approved', accent: true, lines: [['Applied with <b>2 sample videos</b>'], ['Product delivered, 10 days to shoot'], ['Submitted, 1 revision'], ['<b>₹2,500</b> added to your balance']] }) },
      'why-trendbag': { comp: 'cards-photo', photos: ['rocks', { ui: U.note({ title: 'Linen co-ords brief', status: 'Funded', accent: true, lines: [['<b>₹30,000</b> held for 12 videos'], ['Your fee <b>₹2,500</b> on approval']] }) }, { ui: U.note({ title: 'Video submitted', status: '72 h', lines: [['Brand review window open'], ['Auto-approves when it closes']] }) }, 'temple', 'pillar'] },
      'ground-rules': { comp: 'list-photo', photo: 'blazer' },
      minis: { comp: 'chapters', photos: ['stylist', 'wardrobe', 'planner'], moment: 'pinned-chapters' }
    },
    statementAfter: 'why-trendbag'
  },
  '/platform/creator-intelligence': { grow: {'faq': 329, 'request': 362}, faqPhotos: ['film','sea'], requestPhoto: 'beach',
    hero: 'centred', moments: ['word-highlight', 'liquid-type'],
    app: { list: appWin.brand('Recommended'), pane: U.table({ title: 'Recommended creators', meta: 'Festive edit Reel', chipText: 'Filters 3', cols: [['Creator', 'minmax(0,1.6fr)'], ['Niche', 'minmax(0,1fr)'], ['Top city', 'minmax(0,1fr)'], ['Engagement', 'minmax(0,.8fr)'], ['Reliability', 'minmax(0,.8fr)']], rows: [[HANDLES[8], 'Menswear', 'Bengaluru', '4.8%', '91'], [HANDLES[0], 'Ethnic wear', 'Jaipur', '5.2%', '88'], [HANDLES[5], 'Streetwear', 'Mumbai', '5.5%', '84'], [HANDLES[3], 'Jewellery', 'Delhi', '4.1%', '86'], [HANDLES[9], 'Budget hauls', 'Chennai', '4.6%', '79'], [HANDLES[6], 'Modest wear', 'Hyderabad', '6.0%', '82'], [HANDLES[1], 'Menswear', 'Pune', '3.8%', '77'], [HANDLES[7], 'Ethnic wear', 'Nagpur', '3.3%', '80'], [HANDLES[2], 'Western wear', 'Kolkata', '4.4%', '75']], accent: 0 }) },
    sec: {
      'what-we-measure': { comp: 'cards-photo', photos: ['pillar', 'kurta', { ui: U.note({ title: 'Engagement · @dev.menswear', status: '4.8%', lines: [['Creators of the same size: <b>3.1%</b>'], ['Saves and shares shown beside likes']] }) }, { ui: U.note({ title: 'Audience', status: 'Top 3 cities', lines: [['Bengaluru <b>34%</b>'], ['Mumbai <b>18%</b>'], ['Hyderabad <b>11%</b>']] }) }, 'temple', { ui: U.note({ title: 'Authenticity', status: 'Low risk', accent: true, lines: [['Checks summarised as a risk level'], ['Refreshed with the profile']] }) }] },
      'four-scores': { comp: 'cards-ui' },
      'how-it-works': { comp: 'steps', ui: U.profile(PROFILE) },
      'beyond-followers': { comp: 'list-photo', photo: 'steps' }
    },
    statementAfter: 'four-scores', liquidAfter: 'how-it-works'
  },
  '/platform/partnership-ads': { grow: {'faq': 379, 'request': 362}, faqPhotos: ['rocks','beach'], requestPhoto: 'hill',
    hero: 'split', moments: ['marquee-row', 'liquid-hover'],
    app: { list: appWin.brand('Festive edit Reel'), pane: U.table(ADS) },
    sec: {
      'publishing-options': { comp: 'cards-photo', photos: ['film', 'couch', 'polo'], marquee: true },
      'how-it-works': { comp: 'steps', ui: U.rules({ title: 'Ad access · @ritu.styles', count: '1 of 1 granted', items: [['Partnership ad access', 'Granted in the TrendBag app', true], ['Paid usage', '30 days, from the brief', true], ['Paid partnership label', 'Applied on every ad', true], ['Ad account', 'Your own Meta ad account', true]] }) },
      metrics: { comp: 'cards-ui' },
      'rights-and-disclosure': { comp: 'list-photo', photo: 'temple', moment: 'liquid-hover' }
    }
  },
  '/creator-audit': { grow: {'how-it-works': 361, 'whats-in-the-report': 103, 'faq': 354, 'request': 362}, faqPhotos: ['sea','temple'], requestPhoto: 'couch',
    hero: 'split', moments: ['counter-rolls', 'line-carries-colour'],
    app: { list: U.win({ crumb: 'Audit', open: 'Recent', side: [['Recent', '9'], ['Saved', '4'], ['Shortlist'], ['Briefs']], cols: ['Handle', 'Niche', 'Status', 'When'], rows: [[HANDLES[0], 'Ethnic wear · 5.2%', 'Ready', 'done', '2m'], [HANDLES[8], 'Menswear · 4.8%', 'Ready', 'done', '9m'], [HANDLES[5], 'Streetwear · 5.5%', 'Ready', 'done', '1h'], [HANDLES[3], 'Jewellery · 4.1%', 'Ready', 'done', '2h'], [HANDLES[9], 'Budget hauls · 4.6%', 'Ready', 'done', '3h'], [HANDLES[6], 'Modest wear · 6.0%', 'Ready', 'done', '1d'], [HANDLES[1], 'Menswear · 3.8%', 'Ready', 'done', '1d'], [HANDLES[7], 'Ethnic wear · 3.3%', 'Ready', 'done', '2d'], [HANDLES[2], 'Western wear · 4.4%', 'Ready', 'done', '2d']], words: ['Reading', 'Reading', 'Ready'] }), pane: U.table(AUDIT) },
    sec: {
      'how-it-works': { comp: 'steps', facts: true, ui: U.note({ title: 'Audit · @ritu.styles', status: 'Ready', accent: true, lines: [['Read <b>12</b> recent public posts'], ['Engagement rate <b>5.2%</b>, estimated'], ['Niche: ethnic wear'], ['<b>2 brands</b> tagged this month']] }) },
      'whats-in-the-report': { comp: 'cards-ui' },
      limits: { comp: 'list-photo', photo: 'beach', moment: 'line-carries-colour' },
      'full-profile': { comp: 'cards-photo', photos: ['pillar', 'hill', 'polo'] }
    }
  }
};

// ---------------------------------------------------------------- page parts
const faqHref = (p) => (p.faq && p.faq.length ? '#faq' : '/find-creators#faq');
function navHtml(p, byPath) {
  const card = (path, ph) => `<a class="menu-card span-4" href="${path}"><div class="panel">${img(ph, '410px')}</div><span class="t-card">${esc(byPath[path].kicker)}</span><span class="t-small muted">${esc(byPath[path].description.split(': ')[0].split('. ')[0].slice(0, 52))}</span></a>`;
  const word = (href, label) => `<div class="nav__item"><a class="nav__link" href="${href}"${href === p.path ? ' aria-current="page"' : ''}>${label}</a></div>`;
  return `<header class="nav"><div class="wrap nav__bar">
    <a class="skip-link" href="#top">Skip to content</a>
    <a class="nav__logo" href="/">${LOGO(24)}TrendBag</a>
    <nav class="nav__links" aria-label="Main">
      <div class="nav__item"><a class="nav__link" href="#platform-menu">Platform <svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <div class="nav__menu" id="platform-menu"><div class="wrap grid">${card('/platform/briefs', 'blazer')}${card('/platform/attribution', 'polo')}${card('/platform/creator-intelligence', 'pillar')}</div></div>
      </div>
      ${word('/brands', 'Brands')}${word('/creators', 'Creators')}${word('/creator-audit', 'Audit')}${word(faqHref(p), 'Questions')}
    </nav>
    <div class="nav__actions">${cta(p, '')}</div>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
  </div></header>`;
}

const ctaHref = (p) => (p.cta.href === '#contact' ? '#request' : p.cta.href);
function cta(p, extra = ' btn--primary', arrow = false) {
  return `<a class="btn btn--primary${extra}" href="${esc(ctaHref(p))}">${esc(p.cta.label)}${arrow ? ARROW : ''}</a>`;
}

function dWin(w) {
  return `<div class="ly-piece ly-piece--main d-win" aria-hidden="true">
    <div class="d-win__bar"><span class="d-win__dots"><i></i><i></i><i></i></span><span>TrendBag · ${esc(w.crumb)}</span></div>
    <div class="d-win__body">
      <div class="d-side"><span class="is-on"><i></i>${esc(w.crumb)}</span><span><i></i>Briefs</span><span><i></i>Creators</span><span><i></i>Orders</span><span><i></i>Videos</span><span class="d-side__label">Briefs</span><span><i></i>Festive edit</span><span><i></i>Linen drop</span></div>
      <div class="d-main">
        <div class="d-main__head"><h4>${esc(w.open)}</h4><span class="d-btn">${esc(w.btn)}</span></div>
        <div class="d-tabs">${w.tabs.map((t, i) => `<span${i ? '' : ' class="is-on"'}>${esc(t)}</span>`).join('')}</div>
        <div class="d-rows">${w.rows.map((r, i) => `<div class="d-row"><span class="d-thumb" style="background:${['#f3d7e4', '#e4e1da', '#dfe7ef', '#efe3d2', '#e6dff0', '#dfeee5'][i % 6]}"></span><div><b>${esc(r[0])}</b><small>${esc(r[1])}</small></div><span class="num">${esc(r[2])}</span><span class="d-chip${r[4] ? ' d-chip--' + r[4] : ''}">${esc(r[3])}</span></div>`).join('')}</div>
      </div>
    </div>
  </div>`;
}

function pinsCard(p, title, status) {
  const pins = p.hero.pins || [];
  return `<div class="ly-piece ly-piece--note d-card" aria-hidden="true" data-ly-steps="700">
    <div class="d-card__row"><h5>${esc(title)}</h5><span class="d-chip" data-step data-step-at="${pins.length + 1}">${esc(status)}</span></div>
    ${pins.map((x) => `<div class="d-note__line" data-step><i>✓</i><span>${esc(x.text)}</span></div>`).join('')}
  </div>`;
}

function heroHtml(p, plan) {
  const L = p.landing;
  const lead = `<p class="hero__lead">${esc(p.lede)}</p>`;
  const proof = `<p class="hero__proof">${esc(L.proof)}</p>`;
  const [secondLabel, secondHref] = L.second || ['See the product', '#app'];
  const second = `<a class="btn btn--secondary" href="${esc(secondHref)}">${esc(secondLabel)}</a>`;
  if (plan.hero === 'collage') {
    const w = plan.heroWin;
    return `<section class="hero hero--collage" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="hero__text span-5">
        <h1 id="hero-h">${esc(p.h1)}</h1>${lead}
        <div class="btn-row">${cta(p, '', true)}${second}</div>${proof}
      </div>
      <div class="hero__art span-6 start-7" role="img" aria-label="${esc(`TrendBag showing ${w.open}: ${w.tabs.join(', ')}`)}">${dWin(w)}${pinsCard(p, w.open, w.rows[0][3])}</div>
    </div></div>
  </section>`;
  }
  if (plan.hero === 'triptych') {
    const pins = p.hero.pins;
    const isCreator = p.persona === 'creator';
    const sets = isCreator
      ? [
          [`<div class="ly-piece" style="left:38%;top:30%;width:58%;height:66%"><img src="${p.hero.src}" alt="" style="object-position:${p.hero.pos}"></div>`, `<div class="ly-piece d-card" style="left:4%;top:6%;width:52%">${dCard(pins[0].text.replace('New brief: ', 'Brief: '), 'New', ['Fee <b>₹2,500</b> per video', 'Try-on Reel, brand organic use', 'Product shipped to you'])}</div>`],
          [`<div class="ly-piece" style="left:4%;top:6%;width:54%;height:78%"><img src="${PH.hill.sm[0]}" alt="" style="object-position:${PH.hill.pos}"></div>`, `<div class="ly-piece d-card" style="left:48%;top:26%;width:48%">${dCard('Linen co-ords Reel', pins[1].text, ['Submitted with original audio', 'Revision <b>1 of 2</b> done', 'Approved by the brand'])}</div>`],
          [`<div class="ly-piece" style="left:44%;top:8%;width:52%;height:58%"><img src="${PH.beach.sm[0]}" alt="" style="object-position:${PH.beach.pos}"></div>`, `<div class="ly-piece d-card" style="left:4%;top:38%;width:50%">${dCard('Balance ₹6,500', pins[2].text, ['<b>₹2,500</b> from Linen co-ords', '<b>₹3,000</b> from Festive edit', 'Withdrawn to your bank account'])}</div>`]
        ]
      : [
          [`<div class="ly-piece" style="left:40%;top:30%;width:56%;height:66%"><img src="${p.hero.src}" alt="" style="object-position:${p.hero.pos}"></div>`, `<div class="ly-piece d-card" style="left:4%;top:6%;width:54%">${dCard('Brief · wool blazer', 'Funded', [esc(pins[0].text), esc(pins[1].text), esc(pins[2].text), 'Fee <b>₹2,500</b> per approved video'])}</div>`],
          [`<div class="ly-piece" style="left:4%;top:6%;width:52%;height:80%"><img src="${PH.kurta.sm[0]}" alt="" style="object-position:${PH.kurta.pos}"></div>`, `<div class="ly-piece d-card" style="left:46%;top:22%;width:50%">${dCard('Applications', '12 applied', ['<b>@ritu.styles</b> · ethnic wear, 5.2%', '<b>@meher.edits</b> · jewellery, 4.1%', '<b>@kabir.fits</b> · menswear, 3.8%'])}</div>`],
          [`<div class="ly-piece" style="left:46%;top:10%;width:50%;height:60%"><img src="${PH.temple.sm[0]}" alt="" style="object-position:${PH.temple.pos}"></div>`, `<div class="ly-piece d-card" style="left:4%;top:40%;width:52%">${dCard('Video review', 'Approved', ['Revision <b>1 of 2</b> requested', 'Delivered again in 2 days', '<b>₹2,500</b> released to the creator'])}</div>`]
        ];
    return `<section class="hero hero--triptych" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="span-3"><h1 id="hero-h">${esc(p.h1)}</h1><p class="hero__lead">${esc(p.lede)}</p><p class="hero__proof">${esc(L.proof)}</p></div>
      <div class="ly-collage span-6 start-4" role="img" aria-label="${esc(isCreator ? 'A brief on TrendBag, a Reel approved and a payout to the creator' : 'A TrendBag brief for a wool blazer, the creators who applied and an approved video')}">
        ${sets.map((s, i) => `<div class="ly-collage__set${i ? '' : ' is-on'}"${i ? ' aria-hidden="true"' : ''}>${s.join('')}</div>`).join('')}
      </div>
      <div class="span-3 start-10 hero__cta">${cta(p, '', true)}</div>
    </div></div>
  </section>`;
  }
  if (plan.hero === 'centred') {
    return `<section class="hero hero--centred" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text">
      <div class="hero__c">
        <a class="pill" href="#how-it-works"><span>Early access</span><span class="muted">${esc(L.proof)}</span></a>
        <h1 id="hero-h">${esc(p.h1)}</h1>${lead}
        <div class="btn-row">${cta(p, '', true)}${second}</div>
      </div>
      <div class="hero__window" data-fx="painterly-landscape" data-fx-seed="7" role="img" aria-label="A TrendBag creator profile with niche, engagement against peers, audience cities and four scores">
        <div class="ly-piece d-win tb-centred" aria-hidden="true">
          <div class="d-win__bar"><span class="d-win__dots"><i></i><i></i><i></i></span><span>TrendBag · Creators</span><span class="sp"></span><span>${p.hero.pins.map((x) => esc(x.text)).join(' · ')}</span></div>
          <div class="tb-centred__body">${U.table({ title: '@dev.menswear and creators of the same size', chipText: 'Low risk', cols: [['Creator', 'minmax(0,1.5fr)'], ['Niche', 'minmax(0,1fr)'], ['Engagement', 'minmax(0,.8fr)'], ['Top city', 'minmax(0,.9fr)'], ['Reliability', 'minmax(0,.7fr)']], rows: [[HANDLES[8], 'Menswear', '4.8%', 'Bengaluru', '91'], [HANDLES[1], 'Menswear', '3.8%', 'Pune', '77'], [HANDLES[4], 'Menswear', '2.9%', 'Mumbai', '80'], [HANDLES[5], 'Streetwear', '5.5%', 'Mumbai', '84'], [HANDLES[0], 'Ethnic wear', '5.2%', 'Jaipur', '88']], accent: 0 })}</div>
        </div>
      </div>
    </div></div>
  </section>`;
  }
  // split: the page's own photograph with one float card of the result
  const pins = p.hero.pins;
  return `<section class="hero hero--split" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="hero__text span-5">
        <h1 id="hero-h">${esc(p.h1)}</h1>${lead}
        <div class="btn-row">${cta(p, '', true)}${second}</div>${proof}
      </div>
      <div class="hero__media span-6 start-7">
        <img src="${p.hero.src}" alt="${esc(p.hero.alt)}" style="--ly-pos: ${p.hero.pos}" fetchpriority="high" data-source="client" data-subject="${esc(p.hero.alt)}">
        <div class="ly-float"><div class="ly-float__row"><span class="ly-live">${esc(pins[1].text)}</span><span>${esc(pins[2].text)}</span></div><div class="ly-float__title">${esc(pins[0].text)}</div></div>
      </div>
    </div></div>
  </section>`;
}

function appSection(p, plan) {
  const A = p.landing.app;
  return `<section class="section" id="app" aria-labelledby="app-h"><div class="wrap">
    <div class="grid tb-head"><h2 class="span-5" id="app-h">${esc(A.heading)}</h2><p class="span-6 start-7 t-lead">${esc(A.intro)}</p></div>
    <div class="ui app fill" role="img" aria-label="${esc(A.heading)}" data-ui-pause-host>
      <div class="app__pane app__pane--list">${plan.app.list}</div>
      <div class="app__pane app__pane--open">${plan.app.pane}</div>
    </div>
  </div></section>`;
}

const head2 = (s, cls = 'section-head') => `<div class="${cls}"><h2 id="${s.id}-h">${esc(s.heading)}</h2>${s.intro ? `<p>${esc(s.intro)}</p>` : ''}</div>`;
const factsRow = (p) => `<div class="grid tb-facts-row" data-moment="counter-rolls">${p.landing.facts.map((f) => `<div class="span-4"><p class="t-stat">${esc(f.n)}</p><p class="t-small muted">${esc(f.label)}</p></div>`).join('')}</div>`;
const marquee = (p) => `<div class="tb-marquee" data-moment="marquee-row" data-moment-opts='{"speed": 32}'><ul class="mo-mq__track" data-edge-free>${p.landing.marquee.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></div>`;

const GLYPH = {
  // lucide line glyphs, inline in the text colour
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  rupee: '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3c6.67 0 6.67-10 0-10"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M16 4a4 4 0 0 1 0 8M22 21c0-3-1.8-5.6-4.5-6.6"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>'
};
const glyph = (k) => `<svg class="tb-glyph" viewBox="0 0 24 24" aria-hidden="true">${GLYPH[k]}</svg>`;
const CARD_GLYPHS = ['rupee', 'shield', 'calendar', 'box', 'chart', 'users', 'eye', 'link', 'tag', 'clock', 'play', 'star'];

// a small mock per card of a "cards-ui" group: one figure or row that shows the card's point
function miniUI(p, s, it, i) {
  const t = it.title;
  const rows = HANDLES.slice(i, i + 3);
  const lines = {
    'Real products': [['Kurta set · ₹2,890 · 46 in stock', ''], ['Sneakers · ₹3,499 · 12 in stock', ''], ['Synced from Shopify', '']],
    'A ₹ fee per approved video': [['Fee per approved video', '₹2,500'], ['Videos', '12'], ['Held for this brief', '₹30,000']],
    'Usage rights': [['Creator posts only', ''], ['Brand organic use', ''], ['Paid ads, 30 days', '●']],
    Deadline: [['Delivered', 'Day 0'], ['Video due', 'Day 10'], ['Review window', '72 hours']],
    'Optional product shipping': [['Ship product', 'On'], ['₹0 order in Shopify', '#1048'], ['Courier', 'Tracking on']]
  }[t];
  if (lines) return U.note({ title: t, lines: lines.map((l) => [`${esc(l[0])}${l[1] ? ` <b>${esc(l[1])}</b>` : ''}`]) });
  // the two wide cards of the ad metrics: one column of the ADS table, creator by creator
  const col = { 'Hold rate': ['Hold', 4], 'CPA and ROAS': ['ROAS', 5] }[t];
  if (col) return U.table({ title: t, meta: 'Festive edit Reel', cols: [['Creator', 'minmax(0,1.6fr)'], ['Spend', 'minmax(0,.8fr)'], [col[0], 'minmax(0,.6fr)']], rows: ADS.rows.map((r) => [r[0], r[1], r[col[1]]]), accent: 0 });
  const figs = {
    'Views and CPM': ['48,210 views', 'CPM ₹52'], 'Link clicks': ['1,932 clicks', '4.0% of views'], 'Orders and revenue': ['28 orders', '₹75,540 net of refunds'], 'ROAS per creator': ['ROAS 30.2', '₹75,540 on a ₹2,500 fee'],
    'Organic score': ['82', 'Organic'], 'Ads score': ['74', 'Ads'], 'Reliability score': ['91', 'Reliability'], 'Authenticity score': ['Low risk', 'Authenticity'],
    'Estimated engagement rate': ['5.2%', 'Estimated from public data'], Niche: ['Ethnic wear', 'From 12 recent posts'], 'Posting rhythm': ['4 posts a week', 'Steady for 8 weeks'], 'Brands tagged': ['2 brands', 'In the last 12 posts'],
    'Spend and CPM': ['₹18,400', 'CPM ₹96'], CTR: ['1.9%', 'Clicked through'], 'Hook rate': ['41%', '3-second views ÷ impressions'], 'Hold rate': ['23%', 'Watched past the hook'], 'CPA and ROAS': ['ROAS 4.8', 'CPA ₹312']
  }[t];
  if (figs) return `<div class="ui ui-panel tb-fig"><span class="ui-meta">${esc(figs[1])}</span><b>${esc(figs[0])}</b><div class="tb-fig__bars" aria-hidden="true">${[38, 52, 46, 61, 58, 74, 69, 88].map((h, j) => `<i style="height:${h}%"${j === 7 ? ' class="is-on"' : ''}></i>`).join('')}</div></div>`;
  return U.note({ title: t, lines: rows.map((h) => [`<b>${esc(h)}</b>`]) });
}

function sectionHtml(p, s, cfg, ctx) {
  const id = s.id;
  const items = s.items;
  const mom = cfg.moment ? ` data-moment="${cfg.moment}"${cfg.moment === 'iris-opens' || cfg.moment === 'line-carries-colour' ? ` data-moment-opts='{"from": "base"}'` : ''}` : '';
  const ground = cfg.moment === 'iris-opens' || cfg.moment === 'line-carries-colour' ? ' ground-inverse' : '';
  const extra = (cfg.facts ? factsRow(p) : '') + (cfg.marquee ? marquee(p) : '');
  const h = cfg.h || 1;
  const open = (cls = '') => `<section class="section${ground}${cls}" id="${id}" aria-labelledby="${id}-h"${h > 1 ? ` style="--h: ${h}"` : ''}${cfg.moment && !ground && cfg.moment !== 'liquid-hover' ? mom : ground ? mom : ''}>`;
  if (cfg.comp === 'steps') {
    return `${open()}<div class="wrap">
      ${head2(s, 'section-head tb-wide')}
      <div class="grid fill tb-split">
        <ol class="tb-steps span-6" data-n="${items.length}">${items.map((it, i) => `<li><h3><span class="tb-n">${String(i + 1).padStart(2, '0')}</span>${esc(it.title)}</h3><p>${esc(it.body)}</p></li>`).join('')}</ol>
        <div class="frame frame--split frame--fill span-6 start-7" role="img" aria-label="${esc(s.heading)}">${stageUI(cfg.ui)}</div>
      </div>${extra}
    </div></section>`;
  }
  if (cfg.comp === 'list-photo') {
    const ph = PH[cfg.photo];
    const pic = cfg.moment === 'liquid-hover'
      ? `<figure class="frame frame--photo frame--fill span-6 start-7" data-moment="liquid-hover" data-moment-opts='{"strength": 0.6}'><img src="${ph.src}" loading="lazy" alt="${esc(ph.alt)}" width="${ph.w}" height="${ph.h}" style="object-position:${ph.pos || '50% 50%'}" data-source="client" data-subject="${esc(ph.alt)}"></figure>`
      : `<div class="frame frame--photo frame--fill span-6 start-7">${img(cfg.photo)}</div>`;
    return `${open()}<div class="wrap">
      <div class="grid fill tb-split">
        <div class="span-6 tb-col">${head2(s)}<ul class="rows tb-rows">${items.map((it) => `<li><span class="rows__name">${esc(it.title)}</span><p>${esc(it.body)}</p></li>`).join('')}</ul></div>
        ${pic}
      </div>${extra}
    </div></section>`;
  }
  if (cfg.comp === 'cards-photo') {
    const n = items.length;
    const span = n === 3 ? 4 : n === 4 ? 3 : n === 6 ? 4 : n === 5 ? 'b' : 4;
    const cards = items.map((it, i) => {
      const sp = span === 'b' ? (i < 2 ? 'span-6' : 'span-4') : `span-${span}`;
      const v = cfg.photos[i];
      const panel = typeof v === 'string' ? img(v, n === 4 ? '(max-width: 639px) 112px, (max-width: 1023px) 100vw, 302px' : sp === 'span-6' ? '(max-width: 639px) 342px, 628px' : '(max-width: 639px) 342px, 410px') : stageUI(v.ui, 'at-rise fit', '--fit-max:320px;--ax:max(20px, 50% - 160px);--ay:28px');
      return `<article class="card card--open card--row ${sp} m-nolift"><h3>${esc(it.title)}</h3><p>${esc(it.body)}</p><div class="panel">${panel}</div></article>`;
    });
    if (n > 4) {
      const cut = n === 5 ? 2 : 3;
      return `<section class="section g2${ground}" id="${id}" aria-labelledby="${id}-h"${ground ? mom : ''}><div class="wrap">
        <div class="group">${head2(s)}<div class="grid tb-cards tb-cards--many">${cards.slice(0, cut).join('')}</div></div>
        <div class="group"><div class="grid tb-cards tb-cards--many">${cards.slice(cut).join('')}</div>${extra}</div>
      </div></section>`;
    }
    return `${open()}<div class="wrap">${head2(s)}<div class="grid fill tb-cards${n === 4 ? ' tb-cards--four' : ' tb-cards--many'}">${cards.join('')}</div>${extra}</div></section>`;
  }
  if (cfg.comp === 'cards-ui') {
    const n = items.length;
    const sp = n === 3 ? 4 : n === 4 ? 3 : n === 5 ? 'f' : n === 6 ? 4 : 4;
    const cards = items.map((it, i) => {
      const wide = ['Hold rate', 'CPA and ROAS'].includes(it.title);
      const place = wide ? ['at-rise fit to-edge', '--fit-max:520px;--ax:max(24px, 50% - 260px);--ay:28px'] : i % 2 ? ['at-corner', '--ax:24px;--ay:28px'] : ['at-rise fit', '--fit-max:300px;--ax:max(20px, 50% - 150px);--ay:28px'];
      return `<article class="card card--row ${sp === 'f' ? (i < 3 ? 'span-4' : 'span-6') : 'span-' + sp} m-nolift"><h3>${esc(it.title)}</h3><p>${esc(it.body)}</p><div class="panel panel--flush">${stageUI(miniUI(p, s, it, i), place[0], place[1])}</div></article>`;
    });
    if (n > 4) {
      return `<section class="section g2${ground}" id="${id}" aria-labelledby="${id}-h"${ground ? mom : ''}><div class="wrap">
        <div class="group">${head2(s)}<div class="grid tb-cards">${cards.slice(0, 3).join('')}</div></div>
        <div class="group"><div class="grid tb-cards">${cards.slice(3).join('')}</div>${extra}</div>
      </div></section>`;
    }
    return `${open()}<div class="wrap">${head2(s)}<div class="grid fill tb-cards">${cards.join('')}</div>${extra}</div></section>`;
  }
  if (cfg.comp === 'cards-links') {
    // the platform overview: each card links to its own page
    const links = { Briefs: '/platform/briefs', 'Product seeding': '/platform/product-seeding', 'Sales attribution': '/platform/attribution', 'Creator intelligence': '/platform/creator-intelligence', 'Partnership ads': '/platform/partnership-ads', 'Creator directory': '/find-creators' };
    const icons = ['rupee', 'box', 'chart', 'users', 'play', 'eye'];
    return `${open()}<div class="wrap"><div class="grid fill tb-split">
      <div class="span-6 tb-col">${head2(s)}<ul class="tb-linkrows">${items.map((it, i) => `<li><a href="${links[it.title]}">${glyph(icons[i])}<span><span class="tb-linkrows__t">${esc(it.title)}</span><span class="tb-linkrows__b">${esc(it.body)}</span></span></a></li>`).join('')}</ul></div>
      <div class="frame frame--photo frame--portrait frame--fill span-6 start-7">${img(cfg.photo)}</div>
    </div>${extra}</div></section>`;
  }
  if (cfg.comp === 'chapters') {
    return `<section class="section" id="${id}" style="--h: 2" data-moment="pinned-chapters" aria-labelledby="${id}-h">
      <div class="wrap mo-pc__grid">
        <div class="mo-pc__text"><h2 id="${id}-h">${esc(s.heading)}</h2>${s.intro ? `<p>${esc(s.intro)}</p>` : ''}
          <ol class="mo-pc__steps">${items.map((it, i) => { const ph = PH[cfg.photos[i]]; return `<li class="mo-pc__step"><h3>${esc(it.title)}</h3><p>${esc(it.body)}</p><figure class="mo-pc__visual"><img src="${ph.src}" srcset="${ph.sm[0]} ${ph.sm[1]}w, ${ph.src} ${ph.w}w" sizes="(max-width: 639px) 342px, 628px" loading="lazy" alt="${esc(ph.alt)}" width="${ph.w}" height="${ph.h}" data-source="client" data-subject="${esc(ph.alt)}"></figure></li>`; }).join('')}</ol>
        </div>
        <div class="mo-pc__visuals frame"></div>
      </div>
    </section>`;
  }
  throw new Error('no composition for ' + p.path + ' ' + id);
}

function statementHtml(p, plan, kind) {
  const L = p.landing;
  if (kind === 'letters-assemble') return `<section class="section statement tb-statement" id="statement" data-moment="letters-assemble" aria-labelledby="statement-h"><div class="wrap"><h2 class="mo-la__type" id="statement-h">${esc(L.statement.heading)}</h2><p class="mo-la__sub t-lead">${esc(L.statement.line)}</p></div></section>`;
  if (kind === 'giant-type-pass') return `<section class="section statement tb-statement" id="statement" data-moment="giant-type-pass" data-moment-opts='${JSON.stringify({ image: PH[plan.statementPhoto].src, travel: 60, focusY: 40 })}' aria-labelledby="statement-h"><div class="wrap"><h2 class="mo-gt__type" id="statement-h">${esc(L.statement.heading)}</h2><div class="mo-gt__row"><p class="t-lead">${esc(L.statement.line)}</p><a class="link" href="#how-attribution-works">Read how credit works</a></div></div></section>`;
  if (kind === 'word-highlight') {
    const t = esc(L.statement.text).replace(esc(L.statement.strong), `<strong>${esc(L.statement.strong)}</strong>`);
    return `<section class="section statement tb-statement" id="statement" data-moment="word-highlight" aria-label="Engagement in context"><div class="wrap"><p class="mo-wh__text">${t}</p></div></section>`;
  }
  if (kind === 'liquid-type') {
    const st = L.statement && L.statement.heading ? L.statement : { heading: 'Creator follower count alone misleads', line: 'Profiles compare each creator with peers of the same size, audience cities and sponsored-post engagement.' };
    return `<section class="section statement tb-statement" id="statement-2" aria-labelledby="statement-2-h"><div class="wrap" data-moment="liquid-type" data-moment-opts='{"strength": 0.8}'><h2 class="mo-lt__type" id="statement-2-h">${esc(st.heading)}</h2><p class="t-lead">${esc(st.line)}</p></div></section>`;
  }
  return '';
}

// two FAQ sections (h2 and a photograph beside three answers), so each fits two phone screens
function faqHtml(p, plan) {
  const half = Math.ceil(p.faq.length / 2);
  const topic = esc(p.faqTopic || p.kicker.toLowerCase().replace(/^for /, 'TrendBag for '));
  return [p.faq.slice(0, half), p.faq.slice(half)].map((list, k) => {
    const id = k ? 'faq-2' : 'faq';
    return `<section class="section" id="${id}" aria-labelledby="${id}-h"><div class="wrap">
    <div class="grid fill tb-split">
      <div class="span-5 tb-col"><div class="section-head"><h2 id="${id}-h">${k ? 'More questions' : 'Questions'} about ${topic}</h2></div><div class="frame frame--photo frame--square tb-faq__photo">${img(plan.faqPhotos[k])}</div></div>
      <div class="faq span-6 start-7">${list.map((f) => `<div class="faq__item"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('')}</div>
    </div>
  </div></section>`;
  }).join('\n');
}

// phone tuning measured at 390: a section between 1.5 and 1.9 phone screens grows its picture (--grow) to
// end near two screens, so no tile shows the next section's top
function phoneGrow(html, grow = {}) {
  for (const [id, px] of Object.entries(grow)) {
    const re = new RegExp(`(<section [^>]*id="${id}"[^>]*?)( style="([^"]*)")?>`);
    if (!re.test(html)) throw new Error('grow: no section #' + id);
    html = html.replace(re, (m, open, st, css) => `${open} style="${css ? css + '; ' : ''}--grow: ${px}px">`);
  }
  return html;
}

// the lead form: the same POST as src/views/Contact/Contact.js, run by /lp/landing.js
const ROLES = [['shopper', 'Shopper'], ['creator', 'Creator'], ['brand', 'Brand'], ['other', 'Something else']];
const QUESTIONS = {
  brand: [{ id: 'platform', label: 'Your store runs on', options: ['Shopify', 'WooCommerce', 'Magento', 'Wix', 'Other'] }],
  creator: [
    { id: 'niche', label: 'You mostly post about', options: ['Fashion', 'Beauty', 'Lifestyle', 'Fitness', 'Travel', 'Food', 'Other'] },
    { id: 'followers', label: 'Instagram followers', options: ['Under 1K', '1K–10K', '10K–50K', '50K–100K', '100K+'] },
    { id: 'source', label: 'Where did you hear about us', options: ['Instagram', 'A friend or creator', 'Google', 'College', 'LinkedIn', 'Other'] }
  ]
};
const EXTRA = { brand: { id: 'store', label: 'Store website', inputmode: 'url' }, creator: { id: 'handle', label: 'Instagram handle' } };
function formHtml(p, plan) {
  const role = p.persona;
  const isBrandCta = ctaHref(p) === '#request';
  const button = isBrandCta ? p.cta.label : 'Send your details';
  const chips = (name, legend, opts, checked) => `<fieldset class="field field--full tb-chips" data-q="${name}"><legend>${esc(legend)}</legend><div>${opts.map(([v, l], i) => `<label><input type="radio" name="${name}" value="${esc(v)}" required${v === checked ? ' checked' : ''}${i === 0 ? ` aria-describedby="f-${name}-err"` : ''}>${esc(l)}</label>`).join('')}</div><p class="field__error" id="f-${name}-err" hidden>Pick one answer for “${esc(legend)}”.</p></fieldset>`;
  const qs = Object.entries(QUESTIONS).map(([r, list]) => `<div class="tb-q" data-role="${r}"${r === role ? '' : ' hidden'}>${list.map((q) => chips(q.id, q.label, q.options.map((o) => [o, o]))).join('')}</div>`).join('');
  const ex = Object.entries(EXTRA).map(([r, e]) => `<div class="field field--full tb-q" data-role="${r}"${r === role ? '' : ' hidden'}><label for="f-${e.id}">${esc(e.label)} <span class="muted">(optional)</span></label><input id="f-${e.id}" name="${e.id}" type="text"${e.inputmode ? ` inputmode="${e.inputmode}"` : ''} autocomplete="off"></div>`).join('');
  return `<section class="section" id="request" aria-labelledby="request-h"><div class="wrap">
    <div class="grid tb-split tb-request">
      <div class="span-5 tb-col">
        <div class="section-head"><h2 id="request-h">${esc(isBrandCta ? p.cta.label + ' to TrendBag' : 'Talk to the TrendBag team')}</h2><p>${esc(p.persona === 'creator' ? 'Questions before you join, or a brand you want to bring along? Leave your details and we will write back.' : 'Tell us about your store and we will get in touch about onboarding as features open up.')}</p></div>
        <p class="t-small muted">We usually reply within two working days. Or write to <a class="link" href="mailto:team@trendbag.in">team@trendbag.in</a>.</p>
        <div class="frame frame--photo tb-request__photo">${img(plan.requestPhoto, '519px')}</div>
      </div>
      <form class="form tb-form span-6 start-7" action="mailto:team@trendbag.in" method="post" enctype="text/plain" data-lead-form data-sent="${esc(isBrandCta ? 'Your early access request is in. We reply within two working days.' : 'Your details are in. We reply within two working days.')}" novalidate>
        ${chips('role', "I'm a", ROLES, role)}
        <div class="field"><label for="f-name">Full name</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-err"><p class="field__error" id="f-name-err" hidden>Write your name.</p></div>
        <div class="field"><label for="f-email">Email address</label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="f-email-err"><p class="field__error" id="f-email-err" hidden>Write an email address with an @, like name@yourbrand.com.</p></div>
        ${ex}${qs}
        <div class="btn-row"><button class="btn btn--primary" type="submit">${esc(button)}</button></div>
        <p class="form__status" role="status" data-form-status></p>
      </form>
    </div>
  </div></section>`;
}

function footerHtml(p, byPath) {
  const col = (h, links) => `<div class="span-2 footer__col"><h3>${h}</h3><ul>${links.map(([l, href]) => `<li><a href="${href}">${esc(l)}</a></li>`).join('')}</ul></div>`;
  const closeH = { '/creators': 'Start your first paid brief' }[p.path] || (ctaHref(p) === '#request' ? 'Bring your brand onto TrendBag' : 'Join TrendBag as a creator');
  return `<footer class="footer closing" id="contact" aria-labelledby="close-h"><div class="wrap">
    <div class="closing__cta close--word">
      <div class="section-head--split"><div><h2 id="close-h">${esc(closeH)}</h2><p class="t-lead">${esc(p.persona === 'creator' ? 'Free to join, no follower minimum.' : 'Early access for fashion brands selling on Shopify in India.')}</p></div>${cta(p, '', true)}</div>
      <p class="close__word" aria-hidden="true">TrendBag</p>
    </div>
    <div class="closing__links">
      <div class="grid">
        <div class="span-4 stack-4"><a class="nav__logo" href="/">${LOGO(24)}TrendBag</a><p class="footer__lede">Creator videos for Indian fashion brands.</p><p class="t-small muted">Product names and logos are trademarks of their owners.</p></div>
        ${col('Platform', [['Briefs', '/platform/briefs'], ['Product seeding', '/platform/product-seeding'], ['Attribution', '/platform/attribution'], ['Creator intelligence', '/platform/creator-intelligence'], ['Partnership ads', '/platform/partnership-ads']])}
        ${col('Brands', [['For brands', '/brands'], ['Find creators', '/find-creators'], ['Creator audit', '/creator-audit']])}
        ${col('Creators', [['For creators', '/creators'], ['Open the app', 'https://app.trendbag.in']])}
        ${col('Company', [['About', '/#about-us'], ['Questions', faqHref(p)], ['team@trendbag.in', 'mailto:team@trendbag.in']])}
      </div>
      <div class="footer__legal">
        <span>&copy; ${new Date().getFullYear()} TrendBag</span><span class="tb-legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></span>
        <div class="socials">${[['Instagram', 'https://instagram.com/trendbag.in', 'si-instagram'], ['X', 'https://x.com/trendbag_in', 'x'], ['LinkedIn', 'https://linkedin.com/company/trendbag', 'linkedin'], ['YouTube', 'https://youtube.com/@trendbag', 'youtube']].map(([n, u, k]) => `<a href="${u}" aria-label="TrendBag on ${n}"><span class="icon-mono" style="-webkit-mask-image:url(/assets/icons/${k}.svg);mask-image:url(/assets/icons/${k}.svg)"></span></a>`).join('')}</div>
      </div>
    </div>
  </div></footer>`;
}

function calculatorHtml() {
  // the engagement-rate calculator from src/pages/Marketing/ErCalculator.js, run by /lp/landing.js
  const f = [['followers', 'Followers'], ['likes', 'Average likes per post'], ['comments', 'Average comments per post']];
  return `<section class="section" id="calculator" aria-labelledby="calculator-h"><div class="wrap">
    <div class="grid fill tb-split">
      <div class="span-6 tb-col">
        <div class="section-head"><h2 id="calculator-h">Engagement rate calculator</h2><p>Enter numbers from a creator's last 10–12 posts. The handle-based audit is in early access.</p></div>
        <div class="form tb-calc" data-er-calc>
          ${f.map(([id, l]) => `<div class="field field--full"><label for="er-${id}">${l}</label><input id="er-${id}" name="${id}" type="number" min="0" inputmode="numeric" autocomplete="off"></div>`).join('')}
          <p class="tb-calc__out t-lead" aria-live="polite" data-er-out>Engagement rate: enter a follower count</p>
          <p class="t-small">Formula: (average likes + average comments) ÷ followers × 100. Compare with creators of a similar size and niche.</p>
        </div>
      </div>
      <div class="frame frame--split frame--fill span-6 start-7" role="img" aria-label="A TrendBag mini report with estimated engagement, niche, posting rhythm and brands tagged">${stageUI(U.table({ ...AUDIT, rows: AUDIT.rows.slice(0, 6) }), 'at-corner', '--ax:40px;--ay:48px', 'stage--fade-br')}</div>
    </div>
  </div></section>`;
}

function render(p, { headTags, byPath }) {
  const plan = PAGES[p.path];
  if (!plan) throw new Error('no landing plan for ' + p.path);
  const body = [];
  body.push(heroHtml(p, plan));
  if (p.tool === 'er-calculator') body.push(calculatorHtml());
  body.push(appSection(p, plan));
  for (const s of p.sections) {
    body.push(sectionHtml(p, s, plan.sec[s.id], plan));
    if (plan.statementAfter === s.id) body.push(statementHtml(p, plan, plan.moments.find((m) => ['letters-assemble', 'giant-type-pass', 'word-highlight', 'liquid-type'].includes(m))));
    if (plan.liquidAfter === s.id) body.push(statementHtml(p, plan, 'liquid-type'));
  }
  body.push(faqHtml(p, plan));
  body.push(formHtml(p, plan));
  return shell(p, { headTags, byPath, body, moments: plan.moments, grow: plan.grow, hero: plan.hero });
}

// the document around a page's sections: head, kit CSS, nav, footer, scripts
function shell(p, { headTags, byPath, body, moments, grow = {}, hero }) {
  const kitCss = ['system.css', 'ui/cards.css', 'motion/motion.css', 'backgrounds/backgrounds.css', 'layout/layout.css', 'icons/icon.css', 'ui/base.css', 'ui/window/fragment.css', 'layout/demo.css'];
  return phoneGrow(`<!doctype html>
<html lang="en-IN" data-api="${esc(process.env.REACT_APP_API_BASE || 'https://api.trendbag.in')}" data-type="software" data-radius="soft" data-ground="sky" data-buttons="pill" data-motion>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${headTags}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#f7f7f5">
<meta name="site-kind" content="software">
<meta name="page-type" content="software">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400..700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
${kitCss.map((c) => `<link rel="stylesheet" href="/assets/${c}">`).join('\n')}
<style>
:root {
  --p-bg: #f7f7f5; --p-surface: #ebebe8; --p-ink: #0a0a0a; --p-muted: #686868;
  --p-accent: #d0106f; --p-accent-ink: #f7f7f5; --p-action: #d0106f; --p-action-ink: #f7f7f5;
  --p-inv-bg: #0a0a0a; --p-inv-surface: #171717; --p-inv-ink: #f7f7f5; --p-inv-muted: #929291;
  --p-inv-accent: #d0106f; --p-inv-accent-ink: #f7f7f5; --p-inv-action: #d0106f; --p-inv-action-ink: #f7f7f5;
  --font-display: "Familjen Grotesk", system-ui, sans-serif;
  --font-text: "Familjen Grotesk", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 400;
  --display-tracking: -0.03em;
  --display-tracking-xl: -0.04em;
}
</style>
<link rel="stylesheet" href="/lp/landing.css">
<script>document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)</script>
<script src="/assets/backgrounds/backgrounds.js"></script>
<script>document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)</script>
<link rel="modulepreload" href="/assets/moments/moments.js"><link rel="modulepreload" href="/assets/moments/lib.js">${moments.map((m) => `<link rel="modulepreload" href="/assets/moments/${m}/moment.js">`).join('')}
</head>
<body>
<!-- type: software (site-kind software): TrendBag sells creator-marketing software to Indian fashion brands on Shopify, and paid UGC work to creators
     deal: hero ${hero}, nav nav-cards, close close-word, footer footer-columns, rhythm space, buttons pill, mark: the client's logo, ground sky, palette brand (#F7F7F5 / #EBEBE8 / #0A0A0A / #D0106F), type familjen
     moments: ${moments.join(', ')} -->
${navHtml(p, byPath)}
<main id="top">
${body.join('\n')}
</main>
${footerHtml(p, byPath)}
<script type="module" src="/assets/system.js"></script>
<script type="module" src="/assets/motion/motion.js"></script>
<script type="module" src="/assets/layout/layout.js"></script>
<script type="module" src="/lp/landing.js"></script>
</body>
</html>
`, grow);
}

module.exports = { render, shell, PAGES, PH, img, heroHtml, sectionHtml, faqHtml, formHtml };

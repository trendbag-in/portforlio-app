#!/usr/bin/env node
// Post-build: one static HTML file per route with its own title, description, canonical,
// Open Graph/Twitter tags and JSON-LD, plus the page's text inside #root so crawlers that
// don't run JS still read it (React replaces it on load). Also writes sitemap.xml + robots.txt.
//
// Files are written as build/<path>.html (not <path>/index.html) so the Cloudflare assets
// Worker serves /brands directly instead of redirecting to /brands/.
const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://www.trendbag.in';
const BUILD = path.join(__dirname, '..', 'build');
const CONTENT = path.join(__dirname, '..', 'src', 'content');
const read = (f) => JSON.parse(fs.readFileSync(path.join(CONTENT, f), 'utf8'));

const siteMeta = read('site-meta.json');
const pages = [...read('pages-a.json'), ...read('pages-b.json')];
const byPath = Object.fromEntries([...siteMeta, ...pages].map((p) => [p.path, p]));

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (p) => ORIGIN + (p === '/' ? '/' : p);
const ldJson = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TrendBag',
  legalName: 'Holygrims Private Limited',
  url: ORIGIN,
  logo: `${ORIGIN}/logo512.png`,
  email: 'team@trendbag.in',
  sameAs: [
    'https://instagram.com/trendbag.in',
    'https://instagram.com/trendbag.creators',
    'https://x.com/trendbag_in',
    'https://linkedin.com/company/trendbag',
    'https://youtube.com/@trendbag'
  ]
};

function schemaFor(p) {
  if (p.path === '/') {
    return [ORG, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'TrendBag', url: ORIGIN }];
  }
  const out = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: p.title,
      description: p.description,
      url: url(p.path),
      inLanguage: 'en-IN',
      isPartOf: { '@type': 'WebSite', name: 'TrendBag', url: ORIGIN },
      publisher: { '@type': 'Organization', name: 'TrendBag', url: ORIGIN }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' },
        { '@type': 'ListItem', position: 2, name: p.kicker || p.title.split(' | ')[0], item: url(p.path) }
      ]
    }
  ];
  if (p.faq && p.faq.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    });
  }
  return out;
}

function headFor(p) {
  const image = ORIGIN + (p.image || (p.persona === 'creator' ? '/img/creator-800.jpg' : p.persona ? '/img/brands-800.jpg' : '/logo1200.png'));
  const large = !image.endsWith('logo1200.png');
  return [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}">`,
    `<link rel="canonical" href="${url(p.path)}">`,
    `<meta name="robots" content="index,follow,max-image-preview:large">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="TrendBag">`,
    `<meta property="og:locale" content="en_IN">`,
    `<meta property="og:url" content="${url(p.path)}">`,
    `<meta property="og:title" content="${esc(p.title)}">`,
    `<meta property="og:description" content="${esc(p.description)}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:alt" content="${esc(p.h1 || p.title)}">`,
    `<meta name="twitter:card" content="${large ? 'summary_large_image' : 'summary'}">`,
    `<meta name="twitter:site" content="@trendbag_in">`,
    `<meta name="twitter:title" content="${esc(p.title)}">`,
    `<meta name="twitter:description" content="${esc(p.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    ...schemaFor(p).map(ldJson)
  ].join('');
}

// Plain semantic HTML of the page for non-JS crawlers; React replaces it on mount.
function bodyFor(p) {
  if (!p.sections) return '';
  const items = (s) =>
    s.items.map((it) => `<li><h3>${esc(it.title)}</h3><p>${esc(it.body)}</p></li>`).join('');
  const related = (p.related || [])
    .filter((r) => byPath[r])
    .map((r) => `<li><a href="${r}">${esc(byPath[r].h1 || byPath[r].title)}</a></li>`)
    .join('');
  return [
    '<main class="seo-static">',
    `<nav><a href="/">TrendBag</a> / <a href="/brands">For brands</a> / <a href="/creators">For creators</a></nav>`,
    `<p>${esc(p.kicker)}</p><h1>${esc(p.h1)}</h1><p>${esc(p.lede)}</p>`,
    `<p><a href="${esc(p.cta.href)}">${esc(p.cta.label)}</a></p>`,
    p.hero ? `<img src="${esc(p.hero.src)}" alt="${esc(p.hero.alt)}" width="800" height="597">` : '',
    ...p.sections.map(
      (s) => `<section id="${esc(s.id)}"><h2>${esc(s.heading)}</h2>${s.intro ? `<p>${esc(s.intro)}</p>` : ''}<ul>${items(s)}</ul></section>`
    ),
    `<section><h2>Frequently asked questions</h2>${p.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>`,
    related ? `<section><h2>Keep reading</h2><ul>${related}</ul></section>` : '',
    '</main>'
  ].join('');
}

// Drop the template's own SEO tags so each page gets exactly one set.
const STRIP = [
  /<title>[\s\S]*?<\/title>/gi,
  /<meta\s+name="(description|keywords|author|robots)"[^>]*>/gi,
  /<meta\s+property="og:[^"]*"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>/gi,
  /<link\s+rel="canonical"[^>]*>/gi,
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/gi
];

const templatePath = path.join(BUILD, 'index.html');
let template = fs.readFileSync(templatePath, 'utf8');
for (const re of STRIP) template = template.replace(re, '');
if (!template.includes('<div id="root"></div>')) throw new Error('template has no empty #root');

const problems = [];
for (const p of [...siteMeta, ...pages]) {
  if (p.title.length > 65) problems.push(`${p.path}: title ${p.title.length} chars`);
  if (p.description.length < 70 || p.description.length > 170) problems.push(`${p.path}: description ${p.description.length} chars`);
  const html = template
    .replace('</head>', headFor(p) + '</head>')
    .replace('<div id="root"></div>', `<div id="root">${bodyFor(p)}</div>`);
  const out = p.path === '/' ? templatePath : path.join(BUILD, p.path.slice(1) + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

const today = new Date().toISOString().slice(0, 10);
const all = [...siteMeta, ...pages];
const prio = (p) => (p.path === '/' ? '1.0' : p.sections ? (p.path.split('/').length === 2 ? '0.9' : '0.8') : '0.3');
fs.writeFileSync(
  path.join(BUILD, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all
    .map((p) => `  <url><loc>${url(p.path)}</loc><lastmod>${today}</lastmod><priority>${prio(p)}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(BUILD, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

console.log(`seo-build: ${all.length} routes, sitemap.xml, robots.txt`);
if (problems.length) {
  console.error('seo-build: length problems:\n  ' + problems.join('\n  '));
  process.exit(1);
}

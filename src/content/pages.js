import a from './pages-a.json';
import b from './pages-b.json';
import siteMeta from './site-meta.json';

// Marketing pages are data: one JSON object per route, rendered by MarketingPage and
// pre-rendered for crawlers by scripts/seo-build.js.
export const PAGES = [...a, ...b];

// path -> { title, description } for every route, used to retitle the tab on client navigation.
export const META = Object.fromEntries([...siteMeta, ...PAGES].map((p) => [p.path, p]));

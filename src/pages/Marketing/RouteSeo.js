import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { META } from '../../content/pages';

const ORIGIN = 'https://www.trendbag.in';

const setTag = (selector, attr, value, create) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

// Keeps title, description, canonical and OG tags in step with client-side navigation.
// The first load already has them baked in by scripts/seo-build.js.
const RouteSeo = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = META[pathname];
    if (!m) return;
    const url = ORIGIN + (pathname === '/' ? '/' : pathname);
    document.title = m.title;
    const meta = (key, kind = 'name') => () => {
      const el = document.createElement('meta');
      el.setAttribute(kind, key);
      return el;
    };
    setTag('meta[name="description"]', 'content', m.description, meta('description'));
    setTag('meta[property="og:title"]', 'content', m.title, meta('og:title', 'property'));
    setTag('meta[property="og:description"]', 'content', m.description, meta('og:description', 'property'));
    setTag('meta[property="og:url"]', 'content', url, meta('og:url', 'property'));
    setTag('link[rel="canonical"]', 'href', url, () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    });
  }, [pathname]);
  return null;
};

export default RouteSeo;

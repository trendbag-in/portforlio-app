import React, { useEffect, useState } from 'react';
import './LegalToc.css';

const SCROLL_OFFSET = 100; // clears the fixed navbar

// "3. How You Are Paid" -> "how-you-are-paid", so the hash survives renumbering.
const slugify = (label) =>
  label
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const scrollToId = (id, smooth) => {
  const el = document.getElementById(id);
  if (!el) return false;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET,
    behavior: smooth ? 'smooth' : 'auto',
  });
  return true;
};

/* Builds the contents rail from the headings already on the page, so all seven
   legal documents get one without editing each of their section lists. Each
   heading also gets a slug id and a "#" anchor so any section can be linked to
   directly. */
const LegalToc = () => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.privacy-body h2'));
    const seen = new Map();
    const cleanups = [];

    const next = headings.map((h, i) => {
      // The rail supplies its own mono numeral, so drop any "1." the document
      // numbers itself with — from the heading too, or it reads twice. Cached on
      // the node so a re-run doesn't read back the injected "#".
      const label = h.dataset.tocLabel || h.textContent.replace(/^\s*\d+[.)]\s*/, '').trim();
      h.dataset.tocLabel = label;

      const base = slugify(label) || `section-${i + 1}`;
      const dupes = seen.get(base) || 0;
      seen.set(base, dupes + 1);
      const id = dupes ? `${base}-${dupes + 1}` : base;
      h.id = id;

      // Rewriting the text drops any anchor from a previous run, so this stays
      // idempotent under StrictMode's double-invoked effects.
      h.textContent = label;
      const anchor = document.createElement('a');
      anchor.className = 'legal-anchor';
      anchor.href = `#${id}`;
      anchor.textContent = '#';
      anchor.setAttribute('aria-label', `Link to this section: ${label}`);
      const onAnchorClick = (e) => {
        e.preventDefault();
        scrollToId(id, true);
        window.history.replaceState(null, '', `#${id}`);
      };
      anchor.addEventListener('click', onAnchorClick);
      h.appendChild(anchor);
      cleanups.push(() => {
        anchor.removeEventListener('click', onAnchorClick);
        anchor.remove();
      });

      return { id, label, n: String(i + 1).padStart(2, '0') };
    });

    setItems(next);
    if (next.length) setActiveId(next[0].id);

    // Land on the right section when the page is opened on a hash — the ids only
    // exist now, so the browser's own jump has already failed by this point.
    const target = decodeURIComponent(window.location.hash.slice(1));
    if (target && scrollToId(target, false)) setActiveId(target);

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    if (!items.length) return undefined;

    const onScroll = () => {
      let current = items[0].id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  const goTo = (e, id) => {
    e.preventDefault();
    if (scrollToId(id, true)) window.history.replaceState(null, '', `#${id}`);
  };

  if (!items.length) return null;

  return (
    <aside className="legal-toc" aria-label="On this page">
      <p className="tb-overline legal-toc-title">On this page</p>
      <nav>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => goTo(e, item.id)}
            className={`legal-toc-link ${activeId === item.id ? 'is-active' : ''}`}
          >
            <span className="tb-num legal-toc-num">{item.n}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default LegalToc;

import React, { useEffect, useState } from 'react';
import './LegalToc.css';

/* Builds the contents rail from the headings already on the page, so all six
   legal documents get one without editing each of their section lists. */
const LegalToc = () => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.privacy-body h2'));
    const next = headings.map((h, i) => {
      if (!h.id) h.id = `section-${i + 1}`;
      // The rail supplies its own mono numeral, so drop any "1." the document
      // numbers itself with — from the heading too, or it reads twice.
      const label = h.textContent.replace(/^\s*\d+[.)]\s*/, '').trim();
      if (label !== h.textContent.trim()) h.textContent = label;
      return { id: h.id, label, n: String(i + 1).padStart(2, '0') };
    });
    setItems(next);
    if (next.length) setActiveId(next[0].id);
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
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
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

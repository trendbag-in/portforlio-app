// Product UI drawn as live HTML for the landing pages: sample rows only, never claimed as results.
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// TrendBag's own mark (src/components/Logo/Logo.js), the real logo in its own colours.
const LOGO = (size = 24, label = '') =>
  `<svg viewBox="0 0 64 64" width="${size}" height="${size}" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"'} focusable="false"><rect width="64" height="64" rx="14" fill="#5A31F4"/><g fill="#FFFFFF"><path d="M21 28 A11 11 0 0 1 43 28" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/><path d="M12 28 L52 28 L47.5 51 Q47 54.5 42.5 54.5 L21.5 54.5 Q17 54.5 16.5 51 Z"/></g><g fill="#5A31F4"><rect x="12" y="30.8" width="40" height="3.4" rx="1.7"/><circle cx="26" cy="41" r="2.6"/><circle cx="38" cy="41" r="2.6"/></g><path d="M26 46.5 Q32 51.5 38 46.5" fill="none" stroke="#5A31F4" stroke-width="3" stroke-linecap="round"/></svg>`;

const icon = (id, size = 16) =>
  `<img class="tb-ic" data-icon="${id}" src="/assets/icons/${id}.svg" alt="" width="${size}" height="${size}">`;

const initials = (h) => h.replace('@', '').split(/[._]/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
const av = (h, tone) => `<span class="ui-avatar" data-tone="${tone}">${initials(h)}</span>`;
const chip = (t, kind = '') => `<span class="tb-chip${kind ? ' tb-chip--' + kind : ''}">${esc(t)}</span>`;

// the kit's window fragment (assets/ui/window), rewritten to a TrendBag list; held still
function win({ crumb, open, side, cols, rows, words = ['Applied', 'Reviewing', 'Confirmed'] }) {
  const glyph = '<svg class="ui-icon" viewBox="0 0 16 16"><path d="M2.5 9h3l1 1.5h3l1-1.5h3"/><path d="M2.5 9 4 3.5h8L13.5 9v3.5h-11z"/></svg>';
  return `<div class="ui ui-panel ui-win" data-ui="window" data-ui-still data-open="${words[0]}" data-work="${words[1]}" data-done="${words[2]}">
  <div class="ui-win__bar"><span class="ui-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="ui-win__crumb">${LOGO(16)}${esc(crumb)} <i>/</i> <b>${esc(open)}</b></span><span class="ui-spacer"></span><span class="ui-win__search" aria-hidden="true"><svg class="ui-icon" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/></svg><span class="ui-win__ph">Search</span><span class="ui-kbd">/</span></span></div>
  <div class="ui-win__body">
    <nav class="ui-win__side" aria-hidden="true">${side.map((s, i) => `<span class="ui-win__nav${i === 0 ? ' is-on' : ''}">${glyph}${esc(s[0])}${s[1] ? `<em>${esc(s[1])}</em>` : ''}</span>`).join('')}</nav>
    <div class="ui-win__main">
      <div class="ui-win__cols" aria-hidden="true">${cols.map((c) => `<span>${esc(c)}</span>`).join('')}</div>
      <ul class="ui-win__rows">${rows.map((r, i) => `<li class="ui-win__row" data-row>${av(r[0], (i % 5) + 1)}<span class="ui-win__who">${esc(r[0])}</span><span class="ui-win__sub">${esc(r[1])}</span><span class="ui-win__st${r[3] === 'done' ? ' is-done' : r[3] === 'you' ? ' is-you' : ''}" data-st>${esc(r[2])}</span><span class="ui-win__age">${esc(r[4] || '')}</span></li>`).join('')}</ul>
    </div>
  </div>
</div>`;
}

// a plain table panel: head, optional facts, then rows; one accent row at most
function table({ title, meta, chipText, facts, cols, rows, accent = -1, foot }) {
  return `<div class="ui ui-panel tb-pane">
  <div class="ui-head"><span class="ui-title">${esc(title)}</span>${meta ? `<span class="ui-meta">${esc(meta)}</span>` : ''}<span class="ui-spacer"></span>${chipText ? chip(chipText, 'ink') : ''}</div>
  ${facts ? `<dl class="tb-facts">${facts.map((f) => `<div><dt>${esc(f[0])}</dt><dd>${f[2] ? icon(f[2], 14) : ''}${esc(f[1])}</dd></div>`).join('')}</dl>` : ''}
  <div class="tb-table" style="--cols:${cols.map((c) => c[1] || 'auto').join(' ')}">
    <div class="tb-tr tb-th">${cols.map((c) => `<span>${esc(c[0])}</span>`).join('')}</div>
    ${rows.map((r, i) => `<div class="tb-tr${i === accent ? ' is-on' : ''}">${r.map((c, j) => `<span${j ? '' : ' class="tb-who"'}>${j === 0 && String(c).startsWith('@') ? av(c, (i % 5) + 1) : ''}${typeof c === 'object' ? chip(c.chip, c.kind) : esc(c)}</span>`).join('')}</div>`).join('')}
  </div>
  ${foot ? `<div class="tb-foot">${foot}</div>` : ''}
</div>`;
}

// a small card: a title row and a few lines, the result of one step
function note({ title, status, lines, accent }) {
  return `<div class="ui ui-panel tb-note"><div class="tb-note__head"><span class="ui-title">${esc(title)}</span>${status ? chip(status, accent ? 'accent' : 'ink') : ''}</div>${lines.map((l) => `<div class="tb-note__line"><i aria-hidden="true">${l[1] === 'warn' ? '!' : '✓'}</i><span>${l[0]}</span></div>`).join('')}</div>`;
}

// a creator profile card
function profile({ handle, name, niche, langs, er, peer, cities, scores }) {
  return `<div class="ui ui-panel tb-profile">
  <div class="tb-profile__head">${av(handle, 2)}<div><span class="ui-title">${esc(handle)}</span><span class="ui-meta">${esc(name)}</span></div><span class="ui-spacer"></span>${icon('instagram', 16)}</div>
  <div class="tb-profile__chips">${niche.map((n) => chip(n)).join('')}${langs.map((n) => chip(n, 'plain')).join('')}</div>
  <div class="tb-bar"><div class="tb-bar__row"><span>Engagement</span><b>${esc(er)}</b></div><div class="tb-bar__track"><i style="width:${peer[0]}%"></i><em style="left:${peer[1]}%"></em></div><div class="tb-bar__row ui-meta"><span>Creators of the same size</span><span>${esc(peer[2])}</span></div></div>
  <div class="tb-cities">${cities.map((c) => `<div><span>${esc(c[0])}</span><span class="tb-cities__bar"><i style="width:${c[1]}%"></i></span><span>${c[1]}%</span></div>`).join('')}</div>
  <div class="tb-scores">${scores.map((s) => `<div><b>${esc(s[1])}</b><span>${esc(s[0])}</span></div>`).join('')}</div>
</div>`;
}

// the brief card: what a creator sees before applying
function brief({ title, status, product, rows }) {
  return `<div class="ui ui-panel tb-brief">
  <div class="ui-head"><span class="ui-title">${esc(title)}</span><span class="ui-spacer"></span>${chip(status, 'accent')}</div>
  ${product ? `<div class="tb-brief__product"><img src="${product.src}" width="44" height="44" alt="" style="object-position:${product.pos || '50% 50%'}"><div><b>${esc(product.name)}</b><span class="ui-meta">${esc(product.meta)}</span></div></div>` : ''}
  <dl class="tb-brief__rows">${rows.map((r) => `<div><dt>${esc(r[0])}</dt><dd>${r[2] ? icon(r[2], 14) : ''}${esc(r[1])}</dd></div>`).join('')}</dl>
</div>`;
}

// a toggles-like list of rules
function rules({ title, count, items }) {
  return `<div class="ui ui-panel tb-rules"><div class="ui-head"><span class="ui-title">${esc(title)}</span><span class="ui-spacer"></span><span class="ui-meta">${esc(count)}</span></div>${items.map((it) => `<div class="tb-rule${it[2] ? ' is-on' : ''}"><div><b>${esc(it[0])}</b><span class="ui-meta">${esc(it[1])}</span></div><span class="tb-switch" aria-hidden="true"></span></div>`).join('')}</div>`;
}

// a phone screen for the creator app
function phone(inner) {
  return `<div class="tb-phone">${inner}</div>`;
}

module.exports = { esc, LOGO, icon, win, table, note, profile, brief, rules, phone, chip, av };

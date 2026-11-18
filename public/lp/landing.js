// Landing pages: the lead form (same POST as src/views/Contact/Contact.js) and the engagement-rate calculator.
const API_BASE = document.documentElement.dataset.api || 'https://api.trendbag.in';

// Mirrors Contact.js: tap-to-answer questions per role, one optional text field, all composed into `message`.
const QUESTIONS = {
  brand: [{ id: 'platform', label: 'Your store runs on' }],
  creator: [
    { id: 'niche', label: 'You mostly post about' },
    { id: 'followers', label: 'Instagram followers' },
    { id: 'source', label: 'Where did you hear about us' }
  ]
};
const EXTRA = { brand: { id: 'store', label: 'Store website' }, creator: { id: 'handle', label: 'Instagram handle' } };
const ROLE_LABEL = { shopper: 'Shopper', creator: 'Creator', brand: 'Brand', other: 'Something else' };

export function composeMessage(role, values) {
  const lines = [
    ...(QUESTIONS[role] || []).map((q) => `${q.label}: ${values[q.id]}`),
    EXTRA[role] && values[EXTRA[role].id] && `${EXTRA[role].label}: ${values[EXTRA[role].id]}`
  ].filter(Boolean);
  return lines.length ? lines.join('\n') : `Contact request (${ROLE_LABEL[role] || 'Other'})`;
}

function leadForm(form) {
  const status = form.querySelector('[data-form-status]');
  const say = (t) => { if (status) status.textContent = t; };
  const role = () => (form.querySelector('input[name="role"]:checked') || {}).value || 'other';
  // only the picked role's questions are live; hidden ones are disabled so they never block a send
  const sync = () => {
    for (const block of form.querySelectorAll('.tb-q')) {
      const on = block.dataset.role === role();
      block.hidden = !on;
      for (const el of block.querySelectorAll('input')) el.disabled = !on;
    }
  };
  form.addEventListener('change', (e) => { if (e.target.name === 'role') sync(); });
  sync();

  form.addEventListener('submit', async (e) => {
    // system.js marks the fields to fix and stops an invalid form; only a valid one is sent here
    if (!form.checkValidity()) return;
    e.preventDefault();
    const r = role();
    const data = new FormData(form);
    const values = Object.fromEntries([...data.entries()].map(([k, v]) => [k, String(v).trim()]));
    const button = form.querySelector('[type="submit"]');
    const wait = setTimeout(() => say('Sending'), 300);
    if (button) { button.disabled = true; button.setAttribute('aria-busy', 'true'); }
    try {
      const res = await fetch(`${API_BASE}/api/user/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-APP': 'portfolio' },
        body: JSON.stringify({ name: values.name, email: values.email, message: composeMessage(r, values), role: r })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'That did not send. Please try again.');
      }
      clearTimeout(wait);
      form.reset();
      const keep = form.querySelector(`input[name="role"][value="${r}"]`);
      if (keep) keep.checked = true;
      sync();
      say(form.dataset.sent || 'Sent.');
    } catch (err) {
      clearTimeout(wait);
      say(err.message || 'That did not send. Please try again.');
    } finally {
      if (button) { button.disabled = false; button.removeAttribute('aria-busy'); }
    }
  });
}

// Public engagement rate = (avg likes + avg comments) / followers. Runs in the browser; nothing is sent.
export const engagementRate = (followers, likes, comments) =>
  followers > 0 ? ((likes + comments) / followers) * 100 : null;

function calculator(root) {
  const out = root.querySelector('[data-er-out]');
  const n = (id) => Math.max(0, Number(root.querySelector(`[name="${id}"]`).value) || 0);
  const update = () => {
    const er = engagementRate(n('followers'), n('likes'), n('comments'));
    out.textContent = er === null ? 'Engagement rate: enter a follower count' : `Engagement rate: ${er.toFixed(2)}%`;
  };
  root.addEventListener('input', update);
}

document.querySelectorAll('form[data-lead-form]').forEach(leadForm);
document.querySelectorAll('[data-er-calc]').forEach(calculator);

// Directory pages are static: drop creators who opted out since the last build.
(async () => {
  const cards = document.querySelectorAll('[data-cid]');
  const m = location.pathname.match(/^\/find-creators\/([a-z0-9_-]+)/);
  if (!cards.length || !m) return;
  try {
    const res = await fetch(`${API_BASE}/api/user/public/creators?niche=${m[1]}&limit=60&offset=0`);
    if (!res.ok) return;
    const live = new Set(((await res.json()).creators || []).map((c) => c.id));
    cards.forEach((el) => { if (!live.has(el.dataset.cid)) el.remove(); });
  } catch (e) { /* offline: keep the build's list */ }
})();

import { useSyncExternalStore } from 'react';

/* Who the visitor said they are. Shopper until they pick; ?for=creator links straight
   to one, and the last pick is remembered on this device. */
export const PERSONAS = [
  { id: 'shopper', label: 'Shopper' },
  { id: 'creator', label: 'Creator' },
  { id: 'brand', label: 'Brand' }
];

// Each persona's own sections, in page order — drives the navbar and the side dots.
export const PERSONA_NAV = {
  shopper: [
    { id: 'wardrobe', label: 'Outfits' },
    { id: 'trip', label: 'Trips' },
    { id: 'aesthetics', label: 'Aesthetics' }
  ],
  creator: [
    { id: 'create', label: 'Create' },
    { id: 'earn', label: 'Earnings' },
    { id: 'collabs', label: 'Collabs' }
  ],
  brand: [
    { id: 'connect', label: 'Connect' },
    { id: 'fulfil', label: 'Fulfilment' },
    { id: 'insights', label: 'Analytics' }
  ]
};

const KEY = 'tb-persona';
const isPersona = (v) => PERSONAS.some((p) => p.id === v);

const initial = () => {
  const q = new URLSearchParams(window.location.search).get('for');
  if (isPersona(q)) return q;
  try {
    const saved = localStorage.getItem(KEY);
    if (isPersona(saved)) return saved;
  } catch (e) { /* storage blocked — fall through */ }
  return 'shopper';
};

let current = initial();
const listeners = new Set();

export function setPersona(id) {
  if (!isPersona(id) || id === current) return;
  current = id;
  try { localStorage.setItem(KEY, id); } catch (e) { /* storage blocked */ }
  const url = new URL(window.location.href);
  url.searchParams.set('for', id);
  window.history.replaceState(window.history.state, '', url);
  listeners.forEach((f) => f());
}

const subscribe = (f) => {
  listeners.add(f);
  return () => listeners.delete(f);
};

export const usePersona = () => useSyncExternalStore(subscribe, () => current);

// The visitor's storage choice: 'all' lets the site remember preferences (theme, persona)
// on this device; 'essential' keeps only this choice itself. null = not asked yet.
const KEY = 'tb-consent';
const PREF_KEYS = ['theme', 'tb-persona'];
export const OPEN_EVENT = 'tb-consent-open';

export const getConsent = () => {
  try { return localStorage.getItem(KEY); } catch (e) { return null; }
};

export const canRemember = () => getConsent() === 'all';

export const setConsent = (value) => {
  try {
    localStorage.setItem(KEY, value);
    if (value !== 'all') PREF_KEYS.forEach((k) => localStorage.removeItem(k));
  } catch (e) { /* storage blocked: nothing is remembered anyway */ }
};

// Reopens the banner, e.g. from the footer's "Cookie settings".
export const openConsent = () => window.dispatchEvent(new Event(OPEN_EVENT));

import React from 'react';

/* 1.5px-stroke line icons on a 24px grid, in ink-secondary unless told otherwise.
   DESIGN.md rules out emoji entirely, so every glyph on the site comes from here. */
const PATHS = {
  camera: <><path d="M3 8.5A1.5 1.5 0 014.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0121 8.5v9A1.5 1.5 0 0119.5 19h-15A1.5 1.5 0 013 17.5z" /><circle cx="12" cy="12.5" r="3.5" /></>,
  mirror: <><rect x="6" y="2.5" width="12" height="15" rx="6" /><path d="M12 17.5V21M9 21h6" /></>,
  ruler: <><rect x="2.5" y="8" width="19" height="8" rx="1.5" /><path d="M7 8v3M11 8v4M15 8v3M19 8v4" /></>,
  tag: <><path d="M12.6 3H20a1 1 0 011 1v7.4a2 2 0 01-.6 1.4l-7.6 7.6a2 2 0 01-2.8 0l-6-6a2 2 0 010-2.8l7.6-7.6a2 2 0 011.4-.6z" /><circle cx="16.5" cy="7.5" r="1.2" /></>,
  hanger: <><path d="M12 7a2.5 2.5 0 112.5 2.5c0 1-2.5 1.5-2.5 3" /><path d="M12 12.5L3.5 18a1 1 0 00.6 1.8h15.8a1 1 0 00.6-1.8L12 12.5z" /></>,
  pin: <><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  sparkle: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M18 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></>,
  chart: <><path d="M4 20V4M4 20h16" /><path d="M8 16v-4M12.5 16V8M17 16v-6" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18M16.5 14.5h.01" /></>,
  handshake: <><path d="M8 12l-3-3 4.5-4.5L12 7l2.5-2.5L19 9l-3 3" /><path d="M12 7v5.5a2 2 0 002 2l3 3M8 12l4 4" /></>,
  crystal: <><path d="M12 3l7 5-7 13L5 8z" /><path d="M5 8h14M12 3v18" /></>,
  image: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8.5" cy="10" r="1.5" /><path d="M21 16l-5-5-8 8" /></>,
  plug: <><path d="M9 3v6M15 3v6" /><path d="M6 9h12v3a6 6 0 01-12 0z" /><path d="M12 18v3" /></>,
  phone: <path d="M6.5 3h3l1.5 4-2 1.5a13 13 0 006.5 6.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.2 2 2 0 016.5 3z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  bag: <><path d="M4 8h16l-1.2 12H5.2z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" /></>,
  x: <path d="M4 4l16 16M20 4L4 20" />,
  linkedin: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /><path d="M8 10.5V17M8 7.5v.01M12 17v-3.5a2 2 0 014 0V17" /></>,
  youtube: <><rect x="2.5" y="6" width="19" height="12" rx="3.5" /><path d="M10.5 9.5l4.5 2.5-4.5 2.5z" /></>
};

const Icon = ({ name, size = 24, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`tb-icon ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {PATHS[name] || null}
  </svg>
);

export default Icon;

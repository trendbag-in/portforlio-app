import React from 'react';

/* The TrendBag mark, matching brand-assets/trendbag-icon-1024.png and
   public/favicon.svg exactly — smiling basket, rim band, eyes and smile.
   #5A31F4 is the brand swatch; DESIGN.md reserves it for the mark and 10% washes. */
const Logo = ({ size = 28, tile = true }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
    {tile && <rect width="64" height="64" rx="14" fill="#5A31F4" />}
    <g fill={tile ? '#FFFFFF' : '#5A31F4'}>
      <path
        d="M21 28 A11 11 0 0 1 43 28"
        fill="none"
        stroke={tile ? '#FFFFFF' : '#5A31F4'}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M12 28 L52 28 L47.5 51 Q47 54.5 42.5 54.5 L21.5 54.5 Q17 54.5 16.5 51 Z" />
    </g>
    <g fill={tile ? '#5A31F4' : '#FFFFFF'}>
      <rect x="12" y="30.8" width="40" height="3.4" rx="1.7" />
      <circle cx="26" cy="41" r="2.6" />
      <circle cx="38" cy="41" r="2.6" />
    </g>
    <path
      d="M26 46.5 Q32 51.5 38 46.5"
      fill="none"
      stroke={tile ? '#5A31F4' : '#FFFFFF'}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default Logo;

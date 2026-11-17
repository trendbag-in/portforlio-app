import React, { useState } from 'react';

// Public engagement rate = (avg likes + avg comments) / followers. Runs in the browser; nothing is sent.
export const engagementRate = (followers, likes, comments) =>
  followers > 0 ? ((likes + comments) / followers) * 100 : null;

const FIELDS = [
  { id: 'followers', label: 'Followers' },
  { id: 'likes', label: 'Average likes per post' },
  { id: 'comments', label: 'Average comments per post' }
];

const ErCalculator = () => {
  const [v, setV] = useState({ followers: '', likes: '', comments: '' });
  const n = (k) => Math.max(0, Number(v[k]) || 0);
  const er = engagementRate(n('followers'), n('likes'), n('comments'));
  return (
    <section id="calculator" className="mk-section section-block">
      <div className="container">
        <div className="tb-card mk-calc">
          <h2>Engagement rate calculator</h2>
          <p className="section-lede">Enter numbers from a creator's last 10–12 posts. The handle-based audit is in early access.</p>
          <div className="mk-calc-fields">
            {FIELDS.map((f) => (
              <label key={f.id}>
                <span className="tb-overline">{f.label}</span>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={v[f.id]}
                  onChange={(e) => setV({ ...v, [f.id]: e.target.value })}
                />
              </label>
            ))}
          </div>
          <p className="mk-calc-out" aria-live="polite">
            {er === null ? 'Engagement rate: enter a follower count' : `Engagement rate: ${er.toFixed(2)}%`}
          </p>
          <p className="mk-calc-note">Formula: (average likes + average comments) ÷ followers × 100. Compare with creators of a similar size and niche.</p>
        </div>
      </div>
    </section>
  );
};

export default ErCalculator;

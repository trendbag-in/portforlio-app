# TrendBag marketing site — "Studio Editorial" redesign

Analysis of `clients/portfolio-app` and copy-paste prompts for Google Stitch
(`stitch.withgoogle.com`).

The target look is a hybrid, agreed 13 Aug 2026:

- **Canvas, colour and shape discipline** from `clients/mobile/DESIGN.md` ("Studio Paper") —
  warm paper, one terracotta accent, no pure white or black, pill controls, borderless cards.
- **Editorial devices** from `clients/pitch-deck/index.html` — mono kickers flanked by hairline
  rules, mono numerals, accent rules on card tops, dashed dividers, arrow bullets, pull-quote
  emphasis blocks. This is the layer that makes it artistic rather than merely tidy.

Token reference already ported to CSS in `clients/web-share/lib/theme/studioPaper.ts` +
`lib/theme/cssVars.ts` — reuse those names so all three web surfaces share one source.

---

## 1. Where the site is today

React 18 + CRA, one landing route plus 6 legal pages. Sections in order:
Hero → Features (12 cards) → DiscoveryUniverse (3 full-height sections) → AboutUs
(differentiators + tech marquee + mission/CTA) → Contact → Footer.

### Gap table

| # | Target | Site today | Severity |
|---|---|---|---|
| 1 | Accent is terracotta `#C2410C` / brand `#E55A2B` | Amber `#F59E0B` → `#FBBF24`, which is the design system's **warning** colour | Critical — wrong brand |
| 2 | No pure white, no pure black | `--bg-primary: #ffffff`, dark `#0f0f0f` | Critical |
| 3 | One accent only | Amber + blue `#3B82F6` + pink `#EC4899` nebulas in DiscoveryUniverse | Critical |
| 4 | No gradients (one sanctioned exception) | `--gradient-main`, `--gradient-text`, `.text-gradient` on every heading, `btn-gradient` | High |
| 5 | Plus Jakarta Sans + JetBrains Mono | Inter + Outfit | High |
| 6 | No emoji; 1.5px line art in `ink-tertiary` | Emoji everywhere — 12 feature icons, 13 tech icons, 3 universe icons, 4 social icons | High — this is what makes it read as a template |
| 7 | Cards: fill + shadow, no stroke | `border: 1px solid var(--border-color)` on feature cards, integration cards, CTA panel | Medium |
| 8 | Shadows intentionally faint (`0 1px 2px /.05`) | Tailwind-default `shadow-lg` weights | Medium |
| 9 | Photography is the hero of every screen | Zero photography anywhere on the site | High |
| 10 | Radii 8/12/16/20/28/pill | 8/16/24 | Low |
| 11 | Sentence case, no exclamation marks | Mostly OK; "Ready to Transform Your Fashion Journey?" is Title Case | Low |

### Contrast bug worth calling out

`.btn-primary` is white text on `#F59E0B` ≈ **2.1:1** — fails WCAG AA badly. The design system
already solved this with the fill/text split (`primary #C2410C` at 4.93:1 for fills,
`primary-text #B8410E` at 5.12:1 for text/icons). Adopting the theme fixes it for free.

### Structural / content problems (independent of theme)

- **The nebula metaphor fights the brand.** `DiscoveryUniverse` renders three full-height
  "universe" sections with radial nebula clouds in blue, pink and amber. The brand's mental
  model is a printed fashion magazine. This is the most off-brand thing on the page.
- **12 feature cards in one flat grid** is a wall of text. Chips are the design system's
  universal tab mechanism — filter by shoppers / creators / brands instead.
- **The tech-stack marquee** (Go, gRPC, MongoDB, Kafka, ClickHouse) sits on a *consumer*
  fashion site. Wrong audience — demote it to a quiet monochrome wordmark row.
- **Dead code**: `views/AIFeatures/` exists but is never imported in `App.js` or `views/index.js`.
- **Dead links**: all 4 social links are `url: '#'`; footer "About Us" and "Blog" are `href="#"`.
- **Navbar carries a phone number and email address** — clutters the chrome; belongs in the footer.
- **Dark mode is patched, not systematic** — `index.css` hand-overrides contact-form colours
  under `[data-theme='dark']` because the tokens don't cover it.
- `OpenAI` is listed in the tech marquee, but the platform runs on AWS Bedrock (Nova / Claude
  Haiku / Titan). Factually stale.

### Brand inconsistency across surfaces

Four oranges are in play: mobile `#E55A2B` (brand) / `#C2410C` (fill) / `#B8410E` (text),
the marketing site's amber `#F59E0B`, and the pitch deck's coral `#FF4D2E`. The site moves to
the terracotta family here. **Follow-up:** retheme `pitch-deck/index.html` from coral to
terracotta so all three surfaces finally agree.

---

## 2. What we're borrowing from the pitch deck

These are the devices that give the deck its character. Each is carried into the site in a form
that doesn't break the design system:

| Deck device | Deck implementation | How it lands on the site |
|---|---|---|
| Mono kicker | `.kicker` — JetBrains Mono 11.5px, +0.14em, uppercase, coral, with 30px hairline rules either side via `::before`/`::after` | Kept verbatim, in `#B8410E` |
| Display headings | Space Grotesk, `clamp(40px, 5.8vw, 72px)`, -0.03em | Plus Jakarta Sans 800 at the same size and tracking |
| Mono numerals | Stats, prices, table figures, counters all in JetBrains Mono | Kept — every figure on the page is mono and tabular |
| Accent rule on cards | `.problem-card::before` 2px coral bar across the card top; `.biz-card` 3px top border; `.swot-card` 3px left border | Kept as a 2px terracotta rule on the top edge only. It is a *rule*, not a stroke around the card — the card still has no border |
| Dashed dividers | `border-bottom: 1px dashed` inside lists and attribute rows | Kept, in `rgba(43,42,39,0.08)` |
| Arrow bullets | `.swot-list li::before { content: '→' }` in coral | Kept, in `#B8410E`, replacing filled dots |
| Numbered cards | 40px Space Grotesk coral numeral at the card top | Kept as mono numerals `01`–`04` |
| Key/value rows | `.biz-attr` — `grid-template-columns: 96px 1fr`, mono uppercase key, body value | Kept for the "how it works" and spec rows |
| Emphasis block | `.emph` — coral 12% wash, radial glow bleeding off the top-right, large light-weight pull quote | Kept as **the one sanctioned gradient on the site**, used exactly once |
| Pulsing pin | `.pin.us` — coral dot with an animated expanding ring | Kept for the "trending near you" map visual |

Everything else in the deck — the `0.5px` card borders, the 4px square chips, the green / gold /
blue / purple data palette, the multi-gradient emphasis fills — is **dropped**.

---

## 3. Proposed new structure

| Old | New |
|---|---|
| Navbar with phone + email | Frosted paper bar: wordmark, 4 sentence-case links, one terracotta pill CTA |
| Hero with emoji float-cards | Editorial split — oversized ink headline + real photography + overlapping paper cards |
| — | Proof band: mono stats + a quiet brand logo row |
| Features: 12 cards, flat | Features: chip-filtered (Shoppers / Creators / Brands), 6 per group, line icons, accent rule on card tops |
| DiscoveryUniverse: 3 nebula sections | "Who it's for": one 3-panel editorial spread, mono numerals, arrow bullets |
| — | Thesis pull-quote — the one sanctioned wash on the page |
| — | "Trending near you" map visual with the pulsing terracotta pin |
| Why choose us: 4 emoji cards | Numbered editorial list with dashed rules, no cards, no emoji |
| Mission + CTA | Full-bleed photograph with a bottom-up scrim, one primary action |
| Tech marquee w/ emoji | Quiet monochrome wordmark row in `ink-tertiary`, no icons |
| Contact form | Paper form, pill inputs, terracotta focus ring |
| Footer w/ emoji socials | Paper surface, line-icon socials, real links |

---

## 4. Stitch prompts

**How to run these.** Stitch generates one screen per prompt. Paste **Block A** at the top of
*every* prompt, then one section prompt after it. Generate desktop first (1440px), then re-run
the same prompt with "Redesign this for mobile, 393px wide" appended.

**Stitch quirks to expect:** it defaults to pure white backgrounds, Material purple accents and
emoji icons — the preamble forbids all three explicitly, so keep those lines in even though they
feel redundant. If it drifts, regenerate rather than arguing with it in a follow-up. Use Standard
mode for layout fidelity; Experimental mode invents more but respects tokens less.

---

### Block A — paste at the top of every prompt

```
DESIGN SYSTEM — follow exactly, this overrides your defaults.

Name: Studio Editorial. The mental model is a warm, well-printed fashion magazine
crossed with a precise technical spec sheet: off-white warm paper, soft charcoal ink,
generous whitespace, monospaced labels and figures, and photography as the only
saturated element on the page.

COLOURS — use these hex values literally, no substitutions:
- page background #F7F6F4 (warm off-white — NEVER pure white #FFFFFF)
- raised surface #F3F1EC, image/placeholder tiles #ECE9E3
- card fill rgba(43,42,39,0.04) sitting directly on the page background
- primary text and headings #2B2A27 (soft charcoal — NEVER pure black #000000)
- secondary text #6B6A65, tertiary metadata #6E6C64
- accent terracotta: #C2410C as a FILL (buttons, active chips, badges, rules),
  #B8410E as TEXT or an ICON (kickers, links, arrow bullets),
  #E55A2B as a marketing swatch or a 10% wash only
- text on the terracotta fill: #FFF8F4
- hairlines and dividers rgba(43,42,39,0.08)

COLOUR RULES:
- Terracotta is the ONLY colour on the page. No blue, no purple, no indigo, no pink,
  no teal, no green, no Material palette. If more than ~5% of the screen is terracotta,
  it is wrong.
- No gradients. Flat fills only. (One block on the whole site is exempt and it is
  named explicitly in its own prompt.)
- Never use emoji. Icons are 1.5px-stroke line icons on a 24px grid, in #6B6A65.
- Never use pure white or pure black as a background or a text colour. Pure white
  appears only as overlay text on a dark scrim over a photograph.

TYPOGRAPHY — two families, both on Google Fonts:
- Plus Jakarta Sans for headings and body. Weights 400, 600, 700, 800 only —
  weight 500 is never used. Large headings get -1px to -2px letter-spacing.
- JetBrains Mono for every label and every number: kickers, overlines, stat figures,
  prices, dates, table cells, section numerals, tags. Uppercase with +0.14em tracking
  for labels; tabular figures for numbers.
- Scale: display 76 / h1 44 / h2 32 / h3 20 / body 17 / small 15 / caption 13.
- Sentence case everywhere except mono uppercase labels. No exclamation marks.

SIGNATURE EDITORIAL DEVICES — use these, they carry the identity:
- KICKER: a JetBrains Mono 12px uppercase label in #B8410E with +0.14em tracking,
  flanked left and right by a 30px-wide 1px terracotta hairline at 50% opacity.
  Every section opens with one.
- ACCENT RULE: a 2px solid #C2410C bar running across the TOP EDGE of a card, edge to
  edge, inside its rounded corners. This is a rule, not a border — the card still has
  no stroke around it.
- DASHED DIVIDERS: 1px dashed rgba(43,42,39,0.08) between rows in lists and
  attribute tables, never solid.
- ARROW BULLETS: list items begin with a → in #B8410E, never a filled dot.
- MONO NUMERALS: every figure on the page — stats, prices, counts, dates, section
  numbers 01/02/03 — is JetBrains Mono, never the sans.
- KEY/VALUE ROWS: a 96px JetBrains Mono uppercase key in #6E6C64 beside a body value
  in #2B2A27, separated by a dashed rule.

SHAPE: every button and chip is a full pill (999px). There are no rectangular buttons
anywhere. Cards 20px radius, media 16px, small tiles 8px, frosted panels 28px.

DEPTH: shadows only, never borders. Cards get a fill plus a very faint shadow
(0 2px 5px rgba(0,0,0,0.06)) and NO stroke. Chrome (nav, sticky bars) is frosted:
20px blur over a 72% tint of the page background colour, never a neutral grey.
Text over photography sits on a bottom-up gradient scrim from rgba(0,0,0,0.55).

SPACING: 4pt scale — 4, 8, 12, 16, 24, 32, 48. 96px between major sections. Section
titles sit 24px above their content with no divider under them — whitespace is the divider.

PHOTOGRAPHY: editorial full-body fashion, natural light, warm cast, Indian and global
models. Never crop a face out of a photo to fit a grid — change the aspect ratio instead.
```

---

### Prompt 1 — Navigation bar

```
[Block A]

Design a desktop marketing-site top navigation bar, 1440px wide, 72px tall, for
TrendBag — an India-first fashion social-commerce platform.

Frosted paper chrome: 20px blur over a 72% tint of #F7F6F4, pinned to the top, with a
1px rgba(43,42,39,0.08) hairline beneath it and nothing else separating it from the page.

Left: a 28px rounded-square app mark in #E55A2B, then the wordmark "trendbag" in
Plus Jakarta Sans 20px/800, all lowercase, colour #2B2A27.

Centre: five text links in 15px/600, colour #6B6A65 — Home, Features, Who it's for,
About, Contact. The active link is #B8410E with a 4px terracotta square centred 6px
beneath it. No underline tab indicators.

Right: a JetBrains Mono 12px uppercase label in #6E6C64 reading "EST. 2025" with
+0.14em tracking, then a 44px circular icon button with a rgba(43,42,39,0.04) fill
holding a 1.5px line moon icon, then one primary action — a 40px-tall full-pill button,
fill #C2410C, label "Install on Shopify" in #FFF8F4 at 14px/600 with +0.5px tracking.

Show the scrolled state only. No phone number, no email address, no emoji, no dropdowns.
```

---

### Prompt 2 — Hero

```
[Block A]

Design the hero section of a marketing landing page for TrendBag, 1440x920 — an
India-first fashion social-commerce platform where people discover looks from creators
and buy them directly.

Editorial magazine-spread split, roughly 45/55, on the #F7F6F4 paper background.

LEFT COLUMN, vertically centred, 64px from the gutter, max-width 560px:
- A left-aligned KICKER (see the kicker spec — mono, terracotta, flanked by hairlines,
  but with the left-hand hairline omitted since it is left-aligned) reading
  "FASHION / SOCIAL / SHOPPABLE".
- A very large headline, Plus Jakarta Sans 76px/800, line-height 1.05, letter-spacing
  -2px, colour #2B2A27, on three lines: "Shop what / creators / actually wear."
  The word "actually" is #B8410E — colour only, no gradient, no highlight box, no underline.
- A supporting paragraph, 18px/400, colour #6B6A65, max-width 460px: "Discover the looks
  people you follow are wearing, build a digital wardrobe of what you already own, and
  buy it all in one place."
- A row of two pill buttons, 52px tall: primary fill #C2410C with the label
  "Start exploring" in #FFF8F4; secondary transparent with a 1px rgba(43,42,39,0.08)
  stroke, the label "See how it works" in #2B2A27, and a 1.5px line play icon.

RIGHT COLUMN — an editorial photo composition, not a flat device mockup:
- One large portrait photograph at a 3:4 ratio and 16px radius: a young Indian woman in
  a styled outfit, natural warm light, plain warm background.
- Overlapping its lower-left corner, offset -40px, a floating card at 20px radius with a
  rgba(43,42,39,0.04) fill, a faint shadow, NO border, and a 2px #C2410C ACCENT RULE
  across its top edge. Inside: a 56x72 product cutout on a #ECE9E3 tile, the brand name
  in JetBrains Mono 11px uppercase #6E6C64, the product title in 15px #2B2A27, and the
  price in JetBrains Mono 20px/600 #2B2A27.
- Overlapping the photo's top-right, a second smaller card with a 40px circular avatar,
  a creator handle in 15px/600, a mono 11px follower count, and a 32px terracotta pill
  button labelled "Follow".

No gradient mesh, no blobs, no glow, no floating emoji badges. The photograph is the
only saturated thing on screen.
```

---

### Prompt 3 — Proof band

```
[Block A]

Design a narrow full-width proof band, 1440x200, that sits directly beneath a hero
section on a #F7F6F4 background, with a 1px rgba(43,42,39,0.08) hairline along its top
and bottom edges and nothing else framing it.

Upper half: a row of four statistics spread evenly across the full width, each centred
and separated from its neighbour by a 1px vertical rgba(43,42,39,0.08) hairline running
the full height of the row. Each statistic is a JetBrains Mono figure at 40px/600 in
#2B2A27 with tabular numerals, above a Plus Jakarta Sans label at 14px/400 in #6B6A65.
Use: "12K+ creators", "480+ brands", "2.4M looks tagged", "38 cities".

Lower half, 32px down: a JetBrains Mono 11px uppercase label in #6E6C64 with +0.14em
tracking reading "TRUSTED BY", then a horizontal row of six fashion-brand wordmarks
rendered flat in #6E6C64 at a single weight, evenly spaced, all optically the same size.

The brand wordmarks are monochrome — no colour, no logos in their real brand colours,
no image tiles, no cards, no shadows. This band is deliberately the quietest thing on
the page.
```

---

### Prompt 4 — Features, chip-filtered

```
[Block A]

Design a features section, 1440px wide, on a #F7F6F4 background, for an AI-powered
fashion platform.

Header block, centred, max-width 720px:
- a centred KICKER reading "AI-NATIVE PLATFORM"
- an h2 headline in Plus Jakarta Sans 44px/800, -1px tracking, #2B2A27:
  "One platform, three audiences."
- a 17px/400 #6B6A65 supporting line, two lines maximum

32px down, a centred horizontal row of three filter chips, 34px tall, full pills:
"For shoppers" is active — solid #C2410C fill, #FFF8F4 label — and "For creators" and
"For brands" are inactive with a #F3F1EC fill and #6B6A65 labels. These chips are the
section's tab mechanism; do not draw an underline tab bar.

32px down, a 3-column grid of six cards, 24px gaps. Each card: rgba(43,42,39,0.04)
fill, 20px radius, 24px padding, a very faint shadow, a 2px #C2410C ACCENT RULE across
its top edge, and absolutely NO border around it. Inside each card, top-aligned:
- a JetBrains Mono section numeral "01"–"06" in 12px #6E6C64, right-aligned on the same
  line as the icon
- a 40px 1.5px-stroke line icon in #6B6A65 (camera, mirror, ruler, tag, hanger, map pin)
- 20px gap, a card title in 20px/600 #2B2A27
- a description in 15px/400 #6B6A65, three lines maximum

Card contents:
01 Steal her style — upload any street-style photo and find every piece in the catalog.
02 Virtual try-on — see a garment on your own body before you buy.
03 Size predictor — one photo predicts your size for every brand.
04 Dupes detector — find affordable alternatives to a pricey piece.
05 Wardrobe analyzer — snap your closet and see what is missing from it.
06 Trending near you — a hyperlocal feed of what people around you are wearing.

Line icons only — no emoji, no coloured icon chips, no gradient icon backgrounds, no
borders around the cards.
```

---

### Prompt 5 — "Who it's for", replacing the nebula sections

```
[Block A]

Design a three-panel "who it's for" section for a fashion social-commerce marketing
site, 1440px wide, on #F7F6F4. It replaces three separate full-screen sections with one
editorial spread.

Left-aligned header, not centred: a KICKER reading "WHO IT'S FOR", then an h2 in
44px/800 #2B2A27 reading "Three ways in.", then a single 17px #6B6A65 line.

Below, three equal columns with a 32px gap. Each column is a vertical stack:
- A photograph at a 4:5 ratio and 16px radius, full column width. Panel one: a young
  woman shopping on her phone in warm daylight. Panel two: a creator filming an outfit
  video on a tripod. Panel three: a flat-lay of folded garments on a warm paper surface.
  Editorial, natural light, warm cast.
- 20px gap, then a JetBrains Mono numeral "01" / "02" / "03" at 13px/600 in #B8410E,
  followed by a 40px 1px hairline in rgba(43,42,39,0.08) on the same baseline.
- A title in 24px/700 #2B2A27: "Shoppers" / "Creators" / "Brands".
- A 15px/400 #6B6A65 paragraph, three lines.
- Three list rows, each separated by a 1px DASHED rgba(43,42,39,0.08) divider, each
  beginning with a → ARROW BULLET in #B8410E followed by 15px #6B6A65 text.
- A text link in 15px/600 #B8410E with a trailing 1.5px line arrow.

No cards, no fills, no borders, no shadows on these panels — the photographs, the dashed
rules and the whitespace carry the entire structure. Absolutely no radial gradients,
glows, nebula clouds, or coloured background washes anywhere in this section.
```

---

### Prompt 6 — Thesis pull-quote (the one sanctioned wash)

```
[Block A]

Design a single full-width emphasis block, 1440x360, that sits between two sections of
a marketing page.

EXCEPTION TO THE NO-GRADIENT RULE — this one block is the only place on the entire site
where a gradient is permitted, so render it precisely:
- The block is a panel at a 28px radius, 64px of padding, spanning a 1120px content
  width centred on the page.
- Its fill is a 135-degree linear gradient from rgba(229,90,43,0.10) at the top-left to
  #F3F1EC at the bottom-right.
- A soft radial glow of #E55A2B at 10% opacity, 360px across, bleeds off the panel's
  TOP-RIGHT corner and is clipped by the panel's rounded corners.
- The panel has a 1px rgba(229,90,43,0.25) stroke — the only stroked panel on the site.

Content, left-aligned inside the panel:
- a JetBrains Mono 11px uppercase label in #B8410E with +0.18em tracking reading "OUR THESIS"
- 14px gap
- a pull quote in Plus Jakarta Sans 29px/400, line-height 1.32, -0.01em tracking,
  colour #2B2A27, max-width 860px: "Search assumes you already know what you want.
  Discovery starts with a person whose taste you trust — and that is where fashion has
  always actually begun."
  The phrase "a person whose taste you trust" is weight 700 in the same colour.

No photograph, no icon, no button, no attribution line, no quotation marks drawn as
decorative glyphs.
```

---

### Prompt 7 — "Trending near you" map

```
[Block A]

Design a two-column feature spotlight section, 1440x680, on #F7F6F4.

LEFT COLUMN, 40%, vertically centred: a KICKER reading "HYPERLOCAL"; an h2 in 44px/800
#2B2A27 reading "What your city is wearing this week."; a 17px #6B6A65 paragraph, three
lines. Beneath, three KEY/VALUE ROWS — a 96px JetBrains Mono 11px uppercase key in
#6E6C64 beside a 15px #2B2A27 value, each row separated by a 1px dashed
rgba(43,42,39,0.08) divider. Keys: "CITIES", "UPDATED", "SIGNALS". Values: "38 across
India", "Every 6 hours", "Creator posts, saves, purchases".

RIGHT COLUMN, 60%: a panel with a #F3F1EC fill at a 20px radius, 32px padding, a faint
shadow and no border. Inside it, a graph-paper plotting surface: a #ECE9E3 field at an
8px radius with a faint 52px square grid drawn in rgba(43,42,39,0.08) 1px lines.

Scattered across the grid, seven small location pins: six are 13px circles filled
#6E6C64 with a small JetBrains Mono 11px city label in #6B6A65 beneath each. The seventh
is the active pin — a 24px #C2410C circle with two concentric expanding rings around it
in rgba(229,90,43,0.15), suggesting a pulse animation — with its label in a small
terracotta pill, fill #C2410C, text #FFF8F4, JetBrains Mono 11px, reading "MUMBAI".

Above the grid, a row of four small mono uppercase tags in 11px #6E6C64 on a
rgba(43,42,39,0.04) fill at an 8px radius: "OVERSIZED", "LINEN", "CO-ORDS", "MULES".

Terracotta appears only on the active pin and its label. Every other element on the
grid is greyscale.
```

---

### Prompt 8 — Why TrendBag

```
[Block A]

Design a "why us" section, 1440px wide, on #F7F6F4, built as a numbered editorial list
rather than a card grid.

Left-aligned header: a KICKER reading "WHY TRENDBAG", then an h2 in 44px/800 #2B2A27
reading "Built for how people actually shop."

Below, four full-width rows stacked vertically, each separated from the next by a 1px
DASHED rgba(43,42,39,0.08) divider, with 32px of padding above and below each row.
Each row is a three-column grid: a 96px column, a 1fr column, and a 380px column.

- Column 1: a JetBrains Mono numeral "01"–"04" at 32px/600 in #B8410E, top-aligned.
- Column 2: a title in 24px/700 #2B2A27, then a 16px/400 #6B6A65 paragraph, two lines.
- Column 3: two list items, each beginning with a → ARROW BULLET in #B8410E followed by
  14px #6B6A65 text.

Row contents:
01 AI that understands taste — models trained on real Indian fashion behaviour, not a
   generic recommendation engine.
02 Verified and safe — verified creator badges, secure payments and transparent reviews
   on every collaboration.
03 Measurable outcomes — creators and brands see exactly which posts drove which sales.
04 India-first — built around Indian sizing, Indian brands, Indian occasions and
   Indian price points.

No cards, no fills, no shadows, no icons, no emoji. The numerals, the dashed rules and
the column rhythm are the entire design.
```

---

### Prompt 9 — Mission + full-bleed CTA

```
[Block A]

Design a full-bleed call-to-action band for a fashion marketing site, 1440x620.

The whole band is a single edge-to-edge editorial photograph — a group of stylish young
Indians on a warm-toned street, natural light — with a bottom-up gradient scrim from
rgba(0,0,0,0.55) at the base to fully transparent at roughly 55% height. No radius, no
inset, no border; it breaks the page gutter and touches both edges.

Content sits in the lower-left, 80px from the left edge and 80px from the bottom,
max-width 660px, over the darkest part of the scrim:
- a JetBrains Mono 11px uppercase label with +0.14em tracking in #FFF8F4 at 80% opacity,
  reading "OUR MISSION", flanked on its right by a 30px 1px hairline in the same colour
- a headline in Plus Jakarta Sans 44px/800, -1px tracking, in pure white — this is the
  one place pure white is allowed, because it sits on a scrim over a photograph —
  reading "Fashion discovery that starts with a person, not a search box."
- a 17px/400 paragraph in white at 85% opacity, two lines
- one primary action only: a 52px full-pill button, fill #C2410C, label "Install on
  Shopify" in #FFF8F4 at 14px/600 with +0.5px tracking

Exactly one button. No secondary button, no email capture field, no badge row, no
gradient overlay other than the scrim itself.
```

---

### Prompt 10 — Contact

```
[Block A]

Design a contact section, 1440px wide, on a #F7F6F4 page background, split into two
columns with a 64px gap.

LEFT COLUMN, 40% width, top-aligned: a KICKER reading "GET IN TOUCH"; an h2 in 44px/800
#2B2A27 reading "Tell us what you're building."; a 17px #6B6A65 paragraph. Beneath,
32px down, three contact rows stacked 20px apart and separated by 1px dashed
rgba(43,42,39,0.08) dividers — each row is a 44px circular icon button with a
rgba(43,42,39,0.04) fill holding a 1.5px line icon (phone, envelope, map pin), then a
JetBrains Mono 11px uppercase label in #6E6C64 above a value in 16px/600 #2B2A27.

RIGHT COLUMN, 60% width: a form panel with a #F3F1EC fill, 20px radius, 40px padding,
a faint shadow, a 2px #C2410C ACCENT RULE across its top edge, and no border. Inside:
- a title in 24px/700 #2B2A27 and a 15px #6B6A65 line
- two side-by-side fields, then one full-width field, then a full-width textarea.
  Every input is a 48px full pill with a #ECE9E3 fill and NO border; the textarea is the
  same fill at a 12px radius, 140px tall. Labels sit ABOVE each field in JetBrains Mono
  11px uppercase #6E6C64 — never as floating labels inside the field.
- show one field in its focused state: a 1.5px #C2410C ring around the pill.
- a full-width 52px primary pill button, fill #C2410C, label "Send message" in #FFF8F4.

No border on the panel, no shadow heavier than 0 2px 5px rgba(0,0,0,0.06), no
placeholder text darker than #6E6C64.
```

---

### Prompt 11 — Footer

```
[Block A]

Design a marketing-site footer, 1440px wide, on a #F3F1EC surface fill with a 1px
rgba(43,42,39,0.08) hairline along its top edge. Roughly 440px tall.

Four columns, 48px apart, 64px of padding all round.

Column 1 (wider, 2fr): a 28px rounded-square mark in #E55A2B beside the "trendbag"
wordmark in 24px/800 lowercase #2B2A27; a 15px #6B6A65 tagline, two lines; then a row of
four 44px circular icon buttons with rgba(43,42,39,0.04) fills, each holding a
1.5px-stroke line social glyph (Instagram, X, LinkedIn, YouTube) in #6B6A65 — line icons
only, never emoji.

Columns 2–4: a JetBrains Mono 11px uppercase title with +0.14em tracking in #6E6C64 —
"PRODUCT", "COMPANY", "CONTACT" — then link lists in 15px/400 #6B6A65, 14px apart. The
contact column ends with a small postal address block in 14px #6E6C64.

A 1px hairline, then a bottom bar: a JetBrains Mono 12px copyright line in #6E6C64 on
the left, and a row of six legal links (Privacy, Terms, Community guidelines, Refunds,
Returns, Shipping) in 14px #6E6C64 on the right, separated by 20px.

Nothing terracotta in this footer except the app mark. No newsletter signup, no language
selector, no emoji.
```

---

### Prompt 12 — Legal / policy page template

```
[Block A]

Design a legal document page — a privacy policy — for a fashion platform, 1440px wide,
on #F7F6F4.

A frosted top bar, then a page header 80px down: a KICKER reading "LEGAL", an h1 in
44px/800 #2B2A27 reading "Privacy policy", and a JetBrains Mono 12px line in #6E6C64
reading "LAST UPDATED 12 AUG 2026".

Below, a two-column layout with a 64px gap:
- LEFT, 240px, sticky: a table of contents. Nine entries in 14px/400 #6B6A65, 12px
  apart, each prefixed by a JetBrains Mono 11px numeral in #6E6C64. The active entry is
  #B8410E at weight 600 with a 2px terracotta vertical bar at its left edge.
- RIGHT, max-width 720px: the document body. h2 section headings in 24px/700 #2B2A27
  with 48px of space above and 16px below, each preceded by a mono section numeral in
  #6E6C64; body paragraphs in 17px/400 #6B6A65 at a 1.6 line height with 20px between
  them; lists using → ARROW BULLETS in #B8410E; and one callout block with a #F3F1EC
  fill at a 16px radius, 24px padding, a 2px #C2410C accent rule on its top edge, and
  no border.

Long-form reading comfort is the point. No cards around sections, no icons in the body,
no coloured highlights other than the active table-of-contents entry.
```

---

### Prompt 13 — 404

```
[Block A]

Design a 404 error page, 1440x900, on #F7F6F4, centred both ways, max-width 520px.

A JetBrains Mono label at 12px uppercase in #B8410E with +0.14em tracking reading
"ERROR 404", flanked left and right by 30px terracotta hairlines. 32px gap. A 120px
1.5px-stroke line illustration in #6E6C64 — an empty shopping bag drawn as single-weight
line art, no fill, no colour, no shading. 32px gap. A headline in Plus Jakarta Sans
32px/800 #2B2A27 reading "This page isn't here." A 17px/400 #6B6A65 paragraph, two
lines, explaining the page may have moved and offering the home page. 32px gap. Two pill
buttons side by side: primary fill #C2410C labelled "Back to home", and a transparent
secondary with a 1px rgba(43,42,39,0.08) stroke labelled "Browse features".

Enormous whitespace. No large "404" numeral rendered as art, no illustration in colour,
no emoji, no mascot.
```

---

## 5. What we do after Stitch

1. Export each screen from Stitch as HTML/Tailwind, or paste into Figma to compare side by side.
2. Rewrite `src/index.css` around the Studio Paper tokens — port the ramp from
   `clients/web-share/lib/theme/studioPaper.ts` so all three web surfaces share one source, then
   add the mono type scale and the editorial-device utility classes (`.kicker`, `.accent-rule`,
   `.dashed-row`, `.arrow-list`).
3. Section by section: Navbar → Hero → proof band → Features → replace DiscoveryUniverse →
   thesis block → map → why → mission CTA → Contact → Footer, then the legal template and 404.
4. Swap all 32 emoji for a line-icon set — Lucide is 1.5px-stroke on a 24px grid and matches the
   spec directly.
5. Source photography. This is the long pole: the design leans on editorial imagery and the site
   currently has none.
6. Cleanup: delete `views/AIFeatures/`, fix the dead `#` links, drop `OpenAI` from the tech row.
7. Follow-up, separate task: retheme `pitch-deck/index.html` from coral `#FF4D2E` to the
   terracotta family so the deck, the site and the app finally agree.

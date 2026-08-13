---
name: Studio Editorial
version: alpha
description: >-
  Design system for the TrendBag marketing site. It carries the product's Studio Paper canvas —
  warm off-white paper, soft charcoal ink, a single terracotta accent, borderless cards, pill
  controls — and layers on the voice of a printed fashion magazine: a didone display face,
  letterspaced small-caps labels, hairline rules, dashed dividers and arrow bullets. Photography
  is the only saturated element on the page.

colors:
  # Light is the default and the only mode the marketing site ships first.
  # The brand terracotta #E55A2B is 3.34:1 on paper and fails AA both as text and as a button
  # fill, so the accent splits into a darkened fill and a darker still text weight.
  primary: "#C2410C"          # fill: buttons, active chips, badges, card top-rules — 4.93:1
  primary-text: "#B8410E"     # the accent as text or an icon — 5.12:1 on background
  primary-brand: "#E55A2B"    # the brand swatch. Marketing washes and the app mark only.
  primary-pressed: "#A8380C"
  on-primary: "#FFF8F4"       # never #FFFFFF
  primary-muted: "rgba(229,90,43,0.10)"
  background: "#F7F6F4"
  surface: "#F3F1EC"
  surface-variant: "#ECE9E3"
  card-fill: "rgba(43,42,39,0.04)"
  ink: "#2B2A27"              # 13.29:1
  ink-secondary: "#6B6A65"    # 5.02:1
  ink-tertiary: "#6E6C64"     # 4.87:1
  divider: "rgba(43,42,39,0.08)"
  glass: "rgba(247,246,244,0.72)"
  scrim: "rgba(11,11,10,0.55)"
  success: "#047857"
  warning: "#B45309"
  error: "#D11F1F"
  # --- Dark ---
  dark-primary: "#FF7A4D"
  dark-on-primary: "#1A0E08"
  dark-background: "#0B0B0A"
  dark-surface: "#151412"
  dark-surface-variant: "#1F1E1B"
  dark-card-fill: "rgba(241,237,230,0.06)"
  dark-ink: "#F1EDE6"
  dark-ink-secondary: "#B5B0A6"
  dark-ink-tertiary: "#7C7A73"
  dark-divider: "rgba(241,237,230,0.10)"
  dark-glass: "rgba(11,11,10,0.72)"

typography:
  display:
    fontFamily: Bodoni Moda
    fontSize: 76px
    fontWeight: 700
    lineHeight: 78px
    letterSpacing: -0.8px
  h1:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: 700
    lineHeight: 52px
    letterSpacing: -0.5px
  h2:
    fontFamily: Bodoni Moda
    fontSize: 34px
    fontWeight: 700
    lineHeight: 38px
    letterSpacing: -0.3px
  h3:
    fontFamily: Karla
    fontSize: 20px
    fontWeight: 700
    lineHeight: 26px
    letterSpacing: -0.2px
  body:
    fontFamily: Karla
    fontSize: 17px
    fontWeight: 400
    lineHeight: 27px
    letterSpacing: 0px
  body-sm:
    fontFamily: Karla
    fontSize: 15px
    fontWeight: 400
    lineHeight: 23px
    letterSpacing: 0px
  caption:
    fontFamily: Karla
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
  button:
    fontFamily: Karla
    fontSize: 13px
    fontWeight: 700
    lineHeight: 17px
    letterSpacing: 1.8px
    textTransform: uppercase
  kicker:
    fontFamily: Karla
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 2.6px
    textTransform: uppercase
  overline:
    fontFamily: Karla
    fontSize: 11px
    fontWeight: 700
    lineHeight: 14px
    letterSpacing: 2px
    textTransform: uppercase
  numeral:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: 700
    lineHeight: 44px
    letterSpacing: -0.4px
  numeral-sm:
    fontFamily: Karla
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 1.2px

rounded:
  none: 0px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 28px
  pill: 999px

spacing:
  scale: [4, 8, 12, 16, 24, 32, 48]
  gutter: 64px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 52px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.divider}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 52px
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.pill}"
    height: 34px
  chip-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    height: 34px
  card:
    backgroundColor: "{colors.card-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
    topRule: "2px {colors.primary}"
  input:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: 48px
  top-bar:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    height: 72px
---

## Overview

This is the marketing site for TrendBag, an India-first fashion social-commerce platform. The
design system is **Studio Editorial**. It is the marketing-surface dialect of the product's
Studio Paper system: the same canvas, ink ramp and accent, plus an editorial type layer — a didone
display face and small-caps labels — that the product UI does not use.

The mental model is a warm, well-printed fashion magazine crossed with a precise technical
specification sheet. The paper is off-white and slightly warm, the ink is a soft charcoal rather
than black, the layout breathes, headlines are set in a didone and labels in letterspaced small
caps, and photography is the only place saturated colour appears.

Four rules carry most of the identity:

1. **No pure white, no pure black.** The canvas is `#F7F6F4` and the ink is `#2B2A27`. Pure
   `#FFFFFF` and `#000000` never appear as a background or text colour. White appears only as
   overlay text on a scrim over a photograph. Text on the terracotta fill is `#FFF8F4`.
2. **One accent, used sparingly.** Terracotta is the only non-status colour. If more than roughly
   5% of a screen is terracotta, something is wrong.
3. **Cards have no borders.** Separation comes from a 4% ink fill plus a faint shadow. The one
   permitted stroke-like mark is a 2px terracotta rule across a card's *top edge only* — a rule,
   not an outline.
4. **Two families, split by job.** Bodoni Moda — a true didone — sets the display voice: h1,
   h2, prices and the large section numerals. Karla sets every sentence, and, uppercased and
   letterspaced, every label. There is no monospace anywhere: a code face on a fashion brand
   reads as a developer tool.

Tone of voice is plain, warm and short. Sentence case everywhere except uppercase small-caps labels.
No exclamation marks, no emoji anywhere.

## Colors

Three neutral planes do the structural work: `background` `#F7F6F4` is the page itself; `surface`
`#F3F1EC` is any panel that must read as lifted; `surface-variant` `#ECE9E3` is image placeholders
and input fills. Cards use `card-fill`, a 4% ink wash, directly on the background.

The ink ramp carries all hierarchy that colour would otherwise carry: `ink` `#2B2A27` for headings
and body, `ink-secondary` `#6B6A65` for supporting copy, `ink-tertiary` `#6E6C64` for metadata.

The accent splits by role because one value cannot do both jobs at AA. `primary` `#C2410C` is the
accent as a **fill** — buttons, active chips, card top-rules, badges, the active-nav marker.
`primary-text` `#B8410E` is the accent as **text or an icon** — kickers, links, arrow bullets,
numerals. `primary-brand` `#E55A2B` is the brand swatch, used for the app mark and 10% washes
only; never pair a foreground with it.

There is no second accent. Blue, indigo, purple, pink, teal and the default Material palette are
all out.

## Typography

Two families, and the split between them is by size and by job, not by decoration.

**Bodoni Moda** is the masthead voice — the didone that fashion publishing has used for two
centuries. Its hairlines only survive at scale, so it is restricted to **h1, h2, prices, and the
large section numerals** (`01`/`02`/`03` at 24px and up). Never set it below ~20px, never set a
paragraph in it, and always give it tight tracking (`-0.01em`) so the counters close up.

Its **italic carries emphasis**. The accent word in a headline is italic *and* terracotta — the
italic does most of the work, which means the page leans less on the accent colour.

**Karla** sets everything read as a sentence: body copy, ledes, card titles (h3/h4), buttons, nav,
form fields. Uppercased at 0.18–0.22em tracking it also sets every label — kickers, overlines,
key/value keys, tags, the copyright line, small metadata figures. This is what print fashion does
for credits and standfirsts, and it replaces the code mono the system used to specify.

Numerals stay `tabular-nums` in both faces so prices and stats still align in a column. Small
figures (12px and under) take Karla, not Bodoni.

Body copy is 17px at a 1.6 line height. A section heading is always visibly much larger than the
kicker above it — if the kicker competes with the heading, the hierarchy is broken.

## Layout

A 4pt base scale: `4, 8, 12, 16, 24, 32, 48`. Desktop gutters are 64px. Major sections are
separated by 96px, and a section ends roughly 96px below its last element — never leave half a
canvas of dead space.

Content is capped at a 1200px column and centred. Full-bleed media — the mission band, hero
photography — breaks the gutter and runs edge to edge; text never does.

## Signature devices

These are what make the site read as itself rather than as a generic landing page. Use them.

- **Kicker.** A Karla 12px uppercase label in `primary-text` at 0.22em tracking, flanked
  left and right by a 30px 1px terracotta hairline at 50% opacity. Every section opens with one.
  Left-aligned sections keep only the trailing hairline.
- **Accent rule.** A 2px `primary` bar across a card's top edge, inside its rounded corners. It
  animates in with `transform-origin: left` and `scaleX` 0 → 1 over 400ms.
- **Dashed dividers.** 1px dashed `divider` between rows in lists and attribute tables. Solid
  rules are for section boundaries only.
- **Arrow bullets.** List items begin with a `→` in `primary-text`, never a filled dot.
- **Figures.** Prices and large section numerals are Bodoni and tabular; small metadata figures
  are Karla and tabular. Nothing on the site is monospaced.
- **Key/value rows.** A 96px small-caps key in `ink-tertiary` beside a body value in `ink`,
  separated by a dashed rule.

## Elevation & Depth

Depth is carried by shadow, never by borders. Three levels, intentionally faint — on a warm
off-white ground a heavy shadow reads as dirt: `sm` `0 1px 2px rgba(0,0,0,0.05)`, `md`
`0 2px 5px rgba(0,0,0,0.06)`, `lg` `0 4px 10px rgba(0,0,0,0.09)`. Nothing goes above `lg`.

Chrome is frosted: a 20px blur over a 72% tint of the *page background colour*, never a neutral
grey. Text over photography always sits on a bottom-up gradient scrim from `rgba(0,0,0,0.55)` to
transparent.

## Shapes

`xs` 8px for small tiles and inline tags, `sm` 12px for textareas, `md` 16px for photography and
media, `lg` 20px for cards and panels, `xl` 28px for frosted and emphasis panels, `pill` 999px for
every button, chip, avatar and input. **Every button is a full pill.** There are no rectangular
buttons anywhere.

Iconography is 1.5px-stroke line icons on a 24px grid in `ink-secondary`. No emoji, ever — not in
feature lists, not in footers, not as social glyphs.

Photography is editorial full-body fashion: natural light, warm cast, Indian and global models,
shot as if for a magazine. Never crop a face out of a photo to fit a grid; change the ratio.

## Motion

Motion is understated and always ease-out — `cubic-bezier(0.2, 0.8, 0.2, 1)`, never linear. All
of it sits behind a `prefers-reduced-motion` guard.

- **Scroll reveal.** Content blocks enter from `opacity: 0` and `translateY(18px)` over 600ms,
  staggered 80ms between adjacent siblings, driven by an IntersectionObserver.
- **Cards** lift `translateY(-4px)` on hover with the shadow deepening to `lg`, over 260ms.
- **Card top-rules** scale in from the left over 400ms as the card enters the viewport.
- **Photographs** settle from `scale(1.04)` to `scale(1)` over 900ms on entry, clipped by their
  rounded corners.
- **Primary buttons** darken to `primary-pressed` on hover and scale to `0.97` while pressed.
- **Nav links** reveal a 4px terracotta square beneath them on hover, fading in over 160ms.

## Do's and Don'ts

**Do**

- Start every section on `background` and let photography be the only saturated thing on it.
- Open every section with a mono kicker.
- Use the ink ramp for hierarchy before reaching for size or weight.
- Make every button and chip a full pill.
- Give every card a fill, a faint shadow, and a 2px terracotta rule on its top edge.
- Set prices and large numerals in Bodoni, small metadata figures in Karla, both tabular.
- Write labels in sentence case, short and specific.

**Don't**

- Don't use pure white `#FFFFFF` or pure black `#000000` as a surface or text colour.
- Don't introduce a second accent.
- Don't put a border or outline around a card — the top rule is not a border.
- Don't use gradients, except the single thesis emphasis panel that names the exception itself.
- Don't use emoji, exclamation marks, or Title Case headings.
- Don't let a kicker compete in size with the heading beneath it, and never set body copy in Bodoni.
- Don't invent store navigation — this is a marketing site, not a storefront.

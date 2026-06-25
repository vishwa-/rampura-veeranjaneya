# Design System — Rampura Veeranjaneya Swamy

Implemented from the **Viranjanaya Swamy Design System** handoff (a warm "AxisFlow" reskin). Modern SaaS structure carrying the temple's content, but warm and characterful — not the earlier monochrome version.

## Principles

1. **Warm, not flat.** Cream paper surfaces, a single coral-orange accent, maroon dark sections. Color carries the devotion.
2. **Serif voice.** Newsreader (high-contrast transitional serif) for display, headings, and reading body — with **orange swash-italic emphasis words** ("a new *alankara*", "who *dances*"). Hanken Grotesk for UI chrome and labels.
3. **Generous rhythm.** Big section padding, 1180px measure, hairline sand rules, soft warm shadows.
4. **Reverent motion.** Calm scroll reveals; one dramatic moment — the footer चant-band parallax (जय श्री राम).

## Color (tokens in `assets/css/styles.css` + `assets/js/tw-config.js`)

| Token | Hex | Use |
|-------|-----|-----|
| surface-page | `#F4F1EA` | cream page / alt sections (`bg-surface`) |
| surface-raised | `#FCFBF8` | warm-white sections & cards (`bg-bg`) |
| ink-900 | `#1A1815` | headings & strong text (`text-ink`) |
| ink-600 | `#6B655C` | secondary text (`text-muted`) |
| accent (kumkum-500) | `#EE5A2A` | **coral orange** — emphasis, links, kicker squares, numerals (`text-accent`) |
| sand-300 | `#E4DED3` | hairline borders (`border-line`) |
| maroon-900 | `#1A1714` | dark sections & footer (`bg-dark`) |

## Type

- **Newsreader** — display, headings, body/quotes. Orange italic `<em>` for emphasis words.
- **Hanken Grotesk** — nav, buttons, eyebrows, form labels.
- **Noto Serif Kannada** — ಕನ್ನಡ (`.font-kn`). **Mukta** — Devanagari chant (`.font-deva`).

## Components (class names re-mapped to the warm tokens)

- **Buttons** — primary (solid ink / white), secondary (warm-white + sand border), light & ghost-dark for dark sections. 9px radius.
- **Eyebrow / kicker** — small orange square + tracked grotesque caps.
- **Cards & hairline grids** — warm-white, sand border, 14px radius, soft shadow.
- **OrnateDivider / `.rule`** — hairline with a centered orange square / short orange rule.
- **Inputs** — cream field, saffron focus + orange ring.
- **Hero** — full-bleed veiled gopuram + tilak + serif headline + ornate divider + quote + live-status strip.
- **Footer** — maroon chant band ("जय श्री राम", parallax + saffron glow) over temple info.

Full source (tokens, JSX components, ui-kit) shipped in the handoff zip; brand + imagery assets copied into `assets/brand/` and `assets/img/`.

# Sri Balanjaneya Swamy Temple, Rampura — Website PRD

## Original problem statement
Build a website for the small village temple at Rampura (near Mysore /
Srirangapatna, Karnataka). The village deity is Lord Anjaneya in the rare
Narthaki form. The historic garbhagudi was renovated (completed March 2022),
and a new shrine to Sri Vidya Hayagreeva is now being installed.

Google Maps: https://maps.app.goo.gl/tWHVdopyxEoxi8ZCA
Email: info@rampura.in · Trust: Devatha Rampura Anjaneyaswamy Trust

## User decisions (Dec 2026 — iterated 3x)
- Purpose: Informational / community-facing + event RSVP. No payments.
- No admin panel, no auth.
- Bilingual: English + Kannada throughout.
- **Design reference**: https://therameshwaramcafe.org/ — adapted to a temple
  context. Strict 2-canvas system: deep anthracite + ivory; copper + cream as
  the text-on-canvas pair.
- **Logo**: Hanuman Tilak (Vaishnava Urdhva Pundra).
- All copy must be production-ready (no editorial / source-note leakage).

## Architecture
- React 19 + Tailwind + shadcn/ui (sonner toasts) + react-router-dom v7.
- FastAPI + Motor + MongoDB. All API routes under `/api`.
- No third-party integrations.
- MongoDB collections: `event_registrations`, `contact_messages`.

## Design tokens (Dec-iter-4 · Old World Mysuru editorial)
- canvas-paper: `#F0E7D2` (aged paper — default)
- canvas-paper-aged: `#E8DCC4` (alternate section background)
- ink-deep: `#1A1410` (body text on paper; dark surface for inverted sections)
- ink-muted: `#5A4838` (muted body text on paper)
- text-cream: `#F0E7D2` (body text on dark inverted sections)
- crimson: `#9B2C2C` (primary accent — wax-seal red)
- gold-old: `#B8985A` (secondary accent on dark surfaces)
- Fonts: **Italiana** (display) + **EB Garamond** (body) + **Manrope** (labels) +
  **Noto Serif Kannada**.
- Editorial patterns: drop-caps on opening paragraphs, double-rule mastheads,
  rule-thin hairlines, № numbered tiles, sepia photos with vignette, narrow
  newspaper columns.

## Site map
- `/` Home — full-bleed dark hero with idol diptych backdrop, Hanuman stotra,
  announcements, **NEW before/after diptych section**, Puranic record (1,008
  Hanumans + Gautama + Ahalya), two idols, four cardinal kshetras, six
  blessings, Hayagreeva shrine banner, visit teaser.
- `/rampura` — village story + Ramayana memory.
- `/temple` — two idols + before/after + Narthaki narrative + architecture
  (Rekha Deula + Hoysala pillars + 5-language Hayagreeva scripts) + blessings
  band + Hayagreeva teaser.
- `/hayagreeva` — sculptor (Adithya yogiraj / Bala Rama at Ayodhya), gallery.
- `/mantra` — Sri Rama mantra gematria + Rama Stupa sankalpa steps.
- `/gallery` — 7 tiles (old-temple, idol diptych, new shrine) + lightbox.
- `/events` — 4 utsavas + RSVP form.
- `/visit` — map + address + hours + directions + contact form.

## API
- `GET  /api/health`
- `POST /api/events/register` — name, phone, email?, attendees, event_id, event_title, message?
- `GET  /api/events/registrations` — `?event_id=` filter
- `POST /api/contact` — name, email, subject?, message

## What's implemented (Dec 2026, iter-3)
- **Iter-3 full redesign** — dramatic dark anthracite hero (Rameshwaram-Cafe-
  inspired but temple-themed), generous Cormorant Garamond display headings,
  copper italic accents, lotus medallion ornaments, scrolling Hanuman stotra
  ribbon, slow-pan idol backdrops, ornament dividers.
- **Hanuman Tilak logo** integrated as brand mark (header + footer).
- **New before/after diptych** of the Anjaneya idol (asset-sourced).
- **Old village shrine photos** integrated on Rampura, Temple, Visit, Gallery.
- **Content overhaul** — zero editorial leakage; production-grade copy
  (verified by content audit in iter-3 testing).
- 8 routes, sticky bilingual nav, mobile menu, RSVP + contact forms wired to
  MongoDB.
- Testing-agent verdict: **100 % backend (8/8) + 100 % frontend** — including
  WCAG-AA-passing contrast (footer measured at 16.24:1) and zero content
  leakage.

## Backlog (P1 / P2)
- P1: Admin panel for events / announcements / gallery photos.
- P1: Digital Rama-Japa register (let devotees record mantra counts and submit
  to the Rama Stupa).
- P1: YouTube live-stream embed for the Vidya Hayagreeva praana pratishtha
  (Feb 14 – 16, 2026).
- P1: Tighten CORS to explicit origins in backend `.env` (currently `*`).
- P2: Seva-sankalpa interest form (no payments — name + seva preference).
- P2: SEO meta tags, Open-Graph cards, sitemap, robots.txt.
- P2: Replace the "ara D" watermark visible on the right edge of the diptych
  image (likely original photo credit — cropping needs user approval).
- P2: Full Kannada language toggle (the UI is currently bilingual labels;
  could be fully translated for Kannada-first users).

## Next action items
- User to share more authentic Rampura photos (Cauvery, sugarcane fields,
  garbhagudi interior, sculptors at work) if available.

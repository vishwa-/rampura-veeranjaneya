# Sri Kubera Anjaneyaswamy Temple — Rampura

A static, multi-page website for the Rampura Kubera Anjaneyaswamy temple (near Srirangapatna / Mysuru, Karnataka). Bilingual English + Kannada. Content carried over from the earlier site; visual design implemented from the **Viranjanaya Swamy Design System** handoff — a warm reskin: cream surfaces, a coral-orange accent, **Newsreader** serif headings with orange italic emphasis, a maroon chant-band footer. See `DESIGN.md`.

## Run it

It's plain HTML/CSS/JS — no build step.

```bash
# any static server works; for example:
cd rampura-veeranjaneya
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` in a browser. (A local server is recommended so the Google Maps embed and fonts load cleanly.)

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `rampura.html` | The village of Rampura |
| `temple.html` | The Temple |
| `hayagreeva.html` | Sri Vidya Hayagreeva |
| `mantra.html` | The Rama Mantra |
| `gallery.html` | Gallery (with lightbox) |
| `events.html` | Events + RSVP form |
| `visit.html` | Visit, map, directions + contact form |

## Structure

```
assets/
  css/styles.css   design tokens, type scale, components, scroll-reveal
  js/tw-config.js  Tailwind Play CDN config (maps the warm design tokens)
  brand/ img/      tilak mark + hero/texture imagery from the handoff
  js/main.js       header/footer injection, mobile menu, reveal, lightbox, forms
DESIGN.md          the design system, in one page
```

The header and footer are **injected by `main.js`** from a single `NAV` array, so navigation lives in one place. Edit `NAV` / `SITE` at the top of `assets/js/main.js` to change links, the email, the map URL, or the trust name.

## Forms (RSVP + Contact)

Both forms post to a [Formspree](https://formspree.io) endpoint. **Until you configure one, they simulate success** so the UI is testable.

To make them live:
1. Create a free form at formspree.io and copy your endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
2. Either set `SITE.formEndpoint` in `assets/js/main.js`, or add `action="https://formspree.io/f/abcdwxyz"` to each `<form data-form>`.

Submissions then arrive by email — no server or database to run. (Web3Forms works the same way if you prefer.)

## Notes

- **Tailwind** loads via the Play CDN for zero-build convenience. For production you can compile a static CSS file later; nothing else needs to change.
- **Imagery:** the hero is a self-hosted golden-hour photo of the Cauvery at Rampura (`assets/img/hero-cauvery.jpg`, AI-enhanced from a real photo, with the temple gopuram in the distance). A real temple snapshot is kept as a spare at `assets/img/hero-temple.jpg`. The hero has a layered warm veil (a vertical gradient + a soft radial scrim behind the headline) tuned so the cream text stays legible over the bright sky. The deity photos are reused at their existing hosted URLs (third-party `customer-assets.emergentagent.com` — if any stop loading, download into `assets/img/` and update the `src`s). The design-kit's "heritage" travel-poster placeholders were removed (they had city names baked in). `assets/img/texture.jpg` is a clean decorative collage, currently unused.
- Fonts: **Newsreader** (serif display/body) + **Hanken Grotesk** (UI) + **Mukta** (Devanagari) + **Noto Serif Kannada**, from Google Fonts.
- Accessible: reduced-motion respected (parallax + reveals disable), warm ink on cream is high-contrast, keyboard-closable lightbox.

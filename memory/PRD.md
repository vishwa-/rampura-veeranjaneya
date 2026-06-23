# Sri Anjaneya Swamy Temple, Rampura — Website PRD

## Original problem statement
Build a website for the small village temple at Rampura (near Mysore / Srirangapatna,
Karnataka). The village deity is Lord Anjaneya in a rare *Narthaki* (dancing) form.
The old temple is being remodelled and a new shrine to **Sri Vidya Hayagreeva** is
being installed — the idol is carved from black Krishna shila by the celebrated
sculptor *Adithya yogiraj*, who also carved the Bala Rama vigraha at Ayodhya.
The village sits between Mysore and Srirangapatna on the banks of the Cauvery; its
vibrancy comes from sugarcane and agriculture.

Google Maps: https://maps.app.goo.gl/tWHVdopyxEoxi8ZCA

## User decisions (Dec 2026)
- Purpose: Informational / community-facing + event registration & live updates.
- No payments, no admin panel, no auth.
- Bilingual: English + Kannada.
- The 3 attached idol photos are of the new Vidya Hayagreeva shrine.

## Architecture
- React 19 + Tailwind + shadcn/ui (sonner toasts) + react-router-dom v7.
- FastAPI + Motor + MongoDB. All API routes under `/api`.
- No third-party integrations.
- MongoDB collections: `event_registrations`, `contact_messages`.

## Site map / pages
- `/` Home — hero, announcements strip, intro, shrine banner, visit teaser.
- `/rampura` — village story (Cauvery, sugarcane, Mysore/Srirangapatna context).
- `/temple` — Narthaki Anjaneya, the new Vidya Hayagreeva sanctum, **Architecture**
  section (Rekha Deula tower, Hoysala-inspired pillars carved with 12 rashis +
  27 nakshatras, Hayagreeva sanctum walls with alphabets in Hindi, Sanskrit,
  Kannada, Tamil and Telugu).
- `/hayagreeva` — sculptor story, idol gallery.
- `/gallery` — masonry grid + lightbox.
- `/events` — 4 upcoming utsavas, daily timings, RSVP form (`POST /api/events/register`).
- `/visit` — Google Maps embed, address, hours, directions (road / rail / air),
  contact form (`POST /api/contact`).

## API
- `GET  /api/health`
- `POST /api/events/register`         — body: name, phone, email?, attendees,
                                         event_id, event_title, message?
- `GET  /api/events/registrations`    — optional `?event_id=` filter
- `POST /api/contact`                 — body: name, email, subject?, message

## Design tokens
- Light theme. Sandstone background, Krishna-shila ink for text, vermillion
  saffron for primary, marigold gold for accents.
- Fonts: Cormorant Garamond (display), Work Sans (body), Noto Serif Kannada
  (bilingual). All loaded via Google Fonts in `index.css`.

## What's implemented (Dec 2026)
- Full bilingual marketing site with 7 routes, sticky header + mobile menu.
- Event RSVP form + contact form, both wired to backend with toast feedback.
- New Temple **Architecture** section (Rekha Deula, Hoysala pillars + zodiac,
  Hayagreeva multilingual carvings).
- Gallery with lightbox, scroll-reveal animations, slow-pan hero image.
- Full backend (FastAPI + MongoDB) with validation and tests at
  `/app/backend/tests/test_api.py`. **100 % testing-agent pass (8/8 backend,
  22/22 frontend).**

## Backlog (P1 / P2)
- P1: Admin panel to publish announcements / events without code changes.
- P1: Photo upload / managed gallery (S3 or similar).
- P1: Donation / seva-sankalpa (Razorpay) when the trust is ready.
- P2: Live-stream embed (YouTube) for pratishtha day.
- P2: Daily aarti push reminders (Twilio SMS / email digest).
- P2: SEO meta + Open Graph cards + sitemap.
- P2: Dedicated Kannada language toggle for entire UI (currently bilingual labels).

## Next action items
- Capture better professional photos of the actual temple structure for the
  Architecture section.
- Replace Pexels placeholder (sugarcane / lamp) with photos of Rampura.

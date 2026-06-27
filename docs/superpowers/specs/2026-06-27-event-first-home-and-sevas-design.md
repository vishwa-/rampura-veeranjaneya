# Event-first home + Sevas & Parihara — design spec

**Date:** 2026-06-27
**Site:** rampura-veeranjaneya (static multi-page HTML, Tailwind CDN + custom tokens)
**Status:** Approved direction (Option C), pending spec review

---

## 1. Goal & context

The temple has just undergone a full **Jeernoddhara** (reconstruction), and a once-in-a-generation
**Maha Kumbhabhishekam + Prathisthapana of Sri Vidya Hayagreeva** runs **July 3–5, 2026** — about a
week from today. The reconstruction also gives the temple new ritual capacity (27 nakshatra pillars,
a Rasi mandapam, the Hayagreeva shrine, resident Veda pandits).

This spec updates the site to (a) drive turnout for the consecration during the event window, and
(b) permanently document the reborn temple and the new sevas it can now perform.

**Chosen approach — Option C ("Event-first home"):** the home page leads with the invitation through
Jul 5, then auto-reverts to an evergreen layout. A new **Sevas & Parihara** page becomes the durable
home for the ritual services. The reconstruction story folds into **The Temple** page; the full
programme goes on **Events**.

### Locked decisions
- **Structure:** Option C (event-first home + new Sevas page).
- **Home order:** ribbon → hero → invitation → 3-day programme → reborn temple → sevas → existing sections.
- **Photos:** use the real reconstruction photos as-is, framed honestly as *"the final days of renewal"* (scaffolding is acceptable / authentic).
- **Credits:** name **Sri B.R. Gopal Bhattar** (guidance) and the **Devatha family** members, as printed on the public invitation.

### Non-goals (YAGNI)
- No backend / database. RSVP continues to use the existing client-side form on `events.html` (shows a success message; no server submission). This is a pre-existing limitation, not introduced here.
- No CMS, no auth, no payment/booking for sevas (sevas page is informational + "enquire" via the RSVP/contact form).
- No redesign of the visual system — reuse the existing tokens, components, header/footer, and animations.

---

## 2. Content inventory (source of truth)

### 2a. The six new content pieces
1. **Reconstruction (Jeernoddhara)** — the rebuilt temple: cream Rekha-Deula **shikhara**, layered Dravidian **vimana**, granite pillared **mandapam**. 6 real photos (see §6).
2. **Maha Kumbhabhishekam** — Jul 3–5, 2026, with full 3-day programme (see §2c).
3. **27 Nakshatra pillars → Nakshatra Dosha Parihara** — the mandapam has 27 pillars, one per nakshatra; parihara is performed at the devotee's birth-star pillar.
4. **Rasi Mandapam → Rasi Dosha Parihara** — a mandapam for the 12 rasis; parihara for rasi/graha afflictions.
5. **Vidya Hayagreeva → Aksharabhyasam** — the deity of learning; the child's initiation into letters.
6. **Resident Veda pandits → Shashtipoorthi, Bheemaratha Shanthi, Sahasra Kalasha Darshana** — life-cycle samskaras and grand abhisheka.

### 2b. Festival facts (from the printed invitation)
- **Name:** Jeernoddhara Maha Kumbhabhishekam of Sri Anjaneya Swamy Devasthanam, and Prathisthapana of Sri Vidya Hayagreeva Swamy.
- **Dates:** Friday 3 – Sunday 5 July 2026.
- **Venue:** Rampura Village, Srirangapatna Taluk, Mandya District – 571427, Karnataka.
- **Guidance:** Pancharatra Agama Praveena Vidwan **Sri B.R. Gopal Bhattar**, Bengaluru.
- **Organized by — Devatha Family:** Smt. D.K. Sathyavathi & Sri D.R. Krishna Prasad.
- **With respectful regards — Devatha Family:** D.R. Krishna Prasad · D.K. Sathyavathi · D.K. Pranav · M.I Srisha · D.P. Takshvi · D.K. Ramitha.
- **Maha Annadana** follows the ceremonies. Invocation: *Sri Rama Jayam* + the Hanuman sloka (already on the site).
- Closing line: *"Entire Rampura Gramastharu and All Devotees."*

> Spelling: standardize to the site's existing convention **"Vidya Hayagreeva"** (invite reads "Vidhya Hayagrieva"). Keep ritual/transliteration names as printed.

### 2c. Full 3-day programme (verbatim, for `events.html`)
**Friday, 3 July 2026**
- *7:00 AM – 12:00 Noon* — Grama Pradakshina, poojas and Yagashala Pravesha, Homas, Vishvaksena Aradhana, Bhagwath Vasudeva Punyahavachana, Panchagavya Aradhana Snapana, Gruha Snapana, Mruthrika Snapana, Jaladivasa, Maha Mangalarthi, Theertha Prasada Viniyoga.
- *4:00 PM – 8:30 PM* — Vishvaksena Aradhane, Vasudeva Punyahavachana, Raksha Bandhana, Acharya Ruthvika Varana, Mrutha Sangrahana, Ankurarpana, Dwararadhana, Soma Kumbaradhana, Ankurarpananga Homa, Manonmana, Pramana Shanthi Homa, Alayavasthu Homa, Kalashadivasa, Dhanyadivasa, Maha Mangalarathi, Theertha Prasada Viniyoga.

**Saturday, 4 July 2026**
- *7:00 AM – 1:30 PM* — Vishvaksena Aradhane, Punyahavachana, Devatha Ahavana, Yagashala Pravesha, Dwararadhana, Soma Kumbaradhana, Kalasaradhana, Panchasuktha Parayana, Navahnika Poorvaka Agni Prathishta, Nitya Homa, Murthy Homa, Rama Tharaka Homa, Paanchasuktha Havana, Sakruth Purnahuthi, Maha Mangalarathi, Theertha Prasada Viniyoga.
- *4:00 PM – 8:30 PM* — Vishvaksena Aradhane, Punyahavachana, Chatursthana archana, Jeevadhi Thatvanyasa Homa, Kalasamyojananga Homa, Sakruth Purnahuthi, Pushpadivasa, Phaladivasa, Ashtavadhana Seve, Maha Mangalarathi, Theertha Prasada viniyoga.

**Sunday, 5 July 2026** (*4:30 AM – 11:30 AM*)
- 6:15 AM — Kumbodvasana
- 7:00 AM — Vimana Gopura Kumbabhisheka
- 7:45 AM — Sri Anjaneya Swamy & Vidya Hayagreeva Swamy **Prana Prathishte**
- 9:30 AM — Panchamrutha Abhisheka
- 11:30 AM — Thirupavada seva, Doopa Deepa, Mantra Pushpa, Mahanivedhana
- 12:00 Noon — Maha Mangalarathi, Shathumarai, Theertha Prasada viniyoga, Rashtra Ashirvadha, then **Anna Dhana**
- 6:30 PM onwards — **Rathothsavam** inside the village

---

## 3. Page-by-page changes

### 3a. Navigation (`assets/js/main.js`)
Add one item to the `NAV` array, after "Vidya Hayagreeva":
```js
{ href: "sevas.html", label: "Sevas & Parihara", kn: "ಸೇವೆ ಮತ್ತು ಪರಿಹಾರ" },
```
Nav now has 9 items — verify it still fits / wraps gracefully on mobile (it already uses a mobile menu).

### 3b. Home — `index.html` (event-first)
New sections, in order, **above** the existing content. Each event-window section is marked
`data-event-window` so it auto-hides after the festival (see §4).

1. **Announcement ribbon** (`data-event-window`) — slim full-bleed bar pinned at the very top of `<main>`, above the hero. Maroon (`bg-dark`) with brass text. Copy: *"Jeernoddhara Maha Kumbhabhishekam · July 3–5, 2026 · All devotees welcome"* + a "RSVP" link to `events.html#rsvp`. Dismissible is **not** required.
2. **Hero (updated)** — keep the existing video hero. Change the two CTA buttons to **"View the invitation"** (→ `#invitation`) and **"Plan a visit"** (→ `visit.html`). Keep the headline/quote. During the event window the eyebrow can read the festival name; after revert it falls back to the current "Sri Rampura · Est. in devotion".
3. **The invitation** (`id="invitation"`, `data-event-window`) — the centerpiece. Light/cream panel:
   - Eyebrow: "You are invited" / Kannada.
   - Display headline: **Jeernoddhara Maha Kumbhabhishekam** + sub: *Prathisthapana of Sri Vidya Hayagreeva*.
   - Meta row: dates (Jul 3–5, 2026), venue (Rampura, Srirangapatna Taluk).
   - **Live countdown** to 2026-07-03 05:30 IST (`data-countdown`).
   - Credits line: *Under the guidance of Sri B.R. Gopal Bhattar · Organized by the Devatha family.*
   - CTAs: "RSVP" (→ `events.html#rsvp`) + "Add to calendar" (Google Calendar template link) + "Full schedule" (→ `events.html`).
4. **Three-day programme teaser** (`data-event-window`) — three day-cards (Fri 3 / Sat 4 / Sun 5) with 3–4 headline items each, and a "See the full programme →" link to `events.html`. (Full detail lives on Events, not here.)
5. **The temple, reborn** (evergreen) — reconstruction photo story. Eyebrow "A village reborn"; headline *e.g.* "After a year of renewal, the temple **rises again.**" Three figures (shikhara / vimana / mandapam) + 2–3 short paragraphs. Honest framing: nearing completion for the consecration. Link to `temple.html`. **Replaces** the old text-only "Announcements" block (its 3 notices are absorbed here / into the ribbon).
6. **Sevas & Parihara** (evergreen) — 6-card grid (the §2a services 3–6 + nakshatra/rasi parihara), each with Kannada subtitle and one line. Intro ties to architecture: *"27 pillars, one for each nakshatra."* "View all sevas →" link to `sevas.html`.

Then the **existing evergreen sections continue unchanged, in current order**: Hanuman Stotra → Puranic record (1,008) → Two idols → Cardinal kshetras → Believed graces → Hayagreeva banner → Visit teaser.

Also on home:
- Add **`Event` JSON-LD** (schema.org) for the Kumbhabhishekam (name, startDate, endDate, location, description, organizer) alongside the existing `HinduTemple` block.
- Update OG/Twitter image to a reconstruction photo (`assets/img/reconstruction/recon-shikhara.jpg`).

### 3c. New page — `sevas.html` ("Sevas & Parihara")
Built from the shared page shell (header/footer include, hero band, sections). Content:
- **Hero**: "Sevas & Parihara" + Kannada, one-line intro ("What the renewed temple can now perform").
- **Six seva sections** (each: Kannada subtitle, what it is, who it is for, ritual/architectural basis):
  1. **Nakshatra Dosha Parihara** — ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರ — basis: 27 nakshatra pillars.
  2. **Rasi Dosha Parihara** — ರಾಶಿ ದೋಷ ಪರಿಹಾರ — basis: the Rasi mandapam (12 rasis).
  3. **Aksharabhyasam** — ಅಕ್ಷರಾಭ್ಯಾಸ — basis: Sri Vidya Hayagreeva, deity of learning.
  4. **Shashtipoorthi** — ಷಷ್ಟ್ಯಬ್ದಿ ಶಾಂತಿ — 60th-year shanti, by resident Veda pandits.
  5. **Bheemaratha Shanthi** — ಭೀಮರಥ ಶಾಂತಿ — 70th-year shanti.
  6. **Sahasra Kalasha Darshana** — ಸಹಸ್ರ ಕಲಶ — grand thousand-kalasha abhisheka.
- **"To arrange a seva"** CTA → `events.html#rsvp` (reuse the existing enquiry form) / temple contact email.
- Standard `<head>` meta + canonical + OG; add `sevas.html` to `sitemap.xml`.
- Kannada strings above are **drafts — flag for the user to verify** before ship.

### 3d. The Temple — `temple.html` (reconstruction + corrected architecture)
- Swap the placeholder/emergent-hosted images for the real reconstruction photos; add a building-level before/after where possible (not just the deity).
- **Resolve the existing contradiction**: the current "Hoysala-inspired pillars" card says the rashis and nakshatras are *engraved on* the pillars. Rewrite into the new, accurate framing:
  - **27 Nakshatra pillars** — the mandapam stands on 27 pillars, one per nakshatra (basis for Nakshatra Dosha Parihara).
  - **Rasi Mandapam** — a distinct mandapam for the 12 rasis (basis for Rasi Dosha Parihara).
  - Keep the three-traditions narrative (Kalinga shikhara, Hoysala-style pillars, Dravida/letters for Hayagreeva).
- Add a short "Jeernoddhara" passage and cross-links to `sevas.html`.

### 3e. Events — `events.html` (full programme)
- Replace the simplified "Vidya Hayagreeva Praana Pratishtha" entry with the **full Maha Kumbhabhishekam** entry: rename, add the complete 3-day programme (§2c) in the site's styling (day groups + time sub-groups), credits, and Maha Annadana note.
- Keep the RSVP form; update the event `<option>` to the new name.
- **Do not** use the home page's hide-semantics here — the Events page should *keep* the festival as a record. After Jul 5 it moves from "Upcoming" to "Past observances" (badge Featured → Past). Either flip it with a dedicated `[data-event-flip]` hook (distinct from `data-event-window`, which hides), or move it manually after the event.
- Add `Event` JSON-LD here too.

---

## 4. The auto-revert mechanism (event window)

A small addition to `assets/js/main.js`, run on DOM ready:
- **Countdown:** any `[data-countdown]` element is filled with days/hours/minutes to `2026-07-03T05:30:00+05:30`. During the event (Jul 3–5) it shows "Happening now"; after, it is hidden.
- **Window gating:** after `2026-07-06T00:00:00+05:30`, every `[data-event-window]` element gets `hidden` (or a `.is-retired` class). This retires the ribbon, invitation, programme teaser, and (optionally) flips the Events badge — with **no redeploy**.
- The home then naturally reads: hero → temple reborn → sevas → evergreen sections.

**Fallback (if we keep it dead-simple):** skip the date script and instead leave a one-line note in `README.md` / a comment to manually delete the `data-event-window` blocks after Jul 5. Recommended to keep the script — it's ~15 lines and removes a manual step — but the site must still be correct with JS disabled (event sections simply remain visible, which is acceptable).

> Timezone: all gating uses IST (Asia/Kolkata) offsets baked into the target timestamps, so it behaves correctly regardless of the visitor's local clock.

---

## 5. Architecture & conventions

- **Static, no build step.** Each page is standalone HTML including Tailwind CDN, `tw-config.js`, `styles.css`, and the `main.js` header/footer injector. New page (`sevas.html`) copies an existing page's `<head>` + `#site-header`/`#site-footer` scaffold.
- **Design tokens & components:** reuse `eyebrow`, `display`, `rule`/`rule-faint`, `wrap`, `reveal` (+ `data-delay`), card/hairline-grid patterns, `bg-dark`/`bg-surface`/`bg-bg`, `btn` variants, `font-kn`. No new colors or fonts.
- **Bilingual:** every new heading/label gets a Kannada counterpart via `data-i18n-kn` or `.font-kn`, matching existing usage.
- **Voice:** Newsreader serif, reverent and restrained, with occasional orange swash-italic emphasis words (per DESIGN.md). Ritual names kept as transliterations.
- **Isolation:** the date/countdown logic is one self-contained function in `main.js`; the invitation/programme are independent sections that can be removed without affecting evergreen content.

---

## 6. Images

Import the 6 photos from `Downloads/WhatsApp Unknown 2026-06-27 at 18.44.40/` into
`assets/img/reconstruction/` (resize/compress to ~1600px wide, strip EXIF):

| Source file | Target name | Use |
|---|---|---|
| `…13.47.19.jpeg` | `recon-shikhara.jpg` | Home "reborn" + Temple; OG image |
| `…13.47.20.jpeg` | `recon-vimana.jpg` | Home "reborn" + Temple |
| `…13.47.56.jpeg` | `recon-mandapam-aerial.jpg` | Temple / gallery |
| `…13.48.56 (2).jpeg` | `recon-mandapam-front.jpg` | Home "reborn" (best straight-on) |
| `…13.48.56.jpeg` | `recon-mandapam-wide-1.jpg` | Gallery |
| `…13.48.56 (1).jpeg` | `recon-mandapam-wide-2.jpg` | Gallery |

Add a "Reconstruction 2026" set to `gallery.html` as well. Alt text describes each structure.

---

## 7. Testing & verification

- Load every changed page (home, sevas, temple, events) at desktop **and** mobile widths; screenshot.
- Verify the new **Sevas & Parihara** nav link appears, highlights as active on `sevas.html`, and the mobile menu still works with 9 items.
- Verify the **countdown** renders a sane value and the **event-window** sections show now and hide when the clock is past Jul 6 (test by temporarily overriding the target date).
- Confirm all 6 images load, are reasonably sized, and have alt text.
- Confirm Kannada renders (Noto Serif Kannada) on the new strings.
- Validate the `Event` JSON-LD (Rich Results test) and that `sitemap.xml` includes `sevas.html`.
- Sanity-check copy for the festival name spelling and that no organizer name is misspelled.

---

## 8. Open assumptions (confirm during review)
1. **Kannada strings** for the sevas are AI-drafted and need a native check before ship.
2. **27 nakshatra pillars** and the **Rasi mandapam** are two *distinct* structures (the granite pillared mandapam in the photos = the nakshatra mandapam). If they're actually one structure, §3d/§3c copy merges.
3. **RSVP** stays client-side only (no backend). If real registrations are needed, that's a separate follow-up (e.g. Formspree/Google Form).
4. Festival start time for the countdown taken as **05:30 IST, Jul 3** (first listed slot is 7:00 AM Fri; 5:30 is the temple's daily opening — adjust if you prefer 7:00).

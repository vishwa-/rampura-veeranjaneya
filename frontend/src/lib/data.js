// Static site data — temple, village, events, gallery.
export const IMG = {
  idolBare:
    "https://customer-assets.emergentagent.com/job_11c1ff37-f42f-48a5-b205-d3a805274ed1/artifacts/srkbcdol_WhatsApp%20Image%202026-06-16%20at%2019.48.04.jpeg",
  idolAdornedFrontal:
    "https://customer-assets.emergentagent.com/job_11c1ff37-f42f-48a5-b205-d3a805274ed1/artifacts/apk0cj8h_WhatsApp%20Image%202026-06-16%20at%2019.48.04%20%281%29.jpeg",
  idolAdornedAngled:
    "https://customer-assets.emergentagent.com/job_11c1ff37-f42f-48a5-b205-d3a805274ed1/artifacts/29zrftbp_WhatsApp%20Image%202026-06-16%20at%2019.48.04%20%282%29.jpeg",
  sugarcane:
    "https://images.pexels.com/photos/6375444/pexels-photo-6375444.jpeg",
  lamp:
    "https://images.pexels.com/photos/33360798/pexels-photo-33360798.jpeg",
};

export const TEMPLE_MAP_URL = "https://maps.app.goo.gl/tWHVdopyxEoxi8ZCA";
export const TEMPLE_MAP_EMBED =
  "https://www.google.com/maps?q=Rampura+near+Srirangapatna+Mandya+Karnataka&output=embed";

export const EVENTS = [
  {
    id: "praana-pratishtha-2026",
    title: "Vidya Hayagreeva Praana Pratishtha",
    titleKn: "ವಿದ್ಯಾ ಹಯಗ್ರೀವ ಪ್ರಾಣ ಪ್ರತಿಷ್ಠೆ",
    date: "2026-02-14",
    dateLabel: "February 14 – 16, 2026",
    time: "5:30 AM onwards",
    description:
      "Three-day consecration of the new Vidya Hayagreeva shrine. Homas, abhisheka, processions and annadana for all devotees.",
    rsvp: true,
    featured: true,
  },
  {
    id: "hanuman-jayanti-2026",
    title: "Hanuman Jayanti — Anjaneya Utsava",
    titleKn: "ಹನುಮ ಜಯಂತಿ — ಆಂಜನೇಯ ಉತ್ಸವ",
    date: "2026-04-23",
    dateLabel: "April 23, 2026",
    time: "Sunrise to Moonrise",
    description:
      "Special abhisheka to the Narthaki Anjaneya, sundara kanda parayana, and a community feast under the banyan.",
    rsvp: true,
  },
  {
    id: "cauvery-pushkarani-2026",
    title: "Cauvery Pushkarani Snana",
    titleKn: "ಕಾವೇರಿ ಪುಷ್ಕರಣಿ ಸ್ನಾನ",
    date: "2026-08-18",
    dateLabel: "August 18, 2026",
    time: "Pre-dawn",
    description:
      "Pre-dawn river bath at the Cauvery near Srirangapatna followed by tarpana and a walk back to the temple for archana.",
    rsvp: true,
  },
  {
    id: "navaratri-2026",
    title: "Sharad Navaratri at the Shrine",
    titleKn: "ಶರನ್ನವರಾತ್ರಿ",
    date: "2026-10-10",
    dateLabel: "October 10 – 18, 2026",
    time: "Nightly 6:30 PM",
    description:
      "Nine evenings of alankara, classical music kacheris, and Vidya Hayagreeva archana for students sitting for exams.",
    rsvp: true,
  },
];

export const ANNOUNCEMENTS = [
  {
    id: "a1",
    label: "Shrine Update",
    text: "Vidya Hayagreeva idol has arrived at Rampura. Daily darshan from 6 AM.",
  },
  {
    id: "a2",
    label: "Seva",
    text: "Sankalpa & nama-archana can be requested at the temple office between 7–11 AM.",
  },
  {
    id: "a3",
    label: "Travel",
    text: "Direct auto/taxi from Srirangapatna (8 km) and Mysore (22 km). Free parking on temple grounds.",
  },
];

export const TIMINGS = [
  { label: "Suprabhata & Abhisheka", time: "5:30 — 7:00 AM" },
  { label: "Morning Darshan", time: "7:00 — 11:30 AM" },
  { label: "Madhyahnika", time: "12:00 — 12:30 PM" },
  { label: "Afternoon Rest", time: "12:30 — 4:30 PM" },
  { label: "Evening Deeparadhana", time: "6:00 — 8:30 PM" },
];

export const NAV_LINKS = [
  { to: "/", label: "Home", kn: "ಮುಖಪುಟ" },
  { to: "/rampura", label: "Rampura", kn: "ರಾಂಪುರ" },
  { to: "/temple", label: "The Temple", kn: "ದೇವಸ್ಥಾನ" },
  { to: "/hayagreeva", label: "Vidya Hayagreeva", kn: "ವಿದ್ಯಾ ಹಯಗ್ರೀವ" },
  { to: "/gallery", label: "Gallery", kn: "ಚಿತ್ರ ಮಾಲಿಕೆ" },
  { to: "/events", label: "Events", kn: "ಉತ್ಸವಗಳು" },
  { to: "/visit", label: "Visit", kn: "ಭೇಟಿ" },
];

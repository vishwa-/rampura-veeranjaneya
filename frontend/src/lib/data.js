// Static site data — temple, village, events, gallery.
export const TEMPLE_NAME = "Sri Balanjaneya Swamy Temple";
export const TEMPLE_NAME_KN = "ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ";

export const IMG = {
  idolBare:
    "https://customer-assets.emergentagent.com/job_11c1ff37-f42f-48a5-b205-d3a805274ed1/artifacts/srkbcdol_WhatsApp%20Image%202026-06-16%20at%2019.48.04.jpeg",
  idolAdornedFrontal:
    "https://customer-assets.emergentagent.com/job_11c1ff37-f42f-48a5-b205-d3a805274ed1/artifacts/apk0cj8h_WhatsApp%20Image%202026-06-16%20at%2019.48.04%20%281%29.jpeg",
  idolAdornedAngled:
    "https://customer-assets.emergentagent.com/job_11c1ff37-f42f-48a5-b205-d3a805274ed1/artifacts/29zrftbp_WhatsApp%20Image%202026-06-16%20at%2019.48.04%20%282%29.jpeg",
  tilak:
    "https://customer-assets.emergentagent.com/job_cauvery-heritage/artifacts/9q9loowv_pngtree-shree-ram-tilak-balaji-hanuman-png-image_9072723.png",
  // Cauvery river — Srirangapatna context
  cauvery:
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1600&q=80&auto=format&fit=crop",
  // Sugarcane fields
  sugarcane:
    "https://images.pexels.com/photos/6375444/pexels-photo-6375444.jpeg",
  // South Indian brass lamp
  lamp:
    "https://images.pexels.com/photos/33360798/pexels-photo-33360798.jpeg",
  // Ancient stone temple — Karnataka
  templeStone:
    "https://images.unsplash.com/photo-1582656870490-30b5f5cf0d99?w=1600&q=80&auto=format&fit=crop",
  // Mandala / ornament
  mandala:
    "https://images.unsplash.com/photo-1604918831780-3a4d76b6e88a?w=1200&q=80&auto=format&fit=crop",
};

export const TEMPLE_MAP_URL = "https://maps.app.goo.gl/tWHVdopyxEoxi8ZCA";
export const TEMPLE_MAP_EMBED =
  "https://www.google.com/maps?q=Rampura+near+Srirangapatna+Mandya+Karnataka+571427&output=embed";

export const TEMPLE_ADDRESS = {
  line1: "Rampura village, Srirangapatna Taluk",
  line2: "Mandya District, Karnataka — 571427",
  trust: "Devatha Rampura Anjaneyaswamy Trust",
  email: "info@rampura.in",
  web: "www.rampura.in",
};

// Hanuman Stotra (Manojavam) — invocation
export const HANUMAN_STOTRA = {
  kn: [
    "ಮನೋಜವಂ ಮಾರುತ ತುಲ್ಯ ವೇಗಂ ।",
    "ಜಿತೇಂದ್ರಿಯಂ ಬುದ್ಧಿ ಮತಾಂವರಿಷ್ಠಂ ॥",
    "ವಾತಾತ್ಮಜಂ ವಾನರ ಯೂಥಮುಖ್ಯಂ ।",
    "ಶ್ರೀರಾಮದೂತಂ ಶಿರಸಾ ನಮಾಮಿ ॥",
  ],
  en:
    "Swift as the mind, equal in speed to the wind, master of the senses, foremost among the wise — son of the wind-god, chief of the vanara host, the messenger of Sri Rama — to him I bow my head.",
};

// Four cardinal kshetras around Rampura
export const CARDINAL_KSHETRAS = [
  {
    dir: "East",
    kn: "ಪೂರ್ವ",
    place: "Sri Ranganatha Kshetra",
    placeKn: "ಶ್ರೀರಂಗನಾಥ ಕ್ಷೇತ್ರ",
    note: "Srirangapatna — the sacred island shrine of Sri Ranganatha.",
  },
  {
    dir: "West",
    kn: "ಪಶ್ಚಿಮ",
    place: "Chamundeshwari Hill",
    placeKn: "ಚಾಮುಂಡೇಶ್ವರಿ ಬೆಟ್ಟ",
    note: "Mysuru — the hill that dispels all fear (sarva-bhaya nivarana).",
  },
  {
    dir: "South",
    kn: "ದಕ್ಷಿಣ",
    place: "Gunjalakshmi Narasimha",
    placeKn: "ಗುಂಜಲಕ್ಷ್ಮೀ ನರಸಿಂಹ",
    note: "T. Narasipura — at the Tirumakudalu confluence of three rivers.",
  },
  {
    dir: "North",
    kn: "ಉತ್ತರ",
    place: "Bhu-Varaha Kshetra",
    placeKn: "ಭೂ ವರಹ ಕ್ಷೇತ್ರ",
    note: "The earth-restoring boar incarnation of Vishnu.",
  },
];

// The two Anjaneya idols
export const TWO_IDOLS = [
  {
    name: "Dodda Anjaneya",
    nameKn: "ದೊಡ್ಡ ಆಂಜನೇಯ",
    height: "~ 9 feet",
    descr:
      "The Great Anjaneya — towering, north-facing, in abhaya mudra. A bell hangs at the tip of his tail — a sign that Sage Gautama once walked here.",
  },
  {
    name: "Balanjaneya",
    nameKn: "ಬಾಲಾಂಜನೇಯ",
    height: "~ 6 feet",
    descr:
      "The Child Anjaneya — pointing to the rashi chakra, warding off all afflictions of the Sun and the Navagraha. At his feet lies the Kālapurusha himself.",
  },
];

// Believed blessings
export const BLESSINGS = [
  {
    kn: "ಸತ್ಸಂತಾನ",
    en: "Good progeny",
    note: "Couples praying for healthy, virtuous children.",
  },
  {
    kn: "ಉದ್ಯೋಗ",
    en: "Employment",
    note: "Removing obstacles in career and livelihood.",
  },
  {
    kn: "ವಿವಾಹ ಭಾಗ್ಯ",
    en: "Marriage fortune",
    note: "Resolving delays and difficulties in marriage.",
  },
  {
    kn: "ಬಾಲರೋಗ ನಿವಾರಣೆ",
    en: "Childhood ailments",
    note: "The abhisheka tirtha is said to cure childhood diseases.",
  },
  {
    kn: "ಶನಿ ದೋಷ",
    en: "Shani / Navagraha dosha",
    note: "Relief from the afflictions of Saturn and the nine planets.",
  },
  {
    kn: "ಅಪಮೃತ್ಯು ನಿವಾರಣೆ",
    en: "Against untimely death",
    note: "Because the Kālapurusha lies at the Swamy's feet.",
  },
];

export const EVENTS = [
  {
    id: "praana-pratishtha-2026",
    title: "Vidya Hayagreeva Praana Pratishtha",
    titleKn: "ವಿದ್ಯಾ ಹಯಗ್ರೀವ ಪ್ರಾಣ ಪ್ರತಿಷ್ಠೆ",
    date: "2026-02-14",
    dateLabel: "February 14 – 16, 2026",
    time: "5:30 AM onwards",
    description:
      "Three-day consecration of the new Vidya Hayagreeva shrine alongside the historic Balanjaneya garbhagudi. Homas, abhisheka, processions and annadana.",
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
      "Special abhisheka to Dodda Anjaneya and Balanjaneya, sundara kanda parayana, and a community feast under the banyan.",
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
    label: "Renovation",
    text: "Jīrnōddhāra of the historic Balanjaneya garbhagudi was completed in March 2022.",
  },
  {
    id: "a2",
    label: "New Shrine",
    text: "Vidya Hayagreeva idol — carved by sculptor Adithya yogiraj — has arrived at Rampura.",
  },
  {
    id: "a3",
    label: "Darshan",
    text: "Open daily from 5:30 AM. Direct auto/taxi from Srirangapatna (8 km) and Mysore (22 km).",
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
  { to: "/mantra", label: "Rama Mantra", kn: "ರಾಮ ಮಂತ್ರ" },
  { to: "/gallery", label: "Gallery", kn: "ಚಿತ್ರ ಮಾಲಿಕೆ" },
  { to: "/events", label: "Events", kn: "ಉತ್ಸವಗಳು" },
  { to: "/visit", label: "Visit", kn: "ಭೇಟಿ" },
];

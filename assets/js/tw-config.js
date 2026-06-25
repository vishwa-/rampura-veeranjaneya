/* Tailwind Play CDN config — mapped to the Viranjanaya Swamy design system
   ("AxisFlow" warm reskin): cream surfaces, warm ink, coral-orange accent,
   sand hairlines, warm-charcoal dark sections. Newsreader + Hanken Grotesk. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        bg: "#FCFBF8",          /* surface-raised — warm white */
        surface: "#F4F1EA",     /* cream-100 — alt sections */
        sunken: "#ECE8DF",      /* cream-200 */
        ink: "#1A1815",         /* ink-900 — text / strong */
        "ink-strong": "#000000",
        muted: "#6B655C",       /* ink-600 — secondary text */
        line: "#E4DED3",        /* sand-300 — hairline */
        "line-strong": "#CFC8BB",
        accent: "#EE5A2A",      /* kumkum-500 — coral orange */
        "accent-hover": "#D8481C",
        "accent-deep": "#B83C18",
        saffron: "#F0793C",
        brass: "#A89F90",
        dark: "#1A1714",        /* maroon-900 — dark section */
        "dark-surface": "#2A2622",
        "dark-line": "rgba(255,255,255,0.16)",
        "dark-text": "#FBFAF6", /* cream-50 */
        "dark-muted": "#CFC8BC",
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Newsreader"', "Georgia", "serif"],
        serif: ['"Newsreader"', "Georgia", "serif"],
        kn: ['"Noto Serif Kannada"', "Georgia", "serif"],
        deva: ['"Mukta"', "sans-serif"],
      },
      maxWidth: { container: "1180px" },
      borderRadius: { DEFAULT: "9px", xs: "4px", sm: "9px", md: "14px", lg: "20px" },
      boxShadow: {
        xs: "0 1px 2px rgba(20,18,15,0.05)",
        sm: "0 2px 10px rgba(20,18,15,0.06)",
        md: "0 12px 32px rgba(20,18,15,0.08)",
        lg: "0 26px 64px rgba(20,18,15,0.12)",
      },
    },
  },
};

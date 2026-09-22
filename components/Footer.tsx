"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";

const SITE = {
  trust: "Devatha Rampura Anjaneyaswamy Trust",
  email: "info@rampura.in",
  mapUrl: "https://maps.app.goo.gl/99MbtNqZjRXX6s2n8",
  mapDir: "https://www.google.com/maps/dir/?api=1&destination=12.4381665,76.6725361",
  mapEmbed: "https://maps.google.com/maps?q=12.4381665,76.6725361&z=16&output=embed",
  addr1: "Rampura village, Srirangapatna Taluk",
  addr2: "Mandya District, Karnataka – 571427",
};

const PAGES = [
  { href: "/", label: "Home", kn: "ಮುಖಪುಟ" },
  { href: "/temple", label: "The Temple", kn: "ದೇವಸ್ಥಾನ" },
  { href: "/hayagreeva", label: "Vidya Hayagreeva", kn: "ವಿದ್ಯಾ ಹಯಗ್ರೀವ" },
  { href: "/rampura", label: "The Village of Rampura", kn: "ರಾಂಪುರ ಗ್ರಾಮ" },
  { href: "/mantra", label: "Rama Mantra", kn: "ರಾಮ ಮಂತ್ರ" },
  { href: "/sevas", label: "Sevas & Booking", kn: "ಸೇವೆ ಮತ್ತು ಬುಕಿಂಗ್" },
  { href: "/events", label: "Events", kn: "ಉತ್ಸವಗಳು" },
  { href: "/gallery", label: "Gallery", kn: "ಚಿತ್ರ ಮಾಲಿಕೆ" },
  { href: "/visit", label: "Visit", kn: "ಭೇಟಿ" },
];

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const bandRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!bandRef.current) return;
        const rect = bandRef.current.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const calculatedOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
        setOffset(calculatedOffset);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <footer
      ref={bandRef}
      id="chantBand"
      style={{
        background: "var(--maroon-900)",
        color: "var(--text-on-dark-dim)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Watermark Parallax Chant Band */}
      <div aria-hidden="true" className="font-deva footer-wm">
        <span
          id="chantJai"
          style={{
            display: "inline-block",
            transform: `translate3d(${offset * -160}px, ${-90 + offset * 120}px, 0) rotate(${offset * -3}deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          जय
        </span>{" "}
        <span
          id="chantMantra"
          style={{
            display: "inline-block",
            transform: `translate3d(0, ${offset * 40}px, 0)`,
            transition: "transform 0.1s linear",
          }}
        >
          श्री
        </span>{" "}
        <span
          id="chantRam"
          style={{
            display: "inline-block",
            transform: `translate3d(${offset * 170}px, ${90 + offset * -120}px, 0) rotate(${offset * 3}deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          राम
        </span>
      </div>

      {/* Booking CTA Banner */}
      <div className="wrap" style={{ position: "relative", zIndex: 1, paddingTop: "2.75rem" }}>
        <Link
          href="/sevas#book"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem 2rem",
            flexWrap: "wrap",
            background: "#15110F",
            border: "1px solid var(--border-on-dark)",
            borderRadius: "var(--radius-lg)",
            padding: "1.4rem clamp(1.25rem, 3vw, 2rem)",
            textDecoration: "none",
          }}
        >
          <span style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
            <span className="eyebrow" style={{ color: "var(--accent-primary)" }}>
              {t("Online booking", "ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್")}
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)", color: "var(--cream-50)", lineHeight: 1.3 }}>
              {t("Book a pooja online · confirmation on WhatsApp.", "ಪೂಜೆಯನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ · ದೃಢೀಕರಣ ವಾಟ್ಸ್‌ಆ್ಯಪ್‌ನಲ್ಲಿ.")}
            </span>
          </span>
          <span className="btn btn-light" style={{ whiteSpace: "nowrap" }}>
            {t("Book a Pooja →", "ಪೂಜೆ ಬುಕ್ ಮಾಡಿ →")}
          </span>
        </Link>
      </div>

      {/* Main Footer Info & Map */}
      <div className="wrap" style={{ position: "relative", zIndex: 1, paddingTop: "3.25rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow" style={{ color: "var(--brass-300)" }}>
              {t("Find us", "ನಮ್ಮನ್ನು ಹುಡುಕಿ")}
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--cream-50)", margin: "1rem 0 0", lineHeight: 1.12 }}>
              {t("Visit the Devasthanam", "ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ ನೀಡಿ")}
            </h2>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.7, color: "var(--text-on-dark-dim)", marginTop: "1rem", maxWidth: "40ch" }}>
              {t(
                `${SITE.addr1}, ${SITE.addr2}. Open all days, 5:30 AM – 8:30 PM. Free entry, direct auto-taxi from Srirangapatna (8 km) and Mysuru (22 km).`,
                "ರಾಂಪುರ ಗ್ರಾಮ, ಶ್ರೀರಂಗಪಟ್ಟಣ ತಾಲ್ಲೂಕು, ಮಂಡ್ಯ ಜಿಲ್ಲೆ – 571427. ಎಲ್ಲಾ ದಿನವೂ ತೆರೆದಿರುತ್ತದೆ, ಬೆಳಿಗ್ಗೆ 5:30 – ರಾತ್ರಿ 8:30. ಉಚಿತ ಪ್ರವೇಶ, ಶ್ರೀರಂಗಪಟ್ಟಣ (8 ಕಿ.ಮೀ) ಮತ್ತು ಮೈಸೂರಿನಿಂದ (22 ಕಿ.ಮೀ) ನೇರ ಆಟೋ-ಟ್ಯಾಕ್ಸಿ."
              )}
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginTop: "1.75rem" }}>
              <a href={SITE.mapDir} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t("Get Directions", "ದಾರಿ ಪಡೆಯಿರಿ")}</span>
              </a>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
                {t("Open in Google Maps", "Google ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ")}
              </a>
            </div>
          </div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-on-dark)", boxShadow: "var(--shadow-lg)" }}>
            <iframe
              title="Rampura Kubera Anjaneyaswamy temple location"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ width: "100%", height: 330, border: 0, display: "block" }}
            ></iframe>
          </div>
        </div>
        <div style={{ height: 1, background: "var(--border-on-dark)", marginTop: "4rem" }}></div>
      </div>

      {/* Grid Links */}
      <div className="wrap" style={{ position: "relative", zIndex: 1, paddingTop: "3rem", paddingBottom: "2.5rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/brand/tilak-mark.svg" alt="" style={{ width: 34 }} />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 20, color: "var(--cream-50)" }}>
                {t("Kubera Anjaneyaswamy", "ಕುಬೇರ ಆಂಜನೇಯಸ್ವಾಮಿ")}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.7, maxWidth: "34ch", color: "var(--text-on-dark-dim)" }}>
              {t(
                "An ancient kshetra on the banks of the Cauvery, near Mysuru and Srirangapatna, said to be one of the 1,008 Hanumans consecrated by Sri Vyasaraja.",
                "ಕಾವೇರಿ ತೀರದ, ಮೈಸೂರು ಮತ್ತು ಶ್ರೀರಂಗಪಟ್ಟಣದ ಸಮೀಪದ ಪುರಾತನ ಕ್ಷೇತ್ರ, ಶ್ರೀ ವ್ಯಾಸರಾಜರು ಪ್ರತಿಷ್ಠಾಪಿಸಿದ 1,008 ಆಂಜನೇಯರಲ್ಲಿ ಒಂದು ಎಂದು ಹೇಳಲಾಗುತ್ತದೆ."
              )}
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "var(--brass-300)", marginBottom: "1rem" }}>
              {t("Visit", "ಭೇಟಿ")}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".5rem", fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--text-on-dark-dim)" }}>
              <li>{t(SITE.addr1, "ರಾಂಪುರ ಗ್ರಾಮ, ಶ್ರೀರಂಗಪಟ್ಟಣ ತಾಲ್ಲೂಕು")}</li>
              <li>{t(SITE.addr2, "ಮಂಡ್ಯ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ – 571427")}</li>
              <li>{t("Open daily 5:30 AM – 8:30 PM", "ಎಲ್ಲಾ ದಿನವೂ ಬೆಳಿಗ್ಗೆ 5:30 – ರಾತ್ರಿ 8:30 ತೆರೆದಿರುತ್ತದೆ")}</li>
              <li>
                <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-on-dark-dim)" }}>
                  {t("Open on Google Maps", "Google ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ")}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} style={{ color: "var(--text-on-dark-dim)" }}>
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "var(--brass-300)", marginBottom: "1rem" }}>
              {t("Pages", "ಪುಟಗಳು")}
            </div>
            <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem" }}>
              {PAGES.map((l, idx) => (
                <li key={idx}>
                  <Link href={l.href} style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--text-on-dark-dim)", textDecoration: "none" }}>
                    {t(l.label, l.kn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "var(--brass-300)", marginBottom: "1rem" }}>
              {t("Devasthanam", "ದೇವಸ್ಥಾನ")}
            </div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.7, color: "var(--text-on-dark-dim)" }}>
              {t(
                `${SITE.trust}. Open all days · free entry. Seva sankalpa at the temple office, 7–11 AM.`,
                "ದೇವತಾ ರಾಂಪುರ ಆಂಜನೇಯಸ್ವಾಮಿ ಟ್ರಸ್ಟ್. ಎಲ್ಲಾ ದಿನವೂ ತೆರೆದಿರುತ್ತದೆ · ಉಚಿತ ಪ್ರವೇಶ. ಸೇವಾ ಸಂಕಲ್ಪಕ್ಕೆ ದೇವಸ್ಥಾನದ ಕಚೇರಿಯಲ್ಲಿ ಬೆಳಿಗ್ಗೆ 7–11."
              )}
            </p>
            <ul style={{ listStyle: "none", marginTop: ".9rem", display: "flex", flexDirection: "column", gap: ".4rem", fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--text-on-dark-dim)" }}>
              <li>
                {t("Abhishek Bhattar (Purohit) · ", "ಅಭಿಷೇಕ್ ಭಟ್ಟರ್ (ಪುರೋಹಿತರು) · ")}
                <a href="tel:+919901883375" className="tabular-nums" style={{ color: "var(--cream-50)" }}>+91 99018 83375</a>
              </li>
              <li>
                {t("Kiran Kashyap (Purohit) · ", "ಕಿರಣ್ ಕಶ್ಯಪ್ (ಪುರೋಹಿತರು) · ")}
                <a href="tel:+918310395780" className="tabular-nums" style={{ color: "var(--cream-50)" }}>+91 83103 95780</a>
              </li>
              <li>
                {t("Gururaju · ", "ಗುರುರಾಜು · ")}
                <a href="tel:+919620636465" className="tabular-nums" style={{ color: "var(--cream-50)" }}>+91 96206 36465</a>
              </li>
              <li>
                {t("Mahadev · ", "ಮಹದೇವ್ · ")}
                <a href="tel:+919164891591" className="tabular-nums" style={{ color: "var(--cream-50)" }}>+91 91648 91591</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Policy & Information Links */}
        <div style={{ borderTop: "1px solid var(--border-on-dark)", paddingTop: "1.25rem", paddingBottom: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "1.2rem 2rem", fontSize: 13, fontFamily: "var(--font-ui)" }}>
          <Link href="/about" style={{ color: "var(--text-on-dark-dim)", textDecoration: "none" }}>
            {t("About Us", "ನಮ್ಮ ಬಗ್ಗೆ")}
          </Link>
          <Link href="/contact" style={{ color: "var(--text-on-dark-dim)", textDecoration: "none" }}>
            {t("Contact", "ಸಂಪರ್ಕ")}
          </Link>
          <Link href="/privacy" style={{ color: "var(--text-on-dark-dim)", textDecoration: "none" }}>
            {t("Privacy Policy", "ಗೌಪ್ಯತಾ ನೀತಿ")}
          </Link>
          <Link href="/terms" style={{ color: "var(--text-on-dark-dim)", textDecoration: "none" }}>
            {t("Terms of Service", "ಸೇವಾ ನಿಯಮಗಳು")}
          </Link>
          <Link href="/refund" style={{ color: "var(--text-on-dark-dim)", textDecoration: "none" }}>
            {t("Refund Policy", "ಮರುಪಾವತಿ ನೀತಿ")}
          </Link>
        </div>

        <div style={{ borderTop: "1px solid var(--border-on-dark)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: ".75rem" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "var(--brass-300)" }}>
            {t("॥ Om Sri Anjaneyaya Namaha ॥", "॥ ಓಂ ಶ್ರೀ ಆಂಜನೇಯಾಯ ನಮಃ ॥")}
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink-300)" }}>
            © {new Date().getFullYear()} · {t(SITE.trust, `ದೇವತಾ ರಾಂಪುರ ಆಂಜನೇಯಸ್ವಾಮಿ ಟ್ರಸ್ಟ್`)}
          </span>
        </div>
      </div>
    </footer>
  );
};

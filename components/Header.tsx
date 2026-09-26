"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";

const SITE = {
  mapDir: "https://www.google.com/maps/dir/?api=1&destination=12.4381665,76.6725361",
};

interface NavItem {
  href: string;
  label: string;
  kn: string;
}

interface NavGroup {
  label?: string;
  kn?: string;
  href?: string;
  items?: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  { href: "/", label: "Home", kn: "ಮುಖಪುಟ" },
  {
    label: "The Kshetra",
    kn: "ಕ್ಷೇತ್ರ",
    items: [
      { href: "/temple", label: "The Temple", kn: "ದೇವಸ್ಥಾನ" },
      { href: "/hayagreeva", label: "Vidya Hayagreeva", kn: "ವಿದ್ಯಾ ಹಯಗ್ರೀವ" },
      { href: "/rampura", label: "The Village of Rampura", kn: "ರಾಂಪುರ ಗ್ರಾಮ" },
      { href: "/mantra", label: "Rama Mantra", kn: "ರಾಮ ಮಂತ್ರ" },
    ],
  },
  { href: "/sevas", label: "Sevas & Booking", kn: "ಸೇವೆ ಮತ್ತು ಬುಕಿಂಗ್" },
  { href: "/donate", label: "Donation - corpus fund", kn: "ದೇಣಿಗೆ - ಕಾರ್ಪಸ್ ಫಂಡ್" },
  { href: "/events", label: "Events", kn: "ಉತ್ಸವಗಳು" },
  { href: "/gallery", label: "Gallery", kn: "ಚಿತ್ರ ಮಾಲಿಕೆ" },
  { href: "/visit", label: "Visit", kn: "ಭೇಟಿ" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { lang, toggleLang, isKn, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`} id="siteHeader">
      <div className="wrap flex items-center justify-between gap-6" style={{ paddingTop: 14, paddingBottom: 14 }}>
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img src="/assets/brand/tilak-mark.svg" alt="" style={{ width: 30 }} />
          <span className="flex flex-col leading-none">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 19, color: "var(--ink-900)", letterSpacing: ".01em" }}>
              {t("Kubera Anjaneyaswamy", "ಕುಬೇರ ಆಂಜನೇಯಸ್ವಾಮಿ")}
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 9, letterSpacing: ".24em", textTransform: "uppercase", color: "var(--accent-primary)", marginTop: 3 }}>
              {t("Sri Kshetra Rampura", "ಶ್ರೀ ಕ್ಷೇತ್ರ ರಾಂಪುರ")}
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV_GROUPS.map((g, idx) => {
            if (!g.items) {
              const active = isActive(g.href);
              return (
                <Link
                  key={idx}
                  href={g.href!}
                  className={`nav-link px-3 py-2 rounded ${active ? "active" : ""}`}
                >
                  {t(g.label!, g.kn)}
                </Link>
              );
            }

            const inGroup = g.items.some((l) => isActive(l.href));
            const isOpen = activeDropdown === g.label;

            return (
              <div
                key={idx}
                className={`nav-drop ${isOpen ? "open" : ""}`}
                onMouseEnter={() => setActiveDropdown(g.label!)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`nav-link nav-drop-btn px-3 py-2 rounded ${inGroup ? "active" : ""}`}
                  onClick={() => setActiveDropdown(isOpen ? null : g.label!)}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  <span>{t(g.label!, g.kn)}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="nav-drop-panel" role="menu">
                  {g.items.map((l, lIdx) => (
                    <Link
                      key={lIdx}
                      href={l.href}
                      className={`nav-drop-link ${isActive(l.href) ? "active" : ""}`}
                    >
                      {t(l.label, l.kn)}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <a
            href={SITE.mapDir}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginLeft: 10, padding: ".55rem 1.1rem", fontSize: ".8rem" }}
          >
            {t("Directions", "ದಾರಿ")}
          </a>

          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            aria-label="Switch language"
            style={{ marginLeft: 10 }}
          >
            {isKn ? "English" : "ಕನ್ನಡ"}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            aria-label="Switch language"
            style={{ padding: ".34rem .72rem", fontSize: ".72rem" }}
          >
            {isKn ? "English" : "ಕನ್ನಡ"}
          </button>
          <button
            id="menuBtn"
            className="p-2 -mr-2"
            style={{ color: "var(--ink-900)" }}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div id="mobileMenu" className={`mobile-menu lg:hidden ${mobileOpen ? "open" : ""}`} style={{ background: "var(--surface-page)" }}>
        <nav className="wrap" style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }} aria-label="Mobile">
          {NAV_GROUPS.map((g, idx) => {
            if (!g.items) {
              const active = isActive(g.href);
              return (
                <Link
                  key={idx}
                  href={g.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3"
                  style={{
                    borderBottom: "1px solid var(--border-hairline)",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    color: active ? "var(--accent-primary)" : "var(--ink-900)",
                  }}
                >
                  {t(g.label!, g.kn)}
                </Link>
              );
            }

            return (
              <React.Fragment key={idx}>
                <div className="eyebrow" style={{ padding: ".9rem 0 .35rem" }}>
                  {t(g.label!, g.kn)}
                </div>
                {g.items.map((l, lIdx) => {
                  const active = isActive(l.href);
                  return (
                    <Link
                      key={lIdx}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 pl-4"
                      style={{
                        borderBottom: "1px solid var(--border-hairline)",
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        color: active ? "var(--accent-primary)" : "var(--ink-900)",
                      }}
                    >
                      {t(l.label, l.kn)}
                    </Link>
                  );
                })}
              </React.Fragment>
            );
          })}

          <a
            href={SITE.mapDir}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3"
            style={{ color: "var(--accent-primary)", fontFamily: "var(--font-ui)", fontWeight: 600 }}
          >
            {t("Get Directions on Google Maps →", "Google ನಕ್ಷೆಯಲ್ಲಿ ದಾರಿ →")}
          </a>

          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            style={{ margin: ".75rem 0" }}
          >
            {isKn ? "English" : "ಕನ್ನಡ"}
          </button>
        </nav>
      </div>
    </header>
  );
};

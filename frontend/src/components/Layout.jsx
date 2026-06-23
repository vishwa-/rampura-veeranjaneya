import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, MapPin } from "lucide-react";
import { NAV_LINKS, TEMPLE_MAP_URL, IMG, HANUMAN_STOTRA, TEMPLE_ADDRESS } from "@/lib/data";

function TilakMark({ className = "h-9 w-9" }) {
  return (
    <img
      src={IMG.tilak}
      alt="Hanuman Tilak"
      className={`${className} object-contain shrink-0`}
      style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))" }}
    />
  );
}

function BrandMark({ theme = "dark" }) {
  const isDark = theme === "dark";
  return (
    <Link to="/" data-testid="brand-link" className="flex items-center gap-3 group">
      <TilakMark />
      <span className="flex flex-col leading-none">
        <span className={`font-kannada text-[10px] sm:text-[11px] tracking-wider ${isDark ? "text-copper" : "text-marigold"}`}>
          ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
        </span>
        <span className={`font-display text-base sm:text-lg tracking-wide ${isDark ? "text-cream" : "text-deep"}`}>
          Sri Balanjaneya Swamy
          <span className="italic text-copper ml-1.5">· Rampura</span>
        </span>
      </span>
    </Link>
  );
}

// Top scrolling stotra strip
export function StotraRibbon() {
  const line = HANUMAN_STOTRA.kn.join("  ◈  ") + "  ◈  " + HANUMAN_STOTRA.en;
  return (
    <div data-testid="stotra-ribbon" className="bg-canvas-deep border-b border-warm overflow-hidden">
      <div className="flex whitespace-nowrap py-2 text-[11px]">
        <div className="marquee inline-flex shrink-0 gap-16">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-8 font-display italic text-copper tracking-wide">
              <span aria-hidden>✦</span>
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <StotraRibbon />
      <header
        data-testid="site-header"
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-canvas-deep/95 backdrop-blur-md border-b border-warm"
            : "bg-canvas-deep border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
          <BrandMark />
          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors ${
                    isActive ? "text-copper" : "text-cream/85 hover:text-copper"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="inline-flex flex-col items-center gap-0.5">
                    <span>{l.label}</span>
                    <span className={`h-px bg-copper transition-all duration-300 ${isActive ? "w-5" : "w-0"}`} />
                  </span>
                )}
              </NavLink>
            ))}
            <a
              href={TEMPLE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="header-directions-btn"
              className="ml-3 btn btn-primary"
            >
              <MapPin className="w-3.5 h-3.5" />
              Directions
            </a>
          </nav>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="xl:hidden p-2 text-cream/90"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open ? (
          <div data-testid="mobile-menu" className="xl:hidden border-t border-warm bg-canvas-deep">
            <nav className="px-5 py-4 flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `py-3 border-b border-warm last:border-b-0 flex items-baseline justify-between ${
                      isActive ? "text-copper" : "text-cream/90"
                    }`
                  }
                >
                  <span className="font-display text-lg">{l.label}</span>
                  <span className="font-kannada text-xs text-copper/80">{l.kn}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-canvas-deep border-t border-warm">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <TilakMark className="h-11 w-11" />
            <div>
              <div className="font-kannada text-copper text-xs">ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ</div>
              <div className="font-display text-lg text-cream">Sri Balanjaneya Swamy</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-cream/90 max-w-xs">
            An ancient kshetra on the banks of the Cauvery, near Mysuru and
            Srirangapatna. The historic garbhagudi was renovated in March 2022,
            and the new Vidya Hayagreeva shrine is now being installed beside it.
          </p>
        </div>
        <div>
          <h4 className="text-eyebrow text-copper mb-5">Visit</h4>
          <ul className="space-y-2 text-sm text-cream/90">
            <li>{TEMPLE_ADDRESS.line1}</li>
            <li>{TEMPLE_ADDRESS.line2}</li>
            <li>Open daily 5:30 AM — 8:30 PM</li>
            <li>
              <a href={TEMPLE_MAP_URL} target="_blank" rel="noopener noreferrer" data-testid="footer-map-link"
                 className="underline underline-offset-4 hover:text-copper">
                Open on Google Maps
              </a>
            </li>
            <li className="pt-1 text-cream/75">
              <a href={`mailto:${TEMPLE_ADDRESS.email}`} className="hover:text-copper">{TEMPLE_ADDRESS.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-eyebrow text-copper mb-5">Pages</h4>
          <ul className="space-y-2 text-sm text-cream/90">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-copper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-warm">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream/75">
          <span>© {new Date().getFullYear()} {TEMPLE_ADDRESS.trust}.</span>
          <span className="italic font-display text-copper">ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು · Jai Sri Ram</span>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }) {
  return (
    <div className="App flex flex-col min-h-screen bg-canvas-deep">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

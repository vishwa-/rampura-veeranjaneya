import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, MapPin } from "lucide-react";
import { NAV_LINKS, TEMPLE_MAP_URL, IMG, HANUMAN_STOTRA, TEMPLE_ADDRESS } from "@/lib/data";

function TilakMark({ className = "h-10 w-10" }) {
  return (
    <img
      src={IMG.tilak}
      alt="Hanuman Tilak"
      className={`${className} object-contain shrink-0`}
      style={{ filter: "drop-shadow(0 1px 1px rgba(26,20,16,0.2))" }}
    />
  );
}

// Top scrolling stotra strip — sepia ribbon
export function StotraRibbon() {
  const line = HANUMAN_STOTRA.kn.join("  ◈  ") + "  ◈  " + HANUMAN_STOTRA.en;
  return (
    <div data-testid="stotra-ribbon" className="bg-ink-deep text-cream/85 overflow-hidden border-b border-gold-old/40">
      <div className="flex whitespace-nowrap py-2 text-[11px]">
        <div className="marquee inline-flex shrink-0 gap-16">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-8 font-display italic text-gold-old tracking-wide">
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

  // Split nav for symmetric layout: left links | tilak logo | right links
  const leftNav = NAV_LINKS.slice(0, Math.ceil(NAV_LINKS.length / 2));
  const rightNav = NAV_LINKS.slice(Math.ceil(NAV_LINKS.length / 2));

  return (
    <>
      <StotraRibbon />
      <header
        data-testid="site-header"
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-paper/95 backdrop-blur-md border-b border-ink-muted/20"
            : "bg-paper border-b border-transparent"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-6">
          {/* Mobile brand mark */}
          <Link to="/" data-testid="brand-link" className="xl:hidden flex items-center gap-3">
            <TilakMark className="h-9 w-9" />
            <div className="flex flex-col leading-none">
              <span className="font-kannada text-[10px] text-crimson tracking-wider">ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ</span>
              <span className="font-display text-lg text-ink">Rampura</span>
            </div>
          </Link>

          {/* Desktop: left nav */}
          <nav className="hidden xl:flex items-center gap-7 flex-1 justify-end" aria-label="Primary-left">
            {leftNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `text-label transition-colors ${isActive ? "text-crimson" : "text-ink/80 hover:text-crimson"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop: centered Tilak + masthead */}
          <Link to="/" data-testid="brand-link-center" className="hidden xl:flex flex-col items-center group">
            <TilakMark className="h-14 w-14" />
            <div className="mt-1.5 font-display text-xs tracking-[0.3em] uppercase text-ink/90 leading-tight text-center">
              The Rampura Gazette
            </div>
            <div className="font-kannada text-[10px] text-crimson tracking-wider mt-0.5">
              ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ
            </div>
          </Link>

          {/* Desktop: right nav */}
          <nav className="hidden xl:flex items-center gap-7 flex-1" aria-label="Primary-right">
            {rightNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `text-label transition-colors ${isActive ? "text-crimson" : "text-ink/80 hover:text-crimson"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={TEMPLE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="header-directions-btn"
              className="ml-2 inline-flex items-center gap-1.5 text-label text-crimson hover:text-crimson-deep"
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
            className="xl:hidden p-2 text-ink"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <div className="hidden xl:block max-w-[1500px] mx-auto px-5 sm:px-8 pb-2">
          <div className="rule-thick" />
        </div>
        {open ? (
          <div data-testid="mobile-menu" className="xl:hidden border-t border-ink-muted/20 bg-paper">
            <nav className="px-5 py-4 flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `py-3 border-b border-ink-muted/15 last:border-b-0 flex items-baseline justify-between ${
                      isActive ? "text-crimson" : "text-ink"
                    }`
                  }
                >
                  <span className="font-display text-2xl">{l.label}</span>
                  <span className="font-kannada text-xs text-crimson/80">{l.kn}</span>
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
    <footer data-testid="site-footer" className="bg-ink-deep text-cream/95 mt-24">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <TilakMark className="h-12 w-12" />
              <div>
                <div className="font-kannada text-gold-old text-xs">ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ</div>
                <div className="font-display text-xl text-cream tracking-wide">Sri Balanjaneya Swamy</div>
              </div>
            </div>
            <p className="text-base leading-relaxed text-cream/90 max-w-xs font-body">
              An ancient kshetra on the banks of the Cauvery, near Mysuru and
              Srirangapatna — said to be one of the 1,008 Hanumans consecrated
              by Sri Vyasaraja.
            </p>
          </div>
          <div>
            <h4 className="text-label text-gold-old mb-5">Visit</h4>
            <ul className="space-y-2 text-base text-cream/90 font-body">
              <li>{TEMPLE_ADDRESS.line1}</li>
              <li>{TEMPLE_ADDRESS.line2}</li>
              <li>Open daily 5:30 AM — 8:30 PM</li>
              <li>
                <a href={TEMPLE_MAP_URL} target="_blank" rel="noopener noreferrer" data-testid="footer-map-link"
                   className="underline underline-offset-4 hover:text-gold-old">
                  Open on Google Maps
                </a>
              </li>
              <li>
                <a href={`mailto:${TEMPLE_ADDRESS.email}`} className="hover:text-gold-old">{TEMPLE_ADDRESS.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-label text-gold-old mb-5">Pages</h4>
            <ul className="space-y-2 text-base text-cream/90 font-body">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-gold-old">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/15 pt-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream/75 font-label">
          <span className="tracking-wider">© {new Date().getFullYear()} · {TEMPLE_ADDRESS.trust}</span>
          <span className="italic font-display text-gold-old text-sm">ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು  ·  Jai Sri Ram</span>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }) {
  return (
    <div className="App flex flex-col min-h-screen bg-paper">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

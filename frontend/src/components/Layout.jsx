import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, MapPin } from "lucide-react";
import { NAV_LINKS, TEMPLE_MAP_URL, IMG, HANUMAN_STOTRA } from "@/lib/data";

function TilakMark({ size = "h-10 w-10" }) {
  return (
    <span className={`relative inline-flex ${size} items-center justify-center shrink-0`}>
      <img
        src={IMG.tilak}
        alt="Hanuman Tilak"
        className="w-full h-full object-contain"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
      />
    </span>
  );
}

function BrandMark() {
  return (
    <Link to="/" data-testid="brand-link" className="flex items-center gap-3 group">
      <TilakMark />
      <span className="flex flex-col leading-none">
        <span className="font-kannada text-[10px] sm:text-[11px] text-vermillion/90 tracking-wider">
          ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
        </span>
        <span className="font-serif-sc text-base sm:text-lg text-temple-ink tracking-wider">
          Sri Balanjaneya Swamy
          <span className="text-vermillion italic font-serif-display ml-1.5 normal-case">· Rampura</span>
        </span>
      </span>
    </Link>
  );
}

// Sticky top strip showing the Hanuman stotra as a slow marquee
export function StotraStrip() {
  const line = HANUMAN_STOTRA.kn.join("  ◈  ") + "  ◈  " + HANUMAN_STOTRA.en;
  return (
    <div data-testid="stotra-strip" className="bg-deep text-jasmine/85 overflow-hidden border-b border-marigold/15">
      <div className="flex whitespace-nowrap py-2 text-[11px] tracking-wider">
        <div className="marquee-track inline-flex shrink-0 gap-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 font-serif-display italic text-marigold/90">
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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <StotraStrip />
      <header
        data-testid="site-header"
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md bg-background/85 border-b border-border/70 shadow-sm"
            : "bg-background/60 backdrop-blur-sm border-b border-transparent"
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
                  `relative px-3 py-2 text-[12px] font-medium tracking-[0.15em] uppercase transition-colors ${
                    isActive ? "text-vermillion" : "text-temple-ink/75 hover:text-vermillion"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="inline-flex flex-col items-center">
                    <span>{l.label}</span>
                    <span className={`mt-0.5 h-px bg-vermillion transition-all duration-300 ${isActive ? "w-5" : "w-0"}`} />
                  </span>
                )}
              </NavLink>
            ))}
            <a
              href={TEMPLE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="header-directions-btn"
              className="ml-3 btn-temple btn-temple-primary text-[10px]"
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
            className="xl:hidden p-2 rounded-md hover:bg-muted text-temple-ink"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open ? (
          <div data-testid="mobile-menu" className="xl:hidden border-t border-border/70 bg-background/95 backdrop-blur">
            <nav className="px-5 py-4 flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `py-3 border-b border-border/50 last:border-b-0 flex items-baseline justify-between ${
                      isActive ? "text-vermillion" : "text-temple-ink"
                    }`
                  }
                >
                  <span className="font-serif-display text-lg">{l.label}</span>
                  <span className="font-kannada text-xs text-muted-foreground">{l.kn}</span>
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
    <footer data-testid="site-footer" className="mt-28 bg-deep text-jasmine/85 relative overflow-hidden">
      {/* decorative mandala behind */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] border border-marigold rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] border border-marigold rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] border border-marigold rounded-full" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <TilakMark size="h-12 w-12" />
            <div>
              <div className="font-kannada text-marigold text-xs">ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ</div>
              <div className="font-serif-sc text-lg text-jasmine tracking-wider">Sri Balanjaneya Swamy</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-jasmine/85 max-w-xs">
            An ancient kshetra on the Cauvery, said to be one of the 1,008 Hanumans
            consecrated by Sri Vyasaraja. Renovated March 2022; now welcoming the
            new Vidya Hayagreeva shrine.
          </p>
        </div>
        <div>
          <h4 className="font-serif-sc text-marigold text-xs tracking-[0.3em] mb-4 uppercase">Visit</h4>
          <ul className="space-y-2 text-sm text-jasmine/90">
            <li>Rampura village, Srirangapatna Taluk</li>
            <li>Mandya District, Karnataka — 571427</li>
            <li>Open daily 5:30 AM — 8:30 PM</li>
            <li>
              <a href={TEMPLE_MAP_URL} target="_blank" rel="noopener noreferrer" data-testid="footer-map-link"
                 className="underline underline-offset-4 hover:text-marigold">
                Open on Google Maps
              </a>
            </li>
            <li className="pt-1">
              <span className="text-jasmine/80">info@rampura.in</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif-sc text-marigold text-xs tracking-[0.3em] mb-4 uppercase">Pages</h4>
          <ul className="space-y-2 text-sm text-jasmine/90">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-marigold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-jasmine/10 relative">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-jasmine/75">
          <span>© {new Date().getFullYear()} Devatha Rampura Anjaneyaswamy Trust.</span>
          <span className="italic font-serif-display text-marigold/80">ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು · Jai Sri Ram</span>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }) {
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

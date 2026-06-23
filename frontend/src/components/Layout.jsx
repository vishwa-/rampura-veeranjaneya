import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Flame, MapPin } from "lucide-react";
import { NAV_LINKS, TEMPLE_MAP_URL } from "@/lib/data";

function BrandMark() {
  return (
    <Link
      to="/"
      data-testid="brand-link"
      className="flex items-center gap-3 group"
    >
      <span className="relative inline-flex w-9 h-9 items-center justify-center rounded-full bg-ink text-marigold">
        <Flame className="w-4 h-4 flame" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-kannada text-[11px] sm:text-xs text-vermillion/90 tracking-wider">
          ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
        </span>
        <span className="font-serif-display text-lg sm:text-xl text-temple-ink">
          Sri Anjaneya Swamy &middot;{" "}
          <span className="italic text-vermillion">Rampura</span>
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/70"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <BrandMark />
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-vermillion"
                    : "text-temple-ink/80 hover:text-vermillion"
                }`
              }
            >
              {({ isActive }) => (
                <span className="inline-flex flex-col items-center">
                  <span>{l.label}</span>
                  <span
                    className={`mt-0.5 h-px bg-vermillion transition-all ${
                      isActive ? "w-6" : "w-0"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
          <a
            href={TEMPLE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="header-directions-btn"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-ink text-jasmine px-4 py-2 text-xs font-medium tracking-wider uppercase hover:bg-vermillion transition-colors"
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
          className="lg:hidden p-2 rounded-md hover:bg-muted text-temple-ink"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open ? (
        <div
          data-testid="mobile-menu"
          className="lg:hidden border-t border-border/70 bg-background/95 backdrop-blur"
        >
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
                <span className="font-kannada text-xs text-muted-foreground">
                  {l.kn}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="mt-24 bg-ink text-jasmine/85"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="font-kannada text-marigold text-sm mb-2">
            ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ, ರಾಂಪುರ
          </div>
          <h3 className="font-serif-display text-3xl text-jasmine mb-3">
            Sri Anjaneya Swamy Temple
          </h3>
          <p className="text-sm leading-relaxed text-jasmine/70 max-w-xs">
            A small village shrine near Mysore &amp; Srirangapatna, on the
            banks of the Cauvery — now welcoming the new Vidya Hayagreeva
            shrine.
          </p>
        </div>
        <div>
          <h4 className="uppercase tracking-[0.25em] text-xs text-marigold mb-4">
            Visit
          </h4>
          <ul className="space-y-2 text-sm text-jasmine/80">
            <li>Rampura, near Srirangapatna</li>
            <li>Mandya district, Karnataka</li>
            <li>Open daily 5:30 AM — 8:30 PM</li>
            <li>
              <a
                href={TEMPLE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-map-link"
                className="underline underline-offset-4 hover:text-marigold"
              >
                Open on Google Maps
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase tracking-[0.25em] text-xs text-marigold mb-4">
            Pages
          </h4>
          <ul className="space-y-2 text-sm text-jasmine/80">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-marigold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-jasmine/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-jasmine/60">
          <span>
            © {new Date().getFullYear()} Sri Anjaneya Swamy Temple Trust, Rampura.
          </span>
          <span className="italic font-serif-display">
            ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು
          </span>
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

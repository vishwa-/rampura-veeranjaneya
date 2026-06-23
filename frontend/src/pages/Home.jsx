import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MapPin, CalendarDays } from "lucide-react";
import { BilingualHeading, SectionDivider } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { IMG, EVENTS, ANNOUNCEMENTS } from "@/lib/data";

function Hero() {
  const featured = EVENTS.find((e) => e.featured) ?? EVENTS[0];
  return (
    <section
      data-testid="home-hero"
      className="relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-vermillion/80 mb-6">
              <Sparkles className="w-3.5 h-3.5" /> A New Shrine Rises
            </span>
          </Reveal>
          <Reveal delay={80}>
            <div className="font-kannada text-vermillion/90 text-base sm:text-lg mb-3">
              ರಾಂಪುರದ ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
            </div>
          </Reveal>
          <Reveal delay={160}>
            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-temple-ink tracking-tight">
              Where the Cauvery
              <br />
              hums an
              <span className="italic text-vermillion"> ancient mantra.</span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-7 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Tucked between Mysore and Srirangapatna, the tiny village of
              Rampura tends a small but extraordinary shrine — to{" "}
              <span className="text-temple-ink">Lord Anjaneya in his rare
              Narthaki form</span>. As we remodel the old sanctum, we welcome a
              new presence: <span className="text-temple-ink italic">Sri
              Vidya Hayagreeva</span>, carved from black Krishna shila by the
              hands that shaped Bala Rama in Ayodhya.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/events"
                data-testid="hero-events-cta"
                className="group inline-flex items-center gap-2 rounded-full bg-ink text-jasmine px-6 py-3 text-sm font-medium tracking-wide hover:bg-vermillion transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                Upcoming Pratishtha Events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/hayagreeva"
                data-testid="hero-shrine-cta"
                className="inline-flex items-center gap-2 rounded-full border border-temple-ink/30 text-temple-ink px-6 py-3 text-sm font-medium tracking-wide hover:border-vermillion hover:text-vermillion transition-colors"
              >
                Meet the new shrine
              </Link>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-12 flex items-start gap-4 border-l-2 border-vermillion/40 pl-4 max-w-md">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Next ceremony
                </div>
                <div className="font-serif-display text-xl text-temple-ink mt-1">
                  {featured.title}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {featured.dateLabel} · {featured.time}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <Reveal>
            <div
              data-testid="hero-idol-image"
              className="relative mx-auto w-full max-w-md sm:max-w-lg aspect-[3/4] arched-frame border border-border bg-ink overflow-hidden shadow-[0_30px_80px_-30px_rgba(40,20,8,0.35)]"
            >
              <img
                src={IMG.idolBare}
                alt="Sri Vidya Hayagreeva idol carved from Krishna shila"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover slow-pan"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 text-jasmine">
                <div className="font-kannada text-xs text-marigold">
                  ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ
                </div>
                <div className="font-serif-display text-2xl mt-1">
                  Sri Vidya Hayagreeva
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Announcements() {
  return (
    <section
      data-testid="home-announcements"
      className="bg-sandstone/60 border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {ANNOUNCEMENTS.map((a, i) => (
          <Reveal key={a.id} delay={i * 100}>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-vermillion">
                {a.label}
              </span>
              <p className="font-serif-display text-lg text-temple-ink leading-snug">
                {a.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section data-testid="home-intro" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative">
              <img
                src={IMG.sugarcane}
                alt="Sugarcane fields along the Cauvery near Rampura"
                className="w-full aspect-[4/5] object-cover rounded-sm shadow-md"
                loading="lazy"
              />
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-40 h-40 bg-marigold/90 -z-10" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <BilingualHeading
              kannada="ರಾಂಪುರದ ಬಗ್ಗೆ"
              english="A small village, a quiet devotion."
              size="lg"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Rampura is a tiny hamlet folded between two historic towns — Mysore
              and Srirangapatna. Its strength has never been size, but the people
              who tend its fields and its shrine. Sugarcane sways in long green
              rows. The Cauvery turns nearby. And at the centre of it all is the
              village deity — <span className="text-temple-ink">Lord
              Anjaneya in the dancing Narthaki form</span> — rarely seen
              elsewhere in the country.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-serif-display text-3xl text-vermillion">22</div>
                <div className="text-muted-foreground">km from Mysore</div>
              </div>
              <div>
                <div className="font-serif-display text-3xl text-vermillion">8</div>
                <div className="text-muted-foreground">km from Srirangapatna</div>
              </div>
              <div>
                <div className="font-serif-display text-3xl text-vermillion">∞</div>
                <div className="text-muted-foreground">years of devotion</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <Link
              to="/rampura"
              data-testid="home-about-link"
              className="mt-10 inline-flex items-center gap-2 text-vermillion hover:text-temple-ink transition-colors text-sm tracking-wider uppercase"
            >
              More about Rampura <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ShrineBanner() {
  return (
    <section
      data-testid="home-shrine-banner"
      className="bg-ink text-jasmine relative overflow-hidden"
    >
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
        <img
          src={IMG.idolAdornedFrontal}
          alt="Sri Vidya Hayagreeva adorned with garlands"
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent lg:from-ink lg:via-ink/40" />
      </div>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <span className="font-kannada text-marigold text-sm">
            ಹೊಸ ಗರ್ಭಗುಡಿ
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-jasmine mt-2 leading-[1.05]">
            A new shrine, carved by the
            <span className="italic text-marigold"> same hands that shaped Bala Rama.</span>
          </h2>
          <p className="mt-6 text-jasmine/80 leading-relaxed max-w-xl">
            Sri Vidya Hayagreeva — the horse-faced form of knowledge — has been
            sculpted from black Krishna shila by the celebrated yogiraj Adithya,
            the same hands that shaped the Bala Rama vigraha at Ayodhya. The
            idol now waits in Rampura for its praana pratishtha.
          </p>
          <Link
            to="/hayagreeva"
            data-testid="shrine-banner-cta"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-marigold text-temple-ink px-6 py-3 text-sm font-medium hover:bg-jasmine transition-colors"
          >
            Read the shrine&apos;s story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function VisitTeaser() {
  return (
    <section data-testid="home-visit-teaser" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <BilingualHeading
            kannada="ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ"
            english="Come, take a darshan."
            size="md"
          />
          <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
            The temple opens at first light. Mornings are best for abhisheka,
            evenings for the deeparadhana. Children are welcome. Footwear, as
            always, stays behind.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="border border-border rounded-sm p-6 bg-jasmine/60">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-vermillion mt-1" />
              <div>
                <div className="font-serif-display text-xl text-temple-ink">
                  Rampura village
                </div>
                <div className="text-sm text-muted-foreground">
                  Near Srirangapatna, Mandya District, Karnataka
                </div>
                <Link
                  to="/visit"
                  data-testid="home-visit-cta"
                  className="mt-4 inline-flex items-center gap-2 text-vermillion hover:text-temple-ink text-sm uppercase tracking-wider"
                >
                  Plan your visit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div data-testid="page-home">
      <Hero />
      <Announcements />
      <Introduction />
      <SectionDivider label="ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ" />
      <ShrineBanner />
      <VisitTeaser />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MapPin, CalendarDays, Compass } from "lucide-react";
import { BilingualHeading } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, LotusMedallion } from "@/components/Ornaments";
import {
  IMG,
  EVENTS,
  ANNOUNCEMENTS,
  HANUMAN_STOTRA,
  CARDINAL_KSHETRAS,
  TWO_IDOLS,
  BLESSINGS,
} from "@/lib/data";

function Hero() {
  const featured = EVENTS.find((e) => e.featured) ?? EVENTS[0];
  return (
    <section data-testid="home-hero" className="relative bg-deep text-jasmine overflow-hidden min-h-[92vh] flex items-center">
      {/* Backdrop image with slow pan */}
      <div className="absolute inset-0">
        <img
          src={IMG.idolBare}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover slow-pan opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/95 via-deep/90 to-deep" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(36, 22, 8, 0.4) 0%, hsl(24 30% 8% / 0.95) 70%)" }} />
      </div>

      {/* Rotating mandala behind */}
      <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.04]">
        <div className="absolute inset-0 spin-slow">
          <LotusMedallion className="w-full h-full" color="hsl(38, 95%, 62%)" />
        </div>
      </div>

      {/* corner flourish */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-24 h-24 text-marigold/30 hidden sm:block">
        <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.7" aria-hidden>
          <path d="M0 40 Q 20 40 20 20 Q 20 0 40 0" />
          <path d="M0 30 Q 30 30 30 0" opacity="0.55" />
          <path d="M0 22 Q 22 22 22 0" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-24 h-24 text-marigold/30 rotate-180 hidden sm:block">
        <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.7" aria-hidden>
          <path d="M0 40 Q 20 40 20 20 Q 20 0 40 0" />
          <path d="M0 30 Q 30 30 30 0" opacity="0.55" />
          <path d="M0 22 Q 22 22 22 0" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-10 py-20 sm:py-28 w-full">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-12 bg-marigold/60" />
            <span className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">
              <Sparkles className="inline w-3 h-3 mb-0.5 mr-2" />
              Jai Sri Ram
            </span>
            <span className="h-px w-12 bg-marigold/60" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="font-kannada text-marigold text-center text-base sm:text-lg mb-6 tracking-wide">
            ಶ್ರೀ ರಾಂಪುರ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h1 className="display-hero text-jasmine text-center text-[14vw] sm:text-[10vw] lg:text-[8.5rem] xl:text-[10rem] leading-[0.9] tracking-tight">
            <span className="block">Sri Balanjaneya</span>
            <span className="block italic text-marigold">Swamy <span className="text-jasmine not-italic">·</span> Rampura</span>
          </h1>
        </Reveal>
        <Reveal delay={350}>
          <p className="mt-10 text-center text-base sm:text-lg text-jasmine/75 max-w-3xl mx-auto font-serif-display italic leading-relaxed">
            “{HANUMAN_STOTRA.en}”
          </p>
        </Reveal>
        <Reveal delay={500}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/temple" data-testid="hero-temple-cta" className="btn-temple btn-temple-gold">
              The ancient kshetra
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/events" data-testid="hero-events-cta" className="btn-temple btn-temple-outline" style={{ color: "hsl(42 70% 96%)", borderColor: "hsla(42, 70%, 96%, 0.4)" }}>
              <CalendarDays className="w-3.5 h-3.5" />
              Upcoming Pratishtha
            </Link>
          </div>
        </Reveal>

        <Reveal delay={650}>
          <div className="mt-16 mx-auto max-w-md text-center border-t border-marigold/30 pt-6">
            <div className="font-serif-sc text-marigold/80 text-[10px] tracking-[0.35em] uppercase">
              Next ceremony
            </div>
            <div className="font-serif-display text-2xl text-jasmine mt-2">{featured.title}</div>
            <div className="text-sm text-jasmine/65 mt-1">{featured.dateLabel} · {featured.time}</div>
          </div>
        </Reveal>

        {/* scroll hint */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 text-[10px] tracking-[0.4em] uppercase text-jasmine/40">
          Scroll to begin
        </div>
      </div>
    </section>
  );
}

function StotraSection() {
  return (
    <section data-testid="home-stotra" className="bg-deep text-jasmine py-20 relative paper-texture overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <LotusMedallion className="w-12 h-12 mx-auto text-marigold/80" color="hsl(38, 95%, 62%)" />
        <div className="mt-5 font-serif-sc text-marigold/80 text-xs tracking-[0.4em] uppercase">
          Hanuman Stotra
        </div>
        <div className="mt-8 space-y-2 font-kannada text-jasmine/95 text-xl sm:text-2xl leading-[1.9]">
          {HANUMAN_STOTRA.kn.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <p className="mt-8 font-serif-display italic text-jasmine/65 text-base sm:text-lg leading-relaxed">
          {HANUMAN_STOTRA.en}
        </p>
      </div>
    </section>
  );
}

function Announcements() {
  return (
    <section data-testid="home-announcements" className="bg-cream/70 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {ANNOUNCEMENTS.map((a, i) => (
          <Reveal key={a.id} delay={i * 100}>
            <div className="flex gap-5">
              <div className="font-serif-display text-5xl text-vermillion/70 leading-none">0{i + 1}</div>
              <div className="flex-1">
                <span className="font-serif-sc text-[10px] uppercase tracking-[0.35em] text-vermillion">{a.label}</span>
                <p className="font-serif-display text-lg text-temple-ink leading-snug mt-1.5">{a.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PuranicReference() {
  return (
    <section data-testid="home-puranic" className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal>
            <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">
              The Puranic Record
            </div>
            <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl lg:text-7xl mt-4 leading-[0.95]">
              One of the
              <em className="text-vermillion"> one thousand and eight.</em>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 space-y-7 text-base sm:text-lg leading-[1.8] text-muted-foreground">
          <Reveal delay={100}>
            <p>
              The deity at Rampura is an <span className="text-temple-ink">ancient mūrti</span>,
              said to have been consecrated by <span className="text-temple-ink italic">Sri Vyasaraja</span>,
              the great Madhva saint of the Vijayanagara age. Tradition tells that during
              His forest exile, Sri Ramachandra Himself passed through this region via the
              Chunchāranya (Chunchanakatte) route and beheld the Kālapurusha here.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p>
              Later, Sri Vyasaraja came to Rampura and is said to have consecrated{" "}
              <span className="text-vermillion font-serif-display text-2xl">1,008</span>{" "}
              idols of Hanuman across the land. They stand to this day, scattered across
              India — <span className="text-temple-ink">this kshetra is one among them.</span>
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p>
              Doc 2 (the older Rama Japa Yajna booklet) holds another tradition — that the
              prāna-pratishthā was performed by{" "}
              <span className="text-temple-ink italic">Sri Gautama Maharshi</span>, one of
              the Sapta-Rishis, in the Pāncharātra Āgama way. The little bell at the tip
              of Anjaneya&apos;s tail is, they say, the sign that Gautama once walked here.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              The Puranas also whisper that near this very kshetra,{" "}
              <span className="text-temple-ink italic">Ahalya was released from her curse</span> —
              touched by Rama&apos;s foot, returning to herself after long stone-silence.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TwoIdols() {
  return (
    <section data-testid="home-two-idols" className="bg-deep text-jasmine py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute inset-0 spin-slow flex items-center justify-center">
          <LotusMedallion className="w-[900px] h-[900px]" color="hsl(38, 95%, 62%)" />
        </div>
      </div>
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">Two Anjaneyas</div>
            <h2 className="display-hero text-jasmine text-5xl sm:text-6xl mt-4">
              Both turned to the
              <em className="text-marigold"> north,</em>
              <br />
              both raised in <em className="text-marigold">abhaya.</em>
            </h2>
            <p className="mt-6 text-jasmine/70 leading-relaxed">
              Sri Vyasaraja did something unusual at Rampura — he set down not one, but
              two idols. Both stand facing the north, both hold the gesture of
              fearlessness; on the tail of each, a small bell.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TWO_IDOLS.map((idol, i) => (
            <Reveal key={idol.name} delay={i * 100}>
              <article className="border border-marigold/15 bg-jasmine/[0.03] backdrop-blur-sm p-8 sm:p-10 rounded-sm h-full hover:border-marigold/40 transition-colors">
                <div className="flex items-baseline justify-between mb-6">
                  <div className="font-kannada text-marigold text-sm">{idol.nameKn}</div>
                  <div className="font-serif-sc text-marigold/70 text-[10px] tracking-[0.3em] uppercase">{idol.height}</div>
                </div>
                <h3 className="display-hero text-jasmine text-4xl sm:text-5xl mb-5">{idol.name}</h3>
                <p className="text-jasmine/70 leading-relaxed">{idol.descr}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardinalKshetras() {
  return (
    <section data-testid="home-cardinal" className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 sm:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Reveal>
          <Compass className="w-7 h-7 mx-auto text-vermillion mb-4" />
          <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">A Sacred Geography</div>
          <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4">
            Surrounded by the
            <em className="text-vermillion"> four kshetras.</em>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Rampura sits on the bank of the Kaveri — and is held, on each of its four
            directions, by an ancient shrine.
          </p>
        </Reveal>
      </div>
      <div className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {CARDINAL_KSHETRAS.map((k, i) => (
            <Reveal key={k.dir} delay={i * 80}>
              <div className="bg-background p-7 sm:p-10 h-full hover:bg-sandstone/60 transition-colors group">
                <div className="font-serif-sc text-vermillion text-[10px] tracking-[0.4em] uppercase">
                  {k.dir} · {k.kn}
                </div>
                <div className="font-kannada text-vermillion/80 text-xs mt-4">{k.placeKn}</div>
                <h3 className="display-hero text-temple-ink text-3xl mt-1 leading-[1.05]">{k.place}</h3>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{k.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blessings() {
  return (
    <section data-testid="home-blessings" className="bg-sandstone/50 py-24 sm:py-32 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">Believed Graces</div>
              <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4 leading-[0.95]">
                What devotees come
                <em className="text-vermillion"> asking for.</em>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                For generations, the Swamy at Rampura has been said to grant these
                particular blessings. The abhisheka tirtha, especially, is held to relieve
                children of the doshas of Shani and the Navagrahas.
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
            {BLESSINGS.map((b, i) => (
              <Reveal key={b.en} delay={i * 60}>
                <div className="bg-background p-6 sm:p-8 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif-display text-2xl text-temple-ink">{b.en}</h3>
                    <span className="font-serif-display text-vermillion/40 text-xl">0{i + 1}</span>
                  </div>
                  <div className="font-kannada text-vermillion/80 text-sm mt-1">{b.kn}</div>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{b.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShrineBanner() {
  return (
    <section data-testid="home-shrine-banner" className="bg-deep text-jasmine relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
        <img src={IMG.idolAdornedFrontal} alt="Sri Vidya Hayagreeva adorned" className="w-full h-full object-cover opacity-90" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/75 to-transparent lg:from-deep lg:via-deep/40" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">A New Shrine</div>
          <div className="font-kannada text-marigold/80 text-sm mt-3">ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
          <h2 className="display-hero text-jasmine text-5xl sm:text-6xl lg:text-7xl mt-3 leading-[0.95]">
            Carved by the
            <em className="text-marigold"> same hands</em>
            <br />
            that shaped Bala Rama
            <br />
            <em className="text-marigold">at Ayodhya.</em>
          </h2>
          <p className="mt-7 text-jasmine/75 leading-relaxed max-w-xl">
            Beside the historic Balanjaneya garbhagudi, a new sanctum rises for
            Sri Vidya Hayagreeva — the horse-faced form of knowledge. The idol has
            been carved from black Krishna shila by yogiraj{" "}
            <em className="text-marigold">Adithya</em>, the same sculptor whose
            Bala Rama vigraha now stands in Ayodhya.
          </p>
          <Link to="/hayagreeva" data-testid="shrine-banner-cta" className="mt-10 btn-temple btn-temple-gold">
            The shrine&apos;s full story
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function VisitTeaser() {
  return (
    <section data-testid="home-visit-teaser" className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">Plan your visit</div>
          <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4 leading-[0.95]">
            Come and take a
            <em className="text-vermillion"> darshan.</em>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            The temple opens at first light. Mornings are best for abhisheka, evenings
            for deeparadhana. Children are welcome. Footwear, as always, stays behind.
          </p>
          <Link to="/visit" data-testid="home-visit-cta" className="mt-8 btn-temple btn-temple-primary">
            Directions & timings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
            <div className="absolute inset-0 arched-frame bg-deep overflow-hidden border border-border">
              <img src={IMG.idolAdornedAngled} alt="Vidya Hayagreeva, adorned" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-40 h-40 bg-marigold/90 -z-10" />
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
      <StotraSection />
      <Announcements />
      <PuranicReference />
      <OrnamentDivider label="The two idols" kn="ಎರಡು ವಿಗ್ರಹಗಳು" />
      <TwoIdols />
      <CardinalKshetras />
      <Blessings />
      <ShrineBanner />
      <VisitTeaser />
    </div>
  );
}

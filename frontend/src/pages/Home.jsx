import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Medallion, Masthead } from "@/components/Ornaments";
import {
  IMG,
  EVENTS,
  ANNOUNCEMENTS,
  HANUMAN_STOTRA,
  CARDINAL_KSHETRAS,
  TWO_IDOLS,
  BLESSINGS,
} from "@/lib/data";

// ─────────────────────────────────────────────────────────────
// Hero — Vintage Travel Poster
// ─────────────────────────────────────────────────────────────
function Hero() {
  const featured = EVENTS.find((e) => e.featured) ?? EVENTS[0];
  return (
    <section data-testid="home-hero" className="relative bg-paper overflow-hidden">
      <div className="relative max-w-[1500px] mx-auto px-5 sm:px-10 pt-10 sm:pt-14 pb-12">
        {/* Top eyebrow */}
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-terracotta" />
            <span className="text-label text-terracotta">Where Devotion Resides</span>
            <span className="h-px w-16 bg-terracotta" />
          </div>
        </Reveal>

        {/* Pre-title (SRI in small) */}
        <Reveal delay={80}>
          <div className="font-poster text-2xl sm:text-3xl text-ink text-center mt-6 tracking-[0.2em]">
            SRI
          </div>
        </Reveal>

        {/* Massive Bevan masthead */}
        <Reveal delay={140}>
          <h1 className="text-poster text-terracotta text-center leading-[0.85] whitespace-nowrap">
            Veeranjaneya
          </h1>
        </Reveal>

        {/* Post-title (SWAMY underneath) */}
        <Reveal delay={200}>
          <div className="font-poster text-3xl sm:text-4xl text-ink text-center tracking-[0.18em]">
            SWAMY
          </div>
        </Reveal>

        {/* Subtitle tagline */}
        <Reveal delay={220}>
          <div className="flex items-center justify-center gap-6 mt-2 text-label text-ink">
            <span>Village of Rampura</span>
            <span aria-hidden className="text-terracotta">◆</span>
            <span>On the Cauvery</span>
          </div>
        </Reveal>

        {/* Composition: poster scene */}
        <div className="relative mt-8 grid grid-cols-12 gap-6 items-start">
          {/* Left vertical stacked label */}
          <Reveal className="hidden lg:flex col-span-1 flex-col items-start pt-6">
            <div className="text-label-sm text-ink-muted">A VILLAGE OF</div>
            <div className="rule-thin w-7 my-3" />
            <div className="font-condensed uppercase text-ink leading-[1.05] text-2xl">
              <div>Heritage</div>
              <div>Devotion</div>
              <div>Cauvery</div>
              <div>Pride</div>
            </div>
            <div className="rule-thin w-7 my-4" />
            <Medallion className="w-7 h-7 text-terracotta" color="hsl(8 67% 40%)" />
          </Reveal>

          {/* Center hero composition with sun + photo */}
          <Reveal delay={260} className="col-span-12 lg:col-span-8 relative min-h-[480px] flex items-end justify-center pt-8">
            {/* Sun-circle */}
            <div
              className="sun-circle"
              style={{
                width: "min(70vw, 560px)",
                height: "min(70vw, 560px)",
                left: "50%",
                top: "0",
                transform: "translateX(-50%)",
                opacity: 0.85,
                zIndex: 0,
              }}
            />
            {/* Brushstrokes */}
            <span
              className="brushstroke text-sky-wash hidden md:block"
              style={{ top: "10%", right: "-2%", width: "120px", height: "260px", color: "hsl(195 28% 67%)", transform: "rotate(8deg)" }}
            />
            <span
              className="brushstroke text-gold-old hidden md:block"
              style={{ bottom: "8%", left: "0%", width: "180px", height: "60px", color: "hsl(36 47% 58%)", transform: "rotate(-3deg)" }}
            />
            {/* Photo */}
            <figure className="relative z-10 w-[78%] sm:w-[68%] photo-vignette mb-4">
              <img
                src={IMG.anjaneyaBeforeAfter}
                alt="The deity — before and after the renovation"
                className="w-full h-auto photo-sepia"
                loading="eager"
              />
            </figure>
          </Reveal>

          {/* Right ornament column */}
          <Reveal delay={300} className="hidden lg:flex col-span-3 flex-col items-end pt-12 gap-6">
            <div className="text-right">
              <div className="text-label-sm text-terracotta">Next Ceremony</div>
              <div className="rule-terracotta w-12 ml-auto my-3" />
              <div className="font-display text-2xl text-ink leading-tight">{featured.title}</div>
              <div className="text-sm text-ink-muted mt-1 italic">{featured.dateLabel}</div>
              <div className="text-sm text-ink-muted">{featured.time}</div>
            </div>
            <div className="text-right text-sm text-ink/85 font-body italic leading-[1.65] max-w-[220px]">
              “Swift as the mind, equal in speed to the wind — to him I bow my head.”
              <div className="mt-2 text-label-sm text-terracotta not-italic">— Hanuman Stotra</div>
            </div>
          </Reveal>
        </div>

        {/* Pull quote + coordinate strip — mimics the poster's footer */}
        <Reveal delay={400}>
          <div className="mt-12 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 sm:col-span-7 relative pl-10">
              <span className="absolute left-0 top-0 font-poster text-6xl text-terracotta leading-none select-none">“</span>
              <p className="font-display italic text-ink text-xl sm:text-2xl leading-[1.4] max-w-md">
                Among rocky pillars and royal legacies, <span className="text-terracotta not-italic font-condensed">Rampura</span>{" "}
                stands timeless.
              </p>
            </div>
            <div className="col-span-12 sm:col-span-5 flex flex-col items-start sm:items-end gap-3">
              <Link to="/temple" data-testid="hero-temple-cta" className="btn btn-primary">
                The Ancient Kshetra <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/events" data-testid="hero-events-cta" className="btn btn-outline-ink">
                Upcoming Pratishtha
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Bottom coordinate strip — like the poster */}
        <Reveal delay={520}>
          <div className="mt-14 border-t border-ink-muted/40 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="font-kannada text-terracotta text-sm tracking-wider">
              ಶ್ರೀ ರಾಂಪುರ ವೀರಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
            </div>
            <div className="flex items-center gap-3">
              <Medallion className="w-6 h-6 text-terracotta" color="hsl(8 67% 40%)" />
            </div>
            <div className="coords-strip flex items-center gap-3">
              <span>12.42°N</span>
              <span aria-hidden className="text-terracotta">◆</span>
              <span>76.68°E</span>
              <span aria-hidden className="text-terracotta">◆</span>
              <span>Karnataka · India</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Stotra section
// ─────────────────────────────────────────────────────────────
function StotraSection() {
  return (
    <section data-testid="home-stotra" className="bg-paper-aged border-y border-ink-muted/25 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Medallion className="w-9 h-9 mx-auto text-terracotta" color="hsl(8 67% 40%)" />
        <div className="text-label text-terracotta mt-5">Hanuman Stotra</div>
        <div className="mt-8 space-y-3 font-kannada text-ink text-xl sm:text-2xl leading-[1.95]">
          {HANUMAN_STOTRA.kn.map((line, i) => (<div key={i}>{line}</div>))}
        </div>
        <p className="mt-8 font-display italic text-ink-muted text-base sm:text-lg leading-relaxed">
          {HANUMAN_STOTRA.en}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Announcements — three-column bulletin
// ─────────────────────────────────────────────────────────────
function Announcements() {
  return (
    <section data-testid="home-announcements" className="bg-paper">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-16">
        <div className="text-center mb-10">
          <div className="text-label text-terracotta">Notices · ಪ್ರಕಟಣೆ</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-muted/25 border border-ink-muted/25">
          {ANNOUNCEMENTS.map((a, i) => (
            <Reveal key={a.id} delay={i * 100}>
              <div className="bg-paper p-8 h-full">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-poster text-3xl text-terracotta">N°{i + 1}</span>
                  <span className="text-label-sm text-ink-muted">{a.label}</span>
                </div>
                <p className="font-display text-xl text-ink leading-snug">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Puranic record
// ─────────────────────────────────────────────────────────────
function PuranicReference() {
  return (
    <section data-testid="home-puranic" className="bg-paper">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal>
            <div className="text-label text-terracotta">The Puranic Record</div>
            <h2 className="font-poster text-poster-md text-ink mt-5">
              One of the<br /><span className="text-terracotta">1,008.</span>
            </h2>
            <div className="rule-terracotta mt-7 w-16" />
          </Reveal>
        </div>
        <div className="lg:col-span-7 text-base sm:text-lg leading-[1.85] text-ink/90 space-y-6">
          <Reveal delay={100}>
            <p className="dropcap">
              The deity at Rampura is an ancient mūrti, traditionally said to
              have been consecrated by <span className="italic text-terracotta">Sri Vyasaraja</span>,
              the great Madhva saint of the Vijayanagara age.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p>
              During the forest exile, Sri Ramachandra is said to have passed
              through this region by way of Chunchanakatte, and to have beheld
              the Kālapurusha resting here. Long after, Sri Vyasaraja consecrated
              {" "}<span className="font-poster text-3xl text-terracotta align-middle">1,008</span>{" "}
              idols of Hanuman across the land. They stand to this day, scattered
              across India — and this kshetra is one among them.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p>
              A second tradition tells that the prāna-pratishthā was performed
              by <span className="italic text-terracotta">Sri Gautama Maharshi</span>,
              one of the Sapta-Rishis, in the Pāncharātra Āgama way. The little
              bell at the tip of Anjaneya&apos;s tail is, they say, the sign
              that Gautama once walked here.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              And the Puranas whisper that near this very kshetra, Ahalya was
              released from her long stone-curse — touched by Rama&apos;s foot,
              returning to herself after centuries of silence.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Two idols
// ─────────────────────────────────────────────────────────────
function TwoIdolsSection() {
  return (
    <section data-testid="home-two-idols" className="bg-paper-aged py-24 sm:py-32 border-y border-ink-muted/25">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="text-label text-terracotta">The Two Anjaneyas</div>
            <h2 className="font-poster text-poster-md text-ink mt-5">
              Both turned <span className="text-terracotta">North.</span>
            </h2>
            <p className="mt-6 text-ink-muted leading-relaxed">
              Sri Vyasaraja set down not one, but two idols at Rampura. Both face
              the north, both hold the gesture of fearlessness; each has a small
              bell at the tail.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TWO_IDOLS.map((idol, i) => (
            <Reveal key={idol.name} delay={i * 100}>
              <article className="border border-ink-muted/30 bg-paper p-10 h-full">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-kannada text-terracotta text-sm">{idol.nameKn}</div>
                  <div className="text-label-sm text-ink-muted">{idol.height}</div>
                </div>
                <div className="rule-thin mb-6" />
                <h3 className="font-poster text-3xl text-ink uppercase tracking-tight mb-5">{idol.name}</h3>
                <p className="text-ink/90 leading-[1.85] font-body">{idol.descr}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Cardinal kshetras
// ─────────────────────────────────────────────────────────────
function CardinalKshetras() {
  return (
    <section data-testid="home-cardinal" className="bg-paper py-24 sm:py-32">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <Compass className="w-7 h-7 mx-auto text-terracotta mb-4" />
            <div className="text-label text-terracotta">A Sacred Geography</div>
            <h2 className="font-poster text-poster-md text-ink mt-5">
              Held by <span className="text-terracotta">Four Kshetras.</span>
            </h2>
            <p className="mt-6 text-ink-muted leading-relaxed">
              Rampura sits on the bank of the Cauvery — held, on each of its
              four directions, by an ancient shrine.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-muted/25 border border-ink-muted/25">
          {CARDINAL_KSHETRAS.map((k, i) => (
            <Reveal key={k.dir} delay={i * 80}>
              <div className="bg-paper p-8 h-full">
                <div className="text-label-sm text-terracotta">{k.dir} · {k.kn}</div>
                <div className="font-kannada text-terracotta/80 text-xs mt-4">{k.placeKn}</div>
                <h3 className="text-display-h3 text-ink mt-1">{k.place}</h3>
                <div className="rule-thin mt-4 mb-4 w-10" />
                <p className="text-sm text-ink-muted leading-relaxed font-body">{k.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Blessings
// ─────────────────────────────────────────────────────────────
function Blessings() {
  return (
    <section data-testid="home-blessings" className="bg-paper-aged py-24 sm:py-32 border-y border-ink-muted/25">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <div className="text-label text-terracotta">Believed Graces</div>
              <h2 className="font-poster text-poster-md text-ink mt-5">
                What devotees <span className="text-terracotta">ask for.</span>
              </h2>
              <div className="rule-terracotta mt-7 w-16" />
              <p className="mt-7 text-ink-muted leading-relaxed">
                For generations, the Swamy at Rampura has been said to grant these
                particular blessings. The abhisheka tirtha, especially, is held to
                relieve children of the doshas of Saturn and the Navagrahas.
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-muted/25 border border-ink-muted/25">
            {BLESSINGS.map((b, i) => (
              <Reveal key={b.en} delay={i * 60}>
                <div className="bg-paper p-7 h-full">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="font-poster text-2xl text-terracotta">N°{i + 1}</span>
                  </div>
                  <h3 className="font-poster text-2xl text-ink uppercase tracking-tight mt-2">{b.en}</h3>
                  <div className="font-kannada text-terracotta text-sm mt-1">{b.kn}</div>
                  <p className="text-sm text-ink-muted mt-4 leading-relaxed font-body">{b.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Shrine banner — dark inversion
// ─────────────────────────────────────────────────────────────
function ShrineBanner() {
  return (
    <section data-testid="home-shrine-banner" className="bg-ink-deep text-cream relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
        <img src={IMG.hayagreevaAdornedFrontal} alt="" aria-hidden className="w-full h-full object-cover opacity-65 photo-sepia" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/85 to-ink-deep/40 lg:to-transparent" />
      </div>
      <div className="relative max-w-[1500px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="text-label text-sunburnt">A New Shrine</div>
          <div className="font-kannada text-sunburnt text-sm mt-3">ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
          <h2 className="font-poster text-poster-md text-cream mt-3">
            Carved by the
            <br />
            <span className="text-sunburnt">Same Hands</span>
            <br />
            that shaped Bala Rama.
          </h2>
          <p className="mt-6 text-cream/95 leading-[1.85] max-w-xl font-body">
            Beside the historic Doddaanjaneya garbhagudi, a new sanctum rises for
            Sri Vidya Hayagreeva — the horse-faced form of Vishnu, deity of
            learning. The idol has been carved from black Krishna shila by the
            celebrated sculptor <span className="italic text-sunburnt">Adithya yogiraj</span>,
            whose Bala Rama vigraha now stands at Ayodhya.
          </p>
          <Link to="/hayagreeva" data-testid="shrine-banner-cta" className="mt-10 btn btn-outline-cream">
            The shrine&apos;s story <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function VisitTeaser() {
  return (
    <section data-testid="home-visit-teaser" className="bg-paper py-24 sm:py-32">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="text-label text-terracotta">Plan your visit</div>
          <h2 className="font-poster text-poster-md text-ink mt-5">
            Take a <span className="text-terracotta">Darshan.</span>
          </h2>
          <p className="mt-6 text-ink/90 leading-[1.85] max-w-md font-body">
            The temple opens at first light. Mornings are best for abhisheka,
            evenings for the deeparadhana. Children are welcome. Footwear, as
            always, stays behind.
          </p>
          <Link to="/visit" data-testid="home-visit-cta" className="mt-8 btn btn-outline-ink">
            Directions & timings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <figure className="photo-vignette">
            <img
              src={IMG.templeOldPorch}
              alt="The village shrine porch"
              className="w-full aspect-[4/5] object-cover photo-sepia border border-ink-muted/30"
              loading="lazy"
            />
          </figure>
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
      <OrnamentDivider label="The Puranic Record" kn="ಪುರಾಣ" theme="light" />
      <PuranicReference />
      <TwoIdolsSection />
      <CardinalKshetras />
      <Blessings />
      <ShrineBanner />
      <VisitTeaser />
    </div>
  );
}

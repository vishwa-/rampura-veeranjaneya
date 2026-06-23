import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { BilingualHeading } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Medallion } from "@/components/Ornaments";
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
    <section data-testid="home-hero" className="relative bg-canvas-deep overflow-hidden min-h-[92vh] flex items-center">
      {/* Backdrop image */}
      <div className="absolute inset-0">
        <img
          src={IMG.anjaneyaBeforeAfter}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover slow-pan opacity-30"
        />
        <div className="absolute inset-0 bg-canvas-deep/80" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(14,11,8,0.5) 0%, rgba(14,11,8,0.95) 70%)",
          }}
        />
      </div>

      {/* Rotating medallion subtle */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[560px] h-[560px] opacity-[0.05] pointer-events-none">
        <div className="spin-slow w-full h-full">
          <Medallion className="w-full h-full" color="hsl(20 51% 55%)" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-10 py-20 sm:py-28 w-full">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-copper/60" />
            <span className="text-eyebrow text-copper">Jai Sri Ram</span>
            <span className="h-px w-12 bg-copper/60" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="font-kannada text-copper text-center text-base sm:text-lg mb-6">
            ಶ್ರೀ ರಾಂಪುರ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
          </div>
        </Reveal>
        <Reveal delay={220}>
          <h1 className="text-display-hero text-cream text-center">
            <span className="block">Sri Balanjaneya</span>
            <span className="block italic text-copper">Swamy <span className="text-cream not-italic">·</span> Rampura</span>
          </h1>
        </Reveal>
        <Reveal delay={360}>
          <p className="mt-10 text-center text-base sm:text-lg text-cream/90 max-w-3xl mx-auto font-display italic leading-relaxed">
            “{HANUMAN_STOTRA.en}”
          </p>
        </Reveal>
        <Reveal delay={520}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/temple" data-testid="hero-temple-cta" className="btn btn-primary">
              The Ancient Kshetra <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/events" data-testid="hero-events-cta" className="btn btn-outline-cream">
              Upcoming Pratishtha
            </Link>
          </div>
        </Reveal>

        <Reveal delay={680}>
          <div className="mt-16 mx-auto max-w-md text-center border-t border-copper/40 pt-6">
            <div className="text-eyebrow text-copper/90">Next ceremony</div>
            <div className="font-display text-2xl text-cream mt-2">{featured.title}</div>
            <div className="text-sm text-cream/85 mt-1">{featured.dateLabel} · {featured.time}</div>
          </div>
        </Reveal>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 text-[10px] tracking-[0.45em] uppercase text-cream/65">
          Scroll to explore
        </div>
      </div>
    </section>
  );
}

function StotraSection() {
  return (
    <section data-testid="home-stotra" className="bg-canvas-deep-surface py-20 sm:py-24 border-y border-warm">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Medallion className="w-10 h-10 mx-auto text-copper" color="hsl(20 51% 55%)" />
        <div className="text-eyebrow text-copper mt-5">Hanuman Stotra</div>
        <div className="mt-8 space-y-3 font-kannada text-cream text-xl sm:text-2xl leading-[1.95]">
          {HANUMAN_STOTRA.kn.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <p className="mt-8 font-display italic text-cream/85 text-base sm:text-lg leading-relaxed">
          {HANUMAN_STOTRA.en}
        </p>
      </div>
    </section>
  );
}

function Announcements() {
  return (
    <section data-testid="home-announcements" className="bg-canvas-deep">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {ANNOUNCEMENTS.map((a, i) => (
          <Reveal key={a.id} delay={i * 100}>
            <div className="flex gap-5">
              <div className="font-display text-5xl text-copper leading-none">0{i + 1}</div>
              <div className="flex-1">
                <span className="text-eyebrow text-copper">{a.label}</span>
                <p className="font-display text-xl text-cream leading-snug mt-2">{a.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section data-testid="home-before-after" className="bg-canvas-deep py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="text-eyebrow text-copper">Renovation completed · March 2022</div>
            <h2 className="text-display-h2 text-cream mt-4">
              Old garbhagudi, <em className="italic text-copper">new alankara.</em>
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-[1.8] text-cream/90">
              <p>
                For generations, the village offered the simplest of garlands to
                the small black-stone Anjaneya — vermillion-faced, plain-robed,
                radiant in His own quiet way.
              </p>
              <p>
                With the renovation completed, the Swamy now wears a gold
                kirita-crown and the Tirumala-style namam — yet the same gaze,
                the same blessing, the same village that has loved Him for centuries.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-7">
            <figure className="relative">
              <div className="border border-copper/40 p-2 bg-canvas-deep-surface">
                <img
                  src={IMG.anjaneyaBeforeAfter}
                  alt="The Anjaneya idol — before renovation (left) and after (right)"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4 text-center text-xs tracking-[0.3em] uppercase text-cream/70">
                Before · After
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PuranicReference() {
  return (
    <section data-testid="home-puranic" className="bg-canvas-ivory text-deep">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal>
            <div className="text-eyebrow text-copper">The Puranic Record</div>
            <h2 className="text-display-h2 mt-4 text-deep">
              One of the <em className="italic text-copper">one thousand and eight.</em>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-[1.85] text-deep/85">
          <Reveal delay={100}>
            <p>
              The deity at Rampura is an ancient mūrti, traditionally said to
              have been consecrated by <span className="italic text-copper">Sri Vyasaraja</span>,
              the great Madhva saint of the Vijayanagara age.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p>
              During the forest exile, Sri Ramachandra is said to have passed
              through this region by way of Chunchanakatte, and to have beheld
              the Kālapurusha resting here. Long after, Sri Vyasaraja consecrated{" "}
              <span className="font-display text-3xl text-copper align-middle">1,008</span>{" "}
              idols of Hanuman across the land. They stand to this day, scattered
              across India — and this kshetra is one among them.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p>
              A second tradition tells that the prāna-pratishthā was performed
              by <span className="italic text-copper">Sri Gautama Maharshi</span>,
              one of the Sapta-Rishis, in the Pāncharātra Āgama way. The little
              bell at the tip of Anjaneya&apos;s tail is, they say, the sign
              that Gautama once walked here.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              And the Puranas whisper that near this very kshetra,
              Ahalya was released from her long stone-curse — touched by
              Rama&apos;s foot, returning to herself after centuries of silence.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TwoIdolsSection() {
  return (
    <section data-testid="home-two-idols" className="bg-canvas-deep py-24 sm:py-32 relative overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="text-eyebrow text-copper">Two Anjaneyas</div>
            <h2 className="text-display-h2 text-cream mt-4">
              Both turned to the <em className="italic text-copper">north,</em>
              <br />
              both raised in <em className="italic text-copper">abhaya.</em>
            </h2>
            <p className="mt-6 text-cream/85 leading-relaxed">
              Sri Vyasaraja set down not one, but two idols at Rampura. Both face the
              north, both hold the gesture of fearlessness, each with a small bell
              at the tail.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TWO_IDOLS.map((idol, i) => (
            <Reveal key={idol.name} delay={i * 100}>
              <article className="border border-warm bg-canvas-deep-surface p-8 sm:p-10 h-full hover:border-copper transition-colors duration-500">
                <div className="flex items-baseline justify-between mb-6">
                  <div className="font-kannada text-copper text-sm">{idol.nameKn}</div>
                  <div className="text-eyebrow text-copper/90">{idol.height}</div>
                </div>
                <h3 className="text-display-h3 text-cream mb-5">{idol.name}</h3>
                <p className="text-cream/85 leading-relaxed">{idol.descr}</p>
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
    <section data-testid="home-cardinal" className="bg-canvas-ivory text-deep py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <Compass className="w-7 h-7 mx-auto text-copper mb-4" />
            <div className="text-eyebrow text-copper">A Sacred Geography</div>
            <h2 className="text-display-h2 mt-4 text-deep">
              Surrounded by the <em className="italic text-copper">four kshetras.</em>
            </h2>
            <p className="mt-6 text-deep/80 leading-relaxed">
              Rampura sits on the bank of the Cauvery — and is held, on each of
              its four directions, by an ancient shrine.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-copper/25 border border-copper/25">
          {CARDINAL_KSHETRAS.map((k, i) => (
            <Reveal key={k.dir} delay={i * 80}>
              <div className="bg-canvas-ivory-surface p-7 sm:p-10 h-full">
                <div className="text-eyebrow text-copper">{k.dir} · {k.kn}</div>
                <div className="font-kannada text-copper text-xs mt-4">{k.placeKn}</div>
                <h3 className="text-display-h3 text-deep mt-1">{k.place}</h3>
                <p className="text-sm text-deep/75 mt-4 leading-relaxed">{k.note}</p>
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
    <section data-testid="home-blessings" className="bg-canvas-deep py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <div className="text-eyebrow text-copper">Believed Graces</div>
              <h2 className="text-display-h2 text-cream mt-4">
                What devotees come <em className="italic text-copper">asking for.</em>
              </h2>
              <p className="mt-6 text-cream/85 leading-relaxed">
                For generations, the Swamy at Rampura has been said to grant these
                particular blessings — most especially relief for children from the
                doshas of Saturn and the Navagrahas, through the abhisheka tirtha.
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-copper/25 border border-copper/25">
            {BLESSINGS.map((b, i) => (
              <Reveal key={b.en} delay={i * 60}>
                <div className="bg-canvas-deep-surface p-6 sm:p-8 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-display-h3 text-cream">{b.en}</h3>
                    <span className="font-display text-copper/60 text-xl">0{i + 1}</span>
                  </div>
                  <div className="font-kannada text-copper text-sm mt-1">{b.kn}</div>
                  <p className="text-sm text-cream/80 mt-4 leading-relaxed">{b.note}</p>
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
    <section data-testid="home-shrine-banner" className="bg-canvas-deep relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
        <img src={IMG.hayagreevaAdornedFrontal} alt="" aria-hidden className="w-full h-full object-cover opacity-80" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas-deep via-canvas-deep/80 to-canvas-deep/40 lg:to-transparent" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="text-eyebrow text-copper">A New Shrine</div>
          <div className="font-kannada text-copper text-sm mt-3">ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
          <h2 className="text-display-h2 text-cream mt-3">
            Carved by the <em className="italic text-copper">same hands</em>
            <br />
            that shaped Bala Rama
            <br />
            <em className="italic text-copper">at Ayodhya.</em>
          </h2>
          <p className="mt-6 text-cream/85 leading-relaxed max-w-xl">
            Beside the historic Balanjaneya garbhagudi, a new sanctum rises for
            Sri Vidya Hayagreeva — the horse-faced form of Vishnu, deity of
            learning. The idol has been carved from black Krishna shila by the
            celebrated sculptor <span className="italic text-copper">Adithya yogiraj</span>,
            whose Bala Rama vigraha now stands at Ayodhya.
          </p>
          <Link to="/hayagreeva" data-testid="shrine-banner-cta" className="mt-10 btn btn-primary">
            The shrine&apos;s story <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function VisitTeaser() {
  return (
    <section data-testid="home-visit-teaser" className="bg-canvas-ivory text-deep py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="text-eyebrow text-copper">Plan your visit</div>
          <h2 className="text-display-h2 mt-4 text-deep">
            Come and take <em className="italic text-copper">a darshan.</em>
          </h2>
          <p className="mt-6 text-deep/80 leading-relaxed max-w-md">
            The temple opens at first light. Mornings are best for abhisheka,
            evenings for the deeparadhana. Children are welcome. Footwear, as
            always, stays behind.
          </p>
          <Link to="/visit" data-testid="home-visit-cta" className="mt-8 btn btn-outline-deep">
            Directions & timings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <img
            src={IMG.templeOldPorch}
            alt="The village shrine porch"
            className="w-full aspect-[4/5] object-cover border border-copper/30"
            loading="lazy"
          />
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
      <BeforeAfter />
      <OrnamentDivider label="The Puranic Record" kn="ಪುರಾಣ" theme="dark" />
      <PuranicReference />
      <TwoIdolsSection />
      <CardinalKshetras />
      <Blessings />
      <ShrineBanner />
      <VisitTeaser />
    </div>
  );
}

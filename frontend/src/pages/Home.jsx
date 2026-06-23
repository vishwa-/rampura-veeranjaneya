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
// Hero — Newspaper masthead style
// ─────────────────────────────────────────────────────────────
function Hero() {
  const featured = EVENTS.find((e) => e.featured) ?? EVENTS[0];
  return (
    <section data-testid="home-hero" className="relative bg-paper overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 pt-10 sm:pt-16 pb-20">
        <Reveal>
          <Masthead date="Established · centuries ago" edition="A Gazetteer of the Cauvery Banks" label="Volume I · No. 1" />
        </Reveal>

        <Reveal delay={120}>
          <div className="text-center mt-12">
            <div className="font-kannada text-crimson text-base sm:text-lg">
              ಶ್ರೀ ರಾಂಪುರ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
            </div>
            <h1 className="text-masthead text-ink mt-4">
              Sri Balanjaneya
              <br />
              <em className="italic text-crimson">Swamy</em>
            </h1>
            <div className="mt-3 font-display italic text-ink-muted text-xl sm:text-2xl">
              of Rampura, on the Cauvery
            </div>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 mx-auto max-w-3xl">
            <div className="rule-thick mb-6" />
            <p className="font-display italic text-ink text-lg sm:text-xl leading-relaxed text-center">
              “{HANUMAN_STOTRA.en}”
            </p>
            <div className="rule-thick mt-6" />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <figure className="relative photo-vignette">
                <img
                  src={IMG.anjaneyaBeforeAfter}
                  alt="The Anjaneya idol — before and after the renovation"
                  className="w-full h-auto photo-sepia"
                  loading="eager"
                />
              </figure>
              <figcaption className="mt-3 text-label-sm text-ink-muted text-center">
                The deity · before & after the renovation completed March 2022
              </figcaption>
            </div>
            <div className="lg:col-span-5">
              <div className="text-label text-crimson">A Note from the Trust</div>
              <h2 className="text-display-h2 text-ink mt-4">
                A village shrine, <em className="italic text-crimson">renewed.</em>
              </h2>
              <p className="mt-5 text-ink/90 leading-[1.85] dropcap">
                For centuries this small village on the banks of the Cauvery has tended an
                ancient stone idol of Lord Anjaneya — turned to the north, raised in
                fearlessness, dancing. The garbhagudi has now been renewed in stone, and
                beside it a new shrine for Sri Vidya Hayagreeva is being raised.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/temple" data-testid="hero-temple-cta" className="btn btn-primary">
                  The Ancient Kshetra <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link to="/events" data-testid="hero-events-cta" className="btn btn-outline-ink">
                  Upcoming Pratishtha
                </Link>
              </div>
              <div className="mt-10 rule-thin pt-4">
                <div className="text-label-sm text-crimson">Next Ceremony</div>
                <div className="font-display text-2xl text-ink mt-1">{featured.title}</div>
                <div className="text-sm text-ink-muted mt-1">{featured.dateLabel} · {featured.time}</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Stotra — Kannada verses on aged paper
// ─────────────────────────────────────────────────────────────
function StotraSection() {
  return (
    <section data-testid="home-stotra" className="bg-paper-aged border-y border-ink-muted/20 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Medallion className="w-9 h-9 mx-auto text-crimson" color="hsl(0 56% 39%)" />
        <div className="text-label text-crimson mt-5">Hanuman Stotra</div>
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
// Announcements — newspaper bulletin
// ─────────────────────────────────────────────────────────────
function Announcements() {
  return (
    <section data-testid="home-announcements" className="bg-paper">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-16">
        <div className="text-center mb-10">
          <div className="text-label text-crimson">Notices · ಪ್ರಕಟಣೆ</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-muted/25 border border-ink-muted/25">
          {ANNOUNCEMENTS.map((a, i) => (
            <Reveal key={a.id} delay={i * 100}>
              <div className="bg-paper p-8 h-full">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-display text-4xl text-crimson italic">№ {i + 1}</span>
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
// Puranic record — long-form editorial
// ─────────────────────────────────────────────────────────────
function PuranicReference() {
  return (
    <section data-testid="home-puranic" className="bg-paper">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal>
            <div className="text-label text-crimson">The Puranic Record</div>
            <h2 className="text-display-h1 text-ink mt-5">
              One of the <em className="italic text-crimson">one thousand and eight.</em>
            </h2>
            <div className="rule-crimson mt-7 w-16" />
          </Reveal>
        </div>
        <div className="lg:col-span-7 text-base sm:text-lg leading-[1.85] text-ink/90 space-y-6">
          <Reveal delay={100}>
            <p className="dropcap">
              The deity at Rampura is an ancient mūrti, traditionally said to
              have been consecrated by <span className="italic text-crimson">Sri Vyasaraja</span>,
              the great Madhva saint of the Vijayanagara age.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p>
              During the forest exile, Sri Ramachandra is said to have passed
              through this region by way of Chunchanakatte, and to have beheld
              the Kālapurusha resting here. Long after, Sri Vyasaraja consecrated
              {" "}<span className="font-display text-3xl text-crimson align-middle">1,008</span>{" "}
              idols of Hanuman across the land. They stand to this day, scattered
              across India — and this kshetra is one among them.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p>
              A second tradition tells that the prāna-pratishthā was performed
              by <span className="italic text-crimson">Sri Gautama Maharshi</span>,
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
// Two idols — editorial two-column
// ─────────────────────────────────────────────────────────────
function TwoIdolsSection() {
  return (
    <section data-testid="home-two-idols" className="bg-paper-aged py-24 sm:py-32 border-y border-ink-muted/20">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="text-label text-crimson">The Two Anjaneyas</div>
            <h2 className="text-display-h1 text-ink mt-5">
              Both turned to the <em className="italic text-crimson">north,</em>
              <br />
              both raised in <em className="italic text-crimson">abhaya.</em>
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
                  <div className="font-kannada text-crimson text-sm">{idol.nameKn}</div>
                  <div className="text-label-sm text-ink-muted">{idol.height}</div>
                </div>
                <div className="rule-thin mb-6" />
                <h3 className="text-display-h2 text-ink mb-5">{idol.name}</h3>
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
// Cardinal kshetras — compass
// ─────────────────────────────────────────────────────────────
function CardinalKshetras() {
  return (
    <section data-testid="home-cardinal" className="bg-paper py-24 sm:py-32">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <Compass className="w-7 h-7 mx-auto text-crimson mb-4" />
            <div className="text-label text-crimson">A Sacred Geography</div>
            <h2 className="text-display-h1 text-ink mt-5">
              Surrounded by the <em className="italic text-crimson">four kshetras.</em>
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
                <div className="text-label-sm text-crimson">{k.dir} · {k.kn}</div>
                <div className="font-kannada text-crimson/80 text-xs mt-4">{k.placeKn}</div>
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
// Blessings — editorial table of graces
// ─────────────────────────────────────────────────────────────
function Blessings() {
  return (
    <section data-testid="home-blessings" className="bg-paper-aged py-24 sm:py-32 border-y border-ink-muted/20">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <div className="text-label text-crimson">Believed Graces</div>
              <h2 className="text-display-h1 text-ink mt-5">
                What devotees come <em className="italic text-crimson">asking for.</em>
              </h2>
              <div className="rule-crimson mt-7 w-16" />
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
                    <span className="font-display text-3xl text-crimson italic">№ {i + 1}</span>
                  </div>
                  <h3 className="text-display-h3 text-ink mt-2">{b.en}</h3>
                  <div className="font-kannada text-crimson text-sm mt-1">{b.kn}</div>
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
// Shrine banner — dark inverted section
// ─────────────────────────────────────────────────────────────
function ShrineBanner() {
  return (
    <section data-testid="home-shrine-banner" className="bg-ink-deep text-cream relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
        <img src={IMG.hayagreevaAdornedFrontal} alt="" aria-hidden className="w-full h-full object-cover opacity-75 photo-sepia" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/80 to-ink-deep/40 lg:to-transparent" />
      </div>
      <div className="relative max-w-[1500px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="text-label text-gold-old">A New Shrine</div>
          <div className="font-kannada text-gold-old text-sm mt-3">ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
          <h2 className="text-display-h1 text-cream mt-3">
            Carved by the <em className="italic text-gold-old">same hands</em>
            <br />
            that shaped Bala Rama
            <br />
            <em className="italic text-gold-old">at Ayodhya.</em>
          </h2>
          <p className="mt-6 text-cream/90 leading-[1.85] max-w-xl font-body">
            Beside the historic Doddaanjaneya garbhagudi, a new sanctum rises for
            Sri Vidya Hayagreeva — the horse-faced form of Vishnu, deity of
            learning. The idol has been carved from black Krishna shila by the
            celebrated sculptor <span className="italic text-gold-old">Adithya yogiraj</span>,
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

// ─────────────────────────────────────────────────────────────
// Visit teaser
// ─────────────────────────────────────────────────────────────
function VisitTeaser() {
  return (
    <section data-testid="home-visit-teaser" className="bg-paper py-24 sm:py-32">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="text-label text-crimson">Plan your visit</div>
          <h2 className="text-display-h1 text-ink mt-5">
            Come and take <em className="italic text-crimson">a darshan.</em>
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

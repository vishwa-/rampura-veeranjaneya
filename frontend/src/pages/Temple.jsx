import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Columns3, Stars, Languages } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Medallion } from "@/components/Ornaments";
import { IMG, TWO_IDOLS, BLESSINGS } from "@/lib/data";

export default function Temple() {
  return (
    <div data-testid="page-temple">
      {/* Hero */}
      <section className="relative bg-canvas-deep min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.anjaneyaBeforeAfter} alt="" aria-hidden className="w-full h-full object-cover slow-pan opacity-30" />
          <div className="absolute inset-0 bg-canvas-deep/80" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
          <div className="spin-slow"><Medallion className="w-[700px] h-[700px]" color="hsl(20 51% 55%)" /></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center">
          <div className="text-eyebrow text-copper">The Temple</div>
          <div className="font-kannada text-copper text-base mt-4">ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ</div>
          <h1 className="text-display-hero text-cream mt-4">
            Sri Balanjaneya <em className="italic text-copper">Swamy.</em>
          </h1>
          <p className="mt-7 font-display italic text-cream/90 text-lg max-w-2xl mx-auto leading-relaxed">
            “A very ancient kshetra — its renovation was completed in March 2022.”
          </p>
        </div>
      </section>

      {/* Two idols */}
      <section data-testid="temple-two-idols" className="bg-canvas-deep py-24 sm:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <div className="text-eyebrow text-copper">Two consecrations</div>
              <h2 className="text-display-h2 text-cream mt-4">
                Both turned to the <em className="italic text-copper">north.</em>
              </h2>
              <p className="mt-6 text-cream/85 leading-relaxed">
                Sri Vyasaraja set down not one but two idols here — both facing
                north, both raised in the gesture of fearlessness, each with a
                small bell at the tail.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TWO_IDOLS.map((idol, i) => (
              <Reveal key={idol.name} delay={i * 100}>
                <article className="border border-warm bg-canvas-deep-surface p-8 sm:p-12 h-full">
                  <div className="flex items-baseline justify-between mb-6">
                    <div className="font-kannada text-copper text-sm">{idol.nameKn}</div>
                    <div className="text-eyebrow text-copper/90">{idol.height}</div>
                  </div>
                  <h3 className="text-display-h2 text-cream mb-5">{idol.name}</h3>
                  <p className="text-cream/85 leading-relaxed">{idol.descr}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <OrnamentDivider label="Before & After" kn="ಜೀರ್ಣೋದ್ಧಾರ" theme="dark" />

      {/* Before/After */}
      <section data-testid="temple-before-after" className="bg-canvas-deep pb-24 sm:pb-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <figure className="border border-copper/40 p-2 bg-canvas-deep-surface">
              <img src={IMG.anjaneyaBeforeAfter} alt="The Anjaneya idol — before and after renovation" className="w-full h-auto" loading="lazy" />
            </figure>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="text-eyebrow text-copper">A village renewal</div>
            <h2 className="text-display-h2 text-cream mt-4">
              The same gaze, <em className="italic text-copper">a new alankara.</em>
            </h2>
            <p className="mt-6 text-cream/85 leading-relaxed">
              Before the renovation, the Swamy stood plain — vermillion face,
              simple flower garlands, a small brass bell. After, He wears the
              gold kirita-crown and the Tirumala-style namam. The garbhagudi has
              been rebuilt around Him; the deity Himself has not moved.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Narthaki narrative on ivory */}
      <section className="bg-canvas-ivory text-deep">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <div className="text-eyebrow text-copper">The Narthaki form</div>
            <h2 className="text-display-h2 text-deep mt-4">
              A Hanuman who <em className="italic text-copper">dances.</em>
            </h2>
            <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.8] text-deep/85">
              <p>
                Of the many forms of Lord Hanuman — Vīra, Bhakta, Dāsa, Yoga,
                Panchamukha — the Narthaki form is exceedingly rare. The hands
                do not grip a mace; they hold the rhythm of the universe.
              </p>
              <p>
                Local lore says Hanuman, returning from Lanka with the
                sanjeevani, paused on the banks of the Cauvery near Rampura and
                danced in relief and joy. The village took that moment and made
                it a god.
              </p>
              <p>
                At the deity&apos;s feet lies the <span className="italic text-copper">Kālapurusha</span> —
                the Lord of Time — sleeping. Devotees believe this is why the
                Swamy here wards off all manner of disease and untimely death,
                especially for children.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <img src={IMG.templeOldExterior} alt="The old village shrine — exterior wall" className="w-full aspect-[4/5] object-cover border border-copper/30" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <OrnamentDivider label="Architecture" kn="ಶಿಲ್ಪಕಲೆ" theme="dark" />

      {/* Architecture */}
      <section data-testid="temple-architecture" className="bg-canvas-deep pb-24 sm:pb-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <div className="font-kannada text-copper text-sm">ದೇವಸ್ಥಾನದ ಶಿಲ್ಪಕಲೆ</div>
              <h2 className="text-display-h2 text-cream mt-3">
                A temple gathered from <em className="italic text-copper">three great traditions.</em>
              </h2>
              <p className="mt-6 text-cream/85 leading-relaxed">
                The renovated temple draws from the curvilinear towers of
                Kalinga, the jewelled pillars of the Hoysalas, and the layered
                scripts of the deep south.
              </p>
            </Reveal>
          </div>
          <div data-testid="architecture-grid" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-copper/25 border border-copper/25">
            <Reveal>
              <article data-testid="arch-rekha-deula" className="h-full bg-canvas-deep-surface p-8">
                <div className="w-11 h-11 rounded-full border border-copper/50 text-copper flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M12 2c2 4 4 7 4 12a4 4 0 0 1-8 0c0-5 2-8 4-12z" />
                    <path d="M8 18h8" />
                    <path d="M7 22h10" />
                  </svg>
                </div>
                <div className="font-kannada text-copper text-sm">ರೇಖಾ ದೇಊಳ</div>
                <h3 className="text-display-h3 text-cream mt-2">A Rekha Deula tower</h3>
                <p className="mt-4 text-sm text-cream/80 leading-relaxed">
                  The shikhara has been raised in the curvilinear Kalinga style
                  — its slender vertical rekhas rising in one unbroken sweep,
                  crowned by amalaka and kalasha. The village has reached
                  eastward, to Odisha, for its skyline.
                </p>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article data-testid="arch-hoysala-pillars" className="h-full bg-canvas-deep-surface p-8">
                <div className="w-11 h-11 rounded-full border border-copper/50 text-copper flex items-center justify-center mb-5">
                  <Columns3 className="w-5 h-5" />
                </div>
                <div className="font-kannada text-copper text-sm">ಹೊಯ್ಸಳ ಸ್ತಂಭಗಳು</div>
                <h3 className="text-display-h3 text-cream mt-2">Hoysala-inspired pillars</h3>
                <p className="mt-4 text-sm text-cream/80 leading-relaxed">
                  Lathe-finished, multi-faceted pillars in the manner of Belur
                  and Halebid. On each, the sculptors have engraved the twelve
                  rashis and the twenty-seven nakshatras. The whole zodiac
                  stands quietly with the devotee.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-copper uppercase tracking-[0.28em]">
                  <Stars className="w-3.5 h-3.5" /> 12 rashis · 27 nakshatras
                </div>
              </article>
            </Reveal>
            <Reveal delay={200}>
              <article data-testid="arch-hayagreeva-scripts" className="h-full bg-canvas-deep-surface p-8">
                <div className="w-11 h-11 rounded-full bg-copper text-canvas-deep flex items-center justify-center mb-5">
                  <Languages className="w-5 h-5" />
                </div>
                <div className="font-kannada text-copper text-sm">ಅಕ್ಷರ ಶಿಲ್ಪ</div>
                <h3 className="text-display-h3 text-cream mt-2">Letters for Hayagreeva</h3>
                <p className="mt-4 text-sm text-cream/80 leading-relaxed">
                  The new sanctum for Sri Vidya Hayagreeva has been clothed in
                  language itself. Walls and lintels carry alphabets from the
                  great literary tongues of India:
                </p>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-baseline gap-3"><span className="text-copper font-display text-lg">अ</span><span className="text-cream/85 text-sm">Hindi</span></div>
                  <div className="flex items-baseline gap-3"><span className="text-copper font-display text-lg">ॐ</span><span className="text-cream/85 text-sm">Sanskrit</span></div>
                  <div className="flex items-baseline gap-3"><span className="text-copper font-kannada text-lg">ಅ</span><span className="text-cream/85 text-sm">Kannada</span></div>
                  <div className="flex items-baseline gap-3"><span className="text-copper text-lg">அ</span><span className="text-cream/85 text-sm">Tamil</span></div>
                  <div className="flex items-baseline gap-3 col-span-2"><span className="text-copper text-lg">అ</span><span className="text-cream/85 text-sm">Telugu</span></div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blessings band */}
      <section data-testid="temple-blessings" className="bg-canvas-ivory text-deep py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal>
              <div className="text-eyebrow text-copper">Believed Graces</div>
              <h2 className="text-display-h2 text-deep mt-3">
                What the Swamy is said <em className="italic text-copper">to grant.</em>
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-copper/25 border border-copper/25">
            {BLESSINGS.map((b) => (
              <div key={b.en} className="bg-canvas-ivory-surface p-6 text-center">
                <div className="font-kannada text-copper text-xs">{b.kn}</div>
                <div className="font-display text-base text-deep mt-2">{b.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hayagreeva teaser */}
      <section className="bg-canvas-deep">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <img src={IMG.hayagreevaAdornedAngled} alt="The new Vidya Hayagreeva idol, adorned" className="w-full aspect-[4/5] object-cover border border-warm" loading="lazy" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="text-eyebrow text-copper">A New Sanctum</div>
            <div className="font-kannada text-copper text-sm mt-3">ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
            <h2 className="text-display-h2 text-cream mt-3">
              Beside the historic <em className="italic text-copper">Balanjaneya,</em>
              <br />
              the giver of knowledge.
            </h2>
            <p className="mt-6 text-cream/85 leading-relaxed max-w-xl">
              Sri Vidya Hayagreeva — the horse-faced form of Vishnu — presides
              over learning, mantra, and clarity of mind. Carved from black
              Krishna shila by <em className="italic text-copper">Adithya yogiraj</em>,
              the very sculptor who shaped the Bala Rama vigraha now installed
              at Ayodhya.
            </p>
            <Link to="/hayagreeva" data-testid="temple-shrine-link" className="mt-8 btn btn-primary">
              The shrine&apos;s story <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

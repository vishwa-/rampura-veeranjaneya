import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Columns3, Stars, Languages } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Masthead } from "@/components/Ornaments";
import { IMG, TWO_IDOLS, BLESSINGS } from "@/lib/data";

export default function Temple() {
  return (
    <div data-testid="page-temple">
      {/* Hero */}
      <section className="relative bg-paper border-b border-ink-muted/20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 pt-10 sm:pt-16 pb-16">
          <Masthead date="Founded · centuries ago" edition="The Temple Chronicle" label="Chapter II" />
          <Reveal delay={120}>
            <div className="text-center mt-12 max-w-4xl mx-auto">
              <div className="font-kannada text-crimson text-base mt-4">
                ಶ್ರೀ ವೀರಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
              </div>
              <h1 className="text-masthead text-ink mt-4">
                The <em className="italic text-crimson">Temple.</em>
              </h1>
              <p className="mt-6 font-display italic text-ink-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                “A very ancient kshetra — its renovation was completed in March 2022.”
              </p>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <figure className="mt-12 max-w-5xl mx-auto photo-vignette">
              <img src={IMG.anjaneyaBeforeAfter} alt="The deity before and after the renovation" className="w-full h-auto photo-sepia" loading="eager" />
              <figcaption className="mt-3 text-label-sm text-ink-muted text-center">The deity · before & after the renovation</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Two idols */}
      <section data-testid="temple-two-idols" className="bg-paper py-24 sm:py-32">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <div className="text-label text-crimson">Two Consecrations</div>
              <h2 className="text-display-h1 text-ink mt-5">
                Both turned to the <em className="italic text-crimson">north.</em>
              </h2>
              <div className="rule-crimson mt-7 w-16 mx-auto" />
              <p className="mt-7 text-ink-muted leading-relaxed">
                Sri Vyasaraja set down not one but two idols here — both facing
                north, both raised in the gesture of fearlessness; each with a
                small bell at the tail.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TWO_IDOLS.map((idol, i) => (
              <Reveal key={idol.name} delay={i * 100}>
                <article className="border border-ink-muted/30 bg-paper-aged p-10 h-full">
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

      <OrnamentDivider label="Before & After" kn="ಜೀರ್ಣೋದ್ಧಾರ" theme="light" />

      {/* Before/After narrative */}
      <section data-testid="temple-before-after" className="bg-paper-aged py-24 sm:py-32 border-y border-ink-muted/20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <figure className="photo-vignette">
              <img src={IMG.anjaneyaBeforeAfter} alt="The Anjaneya idol — before and after renovation" className="w-full h-auto photo-sepia border border-ink-muted/30" loading="lazy" />
              <figcaption className="mt-3 text-label-sm text-ink-muted text-center">Before · After · March 2022</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="text-label text-crimson">A village renewal</div>
            <h2 className="text-display-h1 text-ink mt-5">
              The same gaze, <em className="italic text-crimson">a new alankara.</em>
            </h2>
            <div className="rule-crimson mt-7 w-16" />
            <p className="mt-7 text-ink/90 leading-[1.85] font-body dropcap">
              Before the renovation, the Swamy stood plain — vermillion face,
              simple flower garlands, a small brass bell. After, He wears the
              gold kirita-crown and the Tirumala-style namam. The garbhagudi has
              been rebuilt around Him; the deity Himself has not moved.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Narthaki narrative */}
      <section className="bg-paper">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <Reveal className="lg:col-span-7">
            <div className="text-label text-crimson">The Narthaki Form</div>
            <h2 className="text-display-h1 text-ink mt-5">
              A Hanuman who <em className="italic text-crimson">dances.</em>
            </h2>
            <div className="rule-crimson mt-7 w-16" />
            <div className="mt-7 space-y-5 text-base sm:text-lg leading-[1.85] text-ink/90">
              <p className="dropcap">
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
                At the deity&apos;s feet lies the <span className="italic text-crimson">Kālapurusha</span> —
                the Lord of Time — sleeping. Devotees believe this is why the
                Swamy here wards off all manner of disease and untimely death,
                especially for children.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <figure className="photo-vignette">
              <img src={IMG.templeOldExterior} alt="The old village shrine — exterior wall" className="w-full aspect-[4/5] object-cover photo-sepia border border-ink-muted/30" loading="lazy" />
            </figure>
            <figcaption className="mt-3 text-label-sm text-ink-muted">The old exterior · pre-renovation</figcaption>
          </Reveal>
        </div>
      </section>

      <OrnamentDivider label="Architecture" kn="ಶಿಲ್ಪಕಲೆ" theme="light" />

      {/* Architecture */}
      <section data-testid="temple-architecture" className="bg-paper-aged pb-24 sm:pb-32 border-y border-ink-muted/20 py-20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <div className="text-label text-crimson">Architecture · ಶಿಲ್ಪಕಲೆ</div>
              <h2 className="text-display-h1 text-ink mt-5">
                A temple gathered from <em className="italic text-crimson">three great traditions.</em>
              </h2>
              <div className="rule-crimson mt-7 w-16 mx-auto" />
              <p className="mt-7 text-ink-muted leading-relaxed">
                The renovated temple draws from the curvilinear towers of
                Kalinga, the jewelled pillars of the Hoysalas, and the layered
                scripts of the deep south.
              </p>
            </Reveal>
          </div>
          <div data-testid="architecture-grid" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-muted/25 border border-ink-muted/25">
            <Reveal>
              <article data-testid="arch-rekha-deula" className="h-full bg-paper p-8">
                <div className="w-11 h-11 rounded-full border border-crimson/60 text-crimson flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M12 2c2 4 4 7 4 12a4 4 0 0 1-8 0c0-5 2-8 4-12z" />
                    <path d="M8 18h8" />
                    <path d="M7 22h10" />
                  </svg>
                </div>
                <div className="font-kannada text-crimson text-sm">ರೇಖಾ ದೇಊಳ</div>
                <h3 className="text-display-h3 text-ink mt-2">A Rekha Deula tower</h3>
                <div className="rule-thin mt-4 mb-4 w-10" />
                <p className="text-sm text-ink-muted leading-relaxed font-body">
                  The shikhara has been raised in the curvilinear Kalinga style —
                  its slender vertical rekhas rising in one unbroken sweep,
                  crowned by amalaka and kalasha. The village has reached
                  eastward, to Odisha, for its skyline.
                </p>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article data-testid="arch-hoysala-pillars" className="h-full bg-paper p-8">
                <div className="w-11 h-11 rounded-full border border-crimson/60 text-crimson flex items-center justify-center mb-5">
                  <Columns3 className="w-5 h-5" />
                </div>
                <div className="font-kannada text-crimson text-sm">ಹೊಯ್ಸಳ ಸ್ತಂಭಗಳು</div>
                <h3 className="text-display-h3 text-ink mt-2">Hoysala-inspired pillars</h3>
                <div className="rule-thin mt-4 mb-4 w-10" />
                <p className="text-sm text-ink-muted leading-relaxed font-body">
                  Lathe-finished, multi-faceted pillars in the manner of Belur
                  and Halebid. On each, the sculptors have engraved the twelve
                  rashis and the twenty-seven nakshatras. The whole zodiac
                  stands quietly with the devotee.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-crimson tracking-[0.28em] uppercase font-label">
                  <Stars className="w-3.5 h-3.5" /> 12 rashis · 27 nakshatras
                </div>
              </article>
            </Reveal>
            <Reveal delay={200}>
              <article data-testid="arch-hayagreeva-scripts" className="h-full bg-paper p-8">
                <div className="w-11 h-11 rounded-full bg-crimson text-paper flex items-center justify-center mb-5">
                  <Languages className="w-5 h-5" />
                </div>
                <div className="font-kannada text-crimson text-sm">ಅಕ್ಷರ ಶಿಲ್ಪ</div>
                <h3 className="text-display-h3 text-ink mt-2">Letters for Hayagreeva</h3>
                <div className="rule-thin mt-4 mb-4 w-10" />
                <p className="text-sm text-ink-muted leading-relaxed font-body">
                  The new sanctum for Sri Vidya Hayagreeva has been clothed in
                  language itself. Walls and lintels carry alphabets from the
                  great literary tongues of India:
                </p>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-baseline gap-3"><span className="text-crimson font-display text-lg">अ</span><span className="text-ink-muted text-sm">Hindi</span></div>
                  <div className="flex items-baseline gap-3"><span className="text-crimson font-display text-lg">ॐ</span><span className="text-ink-muted text-sm">Sanskrit</span></div>
                  <div className="flex items-baseline gap-3"><span className="text-crimson font-kannada text-lg">ಅ</span><span className="text-ink-muted text-sm">Kannada</span></div>
                  <div className="flex items-baseline gap-3"><span className="text-crimson text-lg">அ</span><span className="text-ink-muted text-sm">Tamil</span></div>
                  <div className="flex items-baseline gap-3 col-span-2"><span className="text-crimson text-lg">అ</span><span className="text-ink-muted text-sm">Telugu</span></div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blessings band */}
      <section data-testid="temple-blessings" className="bg-paper py-24">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal>
              <div className="text-label text-crimson">Believed Graces</div>
              <h2 className="text-display-h1 text-ink mt-5">
                What the Swamy is said <em className="italic text-crimson">to grant.</em>
              </h2>
              <div className="rule-crimson mt-7 w-16 mx-auto" />
            </Reveal>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-ink-muted/25 border border-ink-muted/25">
            {BLESSINGS.map((b) => (
              <div key={b.en} className="bg-paper p-6 text-center">
                <div className="font-kannada text-crimson text-xs">{b.kn}</div>
                <div className="font-display text-lg text-ink mt-2">{b.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hayagreeva teaser */}
      <section className="bg-ink-deep text-cream">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <figure className="photo-vignette">
              <img src={IMG.hayagreevaAdornedAngled} alt="The new Vidya Hayagreeva idol, adorned" className="w-full aspect-[4/5] object-cover photo-sepia border border-gold-old/40" loading="lazy" />
            </figure>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="text-label text-gold-old">A New Sanctum</div>
            <div className="font-kannada text-gold-old text-sm mt-3">ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
            <h2 className="text-display-h1 text-cream mt-3">
              Beside the historic <em className="italic text-gold-old">Doddaanjaneya,</em>
              <br />
              the giver of knowledge.
            </h2>
            <div className="rule-thin mt-7 w-16" style={{ borderColor: "hsl(38 38% 54%)" }} />
            <p className="mt-7 text-cream/90 leading-[1.85] max-w-xl font-body">
              Sri Vidya Hayagreeva — the horse-faced form of Vishnu — presides
              over learning, mantra, and clarity of mind. Carved from black
              Krishna shila by <em className="italic text-gold-old">Adithya yogiraj</em>,
              the very sculptor who shaped the Bala Rama vigraha now installed
              at Ayodhya.
            </p>
            <Link to="/hayagreeva" data-testid="temple-shrine-link" className="mt-8 btn btn-outline-cream">
              The shrine&apos;s story <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

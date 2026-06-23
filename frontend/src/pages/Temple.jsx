import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Columns3, Stars, Languages } from "lucide-react";
import { BilingualHeading } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, LotusMedallion } from "@/components/Ornaments";
import { IMG, TWO_IDOLS, BLESSINGS } from "@/lib/data";

export default function Temple() {
  return (
    <div data-testid="page-temple">
      {/* Hero */}
      <section className="relative bg-deep text-jasmine min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.idolBare} alt="" aria-hidden className="w-full h-full object-cover opacity-50 slow-pan" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/85 via-deep/70 to-deep" />
        </div>
        <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center">
          <div className="spin-slow"><LotusMedallion className="w-[700px] h-[700px]" color="hsl(38, 95%, 62%)" /></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center">
          <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">The Temple</div>
          <div className="font-kannada text-marigold/80 text-base mt-3">
            ಶ್ರೀ ಬಾಲಾಂಜನೇಯಸ್ವಾಮಿ ದೇವಸ್ಥಾನ
          </div>
          <h1 className="display-hero text-jasmine text-6xl sm:text-7xl lg:text-8xl mt-4 leading-[0.92]">
            Sri Balanjaneya
            <br />
            <em className="text-marigold">Swamy</em>
          </h1>
          <p className="mt-7 font-serif-display italic text-jasmine/90 text-lg max-w-2xl mx-auto leading-relaxed">
            “A very ancient kshetra — its jīrnōddhāra was completed in March 2022.”
          </p>
        </div>
      </section>

      {/* The two idols */}
      <section data-testid="temple-two-idols" className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">Two consecrations</div>
            <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4 leading-[0.95]">
              Both turned to the
              <em className="text-vermillion"> north.</em>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Vyasaraja, unusually, set down not one but two idols here — both facing
              north, both raised in the gesture of fearlessness, each with a small bell
              at the tail.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {TWO_IDOLS.map((idol, i) => (
            <Reveal key={idol.name} delay={i * 100}>
              <article className="bg-cream/50 p-8 sm:p-12 h-full">
                <div className="flex items-baseline justify-between mb-6">
                  <div className="font-kannada text-vermillion text-sm">{idol.nameKn}</div>
                  <div className="font-serif-sc text-vermillion/70 text-[10px] tracking-[0.3em] uppercase">{idol.height}</div>
                </div>
                <h3 className="display-hero text-temple-ink text-5xl sm:text-6xl mb-5 leading-[0.95]">{idol.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{idol.descr}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <OrnamentDivider label="The dancing form" kn="ನರ್ತಕಿ ರೂಪ" />

      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <Reveal className="lg:col-span-7">
          <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">The Narthaki form</div>
          <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4 leading-[0.95]">
            A Hanuman who
            <em className="text-vermillion"> dances.</em>
          </h2>
          <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.8] text-muted-foreground">
            <p>
              Of the many forms of Lord Hanuman — Vīra, Bhakta, Dāsa, Yoga, Panchamukha
              — the Narthaki form is exceedingly rare. The hands do not grip a mace; they
              hold the rhythm of the universe.
            </p>
            <p>
              Local lore says Hanuman, returning from Lanka with the sanjeevani, paused on
              the banks of the Cauvery near Rampura and danced in relief and joy. The
              village took that moment and made it a god. The small black-stone idol —
              with one foot lifted — has been worshipped here for centuries.
            </p>
            <p>
              At the deity&apos;s feet lies the <span className="text-temple-ink italic">Kālapurusha</span> — the
              Lord of Time — sleeping. Devotees believe this is why the Swamy here wards off
              all manner of disease and untimely death, especially for children.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5">
          <div className="relative">
            <img src={IMG.lamp} alt="Brass diya in the temple" className="w-full aspect-[4/5] object-cover rounded-sm shadow-md" loading="lazy" />
            <div className="hidden sm:block absolute -bottom-5 -left-5 w-32 h-32 border-2 border-vermillion -z-10" />
          </div>
        </Reveal>
      </section>

      {/* Architecture */}
      <OrnamentDivider label="Architecture" kn="ಶಿಲ್ಪಕಲೆ" />

      <section data-testid="temple-architecture" className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Reveal>
            <BilingualHeading kannada="ದೇವಸ್ಥಾನದ ಶಿಲ್ಪಕಲೆ" english="A temple gathered from three great traditions" size="lg" align="center" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The remodelled temple draws from the curvilinear towers of Kalinga, the
              jewelled pillars of the Hoysalas, and the layered scripts of the deep
              south. Each surface chosen with intention.
            </p>
          </Reveal>
        </div>
        <div data-testid="architecture-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal>
            <article data-testid="arch-rekha-deula" className="h-full border border-border bg-sandstone/40 rounded-sm p-8">
              <div className="w-11 h-11 rounded-full bg-ink text-marigold flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M12 2c2 4 4 7 4 12a4 4 0 0 1-8 0c0-5 2-8 4-12z" />
                  <path d="M8 18h8" />
                  <path d="M7 22h10" />
                </svg>
              </div>
              <div className="font-kannada text-vermillion text-sm">ರೇಖಾ ದೇಊಳ ಶೈಲಿ</div>
              <h3 className="display-hero text-temple-ink text-3xl mt-2">A Rekha Deula tower</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The shikhara has been raised in the curvilinear Kalinga style — its
                slender vertical rekhas rising in one unbroken sweep, crowned by amalaka
                and kalasha. The village has reached eastward, to Odisha, for its
                skyline.
              </p>
            </article>
          </Reveal>
          <Reveal delay={100}>
            <article data-testid="arch-hoysala-pillars" className="h-full border border-border bg-sandstone/40 rounded-sm p-8">
              <div className="w-11 h-11 rounded-full bg-ink text-marigold flex items-center justify-center mb-5">
                <Columns3 className="w-5 h-5" />
              </div>
              <div className="font-kannada text-vermillion text-sm">ಹೊಯ್ಸಳ ಸ್ತಂಭಗಳು</div>
              <h3 className="display-hero text-temple-ink text-3xl mt-2">Hoysala-inspired pillars</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Lathe-finished, multi-faceted pillars in the manner of Belur and Halebid.
                On each, the sculptors have engraved the twelve <span className="text-temple-ink">rashis</span> and
                the twenty-seven <span className="text-temple-ink">nakshatras</span>. The whole zodiac
                stands quietly with the devotee.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs text-vermillion uppercase tracking-[0.25em]">
                <Stars className="w-3.5 h-3.5" /> 12 rashis · 27 nakshatras
              </div>
            </article>
          </Reveal>
          <Reveal delay={200}>
            <article data-testid="arch-hayagreeva-scripts" className="h-full border border-border bg-ink text-jasmine rounded-sm p-8">
              <div className="w-11 h-11 rounded-full bg-marigold text-temple-ink flex items-center justify-center mb-5">
                <Languages className="w-5 h-5" />
              </div>
              <div className="font-kannada text-marigold text-sm">ಅಕ್ಷರ ಶಿಲ್ಪ</div>
              <h3 className="display-hero text-jasmine text-3xl mt-2">Letters for Hayagreeva</h3>
              <p className="mt-4 text-sm text-jasmine/80 leading-relaxed">
                The new sanctum for Sri Vidya Hayagreeva — the deity of learning — has
                been clothed in language itself. Walls and lintels carry alphabets from
                the great literary tongues of India:
              </p>
              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-baseline gap-3"><span className="text-marigold font-serif-display text-lg">अ</span><span className="text-jasmine/80 text-sm">Hindi</span></div>
                <div className="flex items-baseline gap-3"><span className="text-marigold font-serif-display text-lg">ॐ</span><span className="text-jasmine/80 text-sm">Sanskrit</span></div>
                <div className="flex items-baseline gap-3"><span className="text-marigold font-kannada text-lg">ಅ</span><span className="text-jasmine/80 text-sm">Kannada</span></div>
                <div className="flex items-baseline gap-3"><span className="text-marigold text-lg">அ</span><span className="text-jasmine/80 text-sm">Tamil</span></div>
                <div className="flex items-baseline gap-3 col-span-2"><span className="text-marigold text-lg">అ</span><span className="text-jasmine/80 text-sm">Telugu</span></div>
              </div>
              <p className="mt-5 text-xs text-jasmine/60 italic">
                Every native script — a different way of remembering the same truth.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Blessings band */}
      <section data-testid="temple-blessings" className="mt-24 bg-cream/60 border-y border-border py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal>
              <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">Believed Graces</div>
              <h2 className="display-hero text-temple-ink text-4xl sm:text-5xl mt-3 leading-[1]">
                What the Swamy is said to grant.
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border">
            {BLESSINGS.map((b) => (
              <div key={b.en} className="bg-background p-5 text-center">
                <div className="font-kannada text-vermillion text-xs">{b.kn}</div>
                <div className="font-serif-display text-base text-temple-ink mt-2">{b.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hayagreeva teaser */}
      <section className="bg-deep text-jasmine">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <img src={IMG.idolAdornedAngled} alt="The new Vidya Hayagreeva idol, adorned" className="w-full aspect-[4/5] object-cover rounded-sm" loading="lazy" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">A New Sanctum</div>
            <div className="font-kannada text-marigold/80 text-sm mt-3">ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
            <h2 className="display-hero text-jasmine text-5xl sm:text-6xl mt-3 leading-[0.95]">
              Beside the historic <em className="text-marigold">Balanjaneya,</em>
              <br />
              the giver of knowledge.
            </h2>
            <p className="mt-6 text-jasmine/80 leading-relaxed max-w-xl">
              Sri Vidya Hayagreeva — the horse-faced form of Vishnu — presides over
              learning, mantra, and clarity of mind. Carved from black Krishna shila by{" "}
              yogiraj <em className="text-marigold">Adithya</em>, the very sculptor who
              shaped the Bala Rama vigraha now installed at Ayodhya.
            </p>
            <Link to="/hayagreeva" data-testid="temple-shrine-link" className="mt-8 btn-temple btn-temple-gold">
              The shrine&apos;s full story <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

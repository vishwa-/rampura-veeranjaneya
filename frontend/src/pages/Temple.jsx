import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Columns3, Stars, Languages } from "lucide-react";
import { BilingualHeading, SectionDivider } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { IMG } from "@/lib/data";

export default function Temple() {
  return (
    <div data-testid="page-temple">
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-10">
        <Reveal>
          <BilingualHeading
            kannada="ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ"
            english="The Temple"
            size="xl"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-3xl">
            A small village temple, old as memory itself, now wearing fresh
            stone. The garbhagudi of Sri Anjaneya in his Narthaki form remains
            the heart of the shrine; alongside him a new sanctum rises for Sri
            Vidya Hayagreeva.
          </p>
        </Reveal>
      </section>

      <SectionDivider label="ಆಂಜನೇಯ — ನರ್ತಕಿ" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <Reveal className="lg:col-span-7">
          <h2 className="font-serif-display text-3xl sm:text-4xl text-temple-ink">
            The Narthaki Anjaneya —
            <span className="italic text-vermillion"> a dancing Hanuman.</span>
          </h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Iconographers list dozens of forms of Lord Hanuman — Vira,
              Bhakta, Dasa, Yoga, Panchamukha. The Narthaki form, in which the
              monkey-god is captured mid-dance, is exceedingly rare. The hands
              do not hold a mace; they hold the rhythm of the universe.
            </p>
            <p>
              Local lore says that Hanuman, returning from Lanka with the
              sanjeevani, paused on the banks of the Cauvery near Rampura to
              dance in relief and joy. The village took that moment and made it
              a god. The original idol — small, black-stone, with one foot
              lifted — has been worshipped here for centuries.
            </p>
            <p>
              The old temple structure, which had weathered many monsoons, is
              being carefully remodelled. The deity has not moved; only the
              walls around him have grown stronger.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5">
          <div className="relative">
            <img
              src={IMG.lamp}
              alt="Brass diya in the temple"
              className="w-full aspect-[4/5] object-cover rounded-sm shadow-md"
              loading="lazy"
            />
            <div className="hidden sm:block absolute -bottom-5 -left-5 w-32 h-32 border-2 border-vermillion -z-10" />
          </div>
        </Reveal>
      </section>

      <SectionDivider label="ವಿದ್ಯಾ ಹಯಗ್ರೀವ" />

      <section className="bg-ink text-jasmine">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <img
              src={IMG.idolAdornedAngled}
              alt="The new Vidya Hayagreeva idol, adorned"
              className="w-full aspect-[4/5] object-cover rounded-sm"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="font-kannada text-marigold text-sm">
              ಹೊಸ ಗರ್ಭಗುಡಿ — ವಿದ್ಯಾ ಹಯಗ್ರೀವ
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-jasmine mt-2">
              A second sanctum, for the giver of knowledge.
            </h2>
            <p className="mt-5 text-jasmine/80 leading-relaxed">
              Sri Vidya Hayagreeva — the horse-faced form of Vishnu — presides
              over learning, mantra and clarity of mind. Carved from black
              Krishna shila by yogiraj <em>Adithya</em>, the very sculptor who
              shaped the Bala Rama vigraha now installed at Ayodhya, the idol
              has arrived at Rampura and awaits its praana pratishtha.
            </p>
            <Link
              to="/hayagreeva"
              data-testid="temple-shrine-link"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-marigold text-temple-ink px-6 py-3 text-sm font-medium hover:bg-jasmine transition-colors"
            >
              The shrine&apos;s full story <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SectionDivider label="ಶಿಲ್ಪಕಲೆ — Architecture" />

      <section
        data-testid="temple-architecture"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-8"
      >
        <Reveal>
          <BilingualHeading
            kannada="ದೇವಸ್ಥಾನದ ಶಿಲ್ಪಕಲೆ"
            english="The architecture of the temple"
            size="lg"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 text-muted-foreground max-w-3xl leading-relaxed">
            The remodelled temple draws from three great traditions of Indian
            sacred architecture — the soaring curvilinear towers of Kalinga, the
            jewelled pillar-craft of the Hoysalas, and the layered scripts of
            the deep south. Each surface has been chosen with intention.
          </p>
        </Reveal>

        <div
          data-testid="architecture-grid"
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Reveal>
            <article
              data-testid="arch-rekha-deula"
              className="h-full border border-border bg-sandstone/40 rounded-sm p-7"
            >
              <div className="w-11 h-11 rounded-full bg-ink text-marigold flex items-center justify-center mb-5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 2c2 4 4 7 4 12a4 4 0 0 1-8 0c0-5 2-8 4-12z" />
                  <path d="M8 18h8" />
                  <path d="M7 22h10" />
                </svg>
              </div>
              <div className="font-kannada text-vermillion text-sm">
                ರೇಖಾ ದೇಊಳ ಶೈಲಿ
              </div>
              <h3 className="font-serif-display text-2xl text-temple-ink mt-1">
                A Rekha Deula tower
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The shikhara above the sanctum has been raised in the{" "}
                <span className="text-temple-ink">Rekha Deula</span> style —
                the tall, curvilinear tower characteristic of Kalinga temples
                like Lingaraja and Jagannatha at Puri. Its slender vertical
                rekhas rise in a single, unbroken sweep, crowned by the amalaka
                and kalasha. Unusual for this part of Karnataka, the tower is a
                deliberate gesture: the village has reached eastward, to
                Odisha, for its skyline.
              </p>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article
              data-testid="arch-hoysala-pillars"
              className="h-full border border-border bg-sandstone/40 rounded-sm p-7"
            >
              <div className="w-11 h-11 rounded-full bg-ink text-marigold flex items-center justify-center mb-5">
                <Columns3 className="w-5 h-5" />
              </div>
              <div className="font-kannada text-vermillion text-sm">
                ಹೊಯ್ಸಳ ಸ್ತಂಭಗಳು
              </div>
              <h3 className="font-serif-display text-2xl text-temple-ink mt-1">
                Hoysala-inspired pillars
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The pillars of the mandapa have been turned and chiselled in
                the manner of the great Hoysala temples at Belur and Halebid —
                lathe-finished, multi-faceted, dark and gleaming. On each
                pillar, the sculptors have engraved the twelve{" "}
                <span className="text-temple-ink">rashis</span> and the
                twenty-seven <span className="text-temple-ink">nakshatras</span>,
                so that the whole of the zodiac stands quietly with the
                devotee. Children are known to circle a pillar looking for
                their own star.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs text-vermillion uppercase tracking-[0.25em]">
                <Stars className="w-3.5 h-3.5" /> 12 rashis · 27 nakshatras
              </div>
            </article>
          </Reveal>

          <Reveal delay={200}>
            <article
              data-testid="arch-hayagreeva-scripts"
              className="h-full border border-border bg-ink text-jasmine rounded-sm p-7"
            >
              <div className="w-11 h-11 rounded-full bg-marigold text-temple-ink flex items-center justify-center mb-5">
                <Languages className="w-5 h-5" />
              </div>
              <div className="font-kannada text-marigold text-sm">
                ಹಯಗ್ರೀವನ ಗರ್ಭಗುಡಿ — ಅಕ್ಷರ ಶಿಲ್ಪ
              </div>
              <h3 className="font-serif-display text-2xl text-jasmine mt-1">
                Letters carved for Hayagreeva
              </h3>
              <p className="mt-4 text-sm text-jasmine/80 leading-relaxed">
                The space dedicated to Sri Vidya Hayagreeva — the deity of
                learning — has been clothed in language itself. Its walls and
                lintels carry alphabets and bija-aksharas from the great
                literary tongues of India:
              </p>
              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-base">
                <div className="flex items-baseline gap-3">
                  <span className="text-marigold font-serif-display text-lg">
                    अ
                  </span>
                  <span className="text-jasmine/80 text-sm">Hindi</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-marigold font-serif-display text-lg">
                    ॐ
                  </span>
                  <span className="text-jasmine/80 text-sm">Sanskrit</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-marigold font-kannada text-lg">ಅ</span>
                  <span className="text-jasmine/80 text-sm">Kannada</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-marigold text-lg">அ</span>
                  <span className="text-jasmine/80 text-sm">Tamil</span>
                </div>
                <div className="flex items-baseline gap-3 col-span-2">
                  <span className="text-marigold text-lg">అ</span>
                  <span className="text-jasmine/80 text-sm">Telugu</span>
                </div>
              </div>
              <p className="mt-5 text-xs text-jasmine/60 italic">
                Every native script is a different way of remembering the same
                truth.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-12 max-w-3xl text-muted-foreground italic font-serif-display text-lg leading-relaxed">
            A Kalinga tower above, Hoysala stars at hand, and the alphabets of
            India at the threshold of knowledge — a small village temple has
            quietly gathered the country into its walls.
          </p>
        </Reveal>
      </section>
    </div>
  );
}

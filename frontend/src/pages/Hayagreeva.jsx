import React from "react";
import { BilingualHeading, SectionDivider } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { IMG } from "@/lib/data";

export default function Hayagreeva() {
  return (
    <div data-testid="page-hayagreeva">
      <section className="relative bg-ink text-jasmine overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src={IMG.idolBare}
            alt=""
            aria-hidden
            className="w-full h-full object-cover slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
          <Reveal>
            <div className="font-kannada text-marigold text-base">
              ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif-display text-5xl sm:text-7xl text-jasmine mt-4 leading-[1.02]">
              Sri Vidya Hayagreeva
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 italic text-jasmine/80 max-w-2xl mx-auto font-serif-display text-xl">
              &ldquo;Jñānānanda-mayam devam nirmala-sphaṭikākṛtim — ādhāram
              sarva-vidyānām hayagrīvam upāsmahe.&rdquo;
            </p>
            <p className="mt-3 text-sm text-jasmine/60">
              We meditate upon Hayagreeva — embodiment of knowledge and bliss,
              pure as crystal, the very ground of all learning.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-5">
          <img
            src={IMG.idolBare}
            alt="The Vidya Hayagreeva idol, before alankara"
            className="w-full aspect-[3/4] object-cover rounded-sm shadow-md"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <BilingualHeading
            kannada="ಕಲೆಗಾರ"
            english="The sculptor — Adithya yogiraj."
            size="md"
          />
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              The vigraha has been shaped by the celebrated sculptor{" "}
              <span className="text-temple-ink">Adithya yogiraj</span> — the same
              hands that carved the Bala Rama murti installed at the new
              Ayodhya temple. To work in Krishna shila is to coax life from
              stone; the sculptor speaks of it as <em>sadhana</em>, not craft.
            </p>
            <p>
              The stone itself was selected for its even grain and its deep,
              almost wet, black lustre. Months of carving — beginning with the
              kireeta and ending with the toes of the lotus pedestal — have
              produced the form you now see.
            </p>
          </div>
        </Reveal>
      </section>

      <SectionDivider label="ಆಲಂಕಾರ" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal>
          <img
            src={IMG.idolAdornedFrontal}
            alt="Vidya Hayagreeva adorned with jasmine and roses"
            className="w-full aspect-[4/5] object-cover rounded-sm"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120}>
          <img
            src={IMG.idolAdornedAngled}
            alt="Vidya Hayagreeva — three-quarter view, adorned"
            className="w-full aspect-[4/5] object-cover rounded-sm"
            loading="lazy"
          />
        </Reveal>
      </section>

      <section className="bg-sandstone/60 mt-24 border-y border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 text-center">
          <Reveal>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-temple-ink">
              Why Hayagreeva, here?
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The villagers of Rampura have always sent their children for
              education to the towns nearby. Adding Hayagreeva — the deity of
              learning — to the temple is the village&apos;s prayer for those
              children: clarity of mind, the patience to study, the courage to
              speak. He stands beside Anjaneya, who is himself the chief of
              learners. Two forms of wisdom, in one small village.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { Reveal } from "@/components/Reveal";
import { BilingualHeading } from "@/components/BilingualHeading";
import { OrnamentDivider, LotusMedallion } from "@/components/Ornaments";
import { IMG } from "@/lib/data";

export default function Hayagreeva() {
  return (
    <div data-testid="page-hayagreeva">
      <section className="relative bg-deep text-jasmine overflow-hidden min-h-[88vh] flex items-center">
        <div className="absolute inset-0 opacity-55">
          <img src={IMG.idolBare} alt="" aria-hidden className="w-full h-full object-cover slow-pan" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/80 via-deep/70 to-deep" />
        </div>
        <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.06]">
          <div className="spin-slow w-full h-full"><LotusMedallion className="w-full h-full" color="hsl(38, 95%, 62%)" /></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 text-center">
          <Reveal>
            <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">A New Shrine</div>
          </Reveal>
          <Reveal delay={100}>
            <div className="font-kannada text-marigold text-base mt-4">ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="display-hero text-jasmine text-7xl sm:text-8xl lg:text-9xl mt-5 leading-[0.92]">
              Sri Vidya
              <br />
              <em className="text-marigold">Hayagreeva.</em>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-10 italic text-jasmine/80 max-w-2xl mx-auto font-serif-display text-xl sm:text-2xl leading-relaxed">
              “Jñānānanda-mayam devam nirmala-sphaṭikākṛtim — ādhāram sarva-vidyānām hayagrīvam upāsmahe.”
            </p>
            <p className="mt-4 text-sm text-jasmine/55">
              We meditate upon Hayagreeva — embodiment of knowledge and bliss, pure as crystal,
              the very ground of all learning.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-5">
          <img src={IMG.idolBare} alt="Vidya Hayagreeva idol, before alankara" className="w-full aspect-[3/4] object-cover rounded-sm shadow-md" loading="lazy" />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">The Sculptor</div>
          <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4 leading-[0.95]">
            By the hands of
            <em className="text-vermillion"> Adithya yogiraj.</em>
          </h2>
          <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.8] text-muted-foreground">
            <p>
              The vigraha has been shaped by the celebrated sculptor{" "}
              <span className="text-temple-ink">Adithya yogiraj</span> — the same hands
              that carved the Bala Rama murti installed at the new Ayodhya temple. To
              work in Krishna shila is to coax life from stone; the sculptor speaks of
              it as <em>sadhana</em>, not craft.
            </p>
            <p>
              The stone was chosen for its even grain and its deep, almost wet, black
              lustre. Months of carving — beginning with the kirīta and ending with the
              toes of the lotus pedestal — have produced the form you now see.
            </p>
          </div>
        </Reveal>
      </section>

      <OrnamentDivider label="The alankara" kn="ಆಲಂಕಾರ" />

      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal>
          <img src={IMG.idolAdornedFrontal} alt="Vidya Hayagreeva adorned" className="w-full aspect-[4/5] object-cover rounded-sm" loading="lazy" />
        </Reveal>
        <Reveal delay={120}>
          <img src={IMG.idolAdornedAngled} alt="Three-quarter view, adorned" className="w-full aspect-[4/5] object-cover rounded-sm" loading="lazy" />
        </Reveal>
      </section>

      <section className="bg-cream/60 mt-24 border-y border-border py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <BilingualHeading kannada="ಯಾಕೆ ಇಲ್ಲಿ?" english="Why Hayagreeva, here?" size="lg" align="center" />
            <p className="mt-7 text-muted-foreground leading-relaxed">
              The villagers of Rampura have always sent their children for learning to
              the towns nearby. Adding Hayagreeva — the deity of knowledge — to the
              temple is the village&apos;s prayer for those children: clarity of mind, the
              patience to study, the courage to speak. He stands beside Anjaneya, who
              is himself the chief of learners. Two forms of wisdom, in one small village.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Medallion } from "@/components/Ornaments";
import { IMG } from "@/lib/data";

export default function Hayagreeva() {
  return (
    <div data-testid="page-hayagreeva">
      <section className="relative bg-canvas-deep overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img src={IMG.hayagreevaBare} alt="" aria-hidden className="w-full h-full object-cover slow-pan opacity-35" />
          <div className="absolute inset-0 bg-canvas-deep/80" />
        </div>
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05]">
          <div className="spin-slow w-full h-full"><Medallion className="w-full h-full" color="hsl(20 51% 55%)" /></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 text-center">
          <Reveal>
            <div className="text-eyebrow text-copper">A New Shrine</div>
            <div className="font-kannada text-copper text-base mt-4">ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
            <h1 className="text-display-hero text-cream mt-5">
              Sri Vidya <em className="italic text-copper">Hayagreeva.</em>
            </h1>
            <p className="mt-10 italic text-cream/90 max-w-2xl mx-auto font-display text-xl sm:text-2xl leading-relaxed">
              “Jñānānanda-mayam devam nirmala-sphaṭikākṛtim — ādhāram sarva-vidyānām hayagrīvam upāsmahe.”
            </p>
            <p className="mt-4 text-sm text-cream/80 max-w-xl mx-auto">
              We meditate upon Hayagreeva — embodiment of knowledge and bliss, pure as crystal,
              the very ground of all learning.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-canvas-deep py-24 sm:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <img src={IMG.hayagreevaBare} alt="Vidya Hayagreeva, before alankara" className="w-full aspect-[3/4] object-cover border border-warm" loading="lazy" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="text-eyebrow text-copper">The Sculptor</div>
            <h2 className="text-display-h2 text-cream mt-4">
              By the hands of <em className="italic text-copper">Adithya yogiraj.</em>
            </h2>
            <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.8] text-cream/85">
              <p>
                The vigraha has been shaped by the celebrated sculptor
                <span className="text-cream"> Adithya yogiraj</span> — the same
                hands that carved the Bala Rama murti installed at the new
                Ayodhya temple. To work in Krishna shila is to coax life from
                stone; the sculptor speaks of it as <em>sadhana</em>, not craft.
              </p>
              <p>
                The stone was chosen for its even grain and its deep, almost
                wet, black lustre. Months of careful carving — beginning with
                the kirīta and ending with the toes of the lotus pedestal —
                have produced the form you now see.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <OrnamentDivider label="The Alankara" kn="ಆಲಂಕಾರ" theme="dark" />

      <section className="bg-canvas-deep">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <img src={IMG.hayagreevaAdornedFrontal} alt="Vidya Hayagreeva adorned, frontal" className="w-full aspect-[4/5] object-cover border border-warm" loading="lazy" />
          </Reveal>
          <Reveal delay={120}>
            <img src={IMG.hayagreevaAdornedAngled} alt="Vidya Hayagreeva adorned, three-quarter view" className="w-full aspect-[4/5] object-cover border border-warm" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="bg-canvas-ivory text-deep mt-24 py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <div className="font-kannada text-copper text-sm">ಯಾಕೆ ಇಲ್ಲಿ?</div>
            <h2 className="text-display-h2 text-deep mt-3">
              Why Hayagreeva, <em className="italic text-copper">here?</em>
            </h2>
            <p className="mt-7 text-deep/85 leading-relaxed">
              The villagers of Rampura have always sent their children to the
              towns nearby for learning. Adding Hayagreeva — the deity of
              knowledge — to the temple is the village&apos;s prayer for those
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

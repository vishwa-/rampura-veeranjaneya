import React from "react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Masthead, Medallion } from "@/components/Ornaments";
import { IMG } from "@/lib/data";

export default function Hayagreeva() {
  return (
    <div data-testid="page-hayagreeva">
      <section className="relative bg-paper border-b border-ink-muted/20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 pt-10 sm:pt-16 pb-16">
          <Masthead date="Newly installed · 2026" edition="The Shrine Chronicle" label="Chapter III" />
          <Reveal delay={120}>
            <div className="text-center mt-12 max-w-4xl mx-auto">
              <div className="font-kannada text-crimson text-base mt-4">ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ</div>
              <h1 className="text-masthead text-ink mt-4">
                Sri Vidya <em className="italic text-crimson">Hayagreeva.</em>
              </h1>
              <div className="mt-8 max-w-3xl mx-auto">
                <div className="rule-thick mb-5" />
                <p className="font-display italic text-ink text-lg sm:text-xl leading-relaxed">
                  “Jñānānanda-mayam devam nirmala-sphaṭikākṛtim — ādhāram sarva-vidyānām hayagrīvam upāsmahe.”
                </p>
                <div className="rule-thick mt-5" />
                <p className="mt-4 text-sm text-ink-muted">
                  We meditate upon Hayagreeva — embodiment of knowledge and bliss, pure as crystal, the very ground of all learning.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <figure className="photo-vignette">
              <img src={IMG.hayagreevaBare} alt="Vidya Hayagreeva, before alankara" className="w-full aspect-[3/4] object-cover photo-sepia border border-ink-muted/30" loading="lazy" />
            </figure>
            <figcaption className="mt-3 text-label-sm text-ink-muted">Krishna shila · before alankara</figcaption>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="text-label text-crimson">The Sculptor</div>
            <h2 className="text-display-h1 text-ink mt-5">
              By the hands of <em className="italic text-crimson">Adithya yogiraj.</em>
            </h2>
            <div className="rule-crimson mt-7 w-16" />
            <div className="mt-7 space-y-5 text-base sm:text-lg leading-[1.85] text-ink/90">
              <p className="dropcap">
                The vigraha has been shaped by the celebrated sculptor
                <span className="text-ink"> Adithya yogiraj</span> — the same
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

      <OrnamentDivider label="The Alankara" kn="ಆಲಂಕಾರ" theme="light" />

      <section className="bg-paper-aged border-y border-ink-muted/20 py-20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <figure className="photo-vignette">
              <img src={IMG.hayagreevaAdornedFrontal} alt="Vidya Hayagreeva adorned, frontal" className="w-full aspect-[4/5] object-cover photo-sepia border border-ink-muted/30" loading="lazy" />
            </figure>
            <figcaption className="mt-3 text-label-sm text-ink-muted">Frontal · with jasmine and roses</figcaption>
          </Reveal>
          <Reveal delay={120}>
            <figure className="photo-vignette">
              <img src={IMG.hayagreevaAdornedAngled} alt="Vidya Hayagreeva adorned, three-quarter view" className="w-full aspect-[4/5] object-cover photo-sepia border border-ink-muted/30" loading="lazy" />
            </figure>
            <figcaption className="mt-3 text-label-sm text-ink-muted">Three-quarter · garlanded and draped</figcaption>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Medallion className="w-9 h-9 mx-auto text-crimson" color="hsl(0 56% 39%)" />
          <div className="text-label text-crimson mt-5">Why here?</div>
          <h2 className="text-display-h1 text-ink mt-5">
            Why Hayagreeva, <em className="italic text-crimson">here?</em>
          </h2>
          <div className="rule-crimson mt-7 w-16 mx-auto" />
          <p className="mt-8 text-ink/90 leading-[1.85] font-body">
            The villagers of Rampura have always sent their children to the
            towns nearby for learning. Adding Hayagreeva — the deity of
            knowledge — to the temple is the village&apos;s prayer for those
            children: clarity of mind, the patience to study, the courage to
            speak. He stands beside Anjaneya, who is himself the chief of
            learners. Two forms of wisdom, in one small village.
          </p>
        </div>
      </section>
    </div>
  );
}

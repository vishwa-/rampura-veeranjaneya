import React from "react";
import { BilingualHeading } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, LotusMedallion } from "@/components/Ornaments";
import { IMG } from "@/lib/data";

export default function Rampura() {
  return (
    <div data-testid="page-rampura">
      <section className="relative bg-deep text-jasmine min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.sugarcane} alt="" aria-hidden className="w-full h-full object-cover opacity-35 slow-pan" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/85 to-deep" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center">
          <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">A Glimpse of</div>
          <div className="font-kannada text-marigold/80 text-base mt-3">ರಾಂಪುರ</div>
          <h1 className="display-hero text-jasmine text-6xl sm:text-7xl lg:text-8xl mt-4">
            Rampura
          </h1>
          <p className="mt-6 font-serif-display italic text-jasmine/90 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            “A small and tidy village on the bank of the Kaveri — very close to the
            historically renowned cities of Mysuru and Srirangapatna.”
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <img src={IMG.sugarcane} alt="Sugarcane fields near Rampura" className="w-full aspect-[4/5] object-cover rounded-sm shadow-md" loading="lazy" />
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-40 h-40 bg-marigold/90 -z-10" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">Tradition · ಪರಂಪರೆ</div>
          <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4 leading-[0.95]">
            A dancer of
            <em className="text-vermillion"> innocent expression.</em>
          </h2>
          <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.8] text-muted-foreground">
            <p>
              The Sri Anjaneya enshrined here is in the <span className="text-temple-ink italic">nartaki</span>{" "}
              form — a dancer, with a soft, innocent expression. The villagers will tell you
              He is the very lifeline of this place — and, sometimes, the gentle cause of
              the small mischiefs that happen here.
            </p>
            <p>
              The wise of Rampura have long been seen as a proud symbol of this tradition —
              tending the fields by day, ringing the small brass bell on their way past
              the temple, both at dawn and at dusk.
            </p>
          </div>
        </Reveal>
      </section>

      <OrnamentDivider label="Ramayana memory" kn="ರಾಮಾಯಣ ಸ್ಮೃತಿ" />

      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal delay={120}>
          <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">Ramayana</div>
          <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4 leading-[0.95]">
            Hanuman returned to <em className="text-vermillion">this very bend of the river.</em>
          </h2>
          <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.8] text-muted-foreground">
            <p>
              The old people of the village say this is the place where, having gone to
              Lanka and beheld Mother Sita, Hanuman returned bearing her Chudamani — the
              crest-jewel — and the fruit of his mission. He paused here, joyful and
              spent, on the way back to Sri Rama.
            </p>
            <p>
              Later, when Sri Rama Himself journeyed to Lanka, He is said to have stopped
              at Rampura, installed <span className="text-temple-ink italic">Ramalingeshwara</span>,
              rested briefly near Sage Gautama, and only then continued south.
            </p>
            <p>
              Ahalya Devi&apos;s release from her long stone-curse — the local tradition holds —
              may have happened in these very fields.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <img src={IMG.cauvery} alt="Banks of the Cauvery" className="w-full aspect-[4/5] object-cover rounded-sm shadow-md" loading="lazy" />
        </Reveal>
      </section>

      <section className="bg-deep text-jasmine mt-24 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center">
          <LotusMedallion className="w-[600px] h-[600px] spin-slow" color="hsl(38, 95%, 62%)" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">The Living Heart</div>
          <h2 className="display-hero text-jasmine text-5xl sm:text-6xl mt-4">
            The village deity — Anjaneya,
            <br />
            <em className="text-marigold"> dancing.</em>
          </h2>
          <p className="mt-7 text-jasmine/75 leading-relaxed">
            Most temples to Hanuman show Him standing in vīra posture, mace in hand. In
            Rampura, He dances. The rare Nartaki Anjaneya — a form of joy and
            lightness — has been the quiet centre of this village for generations. The
            old garbhagudi was carefully renovated, completing in March 2022; and now,
            beside Him, a new shrine to Sri Vidya Hayagreeva is being built.
          </p>
        </div>
      </section>
    </div>
  );
}

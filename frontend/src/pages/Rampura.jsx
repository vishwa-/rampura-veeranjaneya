import React from "react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Medallion } from "@/components/Ornaments";
import { IMG } from "@/lib/data";

function PageHero({ kn, label, title, italic, subtitle, image }) {
  return (
    <section className="relative bg-canvas-deep min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {image ? (
          <img src={image} alt="" aria-hidden className="w-full h-full object-cover slow-pan opacity-25" loading="eager" />
        ) : null}
        <div className="absolute inset-0 bg-canvas-deep/85" />
      </div>
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center">
        <div className="text-eyebrow text-copper">{label}</div>
        {kn ? <div className="font-kannada text-copper text-base mt-4">{kn}</div> : null}
        <h1 className="text-display-hero text-cream mt-4">
          {italic ? (
            <>
              {title.split(italic)[0]}
              <em className="italic text-copper">{italic}</em>
              {title.split(italic).slice(1).join(italic)}
            </>
          ) : title}
        </h1>
        {subtitle ? <p className="mt-7 font-display italic text-cream/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">“{subtitle}”</p> : null}
      </div>
    </section>
  );
}

export default function Rampura() {
  return (
    <div data-testid="page-rampura">
      <PageHero
        label="About"
        kn="ರಾಂಪುರ"
        title="The village of Rampura"
        italic="Rampura"
        subtitle="A small and tidy village on the bank of the Cauvery — very close to the historically renowned cities of Mysuru and Srirangapatna."
        image={IMG.templeOldExterior}
      />

      <section className="bg-canvas-deep py-24 sm:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <img src={IMG.templeOldFacade} alt="The old façade of the village shrine" className="w-full aspect-[4/5] object-cover border border-warm" loading="lazy" />
          </Reveal>
          <Reveal delay={120}>
            <div className="text-eyebrow text-copper">Tradition · ಪರಂಪರೆ</div>
            <h2 className="text-display-h2 text-cream mt-4">
              A dancer of <em className="italic text-copper">innocent expression.</em>
            </h2>
            <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.8] text-cream/85">
              <p>
                The Sri Anjaneya enshrined here is in the rare Narthaki form — a
                dancer, with a soft and innocent gaze. The villagers will tell
                you He is the very lifeline of this place, and at times the
                gentle cause of the small mischiefs that happen here.
              </p>
              <p>
                The wise of Rampura have long been seen as a proud symbol of
                this tradition — tending the fields by day, ringing the small
                brass bell on their way past the temple, at dawn and at dusk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <OrnamentDivider label="Ramayana memory" kn="ರಾಮಾಯಣ ಸ್ಮೃತಿ" theme="dark" />

      <section className="bg-canvas-ivory text-deep">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="text-eyebrow text-copper">Ramayana</div>
            <h2 className="text-display-h2 text-deep mt-4">
              Hanuman returned to <em className="italic text-copper">this very bend of the river.</em>
            </h2>
            <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.8] text-deep/85">
              <p>
                The old people of the village say this is the place where, having
                gone to Lanka and beheld Mother Sita, Hanuman returned bearing
                her Chudamani — the crest-jewel — and the fruit of his mission.
                He paused here, joyful and spent, on the way back to Sri Rama.
              </p>
              <p>
                Later, when Sri Rama Himself journeyed south, He is said to have
                stopped at Rampura, installed <span className="italic text-copper">Ramalingeshwara</span>,
                rested briefly near Sage Gautama, and only then continued on.
              </p>
              <p>
                Ahalya Devi&apos;s release from her long stone-curse — the local
                tradition holds — may well have happened in these very fields.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img src={IMG.templeOldPorch} alt="The old porch of the village shrine" className="w-full aspect-[4/5] object-cover border border-copper/30" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="bg-canvas-deep py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
          <div className="spin-slow"><Medallion className="w-[600px] h-[600px]" color="hsl(20 51% 55%)" /></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-eyebrow text-copper">The Living Heart</div>
          <h2 className="text-display-h2 text-cream mt-4">
            The village deity — Anjaneya, <em className="italic text-copper">dancing.</em>
          </h2>
          <p className="mt-7 text-cream/85 leading-relaxed">
            Most temples to Hanuman show Him standing in vīra posture, mace in
            hand. In Rampura, He dances. The rare Nartaki Anjaneya — a form of
            joy and lightness — has been the quiet centre of this village for
            generations. The old garbhagudi was renovated, completing in March
            2022. And now, beside Him, a new shrine to Sri Vidya Hayagreeva is
            being built.
          </p>
        </div>
      </section>
    </div>
  );
}

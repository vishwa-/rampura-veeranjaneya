import React from "react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Masthead } from "@/components/Ornaments";
import { IMG } from "@/lib/data";

function PageHero({ kn, label, title, italic, subtitle, image, dateline }) {
  return (
    <section className="relative bg-paper border-b border-ink-muted/20">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 pt-10 sm:pt-16 pb-16">
        <Masthead date={dateline ?? "On the Cauvery banks"} edition="A Gazetteer of Rampura" label={label} />
        <Reveal delay={120}>
          <div className="text-center mt-12 max-w-4xl mx-auto">
            {kn ? <div className="font-kannada text-crimson text-base mt-4">{kn}</div> : null}
            <h1 className="text-display-h1 text-ink mt-4">
              {italic ? (
                <>
                  {title.split(italic)[0]}
                  <em className="italic text-crimson">{italic}</em>
                  {title.split(italic).slice(1).join(italic)}
                </>
              ) : title}
            </h1>
            {subtitle ? (
              <p className="mt-6 font-display italic text-ink-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                “{subtitle}”
              </p>
            ) : null}
          </div>
        </Reveal>
        {image ? (
          <Reveal delay={260}>
            <figure className="mt-12 max-w-5xl mx-auto photo-vignette">
              <img src={image} alt="" aria-hidden className="w-full aspect-[16/7] object-cover photo-sepia" loading="eager" />
            </figure>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export default function Rampura() {
  return (
    <div data-testid="page-rampura">
      <PageHero
        label="Chapter I"
        kn="ರಾಂಪುರ"
        title="The village of Rampura"
        italic="Rampura"
        subtitle="A small and tidy village on the bank of the Cauvery — very close to the historically renowned cities of Mysuru and Srirangapatna."
        image={IMG.templeOldExterior}
      />

      <section className="bg-paper py-24 sm:py-32">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <figure className="photo-vignette">
              <img src={IMG.templeOldFacade} alt="The old façade of the village shrine" className="w-full aspect-[4/5] object-cover photo-sepia border border-ink-muted/30" loading="lazy" />
            </figure>
            <figcaption className="mt-3 text-label-sm text-ink-muted">The old façade · before renovation</figcaption>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="text-label text-crimson">Tradition · ಪರಂಪರೆ</div>
            <h2 className="text-display-h1 text-ink mt-5">
              A dancer of <em className="italic text-crimson">innocent expression.</em>
            </h2>
            <div className="rule-crimson mt-7 w-16" />
            <div className="mt-7 space-y-5 text-base sm:text-lg leading-[1.85] text-ink/90">
              <p className="dropcap">
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

      <OrnamentDivider label="Ramayana memory" kn="ರಾಮಾಯಣ ಸ್ಮೃತಿ" theme="light" />

      <section className="bg-paper-aged py-24 sm:py-32 border-y border-ink-muted/20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <Reveal className="lg:col-span-7">
            <div className="text-label text-crimson">Chapter II · Ramayana</div>
            <h2 className="text-display-h1 text-ink mt-5">
              Hanuman returned to <em className="italic text-crimson">this very bend of the river.</em>
            </h2>
            <div className="rule-crimson mt-7 w-16" />
            <div className="mt-7 space-y-5 text-base sm:text-lg leading-[1.85] text-ink/90">
              <p className="dropcap">
                The old people of the village say this is the place where, having
                gone to Lanka and beheld Mother Sita, Hanuman returned bearing
                her Chudamani — the crest-jewel — and the fruit of his mission.
                He paused here, joyful and spent, on the way back to Sri Rama.
              </p>
              <p>
                Later, when Sri Rama Himself journeyed south, He is said to have
                stopped at Rampura, installed <span className="italic text-crimson">Ramalingeshwara</span>,
                rested briefly near Sage Gautama, and only then continued on.
              </p>
              <p>
                Ahalya Devi&apos;s release from her long stone-curse — the local
                tradition holds — may well have happened in these very fields.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <figure className="photo-vignette">
              <img src={IMG.templeOldPorch} alt="The old porch with painted columns" className="w-full aspect-[4/5] object-cover photo-sepia border border-ink-muted/30" loading="lazy" />
            </figure>
            <figcaption className="mt-3 text-label-sm text-ink-muted">The old porch · weathered columns</figcaption>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-deep text-cream py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-label text-gold-old">The Living Heart</div>
          <h2 className="text-display-h1 text-cream mt-5">
            The village deity — Anjaneya, <em className="italic text-gold-old">dancing.</em>
          </h2>
          <div className="rule-thin mt-7 w-16 mx-auto" style={{ borderColor: "hsl(38 38% 54%)" }} />
          <p className="mt-8 text-cream/90 leading-[1.85] font-body">
            Most temples to Hanuman show Him standing in vīra posture, mace in
            hand. In Rampura, He dances. The rare Nartaki Anjaneya — a form of
            joy and lightness — has been the quiet centre of this village for
            generations. The old garbhagudi was renovated, completing in March
            2022; and now, beside Him, a new shrine to Sri Vidya Hayagreeva is
            being built.
          </p>
        </div>
      </section>
    </div>
  );
}

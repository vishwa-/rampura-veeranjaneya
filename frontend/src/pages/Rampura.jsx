import React from "react";
import { BilingualHeading, SectionDivider } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { IMG } from "@/lib/data";

export default function Rampura() {
  return (
    <div data-testid="page-rampura">
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-10">
        <Reveal>
          <BilingualHeading
            kannada="ರಾಂಪುರದ ಬಗ್ಗೆ"
            english="About Rampura"
            size="xl"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-lg sm:text-xl leading-relaxed text-muted-foreground font-serif-display italic">
            A tiny, innocuous village nestled close to two of South India&apos;s
            most storied towns — Mysore and Srirangapatna — whose strength is
            its people, its fields, and a small black-stone idol of Anjaneya
            who, in this corner of the world, chose to dance.
          </p>
        </Reveal>
      </section>

      <SectionDivider />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <img
            src={IMG.sugarcane}
            alt="Sugarcane plantations near Rampura"
            className="w-full aspect-[4/3] object-cover rounded-sm shadow-md"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-temple-ink">
            Sugarcane, Cauvery,
            <span className="italic text-vermillion"> a small bell.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            The land here is generous. Sugarcane grows in long, deep rows along
            the Cauvery&apos;s banks. Paddy, ragi, banana — each season brings
            its own colour to the village. Farmers begin their day before
            sunrise; many of them stop at the temple before stepping into the
            fields, ringing the small brass bell at the door.
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-temple-ink order-2 md:order-1">
            Between two
            <span className="italic text-vermillion"> royal cities.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Mysore — the city of palaces and the Wodeyars — is just twenty-two
            kilometres away. Srirangapatna — Tipu Sultan&apos;s island fortress
            and Sri Ranganatha&apos;s ancient seat — is closer still, only eight.
            And yet Rampura keeps its quiet. The wider history of Karnataka has
            washed past it, leaving the village to its fields and to its god.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <img
            src={IMG.lamp}
            alt="Traditional brass lamp"
            className="w-full aspect-[4/3] object-cover rounded-sm shadow-md"
            loading="lazy"
          />
        </Reveal>
      </section>

      <section className="bg-sandstone/60 mt-24 border-y border-border">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 text-center">
          <Reveal>
            <div className="font-kannada text-vermillion text-sm">
              ಗ್ರಾಮದ ಪ್ರಾಣ — ಆಂಜನೇಯ
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-temple-ink mt-2">
              The village deity — Anjaneya, in the Narthaki form.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Most temples to Hanuman show him standing in vira posture, mace in
              hand. In Rampura, he dances. The rare Narthaki Anjaneya — a form
              of joy and lightness — has been the silent heart of this village
              for generations. It is to honour him that the temple is being
              remodelled, and that the new shrine to Vidya Hayagreeva is being
              built beside him.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { BilingualHeading } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, LotusMedallion } from "@/components/Ornaments";

export default function Mantra() {
  return (
    <div data-testid="page-mantra">
      <section className="relative bg-deep text-jasmine py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] flex items-center justify-center">
          <div className="spin-slow"><LotusMedallion className="w-[700px] h-[700px]" color="hsl(38, 95%, 62%)" /></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">The Rama Mantra</div>
          <div className="font-kannada text-marigold/80 text-base mt-4">ಶ್ರೀರಾಮ ಮಂತ್ರದ ಅರಿವು</div>
          <h1 className="display-hero text-jasmine text-6xl sm:text-7xl lg:text-8xl mt-5 leading-[0.95]">
            Rama, Rama,
            <em className="text-marigold"> Rama.</em>
          </h1>
          <p className="mt-8 text-jasmine/75 font-serif-display italic text-lg sm:text-xl leading-relaxed">
            Sweeter than sugar, milk, cream, honey, curd — or even a mixture of all of them.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">Why we chant</div>
          <h2 className="display-hero text-temple-ink text-5xl sm:text-6xl mt-4 leading-[0.95]">
            A name that is also
            <em className="text-vermillion"> a thousand.</em>
          </h2>
        </Reveal>
        <div className="lg:col-span-7 space-y-7 text-base sm:text-lg leading-[1.8] text-muted-foreground">
          <Reveal delay={100}>
            <p>
              The name <span className="text-temple-ink italic">Sri Rama</span> is a
              symbol of upliftment (uddhāra), of knowledge, and of prosperity. Of all
              the beings of this universe, only the human tongue is allowed to chant
              the Sri Rama Mahāmantra.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p>
              Daily recitation purifies a life and widens it to the universal. Chanted
              together as a family, the name increases harmony and well-being. It needs
              no time, no place, no preparation.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="border-l-2 border-vermillion/50 pl-6 py-2 bg-sandstone/40 rounded-r-sm">
              <p>
                <span className="text-temple-ink font-serif-display text-xl">In Sanskrit gematria</span> —
                the syllable <span className="text-vermillion font-serif-display text-2xl">रा</span> has
                the value <span className="font-serif-display text-temple-ink text-2xl">2</span>, and{" "}
                <span className="text-vermillion font-serif-display text-2xl">म</span> has the value{" "}
                <span className="font-serif-display text-temple-ink text-2xl">5</span>.
              </p>
              <p className="mt-3">
                Chanting <em>Rāma</em> three times therefore equals{" "}
                <span className="text-temple-ink font-serif-display">2 × 5 × 2 × 5 × 2 × 5 ={" "}
                <span className="text-vermillion text-3xl">1,000</span></span>.
              </p>
              <p className="mt-3">
                And so — three utterances of His name carry the merit of an entire
                Vishnu Sahasranama.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <OrnamentDivider label="The Rama Stupa" kn="ರಾಮಸ್ತೂಪ" />

      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <BilingualHeading kannada="ಸಂಕಲ್ಪ" english="The Sankalpa" size="lg" />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Alongside the temple&apos;s jīrnōddhāra, devotees were given small books to
            record their chanting of the Sri Rama mantra. When the book was complete,
            they performed a home puja, circumambulated the temple 21 to 108 times,
            and placed the book inside the <span className="text-temple-ink italic">Rama Stupa</span> —
            a column of accumulated devotion.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="border border-border bg-cream/60 p-8 sm:p-10 rounded-sm">
            <div className="font-serif-sc text-vermillion text-xs tracking-[0.4em] uppercase">How to participate</div>
            <ol className="mt-6 space-y-4 list-none">
              {[
                "Write the name of Sri Rama with intention — for as long as the book lasts.",
                "When complete, do a puja at home before the family deity.",
                "Visit the temple and circumambulate 21 to 108 times in pradakshina.",
                "Place the book inside the Rama Stupa with the trust.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-serif-display text-3xl text-vermillion/60 leading-none">{i + 1}</span>
                  <span className="text-temple-ink leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-muted-foreground italic">
              Contact the temple office (info@rampura.in) to receive a book.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="bg-deep text-jasmine py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <LotusMedallion className="w-10 h-10 mx-auto text-marigold" color="hsl(38, 95%, 62%)" />
          <p className="mt-8 font-serif-display italic text-jasmine/80 text-xl sm:text-2xl leading-relaxed">
            May Sri Rama, together with Sita Devi, Lakshmana, Bharata, Shatrughna,
            and Anjaneya, grant to you and all your kith and kin the fulfilment of
            each one&apos;s heartfelt desires.
          </p>
          <div className="mt-8 font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">
            Jai Sri Ram
          </div>
        </div>
      </section>
    </div>
  );
}

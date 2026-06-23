import React from "react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Medallion } from "@/components/Ornaments";
import { TEMPLE_ADDRESS } from "@/lib/data";

export default function Mantra() {
  return (
    <div data-testid="page-mantra">
      <section className="relative bg-canvas-deep py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
          <div className="spin-slow"><Medallion className="w-[700px] h-[700px]" color="hsl(20 51% 55%)" /></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-eyebrow text-copper">The Rama Mantra</div>
          <div className="font-kannada text-copper text-base mt-4">ಶ್ರೀರಾಮ ಮಂತ್ರ</div>
          <h1 className="text-display-hero text-cream mt-5">
            Rama, Rama, <em className="italic text-copper">Rama.</em>
          </h1>
          <p className="mt-8 text-cream/90 font-display italic text-lg sm:text-xl leading-relaxed">
            Sweeter than sugar, milk, cream, honey, curd — or even all of them together.
          </p>
        </div>
      </section>

      <section className="bg-canvas-ivory text-deep">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="text-eyebrow text-copper">Why we chant</div>
            <h2 className="text-display-h2 text-deep mt-4">
              A name that is also <em className="italic text-copper">a thousand.</em>
            </h2>
          </Reveal>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-[1.85] text-deep/85">
            <Reveal delay={100}>
              <p>
                The name <span className="italic text-copper">Sri Rama</span> is a
                symbol of upliftment, of knowledge, and of prosperity. Of all
                the beings of this universe, only the human tongue is allowed
                to chant the Sri Rama Mahāmantra.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p>
                Daily recitation purifies a life and widens it to the universal.
                Chanted together as a family, the name increases harmony and
                well-being. It needs no time, no place, no preparation.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="border-l-2 border-copper/60 pl-6 py-2 bg-canvas-ivory-surface">
                <p>
                  <span className="text-deep font-display text-xl">In Sanskrit gematria</span> —
                  the syllable <span className="font-display text-2xl text-copper">रा</span> has
                  the value <span className="font-display text-2xl text-deep">2</span>, and{" "}
                  <span className="font-display text-2xl text-copper">म</span> has the value{" "}
                  <span className="font-display text-2xl text-deep">5</span>.
                </p>
                <p className="mt-3">
                  Chanting <em>Rāma</em> three times therefore equals{" "}
                  <span className="text-deep font-display">2 × 5 × 2 × 5 × 2 × 5 ={" "}
                  <span className="text-copper text-3xl">1,000</span></span>.
                </p>
                <p className="mt-3">
                  Three utterances of His name carry the merit of an entire Vishnu Sahasranama.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <OrnamentDivider label="The Rama Stupa" kn="ರಾಮಸ್ತೂಪ" theme="dark" />

      <section className="bg-canvas-deep pb-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="text-eyebrow text-copper">The Sankalpa</div>
            <h2 className="text-display-h2 text-cream mt-4">
              A column of <em className="italic text-copper">accumulated devotion.</em>
            </h2>
            <p className="mt-6 text-cream/85 leading-relaxed">
              Alongside the temple&apos;s renovation, devotees are given small
              books to record their chanting of the Sri Rama mantra. When a
              book is complete, the devotee performs a home puja, circumambulates
              the temple 21 to 108 times, and places the book inside the{" "}
              <span className="italic text-copper">Rama Stupa</span> — a column
              of accumulated devotion that rises from the village ground.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-warm bg-canvas-deep-surface p-8 sm:p-10">
              <div className="text-eyebrow text-copper">How to participate</div>
              <ol className="mt-6 space-y-4 list-none">
                {[
                  "Write the name of Sri Rama with intention — for as long as the book lasts.",
                  "When complete, do a puja at home before the family deity.",
                  "Visit the temple and circumambulate 21 to 108 times in pradakshina.",
                  "Place the book inside the Rama Stupa with the trust.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-3xl text-copper leading-none">{i + 1}</span>
                    <span className="text-cream/90 leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-cream/70 italic">
                Contact the temple office at {TEMPLE_ADDRESS.email} to receive a book.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-canvas-ivory text-deep py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Medallion className="w-10 h-10 mx-auto text-copper" color="hsl(20 51% 55%)" />
          <p className="mt-8 font-display italic text-deep/90 text-xl sm:text-2xl leading-relaxed">
            May Sri Rama, together with Sita Devi, Lakshmana, Bharata,
            Shatrughna, and Anjaneya, grant to you and to all your kith and kin
            the fulfilment of each one&apos;s heartfelt desires.
          </p>
          <div className="mt-8 text-eyebrow text-copper">Jai Sri Ram</div>
        </div>
      </section>
    </div>
  );
}

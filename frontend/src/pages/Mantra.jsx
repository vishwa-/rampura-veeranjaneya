import React from "react";
import { Reveal } from "@/components/Reveal";
import { OrnamentDivider, Masthead, Medallion } from "@/components/Ornaments";
import { TEMPLE_ADDRESS } from "@/lib/data";

export default function Mantra() {
  return (
    <div data-testid="page-mantra">
      <section className="relative bg-paper border-b border-ink-muted/20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 pt-10 sm:pt-16 pb-16">
          <Masthead date="A daily practice" edition="The Mantra Chronicle" label="Chapter IV" />
          <Reveal delay={120}>
            <div className="text-center mt-12 max-w-4xl mx-auto">
              <div className="font-kannada text-crimson text-base mt-4">ಶ್ರೀರಾಮ ಮಂತ್ರ</div>
              <h1 className="text-masthead text-ink mt-4">
                Rama, Rama, <em className="italic text-crimson">Rama.</em>
              </h1>
              <p className="mt-8 font-display italic text-ink-muted text-lg sm:text-xl leading-relaxed">
                “Sweeter than sugar, milk, cream, honey, curd — or even all of them together.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="text-label text-crimson">Why we chant</div>
            <h2 className="text-display-h1 text-ink mt-5">
              A name that is also <em className="italic text-crimson">a thousand.</em>
            </h2>
            <div className="rule-crimson mt-7 w-16" />
          </Reveal>
          <div className="lg:col-span-7 text-base sm:text-lg leading-[1.85] text-ink/90 space-y-6">
            <Reveal delay={100}>
              <p className="dropcap">
                The name <span className="italic text-crimson">Sri Rama</span> is a
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
              <div className="border-l-2 border-crimson pl-6 py-4 bg-paper-aged">
                <p>
                  <span className="text-ink font-display text-xl">In Sanskrit gematria</span> —
                  the syllable <span className="font-display text-2xl text-crimson">रा</span> has
                  the value <span className="font-display text-2xl text-ink">2</span>, and{" "}
                  <span className="font-display text-2xl text-crimson">म</span> has the value{" "}
                  <span className="font-display text-2xl text-ink">5</span>.
                </p>
                <p className="mt-3">
                  Chanting <em>Rāma</em> three times therefore equals{" "}
                  <span className="text-ink font-display">2 × 5 × 2 × 5 × 2 × 5 ={" "}
                  <span className="text-crimson text-3xl">1,000</span></span>.
                </p>
                <p className="mt-3">
                  Three utterances of His name carry the merit of an entire Vishnu Sahasranama.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <OrnamentDivider label="The Rama Stupa" kn="ರಾಮಸ್ತೂಪ" theme="light" />

      <section className="bg-paper-aged pb-24 py-20 border-y border-ink-muted/20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="text-label text-crimson">The Sankalpa</div>
            <h2 className="text-display-h1 text-ink mt-5">
              A column of <em className="italic text-crimson">accumulated devotion.</em>
            </h2>
            <div className="rule-crimson mt-7 w-16" />
            <p className="mt-7 text-ink/90 leading-[1.85] font-body">
              Alongside the temple&apos;s renovation, devotees are given small
              books to record their chanting of the Sri Rama mantra. When a
              book is complete, the devotee performs a home puja, circumambulates
              the temple 21 to 108 times, and places the book inside the{" "}
              <span className="italic text-crimson">Rama Stupa</span> — a column
              of accumulated devotion that rises from the village ground.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-ink-muted/30 bg-paper p-10">
              <div className="text-label text-crimson">How to participate</div>
              <ol className="mt-6 space-y-4 list-none">
                {[
                  "Write the name of Sri Rama with intention — for as long as the book lasts.",
                  "When complete, do a puja at home before the family deity.",
                  "Visit the temple and circumambulate 21 to 108 times in pradakshina.",
                  "Place the book inside the Rama Stupa with the trust.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-3xl text-crimson italic leading-none">{i + 1}</span>
                    <span className="text-ink/90 leading-relaxed pt-1 font-body">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-ink-muted italic font-body">
                Contact the temple office at {TEMPLE_ADDRESS.email} to receive a book.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-deep text-cream py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Medallion className="w-10 h-10 mx-auto" color="hsl(38 38% 54%)" />
          <p className="mt-8 font-display italic text-cream/95 text-xl sm:text-2xl leading-relaxed">
            May Sri Rama, together with Sita Devi, Lakshmana, Bharata,
            Shatrughna, and Anjaneya, grant to you and to all your kith and kin
            the fulfilment of each one&apos;s heartfelt desires.
          </p>
          <div className="mt-8 text-label text-gold-old">Jai Sri Ram</div>
        </div>
      </section>
    </div>
  );
}

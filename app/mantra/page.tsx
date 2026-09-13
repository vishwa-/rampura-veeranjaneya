"use client";

import React from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function MantraPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">{t("A Daily Practice", "ಒಂದು ನಿತ್ಯ ಸಾಧನೆ")}</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">{t("Rama, Rama, Rama.", "ರಾಮ, ರಾಮ, ರಾಮ.")}</h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
              {t(
                "Sweeter than sugar, milk, cream, honey, curd, or even all of them together.",
                "ಸಕ್ಕರೆ, ಹಾಲು, ಕೆನೆ, ಜೇನು, ಮೊಸರು, ಅಥವಾ ಇವೆಲ್ಲವೂ ಒಟ್ಟಿಗೆ ಸೇರಿದ್ದಕ್ಕಿಂತಲೂ ಮಧುರ."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why We Chant */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ScrollReveal className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <div className="eyebrow">{t("Why we chant", "ನಾವೇಕೆ ಜಪಿಸುತ್ತೇವೆ")}</div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('A name that is also <em class="italic font-normal">a thousand.</em>', 'ಒಂದು ಸಾವಿರವೂ ಆಗಿರುವ <em class="italic font-normal">ಒಂದು ನಾಮ.</em>')
              }}
            />
            <div className="rule mt-7"></div>
          </ScrollReveal>

          <div className="lg:col-span-7 space-y-6 text-[15px] sm:text-base leading-[1.8] text-ink/90">
            <ScrollReveal>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(
                    'The name <span class="font-medium text-ink">Sri Rama</span> is a symbol of upliftment, of knowledge, and of prosperity. Of all the beings of this universe, only the human tongue is allowed to chant the Sri Rama Mahāmantra.',
                    '<span class="font-medium text-ink">ಶ್ರೀ ರಾಮ</span> ಎಂಬ ನಾಮವು ಉನ್ನತಿಯ, ಜ್ಞಾನದ ಮತ್ತು ಸಮೃದ್ಧಿಯ ಸಂಕೇತ. ಈ ಬ್ರಹ್ಮಾಂಡದ ಸಕಲ ಜೀವಿಗಳಲ್ಲಿ, ಶ್ರೀ ರಾಮ ಮಹಾಮಂತ್ರವನ್ನು ಜಪಿಸುವ ಭಾಗ್ಯ ಮನುಷ್ಯನ ನಾಲಿಗೆಗೆ ಮಾತ್ರ ದೊರಕಿದೆ.'
                  )
                }}
              />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p>
                {t(
                  "Daily recitation purifies a life and widens it to the universal. Chanted together as a family, the name increases harmony and well-being. It needs no time, no place, no preparation.",
                  "ನಿತ್ಯ ಪಠಣವು ಜೀವನವನ್ನು ಪವಿತ್ರಗೊಳಿಸಿ ಅದನ್ನು ವಿಶ್ವವ್ಯಾಪಿಯಾಗಿ ವಿಸ್ತರಿಸುತ್ತದೆ. ಕುಟುಂಬ ಸಮೇತ ಒಟ್ಟಿಗೆ ಜಪಿಸಿದಾಗ, ಈ ನಾಮವು ಸಾಮರಸ್ಯ ಮತ್ತು ಕ್ಷೇಮವನ್ನು ವೃದ್ಧಿಸುತ್ತದೆ. ಇದಕ್ಕೆ ಯಾವ ಕಾಲವೂ, ಸ್ಥಳವೂ, ಸಿದ್ಧತೆಯೂ ಬೇಕಿಲ್ಲ."
                )}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={120} className="border border-line bg-surface p-7 sm:p-8">
              <p dangerouslySetInnerHTML={{
                __html: t(
                  'In Sanskrit gematria, the syllable <span class="font-kn text-2xl text-ink">ರಾ</span> has the value <span class="numeral text-2xl">2</span>, and <span class="font-kn text-2xl text-ink">ಮ</span> has the value <span class="numeral text-2xl">5</span>.',
                  'ಸಂಸ್ಕೃತ ಸಂಖ್ಯಾಶಾಸ್ತ್ರದಲ್ಲಿ, <span class="font-kn text-2xl text-ink">ರಾ</span> ಅಕ್ಷರದ ಮೌಲ್ಯ <span class="numeral text-2xl">2</span>, ಮತ್ತು <span class="font-kn text-2xl text-ink">ಮ</span> ಅಕ್ಷರದ ಮೌಲ್ಯ <span class="numeral text-2xl">5</span>.'
                )
              }} />
              <p className="mt-4 text-ink" dangerouslySetInnerHTML={{
                __html: t(
                  'Chanting <em class="italic">Rāma</em> three times therefore equals <span class="numeral text-xl">2 × 5 × 2 × 5 × 2 × 5</span> = <span class="numeral text-4xl align-middle">1,000</span>.',
                  '<em class="italic">ರಾಮ</em> ಎಂದು ಮೂರು ಬಾರಿ ಜಪಿಸಿದರೆ <span class="numeral text-xl">2 × 5 × 2 × 5 × 2 × 5</span> = <span class="numeral text-4xl align-middle">1,000</span> ಆಗುತ್ತದೆ.'
                )
              }} />
              <p className="mt-4 text-muted">
                {t(
                  "Three utterances of His name carry the merit of an entire Vishnu Sahasranama.",
                  "ಆತನ ನಾಮವನ್ನು ಮೂರು ಬಾರಿ ಉಚ್ಚರಿಸಿದರೆ ಸಂಪೂರ್ಣ ವಿಷ್ಣು ಸಹಸ್ರನಾಮದ ಪುಣ್ಯ ಲಭಿಸುತ್ತದೆ."
                )}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-surface border-t border-line">
        <div className="wrap flex items-center justify-center gap-4 py-4">
          <span className="rule-faint"></span>
          <span className="eyebrow">{t("The Rama Stupa", "ರಾಮಸ್ತೂಪ")}</span>
          <span className="rule-faint"></span>
        </div>
      </div>

      {/* Rama Stupa */}
      <section className="bg-surface border-b border-line">
        <div className="wrap py-24 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal>
            <div className="eyebrow">{t("The Sankalpa", "ಸಂಕಲ್ಪ")}</div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('A column of <em class="italic font-normal">accumulated devotion.</em>', 'ಸಂಚಿತ ಭಕ್ತಿಯ <em class="italic font-normal">ಒಂದು ಸ್ತಂಭ.</em>')
              }}
            />
            <div className="rule mt-7"></div>
            <p className="mt-7 text-ink/90 leading-[1.8]" dangerouslySetInnerHTML={{
              __html: t(
                'Alongside the temple\'s renovation, devotees are given small books to record their chanting of the Sri Rama mantra. When a book is complete, the devotee performs a home puja, circumambulates the temple 21 to 108 times, and places the book inside the <span class="font-medium text-ink">Rama Stupa</span>, a column of accumulated devotion that rises from the village ground.',
                'ದೇವಸ್ಥಾನದ ಜೀರ್ಣೋದ್ಧಾರದ ಜೊತೆಗೆ, ಭಕ್ತರಿಗೆ ಶ್ರೀ ರಾಮ ಮಂತ್ರದ ಜಪವನ್ನು ಬರೆದಿಡಲು ಸಣ್ಣ ಪುಸ್ತಕಗಳನ್ನು ನೀಡಲಾಗುತ್ತದೆ. ಪುಸ್ತಕ ಪೂರ್ಣಗೊಂಡಾಗ, ಭಕ್ತರು ಮನೆಯಲ್ಲಿ ಪೂಜೆ ಮಾಡಿ, ದೇವಸ್ಥಾನಕ್ಕೆ 21ರಿಂದ 108 ಬಾರಿ ಪ್ರದಕ್ಷಿಣೆ ಮಾಡಿ, ಪುಸ್ತಕವನ್ನು <span class="font-medium text-ink">ರಾಮಸ್ತೂಪ</span>ದ ಒಳಗೆ ಇಡುತ್ತಾರೆ; ಇದು ಗ್ರಾಮದ ನೆಲದಿಂದ ಮೇಲೇಳುವ ಸಂಚಿತ ಭಕ್ತಿಯ ಸ್ತಂಭ.'
              )
            }} />
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="border border-line bg-bg p-10">
              <div className="eyebrow">{t("How to participate", "ಭಾಗವಹಿಸುವುದು ಹೇಗೆ")}</div>
              <ol className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="numeral text-2xl text-muted">1</span>
                  <span className="text-ink/90 leading-relaxed pt-0.5">{t("Write the name of Sri Rama with intention, for as long as the book lasts.", "ಶ್ರೀ ರಾಮನ ನಾಮವನ್ನು ಶ್ರದ್ಧೆಯಿಂದ ಬರೆಯಿರಿ, ಪುಸ್ತಕ ಮುಗಿಯುವವರೆಗೆ.")}</span>
                </li>
                <li className="flex gap-4">
                  <span className="numeral text-2xl text-muted">2</span>
                  <span className="text-ink/90 leading-relaxed pt-0.5">{t("When complete, do a puja at home before the family deity.", "ಪೂರ್ಣಗೊಂಡಾಗ, ಮನೆಯಲ್ಲಿ ಕುಲದೇವತೆಯ ಮುಂದೆ ಪೂಜೆ ಮಾಡಿ.")}</span>
                </li>
                <li className="flex gap-4">
                  <span className="numeral text-2xl text-muted">3</span>
                  <span className="text-ink/90 leading-relaxed pt-0.5">{t("Visit the temple and circumambulate 21 to 108 times in pradakshina.", "ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ ನೀಡಿ 21ರಿಂದ 108 ಬಾರಿ ಪ್ರದಕ್ಷಿಣೆ ಮಾಡಿ.")}</span>
                </li>
                <li className="flex gap-4">
                  <span className="numeral text-2xl text-muted">4</span>
                  <span className="text-ink/90 leading-relaxed pt-0.5">{t("Place the book inside the Rama Stupa with the trust.", "ಪುಸ್ತಕವನ್ನು ಟ್ರಸ್ಟ್‌ನ ಸಮಕ್ಷಮ ರಾಮಸ್ತೂಪದ ಒಳಗೆ ಇಡಿ.")}</span>
                </li>
              </ol>
              <p className="mt-7 text-xs text-muted" dangerouslySetInnerHTML={{
                __html: t(
                  'Contact the temple office at <a href="mailto:info@rampura.in" class="link">info@rampura.in</a> to receive a book.',
                  'ಪುಸ್ತಕವನ್ನು ಪಡೆಯಲು ದೇವಸ್ಥಾನದ ಕಚೇರಿಯನ್ನು <a href="mailto:info@rampura.in" class="link">info@rampura.in</a> ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ.'
                )
              }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing Blessing (dark) */}
      <section className="bg-dark text-dark-text">
        <div className="wrap py-24 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <ScrollReveal className="lg:col-span-5">
            <figure>
              <img
                src="/assets/img/hanuman-neon.jpg"
                alt="Sri Anjaneya · Jai Sri Ram"
                className="w-full h-auto"
                style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border-on-dark)" }}
                loading="lazy"
              />
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lg:col-span-7">
            <div className="font-deva" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700, color: "var(--accent-primary)", lineHeight: 1.1 }}>
              ॥ जय श्री राम ॥
            </div>
            <p className="text-xl sm:text-2xl text-white leading-relaxed mt-6">
              {t(
                "May Sri Rama, together with Sita Devi, Lakshmana, Bharata, Shatrughna, and Anjaneya, grant to you and to all your kith and kin the fulfilment of each one's heartfelt desires.",
                "ಸೀತಾ ದೇವಿ, ಲಕ್ಷ್ಮಣ, ಭರತ, ಶತ್ರುಘ್ನ ಮತ್ತು ಆಂಜನೇಯ ಸಮೇತನಾದ ಶ್ರೀ ರಾಮನು ನಿಮಗೂ ನಿಮ್ಮ ಬಂಧು-ಬಾಂಧವರೆಲ್ಲರಿಗೂ ಪ್ರತಿಯೊಬ್ಬರ ಮನದಿಷ್ಟಗಳನ್ನು ಈಡೇರಿಸಲಿ."
              )}
            </p>
            <div className="eyebrow text-dark-muted mt-8">{t("Jai Sri Ram", "ಜೈ ಶ್ರೀ ರಾಮ್")}</div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

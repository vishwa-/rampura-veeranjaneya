"use client";

import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function TemplePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="eyebrow">{t("The Temple", "ದೇವಸ್ಥಾನ")}</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">{t("The Temple.", "ದೇವಸ್ಥಾನ.")}</h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{
              __html: t(
                'A very ancient kshetra, reborn in stone and consecrated at the <a href="/events#kumbhabhishekam" class="link">Maha Kumbhabhishekam</a> of July 3 – 5, 2026.',
                '2026ರಲ್ಲಿ ಪುನರುಜ್ಜೀವನಗೊಂಡ ಅತ್ಯಂತ ಪುರಾತನ ಕ್ಷೇತ್ರ, ಜುಲೈ 3 – 5, 2026ರ <a href="/events#kumbhabhishekam" class="link">ಮಹಾ ಕುಂಭಾಭಿಷೇಕ</a>ದಲ್ಲಿ ಪ್ರತಿಷ್ಠಿತ.'
              )
            }} />
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 max-w-5xl">
            <figure>
              <img
                src="/assets/img/reconstruction/recon-mandapam-front.jpg"
                alt="The reborn temple · the granite mandapam and its towers, 2026"
                className="w-full border border-line"
                loading="eager"
              />
              <figcaption className="mt-3 eyebrow">
                {t("The reborn temple · 2026", "ಪುನರುಜ್ಜೀವನಗೊಂಡ ದೇವಸ್ಥಾನ · 2026")}
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Two Consecrations */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-32">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow">{t("Two Consecrations", "ಎರಡು ಪ್ರತಿಷ್ಠಾಪನೆಗಳು")}</div>
            <h2
              className="display text-4xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('Both turned to the <em class="italic font-normal">north.</em>', 'ಎರಡೂ <em class="italic font-normal">ಉತ್ತರಾಭಿಮುಖ.</em>')
              }}
            />
            <p className="mt-7 text-muted leading-relaxed">
              {t(
                "Sri Vyasaraja set down not one but two idols here: both facing north, both raised in the gesture of fearlessness; each with a small bell at the tail.",
                "ಶ್ರೀ ವ್ಯಾಸರಾಜರು ಇಲ್ಲಿ ಒಂದಲ್ಲ ಎರಡು ಮೂರ್ತಿಗಳನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿದರು: ಎರಡೂ ಉತ್ತರಾಭಿಮುಖ, ಎರಡೂ ಅಭಯ ಮುದ್ರೆಯಲ್ಲಿ; ಪ್ರತಿಯೊಂದರ ಬಾಲದ ತುದಿಯಲ್ಲಿ ಒಂದು ಸಣ್ಣ ಗಂಟೆ."
              )}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
            <ScrollReveal className="bg-surface p-10">
              <div className="flex items-baseline justify-between mb-2">
                <div className="eyebrow">{t("~ 9 feet", "~ 9 ಅಡಿ")}</div>
              </div>
              <div className="rule-faint my-5"></div>
              <h3 className="display text-2xl sm:text-3xl">{t("Dodda Anjaneya", "ದೊಡ್ಡ ಆಂಜನೇಯ")}</h3>
              <p className="mt-5 text-ink/90 leading-[1.8]">
                {t(
                  "The Great Anjaneya: towering, north-facing, His right hand raised in abhaya mudra. A small bell hangs at the tip of his tail, a quiet sign of the sages who once worshipped here.",
                  "ಮಹಾ ಆಂಜನೇಯ: ಎತ್ತರವಾಗಿ, ಉತ್ತರಾಭಿಮುಖವಾಗಿ, ಬಲಗೈ ಅಭಯ ಮುದ್ರೆಯಲ್ಲಿ ಎತ್ತಿ ನಿಂತಿದ್ದಾರೆ. ಅವರ ಬಾಲದ ತುದಿಯಲ್ಲಿ ಒಂದು ಸಣ್ಣ ಗಂಟೆ ತೂಗುತ್ತದೆ, ಇಲ್ಲಿ ಒಮ್ಮೆ ಪೂಜಿಸಿದ ಋಷಿಗಳ ಒಂದು ಮೌನ ಗುರುತು."
                )}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100} className="bg-surface p-10">
              <div className="flex items-baseline justify-between mb-2">
                <div className="eyebrow">{t("~ 6 feet", "~ 6 ಅಡಿ")}</div>
              </div>
              <div className="rule-faint my-5"></div>
              <h3 className="display text-2xl sm:text-3xl">{t("Balanjaneya", "ಬಾಲಾಂಜನೇಯ")}</h3>
              <p className="mt-5 text-ink/90 leading-[1.8]" dangerouslySetInnerHTML={{
                __html: t(
                  'The Child Anjaneya: pointing to the <a href="/sevas#rasi" class="link">rashi chakra</a>, warding off the afflictions of the Sun and the nine planets. At his feet lies the sleeping Kālapurusha himself.',
                  'ಬಾಲ ಆಂಜನೇಯ: <a href="/sevas#rasi" class="link">ರಾಶಿ ಚಕ್ರ</a>ದತ್ತ ತೋರಿಸುತ್ತಾ, ಸೂರ್ಯ ಮತ್ತು ನವಗ್ರಹಗಳ ದೋಷಗಳನ್ನು ನಿವಾರಿಸುತ್ತಾರೆ. ಅವರ ಪಾದಗಳಲ್ಲಿ ಕಾಲಪುರುಷನೇ ನಿದ್ರಿಸುತ್ತಿದ್ದಾನೆ.'
                )
              }} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-surface border-y border-line">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal className="lg:col-span-7">
            <figure>
              <img
                src="/assets/img/deity/anjaneya-before-after.jpg"
                alt="The Anjaneya idol · before and after renovation"
                className="w-full border border-line"
                loading="lazy"
              />
              <figcaption className="mt-3 eyebrow">
                {t("Before · After · June 2026", "ಮೊದಲು · ನಂತರ · ಜೂನ್ 2026")}
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lg:col-span-5">
            <div className="eyebrow">{t("A village renewal", "ಗ್ರಾಮದ ನವೀಕರಣ")}</div>
            <h2
              className="display text-3xl sm:text-4xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('The same gaze, <em class="italic font-normal">a new alankara.</em>', 'ಅದೇ ನೋಟ, <em class="italic font-normal">ಹೊಸ ಅಲಂಕಾರ.</em>')
              }}
            />
            <div className="rule mt-7"></div>
            <p className="mt-7 text-ink/90 leading-[1.8]">
              {t(
                "Before the renovation, the Swamy stood plain: vermillion face, simple flower garlands, a small brass bell. After, He wears the gold kirita-crown and the Tirumala-style namam. The garbhagudi has been rebuilt around Him; the deity Himself has not moved.",
                "ನವೀಕರಣದ ಮುನ್ನ ಸ್ವಾಮಿ ಸರಳವಾಗಿ ನಿಂತಿದ್ದರು: ಸಿಂಧೂರದ ಮುಖ, ಸರಳ ಹೂವಿನ ಮಾಲೆಗಳು, ಒಂದು ಸಣ್ಣ ಹಿತ್ತಾಳೆ ಗಂಟೆ. ನಂತರ ಅವರು ಚಿನ್ನದ ಕಿರೀಟ ಮತ್ತು ತಿರುಮಲ ಶೈಲಿಯ ನಾಮವನ್ನು ಧರಿಸಿದ್ದಾರೆ. ಅವರ ಸುತ್ತಲೂ ಗರ್ಭಗುಡಿಯನ್ನು ಪುನರ್ನಿರ್ಮಿಸಲಾಗಿದೆ; ದೇವರು ಮಾತ್ರ ಚಲಿಸಿಲ್ಲ."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Narthaki form */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <ScrollReveal className="lg:col-span-7">
            <div className="eyebrow">{t("The Narthaki Form", "ನರ್ತಕಿ ರೂಪ")}</div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('A Hanuman who <em class="italic font-normal">dances.</em>', '<em class="italic font-normal">ನರ್ತಿಸುವ</em> ಹನುಮ.')
              }}
            />
            <div className="rule mt-7"></div>
            <div className="mt-7 space-y-5 text-[15px] sm:text-base leading-[1.8] text-ink/90">
              <p>
                {t(
                  "Of the many forms of Lord Hanuman (Vīra, Bhakta, Dāsa, Yoga, Panchamukha), the Narthaki form is exceedingly rare. The hands do not grip a mace; they hold the rhythm of the universe.",
                  "ಹನುಮನ ಅನೇಕ ರೂಪಗಳಲ್ಲಿ (ವೀರ, ಭಕ್ತ, ದಾಸ, ಯೋಗ, ಪಂಚಮುಖ), ನರ್ತಕಿ ರೂಪವು ಅತ್ಯಂತ ಅಪರೂಪ. ಇಲ್ಲಿ ಕೈಗಳು ಗದೆಯನ್ನು ಹಿಡಿಯುವುದಿಲ್ಲ; ಅವು ವಿಶ್ವದ ಲಯವನ್ನು ಹಿಡಿದಿವೆ."
                )}
              </p>
              <p>
                {t(
                  "Local lore says Hanuman, returning from Lanka with the sanjeevani, paused on the banks of the Cauvery near Rampura and danced in relief and joy. The village took that moment and made it a god.",
                  "ಸ್ಥಳೀಯ ಐತಿಹ್ಯದ ಪ್ರಕಾರ, ಹನುಮನು ಸಂಜೀವಿನಿಯೊಂದಿಗೆ ಲಂಕೆಯಿಂದ ಮರಳುತ್ತಿರುವಾಗ, ರಾಂಪುರದ ಬಳಿ ಕಾವೇರಿ ತೀರದಲ್ಲಿ ನಿಂತು ನೆಮ್ಮದಿ ಮತ್ತು ಆನಂದದಿಂದ ನರ್ತಿಸಿದನು. ಗ್ರಾಮವು ಆ ಕ್ಷಣವನ್ನು ತೆಗೆದುಕೊಂಡು ಅದನ್ನು ದೇವರನ್ನಾಗಿ ಮಾಡಿತು."
                )}
              </p>
              <p dangerouslySetInnerHTML={{
                __html: t(
                  'At the deity\'s feet lies the <span class="font-medium text-ink">Kālapurusha</span>, the Lord of Time, sleeping. Devotees believe this is why the Swamy here wards off all manner of disease and untimely death, especially for children.',
                  'ದೇವರ ಪಾದಗಳಲ್ಲಿ <span class="font-medium text-ink">ಕಾಲಪುರುಷ</span>, ಕಾಲದ ಒಡೆಯ, ನಿದ್ರಿಸುತ್ತಿದ್ದಾನೆ. ಆದ್ದರಿಂದಲೇ ಇಲ್ಲಿಯ ಸ್ವಾಮಿ ಎಲ್ಲಾ ಬಗೆಯ ರೋಗ ಮತ್ತು ಅಪಮೃತ್ಯುವನ್ನು, ಮುಖ್ಯವಾಗಿ ಮಕ್ಕಳಿಗೆ, ನಿವಾರಿಸುತ್ತಾರೆ ಎಂದು ಭಕ್ತರು ನಂಬುತ್ತಾರೆ.'
                )
              }} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lg:col-span-5">
            <figure>
              <img
                src="/assets/img/heritage/old-shrine-wall.jpg"
                alt="The old village shrine · exterior wall"
                className="w-full aspect-[4/5] object-cover border border-line"
                loading="lazy"
              />
              <figcaption className="mt-3 eyebrow">
                {t("The old exterior · pre-renovation", "ಹಳೆಯ ಹೊರಭಾಗ · ನವೀಕರಣದ ಮುನ್ನ")}
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Architecture */}
      <section className="bg-surface border-y border-line">
        <div className="wrap py-24 sm:py-32">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
            <div className="eyebrow">{t("Architecture", "ಶಿಲ್ಪಕಲೆ")}</div>
            <h2
              className="display text-4xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t(
                  'A temple gathered from <em class="italic font-normal">three great traditions.</em>',
                  '<em class="italic font-normal">ಮೂರು ಮಹಾ ಪರಂಪರೆಗಳಿಂದ</em> ಸಂಗ್ರಹಿಸಿದ ದೇವಸ್ಥಾನ.'
                ),
              }}
            />
            <p className="mt-7 text-muted leading-relaxed">
              {t(
                "The reborn temple draws from the curvilinear towers of Kalinga, the star-counting pillars of the Hoysalas, and the layered scripts of the deep south, and in its mandapams it sets the whole sky in stone.",
                "ಪುನರುಜ್ಜೀವನಗೊಂಡ ದೇವಸ್ಥಾನವು ಕಳಿಂಗದ ವಕ್ರರೇಖೆಯ ಗೋಪುರಗಳಿಂದ, ಹೊಯ್ಸಳರ ನಕ್ಷತ್ರ ಗಣನೆಯ ಸ್ತಂಭಗಳಿಂದ, ಮತ್ತು ದಕ್ಷಿಣದ ಪದರ ಪದರದ ಲಿಪಿಗಳಿಂದ ಸ್ಫೂರ್ತಿ ಪಡೆಯುತ್ತದೆ, ಮತ್ತು ತನ್ನ ಮಂಟಪಗಳಲ್ಲಿ ಇಡೀ ಆಕಾಶವನ್ನು ಶಿಲೆಯಲ್ಲಿ ಕೆತ್ತಿದೆ."
              )}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
            <ScrollReveal className="bg-bg p-8">
              <div className="w-11 h-11 rounded border border-line flex items-center justify-center mb-5 text-ink">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2c2 4 4 7 4 12a4 4 0 0 1-8 0c0-5 2-8 4-12z" />
                  <path d="M8 18h8" />
                  <path d="M7 22h10" />
                </svg>
              </div>
              <h3 className="display text-xl mt-2">{t("A Rekha Deula tower", "ರೇಖಾ ದೇಊಳ ಗೋಪುರ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">
                {t(
                  "The shikhara has been raised in the curvilinear Kalinga style, its slender vertical rekhas rising in one unbroken sweep, crowned by amalaka and kalasha. The village has reached eastward, to Odisha, for its skyline.",
                  "ಶಿಖರವನ್ನು ವಕ್ರರೇಖೆಯ ಕಳಿಂಗ ಶೈಲಿಯಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗಿದೆ, ಅದರ ಸಣ್ಣ ಲಂಬ ರೇಖೆಗಳು ಒಂದು ಅವಿಚ್ಛಿನ್ನ ರೇಖೆಯಲ್ಲಿ ಮೇಲೇರಿ, ಆಮಲಕ ಮತ್ತು ಕಲಶದಿಂದ ಕಿರೀಟಗೊಂಡಿವೆ. ತನ್ನ ಆಕಾಶರೇಖೆಗಾಗಿ ಗ್ರಾಮವು ಪೂರ್ವದತ್ತ, ಒಡಿಶಾದವರೆಗೆ ಕೈಚಾಚಿದೆ."
                )}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100} className="bg-bg p-8">
              <div className="w-11 h-11 rounded border border-line flex items-center justify-center mb-5 text-ink">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 3v18M12 3v18M19 3v18M3 3h18M3 21h18" />
                </svg>
              </div>
              <h3 className="display text-xl mt-2">{t("Twenty-seven Nakshatra pillars", "ಇಪ್ಪತ್ತೇಳು ನಕ್ಷತ್ರ ಸ್ತಂಭಗಳು")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed" dangerouslySetInnerHTML={{
                __html: t(
                  'The mandapam rises on twenty-seven lathe-turned Hoysala-style pillars, one consecrated to each nakshatra of the lunar zodiac. At the pillar of one\'s birth-star, the priests perform <a href="/sevas#nakshatra" class="link">Nakshatra Dosha Parihara</a>.',
                  'ಮಂಟಪವು ಇಪ್ಪತ್ತೇಳು ಕಡೆದ ಹೊಯ್ಸಳ ಶೈಲಿಯ ಸ್ತಂಭಗಳ ಮೇಲೆ ನಿಂತಿದೆ, ಪ್ರತಿಯೊಂದೂ ಚಂದ್ರಮಾನದ ಒಂದೊಂದು ನಕ್ಷತ್ರಕ್ಕೆ ಸಮರ್ಪಿತ. ತಮ್ಮ ಜನ್ಮ ನಕ್ಷತ್ರದ ಸ್ತಂಭದ ಬಳಿ ಅರ್ಚಕರು <a href="/sevas#nakshatra" class="link">ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರ</a> ನಡೆಸುತ್ತಾರೆ.'
                )
              }} />
              <div className="mt-5 eyebrow !text-ink">
                {t("27 nakshatras · one per pillar", "27 ನಕ್ಷತ್ರಗಳು · ಪ್ರತಿ ಸ್ತಂಭಕ್ಕೆ ಒಂದು")}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160} className="bg-bg p-8">
              <div className="w-11 h-11 rounded border border-line flex items-center justify-center mb-5 text-ink">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
                </svg>
              </div>
              <h3 className="display text-xl mt-2">{t("The Rasi mandapam", "ರಾಶಿ ಮಂಟಪ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed" dangerouslySetInnerHTML={{
                __html: t(
                  'A second mandapam carries the twelve rasis of the zodiac. Before one\'s own sign, the priests perform <a href="/sevas#rasi" class="link">Rasi Dosha Parihara</a>, for the afflictions of the grahas and an unfavourable moon.',
                  'ಎರಡನೆಯ ಮಂಟಪವು ರಾಶಿಚಕ್ರದ ಹನ್ನೆರಡು ರಾಶಿಗಳನ್ನು ಹೊತ್ತಿದೆ. ತಮ್ಮ ರಾಶಿಯ ಮುಂದೆ ಅರ್ಚಕರು <a href="/sevas#rasi" class="link">ರಾಶಿ ದೋಷ ಪರಿಹಾರ</a> ನಡೆಸುತ್ತಾರೆ, ಗ್ರಹಗಳ ದೋಷ ಮತ್ತು ಪ್ರತಿಕೂಲ ಚಂದ್ರನ ನಿವಾರಣೆಗಾಗಿ.'
                )
              }} />
              <div className="mt-5 eyebrow !text-ink">{t("12 rasis", "12 ರಾಶಿಗಳು")}</div>
            </ScrollReveal>

            <ScrollReveal delay={200} className="bg-bg p-8">
              <div className="w-11 h-11 rounded bg-ink text-bg flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 5h7M4 9h7M7 5v12M14 14l3-7 3 7M15 12h4" />
                </svg>
              </div>
              <h3 className="display text-xl mt-2">{t("Letters for Hayagreeva", "ಹಯಗ್ರೀವನಿಗಾಗಿ ಅಕ್ಷರಗಳು")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed" dangerouslySetInnerHTML={{
                __html: t(
                  'The new sanctum for Sri Vidya Hayagreeva has been clothed in language itself. Walls and lintels carry alphabets from the great literary tongues of India: the very letters a child first traces at <a href="/sevas#aksharabhyasam" class="link">Aksharabyasa</a>:',
                  'ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವನ ಹೊಸ ಗರ್ಭಗುಡಿಯನ್ನು ಭಾಷೆಯಿಂದಲೇ ಅಲಂಕರಿಸಲಾಗಿದೆ. ಗೋಡೆಗಳು ಮತ್ತು ತೊಲೆಗಳು ಭಾರತದ ಮಹಾ ಸಾಹಿತ್ಯ ಭಾಷೆಗಳ ವರ್ಣಮಾಲೆಗಳನ್ನು ಹೊತ್ತಿವೆ: ಮಗುವೊಂದು <a href="/sevas#aksharabhyasam" class="link">ಅಕ್ಷರಾಭ್ಯಾಸ</a>ದಲ್ಲಿ ಮೊದಲು ಬರೆಯುವ ಅದೇ ಅಕ್ಷರಗಳು:'
                )
              }} />
              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="flex items-baseline gap-3"><span className="text-lg text-ink">अ</span><span className="text-muted">{t("Hindi", "ಹಿಂದಿ")}</span></div>
                <div className="flex items-baseline gap-3"><span className="text-lg text-ink">ॐ</span><span className="text-muted">{t("Sanskrit", "ಸಂಸ್ಕೃತ")}</span></div>
                <div className="flex items-baseline gap-3"><span className="text-lg text-ink font-kn">ಅ</span><span className="text-muted">{t("Kannada", "ಕನ್ನಡ")}</span></div>
                <div className="flex items-baseline gap-3"><span className="text-lg text-ink">அ</span><span className="text-muted">{t("Tamil", "ತಮಿಳು")}</span></div>
                <div className="flex items-baseline gap-3 col-span-2"><span className="text-lg text-ink">అ</span><span className="text-muted">{t("Telugu", "ತೆಲುಗು")}</span></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Believed Graces Band */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-28">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
            <div className="eyebrow">{t("Believed Graces", "ನಂಬಿಕೆಯ ಅನುಗ್ರಹಗಳು")}</div>
            <h2
              className="display text-4xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('What the Swamy is said <em class="italic font-normal">to grant.</em>', 'ಸ್ವಾಮಿ <em class="italic font-normal">ಅನುಗ್ರಹಿಸುತ್ತಾರೆ</em> ಎನ್ನಲಾದದ್ದು.')
              }}
            />
            <div className="rule mx-auto mt-7"></div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-line border border-line">
            <div className="bg-bg p-6 text-center"><div className="text-base text-ink mt-2">{t("Good progeny", "ಸತ್ಸಂತಾನ")}</div></div>
            <div className="bg-bg p-6 text-center"><div className="text-base text-ink mt-2">{t("Employment", "ಉದ್ಯೋಗ")}</div></div>
            <div className="bg-bg p-6 text-center"><div className="text-base text-ink mt-2">{t("Marriage fortune", "ವಿವಾಹ ಭಾಗ್ಯ")}</div></div>
            <div className="bg-bg p-6 text-center"><div className="text-base text-ink mt-2">{t("Childhood ailments", "ಬಾಲರೋಗ ನಿವಾರಣೆ")}</div></div>
            <div className="bg-bg p-6 text-center"><div className="text-base text-ink mt-2"><Link href="/sevas#nakshatra" className="link">{t("Navagraha dosha", "ನವಗ್ರಹ ದೋಷ")}</Link></div></div>
            <div className="bg-bg p-6 text-center"><div className="text-base text-ink mt-2"><Link href="/sevas#bheemaratha" className="link">{t("Against untimely death", "ಅಪಮೃತ್ಯು ನಿವಾರಣೆ")}</Link></div></div>
          </div>
        </div>
      </section>

      {/* Hayagreeva Teaser */}
      <section className="bg-dark text-dark-text">
        <div className="wrap py-24 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal className="lg:col-span-5">
            <figure>
              <img
                src="/assets/img/deity/hayagreeva-adorned-side.jpg"
                alt="The new Vidya Hayagreeva idol, adorned"
                className="w-full aspect-[4/5] object-cover object-top border border-dark-line"
                loading="lazy"
              />
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lg:col-span-7">
            <div className="eyebrow text-dark-muted">{t("A New Sanctum", "ಹೊಸ ಗರ್ಭಗುಡಿ")}</div>
            <div className="text-dark-muted text-sm mt-3">{t("Vidya Hayagreeva", "ವಿದ್ಯಾ ಹಯಗ್ರೀವ")}</div>
            <h2
              className="display text-white text-3xl sm:text-5xl mt-3"
              dangerouslySetInnerHTML={{
                __html: t(
                  'Beside the historic <em class="italic font-normal">Doddaanjaneya,</em> the giver of knowledge.',
                  'ಐತಿಹಾಸಿಕ <em class="italic font-normal">ದೊಡ್ಡಾಂಜನೇಯನ</em> ಪಕ್ಕದಲ್ಲಿ, ಜ್ಞಾನದ ದಾತ.'
                ),
              }}
            />
            <div className="rule mt-7" style={{ background: "#fff" }}></div>
            <p className="mt-7 text-dark-muted leading-[1.8] max-w-xl" dangerouslySetInnerHTML={{
              __html: t(
                'Sri Vidya Hayagreeva, the horse-faced form of Vishnu, presides over learning, mantra, and clarity of mind. Carved from black Krishna shila by <span class="text-white font-medium">Adithya yogiraj</span>, the very sculptor who shaped the Ram Lalla vigraha now installed at Ayodhya.',
                'ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ, ವಿಷ್ಣುವಿನ ಅಶ್ವಮುಖ ರೂಪ, ವಿದ್ಯೆ, ಮಂತ್ರ ಮತ್ತು ಮನಸ್ಸಿನ ನಿರ್ಮಲತೆಗೆ ಅಧಿಪತಿ. ಈಗ ಅಯೋಧ್ಯೆಯಲ್ಲಿ ಪ್ರತಿಷ್ಠಾಪಿಸಲಾದ ರಾಮ್ ಲಲ್ಲಾ ವಿಗ್ರಹವನ್ನು ಕೆತ್ತಿದ ಅದೇ ಶಿಲ್ಪಿ <span class="text-white font-medium">ಆದಿತ್ಯ ಯೋಗಿರಾಜ್</span> ಅವರಿಂದ ಕಪ್ಪು ಕೃಷ್ಣ ಶಿಲೆಯಲ್ಲಿ ಕೆತ್ತಲ್ಪಟ್ಟಿದೆ.'
              )
            }} />
            <Link href="/hayagreeva" className="btn btn-light mt-8">
              {t("The shrine's story →", "ಗರ್ಭಗುಡಿಯ ಕಥೆ →")}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

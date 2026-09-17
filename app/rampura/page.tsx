"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function RampuraPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">{t("The Village", "ಗ್ರಾಮ")}</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">{t("The village of Rampura", "ರಾಂಪುರ ಗ್ರಾಮ")}</h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
              {t(
                "A small and tidy village on the bank of the Cauvery, very close to the historically renowned cities of Mysuru and Srirangapatna.",
                "ಕಾವೇರಿ ತೀರದ ಒಂದು ಚಿಕ್ಕ, ಶುಚಿಯಾದ ಗ್ರಾಮ, ಐತಿಹಾಸಿಕವಾಗಿ ಪ್ರಸಿದ್ಧವಾದ ಮೈಸೂರು ಮತ್ತು ಶ್ರೀರಂಗಪಟ್ಟಣ ನಗರಗಳಿಗೆ ಬಹಳ ಸಮೀಪ."
              )}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="mt-12">
            <figure>
              <img
                src="/assets/img/heritage/old-shrine-wall.jpg"
                alt="The old village shrine at Rampura"
                className="w-full aspect-[16/7] object-cover border border-line"
                loading="eager"
              />
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Tradition */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <ScrollReveal className="lg:col-span-5">
            <figure>
              <img
                src="/assets/img/heritage/old-facade.jpg"
                alt="The old façade of the village shrine"
                className="w-full aspect-[4/5] object-cover border border-line"
                loading="lazy"
              />
              <figcaption className="mt-3 eyebrow">
                {t("The old façade · before renovation", "ಹಳೆಯ ಮುಂಭಾಗ · ಜೀರ್ಣೋದ್ಧಾರಕ್ಕೆ ಮುನ್ನ")}
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lg:col-span-7">
            <div className="eyebrow">{t("Tradition", "ಪರಂಪರೆ")}</div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('A dancer of <em class="italic font-normal">innocent expression.</em>', 'ಮುಗ್ಧ ಭಾವದ <em class="italic font-normal">ನರ್ತಕ.</em>')
              }}
            />
            <div className="rule mt-7"></div>
            <div className="mt-7 space-y-5 text-[15px] sm:text-base leading-[1.8] text-ink/90">
              <p>
                {t(
                  "The Sri Anjaneya enshrined here is in the rare Narthaki form: a dancer, with a soft and innocent gaze. The villagers will tell you He is the very lifeline of this place, and at times the gentle cause of the small mischiefs that happen here.",
                  "ಇಲ್ಲಿ ಪ್ರತಿಷ್ಠಾಪಿತವಾದ ಶ್ರೀ ಆಂಜನೇಯ ಅಪರೂಪದ ನರ್ತಕಿ ರೂಪದಲ್ಲಿದ್ದಾರೆ: ಮೃದು, ಮುಗ್ಧ ನೋಟದ ನರ್ತಕ. ಸ್ವಾಮಿಯೇ ಈ ಊರಿನ ಜೀವನಾಡಿ ಎಂದೂ, ಕೆಲವೊಮ್ಮೆ ಇಲ್ಲಿ ನಡೆಯುವ ಚಿಕ್ಕ ತುಂಟತನಗಳಿಗೆ ಮೃದುವಾದ ಕಾರಣವೆಂದೂ ಊರಿನವರು ನಿಮಗೆ ಹೇಳುತ್ತಾರೆ."
                )}
              </p>
              <p>
                {t(
                  "The wise of Rampura have long been seen as a proud symbol of this tradition: tending the fields by day, ringing the small brass bell on their way past the temple, at dawn and at dusk.",
                  "ರಾಂಪುರದ ಹಿರಿಯರು ಬಹುಕಾಲದಿಂದ ಈ ಪರಂಪರೆಯ ಹೆಮ್ಮೆಯ ಸಂಕೇತವಾಗಿ ಕಂಡುಬಂದಿದ್ದಾರೆ: ಹಗಲಿನಲ್ಲಿ ಹೊಲಗಳನ್ನು ನೋಡಿಕೊಳ್ಳುತ್ತಾ, ಬೆಳಗು ಮತ್ತು ಸಂಜೆ ದೇವಸ್ಥಾನದ ಬಳಿ ಹಾದು ಹೋಗುವಾಗ ಪುಟ್ಟ ಹಿತ್ತಾಳೆ ಗಂಟೆಯನ್ನು ಬಾರಿಸುತ್ತಾ."
                )}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-surface border-t border-line">
        <div className="wrap flex items-center justify-center gap-4 py-4">
          <span className="rule-faint"></span>
          <span className="eyebrow">{t("Ramayana memory", "ರಾಮಾಯಣ ಸ್ಮೃತಿ")}</span>
          <span className="rule-faint"></span>
        </div>
      </div>

      {/* Ramayana Memory */}
      <section className="bg-surface border-b border-line">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <ScrollReveal className="lg:col-span-7">
            <div className="eyebrow">{t("Ramayana", "ರಾಮಾಯಣ")}</div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('Hanuman returned to <em class="italic font-normal">this very bend of the river.</em>', 'ಹನುಮ ಮರಳಿ ಬಂದದ್ದು <em class="italic font-normal">ನದಿಯ ಈ ತಿರುವಿಗೇ.</em>')
              }}
            />
            <div className="rule mt-7"></div>
            <div className="mt-7 space-y-5 text-[15px] sm:text-base leading-[1.8] text-ink/90">
              <p>
                {t(
                  "The old people of the village say this is the place where, having gone to Lanka and beheld Mother Sita, Hanuman returned bearing her Chudamani, the crest-jewel, and the fruit of his mission. He paused here, joyful and spent, on the way back to Sri Rama.",
                  "ಲಂಕೆಗೆ ಹೋಗಿ ಸೀತಾಮಾತೆಯನ್ನು ಕಂಡು, ಆಕೆಯ ಚೂಡಾಮಣಿಯನ್ನೂ ತನ್ನ ಕಾರ್ಯದ ಫಲವನ್ನೂ ಹೊತ್ತು ಹನುಮ ಮರಳಿ ಬಂದ ಸ್ಥಳ ಇದೇ ಎಂದು ಊರಿನ ಹಿರಿಯರು ಹೇಳುತ್ತಾರೆ. ಶ್ರೀ ರಾಮನ ಬಳಿಗೆ ಮರಳುವ ದಾರಿಯಲ್ಲಿ, ಸಂತೋಷದಿಂದ ಬಳಲಿ, ಆತ ಇಲ್ಲಿ ವಿಶ್ರಮಿಸಿದರು."
                )}
              </p>
              <p dangerouslySetInnerHTML={{
                __html: t(
                  'Later, when Sri Rama Himself journeyed south, He is said to have stopped at Rampura, installed <span class="font-medium text-ink">Ramalingeshwara</span>, rested briefly near Sage Gautama, and only then continued on.',
                  'ಮುಂದೆ, ಶ್ರೀ ರಾಮನೇ ದಕ್ಷಿಣಕ್ಕೆ ಪ್ರಯಾಣಿಸಿದಾಗ, ಆತ ರಾಂಪುರದಲ್ಲಿ ನಿಂತು <span class="font-medium text-ink">ರಾಮಲಿಂಗೇಶ್ವರ</span>ನನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿ, ಗೌತಮ ಋಷಿಯ ಬಳಿ ಸ್ವಲ್ಪ ಕಾಲ ವಿಶ್ರಮಿಸಿ, ಆನಂತರವೇ ಮುಂದೆ ಸಾಗಿದರು ಎಂದು ಹೇಳಲಾಗುತ್ತದೆ.'
                )
              }} />
              <p>
                {t(
                  "Ahalya Devi's release from her long stone-curse, the local tradition holds, may well have happened in these very fields.",
                  "ಅಹಲ್ಯಾ ದೇವಿ ತನ್ನ ದೀರ್ಘ ಶಿಲಾ-ಶಾಪದಿಂದ ಮುಕ್ತಳಾದದ್ದು, ಸ್ಥಳೀಯ ಪರಂಪರೆಯ ಪ್ರಕಾರ, ಈ ಹೊಲಗಳಲ್ಲಿಯೇ ಆಗಿರಬಹುದು."
                )}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lg:col-span-5">
            <figure>
              <img
                src="/assets/img/heritage/old-porch.jpg"
                alt="The old porch with painted columns"
                className="w-full aspect-[4/5] object-cover border border-line"
                loading="lazy"
              />
              <figcaption className="mt-3 eyebrow">
                {t("The old porch · weathered columns", "ಹಳೆಯ ಜಗುಲಿ · ಶಿಥಿಲಗೊಂಡ ಕಂಬಗಳು")}
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Living Heart (dark) */}
      <section className="bg-dark text-dark-text">
        <div className="wrap py-24 sm:py-28 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="eyebrow text-dark-muted">{t("The Living Heart", "ಜೀವಂತ ಹೃದಯ")}</div>
            <h2
              className="display text-white text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('The village deity: Anjaneya, <em class="italic font-normal">dancing.</em>', 'ಗ್ರಾಮ ದೇವತೆ: ಆಂಜನೇಯ, <em class="italic font-normal">ನರ್ತಿಸುತ್ತಾ.</em>')
              }}
            />
            <div className="rule mx-auto mt-7" style={{ background: "#fff" }}></div>
            <p className="mt-8 text-dark-muted leading-[1.8]" dangerouslySetInnerHTML={{
              __html: t(
                'Most temples to Hanuman show Him standing in vīra posture, mace in hand. In Rampura, He dances. The rare Nartaki Anjaneya, a form of joy and lightness, has been the quiet centre of this village for generations. The old garbhagudi was renovated, completing in June 2026; and now, beside Him, a new shrine to Sri Vidya Hayagreeva is being built. Hayagreeva, the giver of learning, is why the village no longer sends its children away to begin their letters: that sacred rite, <a class="link" href="/sevas#aksharabhyasam">Aksharabyasa</a>, can now be done at His feet.',
                'ಹನುಮನ ಬಹುತೇಕ ದೇವಸ್ಥಾನಗಳಲ್ಲಿ ಆತನನ್ನು ವೀರ ಭಂಗಿಯಲ್ಲಿ, ಗದೆ ಹಿಡಿದು ನಿಂತಂತೆ ತೋರಿಸಲಾಗುತ್ತದೆ. ರಾಂಪುರದಲ್ಲಿ, ಆತ ನರ್ತಿಸುತ್ತಾನೆ. ಅಪರೂಪದ ನರ್ತಕಿ ಆಂಜನೇಯ, ಸಂತೋಷ ಮತ್ತು ಲಘುತ್ವದ ರೂಪ, ತಲೆಮಾರುಗಳಿಂದ ಈ ಊರಿನ ಶಾಂತ ಕೇಂದ್ರವಾಗಿದ್ದಾನೆ. ಹಳೆಯ ಗರ್ಭಗುಡಿಯ ಜೀರ್ಣೋದ್ಧಾರವು 2026ರ ಜೂನ್‌ನಲ್ಲಿ ಪೂರ್ಣಗೊಂಡಿತು; ಈಗ, ಆತನ ಪಕ್ಕದಲ್ಲಿ, ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವನಿಗೆ ಹೊಸ ಗುಡಿಯನ್ನು ಕಟ್ಟಲಾಗುತ್ತಿದೆ. ವಿದ್ಯಾದಾತ ಹಯಗ್ರೀವನ ಕಾರಣದಿಂದ, ಊರಿನವರು ತಮ್ಮ ಮಕ್ಕಳ ಅಕ್ಷರಾರಂಭಕ್ಕೆ ಬೇರೆಡೆಗೆ ಕಳುಹಿಸಬೇಕಾಗಿಲ್ಲ: ಆ ಮೊದಲ ಸಂಸ್ಕಾರ, <a class="link" href="/sevas#aksharabhyasam">ಅಕ್ಷರಾಭ್ಯಾಸ</a>ವನ್ನು, ಈಗ ಆತನ ಪಾದಗಳ ಬಳಿಯೇ ನೆರವೇರಿಸಬಹುದು.'
              )
            }} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

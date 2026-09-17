"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function HayagreevaPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">{t("A New Sanctum", "ಹೊಸ ಗರ್ಭಗುಡಿ")}</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">{t("Sri Vidya Hayagreeva.", "ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ.")}</h1>
          </ScrollReveal>
          <ScrollReveal delay={120} className="max-w-3xl mt-10 border-y border-line py-8">
            <p className="text-xl sm:text-2xl text-ink leading-relaxed">
              {t(
                "Jñānānanda-mayam devam nirmala-sphaṭikākṛtim · ādhāram sarva-vidyānām hayagrīvam upāsmahe.",
                "ಜ್ಞಾನಾನಂದ-ಮಯಂ ದೇವಂ ನಿರ್ಮಲ-ಸ್ಫಟಿಕಾಕೃತಿಮ್ · ಆಧಾರಂ ಸರ್ವ-ವಿದ್ಯಾನಾಂ ಹಯಗ್ರೀವಮ್ ಉಪಾಸ್ಮಹೇ."
              )}
            </p>
            <p className="mt-4 text-sm text-muted">
              {t(
                "We meditate upon Hayagreeva: embodiment of knowledge and bliss, pure as crystal, the very ground of all learning.",
                "ಜ್ಞಾನ ಮತ್ತು ಆನಂದದ ಮೂರ್ತಿಯಾದ, ಸ್ಫಟಿಕದಂತೆ ನಿರ್ಮಲನಾದ, ಸಕಲ ವಿದ್ಯೆಗಳ ಆಧಾರಸ್ವರೂಪನಾದ ಶ್ರೀ ಹಯಗ್ರೀವನನ್ನು ನಾವು ಧ್ಯಾನಿಸುತ್ತೇವೆ."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sculptor */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <ScrollReveal className="lg:col-span-5">
            <figure>
              <img
                src="/assets/img/deity/hayagreeva-krishna-shila.jpg"
                alt="Vidya Hayagreeva, before alankara"
                className="w-full aspect-[3/4] object-cover object-top border border-line"
                loading="lazy"
              />
              <figcaption className="mt-3 eyebrow">
                {t("Krishna shila · before alankara", "ಕೃಷ್ಣ ಶಿಲೆ · ಅಲಂಕಾರಕ್ಕೆ ಮುನ್ನ")}
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lg:col-span-7">
            <div className="eyebrow">{t("The Sculptor", "ಶಿಲ್ಪಿ")}</div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('By the hands of <em class="italic font-normal">Adithya yogiraj.</em>', '<em class="italic font-normal">ಆದಿತ್ಯ ಯೋಗಿರಾಜ್</em> ಅವರ ಕೈಗಳಿಂದ.')
              }}
            />
            <div className="rule mt-7"></div>
            <div className="mt-7 space-y-5 text-[15px] sm:text-base leading-[1.8] text-ink/90">
              <p dangerouslySetInnerHTML={{
                __html: t(
                  'The vigraha has been shaped by the celebrated sculptor <span class="font-medium text-ink">Adithya yogiraj</span>, the same hands that carved the Ram Lalla murti installed at the new Ayodhya temple. To work in Krishna shila is to coax life from stone; the sculptor speaks of it as <em class="italic">sadhana</em>, not craft.',
                  'ಈ ವಿಗ್ರಹವನ್ನು ಪ್ರಸಿದ್ಧ ಶಿಲ್ಪಿ <span class="font-medium text-ink">ಆದಿತ್ಯ ಯೋಗಿರಾಜ್</span> ಅವರು ರೂಪಿಸಿದ್ದಾರೆ, ಹೊಸ ಅಯೋಧ್ಯಾ ದೇವಸ್ಥಾನದಲ್ಲಿ ಪ್ರತಿಷ್ಠಾಪಿಸಲಾದ ರಾಮ್ ಲಲ್ಲಾ ಮೂರ್ತಿಯನ್ನು ಕೆತ್ತಿದ ಅದೇ ಕೈಗಳು. ಕೃಷ್ಣ ಶಿಲೆಯಲ್ಲಿ ಕೆಲಸ ಮಾಡುವುದೆಂದರೆ ಕಲ್ಲಿನಿಂದ ಜೀವವನ್ನು ಹೊರಹೊಮ್ಮಿಸುವುದು; ಶಿಲ್ಪಿ ಇದನ್ನು ಕರಕುಶಲವಲ್ಲ, <em class="italic">ಸಾಧನೆ</em> ಎಂದು ಬಣ್ಣಿಸುತ್ತಾರೆ.'
                )
              }} />
              <p>
                {t(
                  "The stone was chosen for its even grain and its deep, almost wet, black lustre. Months of careful carving, beginning with the kirīta and ending with the toes of the lotus pedestal, have produced the form you now see.",
                  "ಸಮವಾದ ಕಣ ಮತ್ತು ಆಳವಾದ, ಬಹುತೇಕ ಒದ್ದೆಯಂತೆ ಕಾಣುವ ಕಪ್ಪು ಹೊಳಪಿಗಾಗಿ ಈ ಶಿಲೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಯಿತು. ಕಿರೀಟದಿಂದ ಆರಂಭಿಸಿ ಕಮಲ ಪೀಠದ ಪಾದದ ಬೆರಳುಗಳವರೆಗೆ, ತಿಂಗಳುಗಳ ಕಾಲ ನಡೆದ ಎಚ್ಚರಿಕೆಯ ಕೆತ್ತನೆ ಈಗ ನೀವು ಕಾಣುತ್ತಿರುವ ರೂಪವನ್ನು ಸೃಷ್ಟಿಸಿದೆ."
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
          <span className="eyebrow">{t("The Alankara", "ಆಲಂಕಾರ")}</span>
          <span className="rule-faint"></span>
        </div>
      </div>

      {/* Alankara Gallery */}
      <section className="bg-surface border-b border-line">
        <div className="wrap py-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal>
            <figure>
              <img
                src="/assets/img/deity/hayagreeva-adorned-front.jpg"
                alt="Vidya Hayagreeva adorned, frontal"
                className="w-full aspect-[4/5] object-cover object-top border border-line"
                loading="lazy"
              />
              <figcaption className="mt-3 eyebrow">
                {t("Frontal · with jasmine and roses", "ಮುಂಭಾಗ · ಮಲ್ಲಿಗೆ ಮತ್ತು ಗುಲಾಬಿಗಳೊಂದಿಗೆ")}
              </figcaption>
            </figure>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <figure>
              <img
                src="/assets/img/deity/hayagreeva-adorned-side.jpg"
                alt="Vidya Hayagreeva adorned, three-quarter view"
                className="w-full aspect-[4/5] object-cover object-top border border-line"
                loading="lazy"
              />
              <figcaption className="mt-3 eyebrow">
                {t("Three-quarter · garlanded and draped", "ಮುಕ್ಕಾಲು ಪಾರ್ಶ್ವ · ಹಾರ ಮತ್ತು ವಸ್ತ್ರಗಳಿಂದ ಅಲಂಕೃತ")}
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Here */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-28 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="eyebrow">{t("Why here?", "ಇಲ್ಲಿ ಏಕೆ?")}</div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('Why Hayagreeva, <em class="italic font-normal">here?</em>', 'ಹಯಗ್ರೀವ, <em class="italic font-normal">ಇಲ್ಲಿ ಏಕೆ?</em>')
              }}
            />
            <div className="rule mx-auto mt-7"></div>
            <p className="mt-8 text-ink/90 leading-[1.8]">
              {t(
                "The villagers of Rampura have always sent their children to the towns nearby for learning. Adding Hayagreeva, the deity of knowledge, to the temple is the village's prayer for those children: clarity of mind, the patience to study, the courage to speak. He stands beside Anjaneya, who is himself the chief of learners. Two forms of wisdom, in one small village.",
                "ರಾಂಪುರದ ಗ್ರಾಮಸ್ಥರು ತಮ್ಮ ಮಕ್ಕಳನ್ನು ಕಲಿಕೆಗಾಗಿ ಯಾವಾಗಲೂ ಹತ್ತಿರದ ಊರುಗಳಿಗೆ ಕಳುಹಿಸುತ್ತಿದ್ದರು. ಜ್ಞಾನದ ದೇವರಾದ ಹಯಗ್ರೀವನನ್ನು ದೇವಸ್ಥಾನಕ್ಕೆ ಸೇರಿಸುವುದು ಆ ಮಕ್ಕಳಿಗಾಗಿ ಗ್ರಾಮದ ಪ್ರಾರ್ಥನೆಯಾಗಿದೆ: ಮನಸ್ಸಿನ ತಿಳಿವಳಿಕೆ, ಅಧ್ಯಯನದ ತಾಳ್ಮೆ, ಮಾತನಾಡುವ ಧೈರ್ಯ. ಸ್ವತಃ ವಿದ್ಯಾರ್ಥಿಗಳ ನಾಯಕನಾದ ಆಂಜನೇಯನ ಪಕ್ಕದಲ್ಲಿ ಅವನು ನಿಂತಿದ್ದಾನೆ. ಒಂದು ಚಿಕ್ಕ ಗ್ರಾಮದಲ್ಲಿ, ಜ್ಞಾನದ ಎರಡು ರೂಪಗಳು."
              )}
            </p>
            <p className="mt-5 text-ink/90 leading-[1.8]" dangerouslySetInnerHTML={{
              __html: t(
                'Because He is the giver of vidya, the temple performs <em class="italic">Aksharabyasa</em> before Him: tracing the first letters under the deity of learning.',
                'ಅವನು ವಿದ್ಯೆಯನ್ನು ಕರುಣಿಸುವವನಾದ್ದರಿಂದ, ದೇವಸ್ಥಾನವು ಅವನ ಸನ್ನಿಧಿಯಲ್ಲಿ <em class="italic">ಅಕ್ಷರಾಭ್ಯಾಸ</em>ವನ್ನು ನಡೆಸುತ್ತದೆ: ಜ್ಞಾನದ ದೇವರ ಸನ್ನಿಧಿಯಲ್ಲಿ ಅಕ್ಷರಾಭ್ಯಾಸ ತಿದ್ದಿಸುವುದು.'
              )
            }} />
            <Link href="/sevas#aksharabhyasam" className="btn btn-secondary mt-8">
              {t("Aksharabyasa →", "ಅಕ್ಷರಾಭ್ಯಾಸ →")}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

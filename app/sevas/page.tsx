"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookingFlow } from "@/components/BookingFlow";

export default function SevasPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Service",
                  "name": "Nakshatra Dosha Parihara",
                  "description":
                    "Parihara performed at the pillar of one's birth-star among the mandapam's twenty-seven nakshatra pillars, with archana and the abhisheka tirtha, for those born under an afflicted star.",
                  "serviceType": "Hindu temple ritual",
                  "url": "https://www.srikshetrarampura.in/sevas#nakshatra",
                  "areaServed": {
                    "@type": "Place",
                    "name": "Rampura, Srirangapatna Taluk, Karnataka",
                  },
                  "provider": {
                    "@type": "HinduTemple",
                    "name": "Sri Kubera Anjaneya Swamy Devasthanam Rampura",
                    "url": "https://www.srikshetrarampura.in/",
                  },
                },
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Service",
                  "name": "Rasi Dosha Parihara",
                  "description":
                    "Parihara offered before one's own rasi in the Rasi mandapam of the twelve zodiac signs, that graha and rasi doshas may be relieved and the planets turn kind.",
                  "serviceType": "Hindu temple ritual",
                  "url": "https://www.srikshetrarampura.in/sevas#rasi",
                  "areaServed": {
                    "@type": "Place",
                    "name": "Rampura, Srirangapatna Taluk, Karnataka",
                  },
                  "provider": {
                    "@type": "HinduTemple",
                    "name": "Sri Kubera Anjaneya Swamy Devasthanam Rampura",
                    "url": "https://www.srikshetrarampura.in/",
                  },
                },
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Service",
                  "name": "Aksharabhyasam",
                  "description":
                    "The rite by which a young child first writes, the hand guided to trace Om in rice and on the slate, performed before Sri Vidya Hayagreeva, lord of vidya and clear speech.",
                  "serviceType": "Hindu temple ritual",
                  "url": "https://www.srikshetrarampura.in/sevas#aksharabhyasam",
                  "areaServed": {
                    "@type": "Place",
                    "name": "Rampura, Srirangapatna Taluk, Karnataka",
                  },
                  "provider": {
                    "@type": "HinduTemple",
                    "name": "Sri Kubera Anjaneya Swamy Devasthanam Rampura",
                    "url": "https://www.srikshetrarampura.in/",
                  },
                },
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">{t("Sevas, Parihara & Booking", "ಸೇವೆ, ಪರಿಹಾರ ಮತ್ತು ಬುಕಿಂಗ್")}</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">{t("Sevas & Booking.", "ಸೇವೆ ಮತ್ತು ಬುಕಿಂಗ್.")}</h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
              {t(
                "Book select poojas online, or arrange them at the temple office: the doshas the new mandapams relieve, a child's first letters before the giver of learning, and the great life-samskaras of the resident Veda pandits.",
                "ಆಯ್ದ ಪೂಜೆಗಳನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ, ಅಥವಾ ದೇವಸ್ಥಾನದ ಕಚೇರಿಯಲ್ಲಿ ಏರ್ಪಡಿಸಿ: ಹೊಸ ಮಂಟಪಗಳು ಪರಿಹರಿಸುವ ದೋಷಗಳು, ವಿದ್ಯಾದಾತನ ಮುಂದೆ ಮಗುವಿನ ಮೊದಲ ಅಕ್ಷರಗಳು, ಮತ್ತು ನಿವಾಸಿ ವೇದ ಪಂಡಿತರ ಮಹಾ ಜೀವನ-ಸಂಸ್ಕಾರಗಳು."
              )}
            </p>
            <div className="flex gap-3 flex-wrap mt-8">
              <a href="#book" className="btn btn-primary">{t("Book a pooja online ↓", "ಪೂಜೆಯನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ ↓")}</a>
              <a href="#office" className="btn btn-secondary">{t("Sevas at the office ↓", "ಕಚೇರಿಯಲ್ಲಿ ಸೇವೆಗಳು ↓")}</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Book Online Section */}
      <section className="bg-bg border-b border-line" id="book" style={{ scrollMarginTop: "7rem" }}>
        <div className="wrap py-20 sm:py-24">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">{t("Online booking", "ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್")}</span>
            </div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('Book a pooja, <em class="italic font-normal text-accent">from anywhere.</em>', 'ಎಲ್ಲಿಂದಲಾದರೂ, <em class="italic font-normal text-accent">ಪೂಜೆ ಬುಕ್ ಮಾಡಿ.</em>')
              }}
            />
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
              {t(
                "Choose a pooja and an open date, share your sankalpa details, and pay securely online. Your confirmation and a reminder arrive on WhatsApp.",
                "ಪೂಜೆ ಮತ್ತು ತೆರೆದ ದಿನಾಂಕವನ್ನು ಆರಿಸಿ, ನಿಮ್ಮ ಸಂಕಲ್ಪದ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ, ಸುರಕ್ಷಿತವಾಗಿ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪಾವತಿಸಿ. ದೃಢೀಕರಣ ಮತ್ತು ಜ್ಞಾಪನೆ ನಿಮ್ಮ ವಾಟ್ಸ್‌ಆ್ಯಪ್‌ಗೆ ಬರುತ್ತದೆ."
              )}
            </p>
          </ScrollReveal>

          {/* Dynamic Booking Flow Component */}
          <BookingFlow />
        </div>
      </section>

      {/* Sevas at Office Section */}
      <section className="bg-surface border-b border-line" id="office" style={{ scrollMarginTop: "7rem" }}>
        <div className="wrap py-24 sm:py-32">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <div className="eyebrow">{t("Arranged at the Temple Office", "ದೇವಸ್ಥಾನದ ಕಚೇರಿಯಲ್ಲಿ ಏರ್ಪಡಿಸುವುದು")}</div>
            <h2 className="display text-4xl sm:text-5xl mt-5">{t("Pariharas & Samskaras.", "ಪರಿಹಾರ ಮತ್ತು ಸಂಸ್ಕಾರಗಳು.")}</h2>
            <p className="mt-6 text-muted leading-relaxed">
              {t(
                "Sevas performed in person at the temple office, 7:00 AM – 11:00 AM daily.",
                "ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 7:00 – 11:00 ದೇವಸ್ಥಾನದ ಕಚೇರಿಯಲ್ಲಿ ನೇರವಾಗಿ ಏರ್ಪಡಿಸುವ ಸೇವೆಗಳು."
              )}
            </p>
          </ScrollReveal>

          {/* Seva Items List */}
          <div className="space-y-16 max-w-4xl mx-auto">
            {/* Nakshatra Dosha Parihara */}
            <ScrollReveal className="bg-bg p-8 sm:p-10 border border-line" id="nakshatra" style={{ scrollMarginTop: "7rem" }}>
              <div className="eyebrow">{t("Parihara", "ಪರಿಹಾರ")}</div>
              <h3 className="display text-3xl mt-2">{t("Nakshatra Dosha Parihara", "ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರ")}</h3>
              <div className="rule-faint my-5"></div>
              <p className="text-ink/90 leading-relaxed">
                {t(
                  "Performed at the pillar of one's birth-star among the mandapam's twenty-seven nakshatra pillars, with archana and the abhisheka tirtha, for those born under an afflicted star.",
                  "ಮಂಟಪದ ಇಪ್ಪತ್ತೇಳು ನಕ್ಷತ್ರ ಸ್ತಂಭಗಳಲ್ಲಿ ನಿಮ್ಮ ಜನ್ಮ ನಕ್ಷತ್ರದ ಸ್ತಂಭದ ಬಳಿ, ಅರ್ಚನೆ ಮತ್ತು ಅಭಿಷೇಕ ತೀರ್ಥದೊಂದಿಗೆ, ನಕ್ಷತ್ರ ದೋಷದಿಂದ ಬಳಲುತ್ತಿರುವವರಿಗಾಗಿ ನಡೆಸಲ್ಪಡುತ್ತದೆ."
                )}
              </p>
            </ScrollReveal>

            {/* Rasi Dosha Parihara */}
            <ScrollReveal className="bg-bg p-8 sm:p-10 border border-line" id="rasi" style={{ scrollMarginTop: "7rem" }}>
              <div className="eyebrow">{t("Parihara", "ಪರಿಹಾರ")}</div>
              <h3 className="display text-3xl mt-2">{t("Rasi Dosha Parihara", "ರಾಶಿ ದೋಷ ಪರಿಹಾರ")}</h3>
              <div className="rule-faint my-5"></div>
              <p className="text-ink/90 leading-relaxed">
                {t(
                  "Offered before one's own rasi in the Rasi mandapam of the twelve zodiac signs, that graha and rasi doshas may be relieved and the planets turn kind.",
                  "ಹನ್ನೆರಡು ರಾಶಿಗಳ ರಾಶಿ ಮಂಟಪದಲ್ಲಿ ನಿಮ್ಮ ರಾಶಿಯ ಮುಂದೆ ನೀಡಲಾಗುವ ಪೂಜೆ, ಗ್ರಹ ಮತ್ತು ರಾಶಿ ದೋಷಗಳು ನಿವಾರಣೆಯಾಗಿ ಗ್ರಹಗಳ ಅನುಗ್ರಹ ಲಭಿಸಲಿ."
                )}
              </p>
            </ScrollReveal>

            {/* Aksharabhyasam */}
            <ScrollReveal className="bg-bg p-8 sm:p-10 border border-line" id="aksharabhyasam" style={{ scrollMarginTop: "7rem" }}>
              <div className="eyebrow">{t("Vidya Samskara", "ವಿದ್ಯಾ ಸಂಸ್ಕಾರ")}</div>
              <h3 className="display text-3xl mt-2">{t("Aksharabhyasam", "ಅಕ್ಷರಾಭ್ಯಾಸ")}</h3>
              <div className="rule-faint my-5"></div>
              <p className="text-ink/90 leading-relaxed">
                {t(
                  "The rite by which a young child first writes, the hand guided to trace Om in rice and on the slate, performed before Sri Vidya Hayagreeva, lord of vidya and clear speech.",
                  "ಮಗುವಿನ ಮೊದಲ ಅಕ್ಷರಾರಂಬದ ಸಂಸ್ಕಾರ, ಅಕ್ಕಿಯಲ್ಲಿ ಮತ್ತು ಹಲಗೆಯಲ್ಲಿ 'ಓಂ' ತಿದ್ದಿಸುವ ಪೂಜೆ, ಜ್ಞಾನದ ದೇವರಾದ ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವನ ಸನ್ನಿಧಿಯಲ್ಲಿ ನೆರವೇರುತ್ತದೆ."
                )}
              </p>
            </ScrollReveal>

            {/* Shashtipoorthi */}
            <ScrollReveal className="bg-bg p-8 sm:p-10 border border-line" id="shashtipoorthi" style={{ scrollMarginTop: "7rem" }}>
              <div className="eyebrow">{t("Samskara", "ಸಂಸ್ಕಾರ")}</div>
              <h3 className="display text-3xl mt-2">{t("Shashtipoorthi (Ugraratha Shanti)", "ಷಷ್ಟ್ಯಬ್ದಿ ಶಾಂತಿ (ಉಗ್ರರಥ ಶಾಂತಿ)")}</h3>
              <div className="rule-faint my-5"></div>
              <p className="text-ink/90 leading-relaxed">
                {t(
                  "The Ugraratha Shanti performed at the completion of sixty years, by which a couple renews its bond and receives blessings with homa, abhisheka and Maha Mangalarathi.",
                  "60 ವರ್ಷ ಪೂರ್ಣಗೊಂಡಾಗ ನೆರವೇರಿಸಲಾಗುವ ಉಗ್ರರಥ ಶಾಂತಿ, ಹೋಮ, ಅಭಿಷೇಕ ಮತ್ತು ಮಹಾ ಮಂಗಳಾರತಿಯೊಂದಿಗೆ ದಂಪತಿಗಳು ದೀರ್ಘಾಯುಷ್ಯದ ಆಶೀರ್ವಾದ ಪಡೆಯುತ್ತಾರೆ."
                )}
              </p>
            </ScrollReveal>

            {/* Bheemaratha Shanthi */}
            <ScrollReveal className="bg-bg p-8 sm:p-10 border border-line" id="bheemaratha" style={{ scrollMarginTop: "7rem" }}>
              <div className="eyebrow">{t("Samskara", "ಸಂಸ್ಕಾರ")}</div>
              <h3 className="display text-3xl mt-2">{t("Bheemaratha Shanthi", "ಭೀಮರಥ ಶಾಂತಿ")}</h3>
              <div className="rule-faint my-5"></div>
              <p className="text-ink/90 leading-relaxed">
                {t(
                  "The Bheemaratha Shanti performed at seventy years for long life and release from the fear of untimely death, where the Kalapurusha lies at the Swamy's feet.",
                  "70 ವರ್ಷ ಪೂರ್ಣಗೊಂಡಾಗ ದೀರ್ಘಾಯುಷ್ಯಕ್ಕಾಗಿ ಮತ್ತು ಅಪಮೃತ್ಯು ಭಯ ನಿವಾರಣೆಗಾಗಿ ನಡೆಸಲಾಗುವ ಶಾಂತಿ ಪೂಜೆ."
                )}
              </p>
            </ScrollReveal>

            {/* Sahasra Kalasha Darshana */}
            <ScrollReveal className="bg-bg p-8 sm:p-10 border border-line" id="sahasrakalasha" style={{ scrollMarginTop: "7rem" }}>
              <div className="eyebrow">{t("Vishesha Seva", "ವಿಶೇಷ ಸೇವೆ")}</div>
              <h3 className="display text-3xl mt-2">{t("Sahasra Kalasha Darshana", "ಸಹಸ್ರ ಕಲಶ ದರ್ಶನ")}</h3>
              <div className="rule-faint my-5"></div>
              <p className="text-ink/90 leading-relaxed">
                {t(
                  "The Sahasra Kalasha abhisheka in which the Swamy is bathed from a thousand consecrated kalashas on great occasions, a darshan of rare punya for the family that offers it.",
                  "ವಿಶೇಷ ಸಂದರ್ಭಗಳಲ್ಲಿ ಸಾವಿರ ಪವಿತ್ರ ಕಲಶಗಳಿಂದ ಸ್ವಾಮಿಗೆ ನೆರವೇರಿಸಲಾಗುವ ಭವ್ಯ ಸಹಸ್ರ ಕಲಶಾಭಿಷೇಕ ದರ್ಶನ."
                )}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

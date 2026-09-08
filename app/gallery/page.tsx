"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GalleryLightbox } from "@/components/GalleryLightbox";

interface GalleryItem {
  src: string;
  captionEn: string;
  captionKn: string;
  className: string;
  imgClass?: string;
  delay?: number;
}

const galleryItems: GalleryItem[] = [
  {
    src: "/assets/img/reconstruction/recon-mandapam-front.jpg",
    captionEn: "The reborn temple · granite mandapam and towers, 2026",
    captionKn: "ಪುನರ್ಜನ್ಮ ಪಡೆದ ದೇವಸ್ಥಾನ · ಗ್ರಾನೈಟ್ ಮಂಟಪ ಮತ್ತು ಗೋಪುರಗಳು, 2026",
    className: "min-h-[260px] md:col-span-2 text-left",
    delay: 0,
  },
  {
    src: "/assets/img/reconstruction/recon-shikhara.jpg",
    captionEn: "The new shikhara, raised in the Kalinga style",
    captionKn: "ಹೊಸ ಶಿಖರ, ಕಳಿಂಗ ಶೈಲಿಯಲ್ಲಿ",
    className: "min-h-[260px] md:row-span-2 text-left",
    imgClass: "object-top",
    delay: 80,
  },
  {
    src: "/assets/img/reconstruction/recon-vimana.jpg",
    captionEn: "The layered southern vimana over the sanctum",
    captionKn: "ಗರ್ಭಗುಡಿಯ ಮೇಲಿನ ಪದರ ಪದರದ ದಕ್ಷಿಣ ವಿಮಾನ",
    className: "min-h-[260px] text-left",
    delay: 160,
  },
  {
    src: "/assets/img/reconstruction/recon-mandapam-aerial.jpg",
    captionEn: "The twenty-seven-pillar mandapam, from above",
    captionKn: "ಇಪ್ಪತ್ತೇಳು ಸ್ತಂಭಗಳ ಮಂಟಪ, ಮೇಲಿನಿಂದ",
    className: "min-h-[260px] text-left",
    delay: 0,
  },
  {
    src: "/assets/img/reconstruction/recon-mandapam-wide-1.jpg",
    captionEn: "The mandapam from the village road",
    captionKn: "ಗ್ರಾಮದ ರಸ್ತೆಯಿಂದ ಮಂಟಪ",
    className: "min-h-[260px] md:col-span-2 text-left",
    delay: 80,
  },
  {
    src: "/assets/img/reconstruction/recon-mandapam-wide-2.jpg",
    captionEn: "The open pillared porch, nearing completion",
    captionKn: "ತೆರೆದ ಸ್ತಂಭಯುಕ್ತ ಮಂಟಪ",
    className: "min-h-[260px] text-left",
    delay: 160,
  },
  {
    src: "/assets/img/deity/anjaneya-before-after.jpg",
    captionEn: "The Anjaneya idol · before & after the June 2026 renovation",
    captionKn: "ಆಂಜನೇಯ ಮೂರ್ತಿ · ಜೂನ್ 2026ರ ಜೀರ್ಣೋದ್ಧಾರಕ್ಕೆ ಮುಂಚೆ ಮತ್ತು ನಂತರ",
    className: "min-h-[260px] md:col-span-2 text-left",
    delay: 0,
  },
  {
    src: "/assets/img/deity/hayagreeva-krishna-shila.jpg",
    captionEn: "Sri Vidya Hayagreeva · Krishna shila, before alankara",
    captionKn: "ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ · ಕೃಷ್ಣ ಶಿಲೆ, ಅಲಂಕಾರಕ್ಕೆ ಮುಂಚೆ",
    className: "min-h-[260px] md:row-span-2 text-left",
    imgClass: "object-top",
    delay: 80,
  },
  {
    src: "/assets/img/deity/hayagreeva-adorned-front.jpg",
    captionEn: "Adorned with jasmine and roses, prepared for puja",
    captionKn: "ಮಲ್ಲಿಗೆ ಮತ್ತು ಗುಲಾಬಿಗಳಿಂದ ಅಲಂಕೃತ, ಪೂಜೆಗೆ ಸಿದ್ಧ",
    className: "min-h-[260px] text-left",
    imgClass: "object-top",
    delay: 160,
  },
  {
    src: "/assets/img/deity/hayagreeva-adorned-side.jpg",
    captionEn: "Three-quarter view, garlanded and draped",
    captionKn: "ಮುಕ್ಕಾಲು ಭಾಗದ ನೋಟ, ಹಾರ ಮತ್ತು ವಸ್ತ್ರಗಳಿಂದ ಅಲಂಕೃತ",
    className: "min-h-[260px] text-left",
    imgClass: "object-top",
    delay: 240,
  },
  {
    src: "/assets/img/heritage/old-shrine-wall.jpg",
    captionEn: "The old village shrine · exterior wall",
    captionKn: "ಹಳೆಯ ಗ್ರಾಮ ದೇವಸ್ಥಾನ · ಹೊರಗೋಡೆ",
    className: "min-h-[260px] text-left",
    delay: 0,
  },
  {
    src: "/assets/img/heritage/old-porch.jpg",
    captionEn: "The old porch with painted columns",
    captionKn: "ಬಣ್ಣ ಬಳಿದ ಕಂಬಗಳಿರುವ ಹಳೆಯ ಮಂಟಪ",
    className: "min-h-[260px] text-left",
    delay: 80,
  },
  {
    src: "/assets/img/heritage/old-facade.jpg",
    captionEn: "The old façade, stone lamp-post in the foreground",
    captionKn: "ಹಳೆಯ ಮುಂಭಾಗ, ಮುಂದೆ ಕಲ್ಲಿನ ದೀಪಸ್ತಂಭ",
    className: "min-h-[260px] md:col-span-2 text-left",
    delay: 160,
  },
];

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState<{ src: string; caption: string } | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">{t("A Visual Record", "ಚಿತ್ರ ಮಾಲಿಕೆ")}</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">
              {t("Quiet glimpses of the shrine.", "ದೇವಸ್ಥಾನದ ಶಾಂತ ನೋಟಗಳು.")}
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
              {t(
                "The reborn temple of 2026, the new sanctum, and the deity, before and after.",
                "2026ರ ಪುನರ್ಜನ್ಮ ಪಡೆದ ದೇವಸ್ಥಾನ, ಹೊಸ ಗರ್ಭಗುಡಿ, ಮತ್ತು ದೇವರು, ಜೀರ್ಣೋದ್ಧಾರಕ್ಕೆ ಮುಂಚೆ ಮತ್ತು ನಂತರ."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-surface border-b border-line">
        <div className="wrap pt-16 pb-6">
          <ScrollReveal className="text-sm text-muted leading-relaxed max-w-2xl">
            <span
              dangerouslySetInnerHTML={{
                __html: t(
                  'The reborn shrine in stone: its twenty-seven-pillar mandapam, one pillar to each nakshatra, where the priests perform <a href="/sevas#nakshatra" class="link">Nakshatra Dosha Parihara</a> at the pillar of your birth-star.',
                  'ಶಿಲೆಯಲ್ಲಿ ಪುನರ್ಜನ್ಮ ಪಡೆದ ದೇವಸ್ಥಾನ: ಇಪ್ಪತ್ತೇಳು ಸ್ತಂಭಗಳ ಮಂಟಪ, ಪ್ರತಿ ನಕ್ಷತ್ರಕ್ಕೆ ಒಂದು ಸ್ತಂಭ, ಇಲ್ಲಿ ಅರ್ಚಕರು ನಿಮ್ಮ ಜನ್ಮ ನಕ್ಷತ್ರದ ಸ್ತಂಭದ ಬಳಿ <a href="/sevas#nakshatra" class="link">ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರ</a> ನಡೆಸುತ್ತಾರೆ.'
                ),
              }}
            />
          </ScrollReveal>
        </div>

        <div className="wrap pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:auto-rows-[260px]">
          {galleryItems.map((item, idx) => {
            const caption = t(item.captionEn, item.captionKn);
            return (
              <ScrollReveal
                key={idx}
                delay={item.delay || 0}
                className={`group relative overflow-hidden border border-line hover:border-ink transition-colors hover-zoom cursor-pointer ${item.className}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveImage({ src: item.src, caption })}
                  className="w-full h-full text-left relative block"
                  aria-label={`Open image: ${caption}`}
                >
                  <img
                    src={item.src}
                    alt={caption}
                    className={`absolute inset-0 w-full h-full object-cover ${item.imgClass || ""}`}
                    loading="lazy"
                  />
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(to top, rgba(10,10,10,.82), transparent 60%)" }}
                  />
                  <span className="absolute left-4 right-4 bottom-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {caption}
                  </span>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryLightbox
        src={activeImage?.src || null}
        caption={activeImage?.caption || ""}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}

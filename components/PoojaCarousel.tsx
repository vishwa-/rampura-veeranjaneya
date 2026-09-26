"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { Pooja } from "@/lib/types";
import { ScrollReveal } from "@/components/ScrollReveal";

export const PoojaCarousel: React.FC = () => {
  const { isKn, t } = useLanguage();
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    fetch("/api/poojas", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const active = (data.poojas || []).filter((p: Pooja) => p.active !== false);
        setPoojas(active);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [poojas]);

  const handleScroll = (dir: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = dir === "left" ? -360 : 360;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const formatDakshina = (paise: number) => {
    return "₹" + (paise / 100).toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <section className="py-20 bg-bg border-b border-line">
        <div className="wrap text-center">
          <p className="text-muted font-serif italic">
            {t("Loading sacred poojas & sevas…", "ಪವಿತ್ರ ಪೂಜೆಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ…")}
          </p>
        </div>
      </section>
    );
  }

  if (!poojas.length) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E8E1D5] relative overflow-hidden" id="poojas">
      <div className="wrap">
        {/* Header with Title and Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(196,77,18,0.3)] bg-[rgba(196,77,18,0.06)] mb-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C44D12]">
                {t("Online Poojas & Sevas", "ಆನ್‌ಲೈನ್ ಪೂಜೆಗಳು ಮತ್ತು ಸೇವೆಗಳು")}
              </span>
            </div>
            <h2 className="display text-3xl sm:text-4xl md:text-5xl text-[#2B231D]">
              {t("Sacred Sevas at Rampura", "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಪವಿತ್ರ ಸೇವೆಗಳು")}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6E6359] leading-relaxed">
              {t(
                "Sankalpa poojas and archana sevas performed in your family's name by qualified Veda priests at Sri Kshetra Rampura.",
                "ಶ್ರೀ ಕ್ಷೇತ್ರ ರಾಂಪುರದಲ್ಲಿ ಅರ್ಚಕರಿಂದ ನಿಮ್ಮ ಕುಟುಂಬದ ಹೆಸರಿನಲ್ಲಿ ನೆರವೇರುವ ಪವಿತ್ರ ಸಂಕಲ್ಪ ಪೂಜೆಗಳು ಮತ್ತು ಅರ್ಚನೆಗಳು."
              )}
            </p>
          </ScrollReveal>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous poojas"
              className="w-12 h-12 rounded-full border border-[#D5CBBE] bg-white text-[#2B231D] flex items-center justify-center text-xl hover:bg-[#7C1D24] hover:text-white hover:border-[#7C1D24] transition disabled:opacity-30 disabled:pointer-events-none shadow-sm"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next poojas"
              className="w-12 h-12 rounded-full border border-[#D5CBBE] bg-white text-[#2B231D] flex items-center justify-center text-xl hover:bg-[#7C1D24] hover:text-white hover:border-[#7C1D24] transition disabled:opacity-30 disabled:pointer-events-none shadow-sm"
            >
              ›
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {poojas.map((p, idx) => {
            const name = isKn ? p.name_kn : p.name_en;
            const desc = isKn ? p.desc_kn || p.desc_en : p.desc_en || p.desc_kn;

            return (
              <div
                key={p.id}
                className="snap-start shrink-0 w-[85vw] sm:w-[360px] md:w-[380px] bg-white rounded-2xl border border-[#E3DBD0] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#C44D12]/40 transition-all duration-300 group"
              >
                <div>
                  {/* Top Badge & Dakshina */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#FAF4ED] text-[#C44D12] border border-[#F0DFCD]">
                      {t("Sanctum Seva", "ಗರ್ಭಗುಡಿ ಸೇವೆ")}
                    </span>
                    <span className="text-xl font-bold font-mono text-[#7C1D24] tabular-nums">
                      {formatDakshina(p.amount_paise)}
                    </span>
                  </div>

                  {/* Pooja Name */}
                  <h3 className="display text-xl sm:text-2xl text-[#241E1A] group-hover:text-[#7C1D24] transition-colors line-clamp-2">
                    {name}
                  </h3>

                  <div className="w-10 h-0.5 bg-[#C44D12]/30 my-4" />

                  {/* Description */}
                  <p className="text-sm text-[#5C5248] leading-relaxed line-clamp-3 font-serif">
                    {desc}
                  </p>
                </div>

                {/* Footer with Capacity and Book Button */}
                <div className="pt-6 mt-6 border-t border-[#F0EAE1] flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#8A7D70] font-medium">
                    {p.capacity === 1
                      ? t("1 family/day", "ದಿನಕ್ಕೆ 1 ಕುಟುಂಬ")
                      : p.capacity
                      ? t(`Cap: ${p.capacity}`, `ಮಿತಿ: ${p.capacity}`)
                      : t("Open seva", "ಮುಕ್ತ ಸೇವೆ")}
                  </span>

                  <Link
                    href={`/sevas#book`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#7C1D24] text-white hover:bg-[#96262E] transition shadow-sm"
                  >
                    <span>{t("Book →", "ಬುಕ್ ಮಾಡಿ →")}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Sevas Link */}
        <div className="text-center mt-10">
          <Link
            href="/sevas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C1D24] hover:text-[#96262E] transition group"
          >
            <span>{t("View all temple sevas & parihara details", "ಎಲ್ಲಾ ಸೇವೆಗಳು ಮತ್ತು ಪರಿಹಾರ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ")}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

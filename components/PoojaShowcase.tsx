"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { Pooja } from "@/lib/types";
import { ScrollReveal } from "@/components/ScrollReveal";

interface PoojaShowcaseProps {
  onSelectPooja?: (poojaId: string) => void;
}

export const PoojaShowcase: React.FC<PoojaShowcaseProps> = ({ onSelectPooja }) => {
  const { isKn, t } = useLanguage();
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/poojas")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setPoojas(data.poojas || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const formatDakshina = (paise: number) => {
    return "₹" + (paise / 100).toLocaleString("en-IN");
  };

  const handleBookClick = (poojaId: string) => {
    if (onSelectPooja) {
      onSelectPooja(poojaId);
    }
    const bookEl = document.getElementById("bookFlowSection");
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted font-serif italic text-lg">
          {t("Loading sacred sevas and poojas…", "ಪವಿತ್ರ ಸೇವೆಗಳು ಮತ್ತು ಪೂಜೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ…")}
        </p>
      </div>
    );
  }

  if (!poojas.length) {
    return null;
  }

  return (
    <div className="space-y-10 max-w-5xl mx-auto my-12">
      <div className="text-center">
        <div className="eyebrow text-accent">
          {t("Devasthanada Seva & Sankalpa", "ದೇವಸ್ಥಾನದ ಸೇವೆ ಮತ್ತು ಸಂಕಲ್ಪ")}
        </div>
        <h2 className="display text-3xl sm:text-5xl mt-3">
          {t("Sacred Offerings & Sevas", "ಪವಿತ್ರ ಸೇವೆಗಳು ಮತ್ತು ಪೂಜೆಗಳು")}
        </h2>
        <div className="flex justify-center my-4">
          <span className="ornate">
            <i></i>
          </span>
        </div>
        <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {t(
            "Authorized pooja offerings performed by qualified Veda priests at Sri Kshetra Rampura. Official dakshina amounts are set and maintained directly by the temple trust.",
            "ಶ್ರೀ ಕ್ಷೇತ್ರ ರಾಂಪುರದಲ್ಲಿ ವೇದ ಪಂಡಿತರಿಂದ ನೆರವೇರುವ ಶಾಸ್ತ್ರೋಕ್ತ ಪೂಜೆಗಳು. ಅಧಿಕೃತ ದಕ್ಷಿಣಾ ಮೊತ್ತವನ್ನು ದೇವಸ್ಥಾನದ ಟ್ರಸ್ಟ್ ನಿರ್ಧರಿಸುತ್ತದೆ."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {poojas.map((p, idx) => (
          <ScrollReveal
            key={p.id}
            delay={idx * 80}
            className="group relative bg-bg border border-line p-8 sm:p-9 transition-all duration-300 hover:border-accent/50 hover:shadow-md flex flex-col justify-between"
            style={{ borderRadius: "var(--radius-md)" }}
          >
            {/* Top decorative subtle corner */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="eyebrow text-accent">
                {t("Sanctum Seva", "ಗರ್ಭಗುಡಿ ಸೇವೆ")}
              </span>
              <span
                className="numeral text-xl font-bold tracking-tight text-accent tabular-nums px-3 py-1 bg-surface border border-line"
                style={{ borderRadius: "var(--radius-xs)" }}
              >
                {formatDakshina(p.amount_paise)}
              </span>
            </div>

            <div>
              <h3 className="display text-2xl sm:text-3xl text-ink group-hover:text-accent transition-colors">
                {isKn ? p.name_kn : p.name_en}
              </h3>

              <div className="rule-faint my-4"></div>

              <p className="text-ink/80 text-sm sm:text-base leading-relaxed mb-6 font-serif">
                {isKn ? p.desc_kn || p.desc_en : p.desc_en || p.desc_kn}
              </p>
            </div>

            <div className="pt-4 border-t border-line/60 flex items-center justify-between flex-wrap gap-4 mt-auto">
              <div className="text-xs uppercase tracking-widest text-muted">
                {p.capacity
                  ? t(`Seats per date: ${p.capacity}`, `ಪ್ರತಿ ದಿನಕ್ಕೆ ಗರಿಷ್ಠ: ${p.capacity}`)
                  : t("Open enrollment", "ತೆರೆದ ಸೇವೆ")}
              </div>
              <button
                type="button"
                onClick={() => handleBookClick(p.id)}
                className="btn btn-primary text-xs tracking-wider"
                style={{ padding: ".55rem 1.1rem" }}
              >
                {t("Select & Book Date →", "ದಿನಾಂಕ ಆರಿಸಿ ಬುಕ್ ಮಾಡಿ →")}
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

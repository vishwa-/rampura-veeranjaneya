"use client";

import React from "react";
import { useLanguage } from "@/lib/context/LanguageContext";

interface Props {
  className?: string;
  showTitle?: boolean;
}

export const TempleTimingsTable: React.FC<Props> = ({
  className = "",
  showTitle = true,
}) => {
  const { t } = useLanguage();

  return (
    <div
      className={`border border-line overflow-hidden bg-surface ${className}`}
      style={{ borderRadius: "var(--radius-md)" }}
    >
      {showTitle && (
        <div className="bg-bg border-b border-line px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
            <h3 className="display text-lg text-ink font-semibold">
              {t("Temple Timings", "ದೇವಸ್ಥಾನದ ದರ್ಶನ ಸಮಯ")}
            </h3>
          </div>
          <span className="eyebrow text-xs text-muted">
            {t("Daily Darshan", "ದೈನಂದಿನ ದರ್ಶನ")}
          </span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <tbody>
            {/* MORNING SECTION */}
            <tr className="bg-bg/80 border-b border-line">
              <td
                colSpan={2}
                className="px-5 py-2.5 font-semibold text-accent uppercase tracking-wider text-xs"
              >
                {t("Morning", "ಬೆಳಿಗ್ಗೆ")}
              </td>
            </tr>

            {/* Morning Open Group */}
            <tr className="border-b border-line/40">
              <td colSpan={2} className="px-5 pt-3 pb-1 font-semibold text-ink text-xs uppercase tracking-wide text-muted">
                {t("Open", "ತೆರೆಯುವ ಸಮಯ")}
              </td>
            </tr>

            <tr className="border-b border-line/40 hover:bg-bg/30 transition-colors">
              <td className="pl-8 pr-4 py-2 text-ink/90">
                {t("Normal days", "ಸಾಮಾನ್ಯ ದಿನಗಳು")}
              </td>
              <td className="pr-5 pl-2 py-2 text-right font-medium numeral text-ink whitespace-nowrap">
                7:30 AM
              </td>
            </tr>

            <tr className="border-b border-line/50 hover:bg-bg/30 transition-colors">
              <td className="pl-8 pr-4 py-2 text-ink/90">
                {t("Saturday and Festival days", "ಶನಿವಾರ ಮತ್ತು ಹಬ್ಬದ ದಿನಗಳು")}
              </td>
              <td className="pr-5 pl-2 py-2 text-right font-medium numeral text-ink whitespace-nowrap">
                7:00 AM
              </td>
            </tr>

            {/* Morning Mahamangalarathi */}
            <tr className="border-b border-line/50 bg-accent/5 hover:bg-accent/10 transition-colors">
              <td className="px-5 py-2.5 font-semibold text-ink flex items-center gap-2">
                <span className="text-accent text-xs">✦</span>
                <span>{t("Mahamangalarathi", "ಮಹಾಮಂಗಳಾರತಿ")}</span>
              </td>
              <td className="pr-5 pl-2 py-2.5 text-right font-bold numeral text-accent whitespace-nowrap">
                9:00 AM
              </td>
            </tr>

            {/* Morning Close */}
            <tr className="border-b-2 border-line hover:bg-bg/30 transition-colors">
              <td className="px-5 py-2.5 font-medium text-ink">
                {t("Close", "ಮುಚ್ಚುವ ಸಮಯ")}
              </td>
              <td className="pr-5 pl-2 py-2.5 text-right font-medium numeral text-ink whitespace-nowrap">
                1:00 PM
              </td>
            </tr>

            {/* EVENING SECTION */}
            <tr className="bg-bg/80 border-b border-line">
              <td
                colSpan={2}
                className="px-5 py-2.5 font-semibold text-accent uppercase tracking-wider text-xs"
              >
                {t("Evening", "ಸಂಜೆ")}
              </td>
            </tr>

            {/* Evening Open */}
            <tr className="border-b border-line/50 hover:bg-bg/30 transition-colors">
              <td className="px-5 py-2.5 font-medium text-ink">
                {t("Open", "ತೆರೆಯುವ ಸಮಯ")}
              </td>
              <td className="pr-5 pl-2 py-2.5 text-right font-medium numeral text-ink whitespace-nowrap">
                5:00 PM
              </td>
            </tr>

            {/* Evening Mahamangalarathi */}
            <tr className="border-b border-line/50 bg-accent/5 hover:bg-accent/10 transition-colors">
              <td className="px-5 py-2.5 font-semibold text-ink flex items-center gap-2">
                <span className="text-accent text-xs">✦</span>
                <span>{t("Mahamangalarathi", "ಮಹಾಮಂಗಳಾರತಿ")}</span>
              </td>
              <td className="pr-5 pl-2 py-2.5 text-right font-bold numeral text-accent whitespace-nowrap">
                7:00 PM
              </td>
            </tr>

            {/* Evening Close Group */}
            <tr className="border-b border-line/40">
              <td colSpan={2} className="px-5 pt-3 pb-1 font-semibold text-ink text-xs uppercase tracking-wide text-muted">
                {t("Close", "ಮುಚ್ಚುವ ಸಮಯ")}
              </td>
            </tr>

            <tr className="border-b border-line/40 hover:bg-bg/30 transition-colors">
              <td className="pl-8 pr-4 py-2 text-ink/90">
                {t("Normal days", "ಸಾಮಾನ್ಯ ದಿನಗಳು")}
              </td>
              <td className="pr-5 pl-2 py-2 text-right font-medium numeral text-ink whitespace-nowrap">
                8:30 PM
              </td>
            </tr>

            <tr className="hover:bg-bg/30 transition-colors">
              <td className="pl-8 pr-4 py-2 text-ink/90">
                {t("Saturday and Festival days", "ಶನಿವಾರ ಮತ್ತು ಹಬ್ಬದ ದಿನಗಳು")}
              </td>
              <td className="pr-5 pl-2 py-2 text-right font-medium numeral text-ink whitespace-nowrap">
                9:00 PM
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";

const NAKSHATRAS: [string, string][] = [
  ["Ashwini", "ಅಶ್ವಿನಿ"], ["Bharani", "ಭರಣಿ"], ["Krittika", "ಕೃತ್ತಿಕಾ"], ["Rohini", "ರೋಹಿಣಿ"],
  ["Mrigashira", "ಮೃಗಶಿರ"], ["Ardra", "ಆರ್ದ್ರಾ"], ["Punarvasu", "ಪುನರ್ವಸು"], ["Pushya", "ಪುಷ್ಯ"],
  ["Ashlesha", "ಆಶ್ಲೇಷಾ"], ["Magha", "ಮಘಾ"], ["Purva Phalguni", "ಪೂರ್ವ ಫಲ್ಗುಣಿ"], ["Uttara Phalguni", "ಉತ್ತರ ಫಲ್ಗುಣಿ"],
  ["Hasta", "ಹಸ್ತ"], ["Chitra", "ಚಿತ್ರಾ"], ["Swati", "ಸ್ವಾತಿ"], ["Vishakha", "ವಿಶಾಖಾ"],
  ["Anuradha", "ಅನುರಾಧಾ"], ["Jyeshtha", "ಜ್ಯೇಷ್ಠಾ"], ["Mula", "ಮೂಲಾ"], ["Purva Ashadha", "ಪೂರ್ವಾಷಾಢಾ"],
  ["Uttara Ashadha", "ಉತ್ತರಾಷಾಢಾ"], ["Shravana", "ಶ್ರವಣ"], ["Dhanishta", "ಧನಿಷ್ಠಾ"], ["Shatabhisha", "ಶತಭಿಷಾ"],
  ["Purva Bhadrapada", "ಪೂರ್ವ ಭಾದ್ರಪದ"], ["Uttara Bhadrapada", "ಉತ್ತರ ಭಾದ್ರಪದ"], ["Revati", "ರೇವತಿ"],
];

export const NakshatraWheel: React.FC = () => {
  const { isKn, t } = useLanguage();
  const [selected, setSelected] = useState<number>(-1);

  const N = NAKSHATRAS.length;
  const CX = 200;
  const CY = 200;
  const rIn = 94;
  const rOut = 166;
  const rNum = 183;

  const starName = (idx: number) => NAKSHATRAS[idx][isKn ? 1 : 0];

  return (
    <div className="nw-layout">
      {/* SVG Wheel */}
      <div className="nw-wheel" data-nakshatra-wheel>
        <svg
          viewBox="0 0 400 400"
          className="nw-svg"
          role="img"
          aria-label="Wheel of the twenty-seven nakshatra pillars"
        >
          {[rOut, rIn].map((r, i) => (
            <circle key={i} cx={CX} cy={CY} r={r} className="nw-ring" />
          ))}

          {NAKSHATRAS.map((_, i) => {
            const ang = (-90 + i * (360 / N)) * (Math.PI / 180);
            const x1 = CX + rIn * Math.cos(ang);
            const y1 = CY + rIn * Math.sin(ang);
            const x2 = CX + rOut * Math.cos(ang);
            const y2 = CY + rOut * Math.sin(ang);
            const xNum = CX + rNum * Math.cos(ang);
            const yNum = CY + rNum * Math.sin(ang);
            const active = selected === i;

            return (
              <g
                key={i}
                className={`nw-pillar ${active ? "active" : ""}`}
                tabIndex={0}
                role="button"
                aria-label={NAKSHATRAS[i][0]}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(i);
                  }
                }}
              >
                <line x1={x1} y1={y1} x2={x2} y2={y2} className="nw-hit" />
                <line x1={x1} y1={y1} x2={x2} y2={y2} className="nw-line" />
                <circle cx={x2} cy={y2} r={3.2} className="nw-dot" />
                <text
                  x={xNum}
                  y={yNum}
                  className="nw-num"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Center Display */}
        <div className="nw-center">
          {selected >= 0 ? (
            <>
              <div className="nw-c-num">
                {selected + 1}
                <span>/27</span>
              </div>
              <div className="nw-c-name">{starName(selected)}</div>
            </>
          ) : (
            <div
              className="nw-c-hint"
              dangerouslySetInnerHTML={{
                __html: isKn
                  ? "ನಿಮ್ಮ ಜನ್ಮ<br>ನಕ್ಷತ್ರವನ್ನು<br>ಆರಿಸಿ"
                  : "Find your<br>birth star",
              }}
            />
          )}
        </div>
      </div>

      {/* Side Details Panel */}
      <div className="nw-panel">
        {selected >= 0 ? (
          <div>
            <div className="nw-d-k">{NAKSHATRAS[selected][1]}</div>
            <div className="nw-d-name">{NAKSHATRAS[selected][0]}</div>
            <p className="nw-d-p">
              {t(
                "At this pillar, one of the twenty-seven, the priests perform Nakshatra Dosha Parihara, with archana and the abhisheka tirtha.",
                "ನಿಮ್ಮ ಜನ್ಮ ನಕ್ಷತ್ರದ ಸ್ತಂಭದ ಬಳಿ ಅರ್ಚಕರು ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರ ನಡೆಸುತ್ತಾರೆ."
              )}
            </p>
            <Link href="/sevas#nakshatra" className="btn inv-btn-m">
              {t("Nakshatra Dosha Parihara →", "ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರ →")}
            </Link>
          </div>
        ) : (
          <p className="nw-d-empty">
            {t(
              "Select one of the twenty-seven pillars, each consecrated to a nakshatra.",
              "ಇಪ್ಪತ್ತೇಳು ಸ್ತಂಭಗಳಲ್ಲಿ ಒಂದನ್ನು ಆರಿಸಿ, ಪ್ರತಿಯೊಂದೂ ಒಂದು ನಕ್ಷತ್ರಕ್ಕೆ ಸಮರ್ಪಿತ."
            )}
          </p>
        )}

        {/* Chips */}
        <div className="nw-chips">
          {NAKSHATRAS.map((_, j) => (
            <button
              key={j}
              type="button"
              className={`nw-chip ${selected === j ? "active" : ""}`}
              onClick={() => setSelected(j)}
            >
              {j + 1}. {starName(j)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

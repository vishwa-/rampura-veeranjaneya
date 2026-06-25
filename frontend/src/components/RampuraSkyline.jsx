import React from "react";

/**
 * A hand-illustrated vintage-poster SVG of the Rampura skyline.
 * Composition (left → right, back → front):
 *   • Sun disc (rendered by parent .sun-circle in CSS, not here)
 *   • Hills silhouette
 *   • Palms (right edge)
 *   • Rekha-Deula tower (Kalinga-style curvilinear shikhara) — the new garbhagudi
 *   • Hayagreeva sanctum (smaller, with gopuram + scripts band)
 *   • Birds (V shapes) in sky
 *   • Cauvery river with reflection
 *   • Path with bullock cart silhouette
 *   • Sugarcane field stalks (front fence)
 *
 * Pure CSS-coloured via currentColor groups + named fills.
 */
export function RampuraSkyline({ className = "w-full h-auto" }) {
  // Reusable colour tokens (vintage travel-poster)
  const ink = "hsl(18 27% 8%)";          // outline + deep silhouettes
  const terracotta = "hsl(8 67% 40%)";   // primary accent
  const terraDeep = "hsl(8 67% 32%)";    // darker terracotta
  const sage = "hsl(145 18% 50%)";       // palm + grass
  const sageDeep = "hsl(145 18% 38%)";
  const gold = "hsl(36 47% 58%)";        // sand path + sugarcane
  const goldDeep = "hsl(36 47% 45%)";
  const sky = "hsl(195 28% 67%)";        // river wash
  const cream = "hsl(32 64% 88%)";       // paper

  return (
    <svg
      viewBox="0 0 900 560"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="An illustrated skyline of Rampura — the new Rekha-Deula tower, the Hayagreeva sanctum, the Cauvery river, palms and sugarcane."
    >
      {/* ───── 1. Hills (far back) ───── */}
      <g opacity="0.55">
        <path
          d="M 0 360 Q 120 280 240 320 T 480 305 Q 600 280 720 320 T 900 330 L 900 380 L 0 380 Z"
          fill={sage}
        />
        <path
          d="M 0 380 Q 160 330 320 360 T 640 365 Q 780 340 900 370 L 900 410 L 0 410 Z"
          fill={sageDeep}
        />
      </g>

      {/* ───── 2. Birds in sky ───── */}
      <g stroke={ink} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M 120 90 q 8 -8 16 0 q 8 -8 16 0" />
        <path d="M 180 60 q 6 -6 12 0 q 6 -6 12 0" />
        <path d="M 240 100 q 7 -7 14 0 q 7 -7 14 0" />
        <path d="M 700 70 q 8 -8 16 0 q 8 -8 16 0" />
        <path d="M 760 100 q 6 -6 12 0 q 6 -6 12 0" />
      </g>

      {/* ───── 3. Palm trees (right edge) ───── */}
      <g>
        {/* Palm 1 */}
        <g transform="translate(770 200)">
          <path d="M 0 0 Q 4 60 0 200" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Fronds */}
          <g stroke={sageDeep} strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M 0 0 Q -30 -10 -55 5" />
            <path d="M 0 0 Q -28 -22 -50 -32" />
            <path d="M 0 0 Q -5 -30 5 -55" />
            <path d="M 0 0 Q 30 -10 55 5" />
            <path d="M 0 0 Q 28 -22 50 -32" />
            <path d="M 0 0 Q 15 -28 35 -45" />
          </g>
          {/* Coconuts */}
          <circle cx="-3" cy="6" r="3" fill={ink} />
          <circle cx="5" cy="8" r="3" fill={ink} />
        </g>
        {/* Palm 2 (smaller, further) */}
        <g transform="translate(840 240) scale(0.75)">
          <path d="M 0 0 Q 4 50 0 180" stroke={ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <g stroke={sageDeep} strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 0 0 Q -28 -8 -50 5" />
            <path d="M 0 0 Q -25 -20 -45 -28" />
            <path d="M 0 0 Q -5 -25 5 -50" />
            <path d="M 0 0 Q 28 -8 50 5" />
            <path d="M 0 0 Q 25 -20 45 -28" />
          </g>
        </g>
      </g>

      {/* ───── 4. Rekha-Deula tower (main shikhara) ───── */}
      <g transform="translate(310 110)">
        {/* Base mandapa */}
        <rect x="-90" y="240" width="180" height="50" fill={terraDeep} stroke={ink} strokeWidth="2" />
        <rect x="-100" y="230" width="200" height="14" fill={ink} />
        {/* Pillars inside the base — three pillar hints */}
        <g stroke={cream} strokeWidth="1.2" opacity="0.55">
          <line x1="-65" y1="244" x2="-65" y2="286" />
          <line x1="-30" y1="244" x2="-30" y2="286" />
          <line x1="0" y1="244" x2="0" y2="286" />
          <line x1="30" y1="244" x2="30" y2="286" />
          <line x1="65" y1="244" x2="65" y2="286" />
        </g>
        {/* Curvilinear tower body */}
        <path
          d="M -70 240 C -68 180 -55 110 0 30 C 55 110 68 180 70 240 Z"
          fill={terracotta}
          stroke={ink}
          strokeWidth="2.4"
        />
        {/* Horizontal bands on the tower (rekha lines) */}
        <g stroke={ink} strokeWidth="1.5" fill="none" opacity="0.85">
          <path d="M -67 220 C -50 215 50 215 67 220" />
          <path d="M -63 195 C -45 190 45 190 63 195" />
          <path d="M -58 170 C -40 165 40 165 58 170" />
          <path d="M -52 140 C -35 135 35 135 52 140" />
          <path d="M -42 110 C -28 106 28 106 42 110" />
          <path d="M -32 80 C -20 76 20 76 32 80" />
        </g>
        {/* Vertical rekhas — central spine */}
        <g stroke={ink} strokeWidth="1.4" opacity="0.7">
          <line x1="0" y1="40" x2="0" y2="240" />
          <line x1="-18" y1="60" x2="-26" y2="240" />
          <line x1="18" y1="60" x2="26" y2="240" />
        </g>
        {/* Amalaka (ribbed disc) */}
        <ellipse cx="0" cy="25" rx="26" ry="10" fill={terraDeep} stroke={ink} strokeWidth="2" />
        <g stroke={cream} strokeWidth="0.8" opacity="0.7">
          {[-20, -14, -8, -2, 4, 10, 16, 22].map((x) => (
            <line key={x} x1={x - 10} y1="25" x2={x - 10 + 4} y2="20" />
          ))}
        </g>
        {/* Kalasha (pot finial) */}
        <path d="M -8 16 C -8 10 8 10 8 16 L 6 8 L -6 8 Z" fill={gold} stroke={ink} strokeWidth="1.6" />
        <path d="M -3 8 L -3 -2 L 3 -2 L 3 8 Z" fill={gold} stroke={ink} strokeWidth="1.4" />
        <circle cx="0" cy="-5" r="3" fill={terracotta} stroke={ink} strokeWidth="1.4" />
        <line x1="0" y1="-8" x2="0" y2="-18" stroke={ink} strokeWidth="1.4" />
        <path d="M -5 -16 L 5 -16 L 0 -22 Z" fill={terracotta} stroke={ink} strokeWidth="1.2" />
      </g>

      {/* ───── 5. Hayagreeva sanctum (smaller temple with gopuram) ───── */}
      <g transform="translate(540 230)">
        {/* Base */}
        <rect x="-58" y="120" width="116" height="40" fill={ink} />
        <rect x="-50" y="125" width="100" height="32" fill={terraDeep} stroke={ink} strokeWidth="1.6" />
        {/* Doorway */}
        <path d="M -10 157 L -10 138 Q 0 130 10 138 L 10 157 Z" fill={ink} />
        {/* Script band — five alphabets carved on walls */}
        <g fontSize="10" fontFamily="serif" fill={cream}>
          <text x="-44" y="151">अ</text>
          <text x="-28" y="151">ॐ</text>
          <text x="-12" y="151"> </text>
          <text x="16" y="151">ಅ</text>
          <text x="30" y="151">அ</text>
        </g>
        {/* Tiered gopuram */}
        {[
          { y: 115, w: 86, h: 14 },
          { y: 100, w: 76, h: 13 },
          { y: 86, w: 66, h: 12 },
          { y: 73, w: 56, h: 11 },
          { y: 61, w: 46, h: 10 },
          { y: 50, w: 36, h: 9 },
        ].map((t, i) => (
          <g key={i}>
            <rect x={-t.w / 2} y={t.y} width={t.w} height={t.h} fill={i % 2 === 0 ? terracotta : terraDeep} stroke={ink} strokeWidth="1.4" />
            {/* tier ornaments */}
            <line x1={-t.w / 2 + 4} y1={t.y + t.h / 2} x2={t.w / 2 - 4} y2={t.y + t.h / 2} stroke={ink} strokeWidth="0.7" opacity="0.6" />
          </g>
        ))}
        {/* Top kalasha row */}
        <path d="M -16 50 L 16 50 L 12 40 L -12 40 Z" fill={terraDeep} stroke={ink} strokeWidth="1.5" />
        {/* 3 small kalashas */}
        {[-10, 0, 10].map((x) => (
          <g key={x} transform={`translate(${x} 40)`}>
            <circle cx="0" cy="-2" r="2.4" fill={gold} stroke={ink} strokeWidth="1" />
            <line x1="0" y1="-4" x2="0" y2="-10" stroke={ink} strokeWidth="1" />
          </g>
        ))}
      </g>

      {/* ───── 6. Path + bullock cart silhouette ───── */}
      {/* Path */}
      <path
        d="M 0 470 Q 240 460 450 466 Q 660 470 900 462 L 900 480 Q 660 488 450 484 Q 240 480 0 488 Z"
        fill={gold}
        stroke={ink}
        strokeWidth="1.4"
      />
      <path d="M 100 478 Q 280 472 460 476 Q 640 480 850 474" stroke={goldDeep} strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="2 4" />

      {/* Bullock cart (silhouette) */}
      <g transform="translate(180 458)">
        {/* Two bullocks */}
        <g fill={ink}>
          <path d="M -50 12 Q -55 -4 -42 -2 L -36 -8 L -34 -8 L -36 0 Q -28 2 -28 12 L -32 14 L -32 18 L -34 18 L -34 14 L -42 14 L -42 18 L -44 18 L -44 14 Z" />
          <path d="M -40 -8 L -45 -16 M -40 -8 L -34 -16" stroke={ink} strokeWidth="1.4" fill="none" />
          {/* Second bullock */}
          <path d="M -28 12 Q -33 -4 -20 -2 L -14 -8 L -12 -8 L -14 0 Q -6 2 -6 12 L -10 14 L -10 18 L -12 18 L -12 14 L -20 14 L -20 18 L -22 18 L -22 14 Z" />
          <path d="M -18 -8 L -23 -16 M -18 -8 L -12 -16" stroke={ink} strokeWidth="1.4" fill="none" />
        </g>
        {/* Cart body */}
        <g fill={terraDeep} stroke={ink} strokeWidth="1.4">
          <rect x="-4" y="-2" width="32" height="14" />
          <path d="M -4 -2 L -2 -8 L 26 -8 L 28 -2 Z" />
        </g>
        {/* Wheels */}
        <g stroke={ink} strokeWidth="1.4" fill={cream}>
          <circle cx="2" cy="14" r="5" />
          <circle cx="22" cy="14" r="5" />
          <line x1="2" y1="9" x2="2" y2="19" />
          <line x1="-3" y1="14" x2="7" y2="14" />
          <line x1="22" y1="9" x2="22" y2="19" />
          <line x1="17" y1="14" x2="27" y2="14" />
        </g>
        {/* Driver */}
        <circle cx="14" cy="-12" r="3" fill={ink} />
        <line x1="14" y1="-9" x2="14" y2="-2" stroke={ink} strokeWidth="2" />
      </g>

      {/* ───── 7. Cauvery river ───── */}
      <g>
        <path
          d="M 0 495 Q 200 510 450 498 Q 700 488 900 506 L 900 540 L 0 540 Z"
          fill={sky}
          opacity="0.55"
          stroke={ink}
          strokeWidth="1.2"
        />
        {/* River ripples */}
        <g stroke={ink} strokeWidth="0.8" fill="none" opacity="0.45">
          <path d="M 60 510 q 12 -3 24 0 t 24 0" />
          <path d="M 300 514 q 12 -3 24 0 t 24 0" />
          <path d="M 520 510 q 12 -3 24 0 t 24 0" />
          <path d="M 720 516 q 12 -3 24 0 t 24 0" />
          <path d="M 140 524 q 14 -3 28 0 t 28 0" />
          <path d="M 420 528 q 14 -3 28 0 t 28 0" />
          <path d="M 660 524 q 14 -3 28 0 t 28 0" />
        </g>
      </g>

      {/* ───── 8. Sugarcane field (foreground stalks) ───── */}
      <g>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 5 + i * 15 + (i % 3) * 3;
          const baseH = 30 + ((i * 7) % 24);
          return (
            <g key={i} transform={`translate(${x} 540)`}>
              <line x1="0" y1="0" x2="0" y2={-baseH} stroke={goldDeep} strokeWidth="1.6" strokeLinecap="round" />
              {/* leaves */}
              <path
                d={`M 0 ${-baseH * 0.55} q ${(i % 2 === 0 ? 7 : -7)} -6 ${(i % 2 === 0 ? 12 : -12)} -2`}
                stroke={sage}
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M 0 ${-baseH * 0.85} q ${(i % 2 === 0 ? -8 : 8)} -7 ${(i % 2 === 0 ? -13 : 13)} -3`}
                stroke={sage}
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
              {/* tassel */}
              <circle cx="0" cy={-baseH} r="2" fill={gold} />
            </g>
          );
        })}
      </g>

      {/* ───── 9. Subtle horizon rule ───── */}
      <line x1="0" y1="410" x2="900" y2="410" stroke={ink} strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

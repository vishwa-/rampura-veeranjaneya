import React from "react";

// Tilak/lotus-mandala medallion — used as section ornament.
export function Medallion({ className = "w-10 h-10", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="32" cy="32" r="2.5" fill={color} stroke="none" />
      <circle cx="32" cy="32" r="8" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 32 + Math.cos(a) * 8;
        const y1 = 32 + Math.sin(a) * 8;
        const x2 = 32 + Math.cos(a) * 22;
        const y2 = 32 + Math.sin(a) * 22;
        const pxA = 32 + Math.cos(a + Math.PI / 8) * 16;
        const pyA = 32 + Math.sin(a + Math.PI / 8) * 16;
        const pxB = 32 + Math.cos(a - Math.PI / 8) * 16;
        const pyB = 32 + Math.sin(a - Math.PI / 8) * 16;
        return (
          <g key={i}>
            <path d={`M${x1} ${y1} Q ${pxA} ${pyA} ${x2} ${y2}`} />
            <path d={`M${x1} ${y1} Q ${pxB} ${pyB} ${x2} ${y2}`} />
          </g>
        );
      })}
      <circle cx="32" cy="32" r="28" strokeDasharray="0.6 3" />
    </svg>
  );
}

// Ornamental horizontal divider with a medallion in the center.
export function OrnamentDivider({ label, kn, theme = "dark" }) {
  const lineColor = theme === "dark" ? "rgba(243, 234, 216, 0.18)" : "rgba(42, 24, 16, 0.18)";
  const inkColor = "hsl(20 51% 55%)"; // copper, always
  const labelColor = theme === "dark" ? "rgba(243, 234, 216, 0.7)" : "rgba(42, 24, 16, 0.7)";
  return (
    <div className="flex items-center justify-center gap-5 my-16 sm:my-24 px-5">
      <div className="flex-1 h-px max-w-[180px]" style={{ background: `linear-gradient(90deg, transparent, ${lineColor})` }} />
      <div className="flex flex-col items-center gap-2">
        <Medallion className="w-10 h-10" color={inkColor} />
        {(label || kn) ? (
          <div className="text-center">
            {kn ? <div className="font-kannada text-[11px] tracking-wider" style={{ color: labelColor }}>{kn}</div> : null}
            {label ? (
              <div className="text-[10px] tracking-[0.35em] uppercase" style={{ color: labelColor }}>
                {label}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="flex-1 h-px max-w-[180px]" style={{ background: `linear-gradient(270deg, transparent, ${lineColor})` }} />
    </div>
  );
}

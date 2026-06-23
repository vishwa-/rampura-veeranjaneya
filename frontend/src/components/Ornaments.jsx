import React from "react";

// Lotus-medallion ornament — crimson editorial style.
export function Medallion({ className = "w-10 h-10", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
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
      <circle cx="32" cy="32" r="28" strokeDasharray="0.5 3" />
    </svg>
  );
}

// Editorial section divider — double rule with medallion + label.
export function OrnamentDivider({ label, kn, theme = "light" }) {
  const ruleColor = theme === "dark" ? "rgba(240, 231, 210, 0.35)" : "rgba(26, 20, 16, 0.4)";
  const inkColor = theme === "dark" ? "hsl(38 38% 54%)" : "hsl(0 56% 39%)";
  const labelColor = theme === "dark" ? "rgba(240, 231, 210, 0.75)" : "rgba(26, 20, 16, 0.7)";
  return (
    <div className="flex items-center justify-center gap-6 my-16 sm:my-24 px-5">
      <div className="flex-1 max-w-[220px] flex flex-col gap-1">
        <span className="h-px" style={{ background: ruleColor }} />
        <span className="h-px" style={{ background: ruleColor }} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Medallion className="w-9 h-9" color={inkColor} />
        {(label || kn) ? (
          <div className="text-center">
            {kn ? <div className="font-kannada text-[11px] tracking-wider" style={{ color: labelColor }}>{kn}</div> : null}
            {label ? <div className="text-label-sm" style={{ color: labelColor }}>{label}</div> : null}
          </div>
        ) : null}
      </div>
      <div className="flex-1 max-w-[220px] flex flex-col gap-1">
        <span className="h-px" style={{ background: ruleColor }} />
        <span className="h-px" style={{ background: ruleColor }} />
      </div>
    </div>
  );
}

// Page-header masthead — newspaper-style date line + title rule
export function Masthead({ date, edition, label }) {
  return (
    <div className="border-y-2 border-double border-ink py-2 my-3">
      <div className="flex justify-between items-center text-label-sm text-ink">
        <span>{date}</span>
        <span>{label}</span>
        <span>{edition}</span>
      </div>
    </div>
  );
}

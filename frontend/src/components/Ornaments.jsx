import React from "react";

// A lotus-mandala medallion used as section ornament.
export function LotusMedallion({ className = "w-10 h-10", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="32" cy="32" r="3" fill={color} stroke="none" />
      <circle cx="32" cy="32" r="9" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 32 + Math.cos(a) * 9;
        const y1 = 32 + Math.sin(a) * 9;
        const x2 = 32 + Math.cos(a) * 22;
        const y2 = 32 + Math.sin(a) * 22;
        const px = 32 + Math.cos(a + Math.PI / 8) * 17;
        const py = 32 + Math.sin(a + Math.PI / 8) * 17;
        return (
          <g key={i}>
            <path d={`M${x1} ${y1} Q ${px} ${py} ${x2} ${y2}`} />
            <path d={`M${x1} ${y1} Q ${32 + Math.cos(a - Math.PI / 8) * 17} ${32 + Math.sin(a - Math.PI / 8) * 17} ${x2} ${y2}`} />
          </g>
        );
      })}
      <circle cx="32" cy="32" r="28" strokeDasharray="1 3" />
    </svg>
  );
}

// Ornamental horizontal divider with a medallion in the center.
export function OrnamentDivider({ label, kn, dark = false }) {
  const lineColor = dark ? "rgba(252, 246, 232, 0.25)" : "rgba(40,20,8,0.18)";
  const inkColor = dark ? "hsl(38 95% 62%)" : "hsl(8 78% 48%)";
  const labelColor = dark ? "rgba(252,246,232,0.7)" : "rgba(60,40,20,0.65)";
  return (
    <div className="flex items-center justify-center gap-5 my-14 sm:my-20 px-5">
      <div className="flex-1 h-px max-w-[180px]" style={{ background: `linear-gradient(90deg, transparent, ${lineColor})` }} />
      <div className="flex flex-col items-center gap-2">
        <LotusMedallion className="w-12 h-12" color={inkColor} />
        {(label || kn) && (
          <div className="text-center">
            {kn ? (
              <div className="font-kannada text-[11px] tracking-wider" style={{ color: labelColor }}>{kn}</div>
            ) : null}
            {label ? (
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.35em]" style={{ color: labelColor }}>
                {label}
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className="flex-1 h-px max-w-[180px]" style={{ background: `linear-gradient(270deg, transparent, ${lineColor})` }} />
    </div>
  );
}

// Decorative corner flourish — used at hero corners
export function CornerFlourish({ className = "w-20 h-20", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" aria-hidden>
      <path d="M0 40 Q 20 40 20 20 Q 20 0 40 0" />
      <path d="M0 30 Q 30 30 30 0" opacity="0.55" />
      <path d="M0 22 Q 22 22 22 0" opacity="0.3" />
      <circle cx="22" cy="22" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

import React from "react";

export function BilingualHeading({
  kannada,
  english,
  align = "left",
  size = "lg",
  as: Tag = "h2",
  className = "",
  ...rest
}) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const sizeMap = {
    sm: "text-3xl sm:text-4xl",
    md: "text-4xl sm:text-5xl",
    lg: "text-5xl sm:text-6xl",
    xl: "text-6xl sm:text-7xl lg:text-8xl",
  };
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`} {...rest}>
      {kannada ? (
        <span className="font-kannada text-vermillion/90 text-sm sm:text-base tracking-wide">
          {kannada}
        </span>
      ) : null}
      <Tag className={`display-hero ${sizeMap[size]} text-temple-ink`}>
        {english}
      </Tag>
    </div>
  );
}

export function SectionDivider({ label }) {
  return (
    <div className="flex items-center justify-center gap-5 my-14 px-5 text-xs uppercase tracking-[0.35em]">
      <div className="flex-1 h-px max-w-[180px] bg-gradient-to-r from-transparent via-border to-transparent" />
      <span aria-hidden className="text-vermillion">✦</span>
      {label ? <span className="text-muted-foreground">{label}</span> : null}
      <span aria-hidden className="text-vermillion">✦</span>
      <div className="flex-1 h-px max-w-[180px] bg-gradient-to-l from-transparent via-border to-transparent" />
    </div>
  );
}

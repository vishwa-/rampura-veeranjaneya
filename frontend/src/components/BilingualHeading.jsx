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
    sm: "text-2xl sm:text-3xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl",
    xl: "text-5xl sm:text-6xl lg:text-7xl",
  };
  return (
    <div
      className={`flex flex-col gap-2 ${alignClass} ${className}`}
      {...rest}
    >
      {kannada ? (
        <span
          className="font-kannada text-vermillion/90 text-sm sm:text-base tracking-wide"
          aria-hidden={false}
        >
          {kannada}
        </span>
      ) : null}
      <Tag
        className={`font-serif-display ${sizeMap[size]} leading-[1.05] text-temple-ink`}
      >
        {english}
      </Tag>
    </div>
  );
}

export function SectionDivider({ label }) {
  return (
    <div className="divider-ornament my-10 sm:my-14 text-xs uppercase tracking-[0.3em] font-body">
      <span aria-hidden>✦</span>
      {label ? <span className="text-muted-foreground">{label}</span> : null}
      <span aria-hidden>✦</span>
    </div>
  );
}

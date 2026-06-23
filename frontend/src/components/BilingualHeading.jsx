import React from "react";

export function BilingualHeading({
  kannada,
  english,
  align = "left",
  theme = "dark",
  size = "h2",
  as: Tag = "h2",
  italicWord,
  className = "",
}) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const sizeMap = {
    h1: "text-display-hero",
    h2: "text-display-h2",
    h3: "text-display-h3",
  };
  const headingColor = theme === "dark" ? "text-cream" : "text-deep";
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {kannada ? (
        <span className="font-kannada text-copper text-sm sm:text-base tracking-wide">{kannada}</span>
      ) : null}
      <Tag className={`${sizeMap[size]} ${headingColor}`}>
        {italicWord && english.includes(italicWord) ? (
          <>
            {english.split(italicWord)[0]}
            <span className="italic text-copper">{italicWord}</span>
            {english.split(italicWord).slice(1).join(italicWord)}
          </>
        ) : (
          english
        )}
      </Tag>
    </div>
  );
}

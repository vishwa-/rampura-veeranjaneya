import React from "react";

export function BilingualHeading({
  kannada,
  english,
  align = "left",
  theme = "light",
  size = "h2",
  as: Tag = "h2",
  italicWord,
  className = "",
}) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const sizeMap = {
    h1: "text-display-h1",
    h2: "text-display-h2",
    h3: "text-display-h3",
  };
  const headingColor = theme === "dark" ? "text-cream" : "text-ink";
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {kannada ? (
        <span className="font-kannada text-crimson text-sm sm:text-base">{kannada}</span>
      ) : null}
      <Tag className={`${sizeMap[size]} ${headingColor}`}>
        {italicWord && english.includes(italicWord) ? (
          <>
            {english.split(italicWord)[0]}
            <span className="italic text-crimson">{italicWord}</span>
            {english.split(italicWord).slice(1).join(italicWord)}
          </>
        ) : (
          english
        )}
      </Tag>
    </div>
  );
}

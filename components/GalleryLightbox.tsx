"use client";

import React, { useEffect } from "react";

interface GalleryLightboxProps {
  src: string | null;
  caption?: string;
  onClose: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  src,
  caption = "",
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="lightbox open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="absolute top-5 right-5 p-2"
        style={{ color: "rgba(255,255,255,0.8)" }}
        aria-label="Close"
        onClick={onClose}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <figure className="flex flex-col items-center max-w-5xl">
        <img src={src} alt={caption || ""} />
        {caption && (
          <figcaption
            className="mt-4 text-sm text-center max-w-2xl"
            style={{ color: "var(--text-on-dark-dim)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
};

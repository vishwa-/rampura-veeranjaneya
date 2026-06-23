import React, { useState } from "react";
import { X } from "lucide-react";
import { BilingualHeading } from "@/components/BilingualHeading";
import { LotusMedallion } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";
import { IMG } from "@/lib/data";

const ITEMS = [
  {
    src: IMG.idolBare,
    caption: "Sri Vidya Hayagreeva — Krishna shila, before alankara",
    span: "md:row-span-2",
  },
  {
    src: IMG.idolAdornedFrontal,
    caption: "Adorned with jasmine and roses, prepared for puja",
    span: "",
  },
  {
    src: IMG.idolAdornedAngled,
    caption: "Three-quarter view, garlanded and draped",
    span: "",
  },
  {
    src: IMG.lamp,
    caption: "The temple lamp — kept burning through the night",
    span: "",
  },
  {
    src: IMG.cauvery,
    caption: "The Cauvery at dawn, near Srirangapatna",
    span: "",
  },
  {
    src: IMG.sugarcane,
    caption: "Sugarcane fields surrounding the temple",
    span: "md:col-span-2",
  },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <div data-testid="page-gallery">
      <section className="relative bg-deep text-jasmine py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center">
          <div className="spin-slow"><LotusMedallion className="w-[600px] h-[600px]" color="hsl(38, 95%, 62%)" /></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">Gallery</div>
          <div className="font-kannada text-marigold/80 text-base mt-4">ಚಿತ್ರ ಮಾಲಿಕೆ</div>
          <h1 className="display-hero text-jasmine text-6xl sm:text-7xl lg:text-8xl mt-5 leading-[0.92]">
            Quiet glimpses
            <br />
            <em className="text-marigold">of the shrine.</em>
          </h1>
          <p className="mt-7 font-serif-display italic text-jasmine/90 text-lg max-w-2xl mx-auto leading-relaxed">
            “The new sanctum, the lamps that watch over it, and the fields that surround the village.”
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:auto-rows-[220px]">
          {ITEMS.map((it, i) => (
            <Reveal key={i} delay={i * 80} className={`group ${it.span}`}>
              <button
                type="button"
                onClick={() => setActive(it)}
                data-testid={`gallery-item-${i}`}
                className="relative w-full h-full min-h-[220px] overflow-hidden rounded-sm bg-ink/5 block"
                aria-label={`Open image: ${it.caption}`}
              >
                <img
                  src={it.src}
                  alt={it.caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-4 right-4 bottom-4 text-jasmine text-sm font-serif-display italic opacity-0 group-hover:opacity-100 transition-opacity">
                  {it.caption}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {active ? (
        <div
          data-testid="gallery-lightbox"
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            data-testid="gallery-lightbox-close"
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 text-jasmine hover:text-marigold p-2"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <figure
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.caption}
              className="max-h-[75vh] w-auto object-contain rounded-sm shadow-2xl"
            />
            <figcaption className="mt-4 text-jasmine/80 font-serif-display italic text-center max-w-2xl">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}

import React, { useState } from "react";
import { X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Medallion } from "@/components/Ornaments";
import { IMG } from "@/lib/data";

const ITEMS = [
  { src: IMG.anjaneyaBeforeAfter, caption: "The Anjaneya idol — before & after the 2022 renovation", span: "md:col-span-2" },
  { src: IMG.hayagreevaBare, caption: "Sri Vidya Hayagreeva — Krishna shila, before alankara", span: "md:row-span-2" },
  { src: IMG.hayagreevaAdornedFrontal, caption: "Adorned with jasmine and roses, prepared for puja", span: "" },
  { src: IMG.hayagreevaAdornedAngled, caption: "Three-quarter view, garlanded and draped", span: "" },
  { src: IMG.templeOldExterior, caption: "The old village shrine — exterior wall", span: "" },
  { src: IMG.templeOldPorch, caption: "The old porch with painted columns", span: "" },
  { src: IMG.templeOldFacade, caption: "The old façade, stone lamp-post in the foreground", span: "md:col-span-2" },
];

export default function Gallery() {
  const [active, setActive] = useState(null);
  return (
    <div data-testid="page-gallery">
      <section className="relative bg-canvas-deep py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
          <div className="spin-slow"><Medallion className="w-[600px] h-[600px]" color="hsl(20 51% 55%)" /></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-eyebrow text-copper">Gallery</div>
          <div className="font-kannada text-copper text-base mt-4">ಚಿತ್ರ ಮಾಲಿಕೆ</div>
          <h1 className="text-display-hero text-cream mt-5">
            Quiet glimpses <em className="italic text-copper">of the shrine.</em>
          </h1>
          <p className="mt-7 font-display italic text-cream/90 text-lg max-w-2xl mx-auto leading-relaxed">
            “The new sanctum, the old porch, and the deity — before and after.”
          </p>
        </div>
      </section>

      <section className="bg-canvas-deep pb-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:auto-rows-[240px]">
          {ITEMS.map((it, i) => (
            <Reveal key={i} delay={i * 70} className={`group ${it.span}`}>
              <button
                type="button"
                onClick={() => setActive(it)}
                data-testid={`gallery-item-${i}`}
                className="relative w-full h-full min-h-[240px] overflow-hidden bg-canvas-deep-surface block border border-warm hover:border-copper transition-colors duration-500"
                aria-label={`Open image: ${it.caption}`}
              >
                <img src={it.src} alt={it.caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-4 right-4 bottom-4 text-cream text-sm font-display italic opacity-0 group-hover:opacity-100 transition-opacity">
                  {it.caption}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {active ? (
        <div data-testid="gallery-lightbox" className="fixed inset-0 z-50 bg-canvas-deep/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10" onClick={() => setActive(null)}>
          <button type="button" data-testid="gallery-lightbox-close" onClick={() => setActive(null)} className="absolute top-5 right-5 text-cream hover:text-copper p-2" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
          <figure className="max-w-5xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.caption} className="max-h-[75vh] w-auto object-contain border border-warm" />
            <figcaption className="mt-4 text-cream/90 font-display italic text-center max-w-2xl">{active.caption}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}

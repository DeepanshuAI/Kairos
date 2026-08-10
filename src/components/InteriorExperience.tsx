import React, { useEffect, useRef } from 'react';
import { initInteriorCinematicExpansion } from '../animations/materialScroll';

export const InteriorExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = initInteriorCinematicExpansion(
      containerRef.current,
      maskRef.current,
      headlineRef.current,
      textRef.current
    );

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section 
      id="interiors"
      ref={containerRef}
      className="relative w-full bg-charcoal text-ivory border-b border-stone/10 overflow-hidden"
    >
      {/* 1. Interior Transition Statement */}
      <div className="w-full py-32 md:py-48 text-center border-b border-stone/10 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="flex flex-col items-center">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              04
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
              INTERIOR ATMOSPHERE
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light italic text-ivory/95 tracking-wide leading-tight">
            “Then, the world turns inward.”
          </h2>
          <p className="max-w-md mx-auto text-xs uppercase tracking-[0.25em] text-stone/60 font-medium pt-2">
            The Private Living Pavilions • KAIROS Rewari
          </p>
        </div>
      </div>

      {/* 2. Cinematic Interior Image Expansion Stage */}
      <div className="py-24 md:py-36 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone/50 font-medium">
            MAIN LIVING PAVILION
          </span>
          <h3 
            ref={headlineRef}
            className="font-serif text-4xl sm:text-6xl font-light leading-tight text-ivory"
          >
            Where Spatial Volume Meets Absolute Quietude.
          </h3>
        </div>

        {/* Scroll-Driven Expanding Interior Canvas */}
        <div className="relative w-full aspect-[21/9] min-h-[420px] md:min-h-[600px] overflow-hidden border border-stone/15">
          <div 
            ref={maskRef}
            className="w-full h-full bg-cover bg-center transition-all duration-300"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2560&auto=format&fit=crop')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/30" />
            
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-lg space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                PENTHOUSE ESTATE PAVILION
              </span>
              <p className="font-serif text-xl md:text-2xl font-light text-ivory leading-snug">
                Designed around light, shadow, and uninterrupted private horizons.
              </p>
            </div>
          </div>
        </div>

        {/* Supporting Copy Reveal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-4">
          <p 
            ref={textRef}
            className="text-xs md:text-sm font-light text-stone/80 max-w-xl leading-relaxed"
          >
            Acoustically isolated floorplates measuring 8,500 sq ft frame unobstructed views of the Haryana horizon, providing an atmosphere of uninterrupted solitude.
          </p>
          <div className="text-[10px] uppercase tracking-[0.25em] text-bronze font-semibold">
            Ceiling Clearance • 14 FT Motorized Glass
          </div>
        </div>
      </div>
    </section>
  );
};

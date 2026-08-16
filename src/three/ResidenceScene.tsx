import React, { useRef } from 'react';

export const ResidenceScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="3d-residence"
      ref={containerRef}
      className="relative w-full text-ivory min-h-screen border-b border-stone/10 bg-transparent pointer-events-none"
    >
      {/* Sticky 3D Stage Container */}
      <div className="relative w-full h-screen flex flex-col justify-between overflow-hidden">
        
        {/* Layer 1: Top Section Identifier */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium pointer-events-auto">
          <span>04 — SIGNATURE 3D EXPERIENCE</span>
          <span className="text-ivory font-semibold truncate max-w-[180px] sm:max-w-none">
            STAGE 02 — FAÇADE & STRUCTURE
          </span>
        </div>

        {/* Layer 2: Sparse Editorial Typography Overlay */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-8 flex-grow flex items-end pointer-events-auto">
          <div className="space-y-3 sm:space-y-4 max-w-xl bg-charcoal/85 backdrop-blur-md p-6 sm:p-8 border border-stone/20 shadow-2xl">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
              ARCHITECTURAL FORM
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-ivory tracking-wide leading-tight">
              SCULPTED IN CONCRETE & LIGHT
            </h2>
            <p className="text-[11px] sm:text-xs font-light text-stone/80 leading-relaxed">
              Designed around the natural diurnal cycle. Monolithic cantilevered concrete, custom brushed bronze louvers, and expansive thermal glass.
            </p>
          </div>
        </div>

        {/* Layer 3: Editorial Material Annotations */}
        <div className="hidden lg:flex absolute right-16 top-1/3 z-10 flex-col space-y-4 text-[10px] uppercase tracking-[0.25em] text-stone/80 bg-charcoal/70 backdrop-blur-md p-6 border border-stone/15 pointer-events-auto">
          <div className="text-[9px] uppercase tracking-[0.3em] text-bronze font-semibold mb-1">
            MATERIAL SYSTEM
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
            <span className="text-ivory font-medium">TRAVERTINE STONE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-stone" />
            <span>BRONZE LOUVERS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-ivory" />
            <span>LOW-E ARCHITECTURAL GLASS</span>
          </div>
        </div>

        {/* Layer 4: Bottom Bar Progress Indicator */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-6 sm:pb-8 flex items-center justify-between border-t border-stone/15 pt-3 sm:pt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-stone pointer-events-auto">
          <div className="flex gap-4 sm:gap-8">
            <span className="text-ivory font-medium">3D Camera Journey</span>
            <span className="hidden sm:inline text-stone/50">Real-Time WebGL Architecture</span>
          </div>
          <div className="text-bronze font-medium">
            <span>SCROLL TO ADVANCE JOURNEY</span>
          </div>
        </div>

      </div>
    </section>
  );
};


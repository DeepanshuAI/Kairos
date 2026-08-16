import React, { useEffect, useRef } from 'react';
import { initArchitectureScrollStory } from '../animations/architectureScroll';

export const ArchitectureStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = initArchitectureScrollStory({
      container: containerRef.current,
      chapter1Text: ch1Ref.current,
      chapter2Text: ch2Ref.current,
      chapter3Text: ch3Ref.current,
    });

    return () => {
      mm?.revert();
    };
  }, []);



  return (
    <section 
      id="architecture"
      ref={containerRef}
      className="relative w-full bg-transparent text-ivory h-[250vh]"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden">
        
        {/* Layer 1: Top Section Identifier Header */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              02
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
              ARCHITECTURE
            </span>
          </div>
          <span className="hidden sm:inline text-[9px] uppercase tracking-[0.35em] text-stone/40">SCROLL TO UNVEIL FORMS</span>
        </div>

        {/* Layer 2: Main Narrative Text Stage */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 py-8 flex-grow flex items-center">
          <div className="relative w-full max-w-3xl min-h-[260px]">

            {/* CHAPTER 1 TEXT */}
            <div ref={ch1Ref} className="absolute inset-0 space-y-4 sm:space-y-6">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone font-medium block">
                MONOLITHIC FORM
              </span>
              <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-ivory">
                Sculpted from Silence.
              </h2>
              <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed max-w-xl">
                Off-form architectural concrete and full-height bronze louvers frame unobstructed horizon views across the Rewari green belt.
              </p>
            </div>

            {/* CHAPTER 2 TEXT */}
            <div ref={ch2Ref} className="absolute inset-0 space-y-4 sm:space-y-6 opacity-0">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone font-medium block">
                MATERIAL CRAFT
              </span>
              <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-ivory">
                Tactile Concrete.
              </h2>
              <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed max-w-xl">
                Every surface communicates permanence. Hand-honed travertine marble, patinated architectural bronze elements, and acoustically isolated low-E glass.
              </p>
            </div>

            {/* CHAPTER 3 TEXT */}
            <div ref={ch3Ref} className="absolute inset-0 space-y-4 sm:space-y-6 opacity-0">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone font-medium block">
                SPATIAL ELEVATION
              </span>
              <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-ivory">
                360° Uninterrupted Horizon.
              </h2>
              <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed max-w-xl">
                The floorplates project outwards into private loggias, providing complete privacy from ground level while opening endlessly to the sky.
              </p>
            </div>

          </div>
        </div>


        {/* Layer 4: Bottom Bar Progress Indicator */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-6 sm:pb-8 flex items-center justify-between border-t border-stone/15 pt-3 sm:pt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-stone">
          <div className="flex gap-4 sm:gap-8">
            <span className="text-ivory font-medium">Structure • Concrete & Steel</span>
            <span className="hidden sm:inline text-stone/50">Floorplate • 8,500 SQ FT</span>
          </div>
          <div className="text-bronze">
            <span>EXPLORING ARCHITECTURE</span>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import { animateHeroScroll } from '../animations/hero';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);
  const beat3Ref = useRef<HTMLDivElement>(null);
  const beat4Ref = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = animateHeroScroll({
      container: containerRef.current,
      beat1: beat1Ref.current,
      beat2: beat2Ref.current,
      beat3: beat3Ref.current,
      beat4: beat4Ref.current,
      scrollIndicator: scrollIndRef.current,
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full h-[140vh] bg-transparent text-ivory group"
    >
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 w-full h-screen min-h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Top Spacer for Navigation */}
        <div className="relative z-10 h-16 md:h-20" />

        {/* Main Hero Content Composition */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center flex-grow">
          
          <div className="relative w-full max-w-4xl min-h-[300px]">
            {/* Beat 1: Opening / Arrival (0–25%) */}
            <div ref={beat1Ref} className="absolute inset-0 flex flex-col justify-center space-y-6">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-medium text-bronze">
                Private Sanctuary • Rewari, Haryana
              </p>
              <div className="space-y-0 md:space-y-1">
                <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.92] text-ivory">
                  LIVE ABOVE.
                </h1>
                <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.92] text-ivory/90 italic pl-1 md:pl-4">
                  ORDINARY.
                </h1>
              </div>
            </div>

            {/* Beat 2: Architecture & Materials (25–50%) */}
            <div ref={beat2Ref} className="absolute inset-0 flex flex-col justify-center space-y-4 opacity-0 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                01 • ARCHITECTURE & DETAIL
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] text-ivory">
                Natural stone,<br/>
                <span className="italic text-ivory/90">warm bronze,</span><br/>
                and uninterrupted light.
              </h2>
            </div>

            {/* Beat 3: Light & Residences (50–75%) */}
            <div ref={beat3Ref} className="absolute inset-0 flex flex-col justify-center space-y-4 opacity-0 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                02 • ATMOSPHERE & SCALE
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] text-ivory">
                Designed around the<br/>
                <span className="italic text-ivory/90">movement of light.</span>
              </h2>
              <p className="text-sm md:text-base font-light text-stone/80 max-w-md pt-2">
                Twelve residences. One private address.
              </p>
            </div>

            {/* Beat 4: Final Reveal (75–100%) */}
            <div ref={beat4Ref} className="absolute inset-0 flex flex-col justify-center space-y-8 opacity-0 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                03 • PRIVATE ENCLAVE
              </span>
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[0.92] text-ivory">
                KAIROS.
              </h2>
              <div className="pt-2">
                <a
                  href="#residences"
                  data-cursor="ENTER"
                  className="group/cta inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] font-medium text-ivory transition-all duration-300 pointer-events-auto"
                >
                  <span>Explore Residences</span>
                  <span className="relative w-8 h-px bg-stone/40 group-hover/cta:w-12 group-hover/cta:bg-ivory transition-all duration-500" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Scroll Indicator */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-10 flex justify-start">
          <div ref={scrollIndRef} className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-stone/50 font-medium">Scroll</span>
            <div className="w-px h-12 bg-stone/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-ivory transform -translate-y-full animate-[scroll_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


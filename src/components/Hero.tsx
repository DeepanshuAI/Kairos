import React, { useEffect, useRef } from 'react';
import { animateHeroScroll } from '../animations/hero';
import { useBooking } from '../context/BookingContext';
import { Calendar } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openBooking, navigateToSection } = useBooking();
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
      className="relative w-full h-[200vh] bg-transparent text-ivory group"
    >
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 w-full h-screen min-h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Top Spacer for Navigation */}
        <div className="relative z-10 h-16 md:h-20" />

        {/* Main Hero Content Composition */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center flex-grow">
          
          <div className="relative w-full max-w-4xl min-h-[320px]">
            
            {/* Beat 1: Opening / Arrival (0–25%) */}
            <div ref={beat1Ref} className="absolute inset-0 flex flex-col justify-center space-y-6">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-medium text-bronze">
                Private Luxury Destination • Rewari, Haryana
              </p>
              <div className="space-y-0 md:space-y-1">
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.94] text-ivory">
                  A PRIVATE RESORT
                </h1>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.94] text-ivory/90 italic pl-1 md:pl-3">
                  BUILT AROUND STILLNESS.
                </h1>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-light text-stone/80 max-w-xl leading-relaxed pt-2">
                An architectural retreat where nature, space and quiet luxury meet.
              </p>
            </div>

            {/* Beat 2: Architecture & Materials (25–50%) */}
            <div ref={beat2Ref} className="absolute inset-0 flex flex-col justify-center space-y-4 opacity-0 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                01 • ARCHITECTURAL SANCTUARY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light leading-[1.08] text-ivory">
                Monolithic stone,<br/>
                <span className="italic text-ivory/90">floating water terraces,</span><br/>
                and uninterrupted stillness.
              </h2>
              <p className="text-xs sm:text-sm font-light text-stone/80 max-w-md pt-2">
                The central pavilion stands as a quiet monument amidst forty-five acres of protected forest canopy.
              </p>
            </div>

            {/* Beat 3: Light & Atmosphere (50–75%) */}
            <div ref={beat3Ref} className="absolute inset-0 flex flex-col justify-center space-y-4 opacity-0 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                02 • ATMOSPHERE & HOSPITALITY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light leading-[1.08] text-ivory">
                Designed around the<br/>
                <span className="italic text-ivory/90">movement of light.</span>
              </h2>
              <p className="text-xs sm:text-sm font-light text-stone/80 max-w-md pt-2">
                Secluded luxury suites, private plunge pools, and tailored Ayurvedic wellness rituals.
              </p>
            </div>

            {/* Beat 4: Final Reveal & Primary Booking Actions (75–100%) */}
            <div ref={beat4Ref} className="absolute inset-0 flex flex-col justify-center space-y-8 opacity-0 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                03 • YOUR DESTINATION
              </span>
              <div className="space-y-1">
                <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[0.92] text-ivory">
                  KAIROS RESORT.
                </h2>
                <p className="text-xs sm:text-sm text-stone/80 font-light max-w-md">
                  Reserve your private suite or villa for an unhurried stay.
                </p>
              </div>
              
              <div className="pt-2 flex flex-wrap items-center gap-6 pointer-events-auto">
                <button
                  onClick={() => openBooking()}
                  data-cursor="BOOK"
                  className="group/cta inline-flex items-center gap-3 px-8 py-4 bg-bronze text-charcoal hover:bg-ivory text-xs uppercase tracking-[0.25em] font-bold shadow-xl transition-all duration-300"
                >
                  <Calendar size={14} />
                  <span>Book Your Stay</span>
                </button>

                <button
                  onClick={() => navigateToSection('stay', 'Suites & Residences')}
                  data-cursor="EXPLORE"
                  className="group/sec inline-flex items-center gap-4 text-xs uppercase tracking-[0.25em] font-medium text-ivory hover:text-bronze transition-all duration-300 py-3"
                >
                  <span>Explore Suites</span>
                  <span className="relative w-8 h-px bg-stone/40 group-hover/sec:w-12 group-hover/sec:bg-bronze transition-all duration-500" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Minimal Scroll Indicator */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-10 flex justify-between items-end">
          <div ref={scrollIndRef} className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-stone/50 font-medium">Scroll to Discover</span>
            <div className="w-px h-12 bg-stone/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-ivory transform -translate-y-full animate-[scroll_2s_ease-in-out_infinite]" />
            </div>
          </div>

          <div className="hidden sm:block text-right text-[9px] uppercase tracking-[0.25em] text-stone/40">
            SIGNATURE PAVILION • 360° ORBIT
          </div>
        </div>

      </div>
    </section>
  );
};

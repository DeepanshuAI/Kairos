import React, { useEffect, useRef } from 'react';
import { animateHeroEntrance } from '../animations/hero';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anims = animateHeroEntrance({
      container: containerRef.current,
      tagline: taglineRef.current,
      titleLines: [line1Ref.current, line2Ref.current],
      ctas: ctaRef.current,
      scrollIndicator: scrollIndRef.current,
    });

    return () => {
      anims?.entrance?.kill();
      anims?.scroll?.kill();
    };
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full h-[150vh] bg-transparent text-ivory group"
    >
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 w-full h-screen min-h-[720px] flex flex-col justify-between overflow-hidden">
        {/* Top Spacer for Navigation */}
        <div className="relative z-10 h-24 md:h-32" />

        {/* Main Hero Content Composition */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center flex-grow">
          <div className="max-w-4xl space-y-6">
            
            <p 
              ref={taglineRef}
              className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-medium text-bronze"
            >
              Private Sanctuary • Rewari, Haryana
            </p>

            {/* Monumental Editorial Headline */}
            <div className="space-y-0 md:space-y-1">
              <h1 
                ref={line1Ref}
                className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.92] text-ivory"
              >
                LIVE ABOVE
              </h1>
              <h1 
                ref={line2Ref}
                className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.92] text-ivory/90 italic pl-1 md:pl-4"
              >
                ORDINARY.
              </h1>
            </div>

            {/* Integrated Architectural CTAs */}
            <div 
              ref={ctaRef}
              className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-8"
            >
              <a
                href="#residences"
                data-cursor="ENTER"
                className="group/cta inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] font-medium text-ivory transition-all duration-300"
              >
                <span>Explore Residences</span>
                <span className="relative w-8 h-px bg-stone/40 group-hover/cta:w-12 group-hover/cta:bg-ivory transition-all duration-500" />
              </a>
            </div>

          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-12 flex justify-start">
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

import React, { useEffect, useRef } from 'react';
import { animateHeroEntrance } from '../animations/hero';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anims = animateHeroEntrance({
      container: containerRef.current,
      bgImage: bgRef.current,
      tagline: taglineRef.current,
      titleLines: [line1Ref.current, line2Ref.current],
      subtitle: subtitleRef.current,
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
      ref={containerRef}
      className="relative w-full h-screen min-h-[720px] flex flex-col justify-between overflow-hidden bg-charcoal text-ivory group"
    >
      {/* Background Architectural Canvas - Building as Protagonist */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out hover-scale"
        style={{
          // High-clarity architectural estate exterior with clear lighting and building dominance
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2560&auto=format&fit=crop')`,
        }}
      >
        {/* Subtle, highly controlled architectural vignette (lighting clarity, no mud/heavy darkness) */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/20 to-transparent" />
      </div>

      {/* Top Spacer for Navigation */}
      <div className="relative z-10 h-24 md:h-32" />

      {/* Main Hero Content Composition */}
      <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col justify-center flex-grow">
        <div className="max-w-4xl space-y-6 md:space-y-8">
          
          {/* Architectural Metadata */}
          <p 
            ref={taglineRef}
            className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-medium text-bronze flex items-center gap-3"
          >
            <span className="w-10 h-px bg-bronze/70"></span>
            <span>Private Sanctuary • Rewari, Haryana</span>
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

          {/* Concise, Memorable Supporting Copy */}
          <div 
            ref={subtitleRef}
            className="space-y-1 max-w-lg pt-1"
          >
            <p className="text-base md:text-lg font-serif text-ivory/90 tracking-wide">
              Twelve residences. One private address.
            </p>
            <p className="text-xs md:text-sm font-light text-stone/80 tracking-wide leading-relaxed">
              Designed around light, silence, and uninterrupted horizon views across Haryana.
            </p>
          </div>

          {/* Integrated Architectural CTAs */}
          <div 
            ref={ctaRef}
            className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            {/* Primary CTA - Architectural Line / Framing Button */}
            <a
              href="#contact"
              data-cursor="ENTER"
              className="group/cta relative inline-flex items-center gap-6 px-7 py-4 text-[11px] uppercase tracking-[0.25em] font-medium text-ivory border border-stone/20 hover:border-bronze hover:bg-bronze/10 transition-all duration-500"
            >
              <span>Book A Private Viewing</span>
              <span className="relative w-4 h-px bg-ivory/50 group-hover/cta:bg-bronze transition-colors">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-ivory/50 group-hover/cta:border-bronze rotate-45 transform translate-x-1 group-hover/cta:translate-x-2 transition-all duration-300" />
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#residences"
              data-cursor="VIEW"
              className="group/sec inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-medium text-stone hover:text-ivory transition-colors duration-300 py-2"
            >
              <span>Explore Residences</span>
              <span className="relative w-4 h-px bg-stone/30 group-hover/sec:w-8 group-hover/sec:bg-ivory/70 transition-all duration-500" />
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Hero Bar */}
      <div 
        ref={scrollIndRef}
        className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-8 md:pb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between border-t border-stone/15 pt-5 text-[10px] uppercase tracking-[0.25em] text-stone gap-6"
      >
        <div className="flex items-center gap-8">
          <div>
            <span className="block text-ivory/40">Location</span>
            <span className="text-ivory font-medium">Rewari • Haryana</span>
          </div>
          <div>
            <span className="block text-ivory/40">Scale</span>
            <span className="text-ivory font-medium">12 Private Estates</span>
          </div>
        </div>

        {/* Scroll Cue (Thin vertical animated line) */}
        <a 
          href="#statement"
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 group text-stone/60 hover:text-ivory transition-colors"
        >
          <span>Scroll to explore</span>
          <div className="relative w-px h-8 sm:w-12 sm:h-px bg-stone/20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-bronze transform sm:-translate-x-full translate-y-full sm:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
          </div>
        </a>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import { initSignatureLifestyleReveal } from '../animations/lifestyleScroll';

export const LifestyleExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = initSignatureLifestyleReveal({
      container: containerRef.current,
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section id="lifestyle" ref={containerRef} className="bg-[#121110] text-ivory overflow-hidden">
      
      {/* 1. EDITORIAL TRANSITION INTO LIFESTYLE */}
      <div className="lifestyle-header py-28 md:py-40 border-b border-stone/10 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="flex flex-col items-center">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              06
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
              THE ATMOSPHERE OF SPACE
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight">
            “Architecture as a lived experience.”
          </h2>
          <p className="font-serif text-xl sm:text-2xl font-light text-stone/80 italic max-w-2xl mx-auto">
            Volume becomes meaningful in the quiet moments that happen within it.
          </p>
        </div>
      </div>

      {/* 2. SIGNATURE LIFESTYLE HERO & REVEAL INTERACTION */}
      <div className="lifestyle-hero-section py-20 md:py-32 border-b border-stone/10 bg-[#151413]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-8">
          
          {/* Signature Image Mask Canvas */}
          <div 
            className="lifestyle-hero-mask relative w-full aspect-[16/9] min-h-[400px] sm:min-h-[550px] bg-charcoal overflow-hidden border border-stone/20"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop"
              alt="Morning light over private loggia breakfast"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
            
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-2xl space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">
                LIFESTYLE PROJECTION
              </span>
              <h3 
                className="lifestyle-hero-headline font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight"
              >
                Where Light & Moment Align.
              </h3>
              <p 
                className="lifestyle-hero-subtext text-xs sm:text-sm font-light text-stone/80 max-w-md leading-relaxed"
              >
                Framed by 14ft glass walls, the living pavilion dissolves the boundary between morning coffee and the expansive Haryana canopy.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. MORNING ("Begin slowly.") */}
      <div className="lifestyle-time-block py-24 md:py-36 border-b border-stone/10 bg-[#131211]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lifestyle-text-col lg:col-span-5 space-y-6">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">
              MORNING • 07:30 AM
            </span>
            <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              Begin slowly.
            </h3>
            <p className="font-serif text-xl sm:text-2xl font-light text-stone/90 leading-snug">
              “Soft natural light filters through acoustic louvers, awakening spatial volume without disturbance.”
            </p>
            <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed max-w-md">
              Unhurried mornings on the private loggia. Smoked European oak underfoot, warm breeze from the green canopy, and complete acoustic solitude.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="lifestyle-img-frame relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/20">
              <img
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop"
                alt="Quiet morning light in European oak bedroom"
                className="lifestyle-img w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) brightness(1.1) sepia(0.15) hue-rotate(-5deg)' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. LIVING ("Space where life unfolds.") */}
      <div className="lifestyle-time-block py-24 md:py-36 border-b border-stone/10 bg-[#100F0E]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="lifestyle-img-frame relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/20">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
                alt="Active living & dining space with natural light"
                className="lifestyle-img w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lifestyle-text-col lg:col-span-5 order-1 lg:order-2 space-y-6">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">
              LIVING • 01:00 PM
            </span>
            <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              Space where life unfolds.
            </h3>
            <p className="font-serif text-xl sm:text-2xl font-light text-stone/90 leading-snug">
              “Vast double-height volumes designed for unhurried living and spontaneous gatherings.”
            </p>
            <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed max-w-md">
              Custom Boffi kitchen islands, travertine dining surfaces, and seamless transitions into private outdoor gardens provide room for every rhythm.
            </p>
          </div>
        </div>
      </div>

      {/* 5. CONNECTION ("Space for the people who matter.") */}
      <div className="lifestyle-time-block py-24 md:py-36 border-b border-stone/10 bg-[#121110]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lifestyle-text-col lg:col-span-5 space-y-6">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">
              CONNECTION • 05:30 PM
            </span>
            <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              Space for the people who matter.
            </h3>
            <p className="font-serif text-xl sm:text-2xl font-light text-stone/90 leading-snug">
              “Expansive floorplates designed for shared meals, long conversations, and quiet togetherness.”
            </p>
            <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed max-w-md">
              Whether hosting a private dinner for twelve or enjoying quiet evening tea on the loggia, KAIROS balances grand entertaining with absolute residential privacy.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="lifestyle-img-frame relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/20">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop"
                alt="Family and friends gathering on private terrace"
                className="lifestyle-img w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. STILLNESS ("Some spaces ask nothing of you.") — Meditative Calm */}
      <div className="lifestyle-stillness-block py-32 md:py-48 bg-[#0D0C0C] border-b border-stone/10 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <span className="lifestyle-stillness-tag text-[10px] md:text-xs uppercase tracking-[0.4em] text-bronze font-medium block">
            STILLNESS • 07:00 PM
          </span>
          <h2 className="lifestyle-stillness-title font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-ivory leading-tight max-w-3xl mx-auto">
            “Some spaces ask nothing of you.”
          </h2>
          
          <div className="lifestyle-stillness-img-frame relative max-w-3xl mx-auto aspect-[21/9] min-h-[300px] sm:min-h-[400px] bg-charcoal overflow-hidden border border-stone/15">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop"
              alt="Quiet reflecting pool courtyard stillness"
              className="lifestyle-stillness-img w-full h-full object-cover opacity-85"
              style={{ filter: 'contrast(1.15) brightness(0.65) sepia(0.2) hue-rotate(-15deg)' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0C] via-transparent to-[#0D0C0C]/50" />
          </div>

          <p className="text-xs md:text-sm font-light text-stone/60 max-w-md mx-auto tracking-wider uppercase">
            Absence of noise • Absolute spatial quietude
          </p>
        </div>
      </div>

      {/* 7. EVENING ("Stay a little longer.") — Emotional Peak */}
      <div className="lifestyle-evening-block py-28 md:py-44 bg-[#141210] border-b border-stone/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          <div className="lifestyle-evening-text max-w-3xl space-y-4">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">
              EVENING • 09:00 PM • EMOTIONAL PEAK
            </span>
            <h3 className="font-serif text-5xl sm:text-7xl font-light leading-tight text-ivory">
              Stay a little longer.
            </h3>
            <p className="font-serif text-2xl sm:text-3xl font-light text-stone/90 leading-snug">
              “As twilight settles across the Haryana green corridor, interior warm glow lighting turns space into sanctuary.”
            </p>
          </div>

          {/* Immersive Twilight Photography */}
          <div className="lifestyle-evening-img-frame relative w-full aspect-[21/9] min-h-[420px] bg-charcoal overflow-hidden border border-stone/20">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2560&auto=format&fit=crop"
              alt="Warm evening ambient lighting over Rewari skyline"
              className="lifestyle-evening-img w-full h-full object-cover"
              style={{ filter: 'contrast(1.2) brightness(0.6) sepia(0.35) hue-rotate(-20deg)' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 text-xs text-stone/80 uppercase tracking-[0.25em]">
              Twilight Sanctuary • Rewari Estate Grounds
            </div>
          </div>
        </div>
      </div>

      {/* 8. EMOTIONAL BRIDGE TO LOCATION */}
      <div className="lifestyle-bridge-block py-20 md:py-28 bg-charcoal text-center border-b border-stone/10">
        <div className="max-w-2xl mx-auto px-6 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
            TRANSITION
          </span>
          <p className="font-serif text-2xl sm:text-4xl font-light text-stone/80">
            From how life feels — <span className="text-ivory italic">to where life is.</span>
          </p>
        </div>
      </div>

    </section>
  );
};

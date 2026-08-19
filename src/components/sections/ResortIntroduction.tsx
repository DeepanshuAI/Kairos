import React, { useEffect, useRef } from 'react';
import { gsap } from '../../animations/utils';
import { Sparkles, Compass, Trees, HeartHandshake } from 'lucide-react';

export const ResortIntroduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'center center',
        scrub: 1.2,
      },
    });

    tl.fromTo(
      tagRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=1'
    )
    .fromTo(
      subTextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="resort"
      ref={sectionRef}
      className="relative w-full py-28 md:py-44 bg-transparent text-ivory border-b border-stone/15 overflow-hidden flex flex-col justify-center"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center space-y-12">
        <p 
          ref={tagRef}
          className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-medium text-bronze"
        >
          MORE THAN A STAY • THE PHILOSOPHY
        </p>

        <h2 
          ref={textRef}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.16] text-ivory max-w-5xl mx-auto"
        >
          Designed as a place to slow down, Kairos brings together private spaces, natural surroundings, and quiet hospitality.<br />
          <span className="italic text-stone/80 font-normal mt-4 block text-2xl sm:text-4xl md:text-5xl">
            Where architecture becomes a quiet container for rest.
          </span>
        </h2>

        <div 
          ref={lineRef}
          className="w-16 h-px bg-bronze/60 mx-auto origin-center" 
        />

        {/* 4 Pillars of Kairos Resort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 max-w-5xl mx-auto text-left">
          <div className="p-6 border border-stone/15 bg-charcoal/30 space-y-3">
            <Trees className="text-bronze" size={20} />
            <h4 className="font-serif text-xl font-light text-ivory">45-Acre Canopy</h4>
            <p className="text-xs text-stone/70 font-light leading-relaxed">
              Protected indigenous flora, walking paths, and peaceful reflecting waterways.
            </p>
          </div>

          <div className="p-6 border border-stone/15 bg-charcoal/30 space-y-3">
            <Compass className="text-bronze" size={20} />
            <h4 className="font-serif text-xl font-light text-ivory">Quiet Seclusion</h4>
            <p className="text-xs text-stone/70 font-light leading-relaxed">
              Just twelve private villas and suites ensure absolute unhurried tranquility.
            </p>
          </div>

          <div className="p-6 border border-stone/15 bg-charcoal/30 space-y-3">
            <Sparkles className="text-bronze" size={20} />
            <h4 className="font-serif text-xl font-light text-ivory">Holistic Wellness</h4>
            <p className="text-xs text-stone/70 font-light leading-relaxed">
              Ayurvedic longevity treatments, sound resonance therapy, and thermal mineral baths.
            </p>
          </div>

          <div className="p-6 border border-stone/15 bg-charcoal/30 space-y-3">
            <HeartHandshake className="text-bronze" size={20} />
            <h4 className="font-serif text-xl font-light text-ivory">Tailored Concierge</h4>
            <p className="text-xs text-stone/70 font-light leading-relaxed">
              Dedicated private hosts and bespoke dining orchestrations throughout your stay.
            </p>
          </div>
        </div>

        <p 
          ref={subTextRef}
          className="max-w-md mx-auto text-xs uppercase tracking-[0.25em] text-stone/60 font-medium pt-4"
        >
          Rewari • Haryana • India
        </p>
      </div>
    </section>
  );
};

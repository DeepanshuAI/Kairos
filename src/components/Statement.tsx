import React, { useEffect, useRef } from 'react';
import { gsap } from '../animations/utils';

export const Statement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section 
      id="statement"
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 lg:py-56 bg-ivory text-charcoal border-b border-stone/20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center space-y-8">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-medium text-bronze">
          THE PHILOSOPHY
        </p>

        <h2 
          ref={textRef}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.18] text-charcoal max-w-5xl mx-auto"
        >
          Natural stone, warm bronze, and uninterrupted light.<br />
          <span className="italic text-charcoal/70 font-normal">Architecture reduced to its purest form.</span>
        </h2>

        <div className="w-12 h-px bg-bronze/40 mx-auto pt-2" />

        <p className="max-w-md mx-auto text-xs uppercase tracking-[0.25em] text-stone/60 font-medium">
          Rewari • Haryana
        </p>
      </div>
    </section>
  );
};

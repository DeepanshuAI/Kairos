import React, { useEffect, useRef } from 'react';
import { gsap } from '../animations/utils';

export const Statement: React.FC = () => {
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
        start: 'top 75%',
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
      id="statement"
      ref={sectionRef}
      className="relative w-full min-h-[70vh] flex flex-col justify-center py-32 md:py-48 lg:py-56 bg-ivory text-charcoal border-b border-stone/20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center space-y-12">
        <p 
          ref={tagRef}
          className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-medium text-bronze"
        >
          THE PHILOSOPHY
        </p>

        <h2 
          ref={textRef}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.18] text-charcoal max-w-5xl mx-auto"
        >
          Natural stone, warm bronze, and uninterrupted light.<br />
          <span className="italic text-charcoal/70 font-normal mt-4 block">Architecture reduced to its purest form.</span>
        </h2>

        <div 
          ref={lineRef}
          className="w-12 h-px bg-bronze/40 mx-auto origin-center" 
        />

        <p 
          ref={subTextRef}
          className="max-w-md mx-auto text-xs uppercase tracking-[0.25em] text-stone/60 font-medium"
        >
          Rewari • Haryana
        </p>
      </div>
    </section>
  );
};

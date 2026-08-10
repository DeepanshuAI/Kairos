import React, { useEffect, useRef } from 'react';
import { initMaterialTransformationTimeline } from '../animations/materialScroll';

interface TransformationPhase {
  id: string;
  label: string;
  title: string;
  statement: string;
  image: string;
}

const PHASES: TransformationPhase[] = [
  {
    id: 'form',
    label: 'I • FORM',
    title: 'Architectural Volume',
    statement: 'Monolithic raw concrete structures framing vast open living spaces.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop',
  },
  {
    id: 'material',
    label: 'II • MATERIAL',
    title: 'Tactile Permanence',
    statement: 'Hand-honed travertine marble slab surfaces and smoked European oak joinery.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2560&auto=format&fit=crop',
  },
  {
    id: 'light',
    label: 'III • LIGHT',
    title: 'Temporal Rays',
    statement: 'Circadian daylight shadows moving across raw stone walls from dawn to dusk.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2560&auto=format&fit=crop',
  },
  {
    id: 'atmosphere',
    label: 'IV • ATMOSPHERE',
    title: 'Absolute Quietude',
    statement: 'Where spatial elevation becomes a daily, unhurried residential experience.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2560&auto=format&fit=crop',
  },
];

export const MaterialTransformation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const phaseLabelRef = useRef<HTMLDivElement>(null);

  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = initMaterialTransformationTimeline({
      container: containerRef.current,
      stickyWrapper: stickyWrapperRef.current,
      bgImages: imgRefs.current,
      phaseTexts: textRefs.current,
      phaseLabel: phaseLabelRef.current,
    });

    return () => {
      mm?.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-charcoal text-ivory min-h-screen border-b border-stone/10"
    >
      {/* Pinned Stage Container */}
      <div 
        ref={stickyWrapperRef}
        className="relative w-full h-screen flex flex-col justify-between overflow-hidden"
      >
        {/* Layer 0: Background Image Stack */}
        <div className="absolute inset-0 z-0">
          {PHASES.map((phase, idx) => (
            <div
              key={phase.id}
              ref={(el) => {
                imgRefs.current[idx] = el;
              }}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
                idx === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${phase.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-transparent to-charcoal/40" />
            </div>
          ))}
        </div>

        {/* Layer 1: Top Phase Indicator */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">
          <span>SPATIAL TRANSFORMATION</span>
          <span ref={phaseLabelRef} className="text-ivory font-semibold truncate max-w-[160px] sm:max-w-none">
            I • FORM
          </span>
        </div>

        {/* Layer 2: Center Stage Typography */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 py-8 flex-grow flex items-center">
          <div className="relative w-full max-w-3xl min-h-[220px] sm:min-h-[260px]">
            {PHASES.map((phase, idx) => (
              <div
                key={phase.id}
                ref={(el) => {
                  textRefs.current[idx] = el;
                }}
                className={`absolute inset-0 flex flex-col justify-center space-y-4 sm:space-y-6 ${
                  idx === 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone font-medium block">
                  {phase.label}
                </span>
                <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-ivory">
                  {phase.title}
                </h2>
                <p className="font-serif text-lg sm:text-2xl font-light text-stone/90 max-w-xl leading-snug">
                  “{phase.statement}”
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 3: Bottom Progress Bar */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-6 sm:pb-8 flex items-center justify-between border-t border-stone/15 pt-3 sm:pt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-stone">
          <div className="flex gap-2 sm:gap-6">
            <span>FORM</span>
            <span>→</span>
            <span>MATERIAL</span>
            <span>→</span>
            <span>LIGHT</span>
            <span>→</span>
            <span className="text-ivory">ATMOSPHERE</span>
          </div>
          <div className="text-bronze font-medium">
            <span>SCROLL TO PROGRESS</span>
          </div>
        </div>

      </div>
    </section>
  );
};

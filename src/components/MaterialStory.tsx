import React from 'react';

export const MaterialStory: React.FC = () => {
  return (
    <section id="details" className="bg-[#141312] text-ivory border-b border-stone/10 overflow-hidden">
      
      {/* 0. TRANSITION LABEL */}
      <div className="pt-24 md:pt-36 max-w-4xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
            05
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
            MATERIAL CRAFT
          </span>
        </div>
      </div>
      {/* 1. STONE */}
      <div className="py-24 md:py-36 border-b border-stone/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              STONE
            </h3>
            <p className="font-serif text-xl sm:text-2xl font-light text-stone/90 leading-snug">
              “Natural stone selected for its quiet variation and permanence.”
            </p>
            <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed max-w-md">
              Hand-honed travertine marble slabs line the master bath and living wall surfaces. Unpolished vein structures absorb natural sunlight, radiating warmth long after dusk.
            </p>
            <div className="text-[10px] uppercase tracking-[0.25em] text-stone/50 font-medium pt-2">
              Provenance • Tivoli Quarries, Italy
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/20">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
                alt="Honed Travertine Marble Detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. WOOD */}
      <div className="py-24 md:py-36 bg-[#111110] border-b border-stone/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/20">
              <img
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop"
                alt="Smoked European Oak Wall Paneling"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              WOOD
            </h3>
            <p className="font-serif text-xl sm:text-2xl font-light text-stone/90 leading-snug">
              “Smoked European oak that softens acoustic reflections.”
            </p>
            <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed max-w-md">
              Acoustically fluted wall paneling and wide-plank floors treated with organic oils create an atmosphere of warmth against raw architectural concrete.
            </p>
            <div className="text-[10px] uppercase tracking-[0.25em] text-stone/50 font-medium pt-2">
              Finish • Black Forest Smoked Oak
            </div>
          </div>
        </div>
      </div>

      {/* 3. LIGHT */}
      <div className="py-24 md:py-36 border-b border-stone/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          <div className="max-w-2xl space-y-4">
            <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              LIGHT
            </h3>
            <p className="font-serif text-2xl sm:text-4xl font-light text-ivory leading-snug">
              “Designed around the movement of light.”
            </p>
          </div>

          <div className="relative w-full aspect-[21/9] min-h-[380px] bg-charcoal overflow-hidden border border-stone/20">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2560&auto=format&fit=crop"
              alt="Natural Light & Shadow Play"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-xs text-stone/80 uppercase tracking-[0.25em]">
              Circadian Illumination • Dawn to Dusk Shadows
            </div>
          </div>
        </div>
      </div>

      {/* 4. GLASS & CRAFT (Asymmetric Split) */}
      <div className="py-24 md:py-36 bg-[#0E0E0D]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* GLASS Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-4xl sm:text-5xl font-light">GLASS</h3>
            <div className="relative aspect-[4/3] bg-charcoal overflow-hidden border border-stone/20">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop"
                alt="Motorized Acoustic Glass Wall"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
            </div>
            <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed">
              Floor-to-ceiling motorized sliding glass panels dissolve the boundary between interior living spaces and private water courtyards.
            </p>
          </div>

          {/* CRAFT Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-4xl sm:text-5xl font-light">CRAFT</h3>
            <div className="relative aspect-[4/3] bg-charcoal overflow-hidden border border-stone/20">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop"
                alt="Cast Bronze Hardware Detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
            </div>
            <div className="space-y-2">
              <p className="font-serif text-2xl font-light text-ivory">“Nothing incidental.”</p>
              <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed">
                Every surface, joint and transition is considered. Cast bronze handles, hand-stitched leather trims, and micro-flush stone reveals.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

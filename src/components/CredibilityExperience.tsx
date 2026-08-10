import React from 'react';

export const CredibilityExperience: React.FC = () => {
  return (
    <section id="credibility" className="bg-[#121110] text-ivory border-b border-stone/10 overflow-hidden">
      
      {/* 1. CREDIBILITY INTRODUCTION */}
      <div className="py-24 md:py-36 border-b border-stone/10 bg-charcoal">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
                08
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
                ARCHITECTURAL SPECIFICATIONS
              </span>
            </div>
            <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              Quiet Integrity.
            </h3>
            <p className="font-serif text-xl sm:text-2xl font-light text-stone/90 leading-snug">
              “Integrity is established through architectural transparency and uncompromised material selection.”
            </p>
            <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed max-w-md">
              Every dimension and material specification represents the intended quality standards of the KAIROS development. (Demo Content)
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/20">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
                alt="Tactile architectural detail and material integrity"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. VERIFIED ESTATE METRICS */}
      <div className="py-24 md:py-36 border-b border-stone/10 bg-[#141312]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              ESTATE OVERVIEW
            </span>
            <h4 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
              Project Specifications
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4">
            <div className="p-8 border border-stone/15 bg-charcoal/40 space-y-3">
              <div className="font-serif text-4xl sm:text-6xl text-ivory font-light">12</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-bronze font-medium">Private Estates</div>
              <div className="text-xs text-stone/70 font-light">Single estate per floorplate</div>
            </div>

            <div className="p-8 border border-stone/15 bg-charcoal/40 space-y-3">
              <div className="font-serif text-4xl sm:text-6xl text-ivory font-light">4.5</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-bronze font-medium">Acres Sanctuary</div>
              <div className="text-xs text-stone/70 font-light">85% dedicated green canopy</div>
            </div>

            <div className="p-8 border border-stone/15 bg-charcoal/40 space-y-3">
              <div className="font-serif text-4xl sm:text-6xl text-ivory font-light">8.5k</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-bronze font-medium">SQ FT Floorplate</div>
              <div className="text-xs text-stone/70 font-light">360° panoramic horizon view</div>
            </div>

            <div className="p-8 border border-stone/15 bg-charcoal/40 space-y-3">
              <div className="font-serif text-4xl sm:text-6xl text-ivory font-light">2027</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-bronze font-medium">Delivery Target</div>
              <div className="text-xs text-stone/70 font-light">Phase I construction underway</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DESIGN & ENGINEERING COLLABORATORS */}
      <div className="py-24 md:py-36 border-b border-stone/10 bg-[#11100F]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              DESIGN PARTNERSHIPS
            </span>
            <h4 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
              Engineering & Architectural Team
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="p-8 border border-stone/15 bg-charcoal/60 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-bronze font-semibold">PRINCIPAL ARCHITECTURE</span>
              <h5 className="font-serif text-2xl text-ivory font-light">Studio KAIROS Architecture</h5>
              <p className="text-xs text-stone/70 font-light leading-relaxed">
                Specializing in low-density modernist residential sanctuaries across northern India.
              </p>
            </div>

            <div className="p-8 border border-stone/15 bg-charcoal/60 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-bronze font-semibold">LANDSCAPE ARCHITECTURE</span>
              <h5 className="font-serif text-2xl text-ivory font-light">Sanctuary Green Labs</h5>
              <p className="text-xs text-stone/70 font-light leading-relaxed">
                Masterplanning private agricultural buffers and circadian water courtyards.
              </p>
            </div>

            <div className="p-8 border border-stone/15 bg-charcoal/60 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-bronze font-semibold">GLAZING & ACOUSTICS</span>
              <h5 className="font-serif text-2xl text-ivory font-light">Low-E Acoustic Systems</h5>
              <p className="text-xs text-stone/70 font-light leading-relaxed">
                Triple-glazed motorized glass panels certified for 48dB exterior sound isolation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FINAL TRANSITION TO CONVERSION */}
      <div className="py-24 md:py-32 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-bronze font-medium block">
            THE FINAL CHAPTER
          </span>
          <p className="font-serif text-2xl sm:text-4xl font-light text-stone/80 leading-snug">
            “Architecture reduced to its purest form.”
          </p>
        </div>
      </div>

    </section>
  );
};

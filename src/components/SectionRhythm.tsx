import React from 'react';

export const ArchitectureRhythm: React.FC = () => (
  <section id="architecture" className="py-28 md:py-44 bg-charcoal text-ivory border-b border-stone/10">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-6 space-y-6">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">03 — ARCHITECTURE</span>
        <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">Monolithic Form & Modernist Light</h3>
        <p className="text-sm font-light text-stone/80 leading-relaxed max-w-xl">
          Sculpted from tactile raw concrete, brushed bronze, and ultra-clear low-iron glass, KAIROS harmonizes structural drama with residential quietude against the Haryana skyline.
        </p>
        <div className="pt-2 text-[11px] uppercase tracking-[0.25em] text-stone/50 font-medium">
          Architectural Footprint • 4.5 Acres
        </div>
      </div>
      <div className="lg:col-span-6">
        <div className="relative aspect-[16/10] bg-charcoal-light overflow-hidden border border-stone/15">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop" 
            alt="KAIROS Architectural Elevation" 
            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>
      </div>
    </div>
  </section>
);

export const ResidencesRhythm: React.FC = () => (
  <section id="residences" className="py-28 md:py-44 bg-[#111111] text-ivory border-b border-stone/10">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-6 order-2 lg:order-1">
        <div className="relative aspect-[16/10] bg-charcoal-light overflow-hidden border border-stone/15">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop" 
            alt="Private Residence Interior View" 
            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>
      </div>
      <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">04 — THE RESIDENCES</span>
        <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">Twelve Privately Scaled Estates</h3>
        <p className="text-sm font-light text-stone/80 leading-relaxed max-w-xl">
          Each residence occupies an entire floorplate, offering 360-degree panoramic sky views, private lift vestibules, and custom heated outdoor loggias.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.25em] text-stone/60 pt-2 font-medium">
          <div>Floorplate • 8,500 sq ft</div>
          <div>Terrace • 1,200 sq ft</div>
        </div>
      </div>
    </div>
  </section>
);

export const InteriorsRhythm: React.FC = () => (
  <section className="py-28 md:py-44 bg-charcoal text-ivory border-b border-stone/10">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div className="space-y-4 max-w-2xl">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">05 — INTERIORS</span>
        <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">Tactile Warmth & Quiet Craftsmanship</h3>
        <p className="text-sm font-light text-stone/80 leading-relaxed">
          Bespoke joinery, hand-honed travertine marble islands, and architectural lighting engineered to follow natural circadian rhythms.
        </p>
      </div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-stone/50 font-medium">
        Custom Interiors • Boffi & Poliform Collaboration
      </div>
    </div>
  </section>
);

export const DetailsRhythm: React.FC = () => (
  <section className="py-28 md:py-44 bg-[#161514] text-ivory border-b border-stone/10">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div className="space-y-4 max-w-2xl">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">06 — THE DETAILS</span>
        <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">Material Integrity</h3>
        <p className="text-sm font-light text-stone/80 leading-relaxed">
          Stone. Wood. Light. Glass. Craft. Uncompromising micro-details curated across every square millimeter of space.
        </p>
      </div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-stone/50 font-medium">
        Natural Materials • Honed Travertine & Cast Bronze
      </div>
    </div>
  </section>
);

export const LifestyleRhythm: React.FC = () => (
  <section id="lifestyle" className="py-28 md:py-44 bg-charcoal text-ivory border-b border-stone/10">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div className="space-y-4 max-w-2xl">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">07 — LIFESTYLE</span>
        <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">The Atmosphere of Being</h3>
        <p className="text-sm font-light text-stone/80 leading-relaxed">
          Private wellness sanctuary, subterranean thermal baths, wine vault, and 24/7 dedicated estate concierge services.
        </p>
      </div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-stone/50 font-medium">
        Private Wellness & Estate Management
      </div>
    </div>
  </section>
);

export const LocationRhythm: React.FC = () => (
  <section id="location" className="py-28 md:py-44 bg-[#121212] text-ivory border-b border-stone/10">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-8">
      <div className="max-w-2xl space-y-4">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">08 — LOCATION</span>
        <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">Rewari • Haryana</h3>
        <p className="text-sm font-light text-stone/80 leading-relaxed">
          Close to everything. Away from ordinary. Nestled along the quiet green corridors of Rewari with seamless access to Delhi NCR.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone/15 text-[11px] uppercase tracking-[0.2em] text-stone">
        <div>
          <div className="text-ivory font-medium">IGI Airport</div>
          <div className="text-stone/60">45 Minutes via Expressway</div>
        </div>
        <div>
          <div className="text-ivory font-medium">Gurugram Cyber City</div>
          <div className="text-stone/60">35 Minutes Drive</div>
        </div>
        <div>
          <div className="text-ivory font-medium">Private Estate Grounds</div>
          <div className="text-stone/60">Rewari Green Belt</div>
        </div>
      </div>
    </div>
  </section>
);

export const SocialProofRhythm: React.FC = () => (
  <section className="py-28 md:py-44 bg-charcoal text-ivory border-b border-stone/10">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-8">
      <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">09 — SPECIFICATIONS</span>
      <h3 className="font-serif text-4xl sm:text-6xl font-light leading-tight">Estate Overview</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4">
        <div>
          <div className="font-serif text-3xl md:text-5xl text-ivory">12</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-stone pt-2">Private Estates</div>
        </div>
        <div>
          <div className="font-serif text-3xl md:text-5xl text-ivory">1</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-stone pt-2">Estate per Floor</div>
        </div>
        <div>
          <div className="font-serif text-3xl md:text-5xl text-ivory">4.5</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-stone pt-2">Acres Sanctuary</div>
        </div>
        <div>
          <div className="font-serif text-3xl md:text-5xl text-ivory">2027</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-stone pt-2">Anticipated Completion</div>
        </div>
      </div>
    </div>
  </section>
);

export const FinalCTA: React.FC = () => (
  <section id="contact" className="py-36 md:py-56 bg-ivory text-charcoal relative overflow-hidden">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 text-center space-y-8">
      <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">10 — PRIVATE INQUIRY</span>
      <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.92] text-charcoal max-w-5xl mx-auto">
        YOUR NEXT CHAPTER <br />
        <span className="italic font-normal">STARTS HERE.</span>
      </h2>
      <p className="max-w-md mx-auto text-xs md:text-sm font-light text-charcoal/70 tracking-wide">
        Schedule a confidential private viewing with our principal estate director.
      </p>
      <div className="pt-4">
        <a
          href="mailto:concierge@kairos-residences.com"
          className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-ivory bg-charcoal px-10 py-5 hover:bg-bronze transition-colors duration-300 shadow-2xl"
        >
          Book A Private Viewing →
        </a>
      </div>
    </div>
  </section>
);

export const Footer: React.FC = () => (
  <footer className="py-16 bg-charcoal text-stone border-t border-stone/15 text-xs tracking-wider">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="font-serif text-lg text-ivory tracking-widest">KAIROS</div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-stone/60">
        © 2026 KAIROS PRIVATE RESIDENCES • REWARI, HARYANA. ALL RIGHTS RESERVED.
      </div>
      <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-stone/70">
        <a href="#" className="hover:text-ivory">Privacy Policy</a>
        <a href="#" className="hover:text-ivory">Legal Terms</a>
      </div>
    </div>
  </footer>
);

import React from 'react';
import { db } from '../../database/db';

export const AmenitiesSection: React.FC = () => {
  const amenities = db.getAmenities();

  return (
    <section className="relative z-10 w-full py-28 md:py-40 bg-[#131211] text-ivory border-b border-stone/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              06 • RESORT INFRASTRUCTURE
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
              CONSIDERED LIVING
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
            Designed for Quiet Wellness.
          </h2>
          <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed max-w-2xl">
            Every amenity at Kairos is calibrated to preserve peace and spatial integrity. We avoid crowded communal spaces in favor of private pavilions and nature corridors.
          </p>
        </div>

        {/* Editorial Composition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, idx) => (
            <div
              key={amenity.id}
              className={`p-8 border border-stone/15 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-stone/40 ${
                idx === 0 || idx === 3 ? 'bg-charcoal/60 lg:row-span-1' : 'bg-charcoal/30'
              }`}
            >
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.25em] text-bronze font-semibold block">
                  {amenity.category}
                </span>
                <h3 className="font-serif text-2xl font-light text-ivory leading-snug">
                  {amenity.title}
                </h3>
              </div>

              <p className="text-xs text-stone/70 font-light leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Full-Width Sanctuary Banner */}
        <div className="relative aspect-[21/8] min-h-[300px] bg-charcoal overflow-hidden border border-stone/20">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop"
            alt="Kairos resort water sanctuary"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent" />
          <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-center max-w-xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold">
              PRIVATE SANCTUARY ACCESS
            </span>
            <h4 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
              Total Seclusion by Design.
            </h4>
            <p className="text-xs sm:text-sm font-light text-stone/80 leading-relaxed">
              With only twelve keys across forty-five acres, guests enjoy near-exclusive use of all resort facilities at all hours.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Clock, Compass } from 'lucide-react';
import { db } from '../../database/db';
import type { DiningVenue } from '../../database/types';
import { useBooking } from '../../context/BookingContext';

export const DiningSection: React.FC = () => {
  const { openBooking } = useBooking();
  const venues = db.getDining();
  const [activeVenueIndex, setActiveVenueIndex] = useState<number>(0);

  const activeVenue: DiningVenue = venues[activeVenueIndex] || venues[0];

  return (
    <section 
      id="dining" 
      className="relative z-10 w-full py-28 md:py-40 bg-[#100F0E] text-ivory border-b border-stone/10"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-6 border-b border-stone/15">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
                05 • CULINARY ARTS
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
                ORGANIC & ARTISANAL
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              Dining at Kairos.
            </h2>
            <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed">
              Rooted in hyper-seasonal produce from our on-site botanical farm, our culinary offerings marry time-honored Indian traditions with contemporary gastronomy.
            </p>
          </div>

          {/* Dining Venue Switcher */}
          <div className="flex flex-wrap gap-2 sm:gap-4 overflow-x-auto pb-2 w-full lg:w-auto">
            {venues.map((venue, idx) => (
              <button
                key={venue.id}
                onClick={() => setActiveVenueIndex(idx)}
                className={`text-[10px] uppercase tracking-[0.2em] px-5 py-3 transition-all duration-300 border ${
                  activeVenueIndex === idx
                    ? 'border-bronze bg-bronze/10 text-ivory font-semibold shadow-md'
                    : 'border-stone/20 text-stone/50 hover:border-stone/40 hover:text-stone'
                }`}
              >
                {venue.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Venue Showcase */}
        {activeVenue && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Venue Story & Menu Highlights */}
            <div className="lg:col-span-5 space-y-8 bg-charcoal/50 backdrop-blur-md p-8 sm:p-10 border border-stone/15">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium">
                  {activeVenue.cuisine}
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
                  {activeVenue.name}
                </h3>
                <p className="text-xs sm:text-sm font-light text-stone/80 italic leading-relaxed pt-1">
                  “{activeVenue.tagline}”
                </p>
              </div>

              <p className="text-xs sm:text-sm font-light text-stone/70 leading-relaxed">
                {activeVenue.description}
              </p>

              <div className="space-y-3 py-4 border-y border-stone/15 text-xs text-stone/80">
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-bronze shrink-0" />
                  <span>{activeVenue.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Compass size={15} className="text-bronze shrink-0" />
                  <span>Ambiance: {activeVenue.ambiance}</span>
                </div>
              </div>

              {/* Featured Dishes List */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-bronze font-semibold block">
                  SIGNATURE DISHES & PREPARATIONS
                </span>
                <div className="space-y-3">
                  {activeVenue.featuredDishes.map((dish, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-medium text-ivory">{dish.name}</span>
                        {dish.price && <span className="font-serif text-bronze">{dish.price}</span>}
                      </div>
                      <p className="text-[11px] text-stone/60 font-light">{dish.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="w-full py-3.5 border border-bronze text-ivory hover:bg-bronze hover:text-charcoal text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300"
                >
                  Reserve A Table With Stay
                </button>
              </div>

            </div>

            {/* Right: Venue Imagery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/20">
                <img
                  src={activeVenue.image}
                  alt={activeVenue.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-ivory font-medium bg-black/60 px-4 py-2 border border-stone/20">
                  {activeVenue.name} • Atmosphere
                </div>
              </div>

              {activeVenue.secondaryImage && (
                <div className="relative aspect-[21/9] bg-charcoal overflow-hidden border border-stone/20">
                  <img
                    src={activeVenue.secondaryImage}
                    alt={`${activeVenue.name} setting`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { db } from '../../database/db';
import type { Experience } from '../../database/types';
import { useBooking } from '../../context/BookingContext';

export const ExperienceSection: React.FC = () => {
  const { openBooking } = useBooking();
  const experiences = db.getExperiences();
  const config = db.getConfig();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const categories = ['All', 'Wellness', 'Adventure', 'Culinary', 'Nature', 'Culture'];

  const filteredExperiences = activeCategory === 'All'
    ? experiences
    : experiences.filter((e) => e.category === activeCategory);

  const formatPrice = (amt: number) => {
    return `${config.currencySymbol}${amt.toLocaleString('en-IN')}`;
  };

  return (
    <section 
      id="experience" 
      className="relative z-10 w-full py-28 md:py-40 bg-[#141312] text-ivory border-b border-stone/10"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-6 border-b border-stone/15">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
                04 • CURATED RITUALS
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
                IMMERSIVE MOMENTS
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              The Experience.
            </h2>
            <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed">
              Curated experiences crafted to slow your internal clock. From silent morning water excursions to private architectural stargazing, every moment connects you to the natural stillness of the estate.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'border-bronze bg-bronze/10 text-ivory font-semibold'
                    : 'border-stone/20 text-stone/50 hover:border-stone/40 hover:text-stone'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              className="group bg-charcoal/50 border border-stone/15 flex flex-col justify-between overflow-hidden hover:border-stone/40 transition-all duration-500 cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] overflow-hidden bg-black">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.2em] bg-black/70 backdrop-blur-md px-2.5 py-1 border border-stone/20 text-bronze font-semibold">
                  {exp.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[9px] text-ivory/80 uppercase tracking-wider">
                  {exp.duration}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-light text-ivory group-hover:text-bronze transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone/70 font-light line-clamp-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-stone/50 block">Pricing</span>
                    <span className="font-serif text-lg text-ivory font-light">
                      {formatPrice(exp.price)}
                      <span className="text-[10px] font-sans text-stone/50 font-normal"> / {exp.priceUnit}</span>
                    </span>
                  </div>

                  <span className="text-xs uppercase tracking-[0.2em] text-bronze flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Detail Modal / Lightbox */}
        {selectedExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-[#151413] border border-stone/20 text-ivory p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone/15">
                <span className="text-[9px] uppercase tracking-[0.3em] text-bronze font-semibold">
                  {selectedExp.category} RITUAL
                </span>
                <button
                  onClick={() => setSelectedExp(null)}
                  className="p-1.5 text-stone hover:text-ivory border border-transparent hover:border-stone/30"
                >
                  ✕
                </button>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden border border-stone/20">
                <img src={selectedExp.image} alt={selectedExp.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-light text-ivory">{selectedExp.title}</h3>
                <p className="text-xs text-stone/50">{selectedExp.availability} • {selectedExp.duration}</p>
                <p className="text-sm font-light text-stone/80 leading-relaxed pt-2">
                  {selectedExp.description}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone/50 block">Experience Inclusions:</span>
                <ul className="space-y-1.5">
                  {selectedExp.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-stone/90">
                      <Check size={12} className="text-bronze" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-stone/15 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Investment</span>
                  <span className="font-serif text-2xl text-ivory">{formatPrice(selectedExp.price)}</span>
                  <span className="text-xs text-stone/50"> ({selectedExp.priceUnit})</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedExp(null);
                    openBooking();
                  }}
                  className="px-6 py-3 bg-bronze text-charcoal hover:bg-ivory text-xs uppercase tracking-[0.2em] font-bold transition-all"
                >
                  Inquire With Stay
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

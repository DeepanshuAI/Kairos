import React from 'react';
import { Star } from 'lucide-react';
import { db } from '../../database/db';

export const TestimonialsSection: React.FC = () => {
  const reviews = db.getReviews();

  return (
    <section className="relative z-10 w-full py-28 md:py-40 bg-[#121110] text-ivory border-b border-stone/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              09 • PERSPECTIVES
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
              AUTHENTIC WORDS
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
            Guest Stories.
          </h2>
          <p className="text-xs md:text-sm font-light text-stone/80 italic max-w-xl mx-auto">
            “The architecture alone is worth the journey. Everything feels deliberately quiet.”
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 sm:p-12 bg-charcoal/50 border border-stone/15 space-y-6 flex flex-col justify-between hover:border-stone/30 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1.5 text-bronze">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="font-serif text-xl sm:text-2xl font-light text-ivory/95 leading-relaxed">
                  “{rev.review}”
                </p>
              </div>

              <div className="pt-6 border-t border-stone/15 flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-ivory">{rev.guestName}</div>
                  <div className="text-[10px] text-stone/50">{rev.location}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-bronze">{rev.roomStayed}</div>
                  <div className="text-[10px] text-stone/40">{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

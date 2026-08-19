import React from 'react';
import { useBooking } from '../../context/BookingContext';

export const PageTransitionCurtain: React.FC = () => {
  const { isPageTransitioning, transitionTitle } = useBooking();

  if (!isPageTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#0e0d0c] flex flex-col items-center justify-center pointer-events-auto animate-fadeIn">
      {/* Top and Bottom Architectural Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-bronze/60 to-transparent animate-pulse" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-bronze/60 to-transparent" />

      {/* Center Transition Monogram & Title */}
      <div className="text-center space-y-4 px-6 max-w-lg">
        <span className="text-[9px] uppercase tracking-[0.45em] text-bronze font-semibold block animate-pulse">
          KAIROS RESORT
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory tracking-wide uppercase">
          {transitionTitle}
        </h2>

        {/* Minimal Animated Loading Line */}
        <div className="w-24 h-[1px] bg-stone/20 mx-auto relative overflow-hidden mt-4">
          <div className="absolute inset-0 bg-bronze animate-[slide_0.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

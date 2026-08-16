import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export const LoadingScreen: React.FC = () => {
  const { active, progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smooth counter animation
    const target = Math.round(progress);
    setDisplayProgress((prev) => {
      if (target > prev) return target;
      return prev;
    });

    if (!active && progress === 100) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#121110] text-ivory flex flex-col justify-between p-8 md:p-16 transition-opacity duration-1000 ease-out ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Top Brand Tag */}
      <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.35em] text-bronze font-medium">
        <span>KAIROS PRIVATE ESTATE</span>
        <span>REWARI • HARYANA</span>
      </div>

      {/* Center Cinematic Wordmark & Indicator */}
      <div className="max-w-md mx-auto text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.4em] text-stone/50 font-medium block">
          ARCHITECTURAL SANCTUARY
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide text-ivory">
          KAIROS
        </h1>
        <p className="font-serif italic text-stone/80 text-sm md:text-base font-light">
          “Live above the ordinary.”
        </p>

        {/* Minimalist Linear Progress Bar */}
        <div className="pt-6 space-y-3">
          <div className="w-48 mx-auto h-[1px] bg-stone/20 overflow-hidden relative">
            <div
              className="h-full bg-bronze transition-all duration-300 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-stone/60 font-mono">
            {displayProgress}% • INITIALIZING ENVIRONMENT
          </div>
        </div>
      </div>

      {/* Bottom Architectural Credits */}
      <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.25em] text-stone/40">
        <span>REAL-TIME 3D ARCHITECTURAL VISUALIZATION</span>
        <span>12 PRIVATE ESTATES</span>
      </div>
    </div>
  );
};

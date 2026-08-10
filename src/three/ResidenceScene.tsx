import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { ResidenceModel } from './ResidenceModel';
import { CameraController } from './CameraController';
import { useResidenceScroll, CAMERA_STAGES } from './useResidenceScroll';
import { prefersReducedMotion } from '../animations/utils';

export const ResidenceScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageTextRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLHeadingElement>(null);
  
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [shouldRender3D, setShouldRender3D] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    if (prefersReducedMotion() || !hasWebGL) {
      setShouldRender3D(false);
    }
  }, [hasWebGL]);

  const { currentPos, currentTarget } = useResidenceScroll(
    containerRef,
    stageTextRef,
    subtextRef
  );

  return (
    <section
      id="3d-residence"
      ref={containerRef}
      className="relative w-full bg-charcoal text-ivory min-h-screen border-b border-stone/10"
    >
      {/* Sticky 3D Stage Container */}
      <div className="relative w-full h-screen flex flex-col justify-between overflow-hidden">
        
        {/* Layer 0: 3D Canvas (Renders on Desktop & Mobile in exact narrative order) */}
        <div className="absolute inset-0 z-0 bg-charcoal">
          {shouldRender3D ? (
            <Canvas
              shadows
              dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio, 1.5)}
              camera={{
                position: CAMERA_STAGES[0].pos,
                fov: 40,
                near: 0.1,
                far: 100,
              }}
              gl={{
                antialias: true,
                powerPreference: 'high-performance',
              }}
            >
              <color attach="background" args={['#151515']} />
              <Lighting />
              <ResidenceModel />
              <CameraController currentPos={currentPos} currentTarget={currentTarget} />
            </Canvas>
          ) : (
            /* Fallback only if WebGL is unavailable or reduced-motion is requested */
            <div 
              className="w-full h-full bg-cover bg-center transition-all duration-700 opacity-80"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/60" />
            </div>
          )}
        </div>

        {/* Layer 1: Top Section Identifier */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium">
          <span>04 — SIGNATURE 3D EXPERIENCE</span>
          <span ref={stageTextRef} className="text-ivory font-semibold truncate max-w-[180px] sm:max-w-none">
            {CAMERA_STAGES[0].label}
          </span>
        </div>

        {/* Layer 2: Sparse Editorial Typography Overlay */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-8 flex-grow flex items-end">
          <div className="space-y-3 sm:space-y-4 max-w-xl bg-charcoal/85 backdrop-blur-md p-5 sm:p-8 border border-stone/15">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
              ARCHITECTURAL JOURNEY
            </span>
            <h2
              ref={subtextRef}
              className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-ivory tracking-wide leading-tight"
            >
              {CAMERA_STAGES[0].sublabel}
            </h2>
            <p className="text-[11px] sm:text-xs font-light text-stone/80 leading-relaxed">
              Designed around the way light moves through the day. Monolithic concrete, brushed bronze louvers, and floor-to-ceiling glass.
            </p>
          </div>
        </div>

        {/* Layer 3: Editorial Material Annotations */}
        <div className="hidden lg:flex absolute right-16 top-1/3 z-10 flex-col space-y-4 text-[10px] uppercase tracking-[0.25em] text-stone/60">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-bronze" />
            <span>RAW CONCRETE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-stone" />
            <span>BRONZE LOUVERS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-ivory" />
            <span>LOW-E GLASS</span>
          </div>
        </div>

        {/* Layer 4: Bottom Bar Progress Indicator */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-6 sm:pb-8 flex items-center justify-between border-t border-stone/15 pt-3 sm:pt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-stone">
          <div className="flex gap-4 sm:gap-8">
            <span className="text-ivory font-medium">3D Camera Journey</span>
            <span className="hidden sm:inline text-stone/50">Real-Time WebGL</span>
          </div>
          <div className="text-bronze font-medium">
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BuildingModel } from './BuildingModel';
import { DynamicLighting } from './DynamicLighting';
import { CameraController } from './CameraController';
import { useGlobalScrollCamera } from './useGlobalScrollCamera';
import { prefersReducedMotion } from '../animations/utils';

export const GlobalCanvas: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    if (prefersReducedMotion()) {
      setIsReducedMotion(true);
    }
  }, []);

  const { currentPos, currentTarget, scrollProgress } = useGlobalScrollCamera();

  if (!hasWebGL) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-charcoal">
      <Canvas
        shadows={!isReducedMotion}
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        camera={{
          position: [28, 15, 28],
          fov: 38,
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#151515']} />
        <Suspense fallback={null}>
          <DynamicLighting scrollProgress={scrollProgress} />
          <BuildingModel />
          <CameraController
            currentPos={currentPos}
            currentTarget={currentTarget}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

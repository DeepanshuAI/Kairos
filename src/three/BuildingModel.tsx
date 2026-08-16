import React, { useMemo } from 'react';
import { useGLTF, Center, Html } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/kairos-estate.glb';

export const BuildingModel: React.FC = () => {
  const { scene } = useGLTF(MODEL_PATH);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Enhance materials for luxury architectural rendering
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
              mat.envMapIntensity = 1.0;
              // If material has glass-like name or low opacity, enhance transparency
              if (
                mat.name.toLowerCase().includes('glass') || 
                mat.opacity < 0.95 || 
                mat.transparent
              ) {
                mat.transparent = true;
                mat.opacity = 0.45;
                mat.roughness = 0.1;
                mat.metalness = 0.1;
              } else {
                // Architectural stone/concrete/facade tone adjustments
                mat.roughness = Math.max(mat.roughness, 0.4);
              }
            }
          });
        }
      }
    });

    return clone;
  }, [scene]);

  return (
    <group position={[0, -0.5, 0]}>
      {/* Centered Architecture Model */}
      <Center top>
        <primitive object={clonedScene} scale={1.0} />
      </Center>

      {/* Architectural Ground Reflection / Shadow Receiver */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[120, 120]} />
        <shadowMaterial opacity={0.35} />
      </mesh>

      {/* 3D Annotations for Material / Architectural points */}
      <Html position={[-3, 5, 4]} distanceFactor={25} className="pointer-events-none transition-opacity duration-1000 annotation-marker opacity-0">
        <div className="flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-bronze rounded-full animate-ping absolute opacity-50" />
            <div className="w-1.5 h-1.5 bg-bronze rounded-full shadow-[0_0_8px_rgba(202,168,124,0.6)]" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-ivory font-medium bg-[#0f0f0f]/90 border border-stone/20 px-3 py-1.5 backdrop-blur-md whitespace-nowrap shadow-2xl">
            ACOUSTIC GLASS
          </div>
        </div>
      </Html>

      <Html position={[2, 2.5, 6]} distanceFactor={25} className="pointer-events-none transition-opacity duration-1000 annotation-marker opacity-0">
        <div className="flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-bronze rounded-full animate-ping absolute opacity-50" />
            <div className="w-1.5 h-1.5 bg-bronze rounded-full shadow-[0_0_8px_rgba(202,168,124,0.6)]" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-ivory font-medium bg-[#0f0f0f]/90 border border-stone/20 px-3 py-1.5 backdrop-blur-md whitespace-nowrap shadow-2xl">
            TRAVERTINE STONE
          </div>
        </div>
      </Html>

      <Html position={[-1.5, 8, -2]} distanceFactor={25} className="pointer-events-none transition-opacity duration-1000 annotation-marker opacity-0">
        <div className="flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-bronze rounded-full animate-ping absolute opacity-50" />
            <div className="w-1.5 h-1.5 bg-bronze rounded-full shadow-[0_0_8px_rgba(202,168,124,0.6)]" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-ivory font-medium bg-[#0f0f0f]/90 border border-stone/20 px-3 py-1.5 backdrop-blur-md whitespace-nowrap shadow-2xl">
            NATURAL LIGHT
          </div>
        </div>
      </Html>

    </group>
  );
};

useGLTF.preload(MODEL_PATH);

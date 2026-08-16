import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from '../animations/utils';

interface DynamicLightingProps {
  scrollProgress?: React.RefObject<number>;
}

export const DynamicLighting: React.FC<DynamicLightingProps> = () => {
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const interiorLightRef = useRef<THREE.PointLight>(null);

  const sunColor = React.useMemo(() => new THREE.Color(), []);
  const ambientColor = React.useMemo(() => new THREE.Color(), []);

  const timeOfDayRef = useRef<number>(0);

  React.useEffect(() => {
    const el = document.getElementById('light-journey');
    if (!el) return;

    // We animate a dummy object and read its value
    const proxy = { val: 0 };
    const st = gsap.fromTo(
      proxy,
      { val: 0 },
      {
        val: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: () => {
            timeOfDayRef.current = proxy.val;
          }
        }
      }
    );

    return () => {
      st.scrollTrigger?.kill();
    };
  }, []);

  useFrame(() => {
    const timeOfDay = timeOfDayRef.current;

    if (sunLightRef.current && ambientRef.current && interiorLightRef.current) {
      if (timeOfDay <= 1) {
        // Day -> Golden Hour
        const factor = timeOfDay; // 0 to 1
        sunColor.lerpColors(new THREE.Color('#FAF4E8'), new THREE.Color('#F7B267'), factor);
        ambientColor.lerpColors(new THREE.Color('#F3F0E8'), new THREE.Color('#E8D2B5'), factor);
        
        sunLightRef.current.color.copy(sunColor);
        sunLightRef.current.intensity = THREE.MathUtils.lerp(1.4, 1.0, factor);
        sunLightRef.current.position.set(
          THREE.MathUtils.lerp(25, 30, factor),
          THREE.MathUtils.lerp(35, 18, factor),
          THREE.MathUtils.lerp(20, 15, factor)
        );

        ambientRef.current.color.copy(ambientColor);
        ambientRef.current.intensity = THREE.MathUtils.lerp(0.5, 0.4, factor);

        interiorLightRef.current.intensity = THREE.MathUtils.lerp(0.8, 2.0, factor);
      } else {
        // Golden Hour -> Night
        const factor = timeOfDay - 1; // 0 to 1
        sunColor.lerpColors(new THREE.Color('#F7B267'), new THREE.Color('#384A68'), factor);
        ambientColor.lerpColors(new THREE.Color('#E8D2B5'), new THREE.Color('#1A2230'), factor);

        sunLightRef.current.color.copy(sunColor);
        sunLightRef.current.intensity = THREE.MathUtils.lerp(1.0, 0.25, factor);
        sunLightRef.current.position.set(
          THREE.MathUtils.lerp(30, 35, factor),
          THREE.MathUtils.lerp(18, 8, factor),
          THREE.MathUtils.lerp(15, 10, factor)
        );

        ambientRef.current.color.copy(ambientColor);
        ambientRef.current.intensity = THREE.MathUtils.lerp(0.4, 0.22, factor);

        interiorLightRef.current.intensity = THREE.MathUtils.lerp(2.0, 3.8, factor);
      }
    }
  });

  return (
    <>
      {/* Dynamic Ambient Fill */}
      <ambientLight ref={ambientRef} intensity={0.5} color="#F3F0E8" />

      {/* Sun / Key Architectural Directional Light */}
      <directionalLight
        ref={sunLightRef}
        position={[25, 35, 20]}
        intensity={1.4}
        color="#FAF4E8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0001}
      />

      {/* Soft Fill / Rim Light */}
      <directionalLight
        position={[-20, 15, -20]}
        intensity={0.35}
        color="#9A8060"
      />

      {/* Interior Warm Illuminated Glow Point Light */}
      <pointLight
        ref={interiorLightRef}
        position={[0, 3.5, 0]}
        intensity={1.0}
        distance={25}
        color="#FFD699"
        castShadow={false}
      />
    </>
  );
};

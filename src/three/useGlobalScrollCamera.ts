import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../animations/utils';

export const useGlobalScrollCamera = () => {
  const currentPos = useRef<[number, number, number]>([28, 15, 28]);
  const currentTarget = useRef<[number, number, number]>([0, 2, 0]);
  const scrollProgress = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // We use a proxy object for GSAP to animate
    const proxy = {
      x: 28, y: 15, z: 28,
      tx: 0, ty: 2, tz: 0,
      globalProgress: 0,
    };

    const onUpdate = () => {
      currentPos.current = [proxy.x, proxy.y, proxy.z];
      currentTarget.current = [proxy.tx, proxy.ty, proxy.tz];
    };

    // Keep global progress updated for lighting
    gsap.to(proxy, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      globalProgress: 1,
      onUpdate: () => {
        scrollProgress.current = proxy.globalProgress;
      }
    });

    const triggers: any[] = [];

    // Helper to map a section to a camera movement
    const mapSection = (id: string, startPos: any, endPos: any, startTarget: any, endTarget: any) => {
      const el = document.getElementById(id);
      if (!el) return;

      const t = gsap.fromTo(proxy, 
        { 
          x: startPos[0], y: startPos[1], z: startPos[2],
          tx: startTarget[0], ty: startTarget[1], tz: startTarget[2],
        },
        {
          x: endPos[0], y: endPos[1], z: endPos[2],
          tx: endTarget[0], ty: endTarget[1], tz: endTarget[2],
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2, // Cinematic smoothing
            onUpdate,
          }
        }
      );
      triggers.push(t);
    };

    // 1. ARRIVAL: Hero section
    mapSection('hero', 
      [28, 15, 28], [22, 11, 23], 
      [0, 2, 0], [0, 2.2, 0]
    );

    // 2. PHILOSOPHY: Statement section
    mapSection('statement', 
      [22, 11, 23], [17, 8.5, 19], 
      [0, 2.2, 0], [0, 2.5, 0]
    );

    // 3. ARCHITECTURE: ArchitectureStory section
    mapSection('architecture', 
      [17, 8.5, 19], [9.5, 4.5, 11], 
      [0, 2.5, 0], [0.5, 2.5, 0]
    );

    // 4. RESIDENCES: ResidencesShowcase section
    // For residences we will do a more complex timeline if we want, or a smooth orbit
    mapSection('residences', 
      [9.5, 4.5, 11], [4.0, 3.2, 7.5], 
      [0.5, 2.5, 0], [0, 3.0, 0]
    );

    // 5. LIGHT / MATERIALS: Details section
    mapSection('materials', 
      [4.0, 3.2, 7.5], [-10, 5.5, 12], 
      [0, 3.0, 0], [0, 2.5, 0]
    );

    // 6. REVEAL: Lifestyle section
    mapSection('lifestyle', 
      [-10, 5.5, 12], [22, 11, 24], 
      [0, 2.5, 0], [0, 2, 0]
    );

    // 7. DEPARTURE: Contact section
    mapSection('contact', 
      [22, 11, 24], [32, 16, 32], 
      [0, 2, 0], [0, 2, 0]
    );

    return () => {
      triggers.forEach(t => t.scrollTrigger?.kill());
    };
  }, []);

  return { currentPos, currentTarget, scrollProgress };
};

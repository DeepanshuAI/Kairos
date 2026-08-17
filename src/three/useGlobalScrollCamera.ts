import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../animations/utils';

export const useGlobalScrollCamera = () => {
  // Start at the exact first waypoint (0 degrees, radius 48, height 14)
  const currentPos = useRef<[number, number, number]>([0, 14, 48]);
  const currentTarget = useRef<[number, number, number]>([0, 3.5, 0]);
  const scrollProgress = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const proxy = {
      x: 0, y: 14, z: 48,
      tx: 0, ty: 3.5, tz: 0,
      globalProgress: 0,
      heroAngle: 0, // In degrees
    };

    const onUpdate = () => {
      currentPos.current = [proxy.x, proxy.y, proxy.z];
      currentTarget.current = [proxy.tx, proxy.ty, proxy.tz];
    };

    // Track global progress for lighting
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

    // 1. HERO CONTINUOUS CINEMATIC 360-DEGREE ORBIT
    // Radius = 48 (Building half-width is 28.2, corner distance is 40.1, so radius 48 is completely collision-free)
    const heroEl = document.getElementById('hero');
    const atmosphereEl = document.getElementById('light-journey');
    
    if (heroEl && atmosphereEl) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          endTrigger: atmosphereEl,
          end: 'bottom bottom',
          scrub: true,
        }
      });

      const r = 48;
      const h = 14;

      const onHeroUpdate = () => {
        const rad = proxy.heroAngle * (Math.PI / 180);
        proxy.x = Math.sin(rad) * r;
        proxy.z = Math.cos(rad) * r;
        // Gentle, elegant elevation glide
        proxy.y = h + Math.sin(rad * 2) * 1.5;
        proxy.tx = 0;
        proxy.ty = 3.5;
        proxy.tz = 0;
        onUpdate();
      };

      // Exactly 1 full 360° rotation from 0° at top of hero to 360° at bottom of hero
      heroTl.fromTo(
        proxy,
        { heroAngle: 0 },
        { heroAngle: 360, ease: 'none', duration: 1.0, onUpdate: onHeroUpdate }
      );

      triggers.push(heroTl);
    }

    // 2. SUBSEQUENT SECTIONS: Camera stays stable at the front establishing angle [0, 14, 48]
    // Only in Contact (Final reveal), pull back for the full estate master view
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const ft = gsap.fromTo(proxy,
        { x: 0, y: 14, z: 48, tx: 0, ty: 3.5, tz: 0 },
        { x: 0, y: 24, z: 75, tx: 0, ty: 5, tz: 0,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: contactEl,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 2,
            onUpdate,
          }
        }
      );
      triggers.push(ft);
    }

    return () => {
      triggers.forEach(t => t.scrollTrigger?.kill());
    };
  }, []);

  return { currentPos, currentTarget, scrollProgress };
};

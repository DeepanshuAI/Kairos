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

    // Helper to create a transition BETWEEN sections
    const addTransition = (
      triggerId: string, 
      startPos: number[], endPos: number[], 
      startTarget: number[], endTarget: number[],
      scrubSpeed = 1.2
    ) => {
      const el = document.getElementById(triggerId);
      if (!el) return;

      const t = gsap.fromTo(proxy, 
        { 
          x: startPos[0], y: startPos[1], z: startPos[2],
          tx: startTarget[0], ty: startTarget[1], tz: startTarget[2],
        },
        {
          x: endPos[0], y: endPos[1], z: endPos[2],
          tx: endTarget[0], ty: endTarget[1], tz: endTarget[2],
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%', // Begin transition when next section is entering
            end: 'top 25%',   // Complete transition and HOLD when section is prominent
            scrub: scrubSpeed,
            onUpdate,
          }
        }
      );
      triggers.push(t);
    };

    const centerTarget = [0, 3.5, 0];
    const archTarget   = [2, 4.0, 0];

    // 1. HERO CONTINUOUS CINEMATIC 360-DEGREE ORBIT
    // Radius = 48 (Building half-width is 28.2, corner distance is 40.1, so radius 48 is completely collision-free)
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
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
        proxy.y = h + Math.sin(rad * 2) * 1.8;
        proxy.tx = Math.sin(rad) * 1.5;
        proxy.ty = 3.5;
        proxy.tz = Math.cos(rad) * 1.5;
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

    // Waypoints for subsequent sections (all maintained at safe radius >= 46)
    // End of hero is at 360 degrees:
    const heroEndPos    = [0, 14, 48];
    const wp1_statement = [12, 13, 46];
    const wp2_arch      = [24, 11, 42];
    const wp3_res       = [36, 12, 34];
    const wp4_horizon   = [44, 16, 20];
    const wp5_light     = [48, 13, 0];
    const wp6_depart    = [0, 26, 80];  // Final reveal: Majestic pull-back to see full estate

    // Connect the waypoints with transitions that hold while the user reads
    addTransition('statement',    heroEndPos,        wp1_statement, centerTarget, centerTarget);
    addTransition('architecture', wp1_statement,     wp2_arch,      centerTarget, archTarget);
    addTransition('residences',   wp2_arch,          wp3_res,       archTarget,   centerTarget);
    addTransition('horizon',      wp3_res,           wp4_horizon,   centerTarget, centerTarget);
    addTransition('light-journey',wp4_horizon,       wp5_light,     centerTarget, centerTarget);
    
    // Final reveal transition
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const ft = gsap.fromTo(proxy,
        { x: wp5_light[0], y: wp5_light[1], z: wp5_light[2], tx: centerTarget[0], ty: centerTarget[1], tz: centerTarget[2] },
        { x: wp6_depart[0], y: wp6_depart[1], z: wp6_depart[2], tx: [0, 5, 0], ty: 5, tz: 0,
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

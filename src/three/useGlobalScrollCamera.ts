import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../animations/utils';

export const useGlobalScrollCamera = () => {
  // Start at the exact first waypoint
  const currentPos = useRef<[number, number, number]>([15, 6, 25]);
  const currentTarget = useRef<[number, number, number]>([0, 2, 0]);
  const scrollProgress = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const proxy = {
      x: 15, y: 6, z: 25,
      tx: 0, ty: 2, tz: 0,
      globalProgress: 0,
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
      scrubSpeed = 1.5
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

    // Waypoint coordinates (Orbital path, strictly horizontal-focused with minimal dolly)
    // Target is generally kept at [0, 2, 0] to keep the building centered
    const wp0_arrival  = [15, 6, 25];
    const wp1_statement = [10, 5, 26];
    const wp2_arch      = [4, 4, 25];
    const wp3_res       = [-4, 3, 24];
    const wp4_horizon   = [-15, 6, 22]; // Wider controlled orbit
    const wp5_light     = [-22, 5, 10]; // Continue orbit into evening light
    const wp6_depart    = [0, 10, 45];  // Final reveal: Pull far away to see entire estate

    const centerTarget = [0, 2, 0];
    const archTarget   = [0.5, 2.2, 0];

    // Note: The Hero has a subtle intrinsic movement while you scroll through it
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const ht = gsap.fromTo(proxy,
        { x: wp0_arrival[0], y: wp0_arrival[1], z: wp0_arrival[2], tx: centerTarget[0], ty: centerTarget[1], tz: centerTarget[2] },
        { x: 12.5, y: 5.5, z: 25.5, tx: centerTarget[0], ty: centerTarget[1], tz: centerTarget[2],
          ease: 'none',
          scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom 50%', scrub: 1, onUpdate }
        }
      );
      triggers.push(ht);
    }

    // Connect the waypoints with transitions that hold while the user reads
    addTransition('statement',    [12.5, 5.5, 25.5], wp1_statement, centerTarget, centerTarget);
    addTransition('architecture', wp1_statement,     wp2_arch,      centerTarget, archTarget);
    addTransition('residences',   wp2_arch,          wp3_res,       archTarget,   centerTarget);
    addTransition('horizon',      wp3_res,           wp4_horizon,   centerTarget, centerTarget);
    addTransition('light-journey',wp4_horizon,       wp5_light,     centerTarget, centerTarget);
    
    // During interiors, materials, lifestyle (opaque sections), camera holds position.
    
    // Final reveal transition
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const ft = gsap.fromTo(proxy,
        { x: wp5_light[0], y: wp5_light[1], z: wp5_light[2], tx: centerTarget[0], ty: centerTarget[1], tz: centerTarget[2] },
        { x: wp6_depart[0], y: wp6_depart[1], z: wp6_depart[2], tx: [0, 5, 0], ty: [0, 5, 0][1], tz: [0, 5, 0][2],
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: contactEl,
            start: 'top bottom', // Start pulling back as soon as contact enters viewport
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

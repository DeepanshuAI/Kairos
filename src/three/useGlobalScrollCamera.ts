import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../animations/utils';

export const useGlobalScrollCamera = () => {
  // Start at the exact first waypoint (0 degrees)
  const currentPos = useRef<[number, number, number]>([0, 5.5, 26]);
  const currentTarget = useRef<[number, number, number]>([0, 2, 0]);
  const scrollProgress = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const proxy = {
      x: 0, y: 5.5, z: 26,
      tx: 0, ty: 2, tz: 0,
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

    const centerTarget = [0, 2, 0];
    const archTarget   = [0.5, 2.2, 0];

    // 1. HERO 360-DEGREE ORBIT
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      // Create a timeline specifically for the hero's angle
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // The radius and base height
      const r = 26;
      const h = 5.5;

      // Update proxy x/z based on heroAngle
      const onHeroUpdate = () => {
        const rad = proxy.heroAngle * (Math.PI / 180);
        proxy.x = Math.sin(rad) * r;
        proxy.z = Math.cos(rad) * r;
        // Subtle elevation changes
        proxy.y = h + Math.sin(rad * 2) * 1.5; 
        onUpdate();
      };

      // 0-25%: Beat 1 (0 to 60 deg)
      heroTl.fromTo(proxy, { heroAngle: 0 }, { heroAngle: 60, ease: 'power1.inOut', duration: 1, onUpdate: onHeroUpdate });
      // 25-50%: Beat 2 (60 to 120, wait, then to 150)
      heroTl.to(proxy, { heroAngle: 120, ease: 'power1.inOut', duration: 1, onUpdate: onHeroUpdate });
      heroTl.to(proxy, { heroAngle: 150, ease: 'power1.out', duration: 1, onUpdate: onHeroUpdate });
      // 50-75%: Beat 3 (150 to 220, wait, then to 250)
      heroTl.to(proxy, { heroAngle: 220, ease: 'power1.inOut', duration: 1, onUpdate: onHeroUpdate });
      heroTl.to(proxy, { heroAngle: 250, ease: 'power1.out', duration: 1, onUpdate: onHeroUpdate });
      // 75-100%: Beat 4 (250 to 320, then to 360)
      heroTl.to(proxy, { heroAngle: 320, ease: 'power1.inOut', duration: 1, onUpdate: onHeroUpdate });
      heroTl.to(proxy, { heroAngle: 360, ease: 'power1.out', duration: 1.5, onUpdate: onHeroUpdate });

      triggers.push(heroTl);
    }

    // Waypoints for subsequent sections
    // End of hero is at 360 degrees (which is x:0, z:26, y:5.5)
    const wp1_statement = [0, 5.5, 26];
    
    // Architecture: 15-40 degree orbit, slight elevation focus on facade
    // Let's just use fixed coordinates for simplicity
    const wp2_arch      = [8, 4, 24];
    
    // Residences: move toward a specific architectural area
    const wp3_res       = [15, 3, 20];
    
    // Horizon: wider 60-90 degree controlled orbit
    const wp4_horizon   = [22, 6, 12];
    
    // Light journey: continue orbit into evening light
    const wp5_light     = [26, 5, 0];
    
    // Final reveal: Pull far away to see entire estate
    const wp6_depart    = [0, 15, 55];

    // Connect the waypoints with transitions that hold while the user reads
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
        { x: wp6_depart[0], y: wp6_depart[1], z: wp6_depart[2], tx: [0, 5, 0], ty: 5, tz: 0,
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

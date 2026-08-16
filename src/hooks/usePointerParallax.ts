import { useEffect } from 'react';
import { gsap, prefersReducedMotion } from '../animations/utils';

export const usePointerParallax = (
  ref: React.RefObject<HTMLElement | null>,
  strength: number = 10,
  damping: number = 0.1
) => {
  useEffect(() => {
    if (!ref.current || prefersReducedMotion() || ('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;

    const xSetter = gsap.quickSetter(ref.current, "x", "px");
    const ySetter = gsap.quickSetter(ref.current, "y", "px");
    
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx * strength;
      targetY = ny * strength;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const update = () => {
      currentX += (targetX - currentX) * damping;
      currentY += (targetY - currentY) * damping;
      xSetter(currentX);
      ySetter(currentY);
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [ref, strength, damping]);
};

import { gsap, cinematicEase, prefersReducedMotion } from './utils';

export const initScrollReveals = (containerSelector: string = '[data-scroll-reveal]') => {
  if (prefersReducedMotion()) return;

  const elements = document.querySelectorAll(containerSelector);
  
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: cinematicEase,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

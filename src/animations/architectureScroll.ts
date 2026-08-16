import { gsap } from './utils';

export interface ArchitectureScrollRefs {
  container: HTMLElement | null;
  stickyWrapper?: HTMLElement | null;
  bgImage1?: HTMLElement | null;
  bgImage2?: HTMLElement | null;
  bgImage3?: HTMLElement | null;
  chapter1Text: HTMLElement | null;
  chapter2Text: HTMLElement | null;
  chapter3Text: HTMLElement | null;
}

export const initArchitectureScrollStory = (refs: ArchitectureScrollRefs) => {
  const {
    container,
    chapter1Text,
    chapter2Text,
    chapter3Text,
  } = refs;

  if (!container) return;

  const mm = gsap.matchMedia();

  // Desktop (>= 1024px)
  mm.add('(min-width: 1024px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Smoother scrub
      },
    });
    gsap.set(chapter1Text, { opacity: 1, y: 0 });
    gsap.set(chapter2Text, { opacity: 0, y: 40 });
    gsap.set(chapter3Text, { opacity: 0, y: 40 });
    
    // Hide all 3D annotations initially
    gsap.set('.annotation-marker', { opacity: 0 });

    tl.to(chapter1Text, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 0.3)

      // Transition to Chapter 2
      .to(chapter2Text, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.5)
      // Fade in 3D annotations when architecture details are discussed
      .to('.annotation-marker', { opacity: 1, duration: 1.0, ease: 'power2.out' }, 0.6)
      
      .to(chapter2Text, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 0.8)

      // Transition to Chapter 3
      // Fade out 3D annotations as we move to sky views
      .to('.annotation-marker', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.8)
      .to(chapter3Text, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.9);
  });

  // Mobile / Tablet (< 1024px)
  mm.add('(max-width: 1023px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // Smoother scrub
      },
    });

    gsap.set(chapter1Text, { opacity: 1, y: 0 });
    gsap.set(chapter2Text, { opacity: 0, y: 30 });
    gsap.set(chapter3Text, { opacity: 0, y: 30 });

    tl.to(chapter1Text, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, 0.2)
      .to(chapter2Text, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.4)
      .to(chapter2Text, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, 0.7)
      .to(chapter3Text, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.9);
  });

  return mm;
};

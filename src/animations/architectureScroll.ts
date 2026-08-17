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
        scrub: 0.6,
      },
    });
    gsap.set(chapter1Text, { opacity: 1, y: 0 });
    gsap.set(chapter2Text, { opacity: 0, y: 30 });
    gsap.set(chapter3Text, { opacity: 0, y: 30 });
    
    // Hide all 3D annotations initially
    gsap.set('.annotation-marker', { opacity: 0 });

    // Chapter 1 fades out smoothly (0.12 -> 0.22)
    tl.to(chapter1Text, { opacity: 0, y: -25, duration: 0.5, ease: 'power1.in' }, 0.12)
      // Transition immediately into Chapter 2 (0.20 -> 0.55)
      .to(chapter2Text, { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out' }, 0.20)
      .to('.annotation-marker', { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0.25)
      
      // Chapter 2 exits (0.50 -> 0.60)
      .to(chapter2Text, { opacity: 0, y: -25, duration: 0.5, ease: 'power1.in' }, 0.50)
      .to('.annotation-marker', { opacity: 0, duration: 0.4, ease: 'power1.in' }, 0.52)

      // Transition immediately into Chapter 3 (0.58 -> 1.0)
      .to(chapter3Text, { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out' }, 0.58);
  });

  // Mobile / Tablet (< 1024px)
  mm.add('(max-width: 1023px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });

    gsap.set(chapter1Text, { opacity: 1, y: 0 });
    gsap.set(chapter2Text, { opacity: 0, y: 20 });
    gsap.set(chapter3Text, { opacity: 0, y: 20 });

    tl.to(chapter1Text, { opacity: 0, y: -15, duration: 0.4, ease: 'power1.in' }, 0.12)
      .to(chapter2Text, { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out' }, 0.20)
      .to(chapter2Text, { opacity: 0, y: -15, duration: 0.4, ease: 'power1.in' }, 0.50)
      .to(chapter3Text, { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out' }, 0.58);
  });

  return mm;
};

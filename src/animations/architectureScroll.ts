import { gsap } from './utils';

export interface ArchitectureScrollRefs {
  container: HTMLElement | null;
  stickyWrapper: HTMLElement | null;
  bgImage1: HTMLElement | null;
  bgImage2: HTMLElement | null;
  bgImage3: HTMLElement | null;
  chapter1Text: HTMLElement | null;
  chapter2Text: HTMLElement | null;
  chapter3Text: HTMLElement | null;
  annotation1: HTMLElement | null;
  annotation2: HTMLElement | null;
}

export const initArchitectureScrollStory = (refs: ArchitectureScrollRefs) => {
  const {
    container,
    chapter1Text,
    chapter2Text,
    chapter3Text,
    annotation1,
    annotation2,
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

    const line1 = annotation1?.querySelector('[data-line]') || null;
    const line2 = annotation2?.querySelector('[data-line]') || null;

    gsap.set(chapter1Text, { opacity: 1, y: 0 });
    gsap.set(chapter2Text, { opacity: 0, y: 40 });
    gsap.set(chapter3Text, { opacity: 0, y: 40 });
    
    if (annotation1) gsap.set(annotation1, { opacity: 0, x: -30 });
    if (line1) gsap.set(line1, { scaleX: 0 });
    if (annotation2) gsap.set(annotation2, { opacity: 0, x: -30 });
    if (line2) gsap.set(line2, { scaleX: 0 });

    tl.to(annotation1 || [], { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 0.1)
      .to(line1 || [], { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0.2)
      .to(chapter1Text, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 0.3)

      // Transition to Image 2
      .to(annotation1 || [], { opacity: 0, x: -30, duration: 0.4, ease: 'power2.in' }, 0.4)
      .to(chapter2Text, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.5)
      .to(annotation2 || [], { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
      .to(line2 || [], { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0.6)
      .to(chapter2Text, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 0.8)

      // Transition to Image 3
      .to(annotation2 || [], { opacity: 0, x: -30, duration: 0.4, ease: 'power2.in' }, 0.8)
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

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
    stickyWrapper,
    bgImage1,
    bgImage2,
    bgImage3,
    chapter1Text,
    chapter2Text,
    chapter3Text,
    annotation1,
    annotation2,
  } = refs;

  if (!container || !stickyWrapper) return;

  const mm = gsap.matchMedia();

  // Desktop (>= 1024px)
  mm.add('(min-width: 1024px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=300%',
        pin: stickyWrapper,
        scrub: 1.5, // Smoother scrub
        anticipatePin: 1,
      },
    });

    const line1 = annotation1?.querySelector('[data-line]') || null;
    const line2 = annotation2?.querySelector('[data-line]') || null;

    gsap.set(bgImage1, { scale: 1.15, opacity: 1, clipPath: 'inset(10% 10% 10% 10%)' });
    gsap.set(bgImage2, { opacity: 0, scale: 1.15 });
    gsap.set(bgImage3, { opacity: 0, scale: 1.15 });
    gsap.set(chapter1Text, { opacity: 1, y: 0 });
    gsap.set(chapter2Text, { opacity: 0, y: 40 });
    gsap.set(chapter3Text, { opacity: 0, y: 40 });
    
    if (annotation1) gsap.set(annotation1, { opacity: 0, x: -30 });
    if (line1) gsap.set(line1, { scaleX: 0 });
    if (annotation2) gsap.set(annotation2, { opacity: 0, x: -30 });
    if (line2) gsap.set(line2, { scaleX: 0 });

    tl.to(bgImage1, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.05, duration: 1.2, ease: 'power2.inOut' }, 0)
      .to(annotation1 || [], { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 0.4)
      .to(line1 || [], { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0.5)
      .to(chapter1Text, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 0.8)

      // Transition to Image 2
      .to(bgImage1, { opacity: 0, scale: 1, duration: 0.8 }, 1.2)
      .to(bgImage2, { opacity: 1, scale: 1.05, duration: 1.2, ease: 'power2.out' }, 1.0)
      .to(annotation1 || [], { opacity: 0, x: -30, duration: 0.4, ease: 'power2.in' }, 1.2)
      .to(chapter2Text, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.4)
      .to(annotation2 || [], { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 1.6)
      .to(line2 || [], { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 1.7)
      .to(chapter2Text, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 2.4)

      // Transition to Image 3
      .to(bgImage2, { opacity: 0, scale: 1, duration: 0.8 }, 2.6)
      .to(bgImage3, { opacity: 1, scale: 1.05, duration: 1.2, ease: 'power2.out' }, 2.4)
      .to(annotation2, { opacity: 0, x: -30, duration: 0.4, ease: 'power2.in' }, 2.6)
      .to(chapter3Text, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 2.8)
      // Final slow pan out on bg3
      .to(bgImage3, { scale: 1, duration: 0.5, ease: 'none' }, 3.6);
  });

  // Mobile / Tablet (< 1024px)
  mm.add('(max-width: 1023px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=180%',
        pin: stickyWrapper,
        scrub: 1.2, // Smoother scrub
        anticipatePin: 1,
      },
    });

    gsap.set(bgImage1, { opacity: 1, scale: 1.05, clipPath: 'inset(0% 0% 0% 0%)' });
    gsap.set(bgImage2, { opacity: 0, scale: 1.1 });
    gsap.set(bgImage3, { opacity: 0, scale: 1.1 });
    gsap.set(chapter1Text, { opacity: 1, y: 0 });
    gsap.set(chapter2Text, { opacity: 0, y: 30 });
    gsap.set(chapter3Text, { opacity: 0, y: 30 });

    tl.to(bgImage1, { scale: 1, duration: 0.8, ease: 'power1.out' }, 0)
      .to(chapter1Text, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, 0.4)
      
      .to(bgImage1, { opacity: 0, duration: 0.6 }, 0.8)
      .to(bgImage2, { opacity: 1, scale: 1.05, duration: 0.8, ease: 'power2.out' }, 0.6)
      .to(chapter2Text, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.0)
      
      .to(chapter2Text, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, 1.6)
      .to(bgImage2, { opacity: 0, scale: 1, duration: 0.6 }, 2.0)
      
      .to(bgImage3, { opacity: 1, scale: 1.05, duration: 0.8, ease: 'power2.out' }, 1.8)
      .to(chapter3Text, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2.2)
      .to(bgImage3, { scale: 1, duration: 0.4, ease: 'none' }, 2.8);
  });

  return mm;
};

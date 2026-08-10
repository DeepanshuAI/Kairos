import { gsap, cinematicEase, prefersReducedMotion } from './utils';

export interface MaterialTransformationRefs {
  container: HTMLElement | null;
  stickyWrapper: HTMLElement | null;
  bgImages: (HTMLElement | null)[];
  phaseTexts: (HTMLElement | null)[];
  phaseLabel: HTMLElement | null;
}

export const initInteriorCinematicExpansion = (
  container: HTMLElement | null,
  imageMask: HTMLElement | null,
  headline: HTMLElement | null,
  supportingText: HTMLElement | null
) => {
  if (!container || !imageMask || prefersReducedMotion()) return;

  const ctx = gsap.context(() => {
    const isDesktop = window.innerWidth >= 1024;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: isDesktop ? 1.2 : 0.5,
      },
    });

    // 1. Image expands from tight crop to full-bleed stage width
    tl.fromTo(
      imageMask,
      { clipPath: 'inset(18% 18% 18% 18%)', scale: 1.12 },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none' },
      0
    );

    // 2. Headline moves independently (parallax reveal)
    if (headline) {
      tl.fromTo(
        headline,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: cinematicEase },
        0.15
      );
    }

    // 3. Supporting text appears after atmosphere is established
    if (supportingText) {
      tl.fromTo(
        supportingText,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: cinematicEase },
        0.5
      );
    }
  }, container);

  return ctx;
};

export const initMaterialTransformationTimeline = (refs: MaterialTransformationRefs) => {
  const { container, stickyWrapper, bgImages, phaseTexts, phaseLabel } = refs;
  if (!container || !stickyWrapper || prefersReducedMotion()) return;

  const validImages = bgImages.filter((el): el is HTMLElement => el !== null);
  const validTexts = phaseTexts.filter((el): el is HTMLElement => el !== null);
  if (validImages.length === 0 || validTexts.length === 0) return;

  const mm = gsap.matchMedia();
  const steps = ['I • FORM', 'II • MATERIAL', 'III • LIGHT', 'IV • ATMOSPHERE'];

  // Desktop (>= 1024px)
  mm.add('(min-width: 1024px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=300%',
        pin: stickyWrapper,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Initial States
    validImages.forEach((img, idx) => {
      gsap.set(img, { opacity: idx === 0 ? 1 : 0, scale: idx === 0 ? 1 : 1.15 });
    });
    validTexts.forEach((txt, idx) => {
      gsap.set(txt, { opacity: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 40 });
    });

    for (let i = 0; i < validImages.length - 1; i++) {
      const nextIdx = i + 1;
      const startTime = (i + 1) * 1;

      tl.to(validImages[i], { opacity: 0, scale: 1.08, duration: 0.8 }, startTime)
        .to(validImages[nextIdx], { opacity: 1, scale: 1, duration: 0.8 }, startTime)
        .to(validTexts[i], { opacity: 0, y: -30, duration: 0.5 }, startTime)
        .to(validTexts[nextIdx], { opacity: 1, y: 0, duration: 0.6 }, startTime + 0.2);

      if (phaseLabel && steps[nextIdx]) {
        tl.to(phaseLabel, { opacity: 0, duration: 0.2 }, startTime)
          .add(() => {
            phaseLabel.innerText = steps[nextIdx];
          })
          .to(phaseLabel, { opacity: 1, duration: 0.3 }, startTime + 0.2);
      }
    }
  });

  // Mobile / Tablet (< 1024px)
  mm.add('(max-width: 1023px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=180%',
        pin: stickyWrapper,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    validImages.forEach((img, idx) => {
      gsap.set(img, { opacity: idx === 0 ? 1 : 0, scale: idx === 0 ? 1 : 1.1 });
    });
    validTexts.forEach((txt, idx) => {
      gsap.set(txt, { opacity: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 30 });
    });

    for (let i = 0; i < validImages.length - 1; i++) {
      const nextIdx = i + 1;
      const startTime = (i + 1) * 1;

      tl.to(validImages[i], { opacity: 0, duration: 0.6 }, startTime)
        .to(validImages[nextIdx], { opacity: 1, scale: 1, duration: 0.6 }, startTime)
        .to(validTexts[i], { opacity: 0, y: -20, duration: 0.4 }, startTime)
        .to(validTexts[nextIdx], { opacity: 1, y: 0, duration: 0.5 }, startTime + 0.2);

      if (phaseLabel && steps[nextIdx]) {
        tl.to(phaseLabel, { opacity: 0, duration: 0.2 }, startTime)
          .add(() => {
            phaseLabel.innerText = steps[nextIdx];
          })
          .to(phaseLabel, { opacity: 1, duration: 0.3 }, startTime + 0.2);
      }
    }
  });

  return mm;
};

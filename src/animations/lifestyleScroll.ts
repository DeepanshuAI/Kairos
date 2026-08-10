import { gsap, cinematicEase, prefersReducedMotion } from './utils';

export interface SignatureLifestyleRefs {
  container: HTMLElement | null;
  imageMask?: HTMLElement | null;
  headline?: HTMLElement | null;
  subtext?: HTMLElement | null;
}

export const initSignatureLifestyleReveal = (refs: SignatureLifestyleRefs) => {
  const container = refs.container;
  if (!container || prefersReducedMotion()) return;

  const ctx = gsap.context(() => {
    // 1. Editorial Header Reveal
    const header = container.querySelector('.lifestyle-header');
    if (header) {
      gsap.fromTo(
        header.children,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.15,
          ease: cinematicEase,
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
          },
        }
      );
    }

    // 2. Signature Hero Image Mask & Text Scrub Animation
    const heroSection = container.querySelector('.lifestyle-hero-section');
    const heroMask = container.querySelector('.lifestyle-hero-mask');
    const heroHeadline = container.querySelector('.lifestyle-hero-headline');
    const heroSubtext = container.querySelector('.lifestyle-hero-subtext');

    if (heroSection && heroMask) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 1,
        },
      });

      heroTl.fromTo(
        heroMask,
        { clipPath: 'inset(12% 12% 12% 12%)', scale: 1.12 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none' },
        0
      );

      if (heroHeadline) {
        heroTl.fromTo(
          heroHeadline,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, ease: cinematicEase },
          0.2
        );
      }

      if (heroSubtext) {
        heroTl.fromTo(
          heroSubtext,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, ease: cinematicEase },
          0.4
        );
      }
    }

    // 3. Time Blocks (Morning, Living, Connection) - Smooth Parallax & Staggered Text Reveal
    const timeBlocks = container.querySelectorAll('.lifestyle-time-block');
    timeBlocks.forEach((block) => {
      const textCol = block.querySelector('.lifestyle-text-col');
      const imgFrame = block.querySelector('.lifestyle-img-frame');
      const img = block.querySelector('.lifestyle-img');

      // Text stagger reveal
      if (textCol) {
        gsap.fromTo(
          textCol.children,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: cinematicEase,
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
            },
          }
        );
      }

      // Smooth Image Clip Reveal & Parallax Scrub
      if (imgFrame) {
        gsap.fromTo(
          imgFrame,
          { clipPath: 'inset(8% 8% 8% 8%)', opacity: 0.85 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.4,
            ease: cinematicEase,
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
            },
          }
        );
      }

      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.1 },
          {
            yPercent: 8,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: block,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    });

    // 4. Stillness Block ("Some spaces ask nothing of you.") - Meditative Smooth Zoom & Fade
    const stillnessBlock = container.querySelector('.lifestyle-stillness-block');
    if (stillnessBlock) {
      const stillnessTitle = stillnessBlock.querySelector('.lifestyle-stillness-title');
      const stillnessTag = stillnessBlock.querySelector('.lifestyle-stillness-tag');
      const stillnessImgFrame = stillnessBlock.querySelector('.lifestyle-stillness-img-frame');
      const stillnessImg = stillnessBlock.querySelector('.lifestyle-stillness-img');

      if (stillnessTag && stillnessTitle) {
        gsap.fromTo(
          [stillnessTag, stillnessTitle],
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.2,
            ease: cinematicEase,
            scrollTrigger: {
              trigger: stillnessBlock,
              start: 'top 75%',
            },
          }
        );
      }

      if (stillnessImgFrame) {
        gsap.fromTo(
          stillnessImgFrame,
          { scale: 0.94, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: cinematicEase,
            scrollTrigger: {
              trigger: stillnessBlock,
              start: 'top 70%',
            },
          }
        );
      }

      if (stillnessImg) {
        gsap.fromTo(
          stillnessImg,
          { scale: 1.15 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: stillnessBlock,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    }

    // 5. Evening Block ("Stay a little longer.") - Twilight Cinematic Reveal
    const eveningBlock = container.querySelector('.lifestyle-evening-block');
    if (eveningBlock) {
      const eveningText = eveningBlock.querySelector('.lifestyle-evening-text');
      const eveningImgFrame = eveningBlock.querySelector('.lifestyle-evening-img-frame');
      const eveningImg = eveningBlock.querySelector('.lifestyle-evening-img');

      if (eveningText) {
        gsap.fromTo(
          eveningText.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            stagger: 0.15,
            ease: cinematicEase,
            scrollTrigger: {
              trigger: eveningBlock,
              start: 'top 75%',
            },
          }
        );
      }

      if (eveningImgFrame) {
        gsap.fromTo(
          eveningImgFrame,
          { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0.7 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: eveningBlock,
              start: 'top 75%',
              end: 'center center',
              scrub: 1,
            },
          }
        );
      }

      if (eveningImg) {
        gsap.fromTo(
          eveningImg,
          { scale: 1.12 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: eveningBlock,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }

    // 6. Emotional Bridge
    const bridge = container.querySelector('.lifestyle-bridge-block');
    if (bridge) {
      gsap.fromTo(
        bridge.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: cinematicEase,
          scrollTrigger: {
            trigger: bridge,
            start: 'top 85%',
          },
        }
      );
    }
  }, container);

  return ctx;
};

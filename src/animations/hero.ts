import { gsap, cinematicEase, smoothScrub } from './utils';

export interface HeroAnimationRefs {
  container: HTMLElement | null;
  tagline: HTMLElement | null;
  titleLines: (HTMLElement | null)[];
  subtitle: HTMLElement | null;
  ctas: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
}

export const animateHeroEntrance = (refs: HeroAnimationRefs) => {
  const { container, tagline, titleLines, subtitle, ctas, scrollIndicator } = refs;
  if (!container) return;

  // 1. ENTRANCE TIMELINE (Plays once on load)
  const tl = gsap.timeline({
    defaults: { ease: cinematicEase }
  });



  if (tagline) {
    tl.fromTo(tagline, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.4);
  }

  const validTitleLines = titleLines.filter((el): el is HTMLElement => el !== null);
  if (validTitleLines.length > 0) {
    tl.fromTo(validTitleLines, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, stagger: 0.2 }, 0.6);
  }

  if (subtitle) {
    tl.fromTo(subtitle, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 1.2);
  }

  if (ctas) {
    tl.fromTo(ctas, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 1.4);
  }

  if (scrollIndicator) {
    tl.fromTo(scrollIndicator, { opacity: 0 }, { opacity: 1, duration: 1.0 }, 1.7);
  }

  // 2. SCROLL TIMELINE (Scrubbing effect on scroll)
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: smoothScrub,
    }
  });



  if (validTitleLines.length > 0) {
    // Subtle typography parallax
    scrollTl.to(validTitleLines[0], { y: -30, ease: 'none' }, 0);
    if (validTitleLines[1]) {
      scrollTl.to(validTitleLines[1], { y: -50, ease: 'none' }, 0);
    }
  }

  // Fade out container content smoothly towards the end
  scrollTl.to(container.querySelector('.flex-grow'), { opacity: 0, y: -20, ease: 'power1.inOut' }, 0);

  // Return an object containing both timelines so we can kill them on unmount
  return { entrance: tl, scroll: scrollTl };
};

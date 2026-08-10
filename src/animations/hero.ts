import { gsap, cinematicEase } from './utils';

export interface HeroAnimationRefs {
  container: HTMLElement | null;
  bgImage: HTMLElement | null;
  tagline: HTMLElement | null;
  titleLines: (HTMLElement | null)[];
  subtitle: HTMLElement | null;
  ctas: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
}

export const animateHeroEntrance = (refs: HeroAnimationRefs) => {
  const { container, bgImage, tagline, titleLines, subtitle, ctas, scrollIndicator } = refs;
  if (!container) return;

  const tl = gsap.timeline({
    defaults: { ease: cinematicEase }
  });

  // Background slow zoom initialization - subtle cinematic camera movement
  if (bgImage) {
    gsap.set(bgImage, { scale: 1.08, filter: 'brightness(0.85)' });
    tl.to(bgImage, {
      scale: 1,
      filter: 'brightness(1)',
      duration: 2.8,
      ease: "power3.out"
    }, 0);
  }

  // Tagline reveal
  if (tagline) {
    tl.fromTo(tagline,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      0.4
    );
  }

  // Title lines reveal with clip/slide
  const validTitleLines = titleLines.filter((el): el is HTMLElement => el !== null);
  if (validTitleLines.length > 0) {
    tl.fromTo(validTitleLines,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2 },
      0.6
    );
  }

  // Subtitle reveal
  if (subtitle) {
    tl.fromTo(subtitle,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      1.2
    );
  }

  // CTAs reveal
  if (ctas) {
    tl.fromTo(ctas,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      1.4
    );
  }

  // Scroll Indicator reveal
  if (scrollIndicator) {
    tl.fromTo(scrollIndicator,
      { opacity: 0 },
      { opacity: 1, duration: 1.0 },
      1.7
    );
  }

  return tl;
};

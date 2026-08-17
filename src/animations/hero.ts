import { gsap, cinematicEase } from './utils';

export interface HeroAnimationRefs {
  container: HTMLElement | null;
  beat1: HTMLElement | null;
  beat2: HTMLElement | null;
  beat3: HTMLElement | null;
  beat4: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
}

export const animateHeroScroll = (refs: HeroAnimationRefs) => {
  const { container, beat1, beat2, beat3, beat4, scrollIndicator } = refs;
  if (!container) return;

  // 1. ENTRANCE TIMELINE (Plays once on page load for initial Beat 1)
  const entranceTl = gsap.timeline({
    defaults: { ease: cinematicEase }
  });

  if (beat1) {
    entranceTl.fromTo(beat1, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4 }, 0.4);
  }

  if (scrollIndicator) {
    entranceTl.fromTo(scrollIndicator, { opacity: 0 }, { opacity: 1, duration: 1.0 }, 1.2);
  }

  // 2. SCROLL TIMELINE (Continuous seamless scrub through the hero sequence)
  // Total timeline duration: 10.0 (perfectly synchronized with useGlobalScrollCamera's 10.0 timeline)
  //
  // Beat 1: 0.0 - 2.5 (Arrival) -> Active at start, begins fading out at 1.4, fully out by 2.4
  // Beat 2: 2.0 - 5.0 (Architecture) -> Fades in 2.0-2.7, holds 2.7-4.1, fades out 4.1-4.9
  // Beat 3: 4.5 - 7.5 (Light / Residences) -> Fades in 4.5-5.2, holds 5.2-6.7, fades out 6.7-7.5
  // Beat 4: 7.0 - 10.0 (Final Reveal / CTA) -> Fades in 7.0-7.8, holds 7.8-10.0 (Interactive)

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
    }
  });

  // Beat 1: Exits smoothly as scroll begins (0.8 -> 1.8)
  if (beat1) {
    scrollTl.to(beat1, { opacity: 0, y: -20, ease: 'power1.inOut', duration: 1.0 }, 0.8);
  }
  if (scrollIndicator) {
    scrollTl.to(scrollIndicator, { opacity: 0, ease: 'power1.inOut', duration: 0.5 }, 0.4);
  }

  // Beat 2: Enters as Beat 1 exits (1.2 -> 4.6)
  if (beat2) {
    scrollTl.fromTo(
      beat2,
      { opacity: 0, y: 20, pointerEvents: 'none' },
      { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'power1.out', duration: 0.6 },
      1.2
    );
    scrollTl.to(
      beat2,
      { opacity: 0, y: -20, pointerEvents: 'none', ease: 'power1.in', duration: 0.6 },
      4.0
    );
  }

  // Beat 3: Enters as Beat 2 exits (3.8 -> 7.2)
  if (beat3) {
    scrollTl.fromTo(
      beat3,
      { opacity: 0, y: 20, pointerEvents: 'none' },
      { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'power1.out', duration: 0.6 },
      3.8
    );
    scrollTl.to(
      beat3,
      { opacity: 0, y: -20, pointerEvents: 'none', ease: 'power1.in', duration: 0.6 },
      6.6
    );
  }

  // Beat 4: Enters as Beat 3 exits and holds firmly (6.4 -> 10.0)
  if (beat4) {
    scrollTl.fromTo(
      beat4,
      { opacity: 0, y: 20, pointerEvents: 'none' },
      { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'power1.out', duration: 0.6 },
      6.4
    );
    scrollTl.to({}, { duration: 3.0 }, 7.0);
  }

  return { entrance: entranceTl, scroll: scrollTl, revert: () => { entranceTl.kill(); scrollTl.kill(); } };
};

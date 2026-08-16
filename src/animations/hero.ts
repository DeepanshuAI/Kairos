import { gsap, cinematicEase, smoothScrub } from './utils';

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

  // 1. ENTRANCE TIMELINE (Plays once on load for Beat 1)
  const entranceTl = gsap.timeline({
    defaults: { ease: cinematicEase }
  });

  if (beat1) {
    entranceTl.fromTo(beat1, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, 0.5);
  }

  if (scrollIndicator) {
    entranceTl.fromTo(scrollIndicator, { opacity: 0 }, { opacity: 1, duration: 1.0 }, 1.5);
  }

  // 2. SCROLL TIMELINE (Scrubbing effect on scroll through the 400vh container)
  // The scroll timeline is divided into 4 beats. 
  // 0-25%: Beat 1 holds, then exits
  // 25-50%: Beat 2 enters, holds, then exits
  // 50-75%: Beat 3 enters, holds, then exits
  // 75-100%: Beat 4 enters and holds

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: smoothScrub,
    }
  });

  // Fade out Beat 1 and Scroll Indicator
  if (beat1) {
    scrollTl.to(beat1, { opacity: 0, y: -30, ease: 'power1.inOut', duration: 1 }, 0.5); // 0.5 to 1.5 in relative time
  }
  if (scrollIndicator) {
    scrollTl.to(scrollIndicator, { opacity: 0, ease: 'power1.inOut', duration: 0.5 }, 0.5);
  }

  // Beat 2 Enter -> Hold -> Exit
  if (beat2) {
    scrollTl.fromTo(beat2, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'power1.out', duration: 1 }, 1.5);
    scrollTl.to(beat2, { opacity: 0, y: -30, ease: 'power1.in', duration: 1 }, 3.5);
  }

  // Beat 3 Enter -> Hold -> Exit
  if (beat3) {
    scrollTl.fromTo(beat3, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'power1.out', duration: 1 }, 4.5);
    scrollTl.to(beat3, { opacity: 0, y: -30, ease: 'power1.in', duration: 1 }, 6.5);
  }

  // Beat 4 Enter -> Hold
  if (beat4) {
    scrollTl.fromTo(beat4, { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'power1.out', duration: 1 }, 7.5);
    // Add a little extra space so it holds until the very end
    scrollTl.to({}, { duration: 1.5 });
  }

  return { entrance: entranceTl, scroll: scrollTl, revert: () => { entranceTl.kill(); scrollTl.kill(); } };
};

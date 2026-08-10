import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../animations/utils';

export interface CameraKeyframe {
  pos: [number, number, number];
  target: [number, number, number];
  label: string;
  sublabel: string;
}

export const CAMERA_STAGES: CameraKeyframe[] = [
  {
    pos: [24, 12, 24],
    target: [0, 2, 0],
    label: 'STAGE 01 • EXTERIOR',
    sublabel: 'THE RESIDENCE',
  },
  {
    pos: [16, 7, 16],
    target: [1, 2, 0],
    label: 'STAGE 02 • APPROACH',
    sublabel: 'FORM',
  },
  {
    pos: [9, 5, 11],
    target: [2, 3, 0],
    label: 'STAGE 03 • REVEAL',
    sublabel: 'STRUCTURE & LOUVERS',
  },
  {
    pos: [3.5, 2.5, 5],
    target: [1, 2.2, 0],
    label: 'STAGE 04 • ENTER',
    sublabel: 'GLASS THRESHOLD',
  },
  {
    pos: [0.5, 2.2, 1.8],
    target: [-1, 2.2, -1],
    label: 'STAGE 05 • INTERIOR',
    sublabel: 'LIVING PAVILION',
  },
  {
    pos: [-2, 2.5, 3.5],
    target: [2, 2.5, 0],
    label: 'STAGE 06 • LIGHT',
    sublabel: 'TEMPORAL ATMOSPHERE',
  },
  {
    pos: [20, 10, 20],
    target: [0, 2, 0],
    label: 'STAGE 07 • FULL EXPERIENCE',
    sublabel: 'KAIROS PRIVATE ESTATE',
  },
];

export const useResidenceScroll = (
  containerRef: React.RefObject<HTMLElement | null>,
  stageTextRef?: React.RefObject<HTMLElement | null>,
  subtextRef?: React.RefObject<HTMLElement | null>
) => {
  const currentPos = useRef<[number, number, number]>([...CAMERA_STAGES[0].pos]);
  const currentTarget = useRef<[number, number, number]>([...CAMERA_STAGES[0].target]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    // Responsive setup for Desktop (>= 1024px)
    mm.add('(min-width: 1024px)', () => {
      const scrollObj = { progress: 0 };
      gsap.to(scrollObj, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            updateCameraAndText(self.progress);
          },
        },
      });
    });

    // Responsive setup for Mobile / Tablet (< 1024px)
    mm.add('(max-width: 1023px)', () => {
      const scrollObj = { progress: 0 };
      gsap.to(scrollObj, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=180%', // Shorter scroll distance for mobile
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            updateCameraAndText(self.progress);
          },
        },
      });
    });

    const updateCameraAndText = (p: number) => {
      const totalStages = CAMERA_STAGES.length - 1;
      const rawIndex = p * totalStages;
      const stageIdx = Math.floor(rawIndex);
      const factor = rawIndex - stageIdx;

      const s1 = CAMERA_STAGES[Math.min(stageIdx, totalStages)];
      const s2 = CAMERA_STAGES[Math.min(stageIdx + 1, totalStages)];

      currentPos.current = [
        s1.pos[0] + (s2.pos[0] - s1.pos[0]) * factor,
        s1.pos[1] + (s2.pos[1] - s1.pos[1]) * factor,
        s1.pos[2] + (s2.pos[2] - s1.pos[2]) * factor,
      ];

      currentTarget.current = [
        s1.target[0] + (s2.target[0] - s1.target[0]) * factor,
        s1.target[1] + (s2.target[1] - s1.target[1]) * factor,
        s1.target[2] + (s2.target[2] - s1.target[2]) * factor,
      ];

      if (stageTextRef?.current && s1.label) {
        stageTextRef.current.innerText = s1.label;
      }
      if (subtextRef?.current && s1.sublabel) {
        subtextRef.current.innerText = s1.sublabel;
      }
    };

    return () => {
      mm.revert();
    };
  }, [containerRef, stageTextRef, subtextRef]);

  return { currentPos, currentTarget };
};

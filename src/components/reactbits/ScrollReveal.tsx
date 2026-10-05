'use client';

import { useEffect, useRef, useMemo, type FC, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
  children: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

export const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.15,
  baseRotation = 2,
  blurStrength = 3,
  containerClassName = '',
  textClassName = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const reducedMotion = Boolean(
    prefersReduced ||
    (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block scroll-reveal-word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const el = containerRef.current;
    const wordElements = el.querySelectorAll<HTMLElement>('.scroll-reveal-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=5%',
            end: 'bottom center',
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity, filter' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=15%',
            end: 'bottom center+=10%',
            scrub: 1
          }
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.04,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom-=15%',
              end: 'bottom center+=10%',
              scrub: 1
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, enableBlur, baseRotation, baseOpacity, blurStrength]);

  if (reducedMotion) {
    return (
      <div className={`my-4 ${containerClassName}`}>
        <p className={`text-xl sm:text-2xl leading-relaxed text-swap-text ${textClassName}`}>
          {children}
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`my-4 ${containerClassName}`}>
      <p className={`text-xl sm:text-2xl leading-relaxed text-swap-text ${textClassName}`}>
        {splitText}
      </p>
    </div>
  );
};

export default ScrollReveal;

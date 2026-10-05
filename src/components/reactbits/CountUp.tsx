'use client';

import { useEffect, useRef, type FC } from 'react';
import { useInView, useReducedMotion, animate } from 'motion/react';

export interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  className?: string;
  locale?: string;
}

export const CountUp: FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1.8,
  delay = 0,
  prefix = '',
  className = '',
  locale = 'en-IN'
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(spanRef, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const isReduced = Boolean(
    prefersReduced ||
    (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    if (isReduced) {
      node.textContent = `${prefix}${to.toLocaleString(locale)}`;
      return;
    }

    if (inView) {
      const controls = animate(from, to, {
        duration,
        delay,
        ease: 'easeOut',
        onUpdate(value) {
          node.textContent = `${prefix}${Math.round(value).toLocaleString(locale)}`;
        }
      });

      return () => controls.stop();
    }
  }, [inView, from, to, duration, delay, prefix, locale, isReduced]);

  return (
    <span ref={spanRef} className={className}>
      {prefix}
      {isReduced ? to.toLocaleString(locale) : from.toLocaleString(locale)}
    </span>
  );
};

export default CountUp;

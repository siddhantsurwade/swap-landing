'use client';

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  className?: string;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-md border-2 border-swap-text bg-swap-surface shadow-nb [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] cursor-pointer select-none transition-shadow hover:shadow-nb-lg ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.4,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

export const CardSwap: React.FC<CardSwapProps> = ({
  width = 'clamp(300px, 34vw, 560px)',
  height = 'clamp(225px, 25.5vw, 420px)',
  cardDistance = 48,
  verticalDistance = 52,
  delay = 2250,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 5,
  easing = 'elastic',
  className = '',
  children
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6, 0.9)',
          durDrop: 1.05,
          durMove: 1.05,
          durReturn: 1.05,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.48,
          durMove: 0.48,
          durReturn: 0.48,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  // On mobile: limit to at most 4 cards
  const childArr = useMemo(() => {
    const all = Children.toArray(children) as ReactElement<CardProps>[];
    return isMobile ? all.slice(0, 4) : all;
  }, [children, isMobile]);

  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr]
  );

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  // Reset order when length changes
  useEffect(() => {
    order.current = Array.from({ length: childArr.length }, (_, i) => i);
  }, [childArr.length]);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef<boolean>(false);

  // Responsive distances
  const effectiveCardDist = isMobile ? Math.min(cardDistance, 32) : cardDistance;
  const effectiveVertDist = isMobile ? Math.min(verticalDistance, 36) : verticalDistance;
  const effectiveSkew = isMobile ? Math.min(skewAmount, 3.5) : skewAmount;

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, effectiveCardDist, effectiveVertDist, total), effectiveSkew);
      }
    });

    // If reduced motion is requested, do not run the continuous swapping loop
    if (prefersReduced) return;

    const swap = () => {
      if (order.current.length < 2 || isPausedRef.current) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      // Drop front card down
      tl.to(elFront, {
        y: '+=420',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);

      // Promote rest of the cards forward
      rest.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;
        const slot = makeSlot(i, effectiveCardDist, effectiveVertDist, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.12}`
        );
      });

      // Send front card back to the tail of the stack
      const backSlot = makeSlot(refs.length - 1, effectiveCardDist, effectiveVertDist, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // Initial interval
    intervalRef.current = window.setInterval(swap, delay);

    // Pause / Resume helpers
    const pauseAnim = () => {
      isPausedRef.current = true;
      tlRef.current?.pause();
      clearInterval(intervalRef.current);
    };

    const resumeAnim = () => {
      isPausedRef.current = false;
      tlRef.current?.play();
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(swap, delay);
    };

    // Pause on hover and touch
    const node = container.current;
    if (node && pauseOnHover) {
      node.addEventListener('mouseenter', pauseAnim);
      node.addEventListener('mouseleave', resumeAnim);
      node.addEventListener('touchstart', pauseAnim, { passive: true });
      node.addEventListener('touchend', resumeAnim, { passive: true });
    }

    // Pause when hero is scrolled out of view
    let observer: IntersectionObserver | null = null;
    if (node && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              resumeAnim();
            } else {
              pauseAnim();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(node);
    }

    return () => {
      clearInterval(intervalRef.current);
      tlRef.current?.kill();
      if (node && pauseOnHover) {
        node.removeEventListener('mouseenter', pauseAnim);
        node.removeEventListener('mouseleave', resumeAnim);
        node.removeEventListener('touchstart', pauseAnim);
        node.removeEventListener('touchend', resumeAnim);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [
    effectiveCardDist,
    effectiveVertDist,
    delay,
    pauseOnHover,
    effectiveSkew,
    easing,
    config.durDrop,
    config.durMove,
    config.durReturn,
    config.ease,
    config.promoteOverlap,
    config.returnDelay,
    refs
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className={`relative perspective-[1100px] overflow-visible flex items-center justify-center ${className}`.trim()}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;

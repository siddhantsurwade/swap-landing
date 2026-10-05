'use client';

import { useRef, useState, type FC, type ReactNode, type MouseEvent } from 'react';
import { useReducedMotion } from 'motion/react';

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'var(--swap-spotlight-glow)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ '--spotlight-color': spotlightColor } as React.CSSProperties}
      className={`group relative overflow-hidden rounded-3xl bg-swap-surface border border-swap-border shadow-swap-card hover:shadow-swap-hover hover:border-swap-lilac transition-all duration-300 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {!prefersReducedMotion && (
        <div
          className={`pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color), transparent 80%)`
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;

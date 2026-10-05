import type { FC, ReactNode } from 'react';

export type TagVariant = 'surface' | 'pink' | 'lilac' | 'cream';

export interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
  dotColor?: 'pink' | 'lilac' | 'primary';
}

const VARIANT_MAP: Record<TagVariant, string> = {
  surface: 'bg-swap-surface text-swap-text',
  pink: 'bg-swap-pink text-swap-text',
  lilac: 'bg-swap-lilac text-swap-text',
  cream: 'bg-swap-cream text-swap-text'
};

const DOT_MAP: Record<'pink' | 'lilac' | 'primary', string> = {
  pink: 'bg-swap-pink',
  lilac: 'bg-swap-lilac',
  primary: 'bg-swap-primary'
};

export const Tag: FC<TagProps> = ({
  variant = 'surface',
  children,
  className = '',
  dotColor
}) => {
  const variantClasses = VARIANT_MAP[variant] || VARIANT_MAP.surface;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-display uppercase tracking-wider font-bold rounded-none sm:rounded-sm border-2 border-swap-text shadow-nb-sm select-none ${variantClasses} ${className}`.trim()}
    >
      <span>{children}</span>
      {dotColor && (
        <span
          className={`w-2 h-2 rounded-full border border-swap-text shrink-0 ${DOT_MAP[dotColor]}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export default Tag;

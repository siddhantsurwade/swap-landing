import type { FC, ReactNode, ElementType } from 'react';

export type NbCardVariant = 'pink' | 'lilac' | 'white' | 'cream';

export interface NbCardProps {
  variant?: NbCardVariant;
  className?: string;
  children: ReactNode;
  as?: ElementType;
}

const VARIANT_MAP: Record<NbCardVariant, string> = {
  pink: 'bg-swap-pink text-swap-text',
  lilac: 'bg-swap-lilac text-swap-text',
  white: 'bg-swap-surface text-swap-text',
  cream: 'bg-swap-cream text-swap-text'
};

export const NbCard: FC<NbCardProps> = ({
  variant = 'white',
  className = '',
  children,
  as: Component = 'div'
}) => {
  const variantClasses = VARIANT_MAP[variant] || VARIANT_MAP.white;
  return (
    <Component
      className={`border-2 border-swap-text rounded-md shadow-nb-sm sm:shadow-nb ${variantClasses} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default NbCard;

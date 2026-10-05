import type { FC } from 'react';

export interface PlaceholderProps {
  src?: string | null;
  image?: string | null;
  alt: string;
  name: string;
  bgTheme?: 'pink-light' | 'lilac-light' | 'cream' | 'pink-blush';
  aspectRatio?: '4/3' | 'square' | 'auto';
  className?: string;
}

const THEME_CLASSES: Record<NonNullable<PlaceholderProps['bgTheme']>, string> = {
  'pink-light': 'bg-swap-pink-light',
  'lilac-light': 'bg-swap-lilac-light',
  cream: 'bg-swap-cream',
  'pink-blush': 'bg-swap-pink-blush'
};

export const Placeholder: FC<PlaceholderProps> = ({
  src,
  image,
  alt,
  name,
  bgTheme = 'pink-light',
  aspectRatio = '4/3',
  className = ''
}) => {
  const bgClass = THEME_CLASSES[bgTheme] || THEME_CLASSES['pink-light'];
  const imageSrc = src ?? image;

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'auto'
        ? ''
        : 'aspect-[4/3]';

  return (
    <div
      className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden border border-swap-border flex items-center justify-center ${className}`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center justify-center p-3 text-center select-none ${bgClass}`}
        >
          <span className="font-heading font-bold text-sm sm:text-base text-swap-primary tracking-tight leading-tight">
            {name}
          </span>
        </div>
      )}
    </div>
  );
};

export default Placeholder;

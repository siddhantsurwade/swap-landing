import type { FC, ReactNode } from 'react';

export interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  as?: 'section' | 'div' | 'header' | 'footer';
  background?: ReactNode;
  hasTopDivider?: boolean;
}

export const SectionWrapper: FC<SectionWrapperProps> = ({
  children,
  id,
  className = '',
  containerClassName = '',
  as: Component = 'section',
  background,
  hasTopDivider = true
}) => {
  const dividerClass = hasTopDivider ? 'border-t-2 border-swap-text' : '';

  return (
    <Component
      id={id}
      className={`w-full relative scroll-mt-20 sm:scroll-mt-24 ${dividerClass} ${className}`.trim()}
    >
      {background}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </Component>
  );
};

export default SectionWrapper;

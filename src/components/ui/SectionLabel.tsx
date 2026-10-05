import type { FC } from 'react';

export interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export const SectionLabel: FC<SectionLabelProps> = ({ number, label, className = '' }) => {
  return (
    <div
      className={`inline-flex items-stretch border-2 border-swap-text rounded-md shadow-nb-sm overflow-hidden mb-4 select-none ${className}`.trim()}
    >
      <span className="bg-swap-pink text-swap-text font-display text-xs sm:text-sm px-2.5 sm:px-3 py-1 border-r-2 border-swap-text flex items-center font-bold">
        {number}
      </span>
      <span className="bg-swap-surface text-swap-text font-bold text-xs sm:text-sm px-3 sm:px-3.5 py-1 flex items-center uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

export default SectionLabel;

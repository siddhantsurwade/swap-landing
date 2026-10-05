import { useState, type FC, type ReactNode } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Tag from '../ui/Tag';

export interface AccordionItemData {
  id?: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  tag?: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number | null;
  idPrefix?: string;
  className?: string;
  iconType?: 'chevron' | 'plus-minus';
}

export const Accordion: FC<AccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  idPrefix = 'accordion',
  className = 'space-y-3.5',
  iconType = 'chevron'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${idPrefix}-trigger-${index}`;
        const regionId = `${idPrefix}-desc-${index}`;

        return (
          <div
            key={item.id ?? index}
            className={`rounded-md border-2 border-swap-text shadow-nb-sm overflow-hidden transition-colors ${
              isOpen ? 'bg-swap-pink text-swap-text' : 'bg-swap-surface text-swap-text hover:bg-swap-cream'
            }`}
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={regionId}
              onClick={() => toggleItem(index)}
              className="w-full p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary select-none"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 w-full mr-2 sm:mr-3">
                <h4 className="font-display uppercase text-lg sm:text-xl text-swap-text leading-[0.95] tracking-tight">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <span className="sm:ml-auto text-sm sm:text-base font-bold text-swap-text sm:text-right shrink-0">
                    {item.subtitle}
                  </span>
                )}
              </div>
              <div
                className={`w-9 h-9 rounded-none sm:rounded-sm bg-swap-surface border-2 border-swap-text shadow-nb-sm text-swap-text flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  iconType === 'chevron' ? (isOpen ? 'rotate-180 bg-swap-pink' : '') : ''
                }`}
              >
                {iconType === 'plus-minus' ? (
                  isOpen ? (
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  )
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={regionId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={
                    prefersReducedMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }
                  }
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={
                    prefersReducedMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t-2 border-swap-text flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-base text-swap-text font-medium">
                    <div className="leading-relaxed">{item.content}</div>
                    {item.tag && (
                      <div className="self-start sm:self-auto shrink-0">
                        <Tag variant="cream">{item.tag}</Tag>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;

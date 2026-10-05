import type { FC } from 'react';
import ScrollVelocity from '../reactbits/ScrollVelocity';

export const MarqueeStrip: FC = () => {
  const marqueeContent = (
    <span className="inline-flex items-center gap-7 px-4 text-base sm:text-lg font-display uppercase tracking-wider text-swap-primary">
      <span className="hover:opacity-85 transition-opacity">Second-hand marketplace</span>
      <span className="w-2 h-2 rounded-full bg-swap-primary" />
      <span className="hover:opacity-85 transition-opacity">Private by design</span>
      <span className="w-2 h-2 rounded-full bg-swap-primary" />
      <span className="hover:opacity-85 transition-opacity">Verified handover</span>
      <span className="w-2 h-2 rounded-full bg-swap-primary" />
      <span className="hover:opacity-85 transition-opacity">Campus focused</span>
      <span className="w-2 h-2 rounded-full bg-swap-primary" />
    </span>
  );

  return (
    <div className="w-full relative overflow-x-clip z-20 -my-3 sm:-my-5 pointer-events-none">
      <div className="w-[114%] -ml-[7%] bg-swap-lilac py-3.5 sm:py-4 -rotate-1 border-y-2 border-swap-text shadow-nb pointer-events-auto select-none">
        <ScrollVelocity
          texts={[marqueeContent]}
          velocity={22}
          numCopies={5}
          className="text-swap-primary font-bold"
        />
      </div>
    </div>
  );
};

export default MarqueeStrip;

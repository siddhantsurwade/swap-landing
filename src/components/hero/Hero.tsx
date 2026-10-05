import type { FC } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import RotatingText from '../reactbits/RotatingText';
import { CardSwap, Card } from '../reactbits/CardSwap';
import BlobBackdrop from '../ui/BlobBackdrop';
import NbButton from '../ui/NbButton';
import Tag from '../ui/Tag';
import Placeholder from '../common/Placeholder';
import { IMAGES } from '../../constants/images';

const HERO_SLOTS = [
  IMAGES.hero.books,
  IMAGES.hero.calculator,
  IMAGES.hero.bicycle,
  IMAGES.hero.dorm,
  IMAGES.hero.hoodie
];

const BG_THEMES: ('pink-light' | 'lilac-light' | 'cream' | 'pink-blush')[] = [
  'pink-light',
  'lilac-light',
  'cream',
  'pink-blush',
  'lilac-light'
];

export const Hero: FC = () => {
  return (
    <SectionWrapper
      id="hero"
      hasTopDivider={false}
      className="min-h-[calc(100svh-5rem)] flex flex-col justify-center py-10 sm:py-14 lg:py-16 overflow-hidden bg-swap-pink-blush"
      containerClassName="relative z-10 w-full my-auto"
      background={<BlobBackdrop />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center w-full">
        {/* Left Column: Headline, subtext, and CTAs aligned flush with section bounds */}
        <div className="lg:col-span-6 flex flex-col items-start text-left w-full max-w-xl lg:max-w-2xl">
          {/* Accessible static H1 for screen readers */}
          <h1 className="sr-only">Buy. Sell. Repeat.</h1>

          {/* Visual headline: only rotating chip (+20% larger), carry the hero */}
          <div
            aria-hidden="true"
            className="font-display uppercase text-[clamp(2.5rem,7.5vw,3.25rem)] sm:text-6xl lg:text-[clamp(4.5rem,5.5vw,6rem)] text-swap-text tracking-tight leading-[0.95] mb-6"
          >
            <div className="flex items-center">
              <span className="relative inline-flex items-center justify-center bg-swap-pink text-swap-text border-[3px] border-swap-text shadow-nb-lg rounded-none sm:rounded-sm px-5 sm:px-6 lg:px-7 py-1.5 sm:py-2 overflow-hidden">
                {/* Invisible in-flow sizer for the longest word ('REPEAT.') */}
                <span
                  aria-hidden="true"
                  className="invisible select-none opacity-0 pointer-events-none font-display uppercase whitespace-nowrap"
                >
                  REPEAT.
                </span>
                {/* Centered visible rotating word */}
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <RotatingText
                    texts={['BUY.', 'SELL.', 'REPEAT.', 'SWAP.']}
                    mainClassName="justify-center text-swap-text font-display uppercase w-full text-center"
                    splitLevelClassName="justify-center"
                    staggerDuration={0.025}
                    rotationInterval={2400}
                  />
                </span>
              </span>
            </div>
          </div>

          {/* Plain, clear, and precise body copy with full text-swap-text contrast over splash */}
          <p className="text-[18px] sm:text-xl lg:text-[clamp(1.25rem,1.4vw,1.625rem)] text-swap-text leading-[1.5] max-w-xl lg:max-w-2xl mb-8 font-medium">
            SWAP brings campus buying, selling, services, accommodation and lost &amp; found into one trusted student ecosystem.
          </p>

          {/* Primary & Secondary CTAs with identical heights and clean rhythm */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <NbButton
              variant="primary"
              href="#marketplace"
              className="w-full sm:w-auto h-14 sm:h-[58px] !px-8 sm:!px-9 text-base sm:text-lg !shadow-nb-lg flex items-center justify-center"
            >
              <span>Explore marketplace</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </NbButton>
            <NbButton
              variant="secondary"
              href="#sell"
              className="w-full sm:w-auto h-14 sm:h-[58px] !px-8 sm:!px-9 text-base sm:text-lg !shadow-nb-lg flex items-center justify-center"
            >
              Start selling
            </NbButton>
          </div>
        </div>

        {/* Right Column: React Bits CardSwap stack vertically centered and shifted slightly to the right */}
        <div className="lg:col-span-6 flex items-center justify-center relative mt-10 lg:mt-0 w-full overflow-visible min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] translate-x-2 sm:translate-x-3 lg:translate-x-[clamp(24px,4vw,90px)]">
          <div className="relative w-full flex items-center justify-center py-4 sm:py-6 overflow-visible">
            <CardSwap
              width="clamp(300px, 34vw, 560px)"
              height="clamp(225px, 25.5vw, 420px)"
              cardDistance={48}
              verticalDistance={52}
              delay={2250}
              pauseOnHover={true}
            >
              {HERO_SLOTS.map((slot, idx) => (
                <Card
                  key={idx}
                  className="w-full h-full p-2.5 sm:p-3"
                >
                  <div className="relative w-full h-full rounded-sm overflow-hidden bg-swap-bg">
                    <Placeholder
                      src={slot.src}
                      alt={slot.alt}
                      name={slot.name}
                      aspectRatio="4/3"
                      bgTheme={BG_THEMES[idx % BG_THEMES.length]}
                      className="w-full h-full rounded-sm"
                    />
                    {/* Tag badge with "Sample" */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center pointer-events-none z-30">
                      <Tag variant="surface" dotColor="lilac">
                        Sample
                      </Tag>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Hero;

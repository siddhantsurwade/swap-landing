import type { FC } from 'react';
import { ArrowRight, ArrowDown, MessageSquareX, ShieldAlert, Store } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import ScrollReveal from '../reactbits/ScrollReveal';
import SectionLabel from '../ui/SectionLabel';
import NbCard from '../ui/NbCard';
import Tag from '../ui/Tag';

export const ProblemSection: FC = () => {
  return (
    <SectionWrapper id="problem" className="bg-swap-cream py-12 sm:py-16 lg:py-20">
      {/* Shared Section Label chip */}
      <SectionLabel number="01" label="The problem" />

      {/* Section Headline */}
      <h2 className="font-display uppercase text-[clamp(2.25rem,5.5vw,4.25rem)] text-swap-text tracking-tight leading-[0.95] mb-4">
        Campus commerce should be easier.
      </h2>

      {/* Intro Line */}
      <div className="mb-8 sm:mb-10">
        <ScrollReveal textClassName="text-base sm:text-lg text-swap-text font-medium max-w-3xl">
          Student deals deserve more structure than disappearing messages, unclear handovers and scattered notice boards.
        </ScrollReveal>
      </div>

      {/* Side-by-side Desktop Layout (reduces height by ~40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Three compact problem cards stacked */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Card 1: pink */}
          <NbCard variant="pink" className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-3xl sm:text-4xl text-swap-text tracking-tight leading-none">
                  01
                </span>
                <div className="w-9 h-9 rounded-md bg-swap-surface border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text">
                  <MessageSquareX className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
              <h3 className="font-display uppercase text-lg sm:text-xl text-swap-text mb-1.5 leading-[0.95] tracking-tight">
                Messy chat groups
              </h3>
              <p className="text-sm sm:text-base text-swap-text font-medium leading-relaxed">
                Listings disappear as new messages push them away.
              </p>
            </div>
          </NbCard>

          {/* Card 2: lilac */}
          <NbCard variant="lilac" className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-3xl sm:text-4xl text-swap-text tracking-tight leading-none">
                  02
                </span>
                <div className="w-9 h-9 rounded-md bg-swap-surface border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text">
                  <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
              <h3 className="font-display uppercase text-lg sm:text-xl text-swap-text mb-1.5 leading-[0.95] tracking-tight">
                No trust layer
              </h3>
              <p className="text-sm sm:text-base text-swap-text font-medium leading-relaxed">
                There is often no structured way to protect the transaction or verify handover.
              </p>
            </div>
          </NbCard>

          {/* Card 3: white / surface */}
          <NbCard variant="white" className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-3xl sm:text-4xl text-swap-text tracking-tight leading-none">
                  03
                </span>
                <div className="w-9 h-9 rounded-md bg-swap-cream border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text">
                  <Store className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
              <h3 className="font-display uppercase text-lg sm:text-xl text-swap-text mb-1.5 leading-[0.95] tracking-tight">
                No dedicated campus market
              </h3>
              <p className="text-sm sm:text-base text-swap-text font-medium leading-relaxed">
                Books, electronics and essentials are scattered across informal channels.
              </p>
            </div>
          </NbCard>
        </div>

        {/* Right Column: Before / After Visual Transition Card */}
        <div className="lg:col-span-7 flex flex-col">
          <NbCard variant="white" className="h-full p-6 sm:p-7 flex flex-col justify-start">
            <div className="text-center mb-6">
              <Tag variant="cream" className="mb-2">
                The transition
              </Tag>
              <h3 className="font-display uppercase text-xl sm:text-2xl text-swap-text mt-1 leading-[0.95] tracking-tight">
                From chat chaos to structured listings
              </h3>
            </div>

            <div className="flex-1 w-full flex flex-col md:flex-row items-stretch justify-between gap-6 my-auto">
              {/* Before: Four chat bubbles with notebook paper grid */}
              <div className="relative flex-1 w-full flex flex-col justify-between p-4 sm:p-5 rounded-md border-2 border-swap-text bg-swap-surface overflow-hidden">
                {/* Notebook paper grid texture */}
                <div aria-hidden="true" className="absolute inset-0 bg-grid pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col h-full justify-between">
                  <span className="text-xs font-display uppercase tracking-wider text-swap-text font-bold mb-3 block self-start">
                    Before: Chat threads
                  </span>

                  <div className="w-full flex-1 flex flex-col justify-around gap-3 max-w-[360px] mx-auto py-2">
                    <div className="animate-float-1 self-start max-w-[90%]">
                      <div className="-rotate-2 bg-swap-pink border-2 border-swap-text rounded-md px-4.5 py-3 shadow-nb-sm">
                        <p className="font-bold text-base text-swap-text leading-snug">
                          &ldquo;Anyone selling a calculator?&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="animate-float-2 self-end max-w-[85%]">
                      <div className="rotate-2 bg-swap-lilac border-2 border-swap-text rounded-md px-4.5 py-2.5 shadow-nb-sm">
                        <p className="font-bold text-base text-swap-text leading-snug">
                          &ldquo;DM me!&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="animate-float-3 self-start ml-2 max-w-[85%]">
                      <div className="-rotate-1.5 bg-swap-surface border-2 border-swap-text rounded-md px-4.5 py-2.5 shadow-nb-sm">
                        <p className="font-bold text-base text-swap-text leading-snug">
                          &ldquo;Price?&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="animate-float-4 self-end max-w-[92%]">
                      <div className="rotate-1.5 bg-swap-cream border-2 border-swap-text rounded-md px-4.5 py-3 shadow-nb-sm">
                        <p className="font-bold text-base text-swap-text leading-snug">
                          &ldquo;Book still available?&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow divider */}
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0 self-center">
                <div className="w-10 h-10 rounded-md bg-swap-pink border-2 border-swap-text text-swap-text shadow-nb-sm flex items-center justify-center font-bold">
                  <ArrowRight className="w-4 h-4 hidden md:block stroke-[2.5]" />
                  <ArrowDown className="w-4 h-4 block md:hidden stroke-[2.5]" />
                </div>
              </div>

              {/* After: Clean listing card stretched to match */}
              <div className="flex-1 w-full flex flex-col justify-between">
                <div className="w-full h-full flex flex-col justify-between bg-swap-surface rounded-md border-2 border-swap-text shadow-nb-sm p-5 sm:p-6">
                  <div>
                    <span className="text-xs font-display uppercase tracking-wider text-swap-primary font-bold mb-3 block self-start">
                      After: SWAP listing
                    </span>

                    <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-swap-text">
                      <h4 className="font-display uppercase text-lg sm:text-xl text-swap-text leading-[0.95] tracking-tight">
                        Calculators
                      </h4>
                      <Tag variant="pink">Sample</Tag>
                    </div>
                  </div>

                  <div className="space-y-3.5 my-auto py-2">
                    <div className="flex items-center justify-between p-3.5 rounded-sm bg-swap-cream border-2 border-swap-text text-base">
                      <span className="font-bold text-swap-text">Engineering calculator</span>
                      <span className="font-display text-swap-text shrink-0 ml-2">₹650</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-sm bg-swap-cream border-2 border-swap-text text-base">
                      <span className="font-bold text-swap-text">Scientific calculator</span>
                      <span className="font-display text-swap-text shrink-0 ml-2">₹500</span>
                    </div>
                  </div>

                  <div className="pt-3.5 mt-2 border-t-2 border-swap-text flex items-center justify-between text-sm text-swap-text">
                    <span className="font-bold">6-digit handover code</span>
                    <span className="w-3 h-3 rounded-full bg-swap-pink border-2 border-swap-text shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </NbCard>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProblemSection;


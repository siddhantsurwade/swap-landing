import type { FC } from 'react';
import { Lock } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import SectionLabel from '../ui/SectionLabel';
import Tag from '../ui/Tag';

export const SafetySection: FC = () => {
  return (
    <SectionWrapper id="safety" className="relative bg-swap-primary text-swap-surface py-12 sm:py-16 lg:py-20 border-y-2 border-swap-text overflow-hidden">
      {/* Decorative .bg-grid-light across purple band behind content */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light pointer-events-none" />

      {/* Section Label */}
      <SectionLabel number="04" label="Safety" />

      {/* Two Halves Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch relative z-10">
        {/* Left Column: Student Privacy with decorative Lock tile to match right column height */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="font-display uppercase text-[clamp(2rem,4vw,3.25rem)] text-swap-surface tracking-tight leading-[0.95] mb-4">
              Your identity isn&apos;t the product.
            </h3>
            <p className="text-base sm:text-lg text-swap-surface/90 font-medium leading-relaxed mb-6">
              Your phone number stays private while people browse. After payment, the buyer and seller receive each other&apos;s contact details to arrange their handover.
            </p>
            <div className="self-start">
              <Tag variant="pink">Privacy-first, not absolute anonymity.</Tag>
            </div>
          </div>

          {/* Decorative bordered tile matching height of moderation card */}
          <div className="bg-swap-surface text-swap-text rounded-md p-6 sm:p-7 border-2 border-swap-text shadow-[6px_6px_0_0_var(--color-swap-pink)] sm:shadow-[8px_8px_0_0_var(--color-swap-pink)] mt-8 flex-1 flex flex-col items-center justify-center text-center min-h-[160px]">
            <div className="w-12 h-12 rounded-md bg-swap-pink border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text mb-3">
              <Lock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="font-display uppercase text-2xl sm:text-3xl text-swap-text tracking-tight leading-none mb-1">
              PRIVATE
            </span>
            <span className="font-display uppercase text-xs sm:text-sm text-swap-text-muted tracking-widest font-bold">
              UNTIL NEEDED
            </span>
          </div>
        </div>

        {/* Right Column: Administrative Accountability */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="font-display uppercase text-[clamp(2rem,4vw,3.25rem)] text-swap-surface tracking-tight leading-[0.95] mb-4">
              Someone&apos;s always watching the shop.
            </h3>
            <p className="text-base sm:text-lg text-swap-surface/90 font-medium leading-relaxed mb-8">
              Administrators can review listings, manage users, monitor transaction status, investigate reports and handle disputes.
            </p>
          </div>

          {/* Moderation queue card with pink offset shadow to stand out against deep purple */}
          <div className="bg-swap-surface text-swap-text rounded-md p-6 sm:p-7 border-2 border-swap-text shadow-[6px_6px_0_0_var(--color-swap-pink)] sm:shadow-[8px_8px_0_0_var(--color-swap-pink)] flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <h4 className="font-display uppercase text-lg sm:text-xl text-swap-text">
                  Example moderation queue
                </h4>
                <div className="shrink-0">
                  <Tag variant="cream">Sample</Tag>
                </div>
              </div>

              <div className="rounded-none sm:rounded-sm bg-swap-cream p-4 sm:p-5 border-2 border-swap-text mb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-display uppercase text-base text-swap-text">
                    Scientific Calculator FX-991
                  </span>
                  <div className="self-start sm:self-auto shrink-0">
                    <Tag variant="surface">Pending review</Tag>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual-only, non-interactive review buttons styled like NbButton */}
            <div className="flex flex-wrap items-center gap-2.5" aria-disabled="true">
              <span className="px-4 py-2 text-xs font-display uppercase tracking-wider font-bold rounded-md border-2 border-swap-text shadow-nb-sm bg-swap-lilac text-swap-text select-none cursor-default pointer-events-none">
                Review
              </span>
              <span className="px-4 py-2 text-xs font-display uppercase tracking-wider font-bold rounded-md border-2 border-swap-text shadow-nb-sm bg-swap-pink text-swap-text select-none cursor-default pointer-events-none">
                Approve
              </span>
              <span className="px-4 py-2 text-xs font-display uppercase tracking-wider font-bold rounded-md border-2 border-swap-text shadow-nb-sm bg-swap-surface text-swap-text select-none cursor-default pointer-events-none">
                Reject
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SafetySection;


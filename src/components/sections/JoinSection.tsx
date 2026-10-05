import type { FC } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import NbButton from '../ui/NbButton';
import { REGISTER_URL, LOGIN_URL, MARKETPLACE_URL } from '../../constants/site';

export const JoinSection: FC = () => {
  return (
    <SectionWrapper id="join" className="relative bg-swap-pink-light py-12 sm:py-16 lg:py-20 border-y-2 border-swap-text text-center overflow-hidden">
      {/* Decorative .bg-grid across final CTA band behind content */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Logo in a circle with border-2 and shadow above the heading */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-swap-surface border-2 border-swap-text shadow-nb flex items-center justify-center p-3.5 mb-6 mx-auto">
          <img
            src="/images/logo.png"
            alt="SWAP Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Section Label */}
        <span className="inline-block px-3.5 py-1 text-xs font-display uppercase tracking-wider font-bold bg-swap-surface text-swap-text border-2 border-swap-text shadow-nb-sm mb-4">
          Get started
        </span>

        {/* Section Headline */}
        <h2 className="font-display uppercase text-[clamp(2.25rem,5.5vw,4.25rem)] text-swap-text tracking-tight leading-[0.95] mb-6">
          Built for the way students actually live.
        </h2>

        {/* Supporting Line */}
        <p className="text-lg sm:text-xl text-swap-text font-medium leading-relaxed mb-10 max-w-2xl">
          Buy what you need. Sell what you no longer need. Find your next room. Turn your skills into opportunities. Recover what matters.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
          <NbButton
            variant="primary"
            href={REGISTER_URL}
            size="md"
            className="w-full sm:w-auto"
          >
            <span>Register with SWAP</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </NbButton>

          <NbButton
            variant="secondary"
            href={MARKETPLACE_URL}
            size="md"
            className="w-full sm:w-auto"
          >
            <span>Explore the marketplace</span>
          </NbButton>
        </div>

        {/* Log In Link */}
        <p className="text-sm sm:text-base text-swap-text font-bold">
          Already have an account?{' '}
          <a
            href={LOGIN_URL}
            className="underline underline-offset-4 hover:text-swap-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs"
          >
            Log in
          </a>
        </p>
      </div>
    </SectionWrapper>
  );
};

export default JoinSection;


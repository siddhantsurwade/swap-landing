import { useState, useRef, type FC, type KeyboardEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PhoneOff, ShieldCheck, KeyRound, Check } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import SectionLabel from '../ui/SectionLabel';
import Tag from '../ui/Tag';
import { PAYMENT_NOTE } from '../../constants/site';

interface StepItem {
  number: number;
  title: string;
  description: string;
}

const BUYER_STEPS: StepItem[] = [
  {
    number: 1,
    title: 'Create account',
    description: 'Sign up with your student email.'
  },
  {
    number: 2,
    title: 'Browse campus listings',
    description: 'Find items and services from students on your campus.'
  },
  {
    number: 3,
    title: 'Pay through SWAP',
    description: 'Pay through the platform flow. The amount is controlled until the required completion step.'
  },
  {
    number: 4,
    title: 'Get seller details',
    description: 'After payment, you and the seller can contact each other to arrange handover.'
  },
  {
    number: 5,
    title: 'Meet for handover',
    description: 'Meet the seller at an agreed location and show your 6-digit code.'
  },
  {
    number: 6,
    title: 'Seller verifies',
    description: 'The seller enters your code during handover to complete the step.'
  }
];

const SELLER_STEPS: StepItem[] = [
  {
    number: 1,
    title: 'Create account',
    description: 'Sign up with your student email.'
  },
  {
    number: 2,
    title: 'Upload photos and set price',
    description: "Add photos, the item's condition and your price."
  },
  {
    number: 3,
    title: 'Listing review',
    description: 'Your listing is reviewed before it is discovered.'
  },
  {
    number: 4,
    title: 'Get discovered',
    description: 'Other students can find and buy your listing.'
  },
  {
    number: 5,
    title: 'Meet for handover',
    description: 'Meet the buyer and enter the 6-digit code they show you.'
  },
  {
    number: 6,
    title: 'Track earnings',
    description: 'Follow your listings and earnings from your seller dashboard.'
  }
];

export const HowItWorksTrustSection: FC = () => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  const prefersReducedMotion = useReducedMotion();
  const buyerTabRef = useRef<HTMLButtonElement>(null);
  const sellerTabRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeTab === 'buyer') {
        setActiveTab('seller');
        sellerTabRef.current?.focus();
      } else {
        setActiveTab('buyer');
        buyerTabRef.current?.focus();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeTab === 'seller') {
        setActiveTab('buyer');
        buyerTabRef.current?.focus();
      } else {
        setActiveTab('seller');
        sellerTabRef.current?.focus();
      }
    }
  };

  const steps = activeTab === 'buyer' ? BUYER_STEPS : SELLER_STEPS;

  return (
    <SectionWrapper id="how-it-works" className="bg-swap-pink-light/35 py-12 sm:py-16 lg:py-20">
      {/* Section Label */}
      <SectionLabel number="02" label="How it works" />

      {/* Unified Section Headline */}
      <h2 className="font-display uppercase text-[clamp(2.25rem,5.5vw,4.25rem)] text-swap-text tracking-tight leading-[0.95] mb-8">
        One transaction. Clear next steps.
      </h2>

      {/* Part 1: Buyer / Seller Steps Toggle with square tab buttons */}
      <div
        role="tablist"
        aria-label="Transaction perspective"
        onKeyDown={handleKeyDown}
        className="inline-flex gap-2 p-1.5 rounded-md border-2 border-swap-text bg-swap-surface shadow-nb-sm mb-10 select-none"
      >
        <button
          ref={buyerTabRef}
          role="tab"
          id="tab-buyer"
          aria-selected={activeTab === 'buyer'}
          aria-controls="panel-buyer"
          tabIndex={activeTab === 'buyer' ? 0 : -1}
          onClick={() => setActiveTab('buyer')}
          type="button"
          className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-none sm:rounded-sm border-2 border-swap-text text-xs sm:text-base font-display uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary ${
            activeTab === 'buyer'
              ? 'bg-swap-primary text-swap-surface shadow-nb-sm sm:shadow-nb'
              : 'bg-swap-surface text-swap-text hover:bg-swap-cream'
          }`}
        >
          Buyer flow
        </button>
        <button
          ref={sellerTabRef}
          role="tab"
          id="tab-seller"
          aria-selected={activeTab === 'seller'}
          aria-controls="panel-seller"
          tabIndex={activeTab === 'seller' ? 0 : -1}
          onClick={() => setActiveTab('seller')}
          type="button"
          className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-none sm:rounded-sm border-2 border-swap-text text-xs sm:text-base font-display uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary ${
            activeTab === 'seller'
              ? 'bg-swap-primary text-swap-surface shadow-nb-sm sm:shadow-nb'
              : 'bg-swap-surface text-swap-text hover:bg-swap-cream'
          }`}
        >
          Seller flow
        </button>
      </div>

      {/* Steps grid */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="focus:outline-none mb-12 sm:mb-16"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {steps.map((step, idx) => {
              const bgClass = idx % 2 === 0 ? 'bg-swap-surface' : 'bg-swap-lilac';

              return (
                <div
                  key={step.number}
                  className={`${bgClass} text-swap-text rounded-md p-6 sm:p-7 border-2 border-swap-text shadow-nb-sm sm:shadow-nb flex flex-col justify-between hover:bg-swap-pink focus-within:bg-swap-pink transition-colors`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-4xl sm:text-5xl text-swap-text leading-none">
                        0{step.number}
                      </span>
                      <Tag variant="surface" className="text-xs">
                        Step 0{step.number}
                      </Tag>
                    </div>
                    <h3 className="font-display uppercase text-xl sm:text-2xl text-swap-text mb-2 leading-[0.95] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="font-body text-base text-swap-text leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Part 2: Trust Architecture Anchor & Divider */}
      <div id="trust" className="scroll-mt-24 border-t-2 border-swap-text pt-10 sm:pt-14">
        {/* Subhead for trust */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h3 className="font-display uppercase text-2xl sm:text-3xl text-swap-text tracking-tight leading-[0.95] mb-3">
            Trust is part of the product.
          </h3>
          <p className="font-body text-base sm:text-lg text-swap-text font-medium leading-relaxed">
            SWAP doesn&apos;t just help students discover products. It structures the transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Side: Three trust points as bordered cards that stretch evenly to match the right column */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4 h-full">
            {/* Point 1 */}
            <div className="flex-1 flex items-start gap-4 p-5 rounded-md border-2 border-swap-text bg-swap-surface shadow-nb-sm">
              <div className="w-11 h-11 rounded-none sm:rounded-sm bg-swap-pink border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text shrink-0 mt-0.5">
                <PhoneOff className="w-5 h-5 stroke-[2.25]" />
              </div>
              <div className="flex-1">
                <span className="font-display text-xs text-swap-text tracking-wider uppercase mb-0.5 block">
                  01
                </span>
                <h4 className="font-display uppercase text-lg sm:text-xl text-swap-text mb-1 leading-[0.95] tracking-tight">
                  Private contact details
                </h4>
                <p className="font-body text-sm sm:text-base text-swap-text font-medium leading-relaxed">
                  Phone numbers stay private until payment, then buyer and seller can contact each other to arrange handover.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex-1 flex items-start gap-4 p-5 rounded-md border-2 border-swap-text bg-swap-surface shadow-nb-sm">
              <div className="w-11 h-11 rounded-none sm:rounded-sm bg-swap-pink border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 stroke-[2.25]" />
              </div>
              <div className="flex-1">
                <span className="font-display text-xs text-swap-text tracking-wider uppercase mb-0.5 block">
                  02
                </span>
                <h4 className="font-display uppercase text-lg sm:text-xl text-swap-text mb-1 leading-[0.95] tracking-tight">
                  Platform-mediated payment
                </h4>
                <p className="font-body text-sm sm:text-base text-swap-text font-medium leading-relaxed">
                  The buyer pays through the platform flow, and the amount is controlled until the required completion step.
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex-1 flex items-start gap-4 p-5 rounded-md border-2 border-swap-text bg-swap-surface shadow-nb-sm">
              <div className="w-11 h-11 rounded-none sm:rounded-sm bg-swap-pink border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text shrink-0 mt-0.5">
                <KeyRound className="w-5 h-5 stroke-[2.25]" />
              </div>
              <div className="flex-1">
                <span className="font-display text-xs text-swap-text tracking-wider uppercase mb-0.5 block">
                  03
                </span>
                <h4 className="font-display uppercase text-lg sm:text-xl text-swap-text mb-1 leading-[0.95] tracking-tight">
                  6-digit code verification
                </h4>
                <p className="font-body text-sm sm:text-base text-swap-text font-medium leading-relaxed">
                  The seller verifies the buyer&apos;s unique code during physical handover.
                </p>
              </div>
            </div>

            {/* Payment note if present */}
            {PAYMENT_NOTE.trim() !== '' && (
              <div className="p-4 border-2 border-swap-text rounded-md bg-swap-cream text-sm sm:text-base font-medium text-swap-text shadow-nb-sm">
                {PAYMENT_NOTE}
              </div>
            )}
          </div>

          {/* Right Side: Deep purple Transaction protocol card */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div className="w-full flex-1 flex flex-col justify-between bg-swap-primary text-swap-surface rounded-md p-6 sm:p-8 border-2 border-swap-text shadow-nb-sm sm:shadow-nb">
              <div className="flex items-center justify-between pb-3.5 border-b-2 border-swap-text mb-5">
                <span className="text-xs sm:text-sm uppercase tracking-wider font-display text-swap-pink">
                  Transaction protocol
                </span>
              </div>

              {/* Stepped Status Lines as bordered cells */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between gap-3 p-3 rounded-md bg-swap-surface/15 border-2 border-swap-text">
                  <span className="text-xs font-display uppercase text-swap-pink shrink-0">
                    Buyer
                  </span>
                  <span className="text-sm sm:text-base font-bold text-swap-surface text-right">
                    Pays through SWAP
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 p-3 rounded-md bg-swap-surface/15 border-2 border-swap-text">
                  <span className="text-xs font-display uppercase text-swap-pink shrink-0">
                    Platform
                  </span>
                  <span className="text-sm sm:text-base font-bold text-swap-surface text-right">
                    Amount controlled until completion
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 p-3 rounded-md bg-swap-surface/15 border-2 border-swap-text">
                  <span className="text-xs font-display uppercase text-swap-pink shrink-0">
                    Seller
                  </span>
                  <span className="text-sm sm:text-base font-bold text-swap-surface text-right">
                    Verifies the code at handover
                  </span>
                </div>
              </div>

              {/* Example 6-digit code box */}
              <div className="pt-4 border-t-2 border-swap-text">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-display uppercase tracking-wider text-swap-pink">
                    Example code
                  </span>
                  <span className="text-xs text-swap-surface font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-swap-pink stroke-[2.5]" /> Handover verification
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2 text-center my-2">
                  {['8', '4', '2', '1', '9', '5'].map((digit, i) => (
                    <div
                      key={i}
                      className="py-2 sm:py-2.5 rounded-none sm:rounded-sm bg-swap-surface text-swap-text border-2 border-swap-text shadow-nb-sm font-display text-lg sm:text-xl text-center font-bold"
                    >
                      {digit}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer line under card in a bordered strip */}
            <div className="mt-4 w-full p-3.5 border-2 border-swap-text rounded-md bg-swap-cream text-sm sm:text-base font-bold text-swap-text text-center shadow-nb-sm">
              Designed to reduce transaction risk. Not a guarantee against fraud.
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HowItWorksTrustSection;

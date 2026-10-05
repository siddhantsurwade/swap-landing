import type { FC } from 'react';
import {
  LINKS,
  HELPLINE_NUMBER,
  HELPLINE_HOURS,
  OFFICIAL_EMAIL,
  OPERATOR_NAME
} from '../../constants/site';

export const Footer: FC = () => {
  const showContactColumn = Boolean(
    HELPLINE_NUMBER.trim() ||
    HELPLINE_HOURS.trim() ||
    OFFICIAL_EMAIL.trim() ||
    OPERATOR_NAME.trim()
  );

  return (
    <footer className="bg-swap-cream text-swap-text border-t-2 border-swap-text pt-12 sm:pt-16 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b-2 border-swap-text">
          {/* Brand Info Column */}
          <div className={showContactColumn ? 'md:col-span-4' : 'md:col-span-5'}>
            <a
              href="/"
              className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-lg"
              aria-label="SWAP Home"
            >
              <img
                src="/images/logo.png"
                alt="SWAP"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-base text-swap-text font-medium leading-relaxed max-w-sm mb-4">
              The campus-centric marketplace designed for structured, private student commerce.
            </p>
          </div>

          {/* Campus Hub Column */}
          <div className={showContactColumn ? 'md:col-span-3' : 'md:col-span-3 sm:col-span-6'}>
            <h4 className="text-xs sm:text-sm font-display uppercase tracking-wider text-swap-text font-bold mb-4">
              Campus hub
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base font-bold text-swap-text">
              <li>
                <a href="#marketplace" className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#sell" className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Sell
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Services
                </a>
              </li>
              <li>
                <a href="#residency" className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Residency
                </a>
              </li>
              <li>
                <a href="#lost-found" className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Lost &amp; Found
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  How it works
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Trust architecture
                </a>
              </li>
              <li>
                <a href={LINKS.sellerCenter} className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Seller center
                </a>
              </li>
              <li>
                <a href={LINKS.about} className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  About the team
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policies Column */}
          <div className={showContactColumn ? 'md:col-span-3' : 'md:col-span-4 sm:col-span-6'}>
            <h4 className="text-xs sm:text-sm font-display uppercase tracking-wider text-swap-text font-bold mb-4">
              Legal &amp; policies
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base font-bold text-swap-text">
              <li>
                <a href={LINKS.terms} className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href={LINKS.privacy} className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href={LINKS.refund} className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Refund &amp; Cancellation
                </a>
              </li>
              <li>
                <a href={LINKS.grievance} className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  Grievance Redressal
                </a>
              </li>
              <li>
                <a href={LINKS.policies} className="hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs">
                  All campus policies
                </a>
              </li>
            </ul>
          </div>

          {/* Conditional Contact Column - Hidden completely if all four contact values are empty */}
          {showContactColumn && (
            <div className="md:col-span-2">
              <h4 className="text-xs sm:text-sm font-display uppercase tracking-wider text-swap-text font-bold mb-4">
                Contact
              </h4>
              <div className="p-4 rounded-md bg-swap-surface border-2 border-swap-text shadow-nb-sm space-y-3">
                {OPERATOR_NAME.trim() && (
                  <div>
                    <span className="block text-xs font-display uppercase tracking-wider text-swap-text font-bold">Operated by</span>
                    <span className="text-sm font-bold text-swap-text">{OPERATOR_NAME}</span>
                  </div>
                )}
                {HELPLINE_NUMBER.trim() && (
                  <div>
                    <span className="block text-xs font-display uppercase tracking-wider text-swap-text font-bold">Helpline</span>
                    <span className="text-sm font-bold text-swap-text">{HELPLINE_NUMBER}</span>
                  </div>
                )}
                {HELPLINE_HOURS.trim() && (
                  <div>
                    <span className="block text-xs font-display uppercase tracking-wider text-swap-text font-bold">Hours</span>
                    <span className="text-sm font-bold text-swap-text">{HELPLINE_HOURS}</span>
                  </div>
                )}
                {OFFICIAL_EMAIL.trim() && (
                  <div>
                    <span className="block text-xs font-display uppercase tracking-wider text-swap-text font-bold">Email</span>
                    <a
                      href={`mailto:${OFFICIAL_EMAIL}`}
                      className="text-sm font-bold text-swap-text underline hover:text-swap-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs"
                    >
                      {OFFICIAL_EMAIL}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-bold text-swap-text">
          <div>
            <span>&copy; 2026 SWAP. Buy. Sell. Repeat.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


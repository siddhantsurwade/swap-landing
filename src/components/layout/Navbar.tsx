import { useState, useEffect, type FC } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { LOGIN_URL, REGISTER_URL } from '../../constants/site';
import NbButton from '../ui/NbButton';

interface NavLinkItem {
  name: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: 'Marketplace', href: '#marketplace' },
  { name: 'Sell', href: '#sell' },
  { name: 'Services', href: '#services' },
  { name: 'Residency', href: '#residency' },
  { name: 'Lost & Found', href: '#lost-found' },
  { name: 'How it works', href: '#how-it-works' },
];

export const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: close mobile menu with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-3.5 z-50 w-full px-3.5 sm:px-6 pointer-events-none transition-all duration-300">
      <nav
        aria-label="Primary navigation"
        className={`pointer-events-auto max-w-5xl mx-auto rounded-full transition-all duration-300 border-2 border-swap-text shadow-nb ${
          scrolled
            ? 'bg-swap-surface py-2 px-4 sm:px-6'
            : 'bg-swap-surface py-2.5 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo using /public/images/logo.png */}
          <a
            href="/"
            className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-lg px-1 py-0.5"
            aria-label="SWAP Home"
          >
            <img
              src="/images/logo.png"
              alt="SWAP - Buy. Sell. Repeat."
              className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {NAV_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-semibold text-swap-text/85 hover:text-swap-primary rounded-full hover:bg-swap-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={LOGIN_URL}
              className="px-3.5 py-1.5 text-sm font-bold text-swap-text hover:text-swap-primary rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary"
            >
              Login
            </a>
            <NbButton variant="primary" size="sm" href={REGISTER_URL}>
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-90" />
            </NbButton>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <NbButton variant="primary" size="xs" href={REGISTER_URL}>
              Register
            </NbButton>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 text-swap-text hover:text-swap-primary rounded-full hover:bg-swap-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-2 border-t-2 border-swap-text flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-swap-text hover:text-swap-primary hover:bg-swap-bg rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 mt-1 border-t-2 border-swap-text flex flex-col gap-2">
              <a
                href={LOGIN_URL}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-bold text-swap-text hover:bg-swap-bg rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary"
              >
                Login
              </a>
              <NbButton
                variant="primary"
                size="sm"
                href={REGISTER_URL}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                Register
              </NbButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

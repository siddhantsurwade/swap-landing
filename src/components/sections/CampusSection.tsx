import { useState, useEffect, useRef, type FC, type KeyboardEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Search,
  Heart,
  ArrowRight,
  MapPin,
  Users,
  Shield,
  Bed,
  Home,
  PhoneCall,
  CheckCircle2,
  Check
} from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import SectionLabel from '../ui/SectionLabel';
import Tag from '../ui/Tag';
import NbButton from '../ui/NbButton';
import Placeholder from '../common/Placeholder';
import Accordion from '../common/Accordion';
import CountUp from '../reactbits/CountUp';
import { IMAGES } from '../../constants/images';
import {
  MARKETPLACE_URL,
  LIST_ITEM_URL,
  FIND_ROOM_URL
} from '../../constants/site';

// Tab configuration
export type CampusTabId = 'marketplace' | 'sell' | 'services' | 'residency' | 'lost-found';

interface TabItem {
  id: CampusTabId;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'sell', label: 'Sell' },
  { id: 'services', label: 'Services' },
  { id: 'residency', label: 'Residency' },
  { id: 'lost-found', label: 'Lost & found' }
];

// Marketplace data
const MARKETPLACE_CATEGORIES = ['All', 'Books', 'Calculators', 'Electronics', 'Study materials', 'Creative'];
const MARKETPLACE_ITEMS = [
  {
    id: 'engineering-calculator',
    title: 'Engineering Calculator',
    price: 650,
    condition: 'Good',
    category: 'Calculators',
    imageSlot: IMAGES.marketplace.engineeringCalculator,
    placeholderTheme: 'pink-light' as const
  },
  {
    id: 'data-structures-book',
    title: 'Data Structures Book',
    price: 300,
    condition: 'Used',
    category: 'Books',
    imageSlot: IMAGES.marketplace.dataStructuresBook,
    placeholderTheme: 'cream' as const
  },
  {
    id: 'wireless-headphones',
    title: 'Wireless Headphones',
    price: 900,
    condition: 'Like new',
    category: 'Electronics',
    imageSlot: IMAGES.marketplace.wirelessHeadphones,
    placeholderTheme: 'lilac-light' as const
  },
  {
    id: 'handmade-tote-bag',
    title: 'Handmade Tote Bag',
    price: 450,
    condition: 'New',
    category: 'Creative',
    imageSlot: IMAGES.marketplace.handmadeToteBag,
    placeholderTheme: 'pink-blush' as const
  }
];

// Sell Checklist items & Recent listings
const CHECKLIST_ITEMS = [
  'Upload photos',
  'Add condition',
  'Set price',
  'Submit listing',
  'Listing review',
  'Get discovered',
  'Verified handover',
  'Track earnings'
];

interface RecentListingItem {
  item: string;
  status: string;
  variant: 'surface' | 'lilac' | 'pink';
}

const RECENT_LISTINGS: RecentListingItem[] = [
  { item: 'Textbook set', status: 'Listed', variant: 'surface' },
  { item: 'Scientific calculator', status: 'In review', variant: 'lilac' },
  { item: 'Laptop stand', status: 'Sold', variant: 'pink' }
];

// Services data
const SERVICES_DATA = [
  {
    title: 'UI/UX Design',
    subtitle: 'Portfolio, project pricing',
    sentence: 'Wireframes, interface mockups, and mobile prototypes for campus projects.'
  },
  {
    title: 'Video Editing',
    subtitle: 'Online, per video',
    sentence: 'Video cuts, subtitle syncing, and audio leveling for student media.'
  },
  {
    title: 'IoT Project Help',
    subtitle: 'Offline, per session',
    sentence: 'Circuit wiring, sensor connections, and microcontroller code assistance.'
  },
  {
    title: 'Maths Tutoring',
    subtitle: 'Online or offline, hourly',
    sentence: 'Review sessions for syllabus topics, assignments, and problem sets.'
  }
];

// Residency data
const RESIDENCY_FILTER_CHIPS = ['Area', 'Rent', 'Beds'];
const AMENITY_TAGS = [
  { label: '1 bed available', icon: Bed },
  { label: 'Fully furnished', icon: Home },
  { label: 'Security', icon: Shield }
];

export const CampusSection: FC = () => {
  const [activeTab, setActiveTab] = useState<CampusTabId>('marketplace');
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState('All');
  const prefersReducedMotion = useReducedMotion();
  const tabRefs = useRef<Record<CampusTabId, HTMLButtonElement | null>>({
    marketplace: null,
    sell: null,
    services: null,
    residency: null,
    'lost-found': null
  });

  const toggleHeart = (id: string) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Synchronize hash with active tab and scroll to campus section
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '').toLowerCase();
      const matched = TABS.find(t => t.id === rawHash);
      if (matched) {
        setActiveTab(matched.id);
        const campusEl = document.getElementById('campus');
        if (campusEl) {
          campusEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabClick = (tabId: CampusTabId) => {
    setActiveTab(tabId);
    if (window.history.replaceState) {
      window.history.replaceState(null, '', `#${tabId}`);
    }
  };

  // Keyboard navigation for tablist (ArrowLeft, ArrowRight, Home, End)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = TABS.findIndex(t => t.id === activeTab);
    let nextIndex = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = TABS.length - 1;
    }

    if (nextIndex !== -1) {
      const nextTab = TABS[nextIndex].id;
      setActiveTab(nextTab);
      tabRefs.current[nextTab]?.focus();
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `#${nextTab}`);
      }
    }
  };

  return (
    <SectionWrapper id="campus" className="bg-swap-surface py-12 sm:py-16 lg:py-20">
      {/* Anchor targets so all existing links scroll reliably */}
      <div id="marketplace" className="scroll-mt-28" />
      <div id="sell" className="scroll-mt-28" />
      <div id="services" className="scroll-mt-28" />
      <div id="residency" className="scroll-mt-28" />
      <div id="lost-found" className="scroll-mt-28" />

      {/* Section Label */}
      <SectionLabel number="03" label="Campus" />

      {/* Section Headline */}
      <div className="max-w-3xl mb-8 sm:mb-10">
        <h2 className="font-display uppercase text-[clamp(2.25rem,5vw,3.75rem)] text-swap-text tracking-tight leading-[0.95] mb-4">
          One platform. Every campus need.
        </h2>
        <p className="text-base sm:text-lg text-swap-text font-medium leading-relaxed">
          Switch between marketplace listings, selling tools, student skill services, off-campus residency, and lost &amp; found recovery.
        </p>
      </div>

      {/* Tab Navigation with horizontal scroll on mobile */}
      <div className="mb-8 sm:mb-10">
        <div
          role="tablist"
          aria-label="Campus features"
          onKeyDown={handleKeyDown}
          className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap select-none no-scrollbar"
        >
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={el => {
                  tabRefs.current[tab.id] = el;
                }}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabClick(tab.id)}
                type="button"
                className={`shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-none sm:rounded-sm border-2 border-swap-text font-display uppercase tracking-wider text-xs sm:text-sm cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary ${
                  isActive
                    ? 'bg-swap-primary text-swap-surface shadow-nb-sm sm:shadow-nb'
                    : 'bg-swap-surface text-swap-text hover:bg-swap-cream shadow-nb-sm'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panel Container with fixed minimum height to avoid jumps */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="min-h-[560px] sm:min-h-[500px] focus:outline-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* 1. MARKETPLACE TAB PANEL */}
            {activeTab === 'marketplace' && (
              <div className="space-y-8">
                {/* Search Bar & Categories */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      readOnly
                      placeholder="Search books, cycles, calculators..."
                      className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-none sm:rounded-sm bg-swap-surface border-2 border-swap-text shadow-nb-sm text-sm sm:text-base font-bold text-swap-text placeholder:text-swap-text/60 select-none cursor-default"
                    />
                    <Search className="w-5 h-5 text-swap-text absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" aria-label="Product categories">
                    {MARKETPLACE_CATEGORIES.map(category => {
                      const isCatActive = activeCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setActiveCategory(category)}
                          className={`px-3 py-1.5 rounded-none sm:rounded-sm text-xs font-display uppercase tracking-wider font-bold border-2 border-swap-text shadow-nb-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary ${
                            isCatActive
                              ? 'bg-swap-primary text-swap-surface'
                              : 'bg-swap-surface text-swap-text hover:bg-swap-cream'
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4 Sample Listing Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {MARKETPLACE_ITEMS.map(item => {
                    const isLiked = Boolean(likedItems[item.id]);

                    return (
                      <div
                        key={item.id}
                        className="bg-swap-surface rounded-md p-4 sm:p-5 border-2 border-swap-text shadow-nb card-nb-hover flex flex-col justify-between"
                      >
                        <div>
                          {/* Image box with square tags & square white heart button */}
                          <div className="relative mb-4 rounded-none sm:rounded-sm border-2 border-swap-text overflow-hidden">
                            <Placeholder
                              src={item.imageSlot.src}
                              alt={item.imageSlot.alt}
                              name={item.title}
                              bgTheme={item.placeholderTheme}
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <Tag variant="cream">Sample</Tag>
                            </div>
                            <div className="absolute bottom-2.5 left-2.5">
                              <Tag variant="surface">{item.condition}</Tag>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleHeart(item.id)}
                              aria-label={`Save ${item.title}`}
                              className="absolute top-2.5 right-2.5 w-9 h-9 rounded-none sm:rounded-sm bg-swap-surface border-2 border-swap-text shadow-nb-sm flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary"
                            >
                              <Heart
                                className={`w-4 h-4 stroke-[2.5] ${
                                  isLiked ? 'fill-swap-pink text-swap-text' : 'text-swap-text'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Category and Title */}
                          <span className="text-xs font-display uppercase tracking-wider text-swap-text font-bold block mb-1">
                            {item.category}
                          </span>
                          <h3 className="font-display uppercase text-lg text-swap-text mb-3 leading-[0.95] tracking-tight">
                            {item.title}
                          </h3>
                        </div>

                        {/* Price formatted with ₹ */}
                        <div className="pt-3 border-t-2 border-swap-text flex items-center justify-between">
                          <span className="font-display uppercase text-2xl text-swap-text">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Marketplace Actions & Disclaimer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-swap-text">
                  <NbButton variant="primary" href={MARKETPLACE_URL} size="md">
                    <span>Explore full marketplace</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </NbButton>
                  <p className="text-sm sm:text-base text-swap-text font-bold">
                    Sample listings shown. Actual campus availability depends on student postings in your college.
                  </p>
                </div>
              </div>
            )}

            {/* 2. SELL TAB PANEL */}
            {activeTab === 'sell' && (
              <div className="space-y-8">
                <div className="bg-swap-lilac rounded-md p-6 sm:p-8 lg:p-10 border-2 border-swap-text shadow-nb">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: 8-Step Seller Checklist */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <span className="font-display uppercase text-sm sm:text-base text-swap-text tracking-wider block mb-4 font-bold">
                          Simple 8-step seller flow
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-8">
                          {CHECKLIST_ITEMS.map((item, index) => (
                            <div
                              key={index}
                              className="bg-swap-surface rounded-md p-3.5 sm:p-4 border-2 border-swap-text shadow-nb-sm flex items-center gap-3"
                            >
                              <div className="w-6 h-6 rounded-none sm:rounded-sm bg-swap-surface border-2 border-swap-text shadow-nb-sm flex items-center justify-center shrink-0">
                                <Check className="w-4 h-4 stroke-[3] text-swap-pink" />
                              </div>
                              <span className="font-bold text-sm sm:text-base text-swap-text leading-tight">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <NbButton variant="primary" href={LIST_ITEM_URL} size="md">
                          <span>List an item</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </NbButton>
                      </div>
                    </div>

                    {/* Right Column: Example Dashboard Card */}
                    <div className="lg:col-span-5 w-full flex flex-col items-center">
                      <div className="w-full bg-swap-surface rounded-md p-6 sm:p-7 border-2 border-swap-text shadow-nb">
                        <div className="pb-4 border-b-2 border-swap-text mb-5 flex items-center justify-between">
                          <Tag variant="cream" className="text-sm">
                            Example dashboard
                          </Tag>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
                          <div className="p-3 sm:p-3.5 rounded-md bg-swap-cream border-2 border-swap-text shadow-nb-sm flex flex-col justify-between">
                            <span className="text-xs font-display uppercase tracking-wider text-swap-text mb-1.5">
                              Active
                            </span>
                            <span className="font-display text-xl sm:text-2xl text-swap-text">
                              <CountUp to={3} />
                            </span>
                          </div>

                          <div className="p-3 sm:p-3.5 rounded-md bg-swap-cream border-2 border-swap-text shadow-nb-sm flex flex-col justify-between">
                            <span className="text-xs font-display uppercase tracking-wider text-swap-text mb-1.5">
                              Sold
                            </span>
                            <span className="font-display text-xl sm:text-2xl text-swap-text">
                              <CountUp to={8} />
                            </span>
                          </div>

                          <div className="p-3 sm:p-3.5 rounded-md bg-swap-pink border-2 border-swap-text shadow-nb-sm flex flex-col justify-between">
                            <span className="text-xs font-display uppercase tracking-wider text-swap-text mb-1.5">
                              Earnings
                            </span>
                            <span className="font-display text-lg sm:text-xl text-swap-text tracking-tight">
                              <CountUp to={12450} prefix="₹" locale="en-IN" />
                            </span>
                          </div>
                        </div>

                        {/* Recent Listings */}
                        <div className="pt-3.5 border-t-2 border-swap-text">
                          <span className="text-xs font-display uppercase tracking-wider text-swap-text block mb-2.5 font-bold">
                            Recent listings
                          </span>

                          <div className="space-y-2">
                            {RECENT_LISTINGS.map((row, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 sm:p-3 rounded-md bg-swap-cream border-2 border-swap-text shadow-nb-sm flex items-center justify-between gap-2 text-sm"
                              >
                                <span className="font-bold text-swap-text truncate">
                                  {row.item}
                                </span>
                                <Tag variant={row.variant}>
                                  {row.status}
                                </Tag>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 rounded-md bg-swap-cream border-2 border-swap-text shadow-nb-sm">
                  <p className="text-sm sm:text-base text-swap-text font-bold">
                    Listings are reviewed before discovery. SWAP does not guarantee instant sales.
                  </p>
                </div>
              </div>
            )}

            {/* 3. SERVICES TAB PANEL */}
            {activeTab === 'services' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Side: Placeholder Image with Sample tag */}
                  <div className="lg:col-span-5 w-full">
                    <div className="bg-swap-surface rounded-md p-4 sm:p-5 border-2 border-swap-text shadow-nb">
                      <div className="relative overflow-hidden rounded-none sm:rounded-sm border-2 border-swap-text">
                        <Placeholder
                          src={IMAGES.services.src}
                          alt={IMAGES.services.alt}
                          name={IMAGES.services.name}
                          bgTheme="lilac-light"
                        />
                        <div className="absolute top-3 left-3">
                          <Tag variant="cream">Sample</Tag>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Keyboard-accessible Accordion */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <Accordion
                      idPrefix="service-campus"
                      items={SERVICES_DATA.map(service => ({
                        title: service.title,
                        subtitle: service.subtitle,
                        content: <p>{service.sentence}</p>,
                        tag: 'Sample'
                      }))}
                    />

                    {/* Disclaimer */}
                    <div className="mt-6 p-4 rounded-md bg-swap-cream border-2 border-swap-text shadow-nb-sm">
                      <p className="text-sm sm:text-base text-swap-text font-bold">
                        Example services. Income is not guaranteed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. RESIDENCY TAB PANEL */}
            {activeTab === 'residency' && (
              <div className="space-y-8">
                {/* Filter Chips */}
                <div className="flex flex-wrap items-center gap-2.5" aria-label="Available filter categories">
                  {RESIDENCY_FILTER_CHIPS.map(chip => (
                    <span
                      key={chip}
                      className="px-4 py-2 rounded-none sm:rounded-sm text-xs sm:text-sm font-display uppercase tracking-wider font-bold bg-swap-surface text-swap-text border-2 border-swap-text shadow-nb-sm select-none"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Sample Listing Card */}
                  <div className="lg:col-span-7">
                    <div className="bg-swap-surface rounded-md p-6 sm:p-7 border-2 border-swap-text shadow-nb card-nb-hover">
                      <div className="relative mb-5 rounded-none sm:rounded-sm border-2 border-swap-text overflow-hidden">
                        <Placeholder
                          src={IMAGES.residency.src}
                          alt={IMAGES.residency.alt}
                          name="2 BHK Shared Apartment"
                          bgTheme="cream"
                        />
                        <div className="absolute top-3 left-3">
                          <Tag variant="cream">Sample listing</Tag>
                        </div>
                      </div>

                      {/* Price & Location */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b-2 border-swap-text">
                        <span className="font-display uppercase text-2xl sm:text-3xl text-swap-text">
                          ₹{(7500).toLocaleString('en-IN')}
                          <span className="text-sm font-sans font-bold text-swap-text ml-2">per person</span>
                        </span>
                        <div className="flex items-center gap-1.5 text-sm font-bold text-swap-text">
                          <MapPin className="w-4 h-4 text-swap-text shrink-0" />
                          <span>0.8 km from campus</span>
                        </div>
                      </div>

                      <h3 className="font-display uppercase text-xl sm:text-2xl text-swap-text mb-4">
                        2 BHK Shared Apartment
                      </h3>

                      <div className="flex flex-wrap items-center gap-2">
                        {AMENITY_TAGS.map(({ label, icon: Icon }) => (
                          <span
                            key={label}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none sm:rounded-sm text-xs sm:text-sm font-display uppercase tracking-wider font-bold bg-swap-cream border-2 border-swap-text shadow-nb-sm text-swap-text"
                          >
                            <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Roommate Finder Card & Actions */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div className="bg-swap-primary text-swap-surface rounded-md p-6 sm:p-7 border-2 border-swap-text shadow-nb">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-none sm:rounded-sm bg-swap-pink border-2 border-swap-text flex items-center justify-center text-swap-text shadow-nb-sm">
                          <Users className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <Tag variant="pink">Sample</Tag>
                      </div>

                      <h4 className="font-display uppercase text-lg sm:text-xl text-swap-surface mb-2">
                        Need one more roommate?
                      </h4>
                      <p className="text-base text-swap-surface/90 leading-relaxed font-medium">
                        3 students confirmed, looking for 1 roommate
                      </p>
                    </div>

                    <div>
                      <NbButton
                        variant="primary"
                        href={FIND_ROOM_URL}
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        <span>Find a room</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </NbButton>

                      <div className="mt-5 p-4 rounded-md bg-swap-cream border-2 border-swap-text shadow-nb-sm">
                        <p className="text-sm sm:text-base text-swap-text font-bold leading-relaxed">
                          Arrange visits directly. Rent is not paid through SWAP. Listings are subject to verification; SWAP does not operate every property.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. LOST & FOUND TAB PANEL */}
            {activeTab === 'lost-found' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Verification Steps */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="mb-2">
                      <h3 className="font-display uppercase text-2xl sm:text-3xl text-swap-text mb-2">
                        Make it worth finding.
                      </h3>
                      <p className="text-base sm:text-lg text-swap-text font-medium leading-relaxed">
                        Attach a bounty to an important lost item. Claims remain subject to verification, and recovery is not guaranteed.
                      </p>
                    </div>

                    <div className="p-5 rounded-md bg-swap-cream border-2 border-swap-text shadow-nb-sm flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none sm:rounded-sm bg-swap-surface border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text shrink-0 mt-0.5">
                        <Search className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display uppercase text-base sm:text-lg text-swap-text mb-1">
                          Private photo verification
                        </h4>
                        <p className="text-sm sm:text-base text-swap-text font-medium leading-relaxed">
                          A finder sends fresh proof photos with their claim. You review them and decide whether it is your item.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-md bg-swap-lilac border-2 border-swap-text shadow-nb-sm flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none sm:rounded-sm bg-swap-surface border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text shrink-0 mt-0.5">
                        <PhoneCall className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display uppercase text-base sm:text-lg text-swap-text mb-1">
                          Contact after bounty payment
                        </h4>
                        <p className="text-sm sm:text-base text-swap-text font-medium leading-relaxed">
                          Once you approve a claim and pay the bounty through SWAP, contact details are shared so you can arrange the return.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Sample Backpack & Match Card */}
                  <div className="lg:col-span-6 w-full space-y-4">
                    {/* Sample Lost Item Card */}
                    <div className="bg-swap-surface rounded-md p-6 sm:p-7 border-2 border-swap-text shadow-nb card-nb-hover">
                      <div className="relative mb-5 rounded-none sm:rounded-sm border-2 border-swap-text overflow-hidden">
                        <Placeholder
                          src={IMAGES.lostFound.src}
                          alt={IMAGES.lostFound.alt}
                          name="Black Backpack"
                          bgTheme="pink-light"
                        />
                        <div className="absolute top-3 left-3">
                          <Tag variant="cream">Sample</Tag>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Tag variant="pink">Search active</Tag>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t-2 border-swap-text">
                        <div>
                          <span className="text-xs sm:text-sm font-display uppercase tracking-wider text-swap-text font-bold block mb-1">
                            Lost item
                          </span>
                          <h4 className="font-display uppercase text-xl sm:text-2xl text-swap-text">
                            Black Backpack
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-display uppercase tracking-wider text-swap-text font-bold block mb-1">
                            Bounty
                          </span>
                          <span className="font-display uppercase text-2xl text-swap-primary">
                            ₹{(500).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Highlighted Match Card */}
                    <div className="bg-swap-pink rounded-md p-5 sm:p-6 border-2 border-swap-text shadow-nb flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-none sm:rounded-sm bg-swap-surface border-2 border-swap-text shadow-nb-sm flex items-center justify-center text-swap-text shrink-0 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <p className="font-display uppercase text-base sm:text-lg text-swap-text leading-tight">
                          Someone may have found your item. Check the possible match.
                        </p>
                      </div>
                      <div className="shrink-0">
                        <Tag variant="cream">Sample</Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
};

export default CampusSection;

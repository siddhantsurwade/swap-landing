# SWAP Landing Page — Developer & Client Handoff Guide

This document outlines all configurable assets, constants, pending copy approvals, and integration points required before launching the SWAP campus marketplace landing page in production.

---

## 1. Image Slots (`src/constants/images.ts`)

Every image slot on the site is centralized in [`src/constants/images.ts`](file:///c:/Users/Siddhant/swap-landing/src/constants/images.ts). Currently, all slots have `src: null`, which automatically renders branded placeholder cards displaying the item name. To display real photos, set `src` to the image URL (e.g. `src: '/images/hero/calculator.jpg'`).

### Hero Collage Slots
1. `IMAGES.hero.books`: Textbooks
2. `IMAGES.hero.calculator`: Scientific Calculator
3. `IMAGES.hero.bicycle`: Campus Bicycle
4. `IMAGES.hero.dorm`: Hostel Room
5. `IMAGES.hero.hoodie`: College Hoodie

### Marketplace Sample Slots
6. `IMAGES.marketplace.engineeringCalculator`: Engineering Calculator
7. `IMAGES.marketplace.dataStructuresBook`: Data Structures Book
8. `IMAGES.marketplace.wirelessHeadphones`: Wireless Headphones
9. `IMAGES.marketplace.handmadeToteBag`: Handmade Tote Bag
10. `IMAGES.marketplace.arduinoStarterKit`: Arduino Starter Kit
11. `IMAGES.marketplace.designNotesBundle`: Design Notes Bundle

### Vertical Slots
12. `IMAGES.services`: Student Services photo slot (4:3 ratio)
13. `IMAGES.residency`: Accommodation / Roommates photo slot (4:3 ratio)
14. `IMAGES.lostFound`: Lost & Found item photo slot (4:3 ratio)

---

## 2. Site Constants (`src/constants/site.ts`)

Configure all external links, contact information, and operational variables in [`src/constants/site.ts`](file:///c:/Users/Siddhant/swap-landing/src/constants/site.ts):

### Contact Information & Operator
- `HELPLINE_NUMBER`: Student support phone number (leave `""` to keep hidden).
- `HELPLINE_HOURS`: Operating hours for support (e.g., `"Mon-Fri 9:00 AM - 6:00 PM"`).
- `OFFICIAL_EMAIL`: Official support and grievance email.
- `OPERATOR_NAME`: Entity, student council, or legal entity operating SWAP.
> *Note: If all four contact values are empty string `""`, the entire Contact column in the footer is automatically omitted from the page.*

### Eligibility & Rules
- `COLLEGE_EMAIL_NOTE`: Specific institutional email rule (e.g. `Must register with an @mgm.edu email address`). When left empty `""`, FAQ Item 1 shows *"Details coming soon."*.

### Action & Navigation URLs
- `REGISTER_URL`: Target URL for the "Register" and "Register with SWAP" buttons (defaults to `"#"`).
- `LOGIN_URL`: Target URL for the "Log in" links (defaults to `"#"`).
- `MARKETPLACE_URL`: Target URL for "Explore the marketplace" buttons (defaults to `"#"`).
- `LIST_ITEM_URL`: Target URL for "List an item" button in Sell & Earn (defaults to `"#"`).
- `FIND_ROOM_URL`: Target URL for "Find a room" button in Residency (defaults to `"#"`).

### Footer Legal & Policy Links (`LINKS` object)
- `LINKS.terms`: Terms of Service page URL.
- `LINKS.privacy`: Privacy Policy page URL.
- `LINKS.refund`: Refund & Cancellation Policy page URL.
- `LINKS.grievance`: Grievance Redressal page URL (also linked from FAQ item 6).
- `LINKS.policies`: Campus policies index URL.
- `LINKS.about`: About the team page URL.
- `LINKS.sellerCenter`: Seller guidelines / onboarding portal URL.

### Trust Banner
- `PAYMENT_NOTE`: Optional trust banner text rendered under the Trust Architecture section (leave `""` if not needed).

---

## 3. Current Page Architecture & Section Guide

The landing page follows a high-impact, neo-brutalist aesthetic with thick borders (`border-2 border-swap-text`), hard offset shadows (`shadow-nb`), fluid uppercase display headings, and a streamlined layout:

1. **Header & Navigation** ([`Navbar.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/layout/Navbar.tsx)):
   - Sticky pill-shaped nav with hard offset shadow, logo, links, login anchor, and primary CTA.
2. **Hero Section** ([`Hero.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/hero/Hero.tsx)):
   - Fast rotating word chip in square neo-brutalist styling, outlined `"ON CAMPUS."` heading, interactive hover collage ([`BounceCards.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/reactbits/BounceCards.tsx)), and CTAs linking to `#marketplace` and `#sell`.
3. **Marquee Ribbon** ([`MarqueeStrip.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/hero/MarqueeStrip.tsx)):
   - High-contrast marquee ticker with `border-y-2 border-swap-text` and uppercase display typography.
4. **01 The Problem** ([`ProblemSection.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/sections/ProblemSection.tsx)):
   - Compact desktop layout with the 3 problem cards stacked on the left and the Before/After transition visual on the right.
5. **02 How it works & Trust** ([`HowItWorksTrustSection.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/sections/HowItWorksTrustSection.tsx)):
   - Single unified section with buyer/seller step switcher (6 numbered step cards), followed by the Trust Architecture anchor (`#trust`), 3 trust points, and the deep-purple Transaction Protocol card with 6-digit handover code verification.
6. **03 Campus** ([`CampusSection.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/sections/CampusSection.tsx)):
   - Unified tabbed hub housing **Marketplace**, **Sell**, **Services**, **Residency**, and **Lost & found** in compact panels.
   - Square tab buttons, full keyboard accessibility (arrow keys, roving tabindex), horizontal mobile scroll, fixed minimum panel height, and URL hash routing (`#marketplace`, `#sell`, `#services`, `#residency`, `#lost-found`).
7. **04 Safety** ([`SafetySection.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/sections/SafetySection.tsx)):
   - Deep-purple band (`bg-swap-primary text-swap-surface`) with square privacy tag and moderation queue card featuring pink offset shadow.
8. **05 FAQ** ([`FAQSection.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/sections/FAQSection.tsx)):
   - Neo-brutalist accordion with plus/minus square icon box, pink fill on open row, and 16px body text.
9. **Final CTA** ([`JoinSection.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/sections/JoinSection.tsx)):
   - Pink-light band with circular SWAP logo badge, uppercase display heading, and primary/secondary `NbButton` CTAs.
10. **Footer** ([`Footer.tsx`](file:///c:/Users/Siddhant/swap-landing/src/components/layout/Footer.tsx)):
    - Cream background with `border-t-2`, uppercase column headers, $\ge 14$px links with hover underlines, and conditional contact cards.

---

## 4. FAQ Items Marked `// TODO` (`src/components/sections/FAQSection.tsx`)

The following FAQ items contain placeholders pending final policy decisions:

1. **Item 1 — Who can join?**:
   - `// TODO: confirm exact college email rule with client`
   - Governed by `COLLEGE_EMAIL_NOTE`. Currently displays *"Details coming soon."* until confirmed.
2. **Item 2 — How does payment work?**:
   - `// TODO: client must confirm payment wording`
   - Currently states: *"The buyer pays through the platform flow, and the transaction amount is controlled until the required completion step."*
3. **Item 3 — What if the seller does not show up?**:
   - `// TODO: confirm with client`
   - Currently displays *"Details coming soon."*.
4. **Item 4 — Is it free?**:
   - `// TODO: confirm with client`
   - Currently displays *"Details coming soon."*.

---

## 5. Open Graph Social Card (`index.html`)

Per client instructions, `og:image` has been intentionally omitted from [`index.html`](file:///c:/Users/Siddhant/swap-landing/index.html).
Before deployment:
1. Design a 1200x630px social card preview image and place it in `/public/images/og-preview.png`.
2. Add the following tag to `index.html` with your production domain:
   ```html
   <meta property="og:image" content="https://your-domain.com/images/og-preview.png" />
   ```

---

## 6. Needs Client Approval

The following items should be formally reviewed and signed off by the client:

1. **Payment Wording**:
   - The FAQ payment answer in Section 05 (`FAQSection.tsx`).
   - The transaction protocol card description in Section 02 (`HowItWorksTrustSection.tsx`).
2. **Lost & Found Protocols**:
   - The two-step verification claim process wording in Section 03 Campus tabs (`CampusSection.tsx`):
     - *"A finder sends fresh proof photos with their claim. You review them and decide whether it is your item."*
     - *"Once you approve a claim and pay the bounty through SWAP, contact details are shared so you can arrange the return."*
3. **Real Policy Page Destinations**:
   - Final URLs for the Terms, Privacy, Refund, and Grievance pages linked from the footer (`src/constants/site.ts`).


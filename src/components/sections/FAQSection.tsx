import type { FC } from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import Accordion, { type AccordionItemData } from '../common/Accordion';
import SectionLabel from '../ui/SectionLabel';
import { COLLEGE_EMAIL_NOTE, LINKS } from '../../constants/site';

export const FAQSection: FC = () => {
  // TODO: confirm exact college email rule with client
  const whoCanJoinContent = COLLEGE_EMAIL_NOTE.trim()
    ? COLLEGE_EMAIL_NOTE
    : 'Details coming soon.';

  // TODO: client must confirm payment wording
  const paymentContent =
    'The buyer pays through the platform flow, and the transaction amount is controlled until the required completion step.';

  // TODO: confirm with client
  const sellerNoShowContent = 'Details coming soon.';

  // TODO: confirm with client
  const isFreeContent = 'Details coming soon.';

  const reviewListingsContent =
    'Listings are reviewed before they are discovered by other students.';

  const reportProblemContent = (
    <span>
      Use the{' '}
      <a
        href={LINKS.grievance}
        className="font-bold text-swap-primary underline underline-offset-4 hover:text-swap-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary rounded-xs"
      >
        Grievance Redressal
      </a>{' '}
      link in the footer.
    </span>
  );

  const FAQ_ITEMS: AccordionItemData[] = [
    {
      id: 'faq-who-can-join',
      title: 'Who can join?',
      content: <p className="text-base text-swap-text font-medium leading-relaxed">{whoCanJoinContent}</p>
    },
    {
      id: 'faq-how-payment-works',
      title: 'How does payment work?',
      content: <p className="text-base text-swap-text font-medium leading-relaxed">{paymentContent}</p>
    },
    {
      id: 'faq-seller-no-show',
      title: 'What if the seller does not show up?',
      content: <p className="text-base text-swap-text font-medium leading-relaxed">{sellerNoShowContent}</p>
    },
    {
      id: 'faq-is-it-free',
      title: 'Is it free?',
      content: <p className="text-base text-swap-text font-medium leading-relaxed">{isFreeContent}</p>
    },
    {
      id: 'faq-listing-reviews',
      title: 'How are listings reviewed?',
      content: <p className="text-base text-swap-text font-medium leading-relaxed">{reviewListingsContent}</p>
    },
    {
      id: 'faq-report-problem',
      title: 'How do I report a problem?',
      content: <div className="text-base text-swap-text font-medium leading-relaxed">{reportProblemContent}</div>
    }
  ];

  return (
    <SectionWrapper id="faq" className="bg-swap-cream py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column on Desktop: Label and Heading */}
        <div className="lg:col-span-5">
          <SectionLabel number="05" label="FAQ" />
          <h2 className="font-display uppercase text-[clamp(2.25rem,4.5vw,3.75rem)] text-swap-text tracking-tight leading-[0.95]">
            Frequently asked questions
          </h2>
        </div>

        {/* Right Column on Desktop: Accordion */}
        <div className="lg:col-span-7 w-full">
          <Accordion items={FAQ_ITEMS} idPrefix="faq" defaultOpenIndex={0} iconType="plus-minus" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQSection;


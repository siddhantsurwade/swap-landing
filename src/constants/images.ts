/**
 * Image configuration for SWAP landing page slots.
 * Set `src` to a valid asset URL (e.g. '/images/items/calculator.jpg') to render real photos.
 * If `src` is null, a branded placeholder block with the item name is automatically displayed.
 */

export interface ImageSlot {
  name: string;
  alt: string;
  src: string | null;
  /** Backward compatibility alias for src */
  image?: string | null;
}

export const IMAGES = {
  hero: {
    books: {
      name: 'Textbooks',
      alt: 'Campus textbooks',
      src: null as string | null
    },
    calculator: {
      name: 'Calculator',
      alt: 'Scientific calculator',
      src: null as string | null
    },
    bicycle: {
      name: 'Bicycle',
      alt: 'Campus bicycle',
      src: null as string | null
    },
    dorm: {
      name: 'Hostel Room',
      alt: 'Hostel room',
      src: null as string | null
    },
    hoodie: {
      name: 'College Hoodie',
      alt: 'College hoodie',
      src: null as string | null
    }
  },
  marketplace: {
    engineeringCalculator: {
      name: 'Engineering Calculator',
      alt: 'Engineering Calculator',
      src: null as string | null
    },
    dataStructuresBook: {
      name: 'Data Structures Book',
      alt: 'Data Structures Book',
      src: null as string | null
    },
    wirelessHeadphones: {
      name: 'Wireless Headphones',
      alt: 'Wireless Headphones',
      src: null as string | null
    },
    handmadeToteBag: {
      name: 'Handmade Tote Bag',
      alt: 'Handmade Tote Bag',
      src: null as string | null
    },
    arduinoStarterKit: {
      name: 'Arduino Starter Kit',
      alt: 'Arduino Starter Kit',
      src: null as string | null
    },
    designNotesBundle: {
      name: 'Design Notes Bundle',
      alt: 'Design Notes Bundle',
      src: null as string | null
    }
  },
  services: {
    name: 'Student Services',
    alt: 'Student Services',
    src: null as string | null
  },
  residency: {
    name: 'Rooms and Roommates',
    alt: 'Rooms and Roommates',
    src: null as string | null
  },
  lostFound: {
    name: 'Lost and Found',
    alt: 'Lost and Found',
    src: null as string | null
  }
};

export default IMAGES;

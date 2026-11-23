export type PortfolioGroup = 'Portraits' | 'Products' | 'Events';
export type EventSubGroup = 'Weddings' | 'Birthdays' | 'Corporate' | 'Graduations';

export interface PortfolioItem {
  id: string;
  filename: string;
  src: string | null;
  alt: string;
  caption: string;
  group: PortfolioGroup;
  subGroup?: EventSubGroup | 'Graduation';
  isPlaceholder: boolean;
  placeholderLabel?: string;
  featuredOnHome?: boolean;
}

/**
 * Single configuration array for all 15 portfolio items.
 * To swap a placeholder for a real photo later, set `isPlaceholder: false`
 * and provide the uploaded image path in `src`.
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. rockylens-01.jpg
  {
    id: 'rockylens-01',
    filename: 'rockylens-01.jpg',
    src: '/assets/aistudio/image_20261123_185848_46206dd2.jpg',
    alt: 'A young graduate in a navy gown and cap with a gold tassel stands outdoors on campus beside a "Class of 2026" banner framed by gold, white and sage-green balloons.',
    caption: 'Graduation portrait, Class of 2026',
    group: 'Portraits',
    subGroup: 'Graduation',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  // 2. rockylens-02.jpg
  {
    id: 'rockylens-02',
    filename: 'rockylens-02.jpg',
    src: '/assets/aistudio/image_20261123_185843_1_45d72293.jpg',
    alt: 'Crew members set up a large LED screen on a truss, with cables, flight cases and a scissor lift in a big event hall before a gala dinner.',
    caption: 'Behind the scenes: corporate gala setup',
    group: 'Events',
    subGroup: 'Corporate',
    isPlaceholder: false,
  },
  // 3. rockylens-03.jpg
  {
    id: 'rockylens-03',
    filename: 'rockylens-03.jpg',
    src: '/assets/aistudio/image_20261123_184439_2_a606e5d6.jpg',
    alt: 'A reception table with a white rose and gold-leaf centerpiece, gold plates and "Table 5" cards, while guests in traditional attire dance in the warm-lit background.',
    caption: 'Wedding reception details',
    group: 'Events',
    subGroup: 'Weddings',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  // 4. rockylens-04.jpg
  {
    id: 'rockylens-04',
    filename: 'rockylens-04.jpg',
    src: '/assets/aistudio/image_20261123_184438_1_89430d51.jpg',
    alt: 'An outdoor wedding ceremony at sunset: white-covered chairs line a petal-strewn aisle leading to a floral arch of pink roses and pampas grass.',
    caption: 'Sunset garden wedding ceremony',
    group: 'Events',
    subGroup: 'Weddings',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  // 5. rockylens-05.jpg
  {
    id: 'rockylens-05',
    filename: 'rockylens-05.jpg',
    src: '/assets/aistudio/image_20261123_184439_8d347057.jpg',
    alt: 'Four laughing children gather around a chocolate birthday cake with lit candles, in a room with bunting, balloons and a "Happy Birthday" banner.',
    caption: "Kids' birthday party moments",
    group: 'Events',
    subGroup: 'Birthdays',
    isPlaceholder: false,
  },
  // 6. rockylens-06.jpg
  {
    id: 'rockylens-06',
    filename: 'rockylens-06.jpg',
    src: '/assets/aistudio/image_20261123_185715_c060cd81.jpg',
    alt: 'Guests in elegant traditional outfits, including a gold gele, share a toast at a long table of white flowers, candles and gold décor under draped fabric and fairy lights.',
    caption: 'Luxury reception, gold and ivory styling',
    group: 'Events',
    subGroup: 'Weddings',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  // 7. rockylens-07.jpg
  {
    id: 'rockylens-07',
    filename: 'rockylens-07.jpg',
    src: '/assets/aistudio/image_20261123_185726_35453edc.jpg',
    alt: 'Four children in colorful outfits gather around a gold-and-white birthday cake with lit candles; two event staff in green uniforms stand behind them, with green and gold balloons and wrapped gifts.',
    caption: 'Themed birthday celebration',
    group: 'Events',
    subGroup: 'Birthdays',
    isPlaceholder: false,
  },
  // 8. rockylens-08.jpg
  {
    id: 'rockylens-08',
    filename: 'rockylens-08.jpg',
    src: '/assets/aistudio/image_20261123_185719_f2aafa02.jpg',
    alt: 'A dressed gala stage with a large LED screen, black-draped round tables with place settings and floral centerpieces, and crew making final checks.',
    caption: 'Corporate gala dinner, ready for guests',
    group: 'Events',
    subGroup: 'Corporate',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  // 9. rockylens-09.jpg
  {
    id: 'rockylens-09',
    filename: 'rockylens-09.jpg',
    src: '/assets/aistudio/image_20261123_185717_f16091a3.jpg',
    alt: 'Four business professionals chat and network at a corporate conference in front of a branded banner.',
    caption: 'Corporate conference networking',
    group: 'Events',
    subGroup: 'Corporate',
    isPlaceholder: false,
  },
  // 10. rockylens-10.jpg
  {
    id: 'rockylens-10',
    filename: 'rockylens-10.jpg',
    src: '/assets/aistudio/921132719_1157631283418896_4466730043792083826_n_d2e8762a.webp',
    alt: 'Graduates in black gowns with scrolls and a bouquet laugh together on a decorated outdoor stage with green and white balloons and flowers.',
    caption: 'Graduation ceremony celebration',
    group: 'Events',
    subGroup: 'Graduations',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  // 11. Portrait Placeholder 1 (TODO: replace with real corporate headshot photo)
  {
    id: 'portrait-placeholder-corporate',
    filename: 'placeholder-corporate-headshot.jpg',
    src: null,
    alt: 'Corporate headshot photography sample coming soon from RockyLens Studio in Ilorin.',
    caption: 'Corporate headshot session',
    group: 'Portraits',
    isPlaceholder: true,
    placeholderLabel: 'Corporate Headshot · Photo coming soon',
  },
  // 12. Portrait Placeholder 2 (TODO: replace with real studio-style portrait photo)
  {
    id: 'portrait-placeholder-studio',
    filename: 'placeholder-studio-portrait.jpg',
    src: null,
    alt: 'On-location studio-style portrait photography sample coming soon from RockyLens Studio.',
    caption: 'On-location studio portrait',
    group: 'Portraits',
    isPlaceholder: true,
    placeholderLabel: 'Studio Portrait · Photo coming soon',
  },
  // 13. Product Placeholder 1 (TODO: replace with real white background product photo)
  {
    id: 'product-placeholder-white-bg',
    filename: 'placeholder-product-white-bg.jpg',
    src: null,
    alt: 'Clean white background e-commerce product photography sample coming soon.',
    caption: 'White background product photography',
    group: 'Products',
    isPlaceholder: true,
    placeholderLabel: 'White Background · Photo coming soon',
  },
  // 14. Product Placeholder 2 (TODO: replace with real jewelry product photo)
  {
    id: 'product-placeholder-jewelry',
    filename: 'placeholder-product-jewelry.jpg',
    src: null,
    alt: 'Luxury jewelry product photography sample coming soon from RockyLens Studio.',
    caption: 'Jewelry detail photography',
    group: 'Products',
    isPlaceholder: true,
    placeholderLabel: 'Jewelry Showcase · Photo coming soon',
  },
  // 15. Product Placeholder 3 (TODO: replace with real food product photo)
  {
    id: 'product-placeholder-food',
    filename: 'placeholder-product-food.jpg',
    src: null,
    alt: 'Food and culinary product photography sample coming soon from RockyLens Studio.',
    caption: 'Food & menu photography',
    group: 'Products',
    isPlaceholder: true,
    placeholderLabel: 'Food Styling · Photo coming soon',
  },
];

export const HOME_SELECTED_WORK = PORTFOLIO_ITEMS.filter((item) => item.featuredOnHome);
export const HERO_IMAGE = PORTFOLIO_ITEMS.find((item) => item.id === 'rockylens-04')!;

export type PortfolioGroup = 'Portraits' | 'Products' | 'Events';
export type EventSubGroup = 'Weddings' | 'Birthdays' | 'Corporate';

export interface PortfolioItem {
  id: string;
  filename: string;
  src: string | null;
  alt: string;
  caption: string;
  group: PortfolioGroup;
  subGroup?: EventSubGroup;
  orientation: 'portrait' | 'landscape' | 'square';
  isPlaceholder: boolean;
  placeholderLabel?: string;
  featuredOnHome?: boolean;
}

/**
 * Single configuration array for RockyLens Studio portfolio items.
 * Includes both the newly uploaded portraits/celebrations and all previous uploaded shots,
 * plus labeled placeholders for white-background & jewelry shoots.
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Portraits (New + Previous)
  {
    id: 'portrait-pearl-blazer',
    filename: 'pearl-blazer-studio-portrait.jpg',
    src: '/assets/aistudio/5dff8584eaf9896cb512faa7d3387bbe_d8497acf.jpg',
    alt: 'A poised woman in an ivory tailored blazer embellished with pearls posing in warm studio lighting against a textured neutral backdrop.',
    caption: 'Editorial pearl-blazer studio portrait',
    group: 'Portraits',
    orientation: 'portrait',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  {
    id: 'portrait-white-couture-couple',
    filename: 'white-couture-couple-portrait.jpg',
    src: '/assets/aistudio/716a1cd508f52fff11e45ea89b8c964e_6f293c2a.jpg',
    alt: 'A couple dressed in a white pearl-bodice gown and embroidered white tuxedo standing before softly draped ivory curtains and a chandelier.',
    caption: 'Luxury white couture couple portrait',
    group: 'Portraits',
    orientation: 'portrait',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  {
    id: 'portrait-wine-studio',
    filename: 'couple-wine-traditional-portrait.jpg',
    src: '/assets/aistudio/c8c42ae6d483b57c11140037e43fa1eb_e0077504.jpg',
    alt: 'A smiling Nigerian couple in rich wine-burgundy traditional agbada, coral beads, and pleated aso-oke gele posed under warm studio portrait lighting.',
    caption: 'Traditional studio-lit couple portrait',
    group: 'Portraits',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'portrait-white-double',
    filename: 'couple-white-editorial-portrait.jpg',
    src: '/assets/aistudio/a2b03de5ddb4307f8578c7bfff10a748_41c400ed.jpg',
    alt: 'A couple dressed in crisp white attire holding hands and smiling at each other, framed between close-up profile silhouettes in a clean studio setup.',
    caption: 'Minimalist white editorial portrait',
    group: 'Portraits',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'portrait-crimson-window',
    filename: 'couple-crimson-agbada-portrait.jpg',
    src: '/assets/aistudio/e8b49f114339f4848c2e6e2546ba554d_3ec432ef.jpg',
    alt: 'A couple in tailored white and crimson traditional attire holding hands in front of tall sunlit glass windows.',
    caption: 'Natural-light traditional portrait',
    group: 'Portraits',
    orientation: 'portrait',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  {
    id: 'portrait-emerald-outdoor',
    filename: 'emerald-evening-portrait.jpg',
    src: '/assets/aistudio/f3db39d1c59ff7884be599b3dc3fd7de_79d787f8.jpg',
    alt: 'A poised woman in an emerald beaded dress standing outdoors before a celebratory portrait backdrop under bright daylight.',
    caption: 'Celebration outdoor portrait',
    group: 'Portraits',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'portrait-fourth-birthday-girl',
    filename: 'fourth-birthday-studio-portrait.jpg',
    src: '/assets/aistudio/308d8112703bd5207674ea45e4fa42fb_42148460.jpg',
    alt: 'A young girl in a royal-blue tulle gown and tiara seated before a pastel pink and blue balloon arch with a Happy Birthday 4 backdrop.',
    caption: 'Children’s studio birthday portrait',
    group: 'Portraits',
    orientation: 'portrait',
    isPlaceholder: false,
  },

  // Products & Confectionery Details
  {
    id: 'product-burgundy-cake',
    filename: 'burgundy-marble-tier-cake.jpg',
    src: '/assets/aistudio/b4220e7da2e8483267481b8c8efe9b04_e64d0dcc.jpg',
    alt: 'A three-tier burgundy and white marble fondant wedding cake adorned with cascading silver pearls and deep red sugar roses on a silver stand.',
    caption: 'Luxury three-tier celebration cake',
    group: 'Products',
    orientation: 'portrait',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  {
    id: 'product-pink-cake',
    filename: 'pink-floral-butterfly-cake.jpg',
    src: '/assets/aistudio/eff581de14a194a5771d9c6f76d8fe55_d03dfbed.jpg',
    alt: 'A two-tier pastel pink celebration cake topped with sculpted buttercream roses and butterfly accents on a clean pedestal.',
    caption: 'Artisan bakery showcase',
    group: 'Products',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'product-placeholder-white-bg',
    filename: 'placeholder-product-white-bg.jpg',
    src: null,
    alt: 'Clean white background e-commerce product photography sample coming soon.',
    caption: 'White background catalogue shot',
    group: 'Products',
    orientation: 'square',
    isPlaceholder: true,
    placeholderLabel: 'White Background · Photo coming soon',
  },
  {
    id: 'product-placeholder-jewelry',
    filename: 'placeholder-product-jewelry.jpg',
    src: null,
    alt: 'Luxury jewelry product photography sample coming soon from RockyLens Studio.',
    caption: 'Jewelry macro showcase',
    group: 'Products',
    orientation: 'square',
    isPlaceholder: true,
    placeholderLabel: 'Jewelry Showcase · Photo coming soon',
  },

  // Events — Weddings
  {
    id: 'event-burgundy-traditional-couple',
    filename: 'burgundy-traditional-wedding-couple.jpg',
    src: '/assets/aistudio/247b337fcf907adcc1afa07b29b0e161_f089a146.jpg',
    alt: 'A bride and groom dressed in burgundy lace, coral beads, embroidered cap, and ivory tunic holding hands with a feathered hand fan.',
    caption: 'Traditional wedding couple portrait',
    group: 'Events',
    subGroup: 'Weddings',
    orientation: 'portrait',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  {
    id: 'event-wedding-entrance',
    filename: 'wedding-couple-aisle-entrance.jpg',
    src: '/assets/aistudio/d0b8282b2eb3827f1a62f42cfeb0b473_abf05f71.jpg',
    alt: 'A smiling groom in a camel suit and bride in a bronze beaded gown leading their bridal party down a white rose-lined reception aisle.',
    caption: 'Grand reception aisle entrance',
    group: 'Events',
    subGroup: 'Weddings',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'event-wedding-party-stage',
    filename: 'bridal-party-emerald-stage.jpg',
    src: '/assets/aistudio/d218aa31ce658bff9454e692028c3a05_a17bf8ff.jpg',
    alt: 'Groomsmen in sage-grey suits and bridesmaids in emerald satin gowns posing joyfully around the couple on an arched floral stage.',
    caption: 'Bridal party & groomsmen portrait',
    group: 'Events',
    subGroup: 'Weddings',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'event-bridal-prep',
    filename: 'bridal-morning-prep.jpg',
    src: '/assets/aistudio/25167b30e0221d1dbdf68e3f49ba6bc9_14bf47be.jpg',
    alt: 'A bride in white silk and veil surrounded by bridesmaids in blush pink robes celebrating beneath gold and white ceiling balloons.',
    caption: 'Bridal suite morning prep',
    group: 'Events',
    subGroup: 'Weddings',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'event-traditional-rose',
    filename: 'traditional-wedding-rose-attire.jpg',
    src: '/assets/aistudio/a1ab120cc75362d19ff57eae0f170879_4b635063.jpg',
    alt: 'A joyful couple dressed in dusty-rose pink agbada, coral beads, and pearl-detailed aso-oke exchanging a warm glance outdoors.',
    caption: 'Traditional wedding engagement',
    group: 'Events',
    subGroup: 'Weddings',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'event-wedding-backdrop',
    filename: 'outdoor-wedding-floral-wall.jpg',
    src: '/assets/aistudio/bd0b915967de49c8d6587c354b6576de_a9696beb.jpg',
    alt: 'An outdoor garden wedding photo wall featuring couple portraits, cream-and-gold floral clusters, and manicured green lawn.',
    caption: 'Garden ceremony photo backdrop',
    group: 'Events',
    subGroup: 'Weddings',
    orientation: 'square',
    isPlaceholder: false,
  },
  {
    id: 'event-ceremony-aisle',
    filename: 'ceremony-illuminated-aisle.jpg',
    src: '/assets/aistudio/65749e7154c66c19059d9190f7ee98e3_ad89434e.jpg',
    alt: 'An indoor ceremony aisle lined with white pedestals, illuminated floral branches, and royal blue chair sashes before guests arrive.',
    caption: 'Ceremony hall aisle styling',
    group: 'Events',
    subGroup: 'Weddings',
    orientation: 'portrait',
    isPlaceholder: false,
  },

  // Events — Birthdays & Celebrations
  {
    id: 'event-milestone-family-stage',
    filename: 'milestone-family-blue-white-stage.jpg',
    src: '/assets/aistudio/60995f73fcba7b3ffff58fcc8ee4394a_029d0481.jpg',
    alt: 'A smiling couple holding their baby in crisp white and royal-blue lace attire seated on a white sofa before an ornate milestone backdrop.',
    caption: 'Milestone birthday & family celebration',
    group: 'Events',
    subGroup: 'Birthdays',
    orientation: 'portrait',
    isPlaceholder: false,
    featuredOnHome: true,
  },
  {
    id: 'event-40th-banquet',
    filename: 'milestone-banquet-hall-gold.jpg',
    src: '/assets/aistudio/5ec7fdbfa0bc50a38f35d4a66820e9ea_87cccf96.jpg',
    alt: 'A milestone 40th birthday banquet hall dressed with white ceiling drapes, clear ghost chairs, gold charger plates, and floating gold balloons.',
    caption: 'Milestone banquet hall & lighting',
    group: 'Events',
    subGroup: 'Birthdays',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'event-birthday-dining',
    filename: 'outdoor-birthday-dinner-table.jpg',
    src: '/assets/aistudio/fbd9b3651c4d0f9b3ad840f05641314a_f71c444b.jpg',
    alt: 'Guests sharing a celebratory meal at an outdoor birthday table styled with a shimmering gold runner, floral centerpieces, and yellow-and-white balloon draping.',
    caption: 'Outdoor birthday dinner gathering',
    group: 'Events',
    subGroup: 'Birthdays',
    orientation: 'portrait',
    isPlaceholder: false,
  },
  {
    id: 'event-first-birthday',
    filename: 'first-birthday-pink-setup.jpg',
    src: '/assets/aistudio/db12d273e4e07c459602d23bb1940403_6a5125ad.jpg',
    alt: 'A children’s first birthday outdoor setup with pink and white balloon arches, swan backdrop, cake pedestals, and miniature seating.',
    caption: 'Children’s milestone party setup',
    group: 'Events',
    subGroup: 'Birthdays',
    orientation: 'square',
    isPlaceholder: false,
  },
  {
    id: 'event-naming-ceremony',
    filename: 'baby-naming-ceremony-decor.jpg',
    src: '/assets/aistudio/17b58d9e642a21aea000c7752ff7e16d_c53b9950.jpg',
    alt: 'A baby naming ceremony backdrop framed by blue, silver, and white balloon garlands on green turf.',
    caption: 'Baby naming ceremony celebration',
    group: 'Events',
    subGroup: 'Birthdays',
    orientation: 'portrait',
    isPlaceholder: false,
  },

  // Events — Corporate
  {
    id: 'event-corporate-banquet',
    filename: 'formal-banquet-hall-royal-blue.jpg',
    src: '/assets/aistudio/bf5fb4f968b12ca574ab549eea0cd5b9_5365c89c.jpg',
    alt: 'A spacious formal banquet and awards hall arranged with round tables in royal blue and white linens facing a draped podium stage.',
    caption: 'Formal gala & awards banquet',
    group: 'Events',
    subGroup: 'Corporate',
    orientation: 'square',
    isPlaceholder: false,
  },
];

export const HOME_SELECTED_WORK = PORTFOLIO_ITEMS.filter((item) => item.featuredOnHome);
export const ALL_REAL_PORTFOLIO_IMAGES = PORTFOLIO_ITEMS.filter(
  (item) => !item.isPlaceholder && Boolean(item.src)
);
export const HERO_PRIMARY_IMAGE = PORTFOLIO_ITEMS.find(
  (item) => item.id === 'portrait-pearl-blazer'
)!;
export const HERO_SECONDARY_IMAGE = PORTFOLIO_ITEMS.find(
  (item) => item.id === 'portrait-white-couture-couple'
)!;
export const HERO_ACCENT_IMAGE = PORTFOLIO_ITEMS.find(
  (item) => item.id === 'event-burgundy-traditional-couple'
)!;

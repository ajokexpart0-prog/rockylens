export type ServiceCategory =
  | 'Portrait Photography'
  | 'Product Photography'
  | 'Event Photography';

export interface PortraitPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  details: string;
}

export interface ProductTypeRate {
  id: string;
  name: string;
  pricePerItem: number;
  unitLabel: string;
}

export interface ProductBundle {
  id: string;
  name: string;
  productCount: number;
  price: number;
  details: string;
}

export interface EventPackage {
  id: string;
  name: string;
  price: number;
  isCustomFrom?: boolean;
  duration: string;
  details: string;
}

export const PORTRAIT_PACKAGES: PortraitPackage[] = [
  {
    id: 'portrait-headshot-express',
    name: 'Headshot Express',
    price: 15000,
    duration: '30 min',
    details: '30 min · 1 outfit · 5 edited photos',
  },
  {
    id: 'portrait-professional',
    name: 'Professional',
    price: 25000,
    duration: '1 hr',
    details: '1 hr · 2 outfits · 10 edited photos · studio-style or outdoor',
  },
  {
    id: 'portrait-executive',
    name: 'Executive / Personal Brand',
    price: 45000,
    duration: '2 hrs',
    details: '2 hrs · 3 outfits · 20 edited photos · indoor and outdoor',
  },
  {
    id: 'portrait-graduation',
    name: 'Graduation Session',
    price: 20000,
    duration: '1 hr',
    details: '1 hr · gown and casual looks · 10 edited photos',
  },
];

export const PRODUCT_TYPES: ProductTypeRate[] = [
  {
    id: 'product-white-bg',
    name: 'White background',
    pricePerItem: 3000,
    unitLabel: 'per product',
  },
  {
    id: 'product-lifestyle',
    name: 'Lifestyle',
    pricePerItem: 6000,
    unitLabel: 'per product',
  },
  {
    id: 'product-jewelry',
    name: 'Jewelry',
    pricePerItem: 5000,
    unitLabel: 'per product',
  },
  {
    id: 'product-food',
    name: 'Food',
    pricePerItem: 5000,
    unitLabel: 'per product',
  },
  {
    id: 'product-fashion',
    name: 'Fashion',
    pricePerItem: 8000,
    unitLabel: 'per look',
  },
];

export const PRODUCT_BUNDLES: ProductBundle[] = [
  {
    id: 'bundle-starter',
    name: 'Starter (5 products)',
    productCount: 5,
    price: 20000,
    details: '5 products · Ideal for new product launches',
  },
  {
    id: 'bundle-growth',
    name: 'Growth (15 products)',
    productCount: 15,
    price: 50000,
    details: '15 products · Built for active catalogues and sellers',
  },
  {
    id: 'bundle-brand',
    name: 'Brand (30 products)',
    productCount: 30,
    price: 90000,
    details: '30 products · Full collection refresh',
  },
];

export const EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'event-mini',
    name: 'Mini',
    price: 60000,
    duration: '2 hrs',
    details: '2 hrs · 40 edited photos',
  },
  {
    id: 'event-standard',
    name: 'Standard',
    price: 120000,
    duration: '4 hrs',
    details: '4 hrs · 100 edited photos · online gallery',
  },
  {
    id: 'event-full-day',
    name: 'Full Day',
    price: 250000,
    duration: '8 hrs',
    details: '8 hrs · 250+ edited photos · online gallery',
  },
  {
    id: 'event-wedding',
    name: 'Wedding Coverage',
    price: 250000,
    isCustomFrom: true,
    duration: 'Full coverage',
    details: 'From ₦250,000 · Custom quote confirmed on WhatsApp',
  },
];

export const EXTRAS_RATES = {
  extraEventHour: 25000,
  extraPortraitPhoto: 1500,
} as const;

export const DELIVERY_TIMELINES: Record<ServiceCategory, string> = {
  'Portrait Photography': 'Delivery: 48 hours.',
  'Product Photography': 'Minimum 5 products. Delivery: 24 to 72 hours.',
  'Event Photography': 'Delivery: 5 to 7 days, with a sneak peek in 48 hours.',
};

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

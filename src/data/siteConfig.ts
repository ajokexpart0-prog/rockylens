export type PageRoute = '/' | '/about' | '/services' | '/portfolio' | '/book';

export const BUSINESS_INFO = {
  name: 'RockyLens Studio',
  tagline: 'Frames That Command Attention.',
  baseArea: 'Tanke, Ilorin',
  fullRegion: 'Tanke, Ilorin, Kwara State, Nigeria',
  hours: 'Monday to Saturday, 9am to 6pm, by appointment',
  phoneDisplay: '09161959398',
  whatsappBase: 'https://wa.me/2349161959398',
  email: 'ajokexpart0@gmail.com',
  // TODO: add Instagram handle when created
  instagramUrl: '#',
  // TODO: add TikTok handle when created
  tiktokUrl: '#',
  floatingWhatsappMessage: "Hello RockyLens Studio, I'd like to make an enquiry.",
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS: ReadonlyArray<{ label: string; path: PageRoute }> = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Book a Shoot', path: '/book' },
];

export const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'Fair Pricing',
    description:
      'Transparent Naira packages with zero hidden studio markups and no travel fee anywhere within Ilorin.',
  },
  {
    number: '02',
    title: 'Premium Quality',
    description:
      'Sharp framing, balanced skin tones, and clean colour grading crafted to hold up on billboards and mobile screens alike.',
  },
  {
    number: '03',
    title: 'Fast Delivery',
    description:
      'Portraits in 48 hours, products in 24 to 72 hours, and event galleries within 5 to 7 days with a 48-hour sneak peek.',
  },
  {
    number: '04',
    title: 'Creativity',
    description:
      'Thoughtful posing, intentional lighting, and adaptable mobile studio-style setups tailored to your location.',
  },
] as const;

export const APPROACH_STEPS = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We listen first—understanding your goals, outfit or product styling, location lighting, and timeline before a single frame is shot.',
  },
  {
    step: '02',
    title: 'Direct',
    description:
      'No awkward stiffness. We guide posture, angles, and product placement calmly so you feel natural and confident throughout the session.',
  },
  {
    step: '03',
    title: 'Capture',
    description:
      'Using professional cameras and portable lighting, we shoot cleanly on location—at your office, home, outdoor spot, or event venue.',
  },
  {
    step: '04',
    title: 'Deliver',
    description:
      'Every chosen frame is carefully retouched and colour-graded, then delivered via an online gallery link and WhatsApp right on schedule.',
  },
] as const;

export const STUDIO_VALUES = [
  {
    title: 'On-Location Convenience',
    detail:
      'We have no fixed physical studio—we bring studio-grade lighting and backdrops directly to your venue, office, home, or outdoor spot.',
  },
  {
    title: 'Honest Expectations',
    detail:
      'Clear turnaround windows, straightforward 50% booking deposits, and direct communication from enquiry to final delivery.',
  },
  {
    title: 'Respect for Your Time',
    detail:
      'Punctual arrivals across Tanke and wider Ilorin, efficient setup, and organized shooting schedules.',
  },
  {
    title: 'Intentional Craft',
    detail:
      'Whether photographing a single executive headshot, an e-commerce product line, or a full-day celebration, every frame is purposeful.',
  },
] as const;

export const REVIEWS = [
  {
    name: 'Elizabeth',
    text: "RockyLens Studio did an amazing job! The quality of the work was excellent, and the attention to detail was impressive. I'm very happy with the results and would definitely recommend their services.",
  },
  {
    name: 'Daniel',
    text: 'Excellent service from start to finish! Communication was smooth, delivery was on time, and the final result exceeded my expectations. Definitely a five-star experience!',
  },
  {
    name: 'Pricilian',
    text: "I'm really impressed with RockyLens Studio. Very professional, creative, and committed to delivering quality work. I had a wonderful experience and look forward to working with them again!",
  },
] as const;

export const POLICIES = [
  {
    title: 'Coverage & Travel',
    text: 'Ilorin shoots enjoy affordable standard rates with no travel fee. Shoots outside Ilorin carry a travel fee quoted upfront on WhatsApp.',
  },
  {
    title: 'Booking & Payment',
    text: 'A 50% deposit confirms your booking date, with the remaining balance due before final delivery. DM us on WhatsApp for payment details.',
  },
  {
    title: 'Image Delivery',
    text: 'Final edited images are delivered cleanly via a private online gallery link and WhatsApp for quick mobile sharing.',
  },
  {
    title: 'On-Location Service',
    text: 'RockyLens Studio operates fully on location (no physical studio). We travel to your home, office, outdoor spot, or event venue with portable lighting when needed.',
  },
] as const;

import { PageRoute } from '../data/siteConfig';

interface PageMeta {
  title: string;
  description: string;
}

const PAGE_META: Record<PageRoute, PageMeta> = {
  '/': {
    title: 'RockyLens Studio — Photographer in Ilorin | Portraits, Products & Events',
    description:
      'On-location portrait, product, and event photography in Tanke, Ilorin, Nigeria. View our work, see prices, and book your shoot via form or WhatsApp.',
  },
  '/about': {
    title: 'About RockyLens Studio — Mobile Photographer in Tanke, Ilorin',
    description:
      'Learn about RockyLens Studio, an Ilorin-based on-location photography service for professionals, businesses, and celebrations across Kwara State.',
  },
  '/services': {
    title: 'Services & Pricing — RockyLens Studio | Ilorin Photography Packages',
    description:
      'Transparent Naira pricing for portrait, product, and event photography in Ilorin. Build your custom shoot estimate and send it directly on WhatsApp.',
  },
  '/portfolio': {
    title: 'Portfolio — RockyLens Studio | Portraits, Products & Event Photography in Ilorin',
    description:
      'Browse selected weddings, corporate galas, birthdays, and graduation portraits captured by RockyLens Studio in Nigeria.',
  },
  '/book': {
    title: 'Book a Shoot — RockyLens Studio | Tanke, Ilorin Enquiry',
    description:
      'Reserve your portrait, product, or event photography session in Ilorin. Submit our booking enquiry form or message RockyLens Studio on WhatsApp.',
  },
};

export function updatePageMeta(route: PageRoute): void {
  const meta = PAGE_META[route] ?? PAGE_META['/'];
  document.title = meta.title;

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[name="twitter:title"]', meta.title);
  setMeta('meta[name="twitter:description"]', meta.description);
}

import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import {
  HERO_ACCENT_IMAGE,
  HERO_PRIMARY_IMAGE,
  HERO_SECONDARY_IMAGE,
  HOME_SELECTED_WORK,
  PortfolioItem,
} from '../data/portfolio';
import {
  BUSINESS_INFO,
  DIFFERENTIATORS,
  PageRoute,
  buildWhatsAppUrl,
} from '../data/siteConfig';
import { Lightbox } from '../components/Lightbox';
import { PhotoFrame } from '../components/PhotoFrame';
import { ReviewsSection } from '../components/ReviewsSection';

interface HomePageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const SERVICE_CARDS = [
  {
    title: 'Portraits',
    kicker: 'From ₦15,000 · 48h delivery',
    description:
      'Corporate headshots, studio-lit couple portraits, outdoor sessions, and graduation portraits shot on location across Ilorin.',
    serviceAnchor: 'portraits',
    previewSrc: '/assets/aistudio/a2b03de5ddb4307f8578c7bfff10a748_41c400ed.jpg',
    previewAlt: 'Editorial couple portrait in crisp white attire',
  },
  {
    title: 'Products',
    kicker: 'From ₦3,000 / product · 24–72h delivery',
    description:
      'Clean white-background catalogues, confectionery, lifestyle setups, jewelry, food, and fashion lookbooks built to convert.',
    serviceAnchor: 'products',
    previewSrc: '/assets/aistudio/b4220e7da2e8483267481b8c8efe9b04_e64d0dcc.jpg',
    previewAlt: 'Three-tier burgundy and white marble wedding cake',
  },
  {
    title: 'Events',
    kicker: 'From ₦60,000 · 48h sneak peek',
    description:
      'Traditional and white weddings, birthdays, naming ceremonies, corporate banquets, and graduation celebrations.',
    serviceAnchor: 'events',
    previewSrc: '/assets/aistudio/d218aa31ce658bff9454e692028c3a05_a17bf8ff.jpg',
    previewAlt: 'Bridal party and groomsmen on an arched reception stage',
  },
] as const;

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const selectedPhotos: PortfolioItem[] = HOME_SELECTED_WORK;

  return (
    <div>
      {/* Editorial Split Hero on Pure White */}
      <section className="border-b border-[#130521]/10 bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
                {BUSINESS_INFO.tagline} · Tanke, Ilorin
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-[#130521] sm:text-5xl lg:text-[3.4rem] text-balance">
                Portraits, products and events, captured with intention.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#130521]/78 sm:text-lg">
                On-location photographer in Ilorin, Nigeria serving professionals, growing brands, and milestone celebrations. No fixed studio—we bring lighting and direction straight to you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/book')}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#2E0854] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-[#1E043B] whitespace-nowrap"
                >
                  Book a Shoot
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <a
                  href={buildWhatsAppUrl(BUSINESS_INFO.floatingWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#130521]/20 bg-[#F0E9F8] px-6 py-3 text-sm font-semibold text-[#130521] transition-colors duration-150 hover:border-[#2E0854] hover:text-[#2E0854] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 text-[#2E0854]" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Curated 3-Frame Editorial Collage */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-12 gap-3 sm:gap-4">
                <div className="col-span-7 overflow-hidden rounded-2xl border border-[#130521]/10 bg-[#F0E9F8] p-2">
                  {HERO_PRIMARY_IMAGE.src && (
                    <img
                      src={HERO_PRIMARY_IMAGE.src}
                      alt={HERO_PRIMARY_IMAGE.alt}
                      fetchPriority="high"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      className="aspect-[3/4] h-full w-full rounded-xl object-cover object-top"
                    />
                  )}
                </div>
                <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                  <div className="flex-1 overflow-hidden rounded-2xl border border-[#130521]/10 bg-[#F0E9F8] p-2">
                    {HERO_SECONDARY_IMAGE.src && (
                      <img
                        src={HERO_SECONDARY_IMAGE.src}
                        alt={HERO_SECONDARY_IMAGE.alt}
                        fetchPriority="high"
                        loading="eager"
                        referrerPolicy="no-referrer"
                        className="aspect-[4/5] h-full w-full rounded-xl object-cover object-top"
                      />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden rounded-2xl border border-[#130521]/10 bg-[#F0E9F8] p-2">
                    {HERO_ACCENT_IMAGE.src && (
                      <img
                        src={HERO_ACCENT_IMAGE.src}
                        alt={HERO_ACCENT_IMAGE.alt}
                        loading="eager"
                        referrerPolicy="no-referrer"
                        className="aspect-[4/3] h-full w-full rounded-xl object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width Studio Strip below Hero */}
          <div className="mt-12 grid grid-cols-2 gap-4 rounded-xl border border-[#130521]/10 bg-[#F0E9F8] p-5 sm:grid-cols-4 sm:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2E0854]">
                Base Area
              </p>
              <p className="mt-1 text-sm font-semibold text-[#130521]">
                Tanke, Ilorin
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2E0854]">
                Ilorin Travel
              </p>
              <p className="mt-1 text-sm font-semibold text-[#130521]">
                No travel fee in Ilorin
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2E0854]">
                Turnaround
              </p>
              <p className="mt-1 text-sm font-semibold text-[#130521] tabular-nums">
                48h portraits · 24–72h products
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2E0854]">
                Hours
              </p>
              <p className="mt-1 text-sm font-semibold text-[#130521]">
                Mon–Sat, 9am–6pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Service Cards */}
      <section className="py-20 sm:py-24" aria-labelledby="home-services-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
                What We Shoot
              </p>
              <h2
                id="home-services-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#130521] sm:text-4xl text-balance"
              >
                Photography tailored to your goal
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#2E0854] transition-opacity hover:opacity-80 whitespace-nowrap"
            >
              View full pricing &amp; order builder
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICE_CARDS.map((card) => (
              <div
                key={card.title}
                className="reveal-item flex flex-col justify-between overflow-hidden rounded-xl border border-[#130521]/10 bg-[#F0E9F8] transition-colors duration-200 hover:border-[#2E0854]/50"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden border-b border-[#130521]/10 bg-white">
                    <img
                      src={card.previewSrc}
                      alt={card.previewAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-[#2E0854] tabular-nums">
                      {card.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-[#130521]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#130521]/75">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#130521]/10 px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('/services', card.serviceAnchor)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#130521] transition-colors hover:text-[#2E0854]"
                  >
                    See {card.title.toLowerCase()} packages
                    <ArrowRight className="h-4 w-4 text-[#2E0854]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work (6 images) */}
      <section
        className="border-y border-[#130521]/10 bg-[#F0E9F8]/60 py-20 sm:py-24"
        aria-labelledby="selected-work-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
                Selected Work
              </p>
              <h2
                id="selected-work-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#130521] sm:text-4xl text-balance"
              >
                Recent frames from portraits, details, and celebrations
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/portfolio')}
              className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-lg border border-[#130521]/20 bg-white px-4 py-2 text-sm font-semibold text-[#130521] transition-colors hover:border-[#2E0854] hover:text-[#2E0854] whitespace-nowrap"
            >
              View All Portfolio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedPhotos.map((item, idx) => (
              <div key={item.id} className="reveal-item">
                <PhotoFrame
                  item={item}
                  aspectClass="aspect-[4/5]"
                  onClick={() => setLightboxIndex(idx)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RockyLens */}
      <section className="py-20 sm:py-24" aria-labelledby="why-rockylens-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
              Why RockyLens
            </p>
            <h2
              id="why-rockylens-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#130521] sm:text-4xl text-balance"
            >
              Built for clear communication and dependable results
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.number}
                className="reveal-item rounded-xl border border-[#130521]/10 bg-[#F0E9F8] p-6"
              >
                <span className="font-display text-2xl font-semibold text-[#2E0854] tabular-nums">
                  {item.number}.
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#130521]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#130521]/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <div className="border-t border-[#130521]/10 bg-[#F0E9F8]/45">
        <ReviewsSection />
      </div>

      {/* Closing CTA Banner */}
      <section className="border-t border-[#130521]/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-[#2E0854]/25 bg-[#F0E9F8] p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
                Ready When You Are
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[#130521] sm:text-4xl text-balance">
                Looking for a photographer in Ilorin?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#130521]/78 sm:text-base">
                Send your shoot date, location, and package preference. We respond promptly Monday to Saturday, 9am to 6pm, and no travel fee applies within Ilorin.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/book')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#2E0854] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#1E043B] whitespace-nowrap"
              >
                Make an Enquiry
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-[#130521]/20 bg-white px-5 py-3 text-sm font-semibold text-[#130521] transition-colors hover:border-[#2E0854] hover:text-[#2E0854] whitespace-nowrap"
              >
                Explore Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        items={selectedPhotos}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { HERO_IMAGE, HOME_SELECTED_WORK, PortfolioItem } from '../data/portfolio';
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
      'Corporate headshots, personal branding, outdoor portraits, and graduation sessions shot on location with clean lighting.',
    serviceAnchor: 'portraits',
  },
  {
    title: 'Products',
    kicker: 'From ₦3,000 / product · 24–72h delivery',
    description:
      'Crisp white-background catalogues, lifestyle setups, jewelry, food, and fashion lookbooks built for online sellers and brands.',
    serviceAnchor: 'products',
  },
  {
    title: 'Events',
    kicker: 'From ₦60,000 · 48h sneak peek',
    description:
      'Weddings, birthdays, corporate galas, conferences, and graduation ceremonies documented across Ilorin and beyond.',
    serviceAnchor: 'events',
  },
] as const;

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const selectedPhotos: PortfolioItem[] = HOME_SELECTED_WORK;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-[#F5F1EA]/10">
        {HERO_IMAGE.src && (
          <img
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fetchPriority="high"
            loading="eager"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        {/* Measured contrast scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/92 via-[#0B0B0C]/72 to-[#0B0B0C]/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]/40"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24B]">
              {BUSINESS_INFO.tagline} · Tanke, Ilorin
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-[#F5F1EA] sm:text-5xl lg:text-6xl text-balance">
              Portraits, products and events, captured with intention.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F5F1EA]/85 sm:text-lg">
              On-location photography in Ilorin for professionals, growing brands, and unforgettable celebrations. No fixed studio needed—we bring lighting and direction straight to you.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/book')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#C9A24B] px-6 py-3 text-sm font-semibold text-[#0B0B0C] transition-opacity duration-150 hover:opacity-90 whitespace-nowrap"
              >
                Book a Shoot
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={buildWhatsAppUrl(BUSINESS_INFO.floatingWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#F5F1EA]/30 bg-[#0B0B0C]/65 px-6 py-3 text-sm font-semibold text-[#F5F1EA] backdrop-blur-sm transition-colors duration-150 hover:border-[#C9A24B] hover:text-[#C9A24B] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 text-[#C9A24B]" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Three Service Cards */}
      <section className="py-20 sm:py-24" aria-labelledby="home-services-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24B]">
                What We Shoot
              </p>
              <h2
                id="home-services-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F5F1EA] sm:text-4xl text-balance"
              >
                Photography tailored to your goal
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#C9A24B] transition-opacity hover:opacity-80 whitespace-nowrap"
            >
              View full pricing &amp; order builder
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICE_CARDS.map((card) => (
              <div
                key={card.title}
                className="reveal-item flex flex-col justify-between rounded-xl border border-[#F5F1EA]/10 bg-[#1A1A1D] p-7 transition-colors duration-200 hover:border-[#C9A24B]/45"
              >
                <div>
                  <p className="text-xs font-medium text-[#C9A24B] tabular-nums">
                    {card.kicker}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-[#F5F1EA]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#F5F1EA]/75">
                    {card.description}
                  </p>
                </div>

                <div className="mt-7 border-t border-[#F5F1EA]/10 pt-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('/services', card.serviceAnchor)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F1EA] transition-colors hover:text-[#C9A24B]"
                  >
                    See {card.title.toLowerCase()} packages
                    <ArrowRight className="h-4 w-4 text-[#C9A24B]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work (6 images) */}
      <section
        className="border-y border-[#F5F1EA]/10 bg-[#111113] py-20 sm:py-24"
        aria-labelledby="selected-work-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24B]">
                Selected Work
              </p>
              <h2
                id="selected-work-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F5F1EA] sm:text-4xl text-balance"
              >
                Recent frames from celebrations and portraits
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/portfolio')}
              className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-lg border border-[#F5F1EA]/20 px-4 py-2 text-sm font-semibold text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B] whitespace-nowrap"
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
                  aspectClass="aspect-[4/3]"
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24B]">
              Why RockyLens
            </p>
            <h2
              id="why-rockylens-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F5F1EA] sm:text-4xl text-balance"
            >
              Built for clear communication and dependable results
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.number}
                className="reveal-item rounded-xl border border-[#F5F1EA]/10 bg-[#1A1A1D] p-6"
              >
                <span className="font-display text-2xl font-semibold text-[#C9A24B] tabular-nums">
                  {item.number}.
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#F5F1EA]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#F5F1EA]/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <div className="border-t border-[#F5F1EA]/10 bg-[#111113]">
        <ReviewsSection />
      </div>

      {/* Closing CTA Banner */}
      <section className="border-t border-[#F5F1EA]/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-[#C9A24B]/30 bg-[#1A1A1D] p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24B]">
                Ready When You Are
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[#F5F1EA] sm:text-4xl text-balance">
                Looking for a photographer in Ilorin?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#F5F1EA]/75 sm:text-base">
                Send your shoot date, location, and package preference. We respond promptly Monday to Saturday, 9am to 6pm, and no travel fee applies within Ilorin.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/book')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#C9A24B] px-6 py-3 text-sm font-semibold text-[#0B0B0C] transition-opacity hover:opacity-90 whitespace-nowrap"
              >
                Make an Enquiry
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-[#F5F1EA]/25 px-5 py-3 text-sm font-semibold text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B] whitespace-nowrap"
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

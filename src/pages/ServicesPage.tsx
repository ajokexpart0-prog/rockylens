import React from 'react';
import { ArrowDown, MessageCircle, Plus } from 'lucide-react';
import {
  DELIVERY_TIMELINES,
  EVENT_PACKAGES,
  PORTRAIT_PACKAGES,
  PRODUCT_BUNDLES,
  PRODUCT_TYPES,
  ServiceCategory,
  formatNaira,
} from '../data/services';
import { POLICIES, buildWhatsAppUrl } from '../data/siteConfig';
import { OrderBuilder } from '../components/OrderBuilder';
import { ReviewsSection } from '../components/ReviewsSection';
import { OrderSelection } from '../utils/orderState';

interface ServicesPageProps {
  order: OrderSelection;
  onChangeOrder: (next: OrderSelection) => void;
  onContinueToBooking: (queryString: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  order,
  onChangeOrder,
  onContinueToBooking,
}) => {
  const selectPackageIntoBuilder = (
    service: ServiceCategory,
    packageId: string,
    packageLabel: string,
    defaultQty: number
  ) => {
    onChangeOrder({
      ...order,
      service,
      packageId,
      packageLabel,
      quantity: defaultQty,
      extraUnits: 0,
    });
    const el = document.getElementById('order-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-14 sm:pt-20">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-[#F5F1EA]/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24B]">
              Services &amp; Pricing
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-[#F5F1EA] sm:text-5xl text-balance">
              Clear Naira rates for portraits, products, and events.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#F5F1EA]/75 sm:text-base">
              All rates apply to on-location shoots anywhere in Ilorin with no travel fee. Tap &ldquo;Add to Order&rdquo; on any package to calculate your estimate below.
            </p>
          </div>
          <a
            href="#order-builder"
            className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-lg border border-[#C9A24B]/50 bg-[#C9A24B]/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#C9A24B] transition-colors hover:bg-[#C9A24B] hover:text-[#0B0B0C] whitespace-nowrap"
          >
            Jump to Order Builder
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* 1. Portrait Photography */}
        <section
          id="portraits"
          aria-labelledby="portraits-heading"
          className="scroll-mt-24 py-14 border-b border-[#F5F1EA]/10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2
                id="portraits-heading"
                className="font-display text-3xl font-semibold text-[#F5F1EA]"
              >
                Portrait Photography
              </h2>
              <p className="mt-1 text-sm text-[#F5F1EA]/70">
                Corporate headshots, studio-style setups, outdoor portraits, and graduation sessions.
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
              {DELIVERY_TIMELINES['Portrait Photography']}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PORTRAIT_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col justify-between rounded-xl border border-[#F5F1EA]/10 bg-[#1A1A1D] p-6 transition-colors hover:border-[#C9A24B]/40"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#F5F1EA]">
                    {pkg.name}
                  </h3>
                  <p className="mt-3 font-display text-3xl font-semibold text-[#C9A24B] tabular-nums">
                    {formatNaira(pkg.price)}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#F5F1EA]/75">
                    {pkg.details}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    selectPackageIntoBuilder('Portrait Photography', pkg.id, pkg.name, 1)
                  }
                  className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#F5F1EA]/20 bg-[#0B0B0C] px-4 py-2.5 text-xs font-semibold text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B]"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Product Photography */}
        <section
          id="products"
          aria-labelledby="products-heading"
          className="scroll-mt-24 py-14 border-b border-[#F5F1EA]/10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2
                id="products-heading"
                className="font-display text-3xl font-semibold text-[#F5F1EA]"
              >
                Product Photography
              </h2>
              <p className="mt-1 text-sm text-[#F5F1EA]/70">
                Priced per product or in discounted catalogue bundles for brands and online sellers in Ilorin.
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
              {DELIVERY_TIMELINES['Product Photography']}
            </p>
          </div>

          {/* Per-Product Types */}
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#F5F1EA]/65">
            Per-Product Rates (Minimum 5 products)
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PRODUCT_TYPES.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-[#F5F1EA]/10 bg-[#1A1A1D] p-5 transition-colors hover:border-[#C9A24B]/40"
              >
                <div>
                  <h4 className="font-display text-lg font-semibold text-[#F5F1EA]">
                    {item.name}
                  </h4>
                  <p className="mt-2 font-display text-2xl font-semibold text-[#C9A24B] tabular-nums">
                    {formatNaira(item.pricePerItem)}
                  </p>
                  <p className="mt-1 text-xs text-[#F5F1EA]/60">{item.unitLabel}</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    selectPackageIntoBuilder('Product Photography', item.id, item.name, 5)
                  }
                  className="mt-5 inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-lg border border-[#F5F1EA]/20 bg-[#0B0B0C] px-3 py-2 text-xs font-semibold text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B]"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Add to Order
                </button>
              </div>
            ))}
          </div>

          {/* Bundles */}
          <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-[#F5F1EA]/65">
            Product Bundles
          </h3>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {PRODUCT_BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                className="flex flex-col justify-between rounded-xl border border-[#C9A24B]/25 bg-[#1A1A1D] p-6 transition-colors hover:border-[#C9A24B]"
              >
                <div>
                  <h4 className="font-display text-xl font-semibold text-[#F5F1EA]">
                    {bundle.name}
                  </h4>
                  <p className="mt-3 font-display text-3xl font-semibold text-[#C9A24B] tabular-nums">
                    {formatNaira(bundle.price)}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#F5F1EA]/75">
                    {bundle.details}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    selectPackageIntoBuilder('Product Photography', bundle.id, bundle.name, 1)
                  }
                  className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#C9A24B] px-4 py-2.5 text-xs font-semibold text-[#0B0B0C] transition-opacity hover:opacity-90"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Event Photography */}
        <section
          id="events"
          aria-labelledby="events-heading"
          className="scroll-mt-24 py-14 border-b border-[#F5F1EA]/10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2
                id="events-heading"
                className="font-display text-3xl font-semibold text-[#F5F1EA]"
              >
                Event Photography
              </h2>
              <p className="mt-1 text-sm text-[#F5F1EA]/70">
                Weddings, birthdays, corporate conferences, galas, and graduation ceremonies in Ilorin and beyond.
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
              {DELIVERY_TIMELINES['Event Photography']}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EVENT_PACKAGES.map((ev) => (
              <div
                key={ev.id}
                className="flex flex-col justify-between rounded-xl border border-[#F5F1EA]/10 bg-[#1A1A1D] p-6 transition-colors hover:border-[#C9A24B]/40"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#F5F1EA]">
                    {ev.name}
                  </h3>
                  <p className="mt-3 font-display text-3xl font-semibold text-[#C9A24B] tabular-nums">
                    {ev.isCustomFrom ? 'From ' : ''}
                    {formatNaira(ev.price)}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#F5F1EA]/75">
                    {ev.details}
                  </p>
                </div>

                <div className="mt-6 space-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      selectPackageIntoBuilder('Event Photography', ev.id, ev.name, 1)
                    }
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#F5F1EA]/20 bg-[#0B0B0C] px-4 py-2.5 text-xs font-semibold text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B]"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    Add to Order
                  </button>
                  {ev.isCustomFrom && (
                    <a
                      href={buildWhatsAppUrl(
                        "Hello RockyLens Studio, I'd like a custom quote for wedding photography."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 text-xs font-medium text-[#C9A24B] hover:underline"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Custom quote on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Policies Box */}
        <section aria-labelledby="policies-heading" className="pt-14">
          <div className="rounded-2xl border border-[#F5F1EA]/12 bg-[#1A1A1D] p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A24B]">
                  Booking Policies
                </p>
                <h2
                  id="policies-heading"
                  className="mt-1 font-display text-2xl font-semibold text-[#F5F1EA]"
                >
                  Clear terms before you book
                </h2>
              </div>
              <a
                href={buildWhatsAppUrl(
                  'Hello RockyLens Studio, please share payment details for a booking deposit.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#C9A24B] hover:underline whitespace-nowrap"
              >
                DM us on WhatsApp for payment details
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {POLICIES.map((pol) => (
                <div
                  key={pol.title}
                  className="rounded-xl border border-[#F5F1EA]/10 bg-[#0B0B0C] p-5"
                >
                  <h3 className="text-sm font-semibold text-[#F5F1EA]">{pol.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#F5F1EA]/70">
                    {pol.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Order Builder */}
      <OrderBuilder
        order={order}
        onChangeOrder={onChangeOrder}
        onContinueToBooking={onContinueToBooking}
      />

      {/* Reviews Strip */}
      <div className="bg-[#111113]">
        <ReviewsSection compact />
      </div>
    </div>
  );
};

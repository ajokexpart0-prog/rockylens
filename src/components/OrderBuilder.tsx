import React from 'react';
import { ArrowRight, MessageCircle, Minus, Plus, RotateCcw } from 'lucide-react';
import {
  EVENT_PACKAGES,
  EXTRAS_RATES,
  PORTRAIT_PACKAGES,
  PRODUCT_BUNDLES,
  PRODUCT_TYPES,
  ServiceCategory,
  formatNaira,
} from '../data/services';
import { buildWhatsAppUrl } from '../data/siteConfig';
import {
  DEFAULT_ORDER,
  OrderSelection,
  calculateOrder,
  formatWhatsAppOrderMessage,
} from '../utils/orderState';

interface OrderBuilderProps {
  order: OrderSelection;
  onChangeOrder: (next: OrderSelection) => void;
  onContinueToBooking: (queryString: string) => void;
}

const SERVICES: ServiceCategory[] = [
  'Portrait Photography',
  'Product Photography',
  'Event Photography',
];

export const OrderBuilder: React.FC<OrderBuilderProps> = ({
  order,
  onChangeOrder,
  onContinueToBooking,
}) => {
  const calc = calculateOrder(order);

  const handleServiceChange = (service: ServiceCategory) => {
    if (service === 'Portrait Photography') {
      onChangeOrder({
        ...order,
        service,
        packageId: PORTRAIT_PACKAGES[0].id,
        packageLabel: PORTRAIT_PACKAGES[0].name,
        quantity: 1,
        extraUnits: 0,
      });
    } else if (service === 'Product Photography') {
      onChangeOrder({
        ...order,
        service,
        packageId: PRODUCT_BUNDLES[1].id,
        packageLabel: PRODUCT_BUNDLES[1].name,
        quantity: 1,
        extraUnits: 0,
      });
    } else {
      onChangeOrder({
        ...order,
        service,
        packageId: EVENT_PACKAGES[1].id,
        packageLabel: EVENT_PACKAGES[1].name,
        quantity: 1,
        extraUnits: 0,
      });
    }
  };

  const handlePackageChange = (packageId: string) => {
    let label = packageId;
    let nextQty = order.quantity;

    if (order.service === 'Portrait Photography') {
      label = PORTRAIT_PACKAGES.find((p) => p.id === packageId)?.name ?? label;
      nextQty = Math.max(1, order.quantity);
    } else if (order.service === 'Product Photography') {
      const bundle = PRODUCT_BUNDLES.find((b) => b.id === packageId);
      if (bundle) {
        label = bundle.name;
        nextQty = 1;
      } else {
        const typePkg = PRODUCT_TYPES.find((t) => t.id === packageId);
        label = typePkg ? typePkg.name : label;
        nextQty = Math.max(5, order.quantity);
      }
    } else {
      label = EVENT_PACKAGES.find((e) => e.id === packageId)?.name ?? label;
      nextQty = Math.max(1, order.quantity);
    }

    onChangeOrder({
      ...order,
      packageId,
      packageLabel: label,
      quantity: nextQty,
    });
  };

  const isProductBundle =
    order.service === 'Product Photography' &&
    PRODUCT_BUNDLES.some((b) => b.id === order.packageId);

  const isPerProduct =
    order.service === 'Product Photography' && !isProductBundle;

  const minQuantity = isPerProduct ? 5 : 1;

  const whatsappUrl = buildWhatsAppUrl(formatWhatsAppOrderMessage(order, calc));

  const handleContinue = () => {
    const params = new URLSearchParams();
    params.set('service', order.service);
    params.set(
      'package',
      `${calc.packageLabel} (Qty: ${calc.unitDisplayQuantity}${
        calc.extrasTotal > 0 ? `, Extras: ${calc.extrasSummary}` : ''
      }) — Est. ${calc.isCustomQuote ? 'From ' : ''}${formatNaira(calc.estimatedTotal)}`
    );
    if (order.customerName.trim()) params.set('name', order.customerName.trim());
    if (order.preferredDate.trim()) params.set('date', order.preferredDate.trim());
    if (order.shootLocation.trim()) params.set('location', order.shootLocation.trim());
    if (order.details.trim()) params.set('details', order.details.trim());
    onContinueToBooking(params.toString());
  };

  return (
    <section
      id="order-builder"
      aria-labelledby="order-builder-heading"
      className="scroll-mt-24 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#C9A24B]/30 bg-[#1A1A1D] p-6 sm:p-10">
          <div className="flex flex-col gap-4 border-b border-[#F5F1EA]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24B]">
                Order Builder
              </p>
              <h2
                id="order-builder-heading"
                className="mt-2 font-display text-3xl font-semibold text-[#F5F1EA] sm:text-4xl text-balance"
              >
                Build your shoot estimate
              </h2>
              <p className="mt-2 text-sm text-[#F5F1EA]/70">
                Select a service, package, quantity, and any extras. Your selection saves automatically in this browser.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChangeOrder(DEFAULT_ORDER)}
              className="inline-flex min-h-[40px] items-center gap-2 self-start rounded-lg border border-[#F5F1EA]/15 px-3.5 py-2 text-xs font-medium text-[#F5F1EA]/80 transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B] whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset selection
            </button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left controls */}
            <div className="space-y-6 lg:col-span-7">
              {/* Step 1: Service */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#F5F1EA]/70">
                  1. Choose Service
                </span>
                <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
                  {SERVICES.map((svc) => {
                    const active = order.service === svc;
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => handleServiceChange(svc)}
                        className={`min-h-[44px] rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                          active
                            ? 'border-[#C9A24B] bg-[#C9A24B]/15 text-[#C9A24B]'
                            : 'border-[#F5F1EA]/15 bg-[#0B0B0C] text-[#F5F1EA]/80 hover:border-[#F5F1EA]/35'
                        }`}
                      >
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Package / Type */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="builder-package"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#F5F1EA]/70"
                  >
                    2. Package or Product Type
                  </label>
                  <select
                    id="builder-package"
                    value={order.packageId}
                    onChange={(e) => handlePackageChange(e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-[#F5F1EA]/20 bg-[#0B0B0C] px-3 text-sm text-[#F5F1EA] focus:border-[#C9A24B] focus:outline-none"
                  >
                    {order.service === 'Portrait Photography' &&
                      PORTRAIT_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {formatNaira(pkg.price)}
                        </option>
                      ))}

                    {order.service === 'Product Photography' && (
                      <>
                        <optgroup label="Product Bundles">
                          {PRODUCT_BUNDLES.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name} — {formatNaira(b.price)}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Per-Product Rates (Min 5)">
                          {PRODUCT_TYPES.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} — {formatNaira(t.pricePerItem)} {t.unitLabel}
                            </option>
                          ))}
                        </optgroup>
                      </>
                    )}

                    {order.service === 'Event Photography' &&
                      EVENT_PACKAGES.map((ev) => (
                        <option key={ev.id} value={ev.id}>
                          {ev.name} — {ev.isCustomFrom ? 'From ' : ''}
                          {formatNaira(ev.price)}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Step 3: Quantity */}
                <div>
                  <label
                    htmlFor="builder-quantity"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#F5F1EA]/70"
                  >
                    3.{' '}
                    {isPerProduct
                      ? 'Number of Products (Min 5)'
                      : isProductBundle
                        ? 'Bundle Quantity'
                        : 'Number of Sessions / Days'}
                  </label>
                  <div className="mt-2 flex h-11 items-center rounded-lg border border-[#F5F1EA]/20 bg-[#0B0B0C]">
                    <button
                      type="button"
                      onClick={() =>
                        onChangeOrder({
                          ...order,
                          quantity: Math.max(minQuantity, order.quantity - 1),
                        })
                      }
                      aria-label="Decrease quantity"
                      className="flex h-full w-11 items-center justify-center text-[#F5F1EA]/75 hover:text-[#C9A24B]"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      id="builder-quantity"
                      type="number"
                      min={minQuantity}
                      max={200}
                      value={order.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        onChangeOrder({
                          ...order,
                          quantity: Number.isNaN(val) ? minQuantity : Math.max(1, val),
                        });
                      }}
                      className="h-full w-full bg-transparent text-center text-sm font-semibold text-[#F5F1EA] tabular-nums focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onChangeOrder({
                          ...order,
                          quantity: order.quantity + 1,
                        })
                      }
                      aria-label="Increase quantity"
                      className="flex h-full w-11 items-center justify-center text-[#F5F1EA]/75 hover:text-[#C9A24B]"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {calc.validationWarning && (
                    <p className="mt-1.5 text-xs text-[#C9A24B]">
                      {calc.validationWarning}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 4: Extras */}
              <div className="rounded-xl border border-[#F5F1EA]/10 bg-[#0B0B0C] p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#F5F1EA]">
                      {order.service === 'Event Photography' &&
                        `Extra hours (${formatNaira(EXTRAS_RATES.extraEventHour)} / hr)`}
                      {order.service === 'Portrait Photography' &&
                        `Extra edited photos (${formatNaira(EXTRAS_RATES.extraPortraitPhoto)} / photo)`}
                      {order.service === 'Product Photography' &&
                        'Extra products at per-product rate'}
                    </p>
                    <p className="text-xs text-[#F5F1EA]/60">
                      Optional add-ons included in your estimate.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {order.service === 'Product Photography' && (
                      <select
                        aria-label="Extra product rate type"
                        value={order.extraProductTypeId}
                        onChange={(e) =>
                          onChangeOrder({
                            ...order,
                            extraProductTypeId: e.target.value,
                          })
                        }
                        className="h-10 rounded-lg border border-[#F5F1EA]/20 bg-[#1A1A1D] px-2.5 text-xs text-[#F5F1EA] focus:border-[#C9A24B] focus:outline-none"
                      >
                        {PRODUCT_TYPES.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({formatNaira(t.pricePerItem)})
                          </option>
                        ))}
                      </select>
                    )}

                    <div className="flex h-10 items-center rounded-lg border border-[#F5F1EA]/20 bg-[#1A1A1D]">
                      <button
                        type="button"
                        onClick={() =>
                          onChangeOrder({
                            ...order,
                            extraUnits: Math.max(0, order.extraUnits - 1),
                          })
                        }
                        aria-label="Decrease extras"
                        className="flex h-full w-10 items-center justify-center text-[#F5F1EA]/75 hover:text-[#C9A24B]"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[2.25rem] text-center text-sm font-semibold text-[#F5F1EA] tabular-nums">
                        {order.extraUnits}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onChangeOrder({
                            ...order,
                            extraUnits: order.extraUnits + 1,
                          })
                        }
                        aria-label="Increase extras"
                        className="flex h-full w-10 items-center justify-center text-[#F5F1EA]/75 hover:text-[#C9A24B]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional shoot details for WhatsApp / Booking */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="builder-name"
                    className="block text-xs font-medium text-[#F5F1EA]/75"
                  >
                    Your name (optional)
                  </label>
                  <input
                    id="builder-name"
                    type="text"
                    placeholder="e.g. Amina Yusuf"
                    value={order.customerName}
                    onChange={(e) =>
                      onChangeOrder({ ...order, customerName: e.target.value })
                    }
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#F5F1EA]/15 bg-[#0B0B0C] px-3 text-sm text-[#F5F1EA] placeholder:text-[#F5F1EA]/35 focus:border-[#C9A24B] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="builder-date"
                    className="block text-xs font-medium text-[#F5F1EA]/75"
                  >
                    Preferred date
                  </label>
                  <input
                    id="builder-date"
                    type="date"
                    value={order.preferredDate}
                    onChange={(e) =>
                      onChangeOrder({ ...order, preferredDate: e.target.value })
                    }
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#F5F1EA]/15 bg-[#0B0B0C] px-3 text-sm text-[#F5F1EA] focus:border-[#C9A24B] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="builder-location"
                    className="block text-xs font-medium text-[#F5F1EA]/75"
                  >
                    Shoot location
                  </label>
                  <input
                    id="builder-location"
                    type="text"
                    placeholder="e.g. Tanke, Ilorin"
                    value={order.shootLocation}
                    onChange={(e) =>
                      onChangeOrder({ ...order, shootLocation: e.target.value })
                    }
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#F5F1EA]/15 bg-[#0B0B0C] px-3 text-sm text-[#F5F1EA] placeholder:text-[#F5F1EA]/35 focus:border-[#C9A24B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="builder-details"
                  className="block text-xs font-medium text-[#F5F1EA]/75"
                >
                  Brief shoot details (optional)
                </label>
                <input
                  id="builder-details"
                  type="text"
                  placeholder="Outfits, product count, event schedule, or lighting notes"
                  value={order.details}
                  onChange={(e) =>
                    onChangeOrder({ ...order, details: e.target.value })
                  }
                  className="mt-1.5 h-11 w-full rounded-lg border border-[#F5F1EA]/15 bg-[#0B0B0C] px-3 text-sm text-[#F5F1EA] placeholder:text-[#F5F1EA]/35 focus:border-[#C9A24B] focus:outline-none"
                />
              </div>
            </div>

            {/* Right summary card */}
            <div className="flex flex-col justify-between rounded-xl border border-[#F5F1EA]/15 bg-[#0B0B0C] p-6 lg:col-span-5">
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-[#F5F1EA]">
                  Order Summary
                </h3>

                <dl className="space-y-3 border-y border-[#F5F1EA]/10 py-4 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#F5F1EA]/65">Service</dt>
                    <dd className="text-right font-medium text-[#F5F1EA]">
                      {order.service}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#F5F1EA]/65">Package</dt>
                    <dd className="text-right font-medium text-[#F5F1EA]">
                      {calc.packageLabel}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#F5F1EA]/65">Quantity</dt>
                    <dd className="text-right font-medium text-[#F5F1EA] tabular-nums">
                      {calc.unitDisplayQuantity}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#F5F1EA]/65">Extras</dt>
                    <dd className="text-right font-medium text-[#F5F1EA] tabular-nums">
                      {calc.extrasSummary}
                    </dd>
                  </div>
                </dl>

                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium text-[#F5F1EA]/75">
                      Estimated total
                    </span>
                    <span className="font-display text-3xl font-semibold text-[#C9A24B] tabular-nums">
                      {calc.isCustomQuote ? 'From ' : ''}
                      {formatNaira(calc.estimatedTotal)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#F5F1EA]/60">
                    Estimate only, final quote confirmed on WhatsApp.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#C9A24B] px-5 py-3 text-sm font-semibold text-[#0B0B0C] transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Send Order on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-[#F5F1EA]/25 px-5 py-3 text-sm font-semibold text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B]"
                >
                  Continue to Booking Form
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

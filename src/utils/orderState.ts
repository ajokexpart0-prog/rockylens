import {
  EVENT_PACKAGES,
  EXTRAS_RATES,
  PORTRAIT_PACKAGES,
  PRODUCT_BUNDLES,
  PRODUCT_TYPES,
  ServiceCategory,
  formatNaira,
} from '../data/services';

export interface OrderSelection {
  service: ServiceCategory;
  packageId: string;
  packageLabel: string;
  quantity: number;
  extraUnits: number; // extra hours (Events) or extra photos (Portraits) or extra products (Products)
  extraProductTypeId: string;
  customerName: string;
  preferredDate: string;
  shootLocation: string;
  details: string;
}

const STORAGE_KEY = 'rockylens_order_builder_v1';

export const DEFAULT_ORDER: OrderSelection = {
  service: 'Product Photography',
  packageId: 'bundle-growth',
  packageLabel: 'Growth (15 products)',
  quantity: 15,
  extraUnits: 0,
  extraProductTypeId: 'product-white-bg',
  customerName: '',
  preferredDate: '',
  shootLocation: '',
  details: '',
};

export function loadOrderFromStorage(): OrderSelection {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ORDER;
    const parsed = JSON.parse(raw) as Partial<OrderSelection>;
    if (!parsed || typeof parsed !== 'object') return DEFAULT_ORDER;
    return {
      ...DEFAULT_ORDER,
      ...parsed,
      quantity: Math.max(1, Number(parsed.quantity) || 1),
      extraUnits: Math.max(0, Number(parsed.extraUnits) || 0),
    };
  } catch {
    return DEFAULT_ORDER;
  }
}

export function saveOrderToStorage(order: OrderSelection): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Ignore storage quota / privacy mode errors cleanly
  }
}

export interface OrderCalculation {
  packageLabel: string;
  unitDisplayQuantity: number;
  baseTotal: number;
  extrasTotal: number;
  estimatedTotal: number;
  extrasSummary: string;
  isCustomQuote: boolean;
  validationWarning: string | null;
}

export function calculateOrder(order: OrderSelection): OrderCalculation {
  if (order.service === 'Portrait Photography') {
    const pkg =
      PORTRAIT_PACKAGES.find((p) => p.id === order.packageId) ?? PORTRAIT_PACKAGES[0];
    const qty = Math.max(1, order.quantity);
    const baseTotal = pkg.price * qty;
    const extrasTotal = order.extraUnits * EXTRAS_RATES.extraPortraitPhoto;
    const extrasSummary =
      order.extraUnits > 0
        ? `${order.extraUnits} extra edited photo${order.extraUnits > 1 ? 's' : ''} (${formatNaira(extrasTotal)})`
        : 'None';
    return {
      packageLabel: pkg.name,
      unitDisplayQuantity: qty,
      baseTotal,
      extrasTotal,
      estimatedTotal: baseTotal + extrasTotal,
      extrasSummary,
      isCustomQuote: false,
      validationWarning: null,
    };
  }

  if (order.service === 'Product Photography') {
    const bundle = PRODUCT_BUNDLES.find((b) => b.id === order.packageId);
    const extraProductRate =
      PRODUCT_TYPES.find((t) => t.id === order.extraProductTypeId) ?? PRODUCT_TYPES[0];

    if (bundle) {
      const bundleCount = Math.max(1, order.quantity);
      const totalProducts = bundle.productCount * bundleCount + order.extraUnits;
      const baseTotal = bundle.price * bundleCount;
      const extrasTotal = order.extraUnits * extraProductRate.pricePerItem;
      const extrasSummary =
        order.extraUnits > 0
          ? `${order.extraUnits} extra ${extraProductRate.name.toLowerCase()} product${order.extraUnits > 1 ? 's' : ''} (${formatNaira(extrasTotal)})`
          : 'None';
      return {
        packageLabel: bundle.name,
        unitDisplayQuantity: totalProducts,
        baseTotal,
        extrasTotal,
        estimatedTotal: baseTotal + extrasTotal,
        extrasSummary,
        isCustomQuote: false,
        validationWarning: null,
      };
    }

    const typePkg =
      PRODUCT_TYPES.find((t) => t.id === order.packageId) ?? PRODUCT_TYPES[0];
    const qty = Math.max(1, order.quantity);
    const billableQty = Math.max(5, qty);
    const baseTotal = typePkg.pricePerItem * billableQty;
    const extrasTotal = order.extraUnits * extraProductRate.pricePerItem;
    const extrasSummary =
      order.extraUnits > 0
        ? `${order.extraUnits} extra ${extraProductRate.name.toLowerCase()} (${formatNaira(extrasTotal)})`
        : 'None';

    return {
      packageLabel: `${typePkg.name} (${formatNaira(typePkg.pricePerItem)} ${typePkg.unitLabel})`,
      unitDisplayQuantity: billableQty + order.extraUnits,
      baseTotal,
      extrasTotal,
      estimatedTotal: baseTotal + extrasTotal,
      extrasSummary,
      isCustomQuote: false,
      validationWarning:
        qty < 5
          ? 'Minimum order for per-product photography is 5 products (estimate reflects 5).'
          : null,
    };
  }

  // Event Photography
  const eventPkg =
    EVENT_PACKAGES.find((e) => e.id === order.packageId) ?? EVENT_PACKAGES[0];
  const qty = Math.max(1, order.quantity);
  const baseTotal = eventPkg.price * qty;
  const extrasTotal = order.extraUnits * EXTRAS_RATES.extraEventHour;
  const extrasSummary =
    order.extraUnits > 0
      ? `${order.extraUnits} extra hour${order.extraUnits > 1 ? 's' : ''} (${formatNaira(extrasTotal)})`
      : 'None';

  return {
    packageLabel: eventPkg.isCustomFrom ? `${eventPkg.name} (from ₦250,000)` : eventPkg.name,
    unitDisplayQuantity: qty,
    baseTotal,
    extrasTotal,
    estimatedTotal: baseTotal + extrasTotal,
    extrasSummary,
    isCustomQuote: Boolean(eventPkg.isCustomFrom),
    validationWarning: null,
  };
}

export function formatWhatsAppOrderMessage(
  order: OrderSelection,
  calc: OrderCalculation
): string {
  const cleanOrDash = (val: string) => (val.trim() ? val.trim() : '____');
  const totalText = calc.isCustomQuote
    ? `From ${formatNaira(calc.estimatedTotal)} (custom quote)`
    : formatNaira(calc.estimatedTotal);

  const lines = [
    "Hello RockyLens Studio, I'd like to order:",
    `Name: ${cleanOrDash(order.customerName)}`,
    `Service: ${order.service}`,
    `Package: ${calc.packageLabel}`,
    `Quantity: ${calc.unitDisplayQuantity}`,
    ...(calc.extrasTotal > 0 ? [`Extras: ${calc.extrasSummary}`] : []),
    `Estimated total: ${totalText}`,
    `Preferred date: ${cleanOrDash(order.preferredDate)}`,
    `Shoot location: ${cleanOrDash(order.shootLocation)}`,
    `Details: ${cleanOrDash(order.details)}`,
  ];
  return lines.join('\n');
}

import React, { useEffect, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { ServiceCategory } from '../data/services';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/siteConfig';

interface BookingPageProps {
  initialQuery: string;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  service: ServiceCategory;
  packageQuantity: string;
  preferredDate: string;
  shootLocation: string;
  projectDetails: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

function parseInitialValues(search: string): FormValues {
  const params = new URLSearchParams(search);
  const rawService = params.get('service');
  const validService: ServiceCategory =
    rawService === 'Portrait Photography' ||
    rawService === 'Product Photography' ||
    rawService === 'Event Photography'
      ? rawService
      : 'Portrait Photography';

  return {
    fullName: params.get('name') ?? '',
    email: '',
    phone: '',
    service: validService,
    packageQuantity: params.get('package') ?? '',
    preferredDate: params.get('date') ?? '',
    shootLocation: params.get('location') ?? '',
    projectDetails: params.get('details') ?? '',
  };
}

export const BookingPage: React.FC<BookingPageProps> = ({ initialQuery }) => {
  const [values, setValues] = useState<FormValues>(() =>
    parseInitialValues(initialQuery || window.location.search)
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const query = initialQuery || window.location.search;
    if (query) {
      setValues((prev) => ({
        ...prev,
        ...parseInitialValues(query),
      }));
    }
  }, [initialQuery]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.fullName.trim()) {
      next.fullName = 'Please enter your full name.';
    }
    if (!values.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.service) {
      next.service = 'Please select a photography service.';
    }
    if (!values.preferredDate.trim()) {
      next.preferredDate = 'Please select your preferred shoot date.';
    }
    if (!values.shootLocation.trim()) {
      next.shootLocation = 'Please enter the shoot location (e.g. Tanke, Ilorin).';
    }
    if (!values.projectDetails.trim()) {
      next.projectDetails = 'Please share a brief overview of your shoot.';
    }
    return next;
  };

  const handleFieldChange = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      const body = new URLSearchParams();
      formData.forEach((val, key) => {
        body.append(key, typeof val === 'string' ? val : '');
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (response.ok || response.status === 404 || response.status === 405) {
        window.location.assign('/thank-you.html');
      } else {
        setSubmitError(
          'Unable to submit right now. Please try again or send your booking directly on WhatsApp.'
        );
      }
    } catch {
      setSubmitError(
        'Network issue submitting the form. Please try again or send your details on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const buildBookingWhatsAppUrl = () => {
    const clean = (s: string) => (s.trim() ? s.trim() : '____');
    const msg = [
      "Hello RockyLens Studio, I'd like to book a shoot:",
      `Name: ${clean(values.fullName)}`,
      `Email: ${clean(values.email)}`,
      ...(values.phone.trim() ? [`Phone/WhatsApp: ${values.phone.trim()}`] : []),
      `Service: ${values.service}`,
      `Package / Quantity: ${clean(values.packageQuantity)}`,
      `Preferred date: ${clean(values.preferredDate)}`,
      `Shoot location: ${clean(values.shootLocation)}`,
      `Details: ${clean(values.projectDetails)}`,
    ].join('\n');
    return buildWhatsAppUrl(msg);
  };

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left column: context & quick facts */}
          <div className="space-y-8 lg:col-span-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
                Book a Shoot
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold text-[#130521] sm:text-5xl text-balance">
                Send your enquiry or book on WhatsApp.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#130521]/75 sm:text-base">
                Tell us what you are planning, where in Ilorin (or beyond) you want to shoot, and your preferred date. We confirm availability and send deposit details straight away.
              </p>
            </div>

            <div className="space-y-4 rounded-xl border border-[#130521]/12 bg-[#F0E9F8] p-6">
              <h2 className="font-display text-xl font-semibold text-[#130521]">
                Booking Essentials
              </h2>
              <ul className="space-y-3 text-xs leading-relaxed text-[#130521]/80 sm:text-sm">
                <li>
                  <strong className="text-[#130521]">Base Area:</strong>{' '}
                  {BUSINESS_INFO.fullRegion} (on-location service, no physical studio).
                </li>
                <li>
                  <strong className="text-[#130521]">Travel:</strong> Affordable standard rates with no travel fee in Ilorin. Outside Ilorin travel fee is quoted on WhatsApp.
                </li>
                <li>
                  <strong className="text-[#130521]">Deposit:</strong> 50% deposit confirms your date; balance due before final delivery.
                </li>
                <li>
                  <strong className="text-[#130521]">Hours:</strong> {BUSINESS_INFO.hours}.
                </li>
                <li>
                  <strong className="text-[#130521]">Phone / WhatsApp:</strong>{' '}
                  <span className="font-semibold text-[#2E0854] tabular-nums">
                    {BUSINESS_INFO.phoneDisplay}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column: Netlify Form */}
          <div className="lg:col-span-7">
            <form
              name="booking-enquiry"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/thank-you.html"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 rounded-2xl border border-[#130521]/12 bg-[#F0E9F8] p-6 sm:p-8"
            >
              {/* Netlify required hidden inputs */}
              <input type="hidden" name="form-name" value="booking-enquiry" />
              <p className="hidden" aria-hidden="true">
                <label>
                  Don&apos;t fill this out if you&apos;re human:{' '}
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="full-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#130521]/80"
                  >
                    Full name <span className="text-[#2E0854]">*</span>
                  </label>
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    required
                    value={values.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'full-name-error' : undefined}
                    placeholder="Your full name"
                    className="mt-2 h-11 w-full rounded-lg border border-[#130521]/20 bg-white px-3.5 text-sm text-[#130521] placeholder:text-[#130521]/40 focus:border-[#2E0854] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p id="full-name-error" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#130521]/80"
                  >
                    Email <span className="text-[#2E0854]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="you@example.com"
                    className="mt-2 h-11 w-full rounded-lg border border-[#130521]/20 bg-white px-3.5 text-sm text-[#130521] placeholder:text-[#130521]/40 focus:border-[#2E0854] focus:outline-none"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Phone/WhatsApp */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#130521]/80"
                  >
                    Phone / WhatsApp <span className="text-[#130521]/50">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="mt-2 h-11 w-full rounded-lg border border-[#130521]/20 bg-white px-3.5 text-sm text-[#130521] placeholder:text-[#130521]/40 focus:border-[#2E0854] focus:outline-none"
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#130521]/80"
                  >
                    Service <span className="text-[#2E0854]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={values.service}
                    onChange={(e) =>
                      handleFieldChange('service', e.target.value as ServiceCategory)
                    }
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? 'service-error' : undefined}
                    className="mt-2 h-11 w-full rounded-lg border border-[#130521]/20 bg-white px-3.5 text-sm text-[#130521] focus:border-[#2E0854] focus:outline-none"
                  >
                    <option value="Portrait Photography">Portrait Photography</option>
                    <option value="Product Photography">Product Photography</option>
                    <option value="Event Photography">Event Photography</option>
                  </select>
                  {errors.service && (
                    <p id="service-error" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              {/* Package / Quantity */}
              <div>
                <label
                  htmlFor="package-quantity"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#130521]/80"
                >
                  Package / quantity
                </label>
                <input
                  id="package-quantity"
                  name="package-quantity"
                  type="text"
                  value={values.packageQuantity}
                  onChange={(e) => handleFieldChange('packageQuantity', e.target.value)}
                  placeholder="e.g. Growth (15 products) or Professional Portrait (1 session)"
                  className="mt-2 h-11 w-full rounded-lg border border-[#130521]/20 bg-white px-3.5 text-sm text-[#130521] placeholder:text-[#130521]/40 focus:border-[#2E0854] focus:outline-none"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Preferred date */}
                <div>
                  <label
                    htmlFor="preferred-date"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#130521]/80"
                  >
                    Preferred date <span className="text-[#2E0854]">*</span>
                  </label>
                  <input
                    id="preferred-date"
                    name="preferred-date"
                    type="date"
                    required
                    value={values.preferredDate}
                    onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={
                      errors.preferredDate ? 'preferred-date-error' : undefined
                    }
                    className="mt-2 h-11 w-full rounded-lg border border-[#130521]/20 bg-white px-3.5 text-sm text-[#130521] focus:border-[#2E0854] focus:outline-none"
                  />
                  {errors.preferredDate && (
                    <p
                      id="preferred-date-error"
                      className="mt-1.5 text-xs font-medium text-red-700"
                    >
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                {/* Shoot location */}
                <div>
                  <label
                    htmlFor="shoot-location"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#130521]/80"
                  >
                    Shoot location <span className="text-[#2E0854]">*</span>
                  </label>
                  <input
                    id="shoot-location"
                    name="shoot-location"
                    type="text"
                    required
                    value={values.shootLocation}
                    onChange={(e) => handleFieldChange('shootLocation', e.target.value)}
                    aria-invalid={Boolean(errors.shootLocation)}
                    aria-describedby={
                      errors.shootLocation ? 'shoot-location-error' : undefined
                    }
                    placeholder="e.g. Tanke, GRA Ilorin, or venue name"
                    className="mt-2 h-11 w-full rounded-lg border border-[#130521]/20 bg-white px-3.5 text-sm text-[#130521] placeholder:text-[#130521]/40 focus:border-[#2E0854] focus:outline-none"
                  />
                  {errors.shootLocation && (
                    <p
                      id="shoot-location-error"
                      className="mt-1.5 text-xs font-medium text-red-700"
                    >
                      {errors.shootLocation}
                    </p>
                  )}
                </div>
              </div>

              {/* Project details */}
              <div>
                <label
                  htmlFor="project-details"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#130521]/80"
                >
                  Project details <span className="text-[#2E0854]">*</span>
                </label>
                <textarea
                  id="project-details"
                  name="project-details"
                  required
                  rows={4}
                  value={values.projectDetails}
                  onChange={(e) => handleFieldChange('projectDetails', e.target.value)}
                  aria-invalid={Boolean(errors.projectDetails)}
                  aria-describedby={
                    errors.projectDetails ? 'project-details-error' : undefined
                  }
                  placeholder="Share outfits, product types, event timings, or any special requests."
                  className="mt-2 w-full rounded-lg border border-[#130521]/20 bg-white px-3.5 py-3 text-sm text-[#130521] placeholder:text-[#130521]/40 focus:border-[#2E0854] focus:outline-none"
                />
                {errors.projectDetails && (
                  <p
                    id="project-details-error"
                    className="mt-1.5 text-xs font-medium text-red-700"
                  >
                    {errors.projectDetails}
                  </p>
                )}
              </div>

              {submitError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-600/35 bg-red-100 px-4 py-3 text-xs font-medium text-red-900"
                >
                  {submitError}
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#2E0854] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E043B] disabled:opacity-60"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {submitting ? 'Sending Enquiry...' : 'Submit Booking Enquiry'}
                </button>

                <a
                  href={buildBookingWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#130521]/20 bg-white px-5 py-3 text-sm font-semibold text-[#130521] transition-colors hover:border-[#2E0854] hover:text-[#2E0854] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 text-[#2E0854]" aria-hidden="true" />
                  Or send this on WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

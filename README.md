# RockyLens Studio — Website

Five-page marketing, portfolio, pricing, and booking website for **RockyLens Studio** (Tanke, Ilorin, Kwara State, Nigeria). Built with React, Vite, TypeScript, and Tailwind CSS for static Netlify deployment with no backend.

## Pages Included
1. **Home (`/`)** — Full-screen hero (`rockylens-04`), three service cards, 6-photo Selected Work gallery with lightbox, Why RockyLens differentiators, client reviews, and booking CTA.
2. **About (`/about`)** — Honest studio story (on-location service in Ilorin, no physical studio), 4-step approach (`Discover`, `Direct`, `Capture`, `Deliver`), values, and photographer portrait placeholder.
3. **Services (`/services`)** — Portrait, Product, and Event pricing in Naira (`₦`), policies box, interactive **Order Builder** (saved to `localStorage` inside `try/catch`, live estimate, WhatsApp formatter, URL parameter handoff), and reviews strip.
4. **Portfolio (`/portfolio`)** — All 15 items configured in `src/data/portfolio.ts` with category tabs (`All`, `Portraits`, `Products`, `Events`), Event sub-filters (`Weddings`, `Birthdays`, `Corporate`, `Graduations`), `"Photo coming soon"` placeholders, and a keyboard/swipe Lightbox.
5. **Book a Shoot (`/book`)** — Validated Netlify Forms enquiry form (`booking-enquiry`) with Order Builder URL pre-fill and an `"Or send this on WhatsApp"` button.
6. **Thank You (`/public/thank-you.html`)** — Static confirmation page served after form submission with WhatsApp follow-up link.

## Project Structure
- `index.html` — Global SEO, Open Graph tags, `LocalBusiness` JSON-LD (service-area business in Tanke, Ilorin), Google Fonts (`Playfair Display` & `Montserrat`), and hidden static Netlify form for build-time form detection.
- `public/_redirects` — Netlify SPA routing fallback (`/* /index.html 200`).
- `public/thank-you.html` — Static confirmation page for Netlify Forms.
- `src/data/siteConfig.ts` — Business details, WhatsApp URLs, reviews, policies, and copy.
- `src/data/portfolio.ts` — Single config array for all 15 portfolio items.
- `src/data/services.ts` — Packages, per-product rates, bundles, and extras.
- `src/utils/orderState.ts` — Client-side Order Builder calculations, `localStorage` persistence (`try/catch`), and WhatsApp message formatter.
- `src/utils/seo.ts` — Dynamic per-page `<title>` and `<meta name="description">` updates.

## Netlify Forms Verification
- `index.html` includes a hidden `<form name="booking-enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">` mirroring all fields (`form-name`, `bot-field`, `full-name`, `email`, `phone`, `service`, `package-quantity`, `preferred-date`, `shoot-location`, `project-details`) so Netlify detects the form during static site builds.
- `src/pages/BookingPage.tsx` renders the live interactive `<form name="booking-enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">` with `<input type="hidden" name="form-name" value="booking-enquiry" />`, `bot-field` honeypot, client-side validation, and submission to `/thank-you.html`.

## TODOs (Owner Follow-Up)
1. **Social Handles**:
   - Add Instagram handle in `src/data/siteConfig.ts` (`BUSINESS_INFO.instagramUrl`, currently `#`).
   - Add TikTok handle in `src/data/siteConfig.ts` (`BUSINESS_INFO.tiktokUrl`, currently `#`).
2. **Photographer Profile (`src/pages/AboutPage.tsx`)**:
   - Add the lead photographer's name and replace the `"Photographer Portrait — Photo coming soon"` placeholder card with a real photo.
3. **Placeholder Portfolio Photos (`src/data/portfolio.ts`)**:
   - Replace `portrait-placeholder-corporate` (Corporate headshot) with a real portrait photo.
   - Replace `portrait-placeholder-studio` (Studio-style portrait) with a real portrait photo.
   - Replace `product-placeholder-white-bg` (White background product photo) with a real product photo.
   - Replace `product-placeholder-jewelry` (Jewelry product photo) with a real product photo.
   - Replace `product-placeholder-food` (Food product photo) with a real product photo.
4. **Canonical Domain**:
   - Update `@id` in `index.html` JSON-LD once the final custom domain or Netlify subdomain is live.

## Development & Build
```bash
npm install
npm run dev
npm run build
```

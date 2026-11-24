# RockyLens Studio — Website

Five-page marketing, portfolio, pricing, and booking website for **RockyLens Studio** (Tanke, Ilorin, Kwara State, Nigeria). Built with React, Vite, TypeScript, and Tailwind CSS for static Netlify deployment with no backend.

## Visual Palette
- **Background**: `#FFFFFF` (Crisp White)
- **Secondary Card Surface**: `#F0E9F8` (Soft Lavender Tint)
- **Text**: `#130521` (Deep Aubergine Ink)
- **Accent / Buttons**: `#2E0854` / `#1E043B` (Deep Imperial Purple)
- **Typography**: `Playfair Display` (headings) + `Montserrat` (body)

## Pages Included
1. **Home (`/`)** — Editorial split hero with 3-frame showcase, three service cards, 6-photo Selected Work grid with lightbox, Why RockyLens differentiators, client reviews, and booking CTA.
2. **About (`/about`)** — Honest studio story (on-location service in Ilorin, no physical studio), 4-step approach (`Discover`, `Direct`, `Capture`, `Deliver`), values, and photographer portrait placeholder.
3. **Services (`/services`)** — Portrait, Product, and Event pricing in Naira (`₦`), policies box, interactive **Order Builder** (saved to `localStorage` inside `try/catch`, live estimate, WhatsApp formatter, URL parameter handoff), and reviews strip.
4. **Portfolio (`/portfolio`)** — Single-config gallery (`src/data/portfolio.ts`) with category tabs (`All`, `Portraits`, `Products`, `Events`), Event sub-filters (`Weddings`, `Birthdays`, `Corporate`), `"Photo coming soon"` product placeholders, and a keyboard/swipe Lightbox.
5. **Book a Shoot (`/book`)** — Validated Netlify Forms enquiry form (`booking-enquiry`) with Order Builder URL pre-fill and an `"Or send this on WhatsApp"` button.
6. **Thank You (`/public/thank-you.html`)** — Static confirmation page served after form submission with WhatsApp follow-up link.

## Netlify Forms Verification
- `index.html` includes a hidden `<form name="booking-enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">` mirroring all fields (`form-name`, `bot-field`, `full-name`, `email`, `phone`, `service`, `package-quantity`, `preferred-date`, `shoot-location`, `project-details`) so Netlify detects the form during static site builds.
- `src/pages/BookingPage.tsx` renders the live interactive `<form name="booking-enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">` with `<input type="hidden" name="form-name" value="booking-enquiry" />`, `bot-field` honeypot, client-side validation, and submission to `/thank-you.html`.

## TODOs (Owner Follow-Up)
1. **Social Handles**:
   - Add Instagram handle in `src/data/siteConfig.ts` (`BUSINESS_INFO.instagramUrl`, currently `#`).
   - Add TikTok handle in `src/data/siteConfig.ts` (`BUSINESS_INFO.tiktokUrl`, currently `#`).
2. **Photographer Profile (`src/pages/AboutPage.tsx`)**:
   - Add the lead photographer's name and replace the `"Photographer Portrait — Photo coming soon"` placeholder card with a real photo.
3. **Placeholder Product Photos (`src/data/portfolio.ts`)**:
   - Replace `product-placeholder-white-bg` (White background product photo) with a real product photo.
   - Replace `product-placeholder-jewelry` (Jewelry product photo) with a real product photo.
4. **Canonical Domain**:
   - Update `@id` in `index.html` JSON-LD once the final custom domain or Netlify subdomain is live.

## Development & Build
```bash
npm install
npm run dev
npm run build
```

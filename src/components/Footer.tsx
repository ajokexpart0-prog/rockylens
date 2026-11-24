import React from 'react';
import { BUSINESS_INFO, NAV_ITEMS, PageRoute, buildWhatsAppUrl } from '../data/siteConfig';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: PageRoute) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-[#130521]/12 bg-[#F0E9F8] text-[#130521]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand & blurb */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-block"
              aria-label="RockyLens Studio home"
            >
              <Logo />
            </a>
            <p className="text-sm font-semibold text-[#2E0854]">
              {BUSINESS_INFO.tagline}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[#130521]/75">
              On-location portrait, product, and event photography based in Tanke, Ilorin, Kwara State. No fixed physical studio—we bring clean lighting and creative direction directly to your location.
            </p>
          </div>

          {/* Pages */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#2E0854]">
              Pages
            </h2>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path)}
                    className="text-[#130521]/80 transition-colors hover:text-[#2E0854] hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#2E0854]">
              Contact &amp; Hours
            </h2>
            <ul className="space-y-2 text-sm text-[#130521]/80">
              <li>Tanke, Ilorin, Nigeria</li>
              <li>{BUSINESS_INFO.hours}</li>
              <li>
                Phone:{' '}
                <a
                  href={`tel:+234${BUSINESS_INFO.phoneDisplay.slice(1)}`}
                  className="font-medium text-[#130521] hover:text-[#2E0854] hover:underline tabular-nums"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                WhatsApp:{' '}
                <a
                  href={buildWhatsAppUrl(BUSINESS_INFO.floatingWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#2E0854] underline-offset-2 hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                Email:{' '}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-medium text-[#130521] hover:text-[#2E0854] hover:underline break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-4 text-xs font-medium text-[#130521]/65">
              {/* TODO: add Instagram handle */}
              <a
                href={BUSINESS_INFO.instagramUrl}
                aria-label="Instagram (handle coming soon)"
                title="Instagram handle coming soon"
                className="transition-colors hover:text-[#2E0854]"
              >
                Instagram (Soon)
              </a>
              <span aria-hidden="true">·</span>
              {/* TODO: add TikTok handle */}
              <a
                href={BUSINESS_INFO.tiktokUrl}
                aria-label="TikTok (handle coming soon)"
                title="TikTok handle coming soon"
                className="transition-colors hover:text-[#2E0854]"
              >
                TikTok (Soon)
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#130521]/12 pt-6 text-xs text-[#130521]/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p>Serving Tanke, Ilorin &amp; destinations across Nigeria.</p>
        </div>
      </div>
    </footer>
  );
};

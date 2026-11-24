import React from 'react';
import { ArrowRight, Camera, MapPin } from 'lucide-react';
import {
  APPROACH_STEPS,
  BUSINESS_INFO,
  PageRoute,
  STUDIO_VALUES,
  buildWhatsAppUrl,
} from '../data/siteConfig';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Intro split */}
        <section className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
              About RockyLens Studio
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[#130521] sm:text-5xl text-balance">
              On-location photography built around real moments and real businesses.
            </h1>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#130521]/80 sm:text-base">
              <p>
                RockyLens Studio is a Tanke, Ilorin-based photography business with a couple of years of hands-on experience serving professionals, business owners, and event hosts across Kwara State and beyond.
              </p>
              <p>
                Rather than operating from a fixed physical studio, we work fully on location—travelling to your office, home, outdoor venue, or event hall. Whenever a controlled backdrop or crisp studio look is needed, we bring portable lighting and studio-style setups directly to you.
              </p>
              <p>
                Whether you need polished corporate headshots, high-converting e-commerce product shots, or calm, observant coverage of a wedding, birthday, or graduation, our goal stays simple: fair pricing, reliable turnaround, and frames that command attention.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#130521]/70">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#2E0854]">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Based in Tanke, Ilorin
              </span>
              <span aria-hidden="true">·</span>
              <span>On-location service (no physical studio)</span>
              <span aria-hidden="true">·</span>
              <span>Mon–Sat, 9am–6pm</span>
            </div>
          </div>

          {/* Photographer Photo Placeholder (name to be added) */}
          <div className="lg:col-span-5">
            <div className="flex h-full min-h-[340px] flex-col justify-between rounded-2xl border border-dashed border-[#2E0854]/35 bg-[#F0E9F8] p-8">
              <div className="flex items-center justify-between text-xs text-[#130521]/65">
                <span>Lead Photographer</span>
                <span>Tanke, Ilorin</span>
              </div>

              <div className="my-auto py-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#2E0854]/30 bg-[#2E0854]/10 text-[#2E0854]">
                  <Camera className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="font-display text-2xl font-medium text-[#130521]">
                  Photographer Portrait
                </p>
                <p className="mt-2 text-xs text-[#130521]/70">
                  Photo coming soon · Name to be added
                </p>
              </div>

              <div className="border-t border-[#130521]/12 pt-4 text-xs text-[#130521]/65">
                {/* TODO: add lead photographer name and portrait photo */}
                Available for portraits, products &amp; events by appointment.
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach (4 steps) */}
        <section
          className="mt-20 border-t border-[#130521]/10 pt-16 sm:mt-24 sm:pt-20"
          aria-labelledby="approach-heading"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
              Our Approach
            </p>
            <h2
              id="approach-heading"
              className="mt-2 font-display text-3xl font-semibold text-[#130521] sm:text-4xl text-balance"
            >
              Four straightforward steps from brief to delivery
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH_STEPS.map((item) => (
              <div
                key={item.step}
                className="reveal-item rounded-xl border border-[#130521]/10 bg-[#F0E9F8] p-6"
              >
                <p className="font-display text-2xl font-semibold text-[#2E0854] tabular-nums">
                  {item.step}.
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#130521]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#130521]/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values List */}
        <section
          className="mt-20 border-t border-[#130521]/10 pt-16 sm:mt-24 sm:pt-20"
          aria-labelledby="values-heading"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
                How We Work
              </p>
              <h2
                id="values-heading"
                className="mt-2 font-display text-3xl font-semibold text-[#130521] text-balance"
              >
                What every client can expect
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {STUDIO_VALUES.map((val) => (
                <div
                  key={val.title}
                  className="rounded-xl border border-[#130521]/10 bg-[#F0E9F8] p-6"
                >
                  <h3 className="font-display text-xl font-semibold text-[#130521]">
                    {val.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#130521]/75">
                    {val.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 rounded-2xl border border-[#2E0854]/25 bg-[#F0E9F8] p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-[#130521] text-balance">
                Ready to plan your session in Ilorin?
              </h2>
              <p className="mt-2 text-sm text-[#130521]/75">
                Pick a package on Services or send your shoot details directly through our booking page.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/book')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#2E0854] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E043B] whitespace-nowrap"
              >
                Book a Shoot
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={buildWhatsAppUrl(BUSINESS_INFO.floatingWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-[#130521]/20 bg-white px-5 py-3 text-sm font-semibold text-[#130521] transition-colors hover:border-[#2E0854] hover:text-[#2E0854] whitespace-nowrap"
              >
                DM on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

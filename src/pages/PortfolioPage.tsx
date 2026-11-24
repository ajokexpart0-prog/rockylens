import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  EventSubGroup,
  PORTFOLIO_ITEMS,
  PortfolioGroup,
} from '../data/portfolio';
import { PageRoute } from '../data/siteConfig';
import { Lightbox } from '../components/Lightbox';
import { PhotoFrame } from '../components/PhotoFrame';

interface PortfolioPageProps {
  onNavigate: (route: PageRoute) => void;
}

type PrimaryFilter = 'All' | PortfolioGroup;
type EventFilter = 'All Events' | EventSubGroup;

const PRIMARY_TABS: PrimaryFilter[] = ['All', 'Portraits', 'Products', 'Events'];
const EVENT_SUB_TABS: EventFilter[] = [
  'All Events',
  'Weddings',
  'Birthdays',
  'Corporate',
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [activeGroup, setActiveGroup] = useState<PrimaryFilter>('All');
  const [activeEventSub, setActiveEventSub] = useState<EventFilter>('All Events');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    return PORTFOLIO_ITEMS.filter((item) => {
      if (activeGroup === 'All') return true;
      if (item.group !== activeGroup) return false;
      if (activeGroup === 'Events' && activeEventSub !== 'All Events') {
        return item.subGroup === activeEventSub;
      }
      return true;
    });
  }, [activeGroup, activeEventSub]);

  const lightboxItems = useMemo(
    () => filteredItems.filter((item) => !item.isPlaceholder && Boolean(item.src)),
    [filteredItems]
  );

  const handlePrimaryTab = (tab: PrimaryFilter) => {
    setActiveGroup(tab);
    if (tab !== 'Events') {
      setActiveEventSub('All Events');
    }
    setLightboxIndex(null);
  };

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
            Portfolio
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-[#130521] sm:text-5xl text-balance">
            Selected frames across portraits, products, and events.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#130521]/75 sm:text-base">
            Filter by category below and click any photograph to inspect it full screen. Use arrow keys or swipe left and right inside the viewer.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-col gap-3 border-y border-[#130521]/12 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Portfolio categories"
              className="flex flex-wrap items-center gap-2"
            >
              {PRIMARY_TABS.map((tab) => {
                const active = activeGroup === tab;
                const count =
                  tab === 'All'
                    ? PORTFOLIO_ITEMS.length
                    : PORTFOLIO_ITEMS.filter((i) => i.group === tab).length;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handlePrimaryTab(tab)}
                    className={`min-h-[42px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#2E0854] text-white'
                        : 'border border-[#130521]/15 bg-[#F0E9F8] text-[#130521]/80 hover:border-[#2E0854] hover:text-[#2E0854]'
                    }`}
                  >
                    {tab} <span className="ml-1 opacity-75 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-[#130521]/65 tabular-nums">
              Showing {filteredItems.length} of {PORTFOLIO_ITEMS.length} items
            </p>
          </div>

          {activeGroup === 'Events' && (
            <div
              role="group"
              aria-label="Event sub-categories"
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              {EVENT_SUB_TABS.map((sub) => {
                const active = activeEventSub === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setActiveEventSub(sub)}
                    className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#130521] text-white'
                        : 'border border-[#130521]/15 bg-[#F0E9F8] text-[#130521]/80 hover:border-[#2E0854]'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Masonry-style editorial columns on desktop */}
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filteredItems.map((item) => {
            const lbIdx = lightboxItems.findIndex((x) => x.id === item.id);
            return (
              <div key={item.id} className="mb-6 break-inside-avoid">
                <PhotoFrame
                  item={item}
                  onClick={
                    lbIdx >= 0 ? () => setLightboxIndex(lbIdx) : undefined
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Booking CTA */}
        <section className="mt-12 rounded-2xl border border-[#2E0854]/25 bg-[#F0E9F8] p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-[#130521] text-balance">
                Want coverage like this for your upcoming shoot?
              </h2>
              <p className="mt-2 text-sm text-[#130521]/75">
                Tell us what you are planning in Ilorin or beyond and we will confirm availability right away.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/book')}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#2E0854] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E043B] whitespace-nowrap shrink-0"
            >
              Book a Shoot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>

      <Lightbox
        items={lightboxItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
};

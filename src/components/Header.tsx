import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, PageRoute } from '../data/siteConfig';
import { Logo } from './Logo';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentRoute]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: PageRoute) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(path);
  };

  const navLinks = NAV_ITEMS.filter((item) => item.path !== '/book');

  return (
    <header className="sticky top-0 z-40 border-b border-[#130521]/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand mark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="shrink-0 whitespace-nowrap focus-visible:rounded-sm"
          aria-label="RockyLens Studio home"
        >
          <Logo />
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navLinks.map((item) => {
            const active = currentRoute === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'font-semibold text-[#2E0854]'
                    : 'text-[#130521]/75 hover:text-[#2E0854]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#2E0854]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary CTA + Mobile hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/book"
            onClick={(e) => handleLinkClick(e, '/book')}
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#2E0854] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-xs transition-colors duration-150 hover:bg-[#1E043B] whitespace-nowrap shrink-0"
          >
            Book a Shoot
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#130521]/15 bg-[#F0E9F8] text-[#130521] transition-colors hover:border-[#2E0854] hover:text-[#2E0854] md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="border-t border-[#130521]/10 bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = currentRoute === item.path;
              const isBook = item.path === '/book';
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isBook
                      ? 'mt-2 justify-center bg-[#2E0854] font-semibold text-white'
                      : active
                        ? 'bg-[#F0E9F8] font-semibold text-[#2E0854]'
                        : 'text-[#130521]/85 hover:bg-[#F0E9F8]'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

import { useCallback, useEffect, useState } from 'react';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PageRoute } from './data/siteConfig';
import { AboutPage } from './pages/AboutPage';
import { BookingPage } from './pages/BookingPage';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ServicesPage } from './pages/ServicesPage';
import {
  OrderSelection,
  loadOrderFromStorage,
  saveOrderToStorage,
} from './utils/orderState';
import { updatePageMeta } from './utils/seo';

function normalizeRoute(pathname: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (
    clean === '/about' ||
    clean === '/services' ||
    clean === '/portfolio' ||
    clean === '/book'
  ) {
    return clean;
  }
  return '/';
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() =>
    normalizeRoute(window.location.pathname)
  );
  const [bookingQuery, setBookingQuery] = useState<string>(() => window.location.search);
  const [order, setOrder] = useState<OrderSelection>(() => loadOrderFromStorage());

  const handleOrderChange = useCallback((next: OrderSelection) => {
    setOrder(next);
    saveOrderToStorage(next);
  }, []);

  const navigate = useCallback((nextRoute: PageRoute, anchorOrQuery?: string) => {
    const isQuery = Boolean(anchorOrQuery && anchorOrQuery.includes('='));
    const nextUrl = isQuery
      ? `${nextRoute}?${anchorOrQuery}`
      : anchorOrQuery
        ? `${nextRoute}#${anchorOrQuery}`
        : nextRoute;

    if (window.location.pathname + window.location.search !== nextUrl) {
      window.history.pushState({}, '', nextUrl);
    }

    setRoute(nextRoute);
    if (isQuery && anchorOrQuery) {
      setBookingQuery(`?${anchorOrQuery}`);
    } else if (nextRoute !== '/book') {
      setBookingQuery('');
    }

    if (anchorOrQuery && !isQuery) {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(anchorOrQuery);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizeRoute(window.location.pathname));
      setBookingQuery(window.location.search);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    updatePageMeta(route);
  }, [route]);

  // Subtle GPU-only scroll reveal observer
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-item'));
    if (elements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    // Safety fallback so nothing ever remains hidden
    const timer = window.setTimeout(() => {
      elements.forEach((el) => el.classList.add('is-visible'));
    }, 900);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [route]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#130521]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#2E0854] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Header currentRoute={route} onNavigate={(r) => navigate(r)} />

      <main id="main-content" className="flex-1">
        {route === '/' && (
          <HomePage onNavigate={(r, anchor) => navigate(r, anchor)} />
        )}
        {route === '/about' && <AboutPage onNavigate={(r) => navigate(r)} />}
        {route === '/services' && (
          <ServicesPage
            order={order}
            onChangeOrder={handleOrderChange}
            onContinueToBooking={(qs) => navigate('/book', qs)}
          />
        )}
        {route === '/portfolio' && (
          <PortfolioPage onNavigate={(r) => navigate(r)} />
        )}
        {route === '/book' && <BookingPage initialQuery={bookingQuery} />}
      </main>

      <Footer onNavigate={(r) => navigate(r)} />
      <FloatingWhatsApp />
    </div>
  );
}

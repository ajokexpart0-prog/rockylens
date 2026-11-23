import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PortfolioItem } from '../data/portfolio';

interface LightboxProps {
  items: PortfolioItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}) => {
  const touchStartX = useRef<number | null>(null);

  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const activeItem = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onChangeIndex]);

  if (!isOpen || !activeItem || activeIndex === null) return null;

  const goPrev = () => onChangeIndex((activeIndex - 1 + items.length) % items.length);
  const goNext = () => onChangeIndex((activeIndex + 1) % items.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = endX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.caption}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0B0B0C]/95 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-xs text-[#F5F1EA]/70">
          <span className="text-[#C9A24B] font-medium">{activeItem.group}</span>
          {activeItem.subGroup && (
            <>
              <span aria-hidden="true">·</span>
              <span>{activeItem.subGroup}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {activeIndex + 1} / {items.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F1EA]/20 bg-[#1A1A1D] text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Center media */}
      <div
        className="relative mx-auto flex my-auto max-h-[75vh] w-full max-w-5xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {items.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F1EA]/20 bg-[#0B0B0C]/80 text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B] sm:left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {activeItem.src && !activeItem.isPlaceholder ? (
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
          />
        ) : (
          <div className="flex h-72 w-full max-w-xl flex-col items-center justify-center rounded-xl border border-[#F5F1EA]/15 bg-[#1A1A1D] p-8 text-center">
            <p className="font-display text-2xl text-[#F5F1EA]">Photo coming soon</p>
            <p className="mt-2 text-sm text-[#F5F1EA]/70">{activeItem.caption}</p>
          </div>
        )}

        {items.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F1EA]/20 bg-[#0B0B0C]/80 text-[#F5F1EA] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B] sm:right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Caption */}
      <div
        className="mx-auto w-full max-w-3xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-display text-lg text-[#F5F1EA] sm:text-xl">
          {activeItem.caption}
        </p>
        <p className="mt-1 text-xs text-[#F5F1EA]/60">
          Swipe or use arrow keys to browse · Esc to close
        </p>
      </div>
    </div>
  );
};

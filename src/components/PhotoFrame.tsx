import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { PortfolioItem } from '../data/portfolio';

interface PhotoFrameProps {
  item: PortfolioItem;
  aspectClass?: string;
  onClick?: () => void;
  priority?: boolean;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  item,
  aspectClass = 'aspect-[4/3]',
  onClick,
  priority = false,
}) => {
  const [imgError, setImgError] = useState(false);

  if (item.isPlaceholder || !item.src || imgError) {
    return (
      <div className="group flex flex-col overflow-hidden rounded-xl border border-dashed border-[#F5F1EA]/20 bg-[#1A1A1D]">
        <div
          className={`${aspectClass} flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1D] via-[#141416] to-[#0B0B0C] p-6 text-center`}
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A24B]/35 bg-[#C9A24B]/10 text-[#C9A24B]">
            <Camera className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="font-display text-lg font-medium text-[#F5F1EA]">
            Photo coming soon
          </p>
          <p className="mt-1 text-xs text-[#F5F1EA]/65">
            {item.placeholderLabel ?? item.caption}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-[#F5F1EA]/10 px-4 py-3 text-xs">
          <span className="font-medium text-[#F5F1EA]/85">{item.caption}</span>
          <span className="shrink-0 text-[#C9A24B]">{item.group}</span>
        </div>
      </div>
    );
  }

  return (
    <figure className="group overflow-hidden rounded-xl border border-[#F5F1EA]/10 bg-[#1A1A1D] transition-colors duration-200 hover:border-[#C9A24B]/45">
      <button
        type="button"
        onClick={onClick}
        className="block w-full text-left focus-visible:outline-offset-[-2px]"
        aria-label={`View ${item.caption} in lightbox`}
      >
        <div className={`${aspectClass} relative overflow-hidden bg-[#141416]`}>
          <img
            src={item.src}
            alt={item.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </div>
      </button>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-xs">
        <span className="font-medium text-[#F5F1EA]/90">{item.caption}</span>
        <span className="shrink-0 text-[#F5F1EA]/55">
          {item.subGroup ? `${item.group} · ${item.subGroup}` : item.group}
        </span>
      </figcaption>
    </figure>
  );
};

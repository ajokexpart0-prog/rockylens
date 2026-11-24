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
  aspectClass,
  onClick,
  priority = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const resolvedAspect =
    aspectClass ??
    (item.orientation === 'portrait'
      ? 'aspect-[4/5]'
      : item.orientation === 'square'
        ? 'aspect-square'
        : 'aspect-[4/3]');

  if (item.isPlaceholder || !item.src || imgError) {
    return (
      <div className="group flex flex-col overflow-hidden rounded-xl border border-dashed border-[#2E0854]/30 bg-[#F0E9F8]">
        <div
          className={`${resolvedAspect} flex flex-col items-center justify-center bg-gradient-to-br from-[#F0E9F8] via-white to-[#F0E9F8] p-6 text-center`}
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#2E0854]/25 bg-[#2E0854]/10 text-[#2E0854]">
            <Camera className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="font-display text-lg font-medium text-[#130521]">
            Photo coming soon
          </p>
          <p className="mt-1 text-xs text-[#130521]/65">
            {item.placeholderLabel ?? item.caption}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-[#130521]/10 px-4 py-3 text-xs">
          <span className="font-medium text-[#130521]">{item.caption}</span>
          <span className="shrink-0 font-semibold text-[#2E0854]">{item.group}</span>
        </div>
      </div>
    );
  }

  return (
    <figure className="group overflow-hidden rounded-xl border border-[#130521]/10 bg-[#F0E9F8] transition-colors duration-200 hover:border-[#2E0854]/50">
      <button
        type="button"
        onClick={onClick}
        className="block w-full text-left focus-visible:outline-offset-[-2px]"
        aria-label={`View ${item.caption} in lightbox`}
      >
        <div className={`${resolvedAspect} relative overflow-hidden bg-[#F0E9F8]`}>
          <img
            src={item.src}
            alt={item.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover ${
              item.orientation === 'portrait' ? 'object-top' : 'object-center'
            } transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
          />
        </div>
      </button>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-xs">
        <span className="font-semibold text-[#130521]">{item.caption}</span>
        <span className="shrink-0 text-[#2E0854]">
          {item.subGroup ? `${item.group} · ${item.subGroup}` : item.group}
        </span>
      </figcaption>
    </figure>
  );
};

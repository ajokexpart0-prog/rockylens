import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../data/siteConfig';

interface ReviewsSectionProps {
  compact?: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ compact = false }) => {
  return (
    <section
      aria-labelledby="reviews-heading"
      className={compact ? 'py-14 border-t border-[#130521]/10' : 'py-20 sm:py-24'}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E0854]">
              Client Feedback
            </p>
            <h2
              id="reviews-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#130521] sm:text-4xl text-balance"
            >
              Trusted by clients across Ilorin
            </h2>
          </div>
          <p className="text-sm text-[#130521]/65">
            Five-star words from real sessions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <article
              key={review.name}
              className="flex flex-col justify-between rounded-xl border border-[#130521]/10 bg-[#F0E9F8] p-6 transition-colors duration-150 hover:border-[#2E0854]/50"
            >
              <div>
                <div
                  className="mb-4 flex items-center gap-1"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-[#2E0854] text-[#2E0854]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[#130521]/85">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
              <p className="mt-6 border-t border-[#130521]/12 pt-4 text-sm font-semibold text-[#130521]">
                {review.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

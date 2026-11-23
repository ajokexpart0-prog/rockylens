import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const href = buildWhatsAppUrl(BUSINESS_INFO.floatingWhatsappMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RockyLens Studio on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-[#C9A24B]/40 bg-[#1A1A1D] px-4 text-xs font-semibold text-[#F5F1EA] shadow-lg transition-transform duration-150 hover:scale-[1.03] hover:border-[#C9A24B] hover:text-[#C9A24B] sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5 text-[#C9A24B]" aria-hidden="true" />
      <span className="whitespace-nowrap">WhatsApp</span>
    </a>
  );
};

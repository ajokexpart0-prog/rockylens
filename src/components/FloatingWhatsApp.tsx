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
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-[#2E0854] px-4 text-xs font-semibold text-white shadow-md transition-transform duration-150 hover:scale-[1.03] hover:bg-[#1E043B] sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
      <span className="whitespace-nowrap">WhatsApp</span>
    </a>
  );
};

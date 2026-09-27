import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs } = useChamber();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const publishedFaqs = faqs
    .filter(f => f.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 md:py-28 bg-[#F5F7FA] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
            Client Inquiries
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Clear information about consultation procedure, document requirements, confidentiality, and professional representation.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {publishedFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-serif-title text-base sm:text-lg font-bold text-[#0B1F3A]">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded bg-slate-100 text-[#0B1F3A] transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#0B1F3A] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support note */}
        <div className="text-center text-xs text-slate-500">
          Have an unlisted question regarding your legal matter? Contact our chamber at <span className="font-semibold text-slate-800">+880 (02) 22338-9012</span>.
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { Quote, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useChamber();

  const published = testimonials.filter(
    t => t.status === 'published' && t.hasClientPermission
  );

  if (published.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
            Client Impressions
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            Client Feedback & Observations
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Observations from corporate leadership, commercial borrowers, and private individuals represented by Khan Law Associates.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {published.map((item) => (
            <div
              key={item.id}
              className="bg-[#F5F7FA] p-7 rounded-lg border border-slate-200 flex flex-col justify-between relative shadow-sm"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C9A227] mb-3 opacity-60" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.feedback}"
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-serif-title text-sm font-bold text-[#0B1F3A]">
                  {item.clientName}
                </h4>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Matter: {item.matterCategory}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory note */}
        <div className="text-center text-[11px] text-slate-400 max-w-md mx-auto">
          Testimonials published strictly upon written client authorization in compliance with professional ethics. Names may be anonymized to safeguard client privilege.
        </div>

      </div>
    </section>
  );
};

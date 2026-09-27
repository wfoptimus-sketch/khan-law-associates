import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { ServiceItem } from '../../types';
import { CheckCircle, ArrowRight, Briefcase } from 'lucide-react';

interface ServicesProps {
  onOpenConsultationWithService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultationWithService }) => {
  const { services } = useChamber();

  const publishedServices = services
    .filter(s => s.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
              Chamber Engagements
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              Our Legal Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear deliverables, structured case timelines, and transparent consultation protocols for corporate entities and private clients.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Matter-specific retainer & ad-hoc courtroom representation
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 hover:border-[#0B1F3A] rounded-lg p-7 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-[#0B1F3A] text-[#C9A227] flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-serif-title text-xl font-bold text-[#0B1F3A] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C9A227] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {service.suitableFor && (
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <span className="font-semibold text-slate-700">Recommended for: </span>
                    {service.suitableFor}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => onOpenConsultationWithService(service.title)}
                  className="w-full py-2.5 px-4 rounded border border-slate-300 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] text-slate-800 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Legal Guidance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

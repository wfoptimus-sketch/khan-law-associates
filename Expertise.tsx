import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { 
  Search, 
  Target, 
  FileEdit, 
  FileCheck2, 
  Users2, 
  Scale, 
  AlertTriangle, 
  MessageSquare
} from 'lucide-react';

export const Expertise: React.FC = () => {
  const { expertise } = useChamber();

  const publishedExpertise = expertise
    .filter(e => e.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const getExpertiseIcon = (index: number) => {
    const icons = [
      <Search className="w-5 h-5 text-[#C9A227]" />,
      <Target className="w-5 h-5 text-[#C9A227]" />,
      <FileEdit className="w-5 h-5 text-[#C9A227]" />,
      <FileCheck2 className="w-5 h-5 text-[#C9A227]" />,
      <Users2 className="w-5 h-5 text-[#C9A227]" />,
      <Scale className="w-5 h-5 text-[#C9A227]" />,
      <AlertTriangle className="w-5 h-5 text-[#C9A227]" />,
      <MessageSquare className="w-5 h-5 text-[#C9A227]" />
    ];
    return icons[index % icons.length];
  };

  return (
    <section id="expertise" className="py-20 md:py-28 bg-[#F5F7FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
            Legal Competencies
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            Our Legal Expertise
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Methodical legal analysis, meticulous document review, and practical risk mitigation tailored to Bangladesh statutory framework.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedExpertise.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg border border-slate-200 hover:border-[#173B6C] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded bg-[#0B1F3A]/5 flex items-center justify-center mb-4">
                  {getExpertiseIcon(idx)}
                </div>
                <h3 className="font-serif-title text-lg font-bold text-[#0B1F3A] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.details && item.details.length > 0 && (
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#C9A227]"></span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

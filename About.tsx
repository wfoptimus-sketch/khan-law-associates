import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Scale, Award, BookOpen } from 'lucide-react';

interface AboutProps {
  onOpenConsultation: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenConsultation }) => {
  const { about } = useChamber();

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase with Chamber Aesthetics */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative">
              {/* Outer frame */}
              <div className="rounded-lg overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={about.imageUrl || '/src/assets/images/advocate_consultation_room_1790488240024.jpg'}
                  alt="Khan Law Associates Law Chamber Consultation Room"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* Dignified floating badge */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-[#0B1F3A] text-white p-5 rounded-lg shadow-xl border border-[#173B6C] max-w-xs hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <Scale className="w-5 h-5 text-[#C9A227]" />
                  <span className="font-serif-title font-bold text-sm tracking-wide text-[#C9A227]">
                    KHAN LAW ASSOCIATES
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Providing meticulous legal analysis, courtroom advocacy, and confidential client advisory in Bangladesh.
                </p>
              </div>

              {/* Decorative subtle border motif */}
              <div className="hidden sm:block absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-[#C9A227] pointer-events-none"></div>
            </div>
          </div>

          {/* Right Column: About Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
                {about.kicker || 'Advocates & Legal Consultants'}
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
                {about.title}
              </h2>
            </div>

            <p className="text-slate-800 text-base sm:text-lg font-normal leading-relaxed border-l-2 border-[#C9A227] pl-4 italic">
              {about.leadParagraph}
            </p>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {about.bodyParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Highlights Checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {about.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-1" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenConsultation}
                className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white text-sm font-semibold px-6 py-3 rounded shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{about.ctaText || 'Consult Our Chamber'}</span>
                <ArrowRight className="w-4 h-4 text-[#C9A227]" />
              </button>

              <a
                href="#team"
                className="text-sm font-semibold text-[#0B1F3A] hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
              >
                <span>Meet Our Advocates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

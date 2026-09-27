import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { PracticeArea } from '../../types';
import { 
  Scale, 
  ShieldAlert, 
  Building2, 
  Briefcase, 
  LandPlot, 
  HeartHandshake, 
  FileSignature, 
  ScrollText, 
  Users, 
  FileCheck,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface PracticeAreasProps {
  onSelectArea: (area: PracticeArea) => void;
  onConsultationWithMatter: (matterTitle: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({ 
  onSelectArea, 
  onConsultationWithMatter 
}) => {
  const { practiceAreas } = useChamber();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter published areas
  const publishedAreas = practiceAreas
    .filter(pa => pa.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scale': return <Scale className="w-5 h-5 text-[#C9A227]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#C9A227]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#C9A227]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#C9A227]" />;
      case 'LandPlot': return <LandPlot className="w-5 h-5 text-[#C9A227]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#C9A227]" />;
      case 'FileSignature': return <FileSignature className="w-5 h-5 text-[#C9A227]" />;
      case 'ScrollText': return <ScrollText className="w-5 h-5 text-[#C9A227]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#C9A227]" />;
      default: return <FileCheck className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <section id="practice-areas" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
              Chamber Jurisdictions
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              Practice Areas
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Structured representation and advisory services provided by advocates enrolled before the Supreme Court of Bangladesh and Subordinate Courts.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-[#0B1F3A]">{publishedAreas.length}</span> Active Practice Sectors
          </div>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedAreas.map((area) => (
            <div
              key={area.id}
              className="bg-[#FFFFFF] border border-slate-200 hover:border-[#173B6C] rounded-lg p-7 transition-all duration-200 hover:shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded bg-[#0B1F3A]/5 border border-slate-200 flex items-center justify-center group-hover:bg-[#0B1F3A] transition-colors">
                    {getIcon(area.iconName)}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    SEC-{area.sortOrder < 10 ? `0${area.sortOrder}` : area.sortOrder}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-title text-xl font-bold text-[#0B1F3A] group-hover:text-[#173B6C] transition-colors mb-2">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {area.shortDescription}
                  </p>
                </div>

                {/* Scope list bullets */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                    Key Court Services:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {area.keyServices.slice(0, 3).map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#C9A227] flex-shrink-0"></span>
                        <span className="truncate">{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectArea(area)}
                  className="text-[#0B1F3A] font-semibold hover:text-[#C9A227] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Detailed Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onConsultationWithMatter(area.title)}
                  className="text-slate-500 hover:text-[#0B1F3A] font-medium flex items-center gap-1 cursor-pointer"
                  title="Request consultation in this practice area"
                >
                  <span>Inquire</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Disclaimer reminder */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center">
          <span className="font-semibold text-slate-800">Notice: </span>
          Representation is offered strictly pursuant to the Canons of Professional Conduct of the Bangladesh Bar Council. No specialization is claimed beyond verified academic and enrollment credentials.
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { 
  ShieldCheck, 
  MessageCircle, 
  Compass, 
  Lock, 
  CheckCircle2, 
  UserCheck
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { whyChooseUs } = useChamber();

  const sortedItems = [...whyChooseUs].sort((a, b) => a.sortOrder - b.sortOrder);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <ShieldCheck className="w-5 h-5 text-[#C9A227]" />;
      case 1: return <MessageCircle className="w-5 h-5 text-[#C9A227]" />;
      case 2: return <Compass className="w-5 h-5 text-[#C9A227]" />;
      case 3: return <Lock className="w-5 h-5 text-[#C9A227]" />;
      case 4: return <CheckCircle2 className="w-5 h-5 text-[#C9A227]" />;
      default: return <UserCheck className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#0B1F3A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
            Ethical & Structured Practice
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white">
            Why Khan Law Associates
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Professional representation founded on honest counsel, diligent preparation, and realistic assessments of statutory remedies.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-slate-900/60 border border-slate-800 p-7 rounded-lg hover:border-slate-700 transition-colors space-y-3"
            >
              <div className="w-10 h-10 rounded bg-[#173B6C] flex items-center justify-center">
                {getIcon(idx)}
              </div>
              <h3 className="font-serif-title text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Ethical commitment notice */}
        <div className="max-w-2xl mx-auto p-4 rounded bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400">
          <span className="text-slate-300 font-semibold">Chamber Standard: </span>
          We do not make speculative guarantees or unverified claims. Our counsel is tailored to the evidentiary merits and procedural rules of Bangladesh law.
        </div>

      </div>
    </section>
  );
};

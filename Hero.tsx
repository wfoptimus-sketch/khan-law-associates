import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { ShieldCheck, Scale, Award, ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { hero, contactInfo } = useChamber();

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-[#0B1F3A] text-white pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      {/* Background Graphic / Architectural Elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
        <img 
          src={hero.imageUrl || '/src/assets/images/legal_chamber_hero_1790488228436.jpg'} 
          alt="Khan Law Associates Chamber" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/95 to-[#071527]/90 pointer-events-none"></div>

      {/* Subtle Classical Gold Border Accents */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
              <span className="tracking-wide uppercase text-[11px] text-slate-200">Advocates & Legal Consultants · Supreme Court of Bangladesh</span>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
              {hero.headline}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              {hero.supportingText}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenConsultation}
                className="bg-[#C9A227] hover:bg-[#B58F1E] text-[#071527] font-semibold text-sm sm:text-base px-7 py-3.5 rounded shadow-lg transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>{hero.primaryCtaText || 'Book a Consultation'}</span>
                <ArrowRight className="w-4 h-4 text-[#071527]" />
              </button>

              <button
                onClick={() => handleScrollTo('#practice-areas')}
                className="border border-slate-400/40 hover:border-white text-slate-200 hover:text-white font-medium text-sm sm:text-base px-6 py-3.5 rounded transition-all flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10"
              >
                <span>{hero.secondaryCtaText || 'Explore Practice Areas'}</span>
              </button>
            </div>

            {/* Direct Telephone reassurance */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <PhoneCall className="w-4 h-4 text-[#C9A227]" />
              <span>Chamber Direct: </span>
              <a href={`tel:${contactInfo.phone}`} className="text-slate-200 font-semibold hover:text-[#C9A227] underline decoration-slate-600 underline-offset-4">
                {contactInfo.phoneDisplay}
              </a>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Sat – Thu (9:00 AM – 7:30 PM)</span>
            </div>
          </div>

          {/* Right Visual Card with Chamber Image & Trust Highlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900/60 p-2 backdrop-blur-sm">
              <div className="relative rounded overflow-hidden aspect-[4/3] group">
                <img
                  src={hero.imageUrl || '/src/assets/images/legal_chamber_hero_1790488228436.jpg'}
                  alt="Khan Law Associates Supreme Court Chamber"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#071527]/85 backdrop-blur-md border border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#C9A227]/20 text-[#C9A227]">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Supreme Court & Trial Practice</h4>
                      <p className="text-xs text-slate-300">Dhaka, Bangladesh · Ethical Advocacy & Legal Advisory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Trust Indicators */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          {hero.trustIndicators.map((indicator, idx) => (
            <div 
              key={indicator.id} 
              className="flex items-start gap-4 p-5 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-[#173B6C] flex items-center justify-center text-[#C9A227] flex-shrink-0 mt-0.5">
                {idx === 0 && <Scale className="w-5 h-5" />}
                {idx === 1 && <Award className="w-5 h-5" />}
                {idx === 2 && <ShieldCheck className="w-5 h-5" />}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white text-base font-serif-title">
                  {indicator.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {indicator.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

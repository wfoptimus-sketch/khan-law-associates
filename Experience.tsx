import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { Milestone, Calendar, Award, ChevronRight } from 'lucide-react';

export const Experience: React.FC = () => {
  const { experienceStats, milestones } = useChamber();

  const sortedMilestones = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);
  const sortedStats = [...experienceStats].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
            Track Record & Professional Evolution
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            Experience That Matters
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A sustained record of courtroom advocacy, procedural integrity, and confidential dispute resolution across Bangladesh.
          </p>
        </div>

        {/* 4 Editable Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#F5F7FA] p-7 rounded-lg border border-slate-200 text-center space-y-2 hover:border-[#173B6C] transition-colors"
            >
              <span className="font-serif-title text-4xl sm:text-5xl font-extrabold text-[#0B1F3A] block tracking-tight">
                {stat.value}
              </span>
              <h4 className="font-semibold text-sm text-slate-800 font-serif-title">
                {stat.label}
              </h4>
              {stat.helperText && (
                <p className="text-xs text-slate-500 leading-snug">
                  {stat.helperText}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Professional Timeline / Milestones */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-serif-title text-2xl font-bold text-[#0B1F3A]">
              Chamber Timeline & Milestones
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Important professional developments and jurisdictional expansions over the years.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-10 py-4">
            {sortedMilestones.map((ms, idx) => (
              <div key={ms.id} className="relative pl-8 group">
                {/* Year Marker / Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0B1F3A] border-2 border-[#C9A227] group-hover:scale-125 transition-transform"></div>
                
                {/* Milestone year label positioned on desktop */}
                <div className="md:absolute md:-left-28 md:top-1 md:text-right w-24">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-[#0B1F3A] border border-slate-200 inline-block">
                    {ms.year}
                  </span>
                </div>

                <div className="bg-[#FFFFFF] p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-serif-title text-lg font-bold text-[#0B1F3A] mb-1">
                    {ms.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ms.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

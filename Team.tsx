import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { AdvocateProfile } from '../../types';
import { Award, BookOpen, GraduationCap, Scale, ChevronRight, User } from 'lucide-react';

interface TeamProps {
  onSelectAdvocate: (adv: AdvocateProfile) => void;
}

export const Team: React.FC<TeamProps> = ({ onSelectAdvocate }) => {
  const { team } = useChamber();

  const publishedTeam = team
    .filter(adv => adv.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="team" className="py-20 md:py-28 bg-[#F5F7FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
            Advocates & Legal Practitioners
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            Meet Our Legal Team
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Dedicated advocates enrolled with the Bangladesh Bar Council and Supreme Court Bar Association, bringing rigorous research and responsible representation.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedTeam.map((advocate) => (
            <div
              key={advocate.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  {advocate.photoUrl ? (
                    <img
                      src={advocate.photoUrl}
                      alt={advocate.fullName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <User className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#0B1F3A]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold border border-slate-700/80">
                    <span className="text-[#C9A227]">{advocate.yearsOfExperience}</span> Practice
                  </div>
                </div>

                {/* Profile Brief Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif-title text-xl font-bold text-[#0B1F3A] group-hover:text-[#173B6C] transition-colors">
                      {advocate.fullName}
                    </h3>
                    <p className="text-xs font-medium text-[#C9A227] mt-0.5">
                      {advocate.designation}
                    </p>
                  </div>

                  {/* Enrollment & Association */}
                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-start gap-2">
                      <Scale className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{advocate.barEnrollment}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{advocate.education[0] || 'Law Degree'}</span>
                    </div>
                  </div>

                  {/* Core Practice Areas */}
                  <div className="border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Focused Areas:
                    </span>
                    <div className="flex flex-wrap gap-1 text-xs text-slate-700">
                      {advocate.practiceAreas.slice(0, 3).map((pa, i) => (
                        <span key={i} className="inline-block after:content-[','] last:after:content-[''] pr-1">
                          {pa}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectAdvocate(advocate)}
                  className="w-full py-2.5 px-4 rounded border border-slate-300 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] text-slate-800 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Verified Profile & Credentials</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Ethics Notice */}
        <div className="text-center text-xs text-slate-500 max-w-xl mx-auto">
          All advocates enrolled with the Supreme Court of Bangladesh or respective District Bar Associations. Verified credentials maintained in chamber records.
        </div>

      </div>
    </section>
  );
};

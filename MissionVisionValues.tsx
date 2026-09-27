import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { Target, Compass, Shield, Lock, Briefcase, HeartHandshake } from 'lucide-react';

export const MissionVisionValues: React.FC = () => {
  const { missionVision, values } = useChamber();

  const getValueIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('integrity')) return <Shield className="w-5 h-5 text-[#C9A227]" />;
    if (t.includes('confidentiality')) return <Lock className="w-5 h-5 text-[#C9A227]" />;
    if (t.includes('professionalism')) return <Briefcase className="w-5 h-5 text-[#C9A227]" />;
    return <HeartHandshake className="w-5 h-5 text-[#C9A227]" />;
  };

  return (
    <section className="py-20 bg-[#F5F7FA] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Mission & Vision 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission */}
          <div className="bg-white p-8 sm:p-10 rounded-lg shadow-sm border border-slate-200/80 relative overflow-hidden group hover:border-[#173B6C] transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0B1F3A]"></div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 rounded bg-[#F5F7FA] flex items-center justify-center text-[#0B1F3A]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif-title text-2xl font-bold text-[#0B1F3A]">
                {missionVision.missionTitle}
              </h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {missionVision.missionDescription}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 sm:p-10 rounded-lg shadow-sm border border-slate-200/80 relative overflow-hidden group hover:border-[#173B6C] transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C9A227]"></div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 rounded bg-[#F5F7FA] flex items-center justify-center text-[#C9A227]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif-title text-2xl font-bold text-[#0B1F3A]">
                {missionVision.visionTitle}
              </h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {missionVision.visionDescription}
            </p>
          </div>

        </div>

        {/* Our Values Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
              Foundational Principles
            </span>
            <h2 className="font-serif-title text-3xl font-bold text-[#0B1F3A]">
              Our Guiding Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Upholding strict professional ethics under the Bangladesh Bar Council canons of legal practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.id}
                className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded bg-[#0B1F3A]/5 flex items-center justify-center mb-4">
                    {getValueIcon(val.title)}
                  </div>
                  <h4 className="font-serif-title text-lg font-bold text-[#0B1F3A] mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
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

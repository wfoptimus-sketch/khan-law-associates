import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export const Approach: React.FC = () => {
  const { approachSteps } = useChamber();

  const sortedSteps = [...approachSteps].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="approach" className="py-20 md:py-28 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
            Procedural Roadmap
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            How We Handle Your Legal Matter
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A disciplined, six-stage workflow ensuring rigorous scrutiny, strategic clarity, and timely court actions.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedSteps.map((step) => (
            <div
              key={step.id}
              className="bg-[#F5F7FA] border border-slate-200 p-7 rounded-lg relative overflow-hidden group hover:border-[#0B1F3A] transition-all"
            >
              {/* Step number watermark */}
              <div className="font-serif-title text-5xl font-extrabold text-slate-200 group-hover:text-slate-300 transition-colors absolute top-4 right-4 pointer-events-none">
                {step.stepNumber}
              </div>

              <div className="relative space-y-3">
                <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#0B1F3A] text-[#C9A227]">
                  STEP {step.stepNumber}
                </span>

                <h3 className="font-serif-title text-xl font-bold text-[#0B1F3A]">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Legal Disclaimer Banner */}
        <div className="p-6 rounded-lg bg-amber-50/70 border border-amber-200/80 flex items-start gap-4 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Judicial Independence & Case Outcome Disclaimer
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
              Every legal matter is inherently different. Outcomes depend entirely on the specific facts, evidentiary weight, applicable statutes, court procedures, and the independent determinations of competent courts, tribunals, or regulatory authorities in Bangladesh.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

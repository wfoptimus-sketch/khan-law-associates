import React from 'react';
import { PracticeArea } from '../../types';
import { X, Scale, Landmark, CheckCircle2, ArrowRight } from 'lucide-react';

interface PracticeAreaModalProps {
  area: PracticeArea | null;
  onClose: () => void;
  onRequestConsultation: (matterTitle: string) => void;
}

export const PracticeAreaModal: React.FC<PracticeAreaModalProps> = ({
  area,
  onClose,
  onRequestConsultation
}) => {
  if (!area) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0B1F3A] text-white p-6 flex justify-between items-start border-b border-[#173B6C]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A227]">
              Practice Area Overview · Khan Law Associates
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
              {area.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-slate-700 overflow-y-auto max-h-[75vh]">
          <div className="space-y-2">
            <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
              Scope of Legal Representation & Advisory
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {area.fullDescription || area.shortDescription}
            </p>
          </div>

          <div className="bg-[#F5F7FA] p-5 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold text-sm">
              <Landmark className="w-4 h-4 text-[#C9A227]" />
              <span>Competent Courts & Forums</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              {area.targetCourts}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
              Specific Services Provided in this Practice Area
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {area.keyServices.map((srv, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-slate-50 p-4 sm:px-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Back to Practice Areas
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestConsultation(area.title);
            }}
            className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white text-xs font-semibold px-6 py-2.5 rounded shadow transition-colors flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <span>Consult on {area.title}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
          </button>
        </div>
      </div>
    </div>
  );
};

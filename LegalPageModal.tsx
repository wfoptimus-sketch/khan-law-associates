import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { LegalPagesContent } from '../../types';
import { X, ShieldCheck } from 'lucide-react';

interface LegalPageModalProps {
  pageKey: keyof LegalPagesContent | null;
  onClose: () => void;
}

export const LegalPageModal: React.FC<LegalPageModalProps> = ({ pageKey, onClose }) => {
  const { legalPages } = useChamber();

  if (!pageKey) return null;

  const current = legalPages[pageKey];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0B1F3A] text-white p-5 flex justify-between items-center border-b border-[#173B6C]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#C9A227]" />
            <div>
              <h3 className="font-serif-title text-xl font-bold text-white">
                {current.title}
              </h3>
              <span className="text-[11px] text-slate-400">
                Last Updated: {current.lastUpdated} · Khan Law Associates
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-10 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
          {current.content}
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#0B1F3A] text-white px-5 py-2 rounded text-xs font-semibold hover:bg-[#173B6C]"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};

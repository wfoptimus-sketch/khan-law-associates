import React from 'react';
import { AdvocateProfile } from '../../types';
import { 
  X, 
  Scale, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Landmark, 
  Languages, 
  Mail, 
  Phone,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface AdvocateDetailModalProps {
  advocate: AdvocateProfile | null;
  onClose: () => void;
  onConsultationWithAdvocate: (name: string) => void;
}

export const AdvocateDetailModal: React.FC<AdvocateDetailModalProps> = ({
  advocate,
  onClose,
  onConsultationWithAdvocate
}) => {
  if (!advocate) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0B1F3A] text-white p-6 flex justify-between items-start border-b border-[#173B6C]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9A227] flex-shrink-0 bg-slate-800">
              <img
                src={advocate.photoUrl}
                alt={advocate.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A227]">
                Advocate Profile · Bangladesh
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
                {advocate.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {advocate.designation} · {advocate.yearsOfExperience}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-700">
          
          {/* Biography */}
          <div className="space-y-3">
            <h3 className="font-serif-title text-lg font-bold text-[#0B1F3A] border-b border-slate-200 pb-2">
              Professional Biography
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {advocate.biography}
            </p>
          </div>

          {/* Grid of Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Academic Qualifications */}
            <div className="bg-[#F5F7FA] p-5 rounded-lg border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold text-sm">
                <GraduationCap className="w-4 h-4 text-[#C9A227]" />
                <span>Academic Qualifications</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {advocate.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] mt-1.5 flex-shrink-0"></span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bar Enrollment & Associations */}
            <div className="bg-[#F5F7FA] p-5 rounded-lg border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold text-sm">
                <Scale className="w-4 h-4 text-[#C9A227]" />
                <span>Bar Enrollment & Association</span>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900 block">Enrollment Status:</span>
                  <span>{advocate.barEnrollment}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Bar Association:</span>
                  <span>{advocate.barAssociation}</span>
                </div>
              </div>
            </div>

            {/* Courts & Tribunals */}
            <div className="bg-[#F5F7FA] p-5 rounded-lg border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold text-sm">
                <Landmark className="w-4 h-4 text-[#C9A227]" />
                <span>Courts & Tribunals of Practice</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {advocate.courtsAndTribunals.map((crt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{crt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Memberships */}
            <div className="bg-[#F5F7FA] p-5 rounded-lg border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold text-sm">
                <Award className="w-4 h-4 text-[#C9A227]" />
                <span>Memberships & Accreditations</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {advocate.professionalMemberships.map((mem, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#173B6C] mt-1.5 flex-shrink-0"></span>
                    <span>{mem}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Practice Areas & Legal Expertise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">
                Focused Practice Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {advocate.practiceAreas.map((pa, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded border border-slate-200 font-medium"
                  >
                    {pa}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">
                Languages of Practice
              </h4>
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <Languages className="w-4 h-4 text-[#C9A227]" />
                <span>{advocate.languages.join(' · ')}</span>
              </div>
            </div>
          </div>

          {/* Publications & Recognition if available */}
          {advocate.publications && advocate.publications.length > 0 && (
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <div className="flex items-center gap-2 font-semibold text-xs text-slate-400 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-[#C9A227]" />
                <span>Publications & Legal Commentary</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                {advocate.publications.map((pub, idx) => (
                  <li key={idx}>{pub}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 sm:px-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-xs text-slate-500">
            Enrolled advocate credentials verified in Supreme Court Bar Association registry.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onConsultationWithAdvocate(advocate.fullName);
              }}
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white text-xs font-semibold px-5 py-2.5 rounded shadow transition-colors flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>Consult with {advocate.fullName.split(' ')[0]}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { X, Send, Paperclip, CheckCircle, ShieldAlert } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMatter?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialMatter = ''
}) => {
  const { practiceAreas, submitConsultationRequest } = useChamber();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [legalMatter, setLegalMatter] = useState(initialMatter || 'Civil Litigation');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'phone' | 'whatsapp' | 'email' | 'in_person' | 'online_meeting'>('phone');
  const [briefDescription, setBriefDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      setErrorMsg('Please enter your full name and phone number.');
      return;
    }

    submitConsultationRequest({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      legalMatter,
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredContactMethod,
      briefDescription: briefDescription.trim(),
      attachmentName: attachmentName || undefined
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0B1F3A] text-white p-5 flex justify-between items-center border-b border-[#173B6C]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A227]">
              Legal Consultation Booking
            </span>
            <h3 className="font-serif-title text-xl font-bold text-white">
              Khan Law Associates
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="font-serif-title text-xl font-bold text-[#0B1F3A]">
                Consultation Request Logged
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you, {fullName}. Our chamber administrator will contact you at {phoneNumber} to coordinate your consultation.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 rounded bg-[#0B1F3A] text-white text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Advocate/Client Name"
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Matter Category
                  </label>
                  <select
                    value={legalMatter}
                    onChange={(e) => setLegalMatter(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
                  >
                    {practiceAreas.map(pa => (
                      <option key={pa.id} value={pa.title}>{pa.title}</option>
                    ))}
                    <option value="General Legal Inquiry">General Legal Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Channel
                  </label>
                  <select
                    value={preferredContactMethod}
                    onChange={(e) => setPreferredContactMethod(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="phone">Direct Phone Call</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="in_person">In-Person (Dhaka Chamber)</option>
                    <option value="online_meeting">Online Video (Zoom/Meet)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Factual Summary
                </label>
                <textarea
                  rows={2}
                  value={briefDescription}
                  onChange={(e) => setBriefDescription(e.target.value)}
                  placeholder="Summary of issue or court notice..."
                  className="w-full text-xs p-2.5 rounded border border-slate-300"
                ></textarea>
              </div>

              <div className="p-3 rounded bg-amber-50 text-[11px] text-amber-900 border border-amber-200 flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  Please refrain from submitting confidential evidence until a formal advocate-client communication channel has been confirmed.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B1F3A] hover:bg-[#173B6C] text-white py-3 rounded text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Send className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Submit Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

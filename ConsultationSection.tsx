import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  FileText, 
  ShieldAlert, 
  Send, 
  Paperclip,
  CheckCircle,
  Building
} from 'lucide-react';

interface ConsultationSectionProps {
  defaultMatter?: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ defaultMatter = '' }) => {
  const { contactInfo, submitConsultationRequest, practiceAreas } = useChamber();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [legalMatter, setLegalMatter] = useState(defaultMatter || 'Civil Litigation');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'phone' | 'whatsapp' | 'email' | 'in_person' | 'online_meeting'>('phone');
  const [briefDescription, setBriefDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg('Document size exceeds 15MB limit.');
        return;
      }
      setAttachmentName(`${file.name} (${Math.round(file.size / 1024)} KB)`);
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      setErrorMsg('Please provide your full name and contact telephone number.');
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
    setErrorMsg('');
  };

  return (
    <section id="consultation" className="py-20 md:py-28 bg-[#F5F7FA] border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Chamber Guidance & Quick Reach */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
              Client Advisory Services
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              Need Legal Advice?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              If you have a legal issue and need professional guidance, contact Khan Law Associates to discuss your matter with qualified advocates.
            </p>

            {/* Quick Contact Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${contactInfo.phone}`}
                className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-5 py-3 rounded text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A227]" />
                <span>Call Now: {contactInfo.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Khan%20Law%20Associates,%20I%20would%20like%20to%20request%20a%20legal%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#128C7E] hover:bg-[#075E54] text-white px-5 py-3 rounded text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Official</span>
              </a>
            </div>

            {/* Chamber Addresses */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-1" />
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-slate-900 block">Supreme Court Annex Chamber:</span>
                  <span className="text-slate-600 block">{contactInfo.officeAddress}</span>
                </div>
              </div>

              {contactInfo.courtChamberAddress && (
                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <Building className="w-4 h-4 text-[#173B6C] flex-shrink-0 mt-1" />
                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-slate-900 block">Dhaka Bar Association Chamber:</span>
                    <span className="text-slate-600 block">{contactInfo.courtChamberAddress}</span>
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Office Hours: </span>
                {contactInfo.officeHours}
              </div>
            </div>

            {/* Mandatory Confidentiality Reminder */}
            <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Please avoid submitting highly sensitive or confidential information through an unsecured form until an appropriate lawyer-client communication channel has been established.
              </p>
            </div>
          </div>

          {/* Right Column: Formal Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md border border-slate-200">
              
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-title text-2xl font-bold text-[#0B1F3A]">
                    Consultation Request Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {fullName}. Your matter inquiry regarding <strong>{legalMatter}</strong> has been logged in our chamber management system. A coordinator will contact you at <strong>{phoneNumber}</strong> to confirm scheduling.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setPhoneNumber('');
                      setEmail('');
                      setBriefDescription('');
                      setAttachmentName('');
                    }}
                    className="text-xs font-semibold text-[#0B1F3A] hover:underline cursor-pointer pt-2 inline-block"
                  >
                    Submit another consultation request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-serif-title text-xl font-bold text-[#0B1F3A]">
                      Schedule a Legal Consultation
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out the preliminary details below. We review inquiries during chamber hours.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Mohammad Rahim"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] transition-colors"
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
                        placeholder="e.g. +880 1712-345678"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email and Matter Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Legal Matter Category
                      </label>
                      <select
                        value={legalMatter}
                        onChange={(e) => setLegalMatter(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] bg-white transition-colors"
                      >
                        {practiceAreas.map(pa => (
                          <option key={pa.id} value={pa.title}>
                            {pa.title}
                          </option>
                        ))}
                        <option value="Writ Petition & Constitutional Law">Writ Petition & Constitutional Law</option>
                        <option value="General Legal Advisory">General Legal Advisory</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date & Contact Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Consultation Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Contact Method
                      </label>
                      <select
                        value={preferredContactMethod}
                        onChange={(e) => setPreferredContactMethod(e.target.value as any)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] bg-white transition-colors"
                      >
                        <option value="phone">Direct Phone Call</option>
                        <option value="whatsapp">WhatsApp Message / Call</option>
                        <option value="in_person">In-Person Chamber Meeting (Dhaka)</option>
                        <option value="online_meeting">Online Video Meeting (Zoom/Meet)</option>
                        <option value="email">Email Communication</option>
                      </select>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Description of Matter
                    </label>
                    <textarea
                      rows={3}
                      value={briefDescription}
                      onChange={(e) => setBriefDescription(e.target.value)}
                      placeholder="Outline key facts (e.g., date dispute started, parties involved, legal notices received)..."
                      className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] transition-colors resize-y"
                    ></textarea>
                  </div>

                  {/* Optional File Attachment simulation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Optional Document Attachment (Deed, Notice, Order)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer border border-dashed border-slate-300 hover:border-[#0B1F3A] rounded px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
                        <Paperclip className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>Choose File (PDF, JPG, PNG)</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={handleFileUpload}
                        />
                      </label>
                      {attachmentName && (
                        <span className="text-xs text-emerald-700 font-medium truncate max-w-xs">
                          {attachmentName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#0B1F3A] hover:bg-[#173B6C] text-white py-3.5 px-6 rounded font-semibold text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#C9A227]" />
                      <span>Request Consultation</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

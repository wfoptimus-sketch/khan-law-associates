import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { ContactInfo } from '../../types';
import { Phone, Mail, MapPin, MessageSquare, Clock, Save, Globe, ShieldCheck } from 'lucide-react';

export const ContactManager: React.FC = () => {
  const { contactInfo, updateContactInfo, showNotification } = useChamber();

  const [form, setForm] = useState<ContactInfo>({ ...contactInfo });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      
      {/* Notice Banner */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Dynamic Website-Wide Propagation:</span>
          Any update saved here automatically updates the telephone, WhatsApp link, email, physical addresses, and hours across the Header, Footer, Hero, Contact section, and Consultation CTAs across the entire platform.
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        
        <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
          <div>
            <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
              Chamber Contact Information
            </h2>
            <p className="text-xs text-slate-500">
              Manage client communication lines and chamber coordinates
            </p>
          </div>
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Saved Everywhere!
            </span>
          )}
        </div>

        {/* Telephones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Chamber Phone (Raw Dial String) <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+8802223389012"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Used for 'tel:' dialer links</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Display Text <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={form.phoneDisplay}
              onChange={(e) => handleChange('phoneDisplay', e.target.value)}
              placeholder="+880 (02) 22338-9012"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Visible formatted phone number</span>
          </div>
        </div>

        {/* WhatsApp & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official WhatsApp (with country code)
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="+8801711002233"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Launches direct WhatsApp chat</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              WhatsApp Display Label
            </label>
            <input
              type="text"
              value={form.whatsappDisplay}
              onChange={(e) => handleChange('whatsappDisplay', e.target.value)}
              placeholder="+880 1711-002233"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Chamber Email Address <span className="text-rose-600">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="chamber@khanlawassociates.com"
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
          />
        </div>

        {/* Addresses */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Office Address (Supreme Court Annex)
            </label>
            <textarea
              rows={2}
              required
              value={form.officeAddress}
              onChange={(e) => handleChange('officeAddress', e.target.value)}
              placeholder="Suite number, Building, Area, Dhaka, Bangladesh"
              className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Secondary / Court Branch Address (Optional)
            </label>
            <textarea
              rows={2}
              value={form.courtChamberAddress || ''}
              onChange={(e) => handleChange('courtChamberAddress', e.target.value)}
              placeholder="Dhaka Bar Association Chamber / Branch"
              className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            ></textarea>
          </div>
        </div>

        {/* Office Hours & Emergency Notice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Office Hours
            </label>
            <input
              type="text"
              value={form.officeHours}
              onChange={(e) => handleChange('officeHours', e.target.value)}
              placeholder="Saturday to Thursday: 9:00 AM – 7:30 PM"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Emergency Advisory Notice
            </label>
            <input
              type="text"
              value={form.emergencyNotice || ''}
              onChange={(e) => handleChange('emergencyNotice', e.target.value)}
              placeholder="Notice for urgent bail or time-sensitive petitions"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
          </div>
        </div>

        {/* Map Links */}
        <div className="space-y-4 border-t border-slate-200 pt-4">
          <h3 className="font-serif-title text-sm font-bold text-[#0B1F3A]">
            Google Maps Integration
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Google Maps Embed URL (IFrame src)
            </label>
            <input
              type="text"
              value={form.googleMapsEmbedUrl || ''}
              onChange={(e) => handleChange('googleMapsEmbedUrl', e.target.value)}
              placeholder="https://maps.google.com/maps?q=..."
              className="w-full text-xs px-3.5 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Google Maps Directions URL
            </label>
            <input
              type="text"
              value={form.googleMapsDirectionsUrl || ''}
              onChange={(e) => handleChange('googleMapsDirectionsUrl', e.target.value)}
              placeholder="https://maps.google.com/?q=..."
              className="w-full text-xs px-3.5 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A] font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4 border-t border-slate-200 pt-4">
          <h3 className="font-serif-title text-sm font-bold text-[#0B1F3A]">
            Social Media & Professional Profiles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="url"
                value={form.facebookUrl || ''}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedinUrl || ''}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/..."
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube URL</label>
              <input
                type="url"
                value={form.youtubeUrl || ''}
                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4 text-[#C9A227]" />
            <span>Save & Propagate Everywhere</span>
          </button>
        </div>

      </form>

    </div>
  );
};

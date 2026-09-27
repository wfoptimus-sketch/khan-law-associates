import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  Building,
  Navigation
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { contactInfo, settings } = useChamber();

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FFFFFF] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
            Chamber Coordination
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            Contact Khan Law Associates
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Reach our advocates via telephone, secure WhatsApp messaging, or schedule a formal consultation at our Supreme Court Annex chambers.
          </p>
        </div>

        {/* 3 Quick Action Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href={`tel:${contactInfo.phone}`}
            className="p-6 rounded-lg bg-[#0B1F3A] text-white flex flex-col items-center text-center group hover:bg-[#173B6C] transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 text-[#C9A227] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-300">
              Direct Telephone
            </span>
            <span className="font-serif-title text-lg font-bold mt-1 text-[#C9A227]">
              {contactInfo.phoneDisplay}
            </span>
            <span className="text-xs text-slate-300 mt-2 underline underline-offset-4">
              [Call Chamber]
            </span>
          </a>

          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Khan%20Law%20Associates,%20I%20wish%20to%20inquire%20about%20a%20legal%20matter.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-lg bg-[#128C7E] text-white flex flex-col items-center text-center group hover:bg-[#0E6C61] transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-semibold tracking-wider text-emerald-100">
              WhatsApp Messenger
            </span>
            <span className="font-serif-title text-lg font-bold mt-1 text-white">
              {contactInfo.whatsappDisplay}
            </span>
            <span className="text-xs text-emerald-100 mt-2 underline underline-offset-4">
              [WhatsApp Us]
            </span>
          </a>

          <a
            href={contactInfo.googleMapsDirectionsUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-lg bg-[#F5F7FA] border border-slate-300 text-slate-800 flex flex-col items-center text-center group hover:border-[#0B1F3A] transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-slate-200 text-[#0B1F3A] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Navigation className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
              Chamber Location
            </span>
            <span className="font-serif-title text-base font-bold mt-1 text-[#0B1F3A]">
              Ramna & Old Dhaka
            </span>
            <span className="text-xs text-[#0B1F3A] font-semibold mt-2 underline underline-offset-4">
              [Get Directions]
            </span>
          </a>
        </div>

        {/* Detailed Address Grid & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-5 bg-[#F5F7FA] p-8 rounded-lg border border-slate-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-serif-title text-xl font-bold text-[#0B1F3A]">
                  Chamber Coordinates
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Dhaka, Bangladesh · Official Consultation Facilities
                </p>
              </div>

              {/* Primary Office Address */}
              <div className="flex items-start gap-3.5">
                <Building className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 block font-serif-title">
                    Supreme Court Annex Chamber:
                  </span>
                  <span className="text-slate-600 block leading-relaxed">
                    {contactInfo.officeAddress}
                  </span>
                </div>
              </div>

              {/* Court Branch Address */}
              {contactInfo.courtChamberAddress && (
                <div className="flex items-start gap-3.5 border-t border-slate-200 pt-4">
                  <MapPin className="w-5 h-5 text-[#173B6C] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs sm:text-sm">
                    <span className="font-bold text-slate-900 block font-serif-title">
                      Subordinate Courts Chamber:
                    </span>
                    <span className="text-slate-600 block leading-relaxed">
                      {contactInfo.courtChamberAddress}
                    </span>
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div className="flex items-start gap-3.5 border-t border-slate-200 pt-4">
                <Mail className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 block font-serif-title">
                    Official Email:
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-[#0B1F3A] hover:text-[#C9A227] font-medium block"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-3.5 border-t border-slate-200 pt-4">
                <Clock className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 block font-serif-title">
                    Consultation Hours:
                  </span>
                  <span className="text-slate-600 block leading-relaxed">
                    {contactInfo.officeHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            {contactInfo.emergencyNotice && (
              <div className="p-3.5 rounded bg-white border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-rose-800">Urgent Matters: </span>
                {contactInfo.emergencyNotice}
              </div>
            )}
          </div>

          {/* Interactive Google Map Preview / Frame */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm relative min-h-[360px]">
            <iframe
              title="Khan Law Associates Supreme Court Office Map"
              src={contactInfo.googleMapsEmbedUrl || 'https://maps.google.com/maps?q=Supreme+Court+of+Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed'}
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
};

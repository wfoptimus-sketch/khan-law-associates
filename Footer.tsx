import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { Scale, Phone, Mail, MapPin, MessageSquare, ArrowUp, Facebook, Linkedin, Youtube, Shield } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal: (pageKey: 'disclaimer' | 'privacyPolicy' | 'termsOfUse') => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal, onOpenConsultation }) => {
  const { settings, contactInfo } = useChamber();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Our Team', href: '#team' },
    { label: 'Practice Areas', href: '#practice-areas' },
    { label: 'Experience', href: '#experience' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Services', href: '#services' },
    { label: 'Our Approach', href: '#approach' },
    { label: 'Legal Insights', href: '#legal-insights' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#071527] text-slate-400 border-t border-slate-800 text-xs">
      
      {/* Upper Footer: Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Chamber Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0B1F3A] flex items-center justify-center text-[#C9A227] rounded border border-[#173B6C]">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-title text-lg font-bold text-white tracking-wide">
                  {settings.brandName}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#C9A227] font-semibold block">
                  {settings.subtitle}
                </span>
              </div>
            </div>

            <p className="text-slate-300 font-serif-title italic text-sm">
              "Professional Legal Advice. Responsible Representation."
            </p>

            <p className="text-slate-400 leading-relaxed font-light">
              Providing civil litigation, criminal defence, banking recovery, property title vetting, and commercial advisory services in Bangladesh with unwavering fidelity to professional ethics.
            </p>

            {/* Social links */}
            <div className="pt-2 flex items-center gap-3">
              {contactInfo.facebookUrl && (
                <a
                  href={contactInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-slate-800 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {contactInfo.linkedinUrl && (
                <a
                  href={contactInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-slate-800 hover:bg-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {contactInfo.youtubeUrl && (
                <a
                  href={contactInfo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-slate-800 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-title text-sm font-bold text-white uppercase tracking-wider">
              Chamber Overview
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#C9A227] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice & Insights */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-title text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(6).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#C9A227] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="text-[#C9A227] hover:underline font-medium text-left"
                >
                  Book a Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Chamber Contact Details (Strictly dynamic from state!) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-title text-sm font-bold text-white uppercase tracking-wider">
              Dhaka Chambers
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                <span className="leading-snug text-slate-300">
                  {contactInfo.officeAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-white transition-colors text-slate-200 font-semibold"
                >
                  {contactInfo.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-slate-300"
                >
                  WhatsApp: {contactInfo.whatsappDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal Disclaimer & Copyright */}
      <div className="bg-[#050e1a] border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div>
            © {currentYear} {settings.brandName}. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenLegalModal('privacyPolicy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegalModal('termsOfUse')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Use
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegalModal('disclaimer')}
              className="hover:text-slate-300 transition-colors"
            >
              Legal Disclaimer
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
};

import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { 
  Phone, 
  Menu, 
  X, 
  Scale, 
  Shield, 
  MessageSquareQuote, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onNavigatePage?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onNavigatePage }) => {
  const { settings, contactInfo, setActiveView, currentUser } = useChamber();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Practice Areas', href: '#practice-areas' },
    { label: 'Our Team', href: '#team' },
    { label: 'Experience', href: '#experience' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Services', href: '#services' },
    { label: 'Our Approach', href: '#approach' },
    { label: 'Legal Insights', href: '#legal-insights' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Bar with Emergency and Quick Phone */}
      <div className="bg-[#071527] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C9A227]"></span>
            <span>{settings.primaryJurisdiction}</span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">Dhaka Chamber</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${contactInfo.phone}`} 
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#C9A227] transition-colors font-medium"
              title="Direct Chamber Telephone"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>{contactInfo.phoneDisplay || contactInfo.phone}</span>
            </a>

            <span className="text-slate-700">·</span>

            <button
              onClick={() => setActiveView('admin')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded text-xs border border-slate-700 cursor-pointer"
              title="Access Admin CMS & Management"
            >
              <SlidersHorizontal className="w-3 h-3 text-[#C9A227]" />
              <span>{currentUser ? `Admin (${currentUser.role === 'super_admin' ? 'Super Admin' : 'Editor'})` : 'Admin CMS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo & Title */}
            <a href="#home" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 bg-[#0B1F3A] flex items-center justify-center text-[#C9A227] rounded shadow-sm border border-[#173B6C] flex-shrink-0 group-hover:bg-[#173B6C] transition-colors">
                <Scale className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col">
                <span className="font-display-title text-xl sm:text-2xl font-bold tracking-tight text-[#0B1F3A] leading-tight">
                  {settings.brandName}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#C9A227] uppercase">
                  {settings.subtitle}
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-2.5 py-1.5 text-[13px] font-medium text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50 rounded transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="bg-[#0B1F3A] hover:bg-[#173B6C] text-[#FFFFFF] text-sm font-semibold px-5 py-2.5 rounded shadow-sm transition-all border border-[#0B1F3A] hover:border-[#173B6C] flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ChevronRight className="w-4 h-4 text-[#C9A227]" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={onOpenConsultation}
                className="hidden sm:inline-flex bg-[#0B1F3A] hover:bg-[#173B6C] text-white text-xs font-semibold px-3 py-2 rounded"
              >
                Consultation
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-100 rounded focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50 rounded"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full bg-[#0B1F3A] text-white py-3 rounded font-semibold text-center text-sm shadow flex items-center justify-center gap-2"
                >
                  <span>Book a Consultation</span>
                  <ChevronRight className="w-4 h-4 text-[#C9A227]" />
                </button>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="w-full border border-slate-300 text-slate-800 py-2.5 rounded font-medium text-center text-sm flex items-center justify-center gap-2 hover:bg-slate-50"
                >
                  <Phone className="w-4 h-4 text-[#C9A227]" />
                  <span>Call Chamber: {contactInfo.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

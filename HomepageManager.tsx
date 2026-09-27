import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { SectionVisibility, HeroSectionData, AboutSectionData, MissionVisionData } from '../../types';
import { Eye, EyeOff, Save, Image, CheckCircle, Sliders, ExternalLink } from 'lucide-react';

export const HomepageManager: React.FC = () => {
  const { 
    hero, 
    updateHero, 
    about, 
    updateAbout, 
    missionVision, 
    updateMissionVision, 
    sectionVisibility, 
    updateSectionVisibility,
    setActiveView,
    media
  } = useChamber();

  const [activeSubTab, setActiveSubTab] = useState<'visibility' | 'hero' | 'about' | 'mission'>('visibility');

  // Hero state
  const [heroForm, setHeroForm] = useState<HeroSectionData>({ ...hero });
  // About state
  const [aboutForm, setAboutForm] = useState<AboutSectionData>({ ...about });
  // Mission/Vision state
  const [mvForm, setMvForm] = useState<MissionVisionData>({ ...missionVision });

  const toggleSection = (key: keyof SectionVisibility) => {
    updateSectionVisibility({ [key]: !sectionVisibility[key] });
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(aboutForm);
  };

  const handleSaveMv = (e: React.FormEvent) => {
    e.preventDefault();
    updateMissionVision(mvForm);
  };

  const sectionLabels: { key: keyof SectionVisibility; label: string; desc: string }[] = [
    { key: 'hero', label: 'Hero Banner Section', desc: 'Main title, CTA buttons, and chamber background' },
    { key: 'trustIndicators', label: '3 Trust Indicators', desc: 'Professional Consultation, Representation, Ethics' },
    { key: 'about', label: 'About Khan Law Associates', desc: 'Chamber introduction narrative & key highlights' },
    { key: 'missionVision', label: 'Mission & Vision', desc: 'Dual cards highlighting core purpose' },
    { key: 'values', label: 'Our Values', desc: 'Integrity, Confidentiality, Professionalism, Client Focus' },
    { key: 'practiceAreas', label: 'Practice Areas Grid', desc: 'All published practice area cards' },
    { key: 'whyChooseUs', label: 'Why Choose Us', desc: '6 professional assurance cards' },
    { key: 'experience', label: 'Experience & Milestones', desc: 'Key statistical counters & career timeline' },
    { key: 'expertise', label: 'Legal Expertise', desc: 'Research, drafting, negotiation, advisory' },
    { key: 'team', label: 'Our Legal Team', desc: 'Advocate profiles and verified credentials' },
    { key: 'approach', label: 'Our Approach (6 Steps)', desc: 'How We Handle Your Legal Matter + Disclaimer' },
    { key: 'services', label: 'Services Catalogue', desc: 'Legal Consultation, Drafting, Vetting, Retainer' },
    { key: 'legalInsights', label: 'Legal Insights (Blog)', desc: 'Published legal articles & research commentary' },
    { key: 'faqs', label: 'Frequently Asked Questions', desc: 'Accordion list of common client questions' },
    { key: 'testimonials', label: 'Client Feedback', desc: 'Genuine testimonials with client consent' },
    { key: 'consultationCta', label: 'Consultation Booking Form', desc: 'Interactive booking form with matter selector' },
    { key: 'contact', label: 'Contact Coordinates & Maps', desc: 'Addresses, telephones, WhatsApp, Google Maps' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 gap-2 pb-2">
        <button
          onClick={() => setActiveSubTab('visibility')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'visibility'
              ? 'bg-[#0B1F3A] text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Section Visibility (ON / OFF)
        </button>

        <button
          onClick={() => setActiveSubTab('hero')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'hero'
              ? 'bg-[#0B1F3A] text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Hero Section Content
        </button>

        <button
          onClick={() => setActiveSubTab('about')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'about'
              ? 'bg-[#0B1F3A] text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          About Us Content
        </button>

        <button
          onClick={() => setActiveSubTab('mission')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'mission'
              ? 'bg-[#0B1F3A] text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Mission & Vision
        </button>
      </div>

      {/* Tab 1: Section Visibility Controls */}
      {activeSubTab === 'visibility' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <div>
              <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
                Homepage Section Visibility & Toggles
              </h2>
              <p className="text-xs text-slate-500">
                Turn specific homepage blocks ON or OFF with a single click.
              </p>
            </div>
            <button
              onClick={() => setActiveView('public')}
              className="text-xs font-semibold text-[#0B1F3A] hover:underline flex items-center gap-1"
            >
              <span>Preview Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectionLabels.map((sec) => {
              const isEnabled = sectionVisibility[sec.key];
              return (
                <div
                  key={sec.key}
                  className={`p-4 rounded-lg border transition-all flex items-center justify-between ${
                    isEnabled
                      ? 'border-slate-300 bg-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 opacity-70'
                  }`}
                >
                  <div className="space-y-0.5 max-w-[70%]">
                    <span className="font-semibold text-xs text-slate-900 block font-serif-title">
                      {sec.label}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {sec.desc}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSection(sec.key)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isEnabled
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {isEnabled ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Hero Editor */}
      {activeSubTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
              Hero Section Copy & Imagery
            </h2>
            <p className="text-xs text-slate-500">Edit headline, supporting narrative, and CTA links</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Main Hero Headline <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={heroForm.headline}
              onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-serif-title font-bold text-[#0B1F3A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supporting Narrative Text
            </label>
            <textarea
              rows={3}
              required
              value={heroForm.supportingText}
              onChange={(e) => setHeroForm({ ...heroForm, supportingText: e.target.value })}
              className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Button Label
              </label>
              <input
                type="text"
                value={heroForm.primaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={heroForm.secondaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hero Visual Image URL
            </label>
            <input
              type="text"
              value={heroForm.imageUrl}
              onChange={(e) => setHeroForm({ ...heroForm, imageUrl: e.target.value })}
              className="w-full text-xs px-3.5 py-2 rounded border border-slate-300 font-mono text-[11px]"
            />
          </div>

          {/* 3 Trust Indicators */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <h3 className="font-serif-title text-sm font-bold text-[#0B1F3A]">
              Trust Indicators (3 Items)
            </h3>
            {heroForm.trustIndicators.map((ti, index) => (
              <div key={ti.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <input
                  type="text"
                  value={ti.title}
                  onChange={(e) => {
                    const newTis = [...heroForm.trustIndicators];
                    newTis[index].title = e.target.value;
                    setHeroForm({ ...heroForm, trustIndicators: newTis });
                  }}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded border border-slate-300"
                  placeholder="Indicator Title"
                />
                <textarea
                  rows={2}
                  value={ti.description}
                  onChange={(e) => {
                    const newTis = [...heroForm.trustIndicators];
                    newTis[index].description = e.target.value;
                    setHeroForm({ ...heroForm, trustIndicators: newTis });
                  }}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Indicator Description"
                ></textarea>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow"
            >
              <Save className="w-4 h-4 text-[#C9A227]" />
              <span>Save Hero Section</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: About Us Editor */}
      {activeSubTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
              About Us Section Editor
            </h2>
            <p className="text-xs text-slate-500">Edit title, lead paragraph, and key chamber highlights</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kicker Tagline
              </label>
              <input
                type="text"
                value={aboutForm.kicker}
                onChange={(e) => setAboutForm({ ...aboutForm, kicker: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={aboutForm.title}
                onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-serif-title font-bold text-[#0B1F3A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lead Paragraph (Featured text)
            </label>
            <textarea
              rows={3}
              value={aboutForm.leadParagraph}
              onChange={(e) => setAboutForm({ ...aboutForm, leadParagraph: e.target.value })}
              className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300 italic"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Key Chamber Highlights (4 points)
            </label>
            <div className="space-y-2">
              {aboutForm.keyHighlights.map((hl, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={hl}
                  onChange={(e) => {
                    const newHl = [...aboutForm.keyHighlights];
                    newHl[idx] = e.target.value;
                    setAboutForm({ ...aboutForm, keyHighlights: newHl });
                  }}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow"
            >
              <Save className="w-4 h-4 text-[#C9A227]" />
              <span>Save About Section</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Mission & Vision */}
      {activeSubTab === 'mission' && (
        <form onSubmit={handleSaveMv} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
              Mission & Vision Statements
            </h2>
            <p className="text-xs text-slate-500">Edit institutional mission and vision</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-serif-title">
                Chamber Mission
              </label>
              <input
                type="text"
                value={mvForm.missionTitle}
                onChange={(e) => setMvForm({ ...mvForm, missionTitle: e.target.value })}
                className="w-full text-xs font-semibold px-3 py-2 rounded border border-slate-300"
              />
              <textarea
                rows={3}
                value={mvForm.missionDescription}
                onChange={(e) => setMvForm({ ...mvForm, missionDescription: e.target.value })}
                className="w-full text-xs p-2.5 rounded border border-slate-300"
              ></textarea>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-serif-title">
                Chamber Vision
              </label>
              <input
                type="text"
                value={mvForm.visionTitle}
                onChange={(e) => setMvForm({ ...mvForm, visionTitle: e.target.value })}
                className="w-full text-xs font-semibold px-3 py-2 rounded border border-slate-300"
              />
              <textarea
                rows={3}
                value={mvForm.visionDescription}
                onChange={(e) => setMvForm({ ...mvForm, visionDescription: e.target.value })}
                className="w-full text-xs p-2.5 rounded border border-slate-300"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow"
            >
              <Save className="w-4 h-4 text-[#C9A227]" />
              <span>Save Mission & Vision</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

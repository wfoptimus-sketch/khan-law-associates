import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { WebsiteSettings, LegalPagesContent } from '../../types';
import { Save, Scale, FileText, CheckCircle, Shield } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const { settings, updateSettings, legalPages, updateLegalPageContent } = useChamber();

  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>({ ...settings });
  const [activeTab, setActiveTab] = useState<'brand' | 'legalPages'>('brand');

  // Legal pages
  const [selectedLegalPage, setSelectedLegalPage] = useState<keyof LegalPagesContent>('disclaimer');
  const [legalPageContent, setLegalPageContent] = useState(legalPages.disclaimer.content);
  const [legalPageTitle, setLegalPageTitle] = useState(legalPages.disclaimer.title);

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const handleSwitchLegalPage = (key: keyof LegalPagesContent) => {
    setSelectedLegalPage(key);
    setLegalPageContent(legalPages[key].content);
    setLegalPageTitle(legalPages[key].title);
  };

  const handleSaveLegalPage = (e: React.FormEvent) => {
    e.preventDefault();
    updateLegalPageContent(selectedLegalPage, legalPageContent, legalPageTitle);
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 pb-2">
        <button
          onClick={() => setActiveTab('brand')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'brand'
              ? 'bg-[#0B1F3A] text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Brand & Chamber Identity
        </button>

        <button
          onClick={() => setActiveTab('legalPages')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'legalPages'
              ? 'bg-[#0B1F3A] text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Policy & Legal Pages (Disclaimer, Privacy, Terms)
        </button>
      </div>

      {activeTab === 'brand' && (
        <form onSubmit={handleSaveBrand} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <div>
              <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
                Brand Identity & Core Settings
              </h2>
              <p className="text-xs text-slate-500">
                Configure primary chamber name, subtitle, and logo preferences
              </p>
            </div>
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Save className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Save Brand Settings</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Brand Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={settingsForm.brandName}
                onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-serif-title font-bold text-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chamber Subtitle <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={settingsForm.subtitle}
                onChange={(e) => setSettingsForm({ ...settingsForm, subtitle: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={settingsForm.tagline}
                onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Established Year
              </label>
              <input
                type="text"
                value={settingsForm.establishedYear}
                onChange={(e) => setSettingsForm({ ...settingsForm, establishedYear: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded border border-slate-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Jurisdiction Notice
            </label>
            <input
              type="text"
              value={settingsForm.primaryJurisdiction}
              onChange={(e) => setSettingsForm({ ...settingsForm, primaryJurisdiction: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded border border-slate-300"
            />
          </div>

          {/* Logo Format Selection */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <label className="block text-xs font-semibold text-slate-700">Logo Presentation Mode</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="logoType"
                  value="text"
                  checked={settingsForm.logoType === 'text'}
                  onChange={() => setSettingsForm({ ...settingsForm, logoType: 'text' })}
                />
                <span>Text-based Fallback Logo with Scales of Justice Icon (Default)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="logoType"
                  value="image"
                  checked={settingsForm.logoType === 'image'}
                  onChange={() => setSettingsForm({ ...settingsForm, logoType: 'image' })}
                />
                <span>Custom Uploaded Logo Image</span>
              </label>
            </div>

            {settingsForm.logoType === 'image' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Logo Image URL</label>
                <input
                  type="text"
                  value={settingsForm.logoUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-mono"
                />
              </div>
            )}
          </div>
        </form>
      )}

      {/* Legal Pages Editor */}
      {activeTab === 'legalPages' && (
        <form onSubmit={handleSaveLegalPage} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <div>
              <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
                Chamber Legal & Compliance Pages
              </h2>
              <p className="text-xs text-slate-500">
                Edit Legal Disclaimer, Privacy Policy, and Terms of Use
              </p>
            </div>

            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Save className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Save Document</span>
            </button>
          </div>

          {/* Selector */}
          <div className="flex gap-2">
            {(['disclaimer', 'privacyPolicy', 'termsOfUse'] as (keyof LegalPagesContent)[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSwitchLegalPage(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  selectedLegalPage === key
                    ? 'bg-[#0B1F3A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {key === 'disclaimer' ? 'Legal Disclaimer' : key === 'privacyPolicy' ? 'Privacy Policy' : 'Terms of Use'}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Document Title</label>
            <input
              type="text"
              value={legalPageTitle}
              onChange={(e) => setLegalPageTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Document Text (Markdown formatted)
            </label>
            <textarea
              rows={12}
              value={legalPageContent}
              onChange={(e) => setLegalPageContent(e.target.value)}
              className="w-full text-xs font-mono p-3.5 rounded border border-slate-300 leading-relaxed"
            ></textarea>
          </div>
        </form>
      )}

    </div>
  );
};

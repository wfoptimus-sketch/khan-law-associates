import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { SeoSettings } from '../../types';
import { Save, Search, Globe, CheckCircle } from 'lucide-react';

export const SeoManager: React.FC = () => {
  const { seoSettings, updateSeoSettings } = useChamber();

  const [form, setForm] = useState<SeoSettings>({ ...seoSettings });
  const [keywordsText, setKeywordsText] = useState(seoSettings.keywords.join(', '));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const keywords = keywordsText.split(',').map(k => k.trim()).filter(Boolean);
    updateSeoSettings({
      ...form,
      keywords
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
              Search Engine Optimization (SEO) & Metadata
            </h2>
            <p className="text-xs text-slate-500">
              Configure meta titles, descriptions, and keywords for Google indexing
            </p>
          </div>
          <button
            type="submit"
            className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Save className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Save SEO Settings</span>
          </button>
        </div>

        {/* Google SERP Live Simulation Preview */}
        <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Google Search Snippet Preview
          </span>
          <div className="text-xs text-emerald-800 font-mono truncate">
            {form.canonicalBaseUrl || 'https://khanlawassociates.com'}
          </div>
          <div className="text-base text-blue-800 font-medium hover:underline cursor-pointer truncate font-serif-title">
            {form.defaultTitle || 'Khan Law Associates | Advocates & Legal Consultants in Bangladesh'}
          </div>
          <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {form.defaultDescription}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Global Default Title Tag <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            value={form.defaultTitle}
            onChange={(e) => setForm({ ...form, defaultTitle: e.target.value })}
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-medium"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Recommended: 50–65 characters</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Global Meta Description <span className="text-rose-600">*</span>
          </label>
          <textarea
            rows={3}
            required
            value={form.defaultDescription}
            onChange={(e) => setForm({ ...form, defaultDescription: e.target.value })}
            className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300 leading-relaxed"
          ></textarea>
          <span className="text-[11px] text-slate-400 mt-1 block">Recommended: 120–160 characters</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Target Keywords (Comma separated)
          </label>
          <textarea
            rows={3}
            value={keywordsText}
            onChange={(e) => setKeywordsText(e.target.value)}
            className="w-full text-xs p-3 rounded border border-slate-300 font-mono text-[11px]"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Canonical Base URL</label>
            <input
              type="url"
              value={form.canonicalBaseUrl}
              onChange={(e) => setForm({ ...form, canonicalBaseUrl: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">OpenGraph Social Share Image URL</label>
            <input
              type="text"
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow"
          >
            <Save className="w-4 h-4 text-[#C9A227]" />
            <span>Apply SEO Configurations</span>
          </button>
        </div>
      </form>

    </div>
  );
};

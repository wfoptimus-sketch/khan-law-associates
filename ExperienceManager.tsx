import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { ExperienceStat, ExperienceMilestone } from '../../types';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

export const ExperienceManager: React.FC = () => {
  const { 
    experienceStats, 
    updateExperienceStats, 
    milestones, 
    updateMilestones 
  } = useChamber();

  const [stats, setStats] = useState<ExperienceStat[]>([...experienceStats]);
  const [msList, setMsList] = useState<ExperienceMilestone[]>([...milestones]);

  const handleStatChange = (id: string, field: keyof ExperienceStat, val: string) => {
    setStats(prev => prev.map(s => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateExperienceStats(stats);
  };

  const handleMilestoneChange = (id: string, field: keyof ExperienceMilestone, val: string) => {
    setMsList(prev => prev.map(m => (m.id === id ? { ...m, [field]: val } : m)));
  };

  const handleAddMilestone = () => {
    const newMs: ExperienceMilestone = {
      id: `ms-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      title: 'New Milestone / Expansion',
      description: 'Milestone details, bar admission, or specialized department launch...',
      sortOrder: msList.length + 1
    };
    setMsList([...msList, newMs]);
  };

  const handleDeleteMilestone = (id: string) => {
    setMsList(prev => prev.filter(m => m.id !== id));
  };

  const handleSaveMilestones = (e: React.FormEvent) => {
    e.preventDefault();
    updateMilestones(msList);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Statistics Section */}
      <form onSubmit={handleSaveStats} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
              Chamber Statistics & Numeric Metrics
            </h2>
            <p className="text-xs text-slate-500">
              Update figures without fabricating data. Values update automatically across the site.
            </p>
          </div>
          <button
            type="submit"
            className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Save className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Save Statistics</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((st) => (
            <div key={st.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Metric #{st.sortOrder}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">ID: {st.id}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Value (e.g. 12+)</label>
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => handleStatChange(st.id, 'value', e.target.value)}
                    className="w-full text-xs font-bold px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Label Title</label>
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => handleStatChange(st.id, 'label', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Helper Subtitle</label>
                <input
                  type="text"
                  value={st.helperText || ''}
                  onChange={(e) => handleStatChange(st.id, 'helperText', e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 text-slate-600"
                />
              </div>
            </div>
          ))}
        </div>
      </form>

      {/* Professional Timeline / Milestones */}
      <form onSubmit={handleSaveMilestones} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
              Professional Timeline & Milestone History
            </h2>
            <p className="text-xs text-slate-500">
              Chronological milestones from chamber foundation to present
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddMilestone}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Year</span>
            </button>
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Save className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Save Milestones</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {msList.map((ms, index) => (
            <div key={ms.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="w-24 flex-shrink-0">
                <label className="block text-[10px] font-semibold text-slate-500 uppercase">Year</label>
                <input
                  type="text"
                  value={ms.year}
                  onChange={(e) => handleMilestoneChange(ms.id, 'year', e.target.value)}
                  className="w-full text-xs font-mono font-bold px-2 py-1 rounded border border-slate-300 bg-white"
                />
              </div>

              <div className="flex-1 space-y-1 w-full">
                <input
                  type="text"
                  value={ms.title}
                  onChange={(e) => handleMilestoneChange(ms.id, 'title', e.target.value)}
                  placeholder="Milestone title"
                  className="w-full text-xs font-bold px-2.5 py-1 rounded border border-slate-300 bg-white font-serif-title"
                />
                <textarea
                  rows={2}
                  value={ms.description}
                  onChange={(e) => handleMilestoneChange(ms.id, 'description', e.target.value)}
                  placeholder="Description of milestone..."
                  className="w-full text-xs p-2 rounded border border-slate-300 bg-white text-slate-600"
                ></textarea>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteMilestone(ms.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer self-start sm:self-center"
                title="Remove Milestone"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </form>

    </div>
  );
};

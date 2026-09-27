import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { TestimonialItem, ContentStatus } from '../../types';
import { Plus, Edit, Trash2, Save, X, AlertTriangle, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsManager: React.FC = () => {
  const { testimonials, saveTestimonial, deleteTestimonial } = useChamber();

  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleCreateNew = () => {
    setEditingItem({
      id: `test-${Date.now()}`,
      clientName: '',
      matterCategory: 'Civil Litigation',
      feedback: '',
      hasClientPermission: true,
      status: 'published',
      dateAdded: new Date().toISOString().split('T')[0]
    });
    setIsCreatingNew(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.clientName.trim() || !editingItem.feedback.trim()) return;

    saveTestimonial(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Strict Ethical Warning from prompt */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-sm block">Ethical Notice & Bar Compliance:</span>
          <p className="font-medium leading-relaxed">
            "Only publish genuine testimonials with appropriate permission. Never fabricate testimonials or case results."
          </p>
          <p className="text-[11px] text-amber-800">
            Client identity may be stated with initials or corporate title (e.g., "Director, Commercial Logistics Company") to safeguard client privilege under Bangladesh Bar Council canons.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
            Client Feedback & Testimonials
          </h2>
          <p className="text-xs text-slate-500">
            Publish verified client observations with explicit consent
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Plus className="w-4 h-4 text-[#C9A227]" />
          <span>Add Client Feedback</span>
        </button>
      </div>

      {editingItem && (
        <form onSubmit={handleSaveForm} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-md space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-[#0B1F3A] font-serif-title">
              {isCreatingNew ? 'Add Client Testimonial' : 'Edit Testimonial'}
            </h3>
            <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client Name / Title <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={editingItem.clientName}
                onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                placeholder="e.g. Managing Director, Tech Enterprise"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Matter Category
              </label>
              <input
                type="text"
                value={editingItem.matterCategory}
                onChange={(e) => setEditingItem({ ...editingItem, matterCategory: e.target.value })}
                placeholder="e.g. Property & Land Title Vetting"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Feedback Content <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={editingItem.feedback}
              onChange={(e) => setEditingItem({ ...editingItem, feedback: e.target.value })}
              placeholder="Factual statement of advocacy, diligence, and professionalism..."
              className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasPermission"
                checked={editingItem.hasClientPermission}
                onChange={(e) => setEditingItem({ ...editingItem, hasClientPermission: e.target.checked })}
                className="w-4 h-4 text-[#0B1F3A] rounded border-slate-300"
              />
              <label htmlFor="hasPermission" className="text-xs font-semibold text-slate-800 cursor-pointer">
                Client has granted written permission to publish
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Visibility Status</label>
              <select
                value={editingItem.status}
                onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as ContentStatus })}
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 rounded border border-slate-300 text-xs text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Save Feedback</span>
            </button>
          </div>
        </form>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-[#0B1F3A] font-serif-title">{item.clientName}</h3>
                  <span className="text-[11px] text-slate-500">{item.matterCategory}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  item.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 italic leading-relaxed">
                "{item.feedback}"
              </p>

              <div className="text-[10px] text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Permission Verified in Records</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => setEditingItem({ ...item })}
                className="p-1.5 text-slate-500 hover:text-[#0B1F3A]"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this testimonial record?')) deleteTestimonial(item.id);
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

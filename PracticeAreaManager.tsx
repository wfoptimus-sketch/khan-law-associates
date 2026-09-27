import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { PracticeArea, ContentStatus } from '../../types';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, Scale, ArrowUp, ArrowDown } from 'lucide-react';

export const PracticeAreaManager: React.FC = () => {
  const { practiceAreas, savePracticeArea, deletePracticeArea, reorderPracticeAreas } = useChamber();

  const [editingArea, setEditingArea] = useState<PracticeArea | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEdit = (area: PracticeArea) => {
    setEditingArea({ ...area });
    setIsCreatingNew(false);
  };

  const handleCreateNew = () => {
    const newArea: PracticeArea = {
      id: `pa-${Date.now()}`,
      slug: `practice-area-${practiceAreas.length + 1}`,
      title: '',
      shortDescription: '',
      fullDescription: '',
      keyServices: ['Courtroom representation', 'Statutory legal advice', 'Drafting of petitions'],
      targetCourts: 'District & Sessions Courts, High Court Division',
      iconName: 'Scale',
      sortOrder: practiceAreas.length + 1,
      status: 'published'
    };
    setEditingArea(newArea);
    setIsCreatingNew(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArea || !editingArea.title.trim()) return;
    
    // Auto generate slug if empty
    const slug = editingArea.slug.trim() || editingArea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    savePracticeArea({
      ...editingArea,
      slug
    });
    setEditingArea(null);
    setIsCreatingNew(false);
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const newAreas = [...practiceAreas];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newAreas.length) return;

    const temp = newAreas[index];
    newAreas[index] = newAreas[targetIndex];
    newAreas[targetIndex] = temp;

    // re-assign sortOrders
    newAreas.forEach((item, idx) => {
      item.sortOrder = idx + 1;
    });

    reorderPracticeAreas(newAreas);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header with New button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
            Practice Areas Management
          </h2>
          <p className="text-xs text-slate-500">
            Add, update, reorder, or publish/hide legal practice areas.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-colors"
        >
          <Plus className="w-4 h-4 text-[#C9A227]" />
          <span>Add Practice Area</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {editingArea && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-md space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
              {isCreatingNew ? 'Create New Practice Area' : `Edit: ${editingArea.title}`}
            </h3>
            <button
              onClick={() => setEditingArea(null)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Practice Area Title <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingArea.title}
                  onChange={(e) => setEditingArea({ ...editingArea, title: e.target.value })}
                  placeholder="e.g. Civil Litigation"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={editingArea.slug}
                  onChange={(e) => setEditingArea({ ...editingArea, slug: e.target.value })}
                  placeholder="civil-litigation"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Icon Identifier
                </label>
                <select
                  value={editingArea.iconName}
                  onChange={(e) => setEditingArea({ ...editingArea, iconName: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Scale">Scale (Civil/General)</option>
                  <option value="ShieldAlert">ShieldAlert (Criminal)</option>
                  <option value="Building2">Building2 (Banking)</option>
                  <option value="Briefcase">Briefcase (Corporate)</option>
                  <option value="LandPlot">LandPlot (Property)</option>
                  <option value="HeartHandshake">HeartHandshake (Family)</option>
                  <option value="FileSignature">FileSignature (Contract)</option>
                  <option value="ScrollText">ScrollText (Documentation)</option>
                  <option value="Users">Users (ADR)</option>
                  <option value="FileCheck">FileCheck (Advisory)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Publication Status
                </label>
                <select
                  value={editingArea.status}
                  onChange={(e) => setEditingArea({ ...editingArea, status: e.target.value as ContentStatus })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
                >
                  <option value="published">Published (Visible on site)</option>
                  <option value="draft">Draft (Chamber internal)</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sort Order Number
                </label>
                <input
                  type="number"
                  value={editingArea.sortOrder}
                  onChange={(e) => setEditingArea({ ...editingArea, sortOrder: parseInt(e.target.value) || 1 })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Card Summary (Visible on homepage)
              </label>
              <textarea
                rows={2}
                required
                value={editingArea.shortDescription}
                onChange={(e) => setEditingArea({ ...editingArea, shortDescription: e.target.value })}
                placeholder="2-3 sentence overview of this practice..."
                className="w-full text-xs sm:text-sm p-2.5 rounded border border-slate-300"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Statutory Scope & Description (Visible in modal view)
              </label>
              <textarea
                rows={4}
                value={editingArea.fullDescription}
                onChange={(e) => setEditingArea({ ...editingArea, fullDescription: e.target.value })}
                placeholder="Detailed breakdown of applicable Bangladesh statutes, court proceedings..."
                className="w-full text-xs sm:text-sm p-2.5 rounded border border-slate-300"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Competent Courts & Forums
              </label>
              <input
                type="text"
                value={editingArea.targetCourts}
                onChange={(e) => setEditingArea({ ...editingArea, targetCourts: e.target.value })}
                placeholder="e.g. District Courts, Artha Rin Adalat, High Court Division"
                className="w-full text-xs px-3.5 py-2 rounded border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Key Services (Comma separated list)
              </label>
              <textarea
                rows={2}
                value={editingArea.keyServices.join(', ')}
                onChange={(e) => setEditingArea({ 
                  ...editingArea, 
                  keyServices: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                })}
                placeholder="Service 1, Service 2, Service 3..."
                className="w-full text-xs p-2.5 rounded border border-slate-300"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditingArea(null)}
                className="px-4 py-2 rounded border border-slate-300 text-xs text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow"
              >
                <Save className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Save Practice Area</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Practice Areas List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5 w-12 text-center">Order</th>
                <th className="p-3.5">Title & Scope</th>
                <th className="p-3.5">Target Courts</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {practiceAreas.map((area, idx) => (
                <tr key={area.id} className="hover:bg-slate-50/80">
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-mono font-bold text-slate-700">{area.sortOrder}</span>
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleMoveOrder(idx, 'up')}
                          disabled={idx === 0}
                          className="text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMoveOrder(idx, 'down')}
                          disabled={idx === practiceAreas.length - 1}
                          className="text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 max-w-sm">
                    <div className="font-bold text-slate-900 font-serif-title">{area.title}</div>
                    <div className="text-slate-500 line-clamp-1">{area.shortDescription}</div>
                  </td>
                  <td className="p-3.5 text-slate-600">
                    <span className="truncate block max-w-xs">{area.targetCourts}</span>
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      area.status === 'published' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {area.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(area)}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-[#0B1F3A] cursor-pointer"
                        title="Edit Area"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove practice area "${area.title}"?`)) {
                            deletePracticeArea(area.id);
                          }
                        }}
                        className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Delete Area"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

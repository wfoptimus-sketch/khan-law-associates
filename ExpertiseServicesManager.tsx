import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { LegalExpertiseItem, ServiceItem } from '../../types';
import { Plus, Edit, Trash2, Save, X, Briefcase, Target } from 'lucide-react';

export const ExpertiseServicesManager: React.FC = () => {
  const { 
    expertise, 
    saveExpertiseItem, 
    deleteExpertiseItem,
    services, 
    saveServiceItem, 
    deleteServiceItem 
  } = useChamber();

  const [activeTab, setActiveTab] = useState<'expertise' | 'services'>('expertise');

  // Expertise state
  const [editingExp, setEditingExp] = useState<LegalExpertiseItem | null>(null);

  // Services state
  const [editingSvc, setEditingSvc] = useState<ServiceItem | null>(null);

  const handleCreateExpertise = () => {
    setEditingExp({
      id: `exp-${Date.now()}`,
      title: '',
      description: '',
      details: ['Key legal criteria', 'Procedural assessment'],
      sortOrder: expertise.length + 1,
      status: 'published'
    });
  };

  const handleCreateService = () => {
    setEditingSvc({
      id: `srv-${Date.now()}`,
      title: '',
      description: '',
      deliverables: ['Detailed opinion brief', 'Courtroom representation'],
      suitableFor: 'Corporate and private clients',
      sortOrder: services.length + 1,
      status: 'published'
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 pb-2">
        <button
          onClick={() => setActiveTab('expertise')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'expertise'
              ? 'bg-[#0B1F3A] text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Legal Expertise Competencies ({expertise.length})
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'services'
              ? 'bg-[#0B1F3A] text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Services Catalogue ({services.length})
        </button>
      </div>

      {/* Expertise Tab */}
      {activeTab === 'expertise' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
                Legal Expertise Modules
              </h2>
              <p className="text-xs text-slate-500">
                Research, drafting, litigation strategy, contract review, and advisory
              </p>
            </div>
            <button
              onClick={handleCreateExpertise}
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-4 h-4 text-[#C9A227]" />
              <span>Add Expertise Card</span>
            </button>
          </div>

          {editingExp && (
            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-md space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-[#0B1F3A] font-serif-title">
                  {editingExp.title ? `Edit: ${editingExp.title}` : 'New Expertise Item'}
                </h3>
                <button onClick={() => setEditingExp(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingExp.title}
                    onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                    placeholder="e.g. Legal Research"
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingExp.status}
                    onChange={(e) => setEditingExp({ ...editingExp, status: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingExp.description}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  placeholder="Detail the procedural depth and statutory analysis..."
                  className="w-full text-xs p-2.5 rounded border border-slate-300"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-3 py-1.5 rounded text-xs border border-slate-300 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (editingExp.title) {
                      saveExpertiseItem(editingExp);
                      setEditingExp(null);
                    }
                  }}
                  className="bg-[#0B1F3A] text-white px-5 py-1.5 rounded text-xs font-semibold"
                >
                  Save Item
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {expertise.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-[#0B1F3A] font-serif-title">{item.title}</h3>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.description}</p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setEditingExp({ ...item })}
                    className="p-1 text-slate-500 hover:text-[#0B1F3A]"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteExpertiseItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
                Services Catalogue
              </h2>
              <p className="text-xs text-slate-500">
                Legal Consultation, Litigation, Vetting, Retainer, and Advisory
              </p>
            </div>
            <button
              onClick={handleCreateService}
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-4 h-4 text-[#C9A227]" />
              <span>Add Service Item</span>
            </button>
          </div>

          {editingSvc && (
            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-md space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-[#0B1F3A] font-serif-title">
                  {editingSvc.title ? `Edit: ${editingSvc.title}` : 'New Service'}
                </h3>
                <button onClick={() => setEditingSvc(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingSvc.title}
                    onChange={(e) => setEditingSvc({ ...editingSvc, title: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Suitable For</label>
                  <input
                    type="text"
                    value={editingSvc.suitableFor}
                    onChange={(e) => setEditingSvc({ ...editingSvc, suitableFor: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Scope & Description</label>
                <textarea
                  rows={2}
                  value={editingSvc.description}
                  onChange={(e) => setEditingSvc({ ...editingSvc, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded border border-slate-300"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deliverables (Comma separated)</label>
                <input
                  type="text"
                  value={editingSvc.deliverables.join(', ')}
                  onChange={(e) => setEditingSvc({
                    ...editingSvc,
                    deliverables: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingSvc(null)}
                  className="px-3 py-1.5 rounded text-xs border border-slate-300 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (editingSvc.title) {
                      saveServiceItem(editingSvc);
                      setEditingSvc(null);
                    }
                  }}
                  className="bg-[#0B1F3A] text-white px-5 py-1.5 rounded text-xs font-semibold"
                >
                  Save Service
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((svc) => (
              <div key={svc.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#0B1F3A] font-serif-title mb-1">{svc.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{svc.description}</p>
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 mb-2">
                    <span className="font-semibold text-slate-700">Target: </span>{svc.suitableFor}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button onClick={() => setEditingSvc({ ...svc })} className="p-1 text-slate-500 hover:text-[#0B1F3A]">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteServiceItem(svc.id)} className="p-1 text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

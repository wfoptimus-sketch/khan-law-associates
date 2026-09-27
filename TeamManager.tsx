import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { AdvocateProfile, ContentStatus } from '../../types';
import { Plus, Edit, Trash2, Save, X, User, Scale, ArrowUp, ArrowDown, AlertTriangle, ShieldCheck } from 'lucide-react';

export const TeamManager: React.FC = () => {
  const { team, saveAdvocate, deleteAdvocate, reorderTeam } = useChamber();

  const [editingAdvocate, setEditingAdvocate] = useState<AdvocateProfile | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEdit = (adv: AdvocateProfile) => {
    setEditingAdvocate({ ...adv });
    setIsCreatingNew(false);
  };

  const handleCreateNew = () => {
    const newAdv: AdvocateProfile = {
      id: `adv-${Date.now()}`,
      slug: `advocate-${team.length + 1}`,
      fullName: 'Add Advocate Name',
      designation: 'Advocate / Legal Consultant',
      yearsOfExperience: 'Add verified experience',
      photoUrl: '',
      education: ['Add verified qualification'],
      barEnrollment: 'Add verified enrollment information',
      barAssociation: 'Add verified bar association',
      courtsAndTribunals: ['Add verified court information'],
      practiceAreas: ['Civil Litigation', 'Corporate & Commercial Law'],
      legalExpertise: ['Add verified legal expertise'],
      professionalMemberships: ['Add verified bar association membership'],
      languages: ['English', 'Bengali'],
      biography: 'Advocate profile credentials, verified qualifications, and enrollment details will be entered upon bar verification by the chamber administrator.',
      publications: [],
      certifications: [],
      professionalRecognition: [],
      sortOrder: team.length + 1,
      status: 'published'
    };
    setEditingAdvocate(newAdv);
    setIsCreatingNew(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdvocate || !editingAdvocate.fullName.trim()) return;

    const slug = editingAdvocate.slug.trim() || editingAdvocate.fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    saveAdvocate({
      ...editingAdvocate,
      slug
    });
    setEditingAdvocate(null);
    setIsCreatingNew(false);
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const newTeam = [...team];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newTeam.length) return;

    const temp = newTeam[index];
    newTeam[index] = newTeam[targetIndex];
    newTeam[targetIndex] = temp;

    newTeam.forEach((item, idx) => {
      item.sortOrder = idx + 1;
    });

    reorderTeam(newTeam);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Verification Warning Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Strict Verification Protocol:</span>
          Never invent advocate names, degrees, enrollment numbers, memberships, or court credentials. Use verified data or clearly marked placeholders until official bar documents are provided.
        </div>
      </div>

      {/* Header with New button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
            Legal Team & Advocate Profiles
          </h2>
          <p className="text-xs text-slate-500">
            Manage advocates, education, bar association, and Supreme Court enrollment
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-colors"
        >
          <Plus className="w-4 h-4 text-[#C9A227]" />
          <span>Add Advocate Profile</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {editingAdvocate && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-lg space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
              {isCreatingNew ? 'Add New Advocate Profile' : `Edit: ${editingAdvocate.fullName}`}
            </h3>
            <button
              onClick={() => setEditingAdvocate(null)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-5">
            
            {/* Core Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingAdvocate.fullName}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, fullName: e.target.value })}
                  placeholder="e.g. K. M. Khan"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={editingAdvocate.designation}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, designation: e.target.value })}
                  placeholder="e.g. Senior Advocate / Partner"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={editingAdvocate.yearsOfExperience}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, yearsOfExperience: e.target.value })}
                  placeholder="e.g. 14+ Years"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300"
                />
              </div>
            </div>

            {/* Photo URL & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={editingAdvocate.photoUrl}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, photoUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs px-3.5 py-2.5 rounded border border-slate-300 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile URL Slug
                </label>
                <input
                  type="text"
                  value={editingAdvocate.slug}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, slug: e.target.value })}
                  placeholder="barrister-k-m-khan"
                  className="w-full text-xs px-3.5 py-2.5 rounded border border-slate-300 font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Bar Enrollment & Association */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bar Council Enrollment Status
                </label>
                <input
                  type="text"
                  value={editingAdvocate.barEnrollment}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, barEnrollment: e.target.value })}
                  placeholder="Enrolled Advocate, Supreme Court of Bangladesh"
                  className="w-full text-xs px-3.5 py-2.5 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bar Association Affiliation
                </label>
                <input
                  type="text"
                  value={editingAdvocate.barAssociation}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, barAssociation: e.target.value })}
                  placeholder="Supreme Court Bar Association (SCBA)"
                  className="w-full text-xs px-3.5 py-2.5 rounded border border-slate-300"
                />
              </div>
            </div>

            {/* Academic Qualifications & Courts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Education & Degrees (Comma separated)
                </label>
                <textarea
                  rows={2}
                  value={editingAdvocate.education.join(', ')}
                  onChange={(e) => setEditingAdvocate({
                    ...editingAdvocate,
                    education: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="LL.B. (Honours), LL.M., Barrister-at-Law..."
                  className="w-full text-xs p-2.5 rounded border border-slate-300"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Courts & Tribunals (Comma separated)
                </label>
                <textarea
                  rows={2}
                  value={editingAdvocate.courtsAndTribunals.join(', ')}
                  onChange={(e) => setEditingAdvocate({
                    ...editingAdvocate,
                    courtsAndTribunals: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="High Court Division, District Courts, Artha Rin Adalat..."
                  className="w-full text-xs p-2.5 rounded border border-slate-300"
                ></textarea>
              </div>
            </div>

            {/* Practice Areas & Memberships */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Practice Areas (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingAdvocate.practiceAreas.join(', ')}
                  onChange={(e) => setEditingAdvocate({
                    ...editingAdvocate,
                    practiceAreas: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Civil Litigation, Banking, Corporate..."
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Professional Memberships (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingAdvocate.professionalMemberships.join(', ')}
                  onChange={(e) => setEditingAdvocate({
                    ...editingAdvocate,
                    professionalMemberships: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="SCBA, Lincoln's Inn, Dhaka Bar..."
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              </div>
            </div>

            {/* Biography */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Professional Biography
              </label>
              <textarea
                rows={3}
                value={editingAdvocate.biography}
                onChange={(e) => setEditingAdvocate({ ...editingAdvocate, biography: e.target.value })}
                placeholder="Comprehensive professional background..."
                className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300"
              ></textarea>
            </div>

            {/* Status & Sort order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Publication Status
                </label>
                <select
                  value={editingAdvocate.status}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, status: e.target.value as ContentStatus })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
                >
                  <option value="published">Published (Visible on site)</option>
                  <option value="draft">Draft (Chamber internal)</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingAdvocate.sortOrder}
                  onChange={(e) => setEditingAdvocate({ ...editingAdvocate, sortOrder: parseInt(e.target.value) || 1 })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditingAdvocate(null)}
                className="px-4 py-2 rounded border border-slate-300 text-xs text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow"
              >
                <Save className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Save Advocate Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Advocates List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5 w-12 text-center">Order</th>
                <th className="p-3.5">Advocate</th>
                <th className="p-3.5">Designation & Experience</th>
                <th className="p-3.5">Bar Enrollment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {team.map((adv, idx) => (
                <tr key={adv.id} className="hover:bg-slate-50/80">
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-mono font-bold text-slate-700">{adv.sortOrder}</span>
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
                          disabled={idx === team.length - 1}
                          className="text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-300">
                        {adv.photoUrl ? (
                          <img src={adv.photoUrl} alt={adv.fullName} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-full h-full p-2 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block font-serif-title">{adv.fullName}</span>
                        <span className="text-[11px] text-slate-500 font-mono">/team/{adv.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-700">
                    <span className="font-semibold block">{adv.designation}</span>
                    <span className="text-slate-500 text-[11px]">{adv.yearsOfExperience}</span>
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-xs truncate">
                    {adv.barEnrollment}
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      adv.status === 'published' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {adv.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(adv)}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-[#0B1F3A] cursor-pointer"
                        title="Edit Advocate"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove profile for "${adv.fullName}"?`)) {
                            deleteAdvocate(adv.id);
                          }
                        }}
                        className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Delete Advocate"
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

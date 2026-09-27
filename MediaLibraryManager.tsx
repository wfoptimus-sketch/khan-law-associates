import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { MediaItem } from '../../types';
import { Plus, Trash2, Copy, Check, Image as ImageIcon, Upload } from 'lucide-react';

export const MediaLibraryManager: React.FC = () => {
  const { media, addMediaItem, deleteMediaItem, showNotification } = useChamber();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Chamber Photography');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showNotification('Image URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    addMediaItem({
      title: newTitle.trim(),
      url: newUrl.trim(),
      category: newCategory,
      size: '1.0 MB'
    });

    setNewTitle('');
    setNewUrl('');
    setShowAddModal(false);
  };

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          addMediaItem({
            title: file.name.replace(/\.[^/.]+$/, ""),
            url: reader.result,
            category: 'Uploaded Photo',
            size: `${Math.round(file.size / 1024)} KB`
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
            Media & Asset Library
          </h2>
          <p className="text-xs text-slate-500">
            Upload and organize high-resolution law chamber photographs, advocate portraits, and logos
          </p>
        </div>

        <div className="flex gap-2">
          <label className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow">
            <Upload className="w-4 h-4 text-[#C9A227]" />
            <span>Upload Image File</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleSimulateFileUpload} />
          </label>

          <button
            onClick={() => setShowAddModal(true)}
            className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Add Image URL
          </button>
        </div>
      </div>

      {/* Add URL Modal */}
      {showAddModal && (
        <form onSubmit={handleAddAsset} className="bg-white p-5 rounded-xl border border-slate-300 shadow-md space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">Add External Media Asset</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Asset Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Supreme Court Bench"
                className="w-full text-xs px-3 py-2 rounded border border-slate-300"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Image URL</label>
              <input
                type="url"
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-mono text-[11px]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 rounded text-xs border border-slate-300 text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0B1F3A] text-white px-4 py-1.5 rounded text-xs font-semibold"
            >
              Add to Library
            </button>
          </div>
        </form>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {media.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group">
            <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 right-2 bg-[#071527]/80 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                {item.size || 'Image'}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 font-serif-title">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 block">{item.category} · {item.uploadedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  className="flex-1 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Remove image "${item.title}"?`)) deleteMediaItem(item.id);
                  }}
                  className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                  title="Delete from library"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

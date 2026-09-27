import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { FaqItem, ContentStatus } from '../../types';
import { Plus, Edit, Trash2, Save, X, HelpCircle, ArrowUp, ArrowDown } from 'lucide-react';

export const FaqManager: React.FC = () => {
  const { faqs, saveFaq, deleteFaq, reorderFaqs } = useChamber();

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleCreateNew = () => {
    setEditingFaq({
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      category: 'General',
      sortOrder: faqs.length + 1,
      status: 'published'
    });
    setIsCreatingNew(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.question.trim()) return;

    saveFaq(editingFaq);
    setEditingFaq(null);
    setIsCreatingNew(false);
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const newFaqs = [...faqs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFaqs.length) return;

    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[targetIndex];
    newFaqs[targetIndex] = temp;

    newFaqs.forEach((item, idx) => {
      item.sortOrder = idx + 1;
    });

    reorderFaqs(newFaqs);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
            FAQs Management
          </h2>
          <p className="text-xs text-slate-500">
            Add, update, reorder client frequently asked questions and answers
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Plus className="w-4 h-4 text-[#C9A227]" />
          <span>Add FAQ Item</span>
        </button>
      </div>

      {editingFaq && (
        <form onSubmit={handleSaveForm} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-md space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-[#0B1F3A] font-serif-title">
              {isCreatingNew ? 'Create New FAQ' : 'Edit FAQ Item'}
            </h3>
            <button onClick={() => setEditingFaq(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Question</label>
            <input
              type="text"
              required
              value={editingFaq.question}
              onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
              placeholder="e.g. Can I receive an online consultation?"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={editingFaq.category}
                onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                placeholder="Consultation / General / Ethics"
                className="w-full text-xs px-3 py-2 rounded border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={editingFaq.status}
                onChange={(e) => setEditingFaq({ ...editingFaq, status: e.target.value as ContentStatus })}
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Answer</label>
            <textarea
              rows={4}
              required
              value={editingFaq.answer}
              onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
              placeholder="Provide a clear, objective explanation..."
              className="w-full text-xs sm:text-sm p-3 rounded border border-slate-300"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingFaq(null)}
              className="px-4 py-2 rounded border border-slate-300 text-xs text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Save FAQ</span>
            </button>
          </div>
        </form>
      )}

      {/* FAQs List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5 w-12 text-center">Order</th>
                <th className="p-3.5">Question & Answer</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {faqs.map((faq, idx) => (
                <tr key={faq.id} className="hover:bg-slate-50/80">
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-mono font-bold text-slate-700">{faq.sortOrder}</span>
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleMoveOrder(idx, 'up')}
                          disabled={idx === 0}
                          className="text-slate-400 hover:text-slate-800 disabled:opacity-30"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMoveOrder(idx, 'down')}
                          disabled={idx === faqs.length - 1}
                          className="text-slate-400 hover:text-slate-800 disabled:opacity-30"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 max-w-md">
                    <div className="font-bold text-slate-900 font-serif-title">{faq.question}</div>
                    <div className="text-slate-500 line-clamp-1">{faq.answer}</div>
                  </td>
                  <td className="p-3.5 text-slate-600">{faq.category}</td>
                  <td className="p-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      faq.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {faq.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingFaq({ ...faq })}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this FAQ item?')) deleteFaq(faq.id);
                        }}
                        className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600"
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

import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { LegalArticle, ContentStatus } from '../../types';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, BookOpen, ExternalLink } from 'lucide-react';

export const BlogManager: React.FC = () => {
  const { articles, saveArticle, deleteArticle, team } = useChamber();

  const [editingArticle, setEditingArticle] = useState<LegalArticle | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const categories = [
    'Civil Law',
    'Criminal Law',
    'Banking Law',
    'Property Law',
    'Family Law',
    'Corporate Law',
    'Contract Law',
    'Legal Documentation',
    'Legal Updates',
    'Frequently Asked Questions'
  ];

  const handleCreateNew = () => {
    const newArt: LegalArticle = {
      id: `art-${Date.now()}`,
      slug: `legal-article-${articles.length + 1}`,
      title: '',
      category: 'Civil Law',
      author: team[0]?.fullName || 'Chamber Advocate',
      publicationDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      featuredImageUrl: '/src/assets/images/legal_chamber_hero_1790488228436.jpg',
      excerpt: '',
      content: '### Procedural Background\n\nExplain the statutory provision and factual background in Bangladesh...\n\n### Applicable Law\n\nRelevant statutes and High Court Division rulings...',
      tags: ['Bangladesh Law', 'Advocate Advice'],
      seoTitle: '',
      metaDescription: '',
      status: 'draft'
    };
    setEditingArticle(newArt);
    setIsCreatingNew(true);
  };

  const handleEdit = (art: LegalArticle) => {
    setEditingArticle({ ...art });
    setIsCreatingNew(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title.trim()) return;

    const slug = editingArticle.slug.trim() || editingArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const seoTitle = editingArticle.seoTitle || `${editingArticle.title} | Khan Law Associates`;
    const metaDescription = editingArticle.metaDescription || editingArticle.excerpt;

    saveArticle({
      ...editingArticle,
      slug,
      seoTitle,
      metaDescription
    });

    setEditingArticle(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
            Legal Insights & Publications CMS
          </h2>
          <p className="text-xs text-slate-500">
            Publish legal commentary, statutory guides, and chamber research articles
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Plus className="w-4 h-4 text-[#C9A227]" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {editingArticle && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-lg space-y-5">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
              {isCreatingNew ? 'Compose Legal Article' : `Editing: ${editingArticle.title}`}
            </h3>
            <button onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Article Title <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={editingArticle.title}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                placeholder="e.g. Understanding Bail Applications in High Court Division"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 font-serif-title font-bold text-[#0B1F3A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={editingArticle.category}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
                <input
                  type="text"
                  value={editingArticle.author}
                  onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Publication Status</label>
                <select
                  value={editingArticle.status}
                  onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as ContentStatus })}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft (Private)</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingArticle.slug}
                  onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                  placeholder="understanding-bail-applications"
                  className="w-full text-xs px-3.5 py-2 rounded border border-slate-300 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={editingArticle.featuredImageUrl}
                  onChange={(e) => setEditingArticle({ ...editingArticle, featuredImageUrl: e.target.value })}
                  className="w-full text-xs px-3.5 py-2 rounded border border-slate-300 font-mono text-[11px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Excerpt Summary</label>
              <textarea
                rows={2}
                value={editingArticle.excerpt}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                placeholder="Concise 1-2 sentence overview for listing preview..."
                className="w-full text-xs p-2.5 rounded border border-slate-300"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Article Content (Markdown / Formatted Text)
              </label>
              <textarea
                rows={8}
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                className="w-full text-xs font-mono p-3 rounded border border-slate-300 leading-relaxed"
              ></textarea>
            </div>

            {/* Tags & SEO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingArticle.tags.join(', ')}
                  onChange={(e) => setEditingArticle({
                    ...editingArticle,
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  })}
                  placeholder="Civil Law, High Court, Procedure"
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Read Time (Estimate)
                </label>
                <input
                  type="text"
                  value={editingArticle.readTime}
                  onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                  placeholder="6 min read"
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="px-4 py-2 rounded border border-slate-300 text-xs text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-6 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow"
              >
                <Save className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Save Article</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Article Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Author</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/80">
                  <td className="p-3.5 max-w-sm">
                    <div className="font-bold text-slate-900 font-serif-title line-clamp-1">{art.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">/legal-insights/{art.slug}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-700">{art.category}</span>
                  </td>
                  <td className="p-3.5 text-slate-600">{art.author}</td>
                  <td className="p-3.5 text-slate-500">{art.publicationDate}</td>
                  <td className="p-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      art.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {art.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(art)}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-[#0B1F3A]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete article "${art.title}"?`)) {
                            deleteArticle(art.id);
                          }
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

import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { LegalArticle } from '../../types';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';

interface BlogSectionProps {
  onSelectArticle: (article: LegalArticle) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  const { articles } = useChamber();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const publishedArticles = articles
    .filter(a => a.status === 'published');

  const categories = ['All', ...Array.from(new Set(publishedArticles.map(a => a.category)))];

  const filteredArticles = selectedCategory === 'All'
    ? publishedArticles
    : publishedArticles.filter(a => a.category === selectedCategory);

  return (
    <section id="legal-insights" className="py-20 md:py-28 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">
              Chamber Publications
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              Legal Insights & Commentary
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Analytical articles on statutory interpretations, procedural court compliance, and practical legal rights in Bangladesh.
            </p>
          </div>

          {/* Interactive filter tabs (Zero-pill discipline: quiet segmented control with active/inactive states) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-[#0B1F3A] shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-slate-200 hover:border-[#173B6C] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Featured image */}
                <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                  <img
                    src={article.featuredImageUrl || '/src/assets/images/legal_chamber_hero_1790488228436.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-3">
                  {/* Clean unboxed metadata with subtle typographic separators - Zero-Pill compliant */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-[#0B1F3A]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publicationDate}</span>
                  </div>

                  <h3 className="font-serif-title text-xl font-bold text-[#0B1F3A] group-hover:text-[#173B6C] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-light">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Read Action */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">
                  By {article.author}
                </span>

                <button
                  onClick={() => onSelectArticle(article)}
                  className="font-semibold text-[#0B1F3A] group-hover:text-[#C9A227] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

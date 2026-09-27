import React from 'react';
import { LegalArticle } from '../../types';
import { X, Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';

interface ArticleReaderModalProps {
  article: LegalArticle | null;
  onClose: () => void;
  onRequestConsultation: (topic: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onRequestConsultation
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="bg-[#0B1F3A] text-white p-5 flex justify-between items-center border-b border-[#173B6C]">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <BookOpen className="w-4 h-4 text-[#C9A227]" />
            <span>Legal Insights · {article.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Metadata banner */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#0B1F3A]">{article.author}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publicationDate}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0B1F3A] leading-snug">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-light italic border-l-2 border-[#C9A227] pl-3">
              {article.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          {article.featuredImageUrl && (
            <div className="rounded-lg overflow-hidden border border-slate-200 max-h-80">
              <img
                src={article.featuredImageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body Content */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-light whitespace-pre-line">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Related Topics:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Chamber Educational Notice */}
          <div className="p-4 rounded bg-slate-50 border border-slate-200 text-xs text-slate-500">
            <strong>Disclaimer: </strong>
            This publication provides general information regarding Bangladesh legal practice and does not constitute a formal legal opinion. For advice on specific circumstances, please consult an advocate.
          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 p-4 sm:px-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Return to Articles
          </button>
          
          <button
            onClick={() => {
              onClose();
              onRequestConsultation(`Inquiry regarding article: ${article.title}`);
            }}
            className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white text-xs font-semibold px-5 py-2.5 rounded shadow transition-colors cursor-pointer"
          >
            Consult Chamber on this Legal Issue
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Article } from '../types';
import { Icons } from '../constants';

interface Props {
  articles: Article[];
}

export const Spotlight: React.FC<Props> = ({ articles }) => {
  if (articles.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icons.Sparkles />
        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Manitoba Today: Spotlight</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 rounded-xl shadow-lg text-white group">
             {article.imageUrl && (
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
             )}
             
             <div className="relative p-6 h-full flex flex-col justify-end min-h-[200px]">
                <div className="mb-auto">
                    {article.isSuccessStory && (
                        <span className="inline-block bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                            Success Story
                        </span>
                    )}
                </div>
                
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-200 text-xs font-medium">
                        <span>{article.sourceName}</span>
                        <span>•</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <a href={article.url} className="block">
                        <h3 className="text-2xl font-serif font-bold leading-tight hover:underline decoration-amber-400 underline-offset-4">
                            {article.headline}
                        </h3>
                    </a>
                    <p className="text-blue-100 text-sm line-clamp-2">
                        {article.summary}
                    </p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
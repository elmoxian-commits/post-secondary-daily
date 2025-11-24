import React, { useState } from 'react';
import { Article, SourceType, Region } from '../types';
import { Icons } from '../constants';
import { generateArticleSummary } from '../services/geminiService';

interface Props {
  article: Article;
}

const SourceBadge = ({ type }: { type: SourceType }) => {
  let colorClass = "bg-gray-100 text-gray-600";
  switch (type) {
    case SourceType.INSTITUTION:
      colorClass = "bg-blue-100 text-blue-800";
      break;
    case SourceType.FACULTY_ASSOC:
      colorClass = "bg-red-100 text-red-800";
      break;
    case SourceType.SECTOR_BLOG:
      colorClass = "bg-purple-100 text-purple-800";
      break;
    case SourceType.MAINSTREAM_MEDIA:
      colorClass = "bg-emerald-100 text-emerald-800";
      break;
  }
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
      {type}
    </span>
  );
};

export const ArticleCard: React.FC<Props> = ({ article }) => {
  const [summary, setSummary] = useState(article.summary);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Example of using Gemini to enhance content on client-side
  const handleEnhanceSummary = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!process.env.API_KEY) {
      alert("API Key not configured in demo environment.");
      return;
    }
    setLoadingSummary(true);
    const newSummary = await generateArticleSummary(article.headline, article.summary + " " + article.sourceName);
    setSummary(newSummary);
    setLoadingSummary(false);
  };

  const dateStr = new Date(article.publishedAt).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="group relative bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {article.sourceName}
                </span>
                <SourceBadge type={article.sourceType} />
                {article.region === Region.MANITOBA && (
                    <span className="text-xs font-bold text-amber-600 border border-amber-200 px-1.5 rounded">MB</span>
                )}
            </div>
            <span className="text-xs text-slate-400 whitespace-nowrap">{dateStr}</span>
        </div>

        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block group-hover:text-blue-700 transition-colors">
            <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight">
            {article.headline}
            </h3>
        </a>

        <p className="text-slate-600 text-sm leading-relaxed mt-1">
          {summary}
        </p>

        {/* AI Interaction Button */}
        {loadingSummary ? (
            <span className="text-xs text-blue-500 animate-pulse">Generating AI Summary...</span>
        ) : (
             // Hidden by default, shown on hover to reduce clutter
            <button 
                onClick={handleEnhanceSummary}
                className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4 text-xs text-blue-600 hover:underline bg-white px-2 py-1 rounded shadow-sm border"
            >
                Start AI Summary
            </button>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {article.tags.map((tag) => (
            <span key={tag.id} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
              #{tag.label}
            </span>
          ))}
          <a 
            href={article.url} 
            target="_blank" 
            rel="noreferrer"
            className="ml-auto flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-blue-600"
          >
            Source <Icons.ExternalLink />
          </a>
        </div>
      </div>
    </div>
  );
};
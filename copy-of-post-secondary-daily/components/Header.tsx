import React from 'react';
import { APP_NAME, SUBTITLE, Icons } from '../constants';

export const Header: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-800 mb-1">
                <Icons.Newspaper />
                <span className="text-xs font-bold uppercase tracking-widest">Daily Briefing</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight">
              {APP_NAME}
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">{SUBTITLE}</p>
          </div>
          
          <div className="text-right">
             <div className="text-slate-800 font-serif font-bold text-lg">{currentDate}</div>
             <div className="text-xs text-slate-400 flex items-center justify-end gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Updated: 6:00 AM CST
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
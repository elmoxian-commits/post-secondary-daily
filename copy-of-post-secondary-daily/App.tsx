import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ArticleCard } from './components/ArticleCard';
import { Spotlight } from './components/Spotlight';
import { getArticles } from './services/mockData';
import { Article, Region, SourceType, FilterState } from './types';
import { Icons, APP_NAME } from './constants';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    region: 'All',
    onlyManitoba: false,
    onlyFacultyAssoc: false,
    onlyCommentary: false,
  });

  // Load Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getArticles();
      setArticles(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Text Search
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        article.headline.toLowerCase().includes(searchLower) ||
        article.summary.toLowerCase().includes(searchLower) ||
        article.sourceName.toLowerCase().includes(searchLower) ||
        article.tags.some(t => t.label.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;

      // Quick Filters
      if (filters.onlyManitoba && article.region !== Region.MANITOBA) return false;
      if (filters.onlyFacultyAssoc && article.sourceType !== SourceType.FACULTY_ASSOC) return false;
      if (filters.onlyCommentary && article.sourceType !== SourceType.SECTOR_BLOG) return false;

      // Region Filter (for sections, though we display all by default)
      if (filters.region !== 'All' && article.region !== filters.region) return false;

      return true;
    });
  }, [articles, filters]);

  // Grouping for Display
  const manitobaArticles = filteredArticles.filter(a => a.region === Region.MANITOBA);
  const canadaArticles = filteredArticles.filter(a => a.region === Region.CANADA);
  const intlArticles = filteredArticles.filter(a => a.region === Region.INTERNATIONAL);

  // Spotlight Logic (Top 2 MB stories, ideally success stories or faculty news)
  const spotlightArticles = manitobaArticles
    .filter(a => a.isSuccessStory || a.sourceType === SourceType.INSTITUTION)
    .slice(0, 2);
    
  // Exclude spotlight items from main MB list to avoid duplication in view
  const mainManitobaList = manitobaArticles.filter(a => !spotlightArticles.find(s => s.id === a.id));

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Header />

      {/* Filter / Search Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[105px] md:top-[105px] z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search keywords, institutions, topics..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              />
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
               <button 
                onClick={() => handleFilterChange('onlyManitoba', !filters.onlyManitoba)}
                className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${filters.onlyManitoba ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
               >
                 MB Only
               </button>
               <button 
                onClick={() => handleFilterChange('onlyFacultyAssoc', !filters.onlyFacultyAssoc)}
                className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${filters.onlyFacultyAssoc ? 'bg-red-100 border-red-300 text-red-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
               >
                 Labour & Faculty
               </button>
               <button 
                onClick={() => handleFilterChange('onlyCommentary', !filters.onlyCommentary)}
                className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${filters.onlyCommentary ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
               >
                 Commentary
               </button>
               {/* Reset */}
               {(filters.onlyManitoba || filters.onlyFacultyAssoc || filters.onlyCommentary || filters.searchQuery) && (
                 <button 
                    onClick={() => setFilters({ searchQuery: '', region: 'All', onlyManitoba: false, onlyFacultyAssoc: false, onlyCommentary: false })}
                    className="flex-shrink-0 text-xs text-slate-400 hover:text-slate-600 ml-2 underline"
                 >
                    Clear
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          </div>
        ) : (
          <>
            {/* Section 1: Manitoba Spotlight & List */}
            {(!filters.onlyCommentary) && (
              <section className="mb-12">
                <Spotlight articles={spotlightArticles} />

                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-serif font-bold text-slate-900">Manitoba</h2>
                    <div className="h-px bg-slate-200 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {mainManitobaList.length > 0 ? (
                        mainManitobaList.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))
                    ) : (
                        <p className="text-slate-400 italic col-span-2">No other Manitoba stories matching your filters.</p>
                    )}
                </div>
              </section>
            )}

            {/* Section 2: Canada */}
            {(!filters.onlyManitoba) && (
              <section className="mb-12 bg-slate-100 -mx-4 sm:-mx-6 px-4 sm:px-6 py-8 md:rounded-xl">
                 <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-serif font-bold text-slate-900">Canada</h2>
                    <div className="h-px bg-slate-300 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {canadaArticles.length > 0 ? (
                        canadaArticles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))
                    ) : (
                        <p className="text-slate-400 italic col-span-3">No Canadian stories matching your filters.</p>
                    )}
                </div>
              </section>
            )}

            {/* Section 3: International */}
            {(!filters.onlyManitoba && !filters.onlyFacultyAssoc && !filters.onlyCommentary) && (
              <section className="mb-12">
                 <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-serif font-bold text-slate-900">International</h2>
                    <div className="h-px bg-slate-200 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {intlArticles.length > 0 ? (
                        intlArticles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))
                    ) : (
                        <p className="text-slate-400 italic col-span-2">No International stories matching your filters.</p>
                    )}
                </div>
              </section>
            )}
            
            {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">No articles found matching your criteria.</p>
                    <button 
                        onClick={() => setFilters({ searchQuery: '', region: 'All', onlyManitoba: false, onlyFacultyAssoc: false, onlyCommentary: false })}
                        className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
          </>
        )}
      </main>
        
        {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="grid md:grid-cols-3 gap-8">
                  <div>
                      <h4 className="text-white font-serif font-bold text-lg mb-4">{APP_NAME}</h4>
                      <p className="text-sm leading-relaxed">
                          Automated curation of news impacting Manitoba's post-secondary sector. Updated daily at 6:00 AM CST.
                      </p>
                  </div>
                  <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Sources Monitored</h4>
                      <ul className="text-sm space-y-2">
                          <li>Manitoba Public Institutions</li>
                          <li>Faculty Associations (UMFA, UWFA, BUFA)</li>
                          <li>Sector Commentary (HESA)</li>
                          <li>Mainstream Media (CBC, CTV, Globe)</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">About</h4>
                      <p className="text-sm mb-4">
                          This is a demo application. In production, this runs via a scheduled cloud function scraping configured RSS feeds and HTML pages.
                      </p>
                  </div>
              </div>
              <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
                  &copy; {new Date().getFullYear()} Post-Secondary Daily. All rights reserved.
              </div>
          </div>
      </footer>
    </div>
  );
};

export default App;
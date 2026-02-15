
import React, { useState } from 'react';
import { SavedIssue, Madhab, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  bookmarks: SavedIssue[];
  onRemoveBookmark: (id: string) => void;
  onViewBookmark: (bookmark: SavedIssue) => void;
  onLogoClick?: () => void;
  lang: Language;
}

const getMadhabColor = (madhab: Madhab) => {
  switch (madhab) {
    case Madhab.HANAFI: return 'bg-sky-400';
    case Madhab.MALIKI: return 'bg-amber-600';
    case Madhab.SHAFI: return 'bg-emerald-500';
    case Madhab.HANBALI: return 'bg-orange-800';
    default: return 'bg-stone-300';
  }
};

export const Layout: React.FC<LayoutProps> = ({ children, bookmarks, onRemoveBookmark, onViewBookmark, onLogoClick, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const t = TRANSLATIONS[lang];
  const isAr = lang === Language.AR;

  const filteredBookmarks = bookmarks.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.madhab.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col md:flex-row bg-[#faf9f6] overflow-hidden h-screen`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex w-80 bg-[#f4f1ea] text-stone-800 flex-col ${isAr ? 'border-l' : 'border-r'} border-stone-200 z-20`}>
        <div className="p-6 pb-4">
          <button 
            onClick={onLogoClick}
            className={`flex items-center gap-3 mb-6 group ${isAr ? 'text-right' : 'text-left'} w-full transition-transform active:scale-95`}
          >
            <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center text-white border border-amber-800 shadow-sm rotate-3 group-hover:rotate-0 transition-transform">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 -rotate-3 group-hover:rotate-0 transition-transform">
                <path d="M12 3v17" />
                <path d="M3 10c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2" />
                <path d="M7 10v4a5 5 0 0 0 10 0v-4" />
                <path d="M4.5 10c.8 0 1.5.7 1.5 1.5V13a6 6 0 0 0 12 0v-1.5c0-.8.7-1.5 1.5-1.5" />
                <path d="M8 21h8" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold font-amiri leading-none text-amber-900 group-hover:text-amber-700 transition-colors">{t.title}</h1>
              <p className="text-amber-700 text-[9px] mt-1 font-bold uppercase tracking-tighter">{t.subtitle}</p>
            </div>
          </button>

          <div className="relative mb-6">
            <input 
              type="text"
              placeholder={t.searchSaved}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-white border border-stone-200 rounded-xl py-2.5 ${isAr ? 'px-5 pr-10' : 'px-5 pl-10'} text-xs text-stone-700 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-amber-50 focus:border-amber-400 transition-all shadow-sm`}
            />
            <svg className={`w-4 h-4 absolute ${isAr ? 'left-3.5' : 'right-3.5'} top-3 text-stone-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <nav className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between px-6 mb-3">
            <div className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">{t.savedIssues}</div>
            <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold border border-amber-200">{bookmarks.length}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-6 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent">
            {filteredBookmarks.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-12 h-12 bg-stone-100/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <p className="text-xs text-stone-400 italic font-medium">
                  {searchTerm ? 'No results matching' : t.noSaved}
                </p>
              </div>
            ) : (
              filteredBookmarks.map((bookmark) => (
                <div 
                  key={bookmark.id} 
                  className="group relative bg-white hover:bg-amber-50/50 border border-stone-100 rounded-2xl p-4 transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-amber-100" 
                  onClick={() => onViewBookmark(bookmark)}
                >
                  {/* Madhab indicator stripe */}
                  <div className={`absolute ${isAr ? 'right-0' : 'left-0'} top-4 bottom-4 w-1 rounded-l-full ${getMadhabColor(bookmark.madhab)}`}></div>
                  
                  <div className={`flex justify-between items-start gap-3 ${isAr ? '' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 min-w-0 ${isAr ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-sm font-bold text-stone-800 line-clamp-2 leading-relaxed mb-2 pr-2 font-amiri">
                        {bookmark.title}
                      </h3>
                      <div className={`flex items-center gap-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200`}>
                          {t.madhabLabel} {bookmark.madhab}
                        </span>
                        <span className="text-[9px] text-stone-400 font-bold">
                          {new Date(bookmark.timestamp).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onRemoveBookmark(bookmark.id); }}
                      className="text-stone-300 hover:text-red-400 transition-colors p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className={`p-6 bg-amber-900/5 border-t border-amber-900/10 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className="text-amber-900/50 text-[10px] font-bold uppercase tracking-widest mb-3">{t.aboutPlatform}</div>
            <p className="text-xs text-stone-500 leading-relaxed text-justify font-medium">
              {t.aboutPlatformDesc}
            </p>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#faf9f6]">
        {children}
      </main>
    </div>
  );
};

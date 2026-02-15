
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LandingPageProps {
  onStart: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, lang, onToggleLang }) => {
  const t = TRANSLATIONS[lang];
  const isAr = lang === Language.AR;

  return (
    <div className={`min-h-screen bg-[#faf9f6] text-stone-800 selection:bg-amber-100 overflow-x-hidden`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/islamic-art.png")' }}></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-900/20 rotate-3 transition-transform hover:rotate-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 -rotate-3 transition-transform">
              <path d="M12 3v17" />
              <path d="M3 10c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2" />
              <path d="M7 10v4a5 5 0 0 0 10 0v-4" />
              <path d="M4.5 10c.8 0 1.5.7 1.5 1.5V13a6 6 0 0 0 12 0v-1.5c0-.8.7-1.5 1.5-1.5" />
              <path d="M8 21h8" />
            </svg>
          </div>
          <span className="text-xl font-bold font-amiri text-amber-900">{t.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleLang}
            className="px-4 py-1.5 bg-stone-100 text-stone-600 text-xs font-bold rounded-xl hover:bg-stone-200 transition-all border border-stone-200"
          >
            {isAr ? 'English' : 'العربية'}
          </button>
          <button 
            onClick={onStart}
            className="px-6 py-2 bg-white border border-amber-200 text-amber-900 text-sm font-bold rounded-xl hover:bg-amber-50 transition-all shadow-sm active:scale-95"
          >
            {t.entryBtn}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-12 pb-20 md:pt-20 md:pb-28 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100 mb-8 uppercase tracking-widest animate-fade-in">
          {t.tagline}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-amiri text-amber-950 mb-10 leading-[1.2] md:leading-[1.3]">
          {t.heroTitle} <br />
          <span className="text-xl md:text-3xl text-amber-700 font-bold block mt-4">{t.heroSpan}</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-600 max-w-2xl mb-12 leading-relaxed">
          {t.heroDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-amber-800 text-amber-50 rounded-2xl font-bold text-lg hover:bg-amber-900 transition-all shadow-xl shadow-amber-900/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <span>{t.startBtn}</span>
            <svg className={`w-5 h-5 ${isAr ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 bg-white border-y border-stone-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 rounded-3xl bg-[#faf9f6] border border-stone-100 hover:border-amber-200 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">📚</div>
            <h3 className="text-xl font-bold font-amiri text-amber-950 mb-4">{t.feature1Title}</h3>
            <p className="text-stone-500 leading-relaxed text-sm md:text-base">
              {t.feature1Desc}
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#faf9f6] border border-stone-100 hover:border-amber-200 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🕌</div>
            <h3 className="text-xl font-bold font-amiri text-amber-950 mb-4">{t.feature2Title}</h3>
            <p className="text-stone-500 leading-relaxed text-sm md:text-base">
              {t.feature2Desc}
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#faf9f6] border border-stone-100 hover:border-amber-200 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">✨</div>
            <h3 className="text-xl font-bold font-amiri text-amber-950 mb-4">{t.feature3Title}</h3>
            <p className="text-stone-500 leading-relaxed text-sm md:text-base">
              {t.feature3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="p-10 md:p-12 rounded-[3rem] bg-amber-900 text-amber-50 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-800 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
          <h2 className="text-3xl md:text-4xl font-bold font-amiri mb-6 relative z-10">{t.disclaimerTitle}</h2>
          <p className="text-lg md:text-xl leading-relaxed text-amber-100/90 relative z-10 mb-8">
            {t.disclaimerDesc}
          </p>
          <button 
            onClick={onStart}
            className="px-10 py-3 bg-amber-100 text-amber-900 rounded-xl font-bold text-base hover:bg-white transition-all relative z-10 shadow-lg"
          >
            {t.agreeBtn}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 md:px-12 border-t border-stone-200 bg-white/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Right Section: Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-900 font-bold font-amiri text-xl">{t.title}</span>
              <span className="text-stone-300 text-lg">|</span>
              <span className="text-stone-500 text-xs font-medium">2026 - {t.footerRights}</span>
            </div>
          </div>

          {/* Left Section: Contact Info */}
          <div className="flex flex-col items-center md:items-end text-center md:text-left group">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mb-1">{t.contactUs}</span>
            <a 
              href="mailto:sultan@6gforai.com" 
              className="text-base text-stone-700 font-bold hover:text-amber-700 transition-colors border-b border-transparent hover:border-amber-200 py-0.5"
            >
              sultan@6gforai.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

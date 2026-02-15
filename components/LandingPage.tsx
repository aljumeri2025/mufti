
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 selection:bg-amber-100 overflow-x-hidden">
      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/islamic-art.png")' }}></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-900/20 rotate-3 transition-transform hover:rotate-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 -rotate-3 transition-transform">
              <path d="M12 3v17" />
              <path d="M3 10c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2" />
              <path d="M7 10v4a5 5 0 0 0 10 0v-4" />
              <path d="M4.5 10c.8 0 1.5.7 1.5 1.5V13a6 6 0 0 0 12 0v-1.5c0-.8.7-1.5 1.5-1.5" />
              <path d="M8 21h8" />
            </svg>
          </div>
          <span className="text-2xl font-bold font-amiri text-amber-900">معين المفتي</span>
        </div>
        <button 
          onClick={onStart}
          className="px-8 py-3 bg-white border border-amber-200 text-amber-900 text-base font-bold rounded-2xl hover:bg-amber-50 transition-all shadow-sm active:scale-95"
        >
          دخول المنصة
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 pb-24 md:pt-28 md:pb-36 flex flex-col items-center text-center max-w-6xl mx-auto">
        <div className="inline-block px-6 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-bold border border-amber-100 mb-10 uppercase tracking-widest animate-fade-in">
          دليلك الموثوق في التراث الفقهي
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-amiri text-amber-950 mb-14 leading-[1.3] md:leading-[1.4]">
          زادك من الفقه وفق أصوله المعتمدة <br />
          <span className="text-2xl md:text-4xl text-amber-700 font-bold block mt-6 md:mt-8">على نهج الأئمة في عصر الذكاء الاصطناعي</span>
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mb-16 leading-relaxed">
          نحن لا نفتي، بل نيسر لك الوصول إلى ما قرره الأئمة الأعلام في أمهات الكتب الفقهية وفق المذاهب الأربعة المعتمدة.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button 
            onClick={onStart}
            className="px-12 py-6 bg-amber-800 text-amber-50 rounded-[2rem] font-bold text-xl hover:bg-amber-900 transition-all shadow-2xl shadow-amber-900/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-4"
          >
            <span>اسأل وتعلم الآن</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="about" className="relative z-10 bg-white border-y border-stone-100 py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="p-10 rounded-[2.5rem] bg-[#faf9f6] border border-stone-100 hover:border-amber-200 transition-all hover:shadow-xl group">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">📚</div>
            <h3 className="text-2xl font-bold font-amiri text-amber-950 mb-5">أمهات الكتب</h3>
            <p className="text-stone-500 leading-loose text-base md:text-lg">
              نعتمد بشكل مباشر على المراجع الأصلية مثل حاشية ابن عابدين، والمدونة الكبرى، والمجموع للنووي، والمغني لابن قدامة.
            </p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-[#faf9f6] border border-stone-100 hover:border-amber-200 transition-all hover:shadow-xl group">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🕌</div>
            <h3 className="text-2xl font-bold font-amiri text-amber-950 mb-5">المذاهب الأربعة</h3>
            <p className="text-stone-500 leading-loose text-base md:text-lg">
              تغطية شاملة لآراء الحنفية والمالكية والشافعية والحنابلة مع توضيح القول المعتمد داخل كل مذهب.
            </p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-[#faf9f6] border border-stone-100 hover:border-amber-200 transition-all hover:shadow-xl group">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">✨</div>
            <h3 className="text-2xl font-bold font-amiri text-amber-950 mb-5">عرض تعليمي</h3>
            <p className="text-stone-500 leading-loose text-base md:text-lg">
              يتم صياغة الأحكام بأسلوب تعليمي رصين يجمع بين جلالة التراث وسهولة العرض المعاصر لطلاب العلم والمستفتين.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="relative z-10 py-32 px-6 max-w-5xl mx-auto text-center">
        <div className="p-12 md:p-16 rounded-[4rem] bg-amber-900 text-amber-50 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-800 rounded-full -mr-40 -mt-40 blur-3xl opacity-50"></div>
          <h2 className="text-4xl md:text-5xl font-bold font-amiri mb-8 relative z-10">تنبيه هام</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-amber-100/90 relative z-10 mb-12">
            المنصة وسيلة مساعدة لتقريب العلم الشرعي ونقل أقوال الفقهاء وليست جهة إفتاء رسمية. المسائل الخاصة والنوازل المعاصرة تتطلب عرضها على المفتين المختصين مباشرة.
          </p>
          <button 
            onClick={onStart}
            className="px-12 py-4 bg-amber-100 text-amber-900 rounded-[1.5rem] font-bold text-lg hover:bg-white transition-all relative z-10 shadow-lg"
          >
            موافق، ادخل للمنصة
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 md:px-12 border-t border-stone-200 bg-white/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Right Section: Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-4">
              <span className="text-amber-900 font-bold font-amiri text-2xl">معين المفتي</span>
              <span className="text-stone-300 text-xl">|</span>
              <span className="text-stone-500 text-sm font-medium">2026 - جميع الحقوق محفوظة لطلاب العلم</span>
            </div>
          </div>

          {/* Left Section: Contact Info */}
          <div className="flex flex-col items-center md:items-end text-center md:text-left group">
            <span className="text-xs text-stone-400 font-bold uppercase tracking-[0.2em] mb-2">للتواصل والاقتراحات</span>
            <a 
              href="mailto:sultan@6gforai.com" 
              className="text-lg text-stone-700 font-bold hover:text-amber-700 transition-colors border-b-2 border-transparent hover:border-amber-200 py-1"
            >
              sultan@6gforai.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

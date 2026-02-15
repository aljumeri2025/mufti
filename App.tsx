
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { MessageBubble } from './components/MessageBubble';
import { LandingPage } from './components/LandingPage';
import { Message, Madhab, SavedIssue } from './types';
import { GeminiService } from './services/gemini';

const App: React.FC = () => {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/3fcd50bc-238a-46d3-a424-7b7726ce0fc0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:mount',message:'App component mounted',data:{},timestamp:Date.now(),hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  const [showLanding, setShowLanding] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'أهلاً بك في منصة "معين المفتي". أنا مساعدك الفقهي التعليمي، أنقل لك أقوال العلماء المعتمدين من أمهات الكتب الشرعية. كيف يمكنني مساعدتك اليوم؟ يمكنك اختيار مذهب فقهي معين أو طرح سؤالك مباشرة.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedMadhab, setSelectedMadhab] = useState<Madhab>(Madhab.NONE);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<SavedIssue[]>([]);
  const [activeViewBookmark, setActiveViewBookmark] = useState<SavedIssue | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiService = useRef(new GeminiService());

  useEffect(() => {
    const saved = localStorage.getItem('muin_bookmarks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBookmarks(parsed.map((b: any) => ({ ...b, timestamp: new Date(b.timestamp) })));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('muin_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!showLanding) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom, showLanding]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      madhab: selectedMadhab
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.slice(-6).map(m => ({
      role: m.role,
      content: m.content
    }));

    const response = await geminiService.current.sendMessage(input, history, selectedMadhab);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      madhab: selectedMadhab
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const toggleBookmark = (message: Message) => {
    const isAlreadyBookmarked = bookmarks.some(b => b.id === message.id);
    
    if (isAlreadyBookmarked) {
      setBookmarks(prev => prev.filter(b => b.id !== message.id));
    } else {
      const msgIndex = messages.findIndex(m => m.id === message.id);
      let derivedTitle = '';
      
      if (msgIndex > 0) {
        for (let i = msgIndex - 1; i >= 0; i--) {
          if (messages[i].role === 'user') {
            derivedTitle = messages[i].content;
            break;
          }
        }
      }

      if (!derivedTitle) {
        derivedTitle = message.content.split('\n')[0].replace(/^(ملخص الحكم: )/, '');
      }

      const newBookmark: SavedIssue = {
        id: message.id,
        title: derivedTitle.substring(0, 120),
        content: message.content,
        madhab: message.madhab || Madhab.NONE,
        timestamp: new Date()
      };
      setBookmarks(prev => [newBookmark, ...prev]);
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const viewBookmark = (bookmark: SavedIssue) => {
    setActiveViewBookmark(bookmark);
  };

  const handleShareWhatsApp = (content: string) => {
    const header = "*مسألة فقهية من منصة معين المفتي:*\n\n";
    const text = header + content;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = (content: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html dir="rtl" lang="ar">
        <head>
          <title>معين المفتي - نسخة للطباعة</title>
          <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Amiri', serif; padding: 40px; color: #333; line-height: 1.8; }
            .header { border-bottom: 2px solid #b8860b; margin-bottom: 30px; padding-bottom: 10px; text-align: center; }
            .content { white-space: pre-wrap; font-size: 20px; }
            .footer { margin-top: 50px; font-size: 14px; text-align: center; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>معين المفتي</h1>
            <p>المساعد الفقهي التعليمي</p>
          </div>
          <div class="content">${content}</div>
          <div class="footer">تم استخراج هذه المادة من منصة معين المفتي.</div>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (showLanding) {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/3fcd50bc-238a-46d3-a424-7b7726ce0fc0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:branch',message:'rendering LandingPage',data:{showLanding:true},timestamp:Date.now(),hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <Layout 
      bookmarks={bookmarks} 
      onRemoveBookmark={removeBookmark} 
      onViewBookmark={viewBookmark}
      onLogoClick={() => setShowLanding(true)}
    >
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowLanding(true)}
            className="md:hidden w-12 h-12 bg-amber-700 rounded-xl flex items-center justify-center border border-amber-800 shadow-sm active:scale-95 transition-transform text-white"
          >
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M12 3v17" />
                <path d="M3 10c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2" />
                <path d="M7 10v4a5 5 0 0 0 10 0v-4" />
                <path d="M4.5 10c.8 0 1.5.7 1.5 1.5V13a6 6 0 0 0 12 0v-1.5c0-.8.7-1.5 1.5-1.5" />
                <path d="M8 21h8" />
              </svg>
          </button>
          <button 
            onClick={() => setShowLanding(true)}
            className="text-right flex flex-col items-start hover:opacity-70 transition-opacity active:scale-[0.98]"
          >
            <h2 className="text-xl md:text-2xl font-bold text-stone-800 font-amiri leading-tight">معين المفتي الفقهي</h2>
            <div className="flex items-center gap-2">
              <span className="block w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">متصل بالخدمة</span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
             <span className="text-xs text-stone-400 font-bold uppercase tracking-tighter mb-1">أسأل حسب المذهب</span>
             <select 
              value={selectedMadhab}
              onChange={(e) => setSelectedMadhab(e.target.value as Madhab)}
              className="text-sm md:text-base bg-stone-50 border border-stone-100 rounded-xl px-4 py-1.5 outline-none focus:ring-2 focus:ring-amber-100 transition-all font-bold text-amber-900 cursor-pointer hover:bg-white"
            >
              {Object.values(Madhab).map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 md:px-12 py-10 scroll-smooth scrollbar-thin scrollbar-thumb-stone-200">
        <div className="max-w-5xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              onToggleBookmark={toggleBookmark}
              isBookmarked={bookmarks.some(b => b.id === msg.id)}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-10">
              <div className="flex gap-6 items-center bg-white border border-stone-100 px-8 py-6 rounded-[2.5rem] shadow-sm text-stone-400">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2.5 h-2.5 bg-amber-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-bold text-stone-600">جاري استحضار الأقوال من المصادر...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-6 md:p-8 bg-white border-t border-stone-100 shadow-2xl relative z-10">
        <form onSubmit={handleSend} className="max-w-5xl mx-auto relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب استفسارك الفقهي هنا..."
            className="w-full pl-36 pr-16 py-6 md:py-7 rounded-[2.5rem] border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all shadow-sm text-stone-700 text-lg md:text-xl font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute left-3 top-3 bottom-3 px-10 rounded-[2rem] font-bold text-lg md:text-xl transition-all flex items-center gap-3 ${
              !input.trim() || isLoading 
                ? 'bg-stone-100 text-stone-300' 
                : 'bg-amber-700 text-white hover:bg-amber-800 active:scale-95 shadow-lg shadow-amber-900/10'
            }`}
          >
            <span>بحث</span>
          </button>
        </form>
      </div>

      {activeViewBookmark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md transition-all">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-stone-100">
            <div className="p-10 bg-stone-50 text-stone-800 flex items-center justify-between relative overflow-hidden border-b border-stone-100">
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4">
                  مذهب {activeViewBookmark.madhab}
                </span>
                <h3 className="font-amiri text-3xl md:text-4xl font-bold leading-tight line-clamp-2 text-amber-900">{activeViewBookmark.title}</h3>
              </div>
              <button onClick={() => setActiveViewBookmark(null)} className="p-4 bg-white hover:bg-stone-100 rounded-2xl transition-all border border-stone-200 shadow-sm">
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 md:p-16 bg-white">
              <div className="prose prose-amber max-w-none">
                {activeViewBookmark.content.split('\n').map((line, idx) => {
                  const isDisclaimer = line.includes("هذه المادة تعليمية تهدف لتقريب التراث الفقهي");
                  return (
                    <p key={idx} className={`leading-loose mb-8 ${
                      isDisclaimer 
                        ? 'text-xs text-stone-400 mt-10 pt-6 border-t border-stone-100 font-sans font-bold opacity-80' 
                        : `text-stone-600 font-amiri text-xl md:text-2xl ${line.startsWith('ملخص الحكم') ? 'font-bold text-amber-900 border-r-6 border-amber-400 pr-6' : ''}`
                    }`}>
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
            
            <div className="p-8 bg-stone-50 border-t border-stone-100 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleShareWhatsApp(activeViewBookmark.content)}
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold text-green-700 border border-green-100 bg-white hover:bg-green-50 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  واتساب
                </button>
                <button 
                  onClick={() => handlePrint(activeViewBookmark.content)}
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold text-stone-700 border border-stone-200 bg-white hover:bg-stone-50 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                  طباعة
                </button>
              </div>
              <button 
                onClick={() => { removeBookmark(activeViewBookmark.id); setActiveViewBookmark(null); }}
                className="flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-bold text-red-600 border border-red-100 bg-white hover:bg-red-50 transition-all shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                <span>حذف من المحفوظات</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;

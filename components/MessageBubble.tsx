
import React from 'react';
import { Message, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface MessageBubbleProps {
  message: Message;
  onToggleBookmark?: (message: Message) => void;
  isBookmarked?: boolean;
  lang: Language;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onToggleBookmark, isBookmarked, lang }) => {
  const isAssistant = message.role === 'assistant';
  const t = TRANSLATIONS[lang];
  const isAr = lang === Language.AR;

  // Simple heuristic to check if the content is primarily English
  const isEnglishContent = /[a-zA-Z]{4,}/.test(message.content);

  const formatContent = (text: string) => {
    const cleanText = text.replace(/(\*\*|\*|#|__|_)/g, '');
    const lines = cleanText.split('\n');
    
    return lines.map((line, idx) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={idx} className="h-4" />;

      const isDisclaimer = trimmedLine.includes("هذه المادة تعليمية") || trimmedLine.includes("educational material");

      if (isDisclaimer && isAssistant) {
        return (
          <p key={idx} className="text-[11px] text-stone-400 mt-6 pt-4 border-t border-stone-100 leading-relaxed font-sans font-bold text-justify opacity-80">
            {trimmedLine}
          </p>
        );
      }

      const isHeader = trimmedLine.endsWith(':') || 
                       trimmedLine.startsWith('ملخص الحكم') || 
                       trimmedLine.startsWith('Brief Ruling') ||
                       trimmedLine.startsWith('Evidence') ||
                       trimmedLine.startsWith('Detail') ||
                       trimmedLine.startsWith('الأدلة') ||
                       trimmedLine.startsWith('أقوال العلماء') ||
                       trimmedLine.startsWith('الترجيح');

      if (isHeader && isAssistant) {
        return (
          <h4 key={idx} className={`text-amber-900 font-bold mt-4 mb-3 ${isAr ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-amber-400 text-lg md:text-xl font-amiri`}>
            {trimmedLine}
          </h4>
        );
      }

      const isListItem = trimmedLine.startsWith('-') || trimmedLine.startsWith('•');
      const content = isListItem ? trimmedLine.substring(1).trim() : trimmedLine;

      return (
        <p key={idx} className={`${isListItem ? (isAr ? 'mr-6' : 'ml-6') + ' relative before:content-["•"] before:absolute ' + (isAr ? 'before:-right-4' : 'before:-left-4') + ' before:text-amber-500' : ''} mb-3 leading-relaxed font-amiri text-base md:text-lg`}>
          {content}
        </p>
      );
    });
  };

  const handleShareWhatsApp = () => {
    const header = `*${t.title}:*\n\n`;
    const text = header + message.content;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html dir="${isEnglishContent ? 'ltr' : 'rtl'}" lang="${isEnglishContent ? 'en' : 'ar'}">
        <head>
          <title>${t.title} - Print</title>
          <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Amiri', serif; padding: 40px; color: #333; line-height: 1.8; }
            .header { border-bottom: 2px solid #b8860b; margin-bottom: 30px; padding-bottom: 10px; text-align: center; }
            .content { white-space: pre-wrap; font-size: 18px; }
            .disclaimer { font-size: 12px; color: #999; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
            .footer { margin-top: 50px; font-size: 12px; text-align: center; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${t.title}</h1>
            <p>${t.subtitle}</p>
          </div>
          <div class="content">${message.content}</div>
          <div class="footer">
            ${t.footerRights}
          </div>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className={`flex w-full mb-8 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[95%] md:max-w-[85%] ${isAssistant ? (isAr ? 'flex-row' : 'flex-row-reverse') : (isAr ? 'flex-row-reverse' : 'flex-row')} gap-4`}>
        <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl shadow-sm border ${
          isAssistant ? 'bg-white border-amber-100 text-amber-700' : 'bg-stone-100 border-stone-200 text-stone-500'
        }`}>
          {isAssistant ? '⚖️' : '👤'}
        </div>
        
        <div className={`flex flex-col ${isAssistant ? (isAr ? 'items-start' : 'items-end') : (isAr ? 'items-end' : 'items-start')} relative group w-full`}>
          <div className={`px-6 py-5 rounded-[2rem] shadow-sm border w-full ${
            isAssistant 
              ? `bg-white border-stone-100 text-stone-800 ${isAr ? 'rounded-tr-none' : 'rounded-tl-none'} shadow-sm` 
              : `bg-amber-800 border-amber-900 text-amber-50 ${isAr ? 'rounded-tl-none' : 'rounded-tr-none'} shadow-amber-900/10 shadow-md`
          }`} dir={isEnglishContent ? 'ltr' : 'rtl'}>
            <div className={`max-w-none ${isAssistant ? 'text-stone-700' : 'text-amber-50 font-medium'} ${isEnglishContent ? 'text-left' : 'text-right'}`}>
              {formatContent(message.content)}
            </div>
          </div>
          
          <div className={`mt-2 flex items-center gap-3 text-[10px] text-stone-400 px-3 uppercase tracking-wider w-full ${isAssistant ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')}`}>
            <span className="font-bold">{new Date(message.timestamp).toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            {message.madhab && message.madhab !== 'غير محدد' && (
              <>
                <span className="opacity-30">|</span>
                <span className="text-amber-700 font-bold">{t.madhabLabel} {message.madhab}</span>
              </>
            )}
            
            {isAssistant && (
              <div className={`${isAr ? 'mr-auto' : 'ml-auto'} flex items-center gap-1.5 transition-all opacity-0 group-hover:opacity-100`}>
                <button 
                  onClick={handleShareWhatsApp}
                  className="p-1.5 rounded-lg hover:bg-green-50 text-stone-400 hover:text-green-600 transition-all"
                  title={t.whatsapp}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </button>
                <button 
                  onClick={handlePrint}
                  className="p-1.5 rounded-lg hover:bg-stone-50 text-stone-400 hover:text-stone-600 transition-all"
                  title={t.print}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
                {onToggleBookmark && (
                  <button 
                    onClick={() => onToggleBookmark(message)}
                    className={`transition-all p-1.5 rounded-lg hover:bg-amber-50 ${isBookmarked ? 'text-amber-500 scale-110 shadow-inner' : 'text-stone-400 hover:text-amber-500'}`}
                    title={isBookmarked ? t.removeSaved : "Save Issue"}
                  >
                    <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

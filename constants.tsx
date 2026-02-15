
import React from 'react';

export const SYSTEM_INSTRUCTION = `أنت المساعد الفقهي التعليمي لمنصة "معين المفتي" (Muin Al-Mufti).
Your role is to help users understand Islamic rulings according to the Sunni schools of thought by transmitting established scholarship from classical sources.

Instructions:
1. Respond in the language used by the user (Arabic or English).
2. For Arabic responses, use the traditional formatting (Headers: Brief, Detail, Evidence, Conclusion).
3. Reference classical sources (Hanafi, Maliki, Shafi'i, Hanbali).
4. No Markdown formatting (no **, #, etc.). Use clear line breaks.
5. Mandatory Disclaimer at the end (Bilingual if the conversation is mixed, or in the response language):
"هذه المادة تعليمية تهدف لتقريب التراث الفقهي، ولا تعد فتوى رسمية لمسائلكم الخاصة. يُرجى مراجعة العلماء والمفتين المختصين في النوازل الشخصية."
"This material is educational and aims to bring jurisprudential heritage closer; it is not an official fatwa for personal matters. Please consult specialized scholars for specific cases."

Style: Respectful, humble, and clear. Do not issue independent fatwas; act as a guide to existing heritage.`;

export const TRANSLATIONS = {
  ar: {
    title: "معين المفتي",
    subtitle: "المساعد الفقهي الذكي",
    tagline: "دليلك الموثوق في التراث الفقهي",
    heroTitle: "زادك من الفقه وفق أصوله المعتمدة",
    heroSpan: "على نهج الأئمة في عصر الذكاء الاصطناعي",
    heroDesc: "نحن لا نفتي، بل نيسر لك الوصول إلى ما قرره الأئمة الأعلام في أمهات الكتب الفقهية وفق المذاهب الأربعة المعتمدة.",
    startBtn: "اسأل وتعلم الآن",
    entryBtn: "دخول المنصة",
    feature1Title: "أمهات الكتب",
    feature1Desc: "نعتمد بشكل مباشر على المراجع الأصلية مثل حاشية ابن عابدين، والمدونة الكبرى، والمجموع للنووي، والمغني لابن قدامة.",
    feature2Title: "المذاهب الأربعة",
    feature2Desc: "تغطية شاملة لآراء الحنفية والمالكية والشافعية والحنابلة مع توضيح القول المعتمد داخل كل مذهب.",
    feature3Title: "عرض تعليمي",
    feature3Desc: "يتم صياغة الأحكام بأسلوب تعليمي رصين يجمع بين جلالة التراث وسهولة العرض المعاصر لطلاب العلم والمستفتين.",
    disclaimerTitle: "تنبيه هام",
    disclaimerDesc: "المنصة وسيلة مساعدة لتقريب العلم الشرعي ونقل أقوال الفقهاء وليست جهة إفتاء رسمية. المسائل الخاصة والنوازل المعاصرة تتطلب عرضها على المفتين المختصين مباشرة.",
    agreeBtn: "موافق، ادخل للمنصة",
    footerRights: "جميع الحقوق محفوظة لطلاب العلم",
    contactUs: "للتواصل والاقتراحات",
    askByMadhab: "أسأل حسب المذهب",
    searchSaved: "ابحث في محفوظاتك...",
    savedIssues: "المسائل المحفوظة",
    noSaved: "لا توجد مسائل محفوظة بعد.",
    aboutPlatform: "عن المنصة",
    aboutPlatformDesc: "تيسير الوصول إلى كنوز التراث الفقهي عبر نقل آراء المذاهب الأربعة من مصادرها الأصلية المعتمدة بأسلوب عصري ميسر.",
    typePlaceholder: "اكتب استفسارك الفقهي هنا...",
    searchBtn: "بحث",
    loading: "جاري استحضار الأقوال من المصادر...",
    welcomeMsg: 'أهلاً بك في منصة "معين المفتي". أنا مساعدك الفقهي التعليمي، أنقل لك أقوال العلماء المعتمدين من أمهات الكتب الشرعية. كيف يمكنني مساعدتك اليوم؟ يمكنك اختيار مذهب فقهي معين أو طرح سؤالك مباشرة.',
    madhabLabel: "مذهب",
    removeSaved: "حذف من المحفوظات",
    whatsapp: "واتساب",
    print: "طباعة",
    status: "متصل بالخدمة"
  },
  en: {
    title: "Muin Al-Mufti",
    subtitle: "AI Jurisprudence Assistant",
    tagline: "Your Trusted Guide to Jurisprudential Heritage",
    heroTitle: "Your Provision of Fiqh According to Established Principles",
    heroSpan: "On the path of the Imams in the age of AI",
    heroDesc: "We do not issue fatwas; we facilitate your access to what the great Imams decided in the primary books of Fiqh according to the four approved schools.",
    startBtn: "Ask & Learn Now",
    entryBtn: "Enter Platform",
    feature1Title: "Primary Sources",
    feature1Desc: "We rely directly on original references such as Ibn Abidin's Hashiya, Al-Mudawwana, Al-Majmu' by Al-Nawawi, and Al-Mughni by Ibn Qudamah.",
    feature2Title: "The Four Schools",
    feature2Desc: "Comprehensive coverage of Hanafi, Maliki, Shafi'i, and Hanbali views, clarifying the approved position within each school.",
    feature3Title: "Educational Presentation",
    feature3Desc: "Rulings are formulated in a solid educational style that combines the majesty of heritage with the ease of contemporary presentation.",
    disclaimerTitle: "Important Warning",
    disclaimerDesc: "This platform is an aid to bring Islamic knowledge closer and transmit scholars' views; it is not an official fatwa-issuing body. Personal matters and modern crises require direct consultation with specialists.",
    agreeBtn: "I Agree, Enter Platform",
    footerRights: "All rights reserved to students of knowledge",
    contactUs: "Contact & Suggestions",
    askByMadhab: "Ask by School",
    searchSaved: "Search in bookmarks...",
    savedIssues: "Saved Issues",
    noSaved: "No saved issues yet.",
    aboutPlatform: "About Platform",
    aboutPlatformDesc: "Facilitating access to the treasures of jurisprudential heritage by transmitting the views of the four schools from their original sources.",
    typePlaceholder: "Type your query here...",
    searchBtn: "Search",
    loading: "Retrieving scholarship from sources...",
    welcomeMsg: 'Welcome to Muin Al-Mufti. I am your educational assistant, transmitting the views of approved scholars from primary sources. How can I help you today? You can choose a specific school or ask directly.',
    madhabLabel: "School",
    removeSaved: "Remove from Bookmarks",
    whatsapp: "WhatsApp",
    print: "Print",
    status: "Online"
  }
};

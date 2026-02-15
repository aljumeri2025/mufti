
export enum Madhab {
  NONE = 'غير محدد',
  HANAFI = 'الحنفي',
  MALIKI = 'المالكي',
  SHAFI = 'الشافعي',
  HANBALI = 'الحنبلي'
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  timestamp: Date;
  madhab?: Madhab;
  isBookmarked?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface SavedIssue {
  id: string;
  title: string;
  content: string;
  madhab: Madhab;
  timestamp: Date;
}


import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Language } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(message: string, history: { role: string; content: string }[], selectedMadhab: string, lang: Language) {
    const promptWithContext = `(Interface Language: ${lang})\n` + (selectedMadhab !== 'غير محدد' 
      ? `(المذهب المختار للمستخدم: المذهب ${selectedMadhab})\nالسؤال: ${message}`
      : message);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...history.map(h => ({ 
            role: h.role === 'user' ? 'user' : 'model', 
            parts: [{ text: h.content }] 
          })),
          { role: 'user', parts: [{ text: promptWithContext }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      return response.text || "عذراً، حدث خطأ في معالجة طلبك.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return lang === Language.AR 
        ? "عذراً، واجهنا مشكلة في الاتصال بالخدمة. يرجى المحاولة لاحقاً." 
        : "Sorry, we encountered a problem connecting to the service. Please try again later.";
    }
  }
}

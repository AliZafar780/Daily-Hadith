
import { GoogleGenAI, Type } from "@google/genai";
import type { Hadith } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const hadithSchema = {
  type: Type.OBJECT,
  properties: {
    hadithText: {
      type: Type.STRING,
      description: 'The full Hadith text in Arabic script.',
    },
    translation: {
      type: Type.STRING,
      description: 'The English translation of the Hadith.',
    },
    narrator: {
      type: Type.STRING,
      description: 'The primary narrator of the Hadith (e.g., "Narrated by Abu Huraira").',
    },
    source: {
      type: Type.STRING,
      description: 'The source collection and number (e.g., "Sahih al-Bukhari 1").',
    },
    explanation: {
      type: Type.STRING,
      description: 'A brief, modern explanation of the Hadith\'s wisdom and application in daily life, around 100-150 words.',
    },
  },
  required: ['hadithText', 'translation', 'narrator', 'source', 'explanation'],
};

export const fetchDailyHadith = async (): Promise<Hadith> => {
  try {
    const prompt = `You are an Islamic scholar providing a daily reminder. Please provide one authentic (sahih) Hadith. Include the original Arabic, the English translation, the narrator, the source (e.g., Sahih al-Bukhari, Hadith 1), and a short, insightful explanation of its meaning and how it can be applied in modern daily life. The explanation should be encouraging and easy to understand. Please provide the output strictly in JSON format based on the provided schema. Do not include any introductory text or markdown formatting outside of the JSON object.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: hadithSchema,
            temperature: 0.8
        },
    });

    const jsonText = response.text.trim();
    const hadithData: Hadith = JSON.parse(jsonText);
    
    return hadithData;
  } catch (error) {
    console.error("Error fetching Hadith from Gemini API:", error);
    throw new Error("Failed to fetch a new Hadith. Please check your connection or API key.");
  }
};

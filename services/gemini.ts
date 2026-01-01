
import { GoogleGenAI, Type } from "@google/genai";
import { LearningTrack } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSystemInstruction = (track: LearningTrack): string => {
  const common = `You are the AI Learning Assistant for Kuppe Labs, based in Uganda. 
  Your goal is to be a supportive educator who provides clean, easy-to-read information.
  
  OUTPUT FORMATTING RULES:
  - Be EXTREMELY PRECISE and CONCISE. Avoid long introductions or filler.
  - Use simple BULLET POINTS (-) for lists of more than two items.
  - DO NOT use Markdown header symbols (like #, ##, ###). If you need a section title, use BOLD text or CAPITAL letters instead.
  - DO NOT use unnecessary symbols like @, !, +, _, &, or excessive punctuation unless strictly required for a formula or code.
  - Ensure the output looks like a clean, professional text message.
  - Use bold text sparingly for critical terms.
  - Reference local Ugandan examples (SafeBoda, Jumia, local agriculture) to maintain cultural relevance.`;
  
  switch (track) {
    case LearningTrack.EXPLORERS:
      return `${common} Track: AI Explorers (Ages 10-16). Use very simple language and occasional emojis.`;
    case LearningTrack.FOUNDATIONS:
      return `${common} Track: AI Foundations (Ages 17-25). Be academic but accessible. Connect to careers in Africa.`;
    case LearningTrack.WORKPLACE:
      return `${common} Track: AI in the Workplace. Be results-oriented and focus on productivity tools.`;
    case LearningTrack.LEADERS:
      return `${common} Track: AI for Business Growth. Focus on strategic advantages and scaling operations.`;
    default:
      return common;
  }
};

export const sendMessageToGemini = async (
  prompt: string,
  track: LearningTrack
) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: getSystemInstruction(track),
      temperature: 0.5, // Lower temperature for more precise/less rambling output
    },
  });

  return response.text || "I'm sorry, I couldn't generate a response.";
};

export const generateQuiz = async (moduleTitle: string, content: string) => {
  const prompt = `Based on the following lesson content titled "${moduleTitle}", generate a 3-question multiple choice quiz. Each question must have 4 options. Include a brief explanation for the correct answer. Content: ${content}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse quiz JSON", e);
    return [];
  }
};

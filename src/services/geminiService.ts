import { GoogleGenAI, Type } from "@google/genai";
import { UploadedFile, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

// Helper to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const analyzeDocument = async (uploadedFile: UploadedFile, customPrompt?: string): Promise<AnalysisResult> => {
  try {
    const base64Data = uploadedFile.base64Data || await fileToBase64(uploadedFile.file);
    const mimeType = uploadedFile.file.type;

    const modelId = 'gemini-2.5-flash';

    const systemInstruction = `You are a helpful, cheerful, and professional document assistant. 
    Analyze the provided document. Return the response in a structured JSON format.
    Keep the tone light but informative.
    `;

    const prompt = customPrompt || "Summarize this document, extract key points, suggest action items, and identify the tone.";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A concise summary of the document (max 3 sentences)." },
            keyPoints: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3-5 most important facts or data points."
            },
            actionItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Suggested next steps or action items based on the content."
            },
            tone: { type: Type.STRING, description: "One word describing the tone (e.g., Professional, Urgent, Casual)." }
          },
          required: ["summary", "keyPoints", "actionItems", "tone"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
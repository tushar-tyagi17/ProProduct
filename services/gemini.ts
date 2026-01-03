
import { GoogleGenAI } from "@google/genai";

export async function generateProductDescription(name: string, category: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling 2-sentence marketing description for a product named "${name}" in the "${category}" category. Be concise and professional.`,
    });
    return response.text?.trim() || "Quality product for your needs.";
  } catch (error) {
    console.error("Gemini description generation failed:", error);
    return "Experience quality and innovation with our latest " + name + ".";
  }
}

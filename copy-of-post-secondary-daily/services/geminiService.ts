import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// In a real app, ensure process.env.API_KEY is available.
// For this demo, we assume the environment is set up correctly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Generates a concise summary for a post-secondary news article.
 * This is used if the scraped content snippet is too short or missing.
 */
export const generateArticleSummary = async (headline: string, rawContent: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key provided for Gemini.");
    return "Summary unavailable (API Key missing).";
  }

  try {
    const prompt = `
      You are an expert news editor for a higher-education daily briefing.
      Summarize the following article content into 2 sentences maximum.
      Focus on the impact on students, faculty, or governance.
      
      Headline: ${headline}
      Content/Context: ${rawContent}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No summary generated.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Could not generate summary at this time.";
  }
};
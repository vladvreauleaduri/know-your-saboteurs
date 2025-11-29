import { GoogleGenAI } from "@google/genai";
import { SaboteurType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSaboteurAnalysis = async (topSaboteurs: { type: SaboteurType, score: number }[]) => {
  try {
    const saboteurList = topSaboteurs.map(s => `${s.type} (Score: ${s.score})`).join(", ");
    
    const prompt = `
      You are an expert Positive Intelligence coach with a fun, empathetic, and "googley" personality.
      The user has taken a saboteur assessment. Here are their top results: ${saboteurList}.

      Please provide a response in Markdown format with the following structure:
      
      ## 🎭 Your Saboteur Profile
      A 2-3 sentence summary of how these specific saboteurs might collaborate to mess with the user's day. Be playful but insightful.

      ## 💡 The Bright Side
      Explain one hidden strength behind their top saboteur (e.g., a Controller is also a natural leader).

      ## 🛡️ Jedi Mind Trick
      One specific, actionable, and fun 10-second mental exercise to counter their top saboteur when it appears.
      
      Keep the tone light, colorful, and encouraging. Use emojis. Do not mention you are an AI. Speak as a real human coach.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Low latency
      }
    });

    if (response && response.text) {
      return response.text;
    }
    
    return "## 🤔 Hmmm...\n\nI couldn't quite catch that thought. Maybe the saboteurs are interfering with the signal! Try again in a moment.";

  } catch (error) {
    console.error("Error fetching analysis:", error);
    return "## ☕ Coffee Break\n\nThe coach is currently taking a quick break (or ran into a connection error). \n\n**Quick Tip:** Take a deep breath! Your top saboteur is just a voice in your head, not the truth.";
  }
};
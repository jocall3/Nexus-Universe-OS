
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string, context?: any) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                systemInstruction: "You are 'Nexus', the sentient OS of a multi-dimensional platform. Be concise, futuristic, and helpful. Use markdown. You have access to user data like balance and account number if provided in the context.",
                temperature: 0.7,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        return "I encountered a ripple in the data stream. Please try again.";
    }
};

export const createNexusChat = () => {
    return ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: "You are Nexus, the AI interface for the Nexus Universe OS. Help users navigate their dashboard, explain financial data, and discuss cosmic resource allocation.",
        },
    });
};

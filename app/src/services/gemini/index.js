const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_AI_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export { model as TranscriberModel };

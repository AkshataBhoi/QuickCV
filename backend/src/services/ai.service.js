import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Groq securely using environment variables
// It automatically picks up GROQ_API_KEY from the environment
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Default configuration for the AI models
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 2048;

/**
 * Standard System Prompt for ATS Optimization.
 * This ensures every AI output maintains a professional, recruiter-friendly tone,
 * uses measurable achievements, and avoids generic AI fluff.
 */
const BASE_ATS_SYSTEM_PROMPT = `
You are an expert ATS (Applicant Tracking System) optimizer, a senior technical recruiter, and a professional resume writer.
Your goal is to generate output that is:
1. Highly optimized for ATS parsing (use standard keywords, avoid complex formatting).
2. Action-oriented and measurable (use strong action verbs, quantify achievements where possible).
3. Concise and impactful (no fluff, no generic "AI-sounding" phrases).
4. Tailored for readability by both machines and human hiring managers.
`;

/**
 * Centralized method to interact with Groq AI.
 * This function can be reused by any controller (e.g., summary generator, bullet points, cover letter).
 * 
 * @param {Object} params
 * @param {string} params.userPrompt - The main instruction or context provided by the user.
 * @param {string} [params.systemPrompt] - Optional specific system prompt. Defaults to BASE_ATS_SYSTEM_PROMPT.
 * @param {boolean} [params.jsonMode=false] - Whether to force the response into a JSON object (requires JSON structure in prompt).
 * @param {string} [params.model] - The Groq model to use.
 * @param {number} [params.temperature] - Creativity level (0.0 to 2.0).
 * @param {number} [params.maxTokens] - Maximum length of the generated response.
 * @returns {Promise<string|Object>} The AI response string or parsed JSON object.
 */
export const generateAIResponse = async ({
    userPrompt,
    systemPrompt = BASE_ATS_SYSTEM_PROMPT,
    jsonMode = false,
    model = DEFAULT_MODEL,
    temperature = DEFAULT_TEMPERATURE,
    maxTokens = DEFAULT_MAX_TOKENS
}) => {
    try {
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is not configured in the environment variables.");
        }

        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ];

        const chatCompletionParams = {
            messages,
            model,
            temperature,
            max_tokens: maxTokens,
        };

        // If jsonMode is true, we instruct the model to return JSON
        if (jsonMode) {
            chatCompletionParams.response_format = { type: "json_object" };
        }

        const response = await groq.chat.completions.create(chatCompletionParams);

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error("Empty response received from AI provider.");
        }

        // Parse to JSON object if requested
        if (jsonMode) {
            try {
                return JSON.parse(content);
            } catch (parseError) {
                console.error("Failed to parse JSON from AI response:", content);
                throw new Error("AI response was not in a valid JSON format.");
            }
        }

        return content;

    } catch (error) {
        console.error("AI Service Error (Groq):", error);
        
        // Return a clean error rather than throwing to avoid crashing the server
        // The controller should handle this cleanly.
        throw new Error(
            error.message || "Failed to generate AI response. Please try again later."
        );
    }
};

/**
 * Example wrapper specifically for generating optimized JSON.
 * We can create specific helpers here for different features later.
 */
export const generateStructuredAIResponse = async (userPrompt, specificSystemPrompt) => {
    return await generateAIResponse({
        userPrompt,
        systemPrompt: specificSystemPrompt ? `${BASE_ATS_SYSTEM_PROMPT}\n\n${specificSystemPrompt}` : BASE_ATS_SYSTEM_PROMPT,
        jsonMode: true
    });
};

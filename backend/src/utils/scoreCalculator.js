import { analyzeResumeLocally } from "./atsAnalyzer.js";
import { generateStructuredAIResponse } from "../services/ai.service.js";

/**
 * Calculates the ATS score using the local rule-based analyzer and augments with Groq AI.
 * @param {string} resumeText - The extracted text from the resume.
 * @param {string} jobDescription - The job description text.
 * @param {string} resumeName - The name of the resume file.
 * @returns {Promise<object>} - An object containing overall score and subscores.
 */
export const calculateATSScore = async (resumeText, jobDescription = "", resumeName = "My Resume") => {
  // Use the local analyzer logic as baseline
  const analysis = analyzeResumeLocally(resumeText, jobDescription);

  try {
      const systemPrompt = `You are an expert ATS algorithm and a senior technical recruiter.
Analyze the candidate's resume against the provided job description.
You are given a baseline local analysis. Improve upon it with deep semantic analysis.
Output MUST be a strict JSON object with exactly these fields:
{
  "atsComplianceScore": number (0-100),
  "keywordScore": number (0-100),
  "readabilityScore": number (0-100),
  "formattingScore": number (0-100),
  "skillsScore": number (0-100),
  "suggestions": string[] (3-5 highly actionable and specific tips),
  "missingKeywords": string[] (up to 15 important missing keywords from the JD),
  "matchedKeywords": string[] (up to 15 important keywords found)
}
Keep scores realistic but accurate to the resume.`;

      const userPrompt = `Job Description:\n${jobDescription || "None provided"}\n\nResume Content:\n${resumeText.substring(0, 4000)}\n\nBaseline Scores: ATS ${analysis.atsComplianceScore}, Keyword ${analysis.keywordScore}, Readability ${analysis.readabilityScore}`;

      const aiEnhancement = await generateStructuredAIResponse(userPrompt, systemPrompt);

      return {
        ...analysis, // Keep local defaults
        ...aiEnhancement,
        improvements: aiEnhancement.suggestions.map(s => ({ title: "Improvement", description: s })),
        resumeName,
        overallScore: aiEnhancement.atsComplianceScore
      };
  } catch (err) {
      console.error("AI enhancement failed, falling back to local ATS parser:", err);
      return {
        ...analysis,
        resumeName,
        overallScore: analysis.atsComplianceScore
      };
  }
};

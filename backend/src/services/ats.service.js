import { analyzeResumeLocally } from "../utils/atsAnalyzer.js";

/**
 * Perform Local Rule-Based ATS Analysis
 * This removes the OpenAI dependency and uses strictly local logic.
 */
export const analyzeResumeATS = async (content, jobDescription = "") => {
    try {
        // Convert content object to plain text for the analyzer
        let plainText = "";

        if (typeof content === "string") {
            plainText = content;
        } else if (content && typeof content === "object") {
            plainText = [
                content.fullName || "",
                content.summary || "",
                ...(content.experience || []).map(e => `${e.role || ""} ${e.company || ""} ${e.description || ""}`),
                ...(content.projects || []).map(p => `${p.title || ""} ${p.description || ""}`),
                ...(content.skills || []),
                (content.education || []).map(e => `${e.school || ""} ${e.degree || ""}`).join(" ")
            ].join(" ");
        }

        const analysis = analyzeResumeLocally(plainText, jobDescription);

        return {
            ...analysis,
            overallScore: analysis.atsScore, // Alias for backward compatibility
            lastAnalyzed: new Date()
        };
    } catch (error) {
        console.error("Local ATS Analysis Error:", error);
        return {
            atsScore: 0,
            overallScore: 0,
            keywordScore: 0,
            readabilityScore: 0,
            matchedKeywords: [],
            missingKeywords: [],
            suggestions: ["Failed to analyze resume. Please try again."],
            lastAnalyzed: new Date()
        };
    }
};

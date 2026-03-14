import { analyzeResumeLocally } from "./atsAnalyzer.js";

/**
 * Calculates the ATS score using the local rule-based analyzer.
 * @param {string} resumeText - The extracted text from the resume.
 * @param {string} jobDescription - The job description text.
 * @param {string} resumeName - The name of the resume file.
 * @returns {Promise<object>} - An object containing overall score and subscores.
 */
export const calculateATSScore = async (resumeText, jobDescription = "", resumeName = "My Resume") => {
  // Use the local analyzer logic
  const analysis = analyzeResumeLocally(resumeText, jobDescription);

  return {
    ...analysis,
    resumeName,
    overallScore: analysis.atsComplianceScore // bridge to legacy overallScore if needed
  };
};

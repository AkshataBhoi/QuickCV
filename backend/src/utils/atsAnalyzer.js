import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache for keywords
let cachedKeywordLibrary = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 3600000; // 1 hour

/**
 * Dynamically loads keywords from the keywords folder.
 */
export const loadKeywordLibrary = () => {
    if (cachedKeywordLibrary && (Date.now() - lastCacheUpdate < CACHE_DURATION)) {
        return cachedKeywordLibrary;
    }

    const keywordsDir = path.join(__dirname, "../keywords");
    const allKeywords = new Set();

    try {
        if (fs.existsSync(keywordsDir)) {
            const files = fs.readdirSync(keywordsDir);

            files.forEach(file => {
                if (file.endsWith(".json")) {
                    try {
                        const content = JSON.parse(fs.readFileSync(path.join(keywordsDir, file), "utf-8"));
                        if (Array.isArray(content)) {
                            content.forEach(kw => allKeywords.add(kw.toLowerCase()));
                        }
                    } catch (err) {
                        console.error(`Error parsing keyword file ${file}:`, err);
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error reading keywords directory:", error);
    }

    cachedKeywordLibrary = Array.from(allKeywords);
    lastCacheUpdate = Date.now();
    return cachedKeywordLibrary;
};

/**
 * Perform Local ATS Analysis on resume text compared to a job description.
 * @param {string} resumeText - The extracted text from the resume.
 * @param {string} jobDescription - The job description text.
 * @returns {object} Analysis results including scores and suggestions.
 */
export const analyzeResumeLocally = (resumeText = "", jobDescription = "") => {
    const keywordLibrary = loadKeywordLibrary();

    if (!resumeText) {
        return {
            atsScore: 0,
            keywordScore: 0,
            readabilityScore: 0,
            matchedKeywords: [],
            missingKeywords: [],
            suggestions: [{
                issue: "Missing Content",
                suggestion: "Upload a resume with content to get started."
            }]
        };
    }

    const lowerResume = resumeText.toLowerCase();
    const lowerJD = jobDescription.toLowerCase();

    // 1. Keyword Identification from JD
    // We only care about keywords that are in our master library AND in the JD
    const jdKeywords = keywordLibrary.filter(kw => lowerJD.includes(kw));

    // 2. Keyword Matching
    const matchedKeywords = jdKeywords.filter(keyword =>
        lowerResume.includes(keyword)
    );
    const missingKeywords = jdKeywords.filter(keyword =>
        !lowerResume.includes(keyword)
    );

    // Keyword Score Calculation:
    // If JD has no keywords from library, we fallback to general library matching
    // or give a baseline if the resume is generally "technical"
    let keywordScore = 0;
    if (jdKeywords.length > 0) {
        keywordScore = Math.round((matchedKeywords.length / jdKeywords.length) * 100);
    } else {
        // Fallback: match against whole library but with lower weight for generalized resumes
        const generalMatches = keywordLibrary.filter(kw => lowerResume.includes(kw));
        keywordScore = Math.min(60, Math.round((generalMatches.length / 50) * 100)); // Cap at 60 for irrelevant JDs
    }

    // 3. Readability Score
    const sentences = resumeText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
    const longSentenceCount = sentences.filter(s => s.split(/\s+/).length > 25).length;

    let readabilityScore = 100 - (longSentenceCount * 5);
    readabilityScore = Math.max(40, Math.min(100, readabilityScore));

    // 4. Formatting Score (New logic)
    // Check for bullet points and average sentence length
    const bulletPoints = (resumeText.match(/[•\-\*]/g) || []).length;
    const wordCount = resumeText.split(/\s+/).length;
    let formattingScore = 70; // Base score
    if (bulletPoints > 5) formattingScore += 15;
    if (wordCount > 300 && wordCount < 1000) formattingScore += 15;
    formattingScore = Math.min(100, formattingScore);

    // 5. Section Score (New logic)
    const standardSections = ["experience", "education", "skills", "summary", "contact", "projects"];
    const foundSections = standardSections.filter(section => lowerResume.includes(section));
    const sectionScore = Math.round((foundSections.length / standardSections.length) * 100);

    // 6. ATS Compliance Score (Final Weighted Score)
    const atsComplianceScore = Math.round(
        (keywordScore * 0.4) +
        (readabilityScore * 0.2) +
        (formattingScore * 0.2) +
        (sectionScore * 0.2)
    );

    // 7. Actionable Improvements (Dynamic Generation)
    const suggestions = [];

    // Rule: Keyword Gap
    if (missingKeywords.length > 0) {
        const topMissing = missingKeywords.slice(0, 3).join(", ");
        suggestions.push(`Add missing technical keywords such as: ${topMissing} to better align with the job description.`);
    }

    // Rule: Readability Issues
    if (readabilityScore < 70) {
        suggestions.push("Improve readability by shortening sentences and using bullet points for better scanning by recruiters and ATS.");
    }

    // Rule: Low Alignment
    if (atsComplianceScore < 50) {
        suggestions.push("Your resume has low alignment with the job description. Consider adding relevant skills and technologies mentioned in the JD.");
    }

    // Rule: Resume Impact (Metrics Check)
    const metricsRegex = /\b\d+(\.\d+)?%|\b\d+(\.\d+)?\s?(k|K|M|m|bn|BN|B)|(\+|-)?\$\s?\d+/g;
    const hasMetrics = metricsRegex.test(resumeText);
    if (!hasMetrics) {
        suggestions.push("Include measurable achievements (e.g., 'Improved API performance by 30%') to demonstrate results and impact.");
    }

    // Ensure we have at least some suggestions if the score isn't perfect
    if (suggestions.length === 0 && atsComplianceScore < 90) {
        suggestions.push("Tailor your summary to specifically mention the role you are applying for.");
    }

    return {
        atsComplianceScore,
        skillsScore: keywordScore,
        keywordScore,
        formattingScore,
        readabilityScore,
        suggestions,
        // Keep these for backward compatibility/internal use if needed
        atsScore: atsComplianceScore,
        matchedKeywords,
        missingKeywords,
        improvements: suggestions.map(s => ({ title: "Improvement", description: s }))
    };
};

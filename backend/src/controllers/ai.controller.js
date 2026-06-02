import User from "../models/User.js";
import Resume from "../models/Resume.js";
import { analyzeResumeATS } from "../services/ats.service.js";
import mongoose from "mongoose";
import { generateSummaries } from "../utils/summaryGenerator.js";
import { generateStructuredAIResponse, generateAIResponse } from "../services/ai.service.js";

const resolveUser = async (req, providedId) => {
    const candidateId = (req?.user && req.user.id) ? req.user.id : providedId;
    if (!candidateId || !mongoose.Types.ObjectId.isValid(candidateId)) {
        return null;
    }
    try {
        const user = await User.findOne({ firebaseUid });
        return user || null;
    } catch {
        return null;
    }
};

/**
 * Local ATS Analysis Controller
 * Removed OpenAI dependencies.
 */
export const analyzeATS = async (req, res) => {
    try {
        const { userId, resumeId, content, jobDescription } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        // Perform basic local extraction first to ground the AI
        const localAnalysis = await analyzeResumeATS(content, jobDescription);

        // Now enhance it with Groq AI for detailed structured insights
        const systemPrompt = `You are an expert ATS (Applicant Tracking System) algorithm and a senior technical recruiter.
Your task is to analyze the candidate's resume against the provided job description and generate a highly detailed, professional ATS match report.
Output MUST be a strict JSON object with the following structure:
{
  "atsScore": number (0-100),
  "matchProbability": string (e.g., "High", "Medium", "Low"),
  "missingSkills": string[] (array of missing keywords),
  "suggestedKeywords": string[] (array of keywords to add),
  "weakAreas": string[] (array of sections that need improvement),
  "improvementSuggestions": string[] (array of actionable tips),
  "scoringBreakdown": {
     "skillsMatch": number (0-100),
     "experienceMatch": number (0-100),
     "keywordDensity": number (0-100),
     "educationMatch": number (0-100),
     "resumeFormatting": number (0-100),
     "atsReadability": number (0-100)
  }
}
Do not hallucinate. Base your analysis STRICTLY on the provided resume content and job description.`;

        const userPrompt = `Job Description:\n${jobDescription || "None provided"}\n\nResume Content:\n${content}\n\nLocal Parsing Hints:\nScore: ${localAnalysis.atsScore}, Match Rate: ${localAnalysis.matchRate}`;

        const enhancedAnalysis = await generateStructuredAIResponse(userPrompt, systemPrompt);

        // Update resume in DB if resumeId is provided
        if (resumeId && resumeId !== "resume-draft") {
            try {
                const resume = await Resume.findById(resumeId);
                if (resume) {
                    resume.atsAnalysis = enhancedAnalysis;

                    // Add to history
                    resume.analysisHistory.push({
                        score: enhancedAnalysis.atsScore,
                        date: new Date()
                    });

                    if (resume.analysisHistory.length > 10) {
                        resume.analysisHistory = resume.analysisHistory.slice(-10);
                    }

                    await resume.save();
                }
            } catch (err) {
                console.error("Resume update error:", err);
            }
        }

        res.status(200).json({
            analysis: enhancedAnalysis,
            message: "Analyze successfully using AI ATS engine."
        });
    } catch (error) {
        console.error("ATS Analysis Error:", error);
        res.status(500).json({ message: error.message || "Failed to analyze resume" });
    }
};

// Deprecated or Localized AI endpoints (Removing OpenAI usage)
export const generateSummary = async (req, res) => {
  try {
    const {
      targetJobTitle,
      experienceLevel,
      yearsOfExperience,
      currentRole,
      keySkills,
      jobDescription,
    } = req.body;

    if (!targetJobTitle) {
      return res.status(400).json({
        message: "Target job title is required",
      });
    }

    const systemPrompt = `You are an expert resume writer and technical recruiter. The user wants 3 highly ATS-optimized professional summaries for their resume, along with a list of relevant skills. 
The output MUST be a strict JSON object with exactly four keys: "version_1", "version_2", "version_3", and "skills".
The summaries should be 3-4 sentences long, impactful, and tailored to the target role.
- version_1: Balanced and professional.
- version_2: Highly technical and skills-focused.
- version_3: Achievement and metrics-oriented.
- skills: An array of 8-15 most relevant technical skills for the role, prioritizing ATS keywords based on the Job Description, without duplicates.`;

    const userPrompt = `Generate 3 professional summaries and extract relevant skills.
Target Job Title: ${targetJobTitle}
Experience Level: ${experienceLevel}
Years of Experience: ${yearsOfExperience || "Not specified"}
Current Role: ${currentRole || "Not specified"}
Key Skills: ${keySkills || "Not specified"}
Target Job Description (for context): ${jobDescription || "Not provided"}`;

    const aiResponse = await generateStructuredAIResponse(userPrompt, systemPrompt);

    return res.status(200).json(aiResponse);

  } catch (error) {
    console.error("Summary generation error:", error);

    return res.status(500).json({
      message: "Failed to generate summary",
    });
  }
};

export const suggestSkills = async (req, res) => {
    try {
        const { targetRole, experience, projects, summary } = req.body;

        if (!targetRole) {
            return res.status(400).json({ message: "Target role is required" });
        }

        const systemPrompt = `You are an expert technical recruiter and ATS specialist. 
Your task is to analyze the user's details and generate a comprehensive, categorized list of skills tailored for the target role.
The output MUST be a strict JSON object with exactly four keys: "technical", "soft", "tools", and "frameworks".
Each key should contain an array of string values representing the skills (e.g., ["React", "Node.js"]).
Ensure the skills are relevant, avoid duplicate buzzwords, and prioritize ATS-friendly keywords.`;

        const userPrompt = `Target Role: ${targetRole}
Experience Context: ${experience || "None"}
Projects Context: ${projects || "None"}
Summary Context: ${summary || "None"}`;

        const skills = await generateStructuredAIResponse(userPrompt, systemPrompt);

        return res.status(200).json(skills);
    } catch (error) {
        console.error("Skill suggestion error:", error);
        return res.status(500).json({ message: "Failed to suggest skills" });
    }
};

export const generateCoverLetter = async (req, res) => {
    try {
        const { jobTitle, companyName, jobDescription, tone } = req.body;

        if (!jobTitle) {
            return res.status(400).json({ message: "Job title is required" });
        }

        const systemPrompt = `You are an expert career coach and professional copywriter. 
Your task is to write a highly effective, ATS-optimized cover letter.
The tone of the letter should be: ${tone || "Professional"}.
Do not include placeholder brackets like [Your Name] or [Date], just write the core content of the letter starting from the greeting (e.g., Dear Hiring Manager,) to the sign-off (e.g., Sincerely,).
Ensure the letter highlights alignment between the candidate and the target role/company.`;

        const userPrompt = `Job Title: ${jobTitle}
Company Name: ${companyName || "the company"}
Job Description: ${jobDescription || "Not provided"}`;

        const coverLetterContent = await generateAIResponse({ userPrompt, systemPrompt });

        return res.status(200).json({ content: coverLetterContent });
    } catch (error) {
        console.error("Cover letter generation error:", error);
        return res.status(500).json({ message: "Failed to generate cover letter" });
    }
};

export const generateSummaryThree = async (req, res) => {
    res.status(501).json({ message: "Disabled." });
};

export const improveSummary = async (req, res) => {
    res.status(501).json({ message: "Disabled." });
};

export const analyzeSkillGap = async (req, res) => {
    try {
        const { resumeSkills, jobDescription } = req.body;
        if (!resumeSkills || !jobDescription) {
            return res.status(400).json({ message: "resumeSkills and jobDescription are required" });
        }

        const systemPrompt = `You are an expert technical recruiter and ATS specialist. 
Your task is to analyze the candidate's existing skills against the provided job description.
The output MUST be a strict JSON object with exactly three keys: "matchingSkills", "missingSkills", and "score".
- matchingSkills: An array of strings representing skills from the resume that match the job description.
- missingSkills: An array of strings representing important skills from the job description that are missing from the resume.
- score: An integer from 0 to 100 representing how well the skills match the job description (100 being perfect match).`;

        const userPrompt = `Resume Skills: ${Array.isArray(resumeSkills) ? resumeSkills.join(", ") : resumeSkills}
Job Description: ${jobDescription}`;

        const analysis = await generateStructuredAIResponse(userPrompt, systemPrompt);

        return res.status(200).json(analysis);
    } catch (error) {
        console.error("Skill gap analysis error:", error);
        return res.status(500).json({ message: "Failed to analyze skill gap" });
    }
};

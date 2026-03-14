import User from "../models/User.js";
import Resume from "../models/Resume.js";
import { analyzeResumeATS } from "../services/ats.service.js";
import mongoose from "mongoose";
import { generateSummaries } from "../utils/summaryGenerator.js";

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

        // Perform ATS Analysis using the new local service
        const analysisResults = await analyzeResumeATS(content, jobDescription);

        // Update resume in DB if resumeId is provided
        if (resumeId && resumeId !== "resume-draft") {
            try {
                const resume = await Resume.findById(resumeId);
                if (resume) {
                    resume.atsAnalysis = analysisResults;

                    // Add to history
                    resume.analysisHistory.push({
                        score: analysisResults.atsScore,
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
            analysis: analysisResults,
            message: "Analyze successfully using local ATS engine."
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

    // NEW LOGIC (NO OPENAI)
    const summaries = generateSummaries({
      targetJobTitle,
      experienceLevel,
      yearsOfExperience,
      currentRole,
      keySkills,
      jobDescription,
    });

    return res.status(200).json(summaries);

  } catch (error) {
    console.error("Summary generation error:", error);

    return res.status(500).json({
      message: "Failed to generate summary",
    });
  }
};

export const generateSummaryThree = async (req, res) => {
    res.status(501).json({ message: "AI Summary generation is currently disabled. Using local ATS analyzer." });
};

export const improveSummary = async (req, res) => {
    res.status(501).json({ message: "AI Improvement is currently disabled. Using local ATS analyzer." });
};

export const suggestSkills = async (req, res) => {
    res.status(501).json({ message: "AI Skill suggestion is currently disabled. Using local ATS analyzer." });
};

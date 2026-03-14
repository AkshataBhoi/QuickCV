import mongoose from "mongoose";
import ATSReport from "../models/ATSReport.js";
import Resume from "../models/Resume.js";
import { extractTextFromBuffer } from "../utils/textParser.js";
import { calculateATSScore } from "../utils/scoreCalculator.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Helper to get ownerId from request
const getOwnerId = (req) => {
  const ownerId = req.user?._id;
  if (!ownerId) {
    throw new ApiError(401, "Unauthorized: Please login or provide a user ID");
  }
  return ownerId;
};

/**
 * @desc Upload resume and extract text
 * @route POST /api/ats/upload
 */
export const uploadResumeForATS = async (req, res) => {
  try {
    const ownerId = getOwnerId(req);

    if (!req.file) {
      return res.status(400).json(new ApiError(400, "No file uploaded"));
    }

    const extractedText = await extractTextFromBuffer(
      req.file.buffer,
      req.file.mimetype,
    );

    // Create a new resume record for this upload
    const resume = await Resume.create({
      ownerId,
      title: req.file.originalname,
      content: { rawText: extractedText },
      type: "resume",
      isDraft: false,
      status: "ATS_SCAN",
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          {
            resumeId: resume._id,
            text: extractedText,
            file: {
              id: resume._id,
              name: resume.title,
              status: resume.status,
              createdAt: resume.createdAt
            }
          },
          "Resume uploaded and text extracted successfully",
        ),
      );
  } catch (error) {
    console.error("ATS Upload Error:", error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: error.message || "Failed to process resume upload" });
  }
};

/**
 * @desc Analyze resume against job description
 * @route POST /api/ats/analyze
 */
export const analyzeATS = async (req, res) => {
  try {
    const ownerId = getOwnerId(req);
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res
        .status(400)
        .json(new ApiError(400, "Resume ID and Job Description are required"));
    }

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res
        .status(400)
        .json(new ApiError(400, `Invalid Resume ID format: ${resumeId}`));
    }

    // Verify resume ownership
    const resume = await Resume.findOne({ _id: resumeId, ownerId });
    if (!resume) {
      return res.status(404).json(new ApiError(404, "Resume not found or access denied"));
    }

    let resumeText = "";
    if (typeof resume.content === "string") {
      resumeText = resume.content;
    } else if (resume.content?.rawText) {
      resumeText = resume.content.rawText;
    } else {
      const c = resume.content;
      resumeText = [
        c.summary || "",
        ...(c.experience || []).map(
          (e) => `${e.role} ${e.company} ${e.description}`,
        ),
        ...(c.skills || []),
        ...(c.education || []).map((e) => `${e.school} ${e.degree}`),
      ].join(" ");
    }

    const analysisResults = await calculateATSScore(resumeText, jobDescription, resume.title);

    const reportData = {
      ownerId,
      resumeId: resume._id,
      jobDescription,
      atsScore: analysisResults.atsComplianceScore,
      keywordScore: analysisResults.keywordScore,
      readabilityScore: analysisResults.readabilityScore,
      matchedKeywords: analysisResults.matchedKeywords,
      missingKeywords: analysisResults.missingKeywords,
      suggestions: analysisResults.suggestions.map(s => ({ suggestion: s })),
      improvements: analysisResults.improvements,
      resumeName: resume.title
    };

    const report = await ATSReport.create(reportData);

    resume.atsAnalysis = {
      overallScore: analysisResults.atsComplianceScore,
      jobMatchScore: analysisResults.keywordScore,
      readabilityScore: analysisResults.readabilityScore,
      lastAnalyzed: new Date(),
    };
    await resume.save();

    const responseSchema = {
      atsComplianceScore: analysisResults.atsComplianceScore,
      skillsScore: analysisResults.skillsScore,
      keywordScore: analysisResults.keywordScore,
      formattingScore: analysisResults.formattingScore,
      readabilityScore: analysisResults.readabilityScore,
      suggestions: analysisResults.suggestions
    };

    return res
      .status(200)
      .json(
        new ApiResponse(200, responseSchema, "ATS Analysis completed successfully"),
      );
  } catch (error) {
    console.error("ATS Analysis Error:", error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: error.message || "Failed to perform ATS analysis" });
  }
};

/**
 * @desc Get all ATS reports for a specific resume
 * @route GET /api/ats/report/:resumeId
 */
export const getATSReports = async (req, res) => {
  try {
    const ownerId = getOwnerId(req);
    const { resumeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res
        .status(400)
        .json(new ApiError(400, `Invalid Resume ID format: ${resumeId}`));
    }

    // Verify ownership indirectly by checking if resume exists for this owner
    const resumeExists = await Resume.exists({ _id: resumeId, ownerId });
    if (!resumeExists) {
      return res.status(404).json(new ApiError(404, "Resume not found or access denied"));
    }

    const reports = await ATSReport.find({ resumeId, ownerId }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json(
        new ApiResponse(200, reports, "ATS reports retrieved successfully"),
      );
  } catch (error) {
    console.error("Get ATS Reports Error:", error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Failed to fetch ATS reports" });
  }
};

/**
 * @desc Get the latest ATS report for a specific resume
 * @route GET /api/ats/report/:resumeId/latest
 */
export const getLatestATSReport = async (req, res) => {
  try {
    const ownerId = getOwnerId(req);
    const { resumeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res
        .status(400)
        .json(new ApiError(400, `Invalid Resume ID format: ${resumeId}`));
    }

    const report = await ATSReport.findOne({ resumeId, ownerId }).sort({
      createdAt: -1,
    });

    if (!report) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "No ATS report found for this resume"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          report,
          "Latest ATS report retrieved successfully",
        ),
      );
  } catch (error) {
    console.error("Get Latest ATS Report Error:", error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Failed to fetch latest ATS report" });
  }
};

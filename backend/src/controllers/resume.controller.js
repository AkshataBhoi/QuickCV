import Resume from "../models/Resume.js";
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

// @desc Save or Update Resume
// @route POST /api/resume
export const saveResume = async (req, res) => {
    try {
        const ownerId = getOwnerId(req);
        const { id, title, content, templateId, jobDescription, type } = req.body;

        if (!title || !content) {
            throw new ApiError(400, "Missing title or content");
        }

        let resume;
        if (id && id !== "resume-draft" && id !== "undefined") {
            // Update existing only if it belongs to this user
            resume = await Resume.findOneAndUpdate(
                { _id: id, ownerId },
                { content, title, templateId, jobDescription, type, isDraft: false },
                { new: true }
            );

            if (!resume) {
                return res.status(403).json(new ApiError(403, "Access denied or resume not found"));
            }
        } else {
            // Create new
            resume = await Resume.create({
                ownerId,
                title,
                content,
                templateId: templateId || "clean",
                jobDescription: jobDescription || "",
                type: type || "resume",
                isDraft: false
            });
        }

        return res.status(201).json(
            new ApiResponse(201, resume, "Resume saved successfully")
        );

    } catch (error) {
        console.error("Save Resume Error:", error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// @desc Get all resumes for the current user
// @route GET /api/resume
export const getAllResumes = async (req, res) => {
    try {
        const ownerId = getOwnerId(req);
        const resumes = await Resume.find({ ownerId }).sort({ updatedAt: -1 });

        return res.status(200).json(
            new ApiResponse(200, resumes, "Resumes fetched successfully")
        );
    } catch (error) {
        console.error("Fetch All Resumes Error:", error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: error.message || "Failed to fetch resumes" });
    }
};

// @desc Get resume by ID (verified by owner)
// @route GET /api/resume/:id
export const getResumeById = async (req, res) => {
    try {
        const ownerId = getOwnerId(req);
        const { id } = req.params;

        const resume = await Resume.findOne({ _id: id, ownerId });

        if (!resume) {
            return res.status(404).json(new ApiError(404, "Resume not found or access denied"));
        }

        return res.status(200).json(
            new ApiResponse(200, resume, "Resume fetched successfully")
        );
    } catch (error) {
        console.error("Get Resume Error:", error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// @desc Get resume for printing — PUBLIC (no auth, opens in new tab)
// @route GET /api/resume/:id/print
export const getResumeForPrint = async (req, res) => {
    try {
        const { id } = req.params;

        // Only return fields needed for rendering, no sensitive owner info
        const resume = await Resume.findById(id).select("content templateId title type isDraft");

        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }

        return res.status(200).json(
            new ApiResponse(200, resume, "Resume fetched for print")
        );
    } catch (error) {
        console.error("Get Resume For Print Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// @desc Delete resume (verified by owner)
// @route DELETE /api/resume/:id
export const deleteResume = async (req, res) => {
    try {
        const ownerId = getOwnerId(req);
        const { id } = req.params;

        const resume = await Resume.findOneAndDelete({ _id: id, ownerId });

        if (!resume) {
            return res.status(404).json(new ApiError(404, "Resume not found or access denied"));
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Resume deleted successfully")
        );
    } catch (error) {
        console.error("Delete Resume Error:", error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// @desc Get resumes for a specific user (legacy, now handled by getAllResumes)
// @route GET /api/resume/user/:userId
export const getUserResumes = async (req, res) => {
    return getAllResumes(req, res);
};

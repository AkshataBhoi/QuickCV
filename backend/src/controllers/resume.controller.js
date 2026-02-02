import Resume from "../models/Resume.js";

// @desc Save or Update Resume
// @route POST /api/resume
export const saveResume = async (req, res) => {
    try {
        const { id, title, content, templateId } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Missing title or content" });
        }

        let resume;
        if (id && id !== "resume-draft" && id !== "undefined") {
            // Update existing
            resume = await Resume.findByIdAndUpdate(
                id,
                { content, title, templateId, isDraft: false },
                { new: true }
            );
        }

        if (!resume) {
            // Create new
            resume = await Resume.create({
                title,
                content,
                templateId: templateId || "clean",
                isDraft: false
            });
        }

        return res.status(201).json({
            success: true,
            data: resume,
            message: "Resume saved successfully"
        });

    } catch (error) {
        console.error("Save Resume Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc Get all resumes (Auth-less fallback)
// @route GET /api/resume
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ updatedAt: -1 });
        return res.status(200).json({
            success: true,
            data: resumes
        });
    } catch (error) {
        console.error("Fetch All Resumes Error:", error);
        return res.status(500).json({ message: "Failed to fetch resumes" });
    }
};

// @desc Get resume by ID
// @route GET /api/resume/:id
export const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await Resume.findById(id);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error("Get Resume Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc Delete resume
// @route DELETE /api/resume/:id
export const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await Resume.findByIdAndDelete(id);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully"
        });
    } catch (error) {
        console.error("Delete Resume Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Legacy support (redirects to getAllResumes)
export const getUserResumes = getAllResumes;

import express from "express";
import multer from "multer";
import { uploadAndParseFile } from "../controllers/file.controller.js";
import {
    getAllResumes as getAllFiles,
    getResumeById as getFileById,
    saveResume as createFile,
    deleteResume as deleteFile
} from "../controllers/resume.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Manage files (alias for resumes for Dashboard consistency)
router.get("/", authMiddleware, getAllFiles);
router.get("/:id", authMiddleware, getFileById);
router.post("/", authMiddleware, createFile);
router.delete("/:id", authMiddleware, deleteFile);

// Legacy/Utility parsing
router.post("/upload", authMiddleware, upload.single("resume"), uploadAndParseFile);

export default router;

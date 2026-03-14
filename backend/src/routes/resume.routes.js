import express from "express";
import {
    saveResume,
    getUserResumes,
    getAllResumes,
    getResumeById,
    getResumeForPrint,
    deleteResume
} from "../controllers/resume.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveResume);
router.get("/", authMiddleware, getAllResumes);
router.get("/user/:userId", authMiddleware, getUserResumes);

// Public route for the print/download page (no auth needed — opens in new tab)
router.get("/:id/print", getResumeForPrint);

router.get("/:id", authMiddleware, getResumeById);
router.delete("/:id", authMiddleware, deleteResume);

export default router;

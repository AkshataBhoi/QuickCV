import express from "express";
import multer from "multer";
import {
  uploadResumeForATS,
  analyzeATS,
  getATSReports,
  getLatestATSReport,
} from "../controllers/ats.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Multer storage setup (using memory storage for processing buffers)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/msword"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF and DOCX are allowed."), false);
    }
  },
});

// @route POST /api/ats/upload
router.post("/upload", authMiddleware, upload.single("resume"), uploadResumeForATS);

// @route POST /api/ats/analyze
router.post("/analyze", authMiddleware, analyzeATS);

// @route GET /api/ats/report/:resumeId
router.get("/report/:resumeId", authMiddleware, getATSReports);

// @route GET /api/ats/report/:resumeId/latest
router.get("/report/:resumeId/latest", authMiddleware, getLatestATSReport);

export default router;

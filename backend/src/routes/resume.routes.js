import express from "express";
import {
    saveResume,
    getUserResumes,
    getAllResumes,
    getResumeById,
    deleteResume
} from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/", saveResume);
router.get("/", getAllResumes); // New Auth-less route
router.get("/user/:userId", getUserResumes);
router.get("/:id", getResumeById);
router.delete("/:id", deleteResume);

export default router;

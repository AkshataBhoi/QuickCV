import express from "express";
import { 
  improveSummary,
  suggestSkills,
  analyzeATS,
  generateSummary,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/resume/summary", improveSummary);
// router.post("/resume/generate-summaries", generateSummaries);
router.post("/generate-summary", generateSummary);
router.post("/resume/skills", suggestSkills);
router.post("/resume/analyze-ats", analyzeATS);

export default router;
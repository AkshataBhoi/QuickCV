import express from "express";
import { 
  improveSummary,
  suggestSkills,
  analyzeATS,
  generateSummary,
  generateCoverLetter,
  analyzeSkillGap
} from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/resume/summary", improveSummary);
// router.post("/resume/generate-summaries", generateSummaries);
router.post("/generate-summary", generateSummary);
router.post("/resume/skills", suggestSkills);
router.post("/resume/analyze-ats", analyzeATS);
router.post("/cover-letter", generateCoverLetter);
router.post("/skill-gap", analyzeSkillGap);

export default router;
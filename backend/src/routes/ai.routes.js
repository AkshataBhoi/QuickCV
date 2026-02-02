import express from "express";
import { improveSummary, suggestSkills } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/resume/summary", improveSummary);
router.post("/resume/skills", suggestSkills);

export default router;

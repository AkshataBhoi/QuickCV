import express from "express";
import { updateProfile, getProfile, upgradeDemo } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/upgrade-demo", authMiddleware, upgradeDemo);

export default router;

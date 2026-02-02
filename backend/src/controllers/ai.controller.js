import User from "../models/User.js";
import { generateSummary, extractSkills } from "../services/openai.service.js";

const getOrCreateUser = async (userId) => {
    let user = await User.findById(userId);
    if (!user) {
        // Fallback for demo: create user if not found
        user = await User.create({
            _id: userId,
            email: "demo@example.com",
            name: "Demo User",
            aiUsage: { summaryGenerations: 0, skillSuggestions: 0 }
        });
    }
    return user;
};


export const improveSummary = async (req, res) => {
    try {
        const { userId, jobTitle, experienceLevel, jobDescription } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await getOrCreateUser(userId);

        const dailyLimit = parseInt(process.env.AI_DAILY_LIMIT) || 10;

        if (user.aiUsage.summaryGenerations >= dailyLimit) {
            return res.status(429).json({
                code: "AI_LIMIT_REACHED",
                message: "AI usage limit reached. Try again tomorrow.",
            });
        }

        const summary = await generateSummary({
            jobTitle,
            experienceLevel,
            jobDescription,
        });

        user.aiUsage.summaryGenerations += 1;
        await user.save();

        res.status(200).json({ summary });
    } catch (error) {
        console.error("AI Improvement Error:", error);
        res.status(500).json({ message: error.message || "Failed to improve summary" });
    }
};

export const suggestSkills = async (req, res) => {
    try {
        const { userId, jobDescription } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await getOrCreateUser(userId);

        const dailyLimit = parseInt(process.env.AI_DAILY_LIMIT) || 10;

        if (user.aiUsage.skillSuggestions >= dailyLimit) {
            return res.status(429).json({
                code: "AI_LIMIT_REACHED",
                message: "AI usage limit reached. Try again tomorrow.",
            });
        }

        const skills = await extractSkills({ jobDescription });

        user.aiUsage.skillSuggestions += 1;
        await user.save();

        res.status(200).json({ skills });
    } catch (error) {
        console.error("AI Skills Suggestion Error:", error);
        res.status(500).json({ message: error.message || "Failed to suggest skills" });
    }
};

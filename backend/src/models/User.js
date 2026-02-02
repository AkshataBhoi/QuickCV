import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    name: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    usage: {
      resumesCreated: {
        type: Number,
        default: 0,
      },
      coverLettersCreated: {
        type: Number,
        default: 0,
      },
      aiGenerationsUsed: {
        type: Number,
        default: 0,
      },
    },
    aiUsage: {
      summaryGenerations: { type: Number, default: 0 },
      skillSuggestions: { type: Number, default: 0 },
    },

    guestIds: [
      {
        type: String, // used to merge guest resumes later
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);

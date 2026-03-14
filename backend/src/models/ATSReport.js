import mongoose from "mongoose";

const atsReportSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String, // Changed to String to support Firebase UID
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    keywordScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    readabilityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    matchedKeywords: [String],
    missingKeywords: [String],
    suggestions: [
      {
        issue: String,
        suggestion: String,
      },
    ],
    improvements: [
      {
        title: String,
        description: String,
      },
    ],
    resumeName: String,
  },
  { timestamps: true }
);

export default mongoose.model("ATSReport", atsReportSchema);

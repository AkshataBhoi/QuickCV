import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String, // Changed from ObjectId to String to support guest session IDs safely
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "Untitled Resume",
    },
    templateId: {
      type: String,
      default: "clean",
    },
    jobDescription: {
      type: String,
      default: "",
    },
    content: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      enum: ["resume", "cover-letter"],
      default: "resume",
      index: true,
    },
    status: {
      type: String,
      enum: ["DRAFT", "ATS_SCAN", "COMPLETED"],
      default: "DRAFT",
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    atsAnalysis: {
      overallScore: { type: Number, default: 0 },
      jobMatchScore: { type: Number, default: 0 },
      readabilityScore: { type: Number, default: 0 },
      structureScore: { type: Number, default: 0 },
      metricsScore: { type: Number, default: 0 },
      grammarScore: { type: Number, default: 0 },
      completenessScore: { type: Number, default: 0 },
      tone: { type: String, default: "Professional" },
      strengths: [{ type: mongoose.Schema.Types.Mixed }], // support string or object
      improvements: [{ type: mongoose.Schema.Types.Mixed }], // support multiple shapes
      missingKeywords: [String],
      detectedKeywords: [String],
      metricsFound: { type: Boolean, default: false },
      metricsDetected: { type: Boolean, default: false },
      passiveVoiceIssues: { type: Number, default: 0 },
      passiveVoiceSentences: { type: Number, default: 0 },
      lastAnalyzed: { type: Date }
    },
    atsHash: { type: String }, // cache key for content+JD
    analysisHistory: [{
      score: Number,
      date: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);

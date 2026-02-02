import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
    },
    title: {
      type: String,
      default: "Untitled Resume",
    },
    templateId: {
      type: String,
      default: "clean",
    },
    content: {
      type: Object,
      required: true,
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);

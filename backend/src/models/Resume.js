import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String, // guestId or userId
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
    },

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      portfolio: String,
      website: String,
    },
    summary: String,
    skills: [String],
    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        descriptions: [String],
      },
    ],
    projects: [
      {
        name: String,
        techStack: [String],
        descriptions: [String],
        link: String,
      },
    ],
    education: [
      {
        institute: String,
        degree: String,
        startYear: String,
        endYear: String,
      },
    ],
    certifications: [{ title: String, issuer: String, year: String }],
    achievements: [String],
    languages: [{ language: String, proficiency: String }],

    templateId: {
      type: String,
      default: "default",
    },

    isDraft: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);

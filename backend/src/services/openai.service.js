import OpenAI from "openai";
import "../config/env.js"; // 👈 MUST be first import

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  //   console.log("OPENAI KEY LOADED:", process.env.OPENAI_API_KEY?.startsWith("sk-"))
});

export const generateSummary = async ({
  jobTitle,
  experienceLevel,
  jobDescription,
}) => {
  const prompt = `
You are a senior technical recruiter and professional resume writer.

STRICT TASK:
Generate a professional resume summary that is DIRECTLY DERIVED from the given job description.
If the job description changes, the output MUST change significantly.

INPUT:
Target Role: ${jobTitle}
Experience Level: ${experienceLevel}

JOB DESCRIPTION:
${jobDescription}

RULES (MANDATORY):
- 3–4 lines only
- Use keywords ONLY from the job description
- Do NOT invent skills or tools not mentioned
- No first-person words (I, me, my)
- ATS-optimized
- Professional, realistic tone
- Avoid generic phrases like "highly motivated" or "results-driven"

If job description is weak, infer cautiously but do NOT hallucinate.

Return ONLY the summary text.
`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
  });

  return response.choices[0].message.content.trim();
};

export const extractSkills = async ({ jobDescription }) => {
  const prompt = `
You are an expert technical recruiter.

Task:
Extract the most relevant professional skills from the given job description.

Job description:
${jobDescription}

Rules:
- Return 8 to 15 skills
- Skills must be concise (1–3 words)
- Prefer hard skills and tools over soft skills
- No explanations
- No duplicates

Return the result as a JSON array of strings.
`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  try {
    const content = response.choices[0].message.content.trim();
    // In case AI returns markdown backticks
    const jsonStr = content
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error parsing skills JSON:", error);
    return [];
  }
};

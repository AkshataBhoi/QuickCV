# QuickCV: Technical Overview & AI Integration Guide

This document serves as a comprehensive guide for AI assistants and developers to understand the QuickCV project architecture and seamlessly integrate advanced AI capabilities using external APIs (like Groq or OpenRouter).

## 1. Frontend Architecture

*   **Framework/Library:** Next.js 15+ (React 19) using the **App Router** (`app/` directory).
*   **Styling Library:** Tailwind CSS (v4), configured via `globals.css` and PostCSS. Additional UI libraries include `lucide-react` for icons and `framer-motion` for animations. `sonner` is used for toast notifications.
*   **Folder Structure:**
    *   `app/`: Contains the main routes (e.g., `(auth)`, `builder`, `dashboard`, `payment`, `print`).
    *   `components/`: Highly modularized UI elements divided into subfolders (`auth`, `builder`, `dashboard`, `templates`, `modals`, `ui`).
    *   `context/`: Contains React Context providers like `AuthContext.tsx`.
    *   `lib/`: Utility functions.
    *   `hooks/`: Custom React hooks.
*   **Components:**
    *   **Builder Components:** `AISkillsModal.tsx`, `AISummaryModal.tsx`, `FormSection.tsx`, `ChangeTemplateDialog.tsx`, `CoverLetterPreview.tsx`.
    *   **Templates:** Managed via `TemplateSelector.tsx` located in `components/builder/`.
*   **State Management:** React Context API (e.g., `AuthContext.tsx` for authentication state). 
*   **Routing:** Handled entirely by the Next.js App Router (file-system based routing in the `app/` directory).
*   **Resume Preview System:** Uses dual mechanisms:
    *   DOM-based preview: `ResumePreview.tsx`.
    *   PDF rendering: `ResumePreviewPDF.tsx` using `@react-pdf/renderer` or `html2pdf.js` for export.
*   **Forms Used:** Forms are encapsulated within the `components/builder/FormSection.tsx` component, likely handling sections like Experience, Education, Skills, etc.

## 2. Backend Architecture

*   **Server Structure:** Node.js with Express.js backend. Entry point is `src/app.js` (middleware setup) and `src/server.js` (listener).
*   **Database:** MongoDB via Mongoose.
*   **Database Schema (Models):**
    *   `User.js`: Stores user details and Firebase UID mapping.
    *   `Resume.js`: Stores the JSON structure of a user's resume, template choices, and analysis history (`atsAnalysis`).
    *   `ATSReport.js`: Stores ATS parsing results.
*   **Authentication System:** Firebase Admin SDK on the backend (`auth.middleware.js`), validating tokens sent by the frontend Firebase client.
*   **APIs Currently Available:**
    *   `/api/ai/*`: Stubbed/Local AI features.
    *   `/api/resume/*`: Resume CRUD operations.
    *   `/api/files/*`: Handling file uploads (images).
    *   `/api/ats/*`: Upload and analyze resume against ATS.
    *   `/api/users/*`: User management.
*   **Controllers:** Segmented by domain: `ai.controller.js`, `ats.controller.js`, `resume.controller.js`, `user.controller.js`, `file.controller.js`.
*   **Middleware:** Standard CORS, Express Body Parser (limit: 50mb), and `authMiddleware` for protecting routes.
*   **PDF Generation Logic:** The backend parses uploaded PDFs and DOCX files for ATS using `multer` (in-memory storage), `pdf-parse`, and `mammoth` (for DOCX).

## 3. Current Features

*   **Resume Creation:** Real-time form filling and previewing in the `/builder` route.
*   **Authentication:** Sign-in/Sign-up protected routes using Firebase.
*   **Multiple Templates:** Dynamic template selection on the frontend.
*   **PDF Export:** Client-side generation and downloading of resumes as PDFs.
*   **Theme Customization:** Dark/Light mode supported via `next-themes`.
*   **User Dashboard:** Manage multiple resumes and view ATS reports in `/dashboard`.
*   **ATS Parsing System:** Local heuristic-based ATS parsing and scoring without an LLM (accepts PDF/DOCX).
*   **AI Modals (UI Only):** The frontend has UI components (`AISummaryModal.tsx`, `AISkillsModal.tsx`) ready to trigger AI features.

## 4. AI Integration Readiness

The project is **highly ready** for LLM integration. The foundation is solidly built, with explicit placeholders left by previous development phases.

*   **Best Place to Integrate AI:** The `backend/src/controllers/ai.controller.js` is the exact injection point. Currently, functions like `improveSummary`, `suggestSkills`, and `generateSummaryThree` are either throwing a `501 Not Implemented` or using a local static script (`../utils/summaryGenerator.js`).
*   **Which Components Should Connect:** Frontend modals (`AISummaryModal.tsx`, `AISkillsModal.tsx` in `components/builder/`) should dispatch requests to the updated `/api/ai` endpoints.
*   **APIs Needed:** You need to refactor the endpoints in `backend/src/routes/ai.routes.js`:
    *   `POST /api/ai/resume/summary` (Improve summary via Groq)
    *   `POST /api/ai/resume/skills` (Suggest skills based on Job Description)
    *   `POST /api/ai/resume/analyze-ats` (Upgrade local parsing to Groq-powered deep analysis)
*   **Database Changes:** 
    *   The `Resume` schema already has an `analysisHistory` and `atsAnalysis` field.
    *   If you implement Cover Letters, you will need to add a `coverLetter` string field to `Resume.js` or create a new `CoverLetter.js` model.
*   **Architecture Support:** The decoupled nature of the app (Frontend UI -> Express Routes -> Controllers -> Services) perfectly supports injecting a new `src/services/ai.service.js` which interfaces with Groq/OpenRouter.

## 5. Technical Summary

*   **Tech Stack:** MERN Stack + Next.js App Router (React 19) + Firebase Auth + Tailwind CSS v4.
*   **Architecture:** Monorepo style but physically separated (Frontend in root, Backend in `/backend`). RESTful API communication.
*   **Major Modules:** Resume Builder, ATS Analyzer (Local), Authentication, File Uploads.
*   **Current Completion Stage:** The application is functionally complete for a standard resume builder (CRUD, Auth, Export).
*   **Missing Features:** The actual "AI" brain. The backend previously had OpenAI integrated but it was stripped out/disabled. It needs a replacement LLM provider like Groq.

## 6. Suggested AI Features (Ideal for Groq/OpenRouter)

1.  **AI ATS Matcher & Scorer:** Compare the user's resume JSON against a Job Description string. Return a score (0-100) and missing keywords.
2.  **Action Verb Enhancer (Bullet Point Improver):** Take standard bullet points (e.g., "Made a new feature") and use AI to transform them using the STAR method (e.g., "Spearheaded the development of a new feature resulting in 20% increase in user engagement").
3.  **Tailored Summary Generation:** Generate 3 options for a professional summary based on the parsed resume data.
4.  **Cover Letter Generator:** Automatically generate a formatted cover letter using the `Resume` data and a provided Job Description. (Frontend `CoverLetterPreview.tsx` already exists!).
5.  **Skill Gap Analysis:** Highlight skills the candidate is missing based on the target job title.

## 7. Deployment Readiness

*   **Frontend:** Ready for Vercel. Contains `next.config.ts`, `eslint.config.mjs`, and `postcss.config.mjs`.
*   **Backend:** Ready for Render / Railway / Heroku. Contains `package.json` with standard `start` script, relies on `.env` for secrets (MongoDB URI, Firebase credentials, future Groq API keys).
*   **CORS:** Backend `app.js` has a robust CORS whitelist set up for production and local development.

import express from "express"
import cors from "cors"
import aiRoutes from "./routes/ai.routes.js"
import resumeRoutes from "./routes/resume.routes.js"
import fileRoutes from "./routes/file.routes.js"
import atsRoutes from "./routes/ats.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))

const allowedOrigins = [
  "http://localhost:3000",
  "https://quick-cv-xi.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-user-id"]
  })
);

app.options("*", cors()); // handle preflight


app.get("/api/health", (_, res) => {
    res.status(200).json({ Status: "OK" })
})
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/users", userRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || []
    });
});

export default app;

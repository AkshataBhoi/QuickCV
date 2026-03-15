import express from "express"
import cors from "cors"
import aiRoutes from "./routes/ai.routes.js"
import resumeRoutes from "./routes/resume.routes.js"
import fileRoutes from "./routes/file.routes.js"
import atsRoutes from "./routes/ats.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express()
const PORT = process.env.PORT || 5000

// 🔥 1. NUCLEAR OPTIONS HANDLER FIRST
app.options("*", (req, res) => {
  console.log(`✅ OPTIONS ${req.path} from ${req.get('Origin')}`);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-User-Id');
  res.status(200).end();
});

// 🔥 2. SINGLE CORS - BEFORE EVERYTHING ELSE
const whitelist = [
  'https://quick-cv-xi.vercel.app',
  'http://localhost:5000'
];

app.use(cors({
  origin: (origin, callback) => {
    console.log(`🌐 CORS check for origin: ${origin}`);
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Id'],
  preflightContinue: false
}));

// 🔥 3. Body parsers AFTER CORS
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 🔥 4. Health check
app.get("/api/health", (_, res) => {
  console.log('✅ Health check OK');
  res.status(200).json({ Status: "OK", timestamp: new Date().toISOString() });
});

// 🔥 5. Routes
app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/users", userRoutes);

// 🔥 6. SINGLE Error Handler LAST
app.use((err, req, res, next) => {
  console.error("🚨 GLOBAL ERROR:", err.message, err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? (statusCode === 500 ? 'Internal Server Error' : err.message)
    : err.message;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/api/health`);
});

export default app;
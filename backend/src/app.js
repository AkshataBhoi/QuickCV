import express from "express"
import cors from "cors"
import aiRoutes from "./routes/ai.routes.js"
import resumeRoutes from "./routes/resume.routes.js"

const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))

app.get("/api/health", (_, res) => {
    res.status(200).json({ Status: "OK" })
})

app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);

export default app;

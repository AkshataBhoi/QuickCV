import "./config/env.js"
import app from "./app.js"
import connectDB from "./config/db.js"

connectDB()

import cors from "cors";

app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://quick-cv-xi.vercel.app"
    ],
    credentials: true
  })
);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})
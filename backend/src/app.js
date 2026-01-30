import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json({limit:"16kb"}))

app.get("/api/health",(_,res)=>{
    res.status(200).json({Status:"OK"})
})

export default app;

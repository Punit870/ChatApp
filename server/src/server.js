import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import { connectDB } from "./lib/db.js";
import messageRouter from "./routes/message.route.js"
import cors from "cors";
import {app,server} from "./lib/socket.js"

import path from "path"


app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_ORIGIN,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

const PORT=process.env.PORT||4000

const __dirname=path.resolve();



app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);


// Static serving is handled by Vercel for the client build output; keep API only.

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})


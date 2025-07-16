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
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const PORT=process.env.PORT||4000

const __dirname=path.resolve();



app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../client/dist")));
    
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"));
    })
}

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})


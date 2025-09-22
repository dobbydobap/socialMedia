import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express();
const PORT = 8000;
// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());

//authentication routes
app.use('/api/auth',authRouter)
app.use("/api/user", userRouter);

connectDB() 

app.get('/', ( req,res) =>{
    res.send('Hello from social server!')
})

app.listen(PORT,()=>{
    console.log(`Social server is running on port ${PORT}`);
})

//config .env file
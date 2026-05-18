import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRouter'
import auth from './routes/authRouter'
import admin from './routes/adminRouter'
import connectDB from './config/db'
import { connectRedis } from './config/redis' 
import "reflect-metadata";
import { errorHandler } from './middleware/errorHandler'
import cookieParser from "cookie-parser";
const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/test", (req, res) => {
    console.log("🔥 TEST ROUTE HIT");
    res.send("OKkjkjjkk");
});
// app.use(cors({
//   origin: 'http://localhost:5173', 
//   credentials: true                
// }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use('/auth',auth)
app.use('/admin',admin)
app.use('/',userRouter)
app.use(errorHandler)
async function start(){
    connectDB()
    connectRedis()

}
start()
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started port :${PORT}`)
})


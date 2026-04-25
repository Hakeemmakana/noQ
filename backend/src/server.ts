import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import userRouter from './routes/userRouter'
import auth from './routes/authRouter'
import restaurantAdminRouter from './routes/restaurantAdminRouter'
import connectDB from './config/db'
import { connectRedis } from './config/redis' 
import "reflect-metadata";
const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/test", (req, res) => {
    console.log("🔥 TEST ROUTE HIT");
    res.send("OKk");
});
app.use('/',userRouter)
app.use('/auth',auth)
app.use('/restaurantAdmin',restaurantAdminRouter)
async function start(){
    connectDB()
    connectRedis()

}
start()
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started port :${PORT}`)
})


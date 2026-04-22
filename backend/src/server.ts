import express from 'express'
import userRouter from './routes/userRouter'
import auth from './routes/authRouter'
import restaurantAdminRouter from './routes/restaurantAdminRouter'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',userRouter)
app.use('/auth',auth)
app.use('/restaurantAdmin',restaurantAdminRouter)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started port :${PORT}`)
})
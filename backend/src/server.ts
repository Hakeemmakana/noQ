import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRouter'
import auth from './routes/authRouter'
import admin from './routes/adminRouter'
import chef from './routes/chefRouter'
import waiter from './routes/waiterRouter'
import tenantRouter from './routes/tenantRouter'
import connectDB from './config/db'
import { connectRedis } from './config/redis'
import "reflect-metadata";
import { errorHandler } from './middleware/errorHandler'
import cookieParser from "cookie-parser";
import ICheckoutController from './controllers/checkout/interface/ICheckoutController'
import { container } from './DI/container'
import { TYPES } from './DI/types'
import { createServer } from 'http'
import ISocketService from './services/soketService/interface/ISocketService'
const app = express()
const httpServer = createServer(app)
const checkoutController = container.get<ICheckoutController>(TYPES.CheckoutController)
app.post('/webhook', express.raw({ type: 'application/json' }), checkoutController.paymentWebhook)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
try {
    const socketService = container.get<ISocketService>(TYPES.SocketService);
    socketService.initSocket(httpServer);

    console.log("soket connected");
} catch (error) {
    console.error("Failed to connect socket:", error);
}


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

app.use('/auth', auth)
app.use('/admin', admin)
app.use('/chef', chef)
app.use('/waiter', waiter)
app.use('/', userRouter)
app.use('/:slug', tenantRouter)
app.use(errorHandler)
async function start() {
    connectDB()
    connectRedis()

}
start()
const PORT = process.env.PORT
httpServer.listen(PORT, () => {
    console.log(`server started port :${PORT}`)
})


import mongoose from "mongoose";

const connectDB=async()=>{

    try {
        if(!process.env.MONGODB_URI){
            throw new Error('monogdb uri not defined in env file')
        }
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongodb connected')
        
    } catch (error) {
        console.log("error occured when db connect",error)
        return 
    }
}
export default connectDB
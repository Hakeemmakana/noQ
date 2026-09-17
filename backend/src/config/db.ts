
import mongoose from "mongoose";
import dns from 'node:dns';

const connectDB=async()=>{
    console.log("Current DNS default family:", dns.getDefaultResultOrder());
    dns.setDefaultResultOrder('ipv4first');
    console.log("Current DNS default family:", dns.getDefaultResultOrder());

    try {
        if(!process.env.MONGODB_URI){
            throw new Error('monogdb uri not defined in env file')
        }
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongodb connected')
        
    } catch (error) {
        console.log("error occured when db connect",error)
        return 
    }
}
export default connectDB
import crypto from 'crypto'

export const generateOtp=()=>{
    const otp=Math.floor(1000000+Math.random()*900000).toString()
    const hashedOtp=crypto.createHash('sha-256').update(otp).digest('hex')
    return {otp,hashedOtp}
}
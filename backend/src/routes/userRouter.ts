    import { Router } from "express";
    const router =Router()
    router.get('/login',(req,res)=>{
        console.log('kjskfj')
        res.json({message:'hi'})
    })

    export default router
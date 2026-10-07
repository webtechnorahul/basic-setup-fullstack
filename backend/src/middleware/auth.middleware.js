import jwt from 'jsonwebtoken'
import { config } from '../config/config.js';


// Verifies the session cookie, attaches its user ID to the request, and continues.
export const identifyUser=(req,res,next)=>{
    const token=req.cookies.token;
        if(!token){
            res.status(403).json({message:"token not provide unauthorized access"})
        }
        let decoded=null;
        try{
            decoded=jwt.verify(token,config.JWT_SECRET);
        }
        catch(err){
            res.status(401).json({message:'unauthorized access'})
        }
        req.user=decoded.id;

        next();
}
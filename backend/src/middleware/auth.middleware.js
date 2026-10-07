import jwt from 'jsonwebtoken'
import { config } from '../config/config.js';


// Verifies the session cookie, attaches its user ID to the request, and continues.
export const identifyUser=(req,res,next)=>{
    const token=req.cookies.token;
        if(!token){
            const error = new Error("token not provide unauthorized access");
            error.statusCode = 403;
            return next(error);
        }
        let decoded;
        try{
            decoded=jwt.verify(token,config.JWT_SECRET);
        } catch(err) {
            const error = new Error("unauthorized access");
            error.statusCode = 401;
            return next(error);
        }

        req.user=decoded.id;
        return next();
}
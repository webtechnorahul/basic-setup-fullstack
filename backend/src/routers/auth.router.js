import { Router } from "express";
import passport from "passport";
import { getUser, userLogin, userRegister, userRegisterWithGoogle } from "../controllers/auth.controller.js";
import { loginValidationRules, registerValidationRules, validate } from "../validation/auth.validateion.js";
import { identifyUser } from "../middleware/auth.middleware.js";
const authRouter=Router();

authRouter.post('/register',registerValidationRules,validate,userRegister);
authRouter.post('/login',loginValidationRules,validate,userLogin);
authRouter.get('/get-me',identifyUser,getUser)



authRouter.get('/google',
    passport.authenticate('google',{scope:["profile","email"]})
)

authRouter.get('/google/callback',
    passport.authenticate('google',{session:false,failureRedirect:'/login'}),
        userRegisterWithGoogle
)

export default authRouter;
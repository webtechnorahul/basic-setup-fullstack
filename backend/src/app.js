import express from 'express'
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './config/config.js';
import morgan from 'morgan';
import authRouter from './routers/auth.router.js';
import cookieParser from 'cookie-parser';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
const app=express();


app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:config.GOOGLE_CALLBACK_URL
},(_,__,profile,done)=>{
    return done(null,profile)
}));



app.get("/",(req,res)=>{
    res.status(200).json({message:"server is running"})
})
app.use('/api/auth',authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

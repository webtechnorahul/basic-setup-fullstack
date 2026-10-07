import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { config } from "../config/config.js";
import bcrypt from 'bcryptjs'

    function tokenGenerate(id,res){
    const token=jwt.sign({
        id:id
    },config.JWT_SECRET,{
        expiresIn:'1h'
    })
    res.cookie('token',token);
}

export async function userRegister(req,res) {
    const{email,fullName,password}=req.body;
    const isUserExit=await userModel.findOne({email:email});
    if(isUserExit){
        return res.status(403).json({message:"email already register"});
    }
    const hashPassword=await bcrypt.hash(password,10);

    const newUser=await userModel.create({
        email,fullName,password:hashPassword
    });

    tokenGenerate(newUser._id,res);

    // const refreshToken = jwt.sign(
    // { id: newUser._id.toString() }, 
    // config.JWT_REFRESH_SECRET, 
    // { expiresIn: '7d' } 
    // );
    const userObj = newUser.toObject();
    delete userObj.password;
    // delete newUser.password;
 
    res.status(201).json({message:"register successfully",user:userObj})
}

export async function userLogin(req,res){
    const {email,password}=req.body;

    const isUserExist=await userModel.findOne({email}).select('+password');
    if(!isUserExist){
        return res.status(404).json({message:"email not register"});
    }
    const isPasswordMatch=await bcrypt.compare(password,isUserExist.password);
    if(!isPasswordMatch){
        return res.status(401).json({message:"incorrect password"});
    }
    
    tokenGenerate(isUserExist._id,res);

    // const refreshToken = jwt.sign(
    // { id: newUser._id.toString() }, 
    // config.JWT_REFRESH_SECRET, 
    // { expiresIn: '7d' } 
    // );
    const userObj = isUserExist.toObject();
    delete userObj.password;
    // delete newUser.password;

    res.status(200).json({message:"login successfully",user:userObj})
}

export async function userRegisterWithGoogle(req,res){
    const email=req.user.emails[0].value;
    const googleId=req.user.id;
    const Fullname=req.user.displayName;
    const profileImg=req.user.photos[0].value;
    const provider=req.user.provider;
    // console.log(email,"    ",id,"    ",Fullname,"  ",profileImg,"  ",provider)
    let user=await userModel.findOne({email});
    if(!user){
        user=await userModel.create({
            email:email,
            googleId:googleId,
            fullName:Fullname,
            profileImg:profileImg,
            provider:provider
        })
    }

    tokenGenerate(user._id,res);
    
    res.redirect('http://localhost:5173/')
}

export async function getUser(req,res){
    const userId=req.user;
    const isUserExist=await userModel.findById({_id:userId}).select("-password");
    if(!isUserExist){
        return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({message:"user get",user:isUserExist})
}
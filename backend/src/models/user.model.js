import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        require:[true,"fullName is required"],
        maxlength:30,
        trim:true
    },
    email:{
        type:String,
        require:[true,"email is required"],
        maxlength:100,
        trim:true,
        unique:[true,"email is already register"]
    },
    profileImg:{
        type:String,
        trim:true,
        default:"https://ik.imagekit.io/pfhclblv5/shared/usericon.png?updatedAt=1773069247849"
    },
    provider:{
        type:String,
        enum:["local","google"],
        default:"local"
    },
    googleId:{
        type: String,
        unique: true,
        sparse: true,
        maxlength: 50
    },
    password:{
        type:String,
        select:false,
        trim:true,
        require:()=>{
            return !this.googleId;
        }

    }
},{timestamps:true});

// userSchema.index()

const userModel=mongoose.model("User",userSchema);

export default userModel;
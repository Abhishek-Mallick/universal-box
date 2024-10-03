const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();     
    this.password=await bcrypt.hash(this.password,10);
    next()
})

UserSchema.methods.checkPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateAccessToken=function (){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

const user=new mongoose.model("user",UserSchema)
module.exports=user
const user=require('../models/user.model.js')
const jwt=require("jsonwebtoken")
const ApiError=require("../utils/ApiError.js")

const verifyUser=async(req,res,next)=>{
    try {
        const accessToken=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","");
        if(!accessToken){
            throw new ApiError(401,"Unauthorized access");
        }
    
        const decodedToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        const User = await user.findById(decodedToken?._id).select("-password -refreshToken")
        
        if (!User) {   
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = User;
        next()
    } catch (error) {
        throw new ApiError(401,error.message||"Invalid access token");
    }
}

module.exports={verifyUser}
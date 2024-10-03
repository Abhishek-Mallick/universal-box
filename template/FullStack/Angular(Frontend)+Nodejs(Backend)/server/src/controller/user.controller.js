const ApiError=require("../utils/ApiError.js")
const ApiResponse=require("../utils/ApiResponse.js")
const user=require("../models/user.model.js")

const generateAccessTokens = async(userId) =>{
    try {
        const data = await user.findById(userId)
        const accessToken = data.generateAccessToken();
        return {accessToken}
    } 
    catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

const login=async(req,res)=>{
    const {
        email,
        password,
    }=req.body;
    if (!email) {
        throw new ApiError(400, "email is required")
    }
    const User=await user.findOne({email:email});
    if(!User){
        throw new ApiError(402,"No user exists");
    }
    const validUser=await User.checkPassword(password);
    if(validUser){
        const {accessToken}=await generateAccessTokens(User._id);
        const data=await user.findById(User._id).select("-password").lean();
        const options = {
            httpOnly: true,
            secure: true
        };
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .send(new ApiResponse(202,{accessToken:accessToken,...data},"Login successfully"));
    }
    else{
        return res.send(new ApiResponse(400,null,"Login Unsuccessfull"));
    }
}


const register=async(req,res)=>{
    try{
        const {
            email,
            name,
            password,
            phone,
        }=req.body;
        
        
        const existedUser=await user.findOne({
            $or:[{email},{phone}]
        });
    
        if(existedUser)throw new ApiError(400,"User already exists");
        
    
        const User=await user.create({
            name,
            email,
            phone,
            password,
        })
    
        if(!User)throw new ApiError(500,"Server error while creating new user");
        return res.status(201).json(new ApiResponse(200,User,"User created successfully"));
    }
    catch(err){
        console.error(err);
        throw new ApiError(400,null,"Register Unsuccessfull");
    }
}

module.exports={login,register};
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

async function jwtAuthHeader(req,res,next){
    if(!req.headers) return res.send("no header")
    if(!req.headers['authorization']) return res.send("no token")
    const token=req.headers['authorization'].split(" ")[1];
    const {id}=jwt.verify(token, process.env.JWT_KEY)
    // console.log(id)
    
    const user= await userModel.find({_id: id})
    // console.log(user)
    req.user=user;
    next()
}

async function jwtAuthCookie(req,res,next){
    const token=req.cookies?.token
    // console.log(req.cookies)
    if(!token) return res.redirect('/user/login')
    const {id}=jwt.verify(token, process.env.JWT_KEY)
    const user= await userModel.find({_id: id})
    req.user=user;
    next()
}

async function getCurrentUser(req,res,next){
    const token = req.cookies?.token; // Get token from cookies

    if (!token) {
        return res.redirect('/user/login'); // Redirect to login if no token
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_KEY); // Verify the token
        const user = await userModel.findById(id); // Get user details from DB
        
        if (!user) {
            return res.redirect('/user/login'); // Redirect if user not found
        }

        req.user = user; // Attach user to req for access in routes
        next(); // Move to the next middleware
    } catch (err) {
        return res.redirect('/user/login'); // Handle invalid token
    }
}

export default {jwtAuthHeader, jwtAuthCookie, getCurrentUser};
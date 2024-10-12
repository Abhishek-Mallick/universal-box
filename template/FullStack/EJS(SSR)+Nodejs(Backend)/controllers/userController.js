import { createHmac } from 'crypto'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

async function handleUserSignupPost(req,res){

    const {fullName, email, password,username} = req.body

    try {
        const userDoc=new userModel({
            fullName: fullName,
            email: email,
            password: password,
            username,
        })
        console.log(userDoc)
        await userDoc.save() 
        res.status(201).json({'message': 'ok'})
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":"email already exists"})
    } 

}

async function handleUserLoginPost(req,res){
    const {email, password}=req.body;
    const user=await userModel.findOne({email: email})
    // console.log(user)
    if(user){
        const salt=user.salt;
        const hashedPassword = createHmac('sha256', salt)
                    .update(password)
                    .digest('hex');

            // console.log(hashedPassword)
            // console.log(user.password)

        if(user.password===hashedPassword){
            const token=jwt.sign({id: user._id}, process.env.JWT_KEY, {expiresIn: '5d'})
            // console.log("token: ", token)
            res.cookie("token",token);
            res.status(201).json({'message': 'ok', token: token})
        }
        else{
            res.status(400).json({"message": " wrong pass"})
        }
    }
    else{
        res.status(400).json({"message": "no such user"})
    }

   
}

async function handleUserResetPost(req,res){
    const {oldpassword, newpassword}=req.body

    const user=req.user;
    if(user){
        const salt=user.salt;
        const hashedOldPassword = createHmac('sha256', salt)
                    .update(oldpassword)
                    .digest('hex');

        const saltnew = randomBytes(16).toString('hex');
        const hashedNewPassword=createHmac('sha256', saltnew).update(newpassword).digest('hex');
        try {
            const changed = await userModel.updateOne(
                { _id: user._id },
                { $set: { password: hashedNewPassword, salt: saltnew } }
            );
            res.status(201).json({ 'message': 'password changed' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ "message": "An error occurred while updating the password" });
        }
    }
    else{
        res.status(400).json({"message": "something went wrong in finding user"})
    }

}

export default {handleUserLoginPost, handleUserSignupPost, handleUserResetPost}
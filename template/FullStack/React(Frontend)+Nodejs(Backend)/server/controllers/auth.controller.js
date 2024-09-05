import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, emailid, password } = req.body;

  if (
    !username ||
    !emailid ||
    !password ||
    username === "" ||
    emailid === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    emailid,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("SignUp successful!!");
  } catch (error) {
   
    next(error);
  }
}

export const signin = async (req, res, next) => {
  const { emailid, password } = req.body;

  if (!emailid || !password || emailid === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    const valid = await User.findOne({ emailid });
    if (!valid) {
      next(errorHandler(404, 'User not Found'));
    }
    const validPassword = bcryptjs.compareSync(password, valid.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid Password'));
    }
    const token = jwt.sign(
      { id: valid._id }, process.env.JWT_SECRET);
    
    const { password: pass, ...rest } = valid._doc;

    res.status(200).cookie('access_token', token, {
      httpOnly: true
    }).json(rest);
    } catch (error) {
    next(error);
  }
} 

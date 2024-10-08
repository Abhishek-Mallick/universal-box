import User from "../models/user.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, emailid, password } = req.body

  if (!username || !emailid || !password || username === "" || emailid === "" || password === "") {
    return next(errorHandler(400, "All fields are required!!"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username,
    emailid,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    res.json({ success: true, message: "SignUp successful!!" })
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "Username or Email already exists."))
    }
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { emailid, password } = req.body

  if (!emailid || !password || emailid === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'))
  }
  try {
    const user = await User.findOne({ emailid })
    if (!user) {
      return next(errorHandler(400, 'Invalid email or password. Please try again.'))
    }
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid email or password. Please try again.'))
    }
    const token = jwt.sign(
      { id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }
    )

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }).json({ success: true, user: { id: user._id, username: user.username, emailid: user.emailid } })
  } catch (error) {
    next(error)
  }
}

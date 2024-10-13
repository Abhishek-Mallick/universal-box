import User from '../models/user.js'
import { errorHandler } from '../utils/error.js'

export const test = (req, res) => {
  res.json({ message: 'API is working!' })
}

export const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json({ success: true, message: 'User has been signed out!!' })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return next(errorHandler(404, 'User not found'))
    }
    res.json({ success: true, user })
  } catch (error) {
    next(error)
  }
}
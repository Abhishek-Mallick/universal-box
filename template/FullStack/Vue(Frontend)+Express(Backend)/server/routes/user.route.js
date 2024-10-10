import express from "express"
import { signout, test, getProfile } from "../controllers/user.controller.js"
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get("/test", test)
router.post("/signout", signout)
router.get("/profile", verifyToken, getProfile)

export default router
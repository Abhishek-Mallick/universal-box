import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js' 
import jwtAuth from '../middlewares/jwtAuth.js';


router.get('/',jwtAuth.jwtAuthCookie, (req,res)=>{
    const user=req.user[0]
    res.render('user', {user})
})


router.get('/login', (req,res)=>{
    if(req.cookies.token) return res.redirect('/user')
    res.render('login')
})
router.get('/signup', (req,res)=>{
    if(req.cookies.token) return res.redirect('/user')
    res.render('signup')
})

router.post('/signup', userController.handleUserSignupPost)
router.post('/login', userController.handleUserLoginPost)


router.get('/logout', (req,res)=>{
    res.clearCookie('token');
    res.redirect('/');
})


router.get('/resetpass', (req,res)=>{
    res.render('resetpass')
})
router.post('/resetpass',jwtAuth.getCurrentUser, userController.handleUserResetPost)


router.get('/forgotpass', async(req,res)=>{
    res.render('forgotpass')
})

router.post('/forgotpass', (req,res)=>{
    const {recoveryphrase}=req.body
})

export default router;
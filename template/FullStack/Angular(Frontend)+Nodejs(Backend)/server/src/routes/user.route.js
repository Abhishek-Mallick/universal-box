const {Router}=require("express")
const router=Router()
const {verifyUser}=require("../middleware/auth.middleware.js")
const {login,register}=require("../controller/user.controller.js")

router.post("/login",login);
router.post("/signup",register);
router.get("/protected",verifyUser,(req,res)=>{
    return res.end("protected route");
})

module.exports=router

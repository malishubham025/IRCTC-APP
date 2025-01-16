const express=require("express");
const router=express.Router();
const {login,signup,googleLogin,googleSignup}=require("../controller/handleLogin");

router.post("/login",(req,res)=>{
    login(req,res);
})
router.post("/signup",(req,res)=>{
    signup(req,res);
})
router.post("/login-google",(req,res)=>{
    googleLogin(req,res);
})
router.post("/signup-google",(req,res)=>{
    googleSignup(req,res);
})
module.exports ={loginRouter:router};
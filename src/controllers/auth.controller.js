const userModel= require('../models/user.model')
const jwt= require('jsonwebtoken')
const emailService= require("../services/email.service")
async function userRegisterController(req, res){
const {email, password, name}= req.body
console.log(req.body)
try{
  
    if(!email || !password || !name){
        return res.status(400).json({message:"All fields are required"})
    }
    const isExistUser= await userModel.findOne({
        email:email
    })
    if(isExistUser){
        return res.status(409).json({message:"User already exists"})
    }


    const user = await userModel.create({
        email, 
        password, 
        name
    })


    const token= jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
    res.cookie("token", token)


     res.status(201).json({message:"User registered successfully", user:{ 
        id:user._id, 
        email:user.email, 
        name:user.name
    }, token })

    await emailService.sendRegistrationEmail(user.email, user.name)



}
catch(err){

}
}



async function userLoginController(req, res){
const {email, password}= req.body
console.log(req.body)
try{
  
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    const isExistUser= await userModel.findOne({email}).select("+password")
    if(!isExistUser){
        return res.status(409).json({message:"User not found"})
    }

    const isPasswordValid= await isExistUser.comparePassword(password)

    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid credentials"})
    }

    const token= jwt.sign({userId:isExistUser._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
    res.cookie("token", token)


    return res.status(201).json({message:"User registered successfully", user:{ 
        id:isExistUser._id, 
        email:isExistUser.email, 
        name:isExistUser.name
    }, token })




}
catch(err){

}
}



module.exports={
    userRegisterController,
    userLoginController
}
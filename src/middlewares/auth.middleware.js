const userModel= require('../models/user.model')
const jwt= require('jsonwebtoken')


async function auth_verify(req, res, next){
    const token= req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorised, token missing"
        })
    }


    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        const user= await userModel.findById(decoded.userId)

        if(!user){
            return res.status(401).json({
                message:"Unauthorised user not found"
            })
        }

        req.user= user;
        next();


    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorised , invalid token"
        })
    }


}


async function authSystemUserMiddleware(req, res, next) {
    const token= req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorised, token missing"
        })
    }

     try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        const user= await userModel.findById(decoded.userId).select("+systemUser")

        if(!user){
            return res.status(403).json({
                message:"forbidden user not found"
            })
        }

        req.user= user;
        return next();


    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorised , invalid token"
        })
    }
}

module.exports={auth_verify, authSystemUserMiddleware}
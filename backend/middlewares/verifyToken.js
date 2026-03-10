import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

export const  verifyToken=(...allowedRoles)=>{
    return async(req,res,next)=>{
    //token verifiaction logic
    try{
    //1.get token from req
        let signedToken=req.cookies.token;
        
        if(!signedToken){
            return res.status(401).json({message:"unauthorized request.please login first"})
        }
    //2.verify token(decode)
    let decodedToken=jwt.verify(signedToken,process.env.JWT_SECRET)
    //check i f role is allowed
        //check i f role is allowed
        if(allowedRoles.length && !allowedRoles.includes(decodedToken.role)){
            return res.status(403).json({message:"Forbidden.you dont have acces to this article"})
        }
        //attach user info to req
        req.user=decodedToken;
    next();
    }
    catch(err){
        //jwt.verify throw s if token is invalid/expired
        if(err.name==="TokenExpiredError"){
            return res.status(401).json({message:"session expired.please login again"})
        }
        if(err.name==="JsonWebTokenError"){
            return res.status(401).json({message:"invalid token.please login again"})
        }
        next(err);
    }
}}

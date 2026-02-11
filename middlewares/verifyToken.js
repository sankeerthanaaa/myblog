import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

export const  verifyToken=async(req,res,next)=>{
    //token verifiaction logic
    
    //1.get token from req
        let signedToken=req.cookies.token;
        
        if(!signedToken){
            return res.status(401).json({message:"unauthorized request.please login first"})
        }
    //2.verify token(decode)
    let decodedToken=jwt.verify(signedToken,process.env.JWT_SECRET)
    
    next();
}

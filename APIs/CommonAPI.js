import exp from 'express'
import bcrypt from 'bcryptjs'
import { authenticate } from '../services/authService.js';
import { UserTypeModel } from '../models/UserTypeModel.js';
export const commonRouter=exp.Router()

//login
commonRouter.post('/login',async(req,res)=>{

    let userCred=req.body;
    let {token,user}=await authenticate(userCred)
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
    });
    res.status(200).json({message:"login success",payload:user})

})
//logout
commonRouter.get('/logout',async(req,res)=>{
    
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
})

commonRouter.put('/change-password',async(req,res)=>{
    
    let { userId, currentPassword, newPassword } = req.body;
//console.log("Received userId:", userId)
        // find user
        let user = await UserTypeModel.findOne({ _id:userId});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        //check the current password is correct or not
        let isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is wrong" });
        }

        //hash new password
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        //replace current pass with new one
        user.password = hashedPassword;
        await user.save();
        //send res
        res.json({ message: "Password changed successfully" });
    
})
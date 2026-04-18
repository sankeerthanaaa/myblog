import exp from 'express'
import bcrypt from 'bcryptjs'
import { authenticate } from '../services/authService.js';
import { UserTypeModel } from '../models/UserTypeModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';
export const commonRouter=exp.Router()

//login
commonRouter.post('/login', async (req, res, next) => {
  try {
    let userCred = req.body;

    let { token, user } = await authenticate(userCred);

    
    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});

    res.status(200).json({
      message: "login success",
      payload: user
    });

  } catch (err) {
    next(err);   // sends error to global error handler
  }
});
//logout
commonRouter.post('/logout', async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.status(200).json({ message: "Logged out successfully" });
});

commonRouter.put('/change-password',verifyToken("ADMIN","AUTHOR","USER"),async(req,res)=>{
    
    //get current password and new password
  const { role, email, currentPassword, newPassword } = req.body;
  // Prevent same password
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "newPassword must be different from currentPassword" });
  }

  // Find user by email (works for USER, AUTHOR, ADMIN — all same collection)
  const account = await UserTypeModel.findOne({ email });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  //only logged in user can change his password
  if(account._id.toString() !== req.user.userId){
    return res.status(403).json({message:"You can only change your own password"})
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, account.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }
  // Hash and save new password
  account.password = await bcrypt.hash(newPassword, 10);
  await account.save();

  res.status(200).json({ message: "Password changed successfully" });
})

//page refresh
commonRouter.get('/check-auth', verifyToken("ADMIN","AUTHOR","USER"), async (req, res) => {
  res.status(200).json({
    message:"Authenticated",
    payload:req.user
  });
});
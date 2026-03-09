import exp from 'express'
import { register,authenticate } from '../services/authService.js'
import {UserTypeModel} from '../models/UserTypeModel.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import { ArticleModel } from '../models/Articlemodel.js';

export const userRoute = exp.Router()


//register user  =>DRY rule => DO nOT REPEAT YOURSELF => instead REUSE 
userRoute.post('/users',async (req ,res )=> {
    let userObj=req.body;
    console.log("REQ BODY ", req.body);
    const newUserObj=await register({...userObj,role:"USER"});
    res.status(201).json({message:"user created ",payload:newUserObj})
});
//Authenticate / Login user => hashing and all using Bcrypt 


//Read all articles(protected )
userRoute.get('/articles',verifyToken,async(req,res)=>{
    //read article
    const articles=await ArticleModel.find();
    res.status(201).json({ message:"articles",payload:articles});
})

//Add comment to an article(protected)

userRoute.post('/user-api/articles/:articleId/comments',async(req,res)=>{
    let uid=req.params.userId;
    //let newComment=
})
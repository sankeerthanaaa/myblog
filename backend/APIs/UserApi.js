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
userRoute.get('/articles',verifyToken("USER"),async(req,res)=>{
    //read article
    const articles=await ArticleModel.find({isArticleActive:true});
    res.status(201).json({ message:"articles",payload:articles});
})

//Add comment to an article(protected)

userRoute.put('/articles',verifyToken("USER"),async(req,res)=>{
    const { user,articleId,comments }=req.body;
    let articlewithComment =await ArticleModel.findByIdAndUpdate(
        articleId,
        {$push:{comments:{user,comments}}},
        {new:true,runValidators:true},
    );
    //if article not found
    if(!articlewithComment){
        return res.status(404).json({message:"articel nor found"})
    }
    res.status(200).json({message:"comment added successfully"})
});
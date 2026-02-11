import exp from 'express'
import { authenticate } from '../services/authService.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkAuthor } from '../middlewares/checkAuthor.js'; 
import { ArticleModel } from '../models/Articlemodel.js';
import { UserTypeModel } from '../models/UserTypeModel.js';
import { register } from '../services/authService.js';
export const authorRoute = exp.Router()

//Register author(public)
authorRoute.post('/users',async (req ,res )=> {
    let userObj=req.body;
    const newUserObj=await register({...userObj,role:"AUTHOR"});
    res.status(201).json({message:"author created ",payload:newUserObj})
});
//authenticate (public)
/*authorRoute.post("/login",async(req,res)=>{
   
})*/
//create article(protected)
authorRoute.post('/articles',async(req,res)=>{
    //get article from rewq
    let article=req.body;
    //check author
    let author=await UserTypeModel.findById(article.author)
    if(!author){
        return res.status(401).json({"message":"invalid author"})
    }
    //create article doc
    const ArticleDoc=new ArticleModel(article)
    //save
    let newArticle=await ArticleDoc.save();
    //send res
    res.json({"message":"articles",payload:newArticle})
})
//read articles of author (he can read only his articles)(protected)
authorRoute.get('/articles/:authorId',async(req,res)=>{
    //read article
    let newAuthorId=req.params.authorId;
    //check the author
    let author=await UserTypeModel.findById(newAuthorId)
    if(!author|| author.role!="AUTHOR"){
        res.status(401).json({"message":"invalid author"})
    }
    //read articles
    let newArticle=await ArticleModel.find({author:newAuthorId})
    //send res 
    res.status(201).json({"message":"the article readby the author",payload:newArticle})
})
//editarticle(protected)
//edit article(protected route)
authorRoute.put("/articles",verifyToken ,checkAuthor,async (req, res) => {
  //get modified article from req
  let { articleId, title, category, content,author } = req.body;
  //find article
  let articleOfDB = await ArticleModel.findOne({_id:articleId,author:author});
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }
  
  //update the article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,
    {
      $set: { title, category, content },
    },
    { new: true },
  );
  //send res(updated article)
  res.status(200).json({ message: "article updated", payload: updatedArticle });
});
//soft delete article(protected)

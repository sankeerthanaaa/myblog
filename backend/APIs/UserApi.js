import exp from 'express'
import { register,authenticate } from '../services/authService.js'
import {UserTypeModel} from '../models/UserTypeModel.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import { ArticleModel } from '../models/Articlemodel.js';
import { upload } from '../config/multer.js';
import cloudinary from '../config/cloudinary.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
export const userRoute = exp.Router()


//register user  =>DRY rule => DO nOT REPEAT YOURSELF => instead REUSE 
userRoute.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );
//Authenticate / Login user => hashing and all using Bcrypt 


//Read all articles(protected )
userRoute.get('/articles',verifyToken("USER"),async(req,res)=>{
    //read article
    const articles=await ArticleModel.find({isArticleActive:true}).populate("comments.user","email firstname");
    res.status(201).json({ message:"articles",payload:articles});
})

//Add comment to an article(protected)

userRoute.put(
  "/articles",
  verifyToken("USER"),
  async (req, res) => {
    try {
      const { articleId, comment } = req.body;

      if (!articleId || !comment) {
        return res.status(400).json({ message: "articleId and comment are required" });
      }

      const articleWithComment = await ArticleModel.findByIdAndUpdate(
        articleId,
        {
          $push: {
            comments: {
              user: req.user.userId, // from token
              comment: comment       
            }
          }
        },
        { new: true, runValidators: true }
      ).populate("comments.user", "email firstname");

      if (!articleWithComment) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json({
        message: "Comment added successfully",
        payload: articleWithComment // ✅ VERY IMPORTANT
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add comment" });
    }
  }
);
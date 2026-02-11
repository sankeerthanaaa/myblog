import exp from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { userRoute } from './APIs/UserApi.js'
import { authorRoute } from './APIs/AuthorApi.js'
import { adminRoute } from './APIs/AdminApi.js'
import { commonRouter } from './APIs/CommonAPI.js'

config() // loads .env into process.env


const app = exp()

// body parser
app.use(exp.json())
app.use(cookieParser())
// routes
app.use('/user-api', userRoute)
app.use('/author-api', authorRoute)
app.use('/admin-api', adminRoute)
app.use('/common-api',commonRouter)
// database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("DB connection success")

    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    )
  } catch (err) {
    console.log("Err in DB connection", err)
  }
}

connectDB()
//dealing with invalid path
app.use((req,res,next)=>{
  res.json({message: `${req.url} + is Invalid path`})
})

// error handling middleware
app.use((err, req, res, next) => {
  console.log("error :", err)
  res.status(500).json({ message: "error", reason: err.message })
})

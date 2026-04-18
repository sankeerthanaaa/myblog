import exp from 'express'
import mongoose from 'mongoose'
// import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { userRoute } from './APIs/UserApi.js'
import { authorRoute } from './APIs/AuthorApi.js'
import { adminRoute } from './APIs/AdminApi.js'
import { commonRouter } from './APIs/CommonAPI.js'
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
// config() // loads .env into process.env


const app = exp()

//cors middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://myblog-ffnxizg7e-sankeerthanaaas-projects.vercel.app"
  ],
  credentials: true
}));// body parser
app.use(exp.json())
app.use(cookieParser())
// routes
app.use('/user-api', userRoute)
app.use('/author-api', authorRoute)
app.use('/admin-api', adminRoute)
app.use('/common-api',commonRouter)
//test
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
// database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB connection success")

    const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
  } catch (err) {
    console.log("Err in DB connection", err)
  }
}

connectDB()
//dealing with invalid path
app.use((req,res,next)=>{
  res.json({message: `${req.url} + is Invalid path`})
})

app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists,`
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});
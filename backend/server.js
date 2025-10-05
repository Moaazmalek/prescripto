import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js'
import authRouter from './routes/authRoute.js';


//app config

const app=express();
const port=process.env.PORT || 4000;
connectDB();
connectCloudinary();
//middlewares
app.use(cors());
app.use(express.json());
//api end points
app.use("/api/admin",adminRouter)
app.use("/api/auth",authRouter)
app.get("/",(req,res) => {
    res.send("API WORKING");

})
app.listen(port,()=>console.log(`listening on localhost:${port}`));

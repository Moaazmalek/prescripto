import { emailValidator } from "../utils/zod.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

// API for adding doctor
const addDoctor=async (req, res) => {
    try {
        const { name, email,password, speciality,fees,address,experience,degree,about } = req.body;
        const imageFile=req.file
       
        if (!name || !email || !password || !speciality || !fees || !address || !experience || !degree || !about || !imageFile) {
            return res.status(400).json({success:false,message:"Missing details"});
        }
        
        if(emailValidator.safeParse(email).success===false){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters long"})
        }

        //hashing password

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const imagUpload=await cloudinary.uploader.upload(imageFile.path,{
            folder:"prescripto",
            resource_type:"image"
        })

        const imageUrl=imagUpload.secure_url;
        let existingUser=await User.findOne({email});
        if(existingUser){
            return res.json({success:false,message:"User with this email already exists"})
        }
        const user=await User.create({
            name,email,password:hashedPassword,role:"doctor"
            ,image:imageUrl
        })
        
        const doctor=new Doctor({
            user:user._id,
            speciality,
            fees,
            address:JSON.parse(address),
            experience,
            degree,
            about,
            date:Date.now(),
        });
       await doctor.save();
       console.log("DOCTOR:",doctor);
       
        res.status(201).json({success:true,message:"Doctor added successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

// API for getting all doctors
const getAllDoctors=async (req,res)=>{
    try {
        const doctors=await Doctor.find().populate("user","name email ");
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}


export { addDoctor,getAllDoctors };
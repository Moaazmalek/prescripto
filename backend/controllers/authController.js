import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema } from '../utils/zod.js';



export const login = async (req, res) => {
    const { email, password } = loginSchema.parse(req.body)

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success:false, message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success:false, message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign({ _id: user._id,role:user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export const register = async (req, res) => {
    const { name, email, password } =registerSchema.parse(req.body)
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({success: false, message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });
        await newUser.save();

         res.status(201).json({success: true, message: "Registration successful. Please login." });
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
}


export const me = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select("-password");
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}       

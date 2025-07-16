import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.model.js";
import cloudinary from "../lib/cloudinary.js";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be of minimum 8 character." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({
      fullName,
      email,
      password,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "all fields are requiered" });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function updateProfile(req,res){
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;

        if(!profilePic){
            return res.status(400).json({mesaage:"profile pic is required"});
        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic)

        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile controller",error);
        res.status(500).json({message:"internal server error"});
    }
}

export  function checkAuth(req,res){
try{
    res.status(200).json(req.user)
}
catch(error){
console.log("error in checkAuth controller",error);
res.status(500).json({message:"internal server error"});
}
}
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/User.model.js";

export async function getUserForSidebar(req,res){
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in get user for sidebar controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export async function getMessages(req,res){
    try {
        const {id:userToChatId}=req.params
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,
                    receiverId:userToChatId
                },
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("error in get messages controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function sendMessage(req,res){
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;

        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        //todo :realtime functionality goes here =>socket.io

        const receieverSocketId=getReceiverSocketId(receiverId);
        if(receieverSocketId){
            io.to(receieverSocketId).emit("newMessage",newMessage);
        }


        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in send messages controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
const chatingService = require('../services/chat.service');
const chatModel = require("../model/chat.model");



exports.sendMessage =  async (req,res,next)=>{
    try {
        var SenderId =req.user._id;
        const { receiverId,message } = req.body;
        let setData = await chatingService.sendMessage(SenderId,receiverId,message);
        res.json({status: true,success:setData});
        res.status(200).json({ message: "The message has been stored and sent successfully" });
   
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


exports.getChat =  async (req,res,next)=>{
    try {
        var userId =req.user._id;
        const { receiverId } = req.query;
        let setData = await chatingService.getChat(userId,receiverId);
        res.status(200).json({message: "The messages has been displayed successfully",success:setData});
        
   
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


exports.deleteMessage =  async (req,res,next)=>{
    try {
        var userId =req.user._id;
        const { id } = req.body;
        let setData = await chatingService.deleteMessage(userId,id);
        if (setData==null){
            res.status(404).json({ message: "there's no message sent by you with this id " });
        }
        res.status(200).json({ message: "The message has been deleted successfully" });
        
        
   
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getContactedUsersData =  async (req,res,next)=>{
    try {
        var userId =req.user._id;
        let getUsers = await chatingService.getContactedUsersData(userId);
        res.json({status: 200, message: "The users has been displayed successfully" , success:getUsers });
        
   
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
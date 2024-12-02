import Chat from "../models/chat";
import Message from "../models/message";
import User from "../models/user";
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from "../middleware/authMiddleware";
import Notification from "../models/notification";
import mongoose from "mongoose";

export const createChat = async (req:Request, res:Response) => {
  try {
  const { chatId, senderId, text,receiverId } = req.body;
  let textmsg 
  let newMessage
  let newChat
  if(!chatId){
    
    newChat = await Chat.create({
      members: [senderId, receiverId],
    });
    
    newMessage = await Message.create({
      chatId:newChat?._id,
      senderId,
      text
    })
  }else{
    newMessage = await Message.create({
      chatId,
      senderId,
      text
    })
  }
  
 const user= await User.findById(senderId)
 textmsg =`You Have New Messages from ${user?.firstname} ${user?.surname}`
  await Notification.create({
    student:receiverId,
    notiType:"message",
    text:textmsg,
  
  });
    
      res.status(200).json(newMessage);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  export const userChats = async (req:CustomRequest, res:Response) => {
    const { receiverId } = req.params;
    const { userId } = req.user!;
 
    try {
      const chat = await Chat.findOne({
        members: { $all: [userId, receiverId] }
      });
      
      if (!chat) {
        return res.status(200).json({ message: "No messages yet" });
      }
  
      const messages = await Message.find({ chatId: chat._id });
      
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  

  export const getUnreadMessages = async (req: CustomRequest, res: Response) => {
    try {
      const id = req.params.id;
      const tab = req.query.tab as string;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      const userObjectId = new mongoose.Types.ObjectId(id);
      let query: any = {};
  
      if (tab === "Chats") {
        // No additional filtering for "All Chats"
      } else {
        // Filter out messages sent by the user
        query.isRead = { $ne: userObjectId };
      }
  
      // Find all chats that include the user
      const chats = await Chat.find({ members: userObjectId }).exec();
  
      // Extract chat IDs from the chats
      const chatIds = chats.map(chat => chat._id);
  
      // Find unread messages for the user
      const messages = await Message.find({ chatId: { $in: chatIds }, ...query,senderId:{ $ne: userObjectId } })
        .sort({ createdAt: -1 }) // Sort by latest messages first
        .populate({
          path: 'senderId',
          select: 'firstname surname wilaya', // Select the firstname and surname fields
          model: User // Ensure you're using the User model for population
        })
        .exec();
  
      // Format the data to be used in the frontend
      const formattedMessages = messages.map(msg => ({
        id: msg._id,
        name: (msg.senderId as any).firstname,
        lastname: (msg.senderId as any).surname,
        lastMessage: msg.text,
        wilaya:(msg.senderId as any).wilaya,
        date: msg.createdAt?.toISOString().split('T')[0],
        senderId: msg.senderId
      }));
  
      res.status(200).json(formattedMessages);
    } catch (error: any) {
      // Log the error for debugging
      console.error('Error fetching messages:', error);
  
      res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
    }
  };
  
  export const markChatNotificationRead = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user?.userId!; // Ensure this is set correctly in your middleware
      const { id } = req.query;
  
      if (!userId || !id) {
        return res.status(400).json({ status: false, message: 'User ID or sender ID missing' });
      }
  
      // Convert query ID to ObjectId
      const senderId = new mongoose.Types.ObjectId(id as string);
  
      // Update messages where senderId matches and the message is not already marked as read by the user
      const result = await Message.updateMany(
        { senderId, isRead: { $ne: userId } },
        { $push: { isRead: userId } },
        { new: true }
      );
  
      res.status(200).json({ status: true, message: 'Notifications marked as read', result });
    } catch (error: any) {
      console.error('Error marking notifications as read:', error);
      return res.status(500).json({ status: false, message: error.message });
    }
  };
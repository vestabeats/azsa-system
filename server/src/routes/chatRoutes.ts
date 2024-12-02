import express from 'express'
import { protectRoute } from "../middleware/authMiddleware";
import { createChat, getUnreadMessages, markChatNotificationRead, userChats } from '../controllers/chatController';
const router = express.Router()

router.post('/',protectRoute, createChat);
router.get('/:receiverId',protectRoute, userChats);
router.get('/mychats/:id',protectRoute, getUnreadMessages);
router.put("/read-chat", protectRoute, markChatNotificationRead);

export default router
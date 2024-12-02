import React, { useEffect, useRef, useState } from 'react';
import Loading from './Loading';
import { useGetStudentQuery } from '../redux/slices/api/userApiSlice';
import { getInitials } from '../utils';
import { useAddMessageMutation, useGetUserChatQuery } from '../redux/slices/api/chatApiSlice';
import moment from 'moment';
import InputEmoji from "react-input-emoji";
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io, Socket } from "socket.io-client";


interface Message {
  _id: string;
  senderId: string;
  chatId: string;
  text: string;
  receiverId:any;
  createdAt: string;
}

interface User {
  _id: string;
  surname: string;
  firstname: string;
}

interface OnlineUser {
  userId: string;
  socketId: string;
}

const ChatBox: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const params = useParams<{ id: string }>();
  const userId = params.id || "";
  const imageRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const { user } = useSelector((state: any) => state.auth);
  const [sendMessage, setSendMessage] = useState<Message | null>(null);
  const { data, isLoading, refetch } = useGetStudentQuery(userId);
  const [addMessage] = useAddMessageMutation();
  const { data: userMsg, isLoading: isLoadin, refetch: getMsg } = useGetUserChatQuery(userId, { skip: !userId });
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const location = useLocation();

  // Send message to socket server
  useEffect(() => {
    if (sendMessage) {
      socketRef.current?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.emit("new-user-add", user?.data?._id);
    socketRef.current.on("get-users", (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  // Get the message from socket server
  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socketRef.current?.on("receive-message", handleReceiveMessage);

    return () => {
      socketRef.current?.off("receive-message", handleReceiveMessage);
    };
  }, [messages]);

  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    if (userId) {
      //getMsg();
      //refetch();
      setUserData(data || null);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      setMessages(userMsg || []);
    }
  }, [userId, messages, userMsg, data, getMsg, refetch]);

  // Send message to DB
  const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      return;
    }

    const message: Message = {
      senderId: user?._id || "",
      text: newMessage,
      chatId: userMsg?.[0]?.chatId || "",
      receiverId: userId,
      _id: '', // Placeholder until the message is saved in DB
      createdAt: new Date().toISOString(), // Placeholder for createdAt
    };

    // Send message to socket server
    setSendMessage({ ...message, userId });

    // Send message to database
    try {
      const newMessageData = await addMessage(message).unwrap();
      getMsg();
      setNewMessage("");
      setMessages([...messages, newMessageData]);
    } catch (error) {
      console.error("error", error);
    }
  };

  const checkOnlineStatus = () => {
    return onlineUsers.some((user) => user.userId === userId);
  };

  if (isLoading) {
    return (
      <div className='py-5'>
        <Loading />
      </div>
    );
  }

  return (
    <div className=''>
      <div className='grid md:fixed grid-cols-2'>
        <div className='flex md:fixed shadow justify-start'>
          {/* chat-header */}
          {checkOnlineStatus() && <span className='bg-green-600 ml-2 rounded-full h-2 w-2'></span>}
          <p className='w-10 h-10 bg-green-600 rounded-full text-white flex items-center justify-center text-lg'>
            <span className='text-center font-bold'>
              {userData ? getInitials(userData.surname) : ""}
            </span>
          </p>
          <div className='flex flex-col ml-1'>
            <p className='capitalize font-semibold'>{userData ? `${userData.surname} ${userData.firstname}` : ""}</p>
            {checkOnlineStatus() ? (
              <span className='text-gray-500'>online</span>
            ) : (
              <span className='text-gray-500'>offline</span>
            )}
          </div>
        </div>
      </div>
      <div className='md:ml-[14rem]'>
        {/*Chat Body*/}
        {isLoadin ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-6 overflow-scroll">
            {userMsg && Array.isArray(userMsg) && userMsg.map((message) => (
              <div
                key={message._id}
                ref={scrollRef}
                className={
                  message.senderId === user?._id
                    ? "bg-gradient-to-br from-green-500 via-green-600 to-green-700  text-white p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg max-w-screen-sm flex flex-col gap-2 self-end w-[18rem] lg:w-[27rem] whitespace-normal"
                    : "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 text-white p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg max-w-screen-sm w-[18rem] lg:w-[27rem] flex flex-col gap-2 whitespace-normal inline-block"
                }
              >
                <p style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{message.text}</p>
                <span className="flex flex-row-reverse text-sm">
                  {moment(message.createdAt).fromNow()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* chat-sender */}
      <div className="bg-white flex justify-between mb-24 items-center sticky mt-44 gap-4 p-2 bottom-0 w-full rounded-lg self-end">
        <div className="bg-gray-300 rounded-full flex items-center justify-center font-bold cursor-pointer" onClick={() => imageRef.current?.click()}>+</div>
        <InputEmoji className="flex-1 sticky" value={newMessage} onChange={handleChange} />
        <button className="bg-green-600 rounded-full text-center p-2 cursor-pointer" onClick={handleSend}>Send</button>
        <input type="file" className="hidden" ref={imageRef} />
      </div>
    </div>
  );
};

export default ChatBox;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useGetMyChatsQuery, useMarkChatAsReadMutation } from '../redux/slices/api/chatApiSlice';
import { useSelector } from 'react-redux';
import Tabs from '../components/Tabs';

interface UserMessage {
  id: string;
  name: string;
  lastname: string;
  lastMessage: string;
  date: string;
  senderId: any;
  wilaya:string;
  isRead?: string[]; // Optional array of read user IDs
}

const TABS = [
  { title: "Unread Chats" },
  { title: "Chats" }
];

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [markRead] = useMarkChatAsReadMutation();
  const tab = TABS[selectedTab].title;
  const { data, isLoading, error } = useGetMyChatsQuery({ id: user?._id, tab });

  const handleOpenChat = (userId: string) => {
    navigate(`/chatbox/${userId}`);
    markRead(userId);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading messages.</p>;
  }

  const messages: UserMessage[] = data || [];

  // Group messages by senderId and keep the latest message
  const groupMessagesBySender = (messages: UserMessage[]) => {
    const latestMessagesMap: { [key: string]: UserMessage } = {};

    messages.forEach(message => {
      const senderId = message.senderId._id;
      // Keep the latest message from each sender
      if (!latestMessagesMap[senderId] || new Date(latestMessagesMap[senderId].date) < new Date(message.date)) {
        latestMessagesMap[senderId] = message;
      }
    });

    return Object.values(latestMessagesMap);
  };

  const groupedMessages = groupMessagesBySender(messages);
  const unreadMessages = groupedMessages.filter(msg => !(msg.isRead || []).includes(user?._id));
  const allMessages = groupedMessages;

  return (
    <div className='p-4 bg-gray-100 min-h-screen'>
      <h2 className='text-2xl font-semibold mb-4'>Messages</h2>
      <div className='bg-white shadow-md rounded-lg p-4'>
        <Tabs
          tabs={TABS}
          selected={selectedTab}
          setSelected={setSelectedTab}
        >
          {selectedTab === 0 && (
            <div>
              {unreadMessages.length === 0 ? (
                <p className='text-gray-500'>No unread messages.</p>
              ) : (
                <ul>
                  {unreadMessages.map((message) => (
                    <li key={message.id} className='flex items-center justify-between p-3 border-b border-gray-200'>
                      <div className='flex items-center'>
                        <FaUser className='text-green-500 mr-3' />
                        <div>
                          <p className='font-semibold'>{message.name} {message.lastname}({message?.wilaya})</p>
                          <p className='text-gray-600'>{message.lastMessage}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenChat(message.senderId._id)}
                        className='ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'
                      >
                        Open Chat
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              {allMessages.length === 0 ? (
                <p className='text-gray-500'>No messages.</p>
              ) : (
                <ul>
                  {allMessages.map((message) => (
                    <li key={message.id} className='flex items-center justify-between p-3 border-b border-gray-200'>
                      <div className='flex items-center'>
                        <FaUser className='text-green-500 mr-3' />
                        <div>
                          <p className='font-semibold'>{message.name} {message.lastname}({message?.wilaya})</p>
                          <p className='text-gray-600'>{message.lastMessage}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenChat(message.senderId._id)}
                        className='ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'
                      >
                        Open Chat
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Messages;

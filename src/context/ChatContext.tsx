import React, { createContext, useContext, useState } from 'react';

interface Message {
  content: string;
  isAI: boolean;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  addMessage: () => {},
  clearChat: () => {},
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
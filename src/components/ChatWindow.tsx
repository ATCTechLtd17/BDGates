import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import { useChat } from '../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Search, Filter, Download, MoreVertical, Menu, X } from 'lucide-react';

export const ChatWindow = () => {
  const { messages } = useChat();
  const chatRef = React.useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate AI typing indicator
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isAI === false) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    // Here you would typically send this to your chat context
    console.log(`Selected suggestion: ${suggestion}`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-3 md:p-4 flex items-center justify-between z-30 relative">
        <div className="flex items-center gap-2 md:gap-3 ml-10 md:ml-0">
          <div className="p-1.5 md:p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
            <Bot size={18} className="text-white md:w-5 md:h-5" />
          </div>
          <div>
            <h2 className="font-medium text-sm md:text-base">BDgates Assistant</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Always here to help</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2">
          {/* Mobile search toggle */}
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:hidden"
            aria-label="Toggle search"
          >
            <Search size={18} />
          </button>
          
          {/* Desktop search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            aria-label="Filter messages"
          >
            <Filter size={18} />
          </button>
          
          <button 
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="More options"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-3"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl w-full"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Welcome to BDgates
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 md:mb-8">
                Your AI assistant for business and regulatory guidance in Bangladesh
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  "How do I register a company?",
                  "What are the VAT requirements?",
                  "Guide me through tax filing",
                  "Export-import regulations"
                ].map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 md:p-4 text-left border dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md text-sm md:text-base"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div ref={chatRef} className="flex-1 overflow-y-auto space-y-3 md:space-y-4 p-3 md:p-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  isAI={message.isAI}
                  content={message.content}
                />
              ))}
            </AnimatePresence>
            
            {/* Typing indicator */}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-2 md:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit"
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">AI is typing...</span>
              </motion.div>
            )}
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <MessageInput />
    </div>
  );
};
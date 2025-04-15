import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Mic, Image, X } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import TextareaAutosize from 'react-textarea-autosize';
import { motion, AnimatePresence } from 'framer-motion';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage } = useChat();

  // Simulate typing indicator
  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim()) {
      addMessage({ content: message, isAI: false });
      // Simulate AI response
      setTimeout(() => {
        addMessage({
          content: "I'm an AI assistant. I'm here to help you with your questions.",
          isAI: true
        });
      }, 1000);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleAttachmentClick = () => {
    setShowAttachments(!showAttachments);
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
    console.log(isRecording ? 'Stopping recording' : 'Starting recording');
  };

  return (
    <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 p-2 md:p-4 relative">
      <AnimatePresence>
        {showAttachments && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 p-3 md:p-4"
          >
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <h3 className="text-xs md:text-sm font-medium">Attachments</h3>
              <button 
                onClick={handleAttachmentClick}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1 md:gap-2">
              {[
                { icon: <Image size={16} className="md:w-5 md:h-5" />, label: 'Image' },
                { icon: <Paperclip size={16} className="md:w-5 md:h-5" />, label: 'File' },
                { icon: <Mic size={16} className="md:w-5 md:h-5" />, label: 'Voice' },
                { icon: <Smile size={16} className="md:w-5 md:h-5" />, label: 'Emoji' },
              ].map((item, index) => (
                <button 
                  key={index}
                  className="flex flex-col items-center justify-center p-2 md:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="text-gray-700 dark:text-gray-300 mb-0.5 md:mb-1">{item.icon}</div>
                  <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-1 md:gap-2 items-end">
          <div className="flex-1 relative">
            <TextareaAutosize
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              className="w-full resize-none rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700 p-2 md:p-3 pr-8 md:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white min-h-[40px] md:min-h-[44px] max-h-[150px] md:max-h-[200px] text-sm md:text-base"
              minRows={1}
              maxRows={5}
            />
            <div className="absolute right-2 md:right-3 bottom-2 md:bottom-3 flex items-center gap-1">
              <button 
                onClick={handleAttachmentClick}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Add attachment"
              >
                <Paperclip size={14} className="md:w-4 md:h-4" />
              </button>
              <button 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Add emoji"
              >
                <Smile size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-1 md:gap-2">
            <button
              onClick={handleVoiceRecording}
              className={`p-2 md:p-3 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              <Mic size={16} className="md:w-5 md:h-5" />
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="p-2 md:p-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              aria-label="Send message"
            >
              <Send size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-1 md:mt-2 text-[10px] md:text-xs text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1 md:gap-2">
          <span>Free Research Preview.</span>
          <span className="text-gray-400 dark:text-gray-500">BDgates may produce inaccurate information.</span>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
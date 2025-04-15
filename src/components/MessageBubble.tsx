import React, { useState } from 'react';
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  isAI: boolean;
  content: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ isAI, content }) => {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    // Here you would typically send this feedback to your backend
    console.log(`Feedback: ${type} for message: ${content.substring(0, 30)}...`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 md:gap-4 ${isAI ? 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30' : ''} p-3 md:p-4 rounded-lg group relative`}
    >
      <div className={`p-1.5 md:p-2 rounded-full ${isAI ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} flex-shrink-0 shadow-md`}>
        {isAI ? <Bot size={16} className="text-white md:w-5 md:h-5" /> : <User size={16} className="text-white md:w-5 md:h-5" />}
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="prose dark:prose-invert max-w-none text-sm md:text-base">
          <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>
        
        {/* Message actions */}
        <div className="mt-1 md:mt-2 flex items-center gap-1 md:gap-2">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap gap-1 md:gap-2">
            <button 
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Copy message"
            >
              {copied ? <Check size={12} className="text-green-500 md:w-3.5 md:h-3.5" /> : <Copy size={12} className="md:w-3.5 md:h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            
            {isAI && (
              <>
                <button 
                  onClick={() => handleFeedback('positive')}
                  className={`text-xs p-1 rounded flex items-center gap-1 transition-colors ${
                    feedback === 'positive' 
                      ? 'text-green-500 bg-green-100 dark:bg-green-900/20' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  aria-label="Helpful"
                >
                  <ThumbsUp size={12} className="md:w-3.5 md:h-3.5" />
                  <span className="hidden sm:inline">Helpful</span>
                </button>
                
                <button 
                  onClick={() => handleFeedback('negative')}
                  className={`text-xs p-1 rounded flex items-center gap-1 transition-colors ${
                    feedback === 'negative' 
                      ? 'text-red-500 bg-red-100 dark:bg-red-900/20' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  aria-label="Not helpful"
                >
                  <ThumbsDown size={12} className="md:w-3.5 md:h-3.5" />
                  <span className="hidden sm:inline">Not helpful</span>
                </button>
              </>
            )}
            
            <button 
              onClick={() => setShowActions(!showActions)}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="More options"
            >
              <MoreVertical size={12} className="md:w-3.5 md:h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
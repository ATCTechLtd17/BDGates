import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MessageSquarePlus, MessageCircle, LogOut, Sun, Moon, Search, ChevronRight, User, Settings, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store/store';
import { motion, AnimatePresence } from 'framer-motion';

// Constants
const MOBILE_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 280;
const COLLAPSED_WIDTH = 80;

// Utility functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Types
interface Chat {
  id: number;
  title: string;
  date: string;
}

// Memoized chat item component
const ChatItem = React.memo(({ 
  chat, 
  isActive, 
  onClick 
}: { 
  chat: Chat;
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm group relative ${
      isActive ? 'bg-white/10 border-l-4 border-blue-500' : ''
    }`}
  >
    <div className={`p-1.5 rounded-md ${isActive ? 'bg-blue-500' : 'bg-gray-700 group-hover:bg-gray-600'}`}>
      <MessageCircle size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="truncate">{chat.title}</p>
      <p className="text-xs text-gray-400">{formatDate(chat.date)}</p>
    </div>
  </button>
));

ChatItem.displayName = 'ChatItem';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  // Memoized dummy chats
  const dummyChats = useMemo<Chat[]>(() => [
    { id: 1, title: 'Business Planning Discussion', date: '2023-06-15' },
    { id: 2, title: 'Tax Consultation', date: '2023-06-14' },
    { id: 3, title: 'VAT Registration Help', date: '2023-06-13' },
    { id: 4, title: 'Ministry Guidelines', date: '2023-06-12' },
  ], []);

  // Memoized filtered chats
  const filteredChats = useMemo(() => 
    dummyChats.filter(chat => 
      chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [dummyChats, searchQuery]
  );

  // Optimized resize handler with debounce
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth < MOBILE_BREAKPOINT;
        setIsMobile(mobile);
        if (mobile) {
          setIsCollapsed(true);
        }
      }, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoized handlers
  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  const handleNewChat = useCallback(() => {
    // Logic to create a new chat
    console.log('Creating new chat');
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleChatClick = useCallback((chatId: number) => {
    navigate(`/chat/${chatId}`);
  }, [navigate]);

  // Mobile menu toggle button component
  const MobileMenuToggle = () => (
    <button 
      onClick={toggleMobileMenu}
      className="fixed top-3 left-3 z-50 p-2 rounded-lg bg-gray-800/90 backdrop-blur-sm text-white shadow-lg md:hidden hover:bg-gray-700 transition-colors"
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );

  // Mobile menu overlay
  const MobileMenuOverlay = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-screen w-[280px] bg-gradient-to-b from-gray-900 to-gray-800 text-white z-50 md:hidden flex flex-col shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">BDgates</h1>
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Signed in as</p>
                  <p className="font-medium truncate max-w-[150px]">{user?.email}</p>
                </div>
              </div>
              <button className="w-full mt-2 flex items-center gap-2 text-xs text-gray-400 hover:text-gray-200 transition-colors">
                <Settings size={14} />
                <span>Account Settings</span>
              </button>
            </div>
            
            <button 
              onClick={handleNewChat}
              className="mx-4 mt-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all rounded-lg p-3 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <MessageSquarePlus size={18} />
              New Chat
            </button>

            <div className="px-4 mt-4 relative">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {filteredChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={location.pathname === `/chat/${chat.id}`}
                  onClick={() => handleChatClick(chat.id)}
                />
              ))}
            </div>

            <div className="p-4 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 hover:bg-white/10 transition-colors rounded-lg p-3 text-sm group"
              >
                <div className="p-1.5 rounded-md bg-red-500/20 group-hover:bg-red-500/30">
                  <LogOut size={16} className="text-red-400" />
                </div>
                Sign out
              </button>
            </div>

            <div className="p-4 border-t border-gray-700 text-xs text-gray-400 flex items-center justify-between">
              <span>Powered by ATC Tech Ltd.</span>
              <span className="text-gray-500">v1.0.0</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen flex flex-col transition-all duration-300 ease-in-out shadow-lg relative hidden md:flex`}>
      {/* Toggle collapse button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-gray-800 p-1 rounded-full shadow-md hover:bg-gray-700 transition-colors z-10"
      >
        <ChevronRight size={16} className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">BDgates</h1>}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-300" />}
        </button>
      </div>
      
      {/* User profile */}
      <div className="p-4 border-b border-gray-700">
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-300">Signed in as</p>
                <p className="font-medium truncate max-w-[150px]">{user?.email}</p>
              </div>
            </div>
            <button className="w-full mt-2 flex items-center gap-2 text-xs text-gray-400 hover:text-gray-200 transition-colors">
              <Settings size={14} />
              <span>Account Settings</span>
            </button>
          </>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <User size={20} />
            </div>
          </div>
        )}
      </div>
      
      {/* New Chat Button */}
      <button 
        onClick={handleNewChat}
        className="mx-4 mt-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all rounded-lg p-3 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <MessageSquarePlus size={18} />
        {!isCollapsed && "New Chat"}
      </button>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-4 mt-4 relative">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {filteredChats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={location.pathname === `/chat/${chat.id}`}
            onClick={() => handleChatClick(chat.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 hover:bg-white/10 transition-colors rounded-lg p-3 text-sm group"
        >
          <div className="p-1.5 rounded-md bg-red-500/20 group-hover:bg-red-500/30">
            <LogOut size={16} className="text-red-400" />
          </div>
          {!isCollapsed && "Sign out"}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700 text-xs text-gray-400 flex items-center justify-between">
          <span>Powered by ATC Tech Ltd.</span>
          <span className="text-gray-500">v1.0.0</span>
        </div>
      )}
    </aside>
  );

  return (
    <>
      <MobileMenuToggle />
      <MobileMenuOverlay />
      <DesktopSidebar />
    </>
  );
};

export default React.memo(Sidebar);
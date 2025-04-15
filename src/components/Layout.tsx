import React from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { useTheme } from '../context/ThemeContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`h-screen flex ${isDark ? 'dark' : ''}`}>
      <Sidebar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {children}
      </main>
    </div>
  );
};

export default Layout;
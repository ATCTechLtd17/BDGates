import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard content will go here */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Welcome!</h2>
              <p className="text-gray-600">
                This is your dashboard. Content will be added here soon.
              </p>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard; 
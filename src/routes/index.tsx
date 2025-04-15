import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Components
import Login from '../components/Login';
import Register from '../components/Register';
import HomePage from '../pages/HomePage';
import ChatWindow from '../components/ChatWindow';
import Settings from '../pages/Settings';
import Sidebar from '../components/Sidebar';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Authenticated Layout Component
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

// Public Routes
export const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/features',
    element: <HomePage />,
  },
  {
    path: '/pricing',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <HomePage />,
  },
  {
    path: '/contact',
    element: <HomePage />,
  },
  {
    path: '/demo',
    element: <HomePage />,
  },
  {
    path: '/privacy',
    element: <HomePage />,
  },
  {
    path: '/terms',
    element: <HomePage />,
  },
];

// Protected Routes
export const protectedRoutes = [
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <ChatWindow />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/chat/:id',
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <ChatWindow />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <Settings />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
];

// Catch-all Route
export const catchAllRoute = {
  path: '*',
  element: <Navigate to="/" replace />,
}; 
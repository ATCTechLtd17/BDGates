import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { logoutAsync } from './store/slices/authSlice';
import { Toaster } from 'react-hot-toast';
import { publicRoutes, protectedRoutes, catchAllRoute } from './routes';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

        {/* Protected Routes */}
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

        {/* Catch-all Route */}
        <Route
          path={catchAllRoute.path}
          element={catchAllRoute.element}
        />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;
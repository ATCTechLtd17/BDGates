import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';

import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ChatWindow } from './components/ChatWindow';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ChatProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/chat"
                element={
                  <PrivateRoute>
                    <Layout>
                      <ChatWindow />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/chat" replace />} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
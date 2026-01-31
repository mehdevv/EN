import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Services from './pages/Services';
import SendMoney from './pages/SendMoney';
import Promotions from './pages/Promotions';
import Offers from './pages/Offers';
import Account from './pages/Account';
import TransferCredit from './pages/TransferCredit';
import TransferPackage from './pages/TransferPackage';
import Games from './pages/Games';
import Loyalty from './pages/Loyalty';
import Chatbot from './pages/Chatbot';
import DepositBalance from './pages/DepositBalance';
import './index.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        }
      />
      <Route
        path="/send-money"
        element={
          <ProtectedRoute>
            <SendMoney />
          </ProtectedRoute>
        }
      />
      <Route
        path="/promotions"
        element={
          <ProtectedRoute>
            <Promotions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/offers"
        element={
          <ProtectedRoute>
            <Offers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer-credit"
        element={
          <ProtectedRoute>
            <TransferCredit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer-package"
        element={
          <ProtectedRoute>
            <TransferPackage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/games"
        element={
          <ProtectedRoute>
            <Games />
          </ProtectedRoute>
        }
      />
      <Route
        path="/loyalty"
        element={
          <ProtectedRoute>
            <Loyalty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deposit-balance"
        element={
          <ProtectedRoute>
            <DepositBalance />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

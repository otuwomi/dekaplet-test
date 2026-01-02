import React from "react";
import "./App.css";
import "./styles/theme.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import Developers from "./pages/Developers";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardHome from "./pages/Dashboard";
// User Dashboard Pages
import Wallets from "./pages/dashboard/Wallets";
import Transactions from "./pages/dashboard/Transactions";
import Cashpoint from "./pages/dashboard/Cashpoint";
import Compliance from "./pages/dashboard/Compliance";
import Referrals from "./pages/dashboard/Referrals";
import Support from "./pages/dashboard/Support";
import Settings from "./pages/dashboard/Settings";
// Admin Dashboard Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import AdminTransactions from "./pages/admin/TransactionsManagement";
import AdminWithdrawals from "./pages/admin/WithdrawalsManagement";
import AdminKyc from "./pages/admin/KycManagement";
import AdminContacts from "./pages/admin/ContactsManagement";
import AdminSupport from "./pages/admin/SupportManagement";
import AdminSettings from "./pages/admin/AdminSettings";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div 
            className="w-12 h-12 rounded-xl mx-auto mb-4 animate-pulse"
            style={{ background: 'var(--brand-gradient)' }}
          />
          <div style={{ color: 'var(--text-muted)' }}>Loading...</div>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Public routes with header/footer */}
        <Route path="/" element={
          <><Header /><Home /><Footer /></>
        } />
        <Route path="/how-it-works" element={
          <><Header /><HowItWorks /><Footer /></>
        } />
        <Route path="/features" element={
          <><Header /><Features /><Footer /></>
        } />
        <Route path="/developers" element={
          <><Header /><Developers /><Footer /></>
        } />
        <Route path="/pricing" element={
          <><Header /><Pricing /><Footer /></>
        } />
        <Route path="/about" element={
          <><Header /><About /><Footer /></>
        } />
        <Route path="/contact" element={
          <><Header /><Contact /><Footer /></>
        } />
        <Route path="/privacy" element={
          <><Header /><Privacy /><Footer /></>
        } />
        <Route path="/terms" element={
          <><Header /><Terms /><Footer /></>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected dashboard routes (no header/footer) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/wallets" 
          element={
            <ProtectedRoute>
              <Wallets />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/transactions" 
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/cashpoint" 
          element={
            <ProtectedRoute>
              <Cashpoint />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/compliance" 
          element={
            <ProtectedRoute>
              <Compliance />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/referrals" 
          element={
            <ProtectedRoute>
              <Referrals />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/support" 
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />

        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <AdminRoute>
              <UsersManagement />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/transactions" 
          element={
            <AdminRoute>
              <AdminTransactions />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/withdrawals" 
          element={
            <AdminRoute>
              <AdminWithdrawals />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/kyc" 
          element={
            <AdminRoute>
              <AdminKyc />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/contacts" 
          element={
            <AdminRoute>
              <AdminContacts />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/support" 
          element={
            <AdminRoute>
              <AdminSupport />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          } 
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

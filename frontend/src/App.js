import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
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
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
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
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home'; // Home Page
import LoginPage from './pages/Login'; // Login Page
import SignupPage from './pages/Signup'; // Signup Page
import About from './pages/About';
import FAQ from './pages/FAQ'; // FAQ Page
import AdminDashboardPage from './pages/AdminDashboardPage'; // Dashboard Page (Employee Management)
import PerformancePage from './pages/Performance'; // Performance Page (Employee Management) // Employee Page (Employee Management)
import AttendancePage from './pages/Attendance'; // Attendance Page (Employee Management)
import EmployeeManagement from './pages/EmployeeManagement'; // Employee Page (Employee Management)
import PayrollPage from './pages/Payroll'; // Payroll Page (Employee Management)
import Settings from './pages/SettingsPage'; // Settings Page (Employee Management)
import Contact from './pages/Contact'

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage />} />

        {/* Login and Signup routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Dashboard page route */}
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
       <Route path="/performance" element={<PerformancePage />} />
        <Route path="/payroll" element={<PayrollPage />} />
        <Route path ="/employeemanagement" element={<EmployeeManagement />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/contact" element={<Contact />} />
        

        {/* 404 Not Found route */}
        
        

       
      </Routes>
    </Router>
  );
}

export default App;

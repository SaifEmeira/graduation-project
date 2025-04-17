/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ForgetPassword from './components/ForgetPassword';
import VerifyOTP from './components/VerifyOTP';
import ResetPassword from './components/ResetPassword';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import Destinations from './components/Destinations/Destinations';
import Details from './components/Destinations/Details';

import AboutUs from './components/AboutUs';

export default function App() {
  return (
    <Router> {/* Home page */}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/details/:id" element={<Details />} />

        

        <Route path="/about" element={<AboutUs />} />

      </Routes>
    </Router>
  );
}

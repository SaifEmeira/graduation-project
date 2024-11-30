/* eslint-disable no-unused-vars */
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import LandingPage from './components/landingPage'

import Layout from './Components/Layout'
import ForgetPassword from './Components/ForgetPassword'
import VerifyOTP from './Components/VerifyOTP'
import ResetPassword from './Components/ResetPassword'
import LoginForm from './Components/Login'
import Register from './Components/Register'
import LandingPage from './Components/landingPage'





export default function App() {


  const routes = createBrowserRouter([
    {
      path: "/", // Default route
      element: <Layout />,
    },
    {
      path: "/forgetPassword", // Default route
      element: <ForgetPassword />,
    },
    {
      path: "/Otp", // OTP verification route
      element: <VerifyOTP />,
    },
    {
      path: "/resetPassword", // OTP verification route
      element: <ResetPassword />,
    },
    {
      path: "/login", // OTP verification route
      element: <LoginForm />,
    },
    {
      path: "/register", // OTP verification route
      element: <Register />,
    },
  ]);
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

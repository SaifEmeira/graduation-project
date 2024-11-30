/* eslint-disable no-unused-vars */
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import LandingPage from './components/landingPage'

import Layout from './Components/Layout'
import ForgetPassword from './Components/ForgetPassword'
import VerifyOTP from './Components/VerifyOTP'
import ResetPassword from './Components/ResetPassword'





export default function App() {


  const routes = createBrowserRouter([
    {
      path: "/", // Default route
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
  ]);
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

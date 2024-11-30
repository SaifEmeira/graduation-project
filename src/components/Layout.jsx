import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import CustomNavbar from './Navbar'
import LandingPage from './landingPage'
import Register from './Register';
import Login from './Login';





export default function Layout() {
  return (
    <div>
        <CustomNavbar/>
        <LandingPage/>
        
        
       
    </div>
  )
}

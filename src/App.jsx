/* eslint-disable no-unused-vars */
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './components/landingPage'
import Section2LandingPage from './Components/Section2LandingPage';



export default function App() {


  let routes = createBrowserRouter([{
    path:'/',element:<Section2LandingPage/>,
  }])
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

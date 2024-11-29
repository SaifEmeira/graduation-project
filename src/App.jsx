/* eslint-disable no-unused-vars */
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './components/landingPage'



export default function App() {


  let routes = createBrowserRouter([{
    path:'/',element:<LandingPage/>,
  }])
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

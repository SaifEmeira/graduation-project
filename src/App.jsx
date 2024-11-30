/* eslint-disable no-unused-vars */
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import LandingPage from './components/landingPage'

import Layout from './Components/Layout'





export default function App() {


  let routes = createBrowserRouter([{

    path:'/',element:<Layout/>,



  }])
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

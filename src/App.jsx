/* eslint-disable no-unused-vars */
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './components/landingPage'
<<<<<<< HEAD
import Layout from './components/Layout'

=======
import Section2LandingPage from './Components/Section2LandingPage';
>>>>>>> origin/master



export default function App() {


  let routes = createBrowserRouter([{
<<<<<<< HEAD
    path:'/',element:<Layout/>,

=======
    path:'/',element:<Section2LandingPage/>,
>>>>>>> origin/master
  }])
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

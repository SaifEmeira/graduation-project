/* eslint-disable no-unused-vars */

import landingImage from '../assets/Landingimage.png'
import React from 'react'
import Section2LandingPage from './Section2LandingPage'


export default function LandingPage() {

  


  return (
    <>
    <div
  
  className="d-flex justify-content-center align-items-center vh-100"
  style={{
    backgroundImage: `url(${landingImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      // height: "100vh", // Full height of the viewport
      
  }}
>
  <div className='flex-column d-flex justify-content-center align-items-center'>
  <h1 className='text-white ' style={{ fontSize: "120px" }}>T R A V E L</h1>
  <p className='text-white' style={{ fontSize: "40px" }}>Visit the most historic country in the world</p>
  </div>


  
</div>
<Section2LandingPage/>
    </>
    
  )
}
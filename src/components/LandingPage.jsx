/* eslint-disable no-unused-vars */

import landingImage from '../assets/LandingImage.png'
import React from 'react'
import Section2LandingPage from './Section2LandingPage'
import { FaArrowDown, FaPlaneDeparture } from 'react-icons/fa';



export default function LandingPage() {
  // Animated scroll to Section2
  const scrollToSection2 = () => {
    const section = document.getElementById('section2-landing');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100 position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${landingImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className='flex-column d-flex justify-content-center align-items-center text-center'>
          <h1 className='text-white fw-bold animate__animated animate__fadeInDown' style={{ fontSize: "110px", letterSpacing: 18, textShadow: "0 4px 32px #000" }}>
            <FaPlaneDeparture className="me-3 mb-2 text-warning" style={{ fontSize: 80 }} />T R A V E L
          </h1>
          <p className='text-white animate__animated animate__fadeInUp' style={{ fontSize: "38px", textShadow: "0 2px 12px #000" }}>
            Visit the most historic country in the world
          </p>
          <button
            className="btn btn-warning btn-lg rounded-pill mt-4 px-5 fw-bold animate__animated animate__pulse animate__infinite"
            style={{ fontSize: 24, boxShadow: "0 2px 16px #ffc10755" }}
            onClick={scrollToSection2}
          >
            Explore Destinations <FaArrowDown className="ms-2" />
          </button>
        </div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 animate__animated animate__bounce animate__infinite">
          <FaArrowDown className="text-warning" style={{ fontSize: 48 }} />
        </div>
      </div>
      <div id="section2-landing">
        <Section2LandingPage />
      </div>
    </>
  );
}
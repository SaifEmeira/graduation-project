/* eslint-disable no-unused-vars */


import React from 'react'
import giza from '../assets/giza.jpg'
import luxor from '../assets/wallpaperflare.com_wallpaper (11).jpg'
import sharm from '../assets/oleksandr-podoima-kYRvuhAA93k-unsplash.jpg'
import alexandria from '../assets/pexels-cristian-bagnarello-3619432-5727263.jpg'
import hurghada from '../assets/steptodowncom280983.png'
import aswan from '../assets/wallpaperflare.com_wallpaper (13).jpg'
export default function Section2LandingPage() {
  return (
    <div className='bg-black overflow-hidden py-3 '>
      <div className='text-center'>
    <h3 className='text-white fw-bold'>BEST DESTINATION</h3>
    <p className='text-white'>Explore the enchanting landscapes of Egypt, from the breathtaking deserts to the stunning coastal shores.</p>
      </div>
      <div className="row g-1 py-3 px-5">
        {/* Giza */}
        <div className="col-4">
          <div className="card shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={giza}
              alt="Giza"
              className="card-img-top"
              style={{ borderRadius: '15px', height: '400px' }}
            />
            <div className="card-img-overlay d-flex flex-column align-items-start">
              <h5 className="card-title">Giza</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>

          <div className="card my-2 shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={aswan}
              alt="Aswan"
              className="card-img-top"
              style={{ borderRadius: "15px" ,height:"200px" }}
            />
            <div className="card-img-overlay d-flex align-items-start flex-column">
              <h5 className="card-title">Aswan</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>
        </div>

        {/* Luxor */}
        <div className="col-4 "style={{ height: '200px' }} >
          <div className="card shadow-lg text-white border-0" style={{ borderRadius: "15px", }}>
            <img
              src={luxor}
              alt="Luxor"
              className="card-img-top"
              style={{ borderRadius: '15px', height: '200px' }}
            />
            <div className="card-img-overlay d-flex align-items-start flex-column">
              <h5 className="card-title">Luxor</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>
          <div className="card my-2 shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={hurghada}
              alt="Hurghada"
              className="card-img-top"
              style={{ borderRadius: '15px', height: '400px' }}
            />
            <div className="card-img-overlay d-flex align-items-start flex-column">
              <h5 className="card-title">Hurghada</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>
          
        </div>

        {/* Sharm El-Sheikh */}
        <div className="col-4">
          <div className="card shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={sharm}
              alt="Sharm El-Sheikh"
              className="card-img-top w-100"
              style={{ borderRadius: '15px', height: '400px' }}
            />
            <div className="card-img-overlay d-flex align-items-start flex-column">
              <h5 className="card-title">Sharm El-Sheikh</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>

          <div className="card my-2 shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={alexandria}
              alt="Alexandria"
              className="card-img-top"
              style={{ borderRadius: "15px" , height: '200px' }}
            />
            <div className="card-img-overlay d-flex flex-column align-items-start">
              <h5 className="card-title fw-bolder fs-2">Alexandria</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>
        </div>

        {/* Aswan */}
        {/* <div className="col-12 col-md-4">
          <div className="card shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={aswan}
              alt="Aswan"
              className="card-img-top"
              style={{ borderRadius: "15px" }}
            />
            <div className="card-img-overlay d-flex align-items-end">
              <h5 className="card-title">Aswan</h5>
            </div>
          </div>
        </div> */}

        {/* Hurghada */}
        {/* <div className="col-12 col-md-4">
          <div className="card shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={hurghada}
              alt="Hurghada"
              className="card-img-top"
              style={{ borderRadius: '15px', height: '400px' }}
            />
            <div className="card-img-overlay d-flex align-items-end">
              <h5 className="card-title">Hurghada</h5>
            </div>
          </div>
        </div> */}

        

        {/* Alexandria */}
        {/* <div className="col-12 col-md-4">
          <div className="card shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={alexandria}
              alt="Alexandria"
              className="card-img-top"
              style={{ borderRadius: "15px" }}
            />
            <div className="card-img-overlay d-flex align-items-end">
              <h5 className="card-title">Alexandria</h5>
            </div>
          </div>
        </div> */}
      </div>
    </div>

    
  )
}

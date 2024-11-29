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
    <h2 className='text-white fw-bold'  style={{ fontFamily: 'Bebas Neue' }}>BEST DESTINATION</h2>
    <p className='text-white' >Explore the enchanting landscapes of Egypt, from the breathtaking deserts to the stunning coastal shores.</p>
      </div>
      <div className="row g-1 py-3 px-5">
        {/* Giza */}
        <div className="col-4">
          <div className="card m-2 shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={giza}
              alt="Giza"
              className="card-img-top"
              style={{ borderRadius: '15px', height: '400px' }}
            />
            <div className="card-img-overlay d-flex flex-column align-items-start">
              <h5 className="card-title" style={{ fontFamily: 'Bebas Neue' }}>Giza</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>

          <div className="card m-2 shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={aswan}
              alt="Aswan"
              className="card-img-top"
              style={{ borderRadius: "15px" ,height:"200px" }}
            />
            <div className="card-img-overlay d-flex align-items-start flex-column">
              <h5 className="card-title" style={{ fontFamily: 'Bebas Neue' }}>Aswan</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>
        </div>

        {/* Luxor */}
        <div className="col-4 "style={{ height: '200px' }} >
          <div className="card m-2 shadow-lg text-white border-0" style={{ borderRadius: "15px", }}>
            <img
              src={luxor}
              alt="Luxor"
              className="card-img-top"
              style={{ borderRadius: '15px', height: '200px' }}
            />
            <div className="card-img-overlay d-flex align-items-start flex-column">
              <h5 className="card-title" style={{ fontFamily: 'Bebas Neue' }}>Luxor</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>
          <div className="card m-2 shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={hurghada}
              alt="Hurghada"
              className="card-img-top"
              style={{ borderRadius: '15px', height: '400px' }}
            />
            <div className="card-img-overlay d-flex align-items-start flex-column">
              <h5 className="card-title" style={{ fontFamily: 'Bebas Neue' }}>Hurghada</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>
          
        </div>

        {/* Sharm El-Sheikh */}
        <div className="col-4">
          <div className="card m-2 shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={sharm}
              alt="Sharm El-Sheikh"
              className="card-img-top w-100"
              style={{ borderRadius: '15px', height: '400px' }}
            />
            <div className="card-img-overlay d-flex align-items-start flex-column">
              <h5 className="card-title" style={{ fontFamily: 'Bebas Neue' }}>Sharm El-Sheikh</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>

          <div className="card m-2 shadow-lg text-white border-0" style={{ borderRadius: "15px" }}>
            <img
              src={alexandria}
              alt="Alexandria"
              className="card-img-top"
              style={{ borderRadius: "15px" , height: '200px' }}
            />
            <div className="card-img-overlay d-flex flex-column align-items-start">
              <h5 className="card-title fw-bolder fs-2" style={{ fontFamily: 'Bebas Neue' }}>Alexandria</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>

            </div>
          </div>
        </div>

       
      </div>
    </div>

    
  )
}

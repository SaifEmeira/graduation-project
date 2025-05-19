/* eslint-disable no-unused-vars */


import React, { useState } from 'react'
import giza from '../assets/giza.jpg'
import luxor from '../assets/wallpaperflare.com_wallpaper (11).jpg'
import sharm from '../assets/oleksandr-podoima-kYRvuhAA93k-unsplash.jpg'
import alexandria from '../assets/pexels-cristian-bagnarello-3619432-5727263.jpg'
import hurghada from '../assets/steptodowncom280983.png'
import aswan from '../assets/wallpaperflare.com_wallpaper (13).jpg'
import { FaMapMarkerAlt, FaStar, FaRegHeart, FaHeart, FaInfoCircle } from 'react-icons/fa';

export default function Section2LandingPage() {
  const [favorites, setFavorites] = useState([]);
  const destinations = [
    {
      name: 'Giza',
      img: giza,
      desc: 'Marvel at the Pyramids and Sphinx in the heart of Egypt.',
      rating: 4.9,
      location: 'Giza',
      featured: true
    },
    {
      name: 'Aswan',
      img: aswan,
      desc: 'Experience the beauty of the Nile and Nubian culture.',
      rating: 4.7,
      location: 'Aswan',
      featured: false
    },
    {
      name: 'Luxor',
      img: luxor,
      desc: 'Walk through the Valley of the Kings and ancient temples.',
      rating: 4.8,
      location: 'Luxor',
      featured: true
    },
    {
      name: 'Hurghada',
      img: hurghada,
      desc: 'Relax on the Red Sea beaches and enjoy vibrant nightlife.',
      rating: 4.6,
      location: 'Hurghada',
      featured: false
    },
    {
      name: 'Sharm El-Sheikh',
      img: sharm,
      desc: 'Dive into crystal-clear waters and coral reefs.',
      rating: 4.7,
      location: 'Sharm El-Sheikh',
      featured: true
    },
    {
      name: 'Alexandria',
      img: alexandria,
      desc: 'Discover the Mediterranean charm and ancient wonders.',
      rating: 4.5,
      location: 'Alexandria',
      featured: false
    }
  ];

  const toggleFavorite = (name) => {
    setFavorites(favs => favs.includes(name) ? favs.filter(f => f !== name) : [...favs, name]);
  };

  return (
    <div className='bg-black overflow-hidden py-3'>
      <div className='text-center'>
        <h2 className='text-white fw-bold' style={{ fontFamily: 'Bebas Neue', letterSpacing: 2 }}>BEST DESTINATION</h2>
        <p className='text-white'>Explore the enchanting landscapes of Egypt, from the breathtaking deserts to the stunning coastal shores.</p>
      </div>
      <div className="row g-3 py-3 px-5">
        {destinations.map((dest, idx) => (
          <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch" key={dest.name}>
            <div className="card m-2 shadow-lg text-white border-0 position-relative w-100 h-100 animate__animated animate__fadeInUp" style={{ borderRadius: 15, minHeight: 320, background: 'rgba(30,30,30,0.95)' }}>
              <img
                src={dest.img}
                alt={dest.name}
                className="card-img-top"
                style={{ borderRadius: 15, height: 220, objectFit: 'cover', filter: dest.featured ? 'brightness(1.1)' : 'brightness(0.95)' }}
              />
              <div className="card-img-overlay d-flex flex-column justify-content-between p-3" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.3) 60%,rgba(0,0,0,0.8) 100%)', borderRadius: 15 }}>
                <div>
                  <h5 className="card-title mb-1" style={{ fontFamily: 'Bebas Neue', fontSize: 28 }}>{dest.name} {dest.featured && <span className="badge bg-warning text-dark ms-2">Featured</span>}</h5>
                  <p className="mb-2 small"><FaMapMarkerAlt className="me-1 text-warning" /> {dest.location}</p>
                  <p className="mb-2 small"><FaStar className="me-1 text-warning" /> {dest.rating} / 5</p>
                  <p className="mb-2">{dest.desc}</p>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <button className={`btn btn-sm ${favorites.includes(dest.name) ? 'btn-danger' : 'btn-outline-light'} rounded-circle`} title="Add to Favorites" onClick={() => toggleFavorite(dest.name)}>
                    {favorites.includes(dest.name) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <button className="btn btn-sm btn-warning rounded-pill fw-bold" title="More Info" onClick={() => alert(`More info about ${dest.name} coming soon!`)}>
                    <FaInfoCircle className="me-1" /> Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <span className="badge bg-info text-dark fs-6 px-4 py-2 animate__animated animate__pulse animate__infinite">Discover more destinations soon!</span>
      </div>
    </div>
  );
}

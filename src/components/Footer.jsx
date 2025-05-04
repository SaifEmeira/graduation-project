import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="hamda py-12 px-6 md:px-20 mt-auto">
      <div className="d-flex flex-row justify-content-around align-items-center">
        {/* Logo + Description */}
        <div className='w-25'>
          <h2 className="text-4xl font-bold text-orange-600 mb-4">LOCO</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare libero nec mauris laoreet maximus Lorem ipsum dolor sit amet.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-bold mb-3">Home</h3>
          <ul className="space-y-2 text-white text-sm font-medium">
            <li>Destinations</li>
            <li>Trips</li>
            <li>Blog</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm text-white">
            <li className="flex items-center gap-2 text-orange-500">
              <FaMapMarkerAlt />
              <span className="text-white">Tanta, Egypt</span>
            </li>
            <li className="flex items-center gap-2 text-orange-500">
              <FaPhoneAlt />
              <span className="text-white">+1020176500</span>
            </li>
            <li className="flex items-center gap-2 text-orange-500">
              <FaEnvelope />
              <span className="text-white">Travel@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="d-flex gap-4 text-2xl ">
            <FaTwitter />
            <FaFacebookF />
            <FaGoogle />
          </div>
        </div>
      </div>
    </footer>
  );
}

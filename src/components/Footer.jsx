import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="hamda py-5 px-3 px-md-5 mt-auto" style={{ background: 'linear-gradient(135deg, #1e1b18 60%, #b38600 100%)' }}>
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center g-4">
          {/* Logo + Description */}
          <div className='col-12 col-md-3 mb-4 mb-md-0'>
            <h2 className="fw-bold" style={{ color: '#b38600', letterSpacing: 2, fontFamily: 'Bebas Neue', fontSize: 36 }}>LOCO</h2>
            <p className="text-light small mb-3">
              Discover Egypt's wonders with LOCO. Your adventure starts here—explore, dream, and travel with us!
            </p>
            <div className="d-flex gap-3 mt-2">
              <a href="#" className="fs-4" style={{ color: '#b38600' }} title="Instagram"><FaInstagram /></a>
              <a href="#" className="fs-4" style={{ color: '#b38600' }} title="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled text-light small">
              <li><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li><a href="/destinations" className="text-decoration-none text-light">Destinations</a></li>
              <li><a href="/trips" className="text-decoration-none text-light">Trips</a></li>
              <li><a href="/blog" className="text-decoration-none text-light">Blog</a></li>
              <li><a href="/about" className="text-decoration-none text-light">About Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-6 col-md-3">
            <h5 className="fw-bold text-white mb-3">Contact</h5>
            <ul className="list-unstyled text-light small">
              <li className="d-flex align-items-center mb-2">
                <FaMapMarkerAlt className="me-2" style={{ color: '#b38600' }} />
                <span>Tanta, Egypt</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <FaPhoneAlt className="me-2" style={{ color: '#b38600' }} />
                <span>+1020176500</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <FaEnvelope className="me-2" style={{ color: '#b38600' }} />
                <span>Travel@gmail.com</span>
              </li>
            </ul>
            <div className="mt-3">
              <a href="mailto:Travel@gmail.com" className="btn btn-sm rounded-pill px-3 fw-bold" style={{ backgroundColor: '#b38600', color: '#fff', border: 'none' }}>Email Us</a>
            </div>
          </div>

          {/* Social */}
          <div className="col-12 col-md-3 text-center text-md-end">
            <h5 className="fw-bold text-white mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-2">
              <a href="#" className="fs-4" style={{ color: '#b38600' }} title="Twitter"><FaTwitter /></a>
              <a href="#" className="fs-4" style={{ color: '#b38600' }} title="Facebook"><FaFacebookF /></a>
              <a href="#" className="fs-4" style={{ color: '#b38600' }} title="Google"><FaGoogle /></a>
            </div>
            <div className="text-light small mt-3">
              <span className="badge bg-dark" style={{ color: '#b38600' }}>&copy; {new Date().getFullYear()} LOCO. All rights reserved.</span>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center">
            <span className="text-light small">Made with <span style={{ color: '#b38600' }}>&#10084;</span> by the LOCO Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

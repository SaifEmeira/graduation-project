import { useState } from "react";
import landingImage from '../assets/_methode_times_prod_web_bin_99fb9468-4b44-406d-a4c2-5646791b6367.jpg';
import CustomNavbar from "./Navbar";
import Footer from "./Footer";
import { FaFacebook, FaTwitter, FaInstagram, FaPaperclip, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "general",
    message: "",
    agreed: false,
    attachment: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const maxMessageLength = 500;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, attachment: files[0] });
    } else if (name === "message") {
      setFormData({ ...formData, message: value });
      setMessageCount(value.length);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("You must agree to the terms and conditions before submitting.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        inquiryType: "general",
        message: "",
        agreed: false,
        attachment: null
      });
      setMessageCount(0);
    }, 1500); // Simulate async
  };

  return (
    <>
      <CustomNavbar />
      {/* --- Creative Contact Section --- */}
      <div
        className="py-5 text-white overflow-hidden position-relative"
        style={{
          backgroundImage: `linear-gradient(120deg,rgba(255,193,7,0.13),rgba(23,162,184,0.13)), linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${landingImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
      >
        {/* Animated Blobs */}
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,overflow:'hidden'}}>
          <div style={{position:'absolute',width:220,height:220,background:'rgba(255,193,7,0.18)',borderRadius:'50%',top:30,left:60,filter:'blur(30px)',animation:'float1 8s ease-in-out infinite'}}></div>
          <div style={{position:'absolute',width:180,height:180,background:'rgba(23,162,184,0.15)',borderRadius:'50%',top:200,right:80,filter:'blur(30px)',animation:'float2 10s ease-in-out infinite'}}></div>
          <style>{`
            @keyframes float1 { 0%{transform:translateY(0);} 50%{transform:translateY(40px);} 100%{transform:translateY(0);} }
            @keyframes float2 { 0%{transform:translateY(0);} 50%{transform:translateY(-30px);} 100%{transform:translateY(0);} }
          `}</style>
        </div>
        <div className="row justify-content-center position-relative" style={{zIndex:2}}>
          <div className="col-md-8 py-5 mt-5">
            <h2 className="text-center fw-bold mb-4 animate__animated animate__fadeInDown" style={{letterSpacing:4}}>
              <span style={{color:'#ffc107'}}>Contact</span> <span style={{color:'#17a2b8'}}>Us</span>
            </h2>
            {/* Social Media Links with tooltips and animation */}
            <div className="d-flex justify-content-center gap-4 mb-4 animate__animated animate__fadeInUp">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-icon-link">
                <FaFacebook size={32} color="#fff" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" className="social-icon-link">
                <FaTwitter size={32} color="#fff" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-icon-link">
                <FaInstagram size={32} color="#fff" />
              </a>
            </div>
            {/* Map Embed with creative border */}
            <div className="mb-4 text-center animate__animated animate__fadeIn">
              <div style={{ borderRadius: '18px', overflow: 'hidden', display: 'inline-block', boxShadow: '0 2px 16px #ffc10755, 0 2px 8px rgba(0,0,0,0.2)', border: '3px solid #17a2b8' }}>
                <iframe
                  title="Our Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0123456789!2d31.235711315117!3d30.0444199818797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c123456789%3A0xabcdef123456789!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1680000000000!5m2!1sen!2seg"
                  width="320"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-2"><FaMapMarkerAlt /> <span className="fw-bold text-info">Cairo, Egypt</span></div>
            </div>
            {/* Animated divider */}
            <div className="mx-auto my-4 animate__animated animate__fadeIn" style={{width:120, height:6, background:'linear-gradient(90deg,#ffc107,#17a2b8)', borderRadius:3, boxShadow:'0 2px 12px #ffc10755'}}></div>
            {/* Success message */}
            {submitted && (
              <div className="alert alert-success text-center animate__animated animate__fadeIn" role="alert">
                Thanks for contacting us! We'll get back to you shortly.
              </div>
            )}
            {/* Contact Form with glassmorphism effect */}
            <form onSubmit={handleSubmit} className="p-4 rounded shadow position-relative animate__animated animate__fadeInUp" style={{ background: "rgba(44,40,37,0.85)", backdropFilter: "blur(6px)", border: '2px solid #ffc10733' }}>
              {loading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "rgba(44,40,37,0.8)", zIndex: 10 }}>
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="name" className="form-label" title="Enter your full name">Your Name</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={50}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" title="We'll never share your email.">Email Address</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label" title="Optional, but helps us reach you.">Phone Number (optional)</label>
                <input
                  type="tel"
                  className="form-control bg-dark text-white"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label" title="What is your message about?">Subject</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  maxLength={60}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inquiryType" className="form-label" title="Choose the type of your inquiry">Type of Inquiry</label>
                <select
                  className="form-select bg-dark text-white"
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                >
                  <option value="general">General</option>
                  <option value="support">Technical Support</option>
                  <option value="booking">Booking</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label" title="Type your message here">Your Message</label>
                <textarea
                  className="form-control bg-dark text-white"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={maxMessageLength}
                ></textarea>
                <div className="text-end small text-secondary">
                  {messageCount}/{maxMessageLength} characters
                </div>
              </div>
              {/* File Attachment */}
              <div className="mb-3">
                <label htmlFor="attachment" className="form-label" title="Attach a file if needed">Attachment <FaPaperclip /></label>
                <input
                  type="file"
                  className="form-control bg-dark text-white"
                  id="attachment"
                  name="attachment"
                  onChange={handleChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
                {formData.attachment && (
                  <div className="mt-1 small text-success">Selected: {formData.attachment.name}</div>
                )}
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="agreed">
                  I agree to the terms and conditions.
                </label>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-warning rounded-pill fw-bold" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
              {/* Add a fun fact or tip below the form */}
              <div className="text-center mt-4 animate__animated animate__fadeInUp" style={{fontStyle:'italic',color:'#ffc107'}}>
                <span role="img" aria-label="lightbulb">💡</span> Tip: Attach a file or screenshot for faster support!
              </div>
            </form>
          </div>
        </div>
        {/* Social icon hover effect */}
        <style>{`
          .social-icon-link { transition: transform 0.2s, box-shadow 0.2s; border-radius:50%; padding:8px; }
          .social-icon-link:hover { background:#ffc10722; transform: scale(1.15) rotate(-8deg); box-shadow:0 4px 16px #ffc10755; }
        `}</style>
      </div>
      <Footer />
    </>
  );
}

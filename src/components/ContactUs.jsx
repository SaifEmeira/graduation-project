import { useState } from "react";
import landingImage from '../assets/_methode_times_prod_web_bin_99fb9468-4b44-406d-a4c2-5646791b6367.jpg';
import CustomNavbar from "./Navbar";
import Footer from "./Footer";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "general",
    message: "",
    agreed: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("You must agree to the terms and conditions before submitting.");
      return;
    }
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      inquiryType: "general",
      message: "",
      agreed: false
    });
  };

  return (
    <>
      <CustomNavbar />
      <div
        className="py-5 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${landingImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-8 py-5 mt-5">
            <h2 className="text-center fw-bold mb-4">Contact Us</h2>
            {submitted && (
              <div className="alert alert-success text-center" role="alert">
                Thanks for contacting us! We'll get back to you shortly.
              </div>
            )}
            <form onSubmit={handleSubmit} className="p-4 rounded shadow" style={{ backgroundColor: "#2c2825" }}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
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
                <label htmlFor="phone" className="form-label">Phone Number (optional)</label>
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
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inquiryType" className="form-label">Type of Inquiry</label>
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
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  className="form-control bg-dark text-white"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
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
                <button type="submit" className="btn btn-warning rounded-pill fw-bold">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

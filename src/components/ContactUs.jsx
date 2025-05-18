import { useState } from "react";
import landingImage from '../assets/_methode_times_prod_web_bin_99fb9468-4b44-406d-a4c2-5646791b6367.jpg';
import CustomNavbar from "./Navbar";
import Footer from "./Footer";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend/email API
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
    <CustomNavbar />
    <div className=" py-5 text-white vh-100 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${landingImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      >
      <div className="row justify-content-center">
        <div className="col-md-8 py-5 mt-5">
          <h2 className="text-center fw-bold mb-4">Contact Us</h2>
          {submitted && (
            <div className="alert alert-success text-center" role="alert">
              Thank you for contacting us! We'll get back to you soon.
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
              <label htmlFor="email" className="form-label">Email address</label>
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

import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import GizaLogin from "../assets/gizaLogin.jpg";

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VerifyOTP from "./VerifyOTP";

export default function Register() {
  // State for toggling visibility of password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  // Formik logic with Yup validation schema
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "", // Added phoneNumber
      profilePictureUrl: "", // Added profilePictureUrl
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First Name must be at least 2 characters")
        .required("First Name is required"),
      lastName: Yup.string()
        .min(2, "Last Name must be at least 2 characters")
        .required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      try {
        // API Call
        const response = await axios.post("https://tourguide.tryasp.net/auth/Register", {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber, // Now submitted from form
          profilePictureUrl: values.profilePictureUrl, // Now submitted from form
        });
        localStorage.removeItem("token");
        localStorage.setItem("userEmail", values.email)
        console.log("API Response:", response.data);
        alert("Registration successful! 🚀");
        setIsRegistered(true);

      } catch (error) {
        console.error("Error during registration:", error.response?.data || error.message);
        
        // Store email in local storage
        ;
        console.log("Stored Email from localStorage:", localStorage.getItem("userEmail"));
  
        // Set registered state
        alert(error.response.data[0].description);
      }
    },
  });
  if (isRegistered) {
    return <VerifyOTP />;
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side - Image */}
        <div
          className="col-md-6 d-none d-md-block p-0"
          style={{
            backgroundImage: `url(${GizaLogin})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Side - Registration Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-dark text-light">
          <form className="w-75" onSubmit={(e) => {
  e.preventDefault(); // Prevent default behavior
  console.log("Before submit: Formik errors:", formik.errors); // Check for errors
  console.log("Before submit: Formik values:", formik.values); // Check current values
  formik.handleSubmit(e);
}}>
            <h1 className="text-center mb-3 fw-bold">GET STARTED</h1>
            <p className="text-center mb-4" style={{ color: "#8A8988", fontSize: "20px" }}>
              Sign up now and unlock exclusive access!
            </p>

            {/* Google Sign Up Button */}
            <button
              type="button"
              className="btn btn-outline-light w-100 mb-3 d-flex align-items-center justify-content-center"
            >
              <span>Continue With Google</span>
            </button>

            <div className="text-center text-muted my-3">OR</div>

            {/* First Name */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-control bg-dark text-light border-secondary ${
                  formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""
                }`}
                placeholder="Enter your first name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="invalid-feedback">{formik.errors.firstName}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-control bg-dark text-light border-secondary ${
                  formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""
                }`}
                placeholder="Enter your last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control bg-dark text-light border-secondary ${
                  formik.touched.email && formik.errors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Create Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`form-control bg-dark text-light border-secondary ${
                    formik.touched.password && formik.errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary bg-dark text-light border-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>




            {/* Phone Number */}
<div className="mb-3">
  <label htmlFor="phoneNumber" className="form-label">
    Phone Number (Optional)
  </label>
  <input
    type="text"
    id="phoneNumber"
    name="phoneNumber"
    className="form-control bg-dark text-light border-secondary"
    placeholder="Enter your phone number"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.phoneNumber}
  />
</div>

{/* Profile Picture URL */}
<div className="mb-3">
  <label htmlFor="profilePictureUrl" className="form-label">
    Profile Picture URL (Optional)
  </label>
  <input
    type="text"
    id="profilePictureUrl"
    name="profilePictureUrl"
    className="form-control bg-dark text-light border-secondary"
    placeholder="Enter image URL"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.profilePictureUrl}
  />
</div>


            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-warning w-100 mb-3 border-0"
              style={{ backgroundColor: "#AD764A" }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

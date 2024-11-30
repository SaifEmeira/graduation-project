import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import GizaLogin from "../assets/gizaLogin.jpg";

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Register() {
  // State for toggling visibility of password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Formik logic with Yup validation schema
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      terms: Yup.bool().oneOf([true], "You must accept the terms of service"),
    }),
    onSubmit: (values) => {
      alert("Form submitted successfully! 🚀");
      console.log(values);
    },
  });

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
          <form className="w-75" onSubmit={formik.handleSubmit}>
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

            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`form-control bg-dark text-light border-secondary ${
                  formik.touched.fullName && formik.errors.fullName ? "is-invalid" : ""
                }`}
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="invalid-feedback">{formik.errors.fullName}</div>
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

            {/* Create Password */}
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

            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-control bg-dark text-light border-secondary ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Re-enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary bg-dark text-light border-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className={`form-check-input ${
                  formik.touched.terms && formik.errors.terms ? "is-invalid" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.terms}
              />
              <label htmlFor="terms" className="form-check-label">
                I agree to the <a href="#" style={{ color: "#AD764A" }}>terms of service</a>
              </label>
              {formik.touched.terms && formik.errors.terms && (
                <div className="invalid-feedback">{formik.errors.terms}</div>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="btn btn-warning w-100 mb-3 border-0"
              style={{ backgroundColor: "#AD764A" }}
            >
              Sign Up
            </button>

            {/* Already have an account? */}
            <p className="text-center text-white">
              Already have an account?{" "}
              <a href="#" className="text-decoration-underline" style={{ color: "#AD764A" }}>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

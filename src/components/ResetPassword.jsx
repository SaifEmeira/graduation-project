import React, { useState } from "react";
import ahramat from "../assets/pexels-matteo-roman-1151921619-21316202.jpg"; // Replace with the correct image path
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message visibility
  
  // Formik setup
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form data:", values);
      navigate("/login");
      setSuccessMessage("Password reset successfully!"); // Show success message on form submit
      setTimeout(() => {
        setSuccessMessage(""); // Hide success message after 5 seconds
      }, 5000);
    },
  });

  return (
    <div className="reset-password-container">
      {/* Left Section */}
      <div className="image-section">
        <img
          src={ahramat} // Replace with your actual image path
          alt="Pyramids"
          className="background-image"
        />
      </div>

      {/* Right Section */}
      <div className="form-section">
        <h2 className="reset-title fs-1" style={{ fontFamily: "Bebas Neue" }}>
          RESET YOUR PASSWORD
        </h2>
        <p className="reset-description">
          Enter your New Password to access your account
        </p>

        {/* Success Message */}
        {successMessage && (
          <div
            style={{
              backgroundColor: "#4CAF50", // Green background for success
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>
        )}

        <form className="reset-form" onSubmit={formik.handleSubmit}>
          {/* New Password Field */}
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              className="password-input"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default action
                setShowPassword(!showPassword); // Toggle password visibility
              }}
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="error-message">{formik.errors.newPassword}</div>
          ) : null}

          {/* Confirm Password Field */}
          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="password-input"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i
              className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default action
                setShowConfirmPassword(!showConfirmPassword); // Toggle password visibility
              }}
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error-message">{formik.errors.confirmPassword}</div>
          ) : null}

          {/* Submit Button */}
          <button
            type="submit"
            className="reset-button"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

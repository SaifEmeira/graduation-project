import React, { useState } from "react";
import ahramat from "../assets/pexels-matteo-roman-1151921619-21316202.jpg"; // Replace with the correct image path
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Retrieve email from local storage
  const Email = localStorage.getItem("userEmail");


  const handleInputChange = (index, event) => {
    const value = event.target.value;
    const otpValues = [...formik.values.otp];

    if (event.key === "Backspace") {
      otpValues[index] = ""; // Clear current value
      formik.setFieldValue("otp", otpValues);
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (value.match(/^[0-9]$/)) {
      otpValues[index] = value; // Add the digit
      formik.setFieldValue("otp", otpValues);
      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
      newPassword: "",
    },
    validationSchema: Yup.object({
      otp: Yup.array()
              .of(
                Yup.string()
                  .length(1, "Must be a single digit")
                  .matches(/^[0-9]$/, "Must be a number")
              )
              .required("OTP is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(Email);
        console.log(values.otp);
        
        // Call the API with Axios
        const response = await axios.get("http://tourguide.tryasp.net/auth/ResetPassword", {
          params: {
            Email,
            Otp: values.otp,
            NewPassword: values.newPassword,
          },
        });

        // Handle successful response
        if (response.status === 200) {
          console.log("API Response:", response.data);
          setSuccessMessage("Password reset successfully!");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/login");
          }, 3000); // Redirect after showing the success message
        } else {
          console.error("Unexpected API response:", response);
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error calling the API:", error);
        alert("Failed to reset password. Please check your OTP and try again.");
      }
    },
  });

  return (
    <div className="reset-password-container">
      {/* Left Section */}
      <div className="image-section">
        <img
          src={ahramat}
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
          Enter the OTP sent to your email and your new password to reset your account.
        </p>

        {/* Success Message */}
        {successMessage && (
          <div
            style={{
              backgroundColor: "#4CAF50",
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
          {/* OTP Field */}
          <div className="otp-inputs">
            {formik.values.otp.map((_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={formik.values.otp[index]}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleInputChange(index, e)}
                onBlur={formik.handleBlur}
                className={`otp-input ${
                  formik.touched.otp?.[index] && formik.errors.otp?.[index]
                    ? "error"
                    : ""
                }`}
              />
            ))}
          </div>
          {formik.errors.otp && formik.touched.otp && (
            <div className="error-message">Please enter a valid OTP.</div>
          )}

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
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="error-message">{formik.errors.newPassword}</div>
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

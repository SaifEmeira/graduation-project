import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import GizaLogin from "../assets/gizaLogin.jpg";

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  // State for toggling visibility of the password field
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  // Used for navigation after successful login

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    console.log("Form submitted:", values);

    try {
      // API Call (GET request with query parameters)
      const response = await axios.get(
        `https://tourguide.tryasp.net/auth/Login?Email=${encodeURIComponent(values.email)}&Password=${encodeURIComponent(values.password)}`
      );

      console.log("API Response:", response);

      localStorage.setItem("userToken", response.data.token);

      // Handle successful login (e.g., redirect to a new page)
      if (response.status===200) {
        alert("Login successful!");
        navigate("/"); // Redirect to the dashboard after successful login
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error.response.data[0].description);
      alert(error.response.data[0].description);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left side - Image */}
        <div
          className="col-md-6 d-none d-md-block p-0"
          style={{
            backgroundImage: `url(${GizaLogin})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right side - Login form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-dark text-light" 
        
                    style={{ background: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))" }}
        >
          <div className="w-75">
            <h1 className="text-center mb-3 fw-bold">WELCOME BACK</h1>
            <p
              className="text-center mb-4"
              style={{ color: "#8A8988", fontSize: "20px" }}
            >
              Welcome back! Please enter your details.
            </p>

            {/* Formik Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary bg-dark text-light border-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </div>

                  {/* Remember Me */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        className="form-check-input"
                      />
                      <label htmlFor="rememberMe" className="form-check-label">
                        Remember Me
                      </label>
                    </div>
                    <Link
                      to="/forget-password"
                      className="text-white text-decoration-underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-warning w-100 mb-3 border-0 text-black"
                    // style={{ backgroundColor: "#AD764A" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Sign Up */}
            <p className="text-center text-white">
              do not have an account?{" "}
              <Link
                to="/register"
                className="text-decoration-underline text-warning"
                // style={{ color: "#AD764A" }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

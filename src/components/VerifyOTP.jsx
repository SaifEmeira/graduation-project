import ahramat from "../assets/pexels-matteo-roman-1151921619-21316202.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOTP() {
  const navigate = useNavigate();
  
  // Retrieve the email from localStorage
  const userEmail = localStorage.getItem("userEmail");

  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(
          Yup.string()
            .length(1, "Must be a single digit")
            .matches(/^[0-9]$/, "Must be a number")
        )
        .required("OTP is required"),
    }),
    onSubmit: async (values) => {
      const otpCode = values.otp.join(""); // Join OTP array to form the complete code
      console.log("Entered OTP:", otpCode);

      // Check if the email exists in localStorage
      if (!userEmail) {
        console.log(userEmail);
        
        alert("Email not found. Please try again.");
        return;
      }

      try {
console.log(userEmail);

        // Construct the API URL with email and OTP
        const apiUrl = `https://tourguide.tryasp.net/auth/ConfirmEmail?Email=${userEmail}&Otp=${otpCode}`;
        
        // Make the API call using Axios
        const response = await axios.get(apiUrl);
        console.log(response);
        
        console.log("API Response:", response.data.message);

        // If OTP is correct, navigate to the reset password page
        if (response.data.message === "Email confirmed successfully") {
          navigate("/login");
          alert("Verefird Successfully");

        } else {
          alert("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error during OTP verification:", error);
        alert("There was an error verifying the OTP. Please try again.");
      }
    },
  });

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

  const handleResendClick = async () => {
    if (!userEmail) {
      alert("Email not found. Please try again.");
      return;
    }

    try {
      console.log(userEmail);

      // Make the API call to resend the confirmation email
      const apiUrl = `http://tourguide.tryasp.net/auth/NewEmailConfirmLink?email=${userEmail}`;
      const response = await axios.post(apiUrl);

      if (response.data.success) {
        alert("A new confirmation email has been sent.");
      } else {
        alert("There was an issue resending the email. Please try again.");
      }
    } catch (error) {
      console.error("Error during email resend:", error);
      alert("There was an error resending the email. Please try again.");
    }
  };

  return (
    <div className="recover-container">
      {/* Left Section */}
      <div className="image-section">
        <img src={ahramat} alt="Pyramids" className="background-image" />
      </div>

      {/* Right Section */}
      <div className="form-section">
        <h2 className="recover-title fs-1" style={{ fontFamily: "Bebas Neue" }}>
          ENTER VERIFICATION CODE
        </h2>
        <p className="recover-description">
          An authentication code has been sent to your email.
        </p>
        <form className="otp-form" onSubmit={formik.handleSubmit}>
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
          <button
            type="submit"
            className="verify-button"
            disabled={
              !(
                formik.isValid &&
                formik.dirty &&
                formik.values.otp.every((digit) => digit.trim() !== "") // Check all digits are filled
              )
            }
          >
            Verify
          </button>
        </form>
        <p className="resend-text">
          Didn’t receive a code? 
          <span
            className="resend-link"
            onClick={handleResendClick}
            style={{ cursor: 'pointer', color: '#ad764a', textDecoration: 'underline' }}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}

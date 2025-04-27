import ahramat from '../assets/pexels-matteo-roman-1151921619-21316202.jpg';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation schema
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API calls

export default function ForgetPassword() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address') // Validate email format
        .required('Email is required'), // Validate presence of email
    }),
    onSubmit: async (values) => {
      console.log('Form data:', values);

      try {
        // Call the API with Axios
        const response = await axios.post('https://tourguide.tryasp.net/auth/ForgotPassword', {
          email: values.email,
        });

        // Check if the response is successful
        if (response.status === 200) {
          console.log('API Response:', response.data);
          localStorage.removeItem("token");

          // Store the email in local storage
          localStorage.setItem('userEmail', values.email);

          // Navigate to the Reset Password page
          navigate('/reset-password');
        } else {
          console.error('Unexpected API response:', response);
          alert('An error occurred. Please try again later.');
          navigate('/ResetPassword');
        }
      } catch (error) {
        console.error('Error calling the API:', error);
        alert('Failed to send email. Please try again.');
        navigate('/ResetPassword');

      }
    },
  });

  return (
    <div className="recover-container">
      {/* Left Section */}
      <div className="image-section">
        <img
          src={ahramat} // Replace with the actual path to the pyramids image
          alt="Pyramids"
          className="background-image"
        />
      </div>

      {/* Right Section */}
      <div className="form-section">
        <h2 className="recover-title fs-1" style={{ fontFamily: 'Bebas Neue' }}>
          RECOVER ACCOUNT
        </h2>
        <p className="recover-description">
          Please enter your email below. We’ll send you a link to reset your password.
        </p>
        <form className="recover-form" onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="hello@example.com"
            className="email-input"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
          <button
            type="submit"
            className="continue-button"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Continue
          </button>
        </form>
        <Link to="/login" className="back-to-login">
          <i className="fa-solid fa-arrow-left pe-1"></i>Back to Login
        </Link>
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faClock, 
  faStar, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faChevronLeft, 
  faChevronRight,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSession, setSelectedSession] = useState(null);
  const [spotsToBook, setSpotsToBook] = useState(1);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Visa"); // Default to Visa
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false); // For tracking payment success

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://tourguide.tryasp.net/api/Tours/${id}`);
        const data = await res.json();
        setTour(data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      }
    };

    fetchTour();
  }, [id]);

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    setSpotsToBook(1);
    setShowBookingDialog(true);
  };

  const handleBookingSubmit = () => {
    if (!selectedSession || !tour) return;

    // Check if Visa payment method is selected, and if credit card fields are filled
    if (paymentMethod === "Visa" && (!cardNumber || !cardHolderName)) {
      alert("Please provide credit card details.");
      return;
    }

    // Update the session's currentCapacity locally
    const updatedSessions = tour.sessions.map(session => {
      if (session.id === selectedSession.id) {
        return {
          ...session,
          currentCapacity: session.currentCapacity + spotsToBook
        };
      }
      return session;
    });

    setTour({
      ...tour,
      sessions: updatedSessions
    });

    // Simulate Visa payment success
    console.log("Processing payment with card number:", cardNumber, "and card holder:", cardHolderName);
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      navigate("/destinations"); // Redirect to home page after success
    }, 3000); // Wait 3 seconds to show success message

    setShowBookingDialog(false);
  };

  const getAvailableSpots = (session) => {
    return tour.maxCapacity - session.currentCapacity;
  };

  const sessionSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "-15px" }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-dark" />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "-15px" }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-dark" />
      </div>
    );
  };

  if (!tour) {
    return <p className="text-white text-center my-5">Loading tour details...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="text-white pt-5" style={{ backgroundColor: "#1e1b18", minHeight: "100vh", padding: "2rem 5vw" }}>
        {/* Tour Title */}
        <h1 className="text-center display-4 fw-bold mb-4 mt-5">{tour.name}</h1>
        
        {/* Main Content Row */}
        <div className="d-flex flex-column flex-lg-row gap-4 mb-5">
          {/* Left Column - Tour Image */}
          <div className="flex-grow-1">
            <div className="position-relative">
              <img 
                src={tour.images?.[activeImageIndex] || "https://via.placeholder.com/800x500"} 
                className="img-fluid rounded shadow w-100" 
                style={{ height: "400px", objectFit: "cover" }} 
                alt="Tour" 
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {tour.images?.length > 1 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {tour.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className={`img-thumbnail cursor-pointer ${activeImageIndex === index ? 'border-warning' : ''}`}
                    style={{ width: "80px", height: "60px", objectFit: "cover" }}
                    onClick={() => setActiveImageIndex(index)}
                    alt={`Thumbnail ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Right Column - Tour Info */}
          <div className="bg-dark p-4 rounded shadow" style={{ minWidth: "300px", maxWidth: "400px" }}>
            <p className="mb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-warning" /> 
              <strong>Location:</strong> {tour.location || "N/A"}
            </p>
            <p className="mb-3">
              <FontAwesomeIcon icon={faClock} className="me-2 text-warning" /> 
              <strong>Duration:</strong> {tour.duration || "N/A"} hours
            </p>
            <p className="mb-3 text-warning">
              <FontAwesomeIcon icon={faStar} className="me-1" /> 
              {tour.rating || "0.0"} ({tour.reviews || 0} reviews)
            </p>
            <p className="mb-4">
              <strong>Price:</strong> ${tour.price || 0}
            </p>
          </div>
        </div>

        {/* Tour Description */}
        <div className="mb-5">
          <h3 className="mb-3 border-bottom pb-2">Description</h3>
          <p className="lead">{tour.description || "No description available."}</p>
        </div>

        {/* Available Sessions */}
        <div className="mb-5">
          <h3 className="mb-3 border-bottom pb-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
            Available Dates
          </h3>
          <Slider 
            {...sessionSliderSettings}
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {tour.sessions?.map((session) => {
              const date = new Date(session.startDate);
              const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              });
              const availableSpots = getAvailableSpots(session);
              
              return (
                <div key={session.id} className="px-2">
                  <div className="bg-dark p-3 rounded text-center">
                    <h5 className="text-warning">{formattedDate}</h5>
                    <p className="mb-2">Spots: {availableSpots}</p>
                    <button 
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleSessionSelect(session)}
                      disabled={availableSpots <= 0}
                    >
                      {availableSpots > 0 ? "Select" : "Sold Out"}
                    </button>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        {/* Booking Dialog */}
        {showBookingDialog && selectedSession && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-dark text-white">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">Book Your Spots</h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowBookingDialog(false)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Date:</strong> {new Date(selectedSession.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Available Spots:</strong> {getAvailableSpots(selectedSession)}
                  </p>
                  <div className="mb-3">
                    <label htmlFor="spots" className="form-label">
                      Number of spots to book:
                    </label>
                    <input
                      type="number"
                      className="form-control bg-secondary text-white"
                      id="spots"
                      min="1"
                      max={getAvailableSpots(selectedSession)}
                      value={spotsToBook}
                      onChange={(e) => setSpotsToBook(Math.min(parseInt(e.target.value) || 1, getAvailableSpots(selectedSession)))}
                    />
                  </div>
                  <p className="text-warning">
                    <strong>Total Price:</strong> ${tour.price * spotsToBook}
                  </p>
                  <div className="mb-3">
                    <label htmlFor="payment-method" className="form-label">
                      Payment Method:
                    </label>
                    <select 
                      className="form-control bg-secondary text-white"
                      id="payment-method"
                      disabled
                      value={paymentMethod} // Disabled, always Visa
                    >
                      <option value="Visa">Visa</option>
                    </select>
                  </div>

                  {paymentMethod === "Visa" && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="card-number" className="form-label">
                          Credit Card Number:
                        </label>
                        <input
                          type="text"
                          className="form-control bg-secondary text-white"
                          id="card-number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="card-holder-name" className="form-label">
                          Cardholder's Full Name:
                        </label>
                        <input
                          type="text"
                          className="form-control bg-secondary text-white"
                          id="card-holder-name"
                          value={cardHolderName}
                          onChange={(e) => setCardHolderName(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer border-secondary">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowBookingDialog(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-warning" 
                    onClick={handleBookingSubmit}
                    disabled={spotsToBook > getAvailableSpots(selectedSession)}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Success Message */}
        {paymentSuccess && (
          <div className="alert alert-success text-center mt-5">
            <strong>Payment successful!</strong> Your booking has been confirmed.
          </div>
        )}
      </div>
    </>
  );
}

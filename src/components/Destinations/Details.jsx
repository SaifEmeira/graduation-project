import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faClock, 
  faStar, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faChevronLeft, 
  faChevronRight,
  faTimes,
  faCopy,
  faHeart,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Footer";

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
  const [showShareMsg, setShowShareMsg] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const shareTimeout = useRef();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`https://tourguide.tryasp.net/api/Tours/${id}`);
        const data = await res.json();
        setTour(data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      }
    };

    fetchTour();
  }, [id]);

  // Share tour link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMsg(true);
    clearTimeout(shareTimeout.current);
    shareTimeout.current = setTimeout(() => setShowShareMsg(false), 2000);
  };

  // Favorite toggle (localStorage)
  useEffect(() => {
    if (tour) {
      const favs = JSON.parse(localStorage.getItem('favoriteTours') || '[]');
      setIsFavorite(favs.includes(tour.id));
    }
  }, [tour]);
  const handleFavorite = () => {
    if (!tour) return;
    let favs = JSON.parse(localStorage.getItem('favoriteTours') || '[]');
    if (favs.includes(tour.id)) {
      favs = favs.filter(id => id !== tour.id);
      setIsFavorite(false);
    } else {
      favs.push(tour.id);
      setIsFavorite(true);
    }
    localStorage.setItem('favoriteTours', JSON.stringify(favs));
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    setSpotsToBook(1);
    setShowBookingDialog(true);
  };

  // Save and load booked spots from localStorage
  const getBookedSpots = (tourId) => {
    const data = JSON.parse(localStorage.getItem('bookedSpots' ) || '{}');
    return data[tourId] || [];
  };
  const saveBookedSpots = (tourId, sessionId, spots) => {
    const data = JSON.parse(localStorage.getItem('bookedSpots') || '{}');
    let arr = data[tourId] || [];
    // If already booked for this session, update, else add
    const idx = arr.findIndex(b => b.sessionId === sessionId);
    if (idx >= 0) arr[idx].spots = spots;
    else arr.push({ sessionId, spots });
    data[tourId] = arr;
    localStorage.setItem('bookedSpots', JSON.stringify(data));
  };

  // On load, update sessions with booked spots
  useEffect(() => {
    if (tour) {
      const booked = getBookedSpots(tour.id);
      if (booked.length > 0) {
        setTour(t => ({
          ...t,
          sessions: t.sessions.map(s => {
            const b = booked.find(bk => bk.sessionId === s.id);
            return b ? { ...s, currentCapacity: s.currentCapacity + b.spots } : s;
          })
        }));
      }
    }
  }, [tour?.id]);

  const handleBookingSubmit = () => {
    if (!selectedSession || !tour) return;
    if (paymentMethod === "Visa" && (!cardNumber || !cardHolderName)) {
      setErrorMsg("Please provide credit card details.");
      return;
    }
    if (spotsToBook < 1 || spotsToBook > getAvailableSpots(selectedSession)) {
      setErrorMsg("Invalid number of spots selected.");
      return;
    }
    setErrorMsg("");
    // Save booked spots to localStorage
    saveBookedSpots(tour.id, selectedSession.id, spotsToBook);
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
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      navigate("/destinations");
    }, 3000);
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

  // Open/close gallery modal
  const openGallery = () => setShowGallery(true);
  const closeGallery = () => setShowGallery(false);

  if (!tour) {
    return <p className="text-white text-center my-5">Loading tour details...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="text-white pt-5" style={{ backgroundColor: "#1e1b18", minHeight: "100vh", padding: "2rem 5vw", position: 'relative', overflow: 'hidden' }}>
        {/* Animated Blobs for Creative Flair */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          left: '-80px',
          width: '260px',
          height: '260px',
          background: 'radial-gradient(circle at 60% 40%, #17a2b8cc 60%, transparent 100%)',
          filter: 'blur(60px)',
          opacity: 0.6,
          zIndex: 0,
          animation: 'floatBlob1 12s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle at 40% 60%, #ffc107bb 60%, transparent 100%)',
          filter: 'blur(70px)',
          opacity: 0.5,
          zIndex: 0,
          animation: 'floatBlob2 14s ease-in-out infinite alternate',
        }} />
        {/* Glassmorphism Card for Tour Title & Actions */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 mt-5 gap-3" style={{
          background: 'rgba(30,30,30,0.45)',
          borderRadius: 24,
          boxShadow: '0 4px 32px #0005',
          backdropFilter: 'blur(2.5px)',
          padding: '1.5rem 2rem',
          zIndex: 2,
          position: 'relative',
        }}>
          <h1 className="text-center display-4 fw-bold mb-0 animate__animated animate__fadeInDown" style={{
            letterSpacing: '0.08em',
            background: 'linear-gradient(90deg, #17a2b8 30%, #ffc107 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 8px #0008)'
          }}>{tour.name}</h1>
          <div className="d-flex gap-2">
            <button className={`btn btn-${isFavorite ? 'danger' : 'outline-danger'} rounded-circle shadow`} title="Add to Favorites" onClick={handleFavorite} style={{ fontSize: 22 }}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="btn btn-outline-light rounded-circle shadow" title="Share Tour" onClick={handleShare} style={{ fontSize: 22 }}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
        {showShareMsg && (
          <div className="alert alert-success text-center w-50 mx-auto animate__animated animate__fadeInDown" style={{zIndex:3}}>Tour link copied!</div>
        )}
        {/* Main Content Row */}
        <div className="d-flex flex-column flex-lg-row gap-4 mb-5" style={{zIndex:2, position:'relative'}}>
          {/* Left Column - Tour Image with Overlay */}
          <div className="flex-grow-1 position-relative">
            <div className="position-relative rounded shadow-lg overflow-hidden" style={{boxShadow:'0 8px 32px #0007'}}>
              <img 
                src={tour.images?.[activeImageIndex] || "https://via.placeholder.com/800x500"} 
                className="img-fluid rounded w-100 cursor-pointer animate__animated animate__fadeIn" 
                style={{ height: "400px", objectFit: "cover", filter: 'brightness(0.92) saturate(1.1)' }} 
                alt="Tour" 
                onClick={openGallery}
                title="Click to view gallery"
              />
              {/* Overlay for image */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '30%',
                background: 'linear-gradient(0deg, #1e1b18ee 80%, transparent 100%)',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                zIndex: 1
              }} />
              {/* Gallery Thumbnails */}
              {tour.images?.length > 1 && (
                <div className="d-flex flex-wrap gap-2 mt-3 position-absolute" style={{bottom: 12, left: 12, zIndex: 2}}>
                  {tour.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className={`img-thumbnail cursor-pointer ${activeImageIndex === index ? 'border-warning' : ''}`}
                      style={{ width: "64px", height: "48px", objectFit: "cover", opacity: activeImageIndex === index ? 1 : 0.7, borderRadius: 8, borderWidth: 2 }}
                      onClick={() => setActiveImageIndex(index)}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Right Column - Tour Info */}
          <div className="bg-dark p-4 rounded shadow-lg animate__animated animate__fadeInRight" style={{ minWidth: "300px", maxWidth: "400px", border: '1.5px solid #ffc10755', boxShadow: '0 2px 16px #0004' }}>
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
        {/* Animated blob keyframes */}
        <style>{`
          @keyframes floatBlob1 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(40px) scale(1.08); }
          }
          @keyframes floatBlob2 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-30px) scale(1.12); }
          }
        `}</style>

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
          <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content bg-gradient" style={{ background: 'linear-gradient(135deg, #232526 0%, #414345 100%)', border: '2px solid #ffc107', borderRadius: '1.5rem' }}>
                <div className="modal-header border-0" style={{ borderBottom: '2px solid #ffc107' }}>
                  <h4 className="modal-title text-warning fw-bold">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Book Your Adventure
                  </h4>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowBookingDialog(false)}></button>
                </div>
                <div className="modal-body">
                  {errorMsg && (
                    <div className="alert alert-danger text-center">{errorMsg}</div>
                  )}
                  <div className="row g-4">
                    <div className="col-md-6 border-end border-warning">
                      <h5 className="mb-3 text-info">Session Details</h5>
                      <p><strong>Date:</strong> {new Date(selectedSession.startDate).toLocaleDateString()}</p>
                      <p><strong>Available Spots:</strong> {getAvailableSpots(selectedSession)}</p>
                      <p><strong>Price per Spot:</strong> ${tour.price}</p>
                      <div className="mb-3">
                        <label htmlFor="spots" className="form-label">Number of spots to book:</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-white border-warning"
                          id="spots"
                          min="1"
                          max={getAvailableSpots(selectedSession)}
                          value={spotsToBook}
                          onChange={(e) => setSpotsToBook(Math.min(parseInt(e.target.value) || 1, getAvailableSpots(selectedSession)))}
                        />
                      </div>
                      <div className="alert alert-warning mt-2 py-2">
                        <strong>Total Price:</strong> ${tour.price * spotsToBook}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h5 className="mb-3 text-info">Payment Details</h5>
                      <div className="mb-3">
                        <label htmlFor="payment-method" className="form-label">Payment Method:</label>
                        <select 
                          className="form-control bg-dark text-white border-warning"
                          id="payment-method"
                          disabled
                          value={paymentMethod}
                        >
                          <option value="Visa">Visa</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="card-number" className="form-label">Credit Card Number:</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-warning"
                          id="card-number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="card-holder-name" className="form-label">Cardholder's Full Name:</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-warning"
                          id="card-holder-name"
                          value={cardHolderName}
                          onChange={(e) => setCardHolderName(e.target.value)}
                          required
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="alert alert-info py-2">
                        <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                        Your payment is secure and encrypted.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 d-flex justify-content-between align-items-center" style={{ borderTop: '2px solid #ffc107' }}>
                  <button type="button" className="btn btn-outline-light px-4" onClick={() => setShowBookingDialog(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-warning px-4 fw-bold" onClick={handleBookingSubmit} disabled={spotsToBook > getAvailableSpots(selectedSession)}>
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

        {/* Gallery Modal */}
        {showGallery && tour.images?.length > 0 && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.8)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content bg-dark text-white">
                <div className="modal-header border-0">
                  <h5 className="modal-title">Gallery</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={closeGallery}></button>
                </div>
                <div className="modal-body text-center">
                  <img src={tour.images[activeImageIndex]} className="img-fluid rounded shadow" style={{ maxHeight: "60vh" }} alt="Gallery" />
                  <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center">
                    {tour.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        className={`img-thumbnail cursor-pointer ${activeImageIndex === idx ? 'border-warning' : ''}`}
                        style={{ width: "80px", height: "60px", objectFit: "cover" }}
                        onClick={() => setActiveImageIndex(idx)}
                        alt={`Gallery Thumb ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />  
    </>
  );
}

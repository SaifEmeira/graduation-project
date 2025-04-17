/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import destination from "../../assets/Destinations.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = "http://tourguide.tryasp.net/api/Tours";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const getRandomSubset = (arr, size) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

const TourCard = ({ tour ,onDetailsClick }) => (
  <motion.div
    className="p-2"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="card text-white shadow-lg rounded overflow-hidden" style={{ backgroundColor: "#1e1b18" }}>
      <div className="position-relative">
        <img
          src={tour.image || "https://via.placeholder.com/200"}
          className="card-img-top"
          alt={tour.name || "Tour Image"}
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", height: "200px", objectFit: "cover" }}
        />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title fw-bold">{tour.name || "Unknown Tour"}</h5>
        <p className="mb-2">
          <FontAwesomeIcon icon={faClock} className="me-2" /> Duration: {tour.duration || "N/A"} hours
        </p>
        <p className="mb-2 text-warning">
          <FontAwesomeIcon icon={faStar} className="me-1" /> {tour.rating || "0.0"} ({tour.reviews || "0"} reviews)
        </p>
        <p className="fw-bold">From ${tour.price || "--"}</p>
        <button  onClick={() => onDetailsClick(tour.id)} className="btn btn-warning px-4 rounded-pill">View Details</button>
      </div>
    </div>
  </motion.div>
);

export default function Destinations() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const navigate = useNavigate();



  const handleDetailsClick = (id) => {
    console.log("View Details clicked for tour ID:", id);
    // ممكن تروح لصفحة التفاصيل هنا باستخدام react-router
    // navigate(`/tours/${id}`)
  navigate(`/details/${id}`);

  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch tours");
        }
        const data = await response.json();
        setTours(data.tours || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center vh-100 text-center"
        style={{
          backgroundImage: `url(${destination})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#171513",
        }}
      >
        <h1 className="text-white display-1 fw-bold" style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}>
          D e s t i n a t i o n s
        </h1>
      </div>
      <div className="text-white py-5" style={{ backgroundColor: "#1e1b18", paddingLeft: "5vw", paddingRight: "5vw" }}>
        {loading && <p className="text-center">Loading tours...</p>}
        {error && <p className="text-danger text-center">Error: {error}</p>}
        {!loading && !error && (
          <>
            <h2 className="mb-4 text-center fw-bold">All Tours</h2>
            <Slider {...sliderSettings}>
              {getRandomSubset(tours, 6).map((tour) => (
                <TourCard key={tour.id} tour={tour} onDetailsClick={handleDetailsClick} />
              ))}
            </Slider>
            <h2 className="mb-4 text-center fw-bold mt-5">Featured Tours</h2>
            <Slider {...sliderSettings}>
              {getRandomSubset(tours, 6).map((tour) => (
                <TourCard key={tour.id} tour={tour} onDetailsClick={handleDetailsClick} />
              ))}
            </Slider>
            <h2 className="mb-4 text-center fw-bold mt-5">Best Tours</h2>
            <Slider {...sliderSettings}>
              {getRandomSubset(tours, 6).map((tour) => (
                <TourCard key={tour.id} tour={tour} onDetailsClick={handleDetailsClick} />
              ))}
            </Slider>
          </>
        )}
      </div>
    </>
  );
}

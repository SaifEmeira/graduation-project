import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import destination from "../../assets/Destinations.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar, faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const API_URL = "https://tourguide.tryasp.net/api/Tours";

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

const TourCard = ({ tour, onDetailsClick }) => (
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
        <div className="position-absolute bottom-0 start-0 bg-dark bg-opacity-75 px-2 py-1">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
          <small>{tour.location || "Unknown Location"}</small>
        </div>
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
        <button onClick={() => onDetailsClick(tour.id)} className="btn btn-warning px-4 rounded-pill">View Details</button>
      </div>
    </div>
  </motion.div>
);

export default function Destinations() {
  const [allTours, setAllTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const categories = [
    { id: 4, name: "Historical Tours" },
    { id: 5, name: "Adventure Tours" },
    { id: 6, name: "Cultural Tours" }
  ];

  // Extract unique locations from tours
  const locations = [...new Set(allTours.map(tour => tour.location))].sort();

  const handleDetailsClick = (id) => {
    navigate(`/details/${id}`);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      let url = API_URL;
      
      // Build query parameters
      const params = new URLSearchParams();
      if (selectedLocation) params.append('location', selectedLocation);
      if (selectedCategory) params.append('CategoryIds', selectedCategory);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch tours");
      }
      const data = await response.json();
      
      setFilteredTours(data.tours || []);
      setSearchTerm(selectedLocation || categories.find(c => c.id === selectedCategory)?.name || "");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSelectedLocation("");
    setSelectedCategory(null);
    setSearchTerm("");
    fetchAllTours();
  };

  const fetchAllTours = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch tours");
      }
      const data = await response.json();
      setAllTours(data.tours || []);
      setFilteredTours(data.tours || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTours();
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
      
      <div className="container-fluid py-5 overflow-hidden" style={{ backgroundColor: "#1e1b18" }}>
        <div className="row">
          {/* Search Column */}
          <div className="col-md-2 mb-4 mb-md-0">
            <div className="card text-white shadow-lg rounded" style={{ backgroundColor: "#1e1b18", borderColor: "#444" }}>
              <div className="card-header bg-dark">
                <h4 className="mb-0">
                  <FontAwesomeIcon icon={faSearch} className="me-2" />
                  Search Tours
                </h4>
              </div>
              <div className="card-body">
                {/* Category Filter */}
                <div className="mb-4">
                  <h5 className="mb-3">Tour Categories</h5>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      id="category-all"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory(null)}
                    />
                    <label className="form-check-label" htmlFor="category-all">
                      All Categories
                    </label>
                  </div>
                  {categories.map((category) => (
                    <div className="form-check mb-2" key={category.id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        id={`category-${category.id}`}
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                      />
                      <label className="form-check-label" htmlFor={`category-${category.id}`}>
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Location Filter */}
                <div className="mb-3">
                  <h5 className="mb-3">Filter by Location</h5>
                  <div className="mb-3">
                    <select
                      className="form-select bg-dark text-white"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button 
                    onClick={handleSearch}
                    className="btn btn-warning rounded-pill"
                    disabled={!selectedLocation && !selectedCategory}
                  >
                    Search
                  </button>
                  {(searchTerm || selectedCategory) && (
                    <button 
                      onClick={handleClearSearch}
                      className="btn btn-outline-light rounded-pill"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tours Column */}
          <div className="col-md-9">
            {loading && <p className="text-center text-white">Loading tours...</p>}
            {error && <p className="text-danger text-center">Error: {error}</p>}
            {!loading && !error && (
              <>
                {searchTerm ? (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h2 className="fw-bold text-white mb-0">
                        {selectedCategory 
                          ? categories.find(c => c.id === selectedCategory)?.name 
                          : `Tours in ${searchTerm}`}
                      </h2>
                      <small className="text-muted">
                        Showing {filteredTours.length} results
                      </small>
                    </div>
                    {filteredTours.length > 0 ? (
                      <Slider {...sliderSettings}>
                        {filteredTours.map((tour) => (
                          <TourCard key={tour.id} tour={tour} onDetailsClick={handleDetailsClick} />
                        ))}
                      </Slider>
                    ) : (
                      <div className="text-center text-white py-5">
                        <h4>No tours found matching your criteria</h4>
                        <button 
                          onClick={handleClearSearch}
                          className="btn btn-warning mt-3 rounded-pill"
                        >
                          Show All Tours
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="mb-4 text-center fw-bold text-white">All Tours</h2>
                    <Slider {...sliderSettings}>
                      {getRandomSubset(filteredTours, 6).map((tour) => (
                        <TourCard key={tour.id} tour={tour} onDetailsClick={handleDetailsClick} />
                      ))}
                    </Slider>
                    <h2 className="mb-4 text-center fw-bold mt-5 text-white">Featured Tours</h2>
                    <Slider {...sliderSettings}>
                      {getRandomSubset(filteredTours, 6).map((tour) => (
                        <TourCard key={tour.id} tour={tour} onDetailsClick={handleDetailsClick} />
                      ))}
                    </Slider>
                    <h2 className="mb-4 text-center fw-bold mt-5 text-white">Best Tours</h2>
                    <Slider {...sliderSettings}>
                      {getRandomSubset(filteredTours, 6).map((tour) => (
                        <TourCard key={tour.id} tour={tour} onDetailsClick={handleDetailsClick} />
                      ))}
                    </Slider>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
            <Footer />  
      
    </>
  );
}
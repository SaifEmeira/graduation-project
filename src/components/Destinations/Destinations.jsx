import { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar";
import destination from "../../assets/Destinations.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar, faSearch, faMapMarkerAlt, faMagic } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

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
  const [minPrice, setMinPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [minAvailablePrice, setMinAvailablePrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendedTour, setRecommendedTour] = useState(null);
  // Track which recommendations have been shown in this cycle
  const [recommendedTourIds, setRecommendedTourIds] = useState([]);
  // State to track shown recommendations
  const [shownRecommendationIds, setShownRecommendationIds] = useState([]);
  // State to track the index of the last shown recommendation
  const [recommendationIndex, setRecommendationIndex] = useState(0);
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

  // Memoize top recommendations for consistent cycling (STATIC, only updates on search or initial load)
  const [topRecommendations, setTopRecommendations] = useState([]);

  // On initial load, set top recommendations
  useEffect(() => {
    if (allTours.length > 0) {
      const byRating = [...allTours].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      const byReviews = [...allTours].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      const byValue = [...allTours].sort((a, b) => ((b.rating || 0) / (b.price || 1)) - ((a.rating || 0) / (a.price || 1)));
      setTopRecommendations([
        byRating[0], byReviews[0], byValue[0], byRating[1], byReviews[1], byValue[1]
      ].filter((t, i, arr) => t && arr.findIndex(x => x.id === t.id) === i).slice(0, 5));
    }
  }, [allTours]);

  // On search, update top recommendations
  const handleSearch = async () => {
    try {
      setLoading(true);
      let url = API_URL;
      const params = new URLSearchParams();
      if (selectedLocation) params.append('SearchTerm', selectedLocation);
      if (minPrice) params.append('MinPrice', parseInt(minPrice));
      if (maxPrice) params.append('MaxPrice', parseInt(maxPrice));
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      if (minPrice && parseFloat(minPrice) < minAvailablePrice) {
        setPriceError(`Minimum price must be at least $${minAvailablePrice}`);
        return;
      } else {
        setPriceError("");
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch tours");
      }
      const data = await response.json();
      setFilteredTours(data.tours || []);
      setSearchTerm(
        selectedLocation ||
        (minPrice || maxPrice ? `Price Range` : "")
      );
      // STATIC: Only update top recommendations on search
      const byRating = [...(data.tours || [])].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      const byReviews = [...(data.tours || [])].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      const byValue = [...(data.tours || [])].sort((a, b) => ((a.rating || 0) / (a.price || 1)) - ((b.rating || 0) / (b.price || 1)));
      setTopRecommendations([
        byRating[0], byReviews[0], byValue[0], byRating[1], byReviews[1], byValue[1]
      ].filter((t, i, arr) => t && arr.findIndex(x => x.id === t.id) === i).slice(0, 5));
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
    setMinPrice("");
    setMaxPrice("");
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
      if (data.tours && data.tours.length > 0) {
        const prices = data.tours.map(t => parseFloat(t.price)).filter(p => !isNaN(p));
        const min = Math.min(...prices);
        setMinAvailablePrice(min);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTours();
  }, []);

  // Chatbot state
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hi! I'm your travel assistant. Ask me anything or say 'recommend a trip'!" }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Chatbot logic
  const handleChatSend = async (e) => {
    e.preventDefault();
    const userMsg = chatInput.trim();
    if (!userMsg) return;
    setChatMessages((msgs) => [...msgs, { sender: "user", text: userMsg }]);
    setChatInput("");
    // Check for recommendation intent
    const recommendKeywords = ["recommend", "suggest", "trip", "tour", "where should I go", "best tour", "best trip"];
    const lowerMsg = userMsg.toLowerCase();
    if (recommendKeywords.some((kw) => lowerMsg.includes(kw))) {
      // Recommend a trip from STATIC topRecommendations
      if (topRecommendations.length === 0) {
        setChatMessages((msgs) => [...msgs, { sender: "bot", text: "Sorry, I couldn't find any trips to recommend right now." }]);
      } else {
        const nextIndex = recommendationIndex % topRecommendations.length;
        const rec = topRecommendations[nextIndex];
        setRecommendationIndex((prev) => (prev + 1) % topRecommendations.length);
        setChatMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: `How about this trip? \n\n\u2728 <b>${rec.name}</b> in <b>${rec.location}</b> (Rating: ${rec.rating || "N/A"}, $${rec.price})\n${rec.description ? rec.description.slice(0, 80) + '...' : ''}`,
            tourId: rec.id
          }
        ]);
      }
    } else {
      // Use Netlify serverless function as a proxy for OpenRouter API
      setChatMessages((msgs) => [...msgs, { sender: "bot", text: "Thinking..." }]);
      try {
        const response = await fetch("/.netlify/functions/openrouter-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "mistralai/mixtral-8x7b-instruct",
            messages: [
              { role: "system", content: "You are a friendly, helpful travel assistant. Answer as a human would, and keep responses warm and conversational." },
              ...chatMessages.filter(m => m.sender !== 'bot' || m.text !== 'Thinking...').map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
              { role: "user", content: userMsg }
            ],
            max_tokens: 120
          })
        });
        const data = await response.json();
        let aiText = "Sorry, I couldn't think of a good answer right now.";
        if (data && data.choices && data.choices[0]?.message?.content) {
          aiText = data.choices[0].message.content;
        }
        setChatMessages((msgs) => [
          ...msgs.slice(0, -1), // Remove "Thinking..."
          { sender: "bot", text: aiText }
        ]);
      } catch (err) {
        setChatMessages((msgs) => [
          ...msgs.slice(0, -1),
          { sender: "bot", text: "Sorry, I couldn't connect to the AI service right now." }
        ]);
      }
    }
  };

  // Handler for View Details from chatbot
  const handleChatViewDetails = (tourId) => {
    setShowChatbot(false);
    handleDetailsClick(tourId);
  };

  // Scroll chat to bottom on new message
  const chatBodyRef = useRef(null);
  useEffect(() => {
    if (showChatbot && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, showChatbot]);

  // handleRecommend function for AI Recommend button
  const handleRecommend = () => {
    if (topRecommendations.length === 0) return;
    const nextIndex = recommendationIndex % topRecommendations.length;
    setRecommendedTour(topRecommendations[nextIndex]);
    setShowRecommendation(true);
    setRecommendationIndex((prev) => (prev + 1) % topRecommendations.length);
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center vh-100 text-center position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(20,20,20,0.7), rgba(30,30,30,0.8)), url(${destination})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#171513",
          minHeight: '60vh',
          overflow: 'hidden',
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
            <div className="card text-white shadow-lg rounded position-sticky top-0" style={{ backgroundColor: "#1e1b18", borderColor: "#444", minHeight: '90vh', maxHeight: '90vh', overflowY: 'auto', zIndex: 10 }}>
              <div className="card-header bg-dark d-flex align-items-center justify-content-between">
                <h4 className="mb-0">
                  <FontAwesomeIcon icon={faSearch} className="me-2" />
                  Search Tours
                </h4>
                <span className="badge bg-info text-dark animate__animated animate__pulse animate__infinite" style={{ fontSize: 12 }}>AI</span>
              </div>
              <div className="card-body">
                {/* AI Recommend Button */}
                <div className="d-grid mb-3">
                  <button onClick={handleRecommend} className="btn btn-info rounded-pill fw-bold mb-2 animate__animated animate__pulse animate__infinite" style={{ fontSize: 18, boxShadow: '0 2px 12px #17a2b855' }}>
                    <FontAwesomeIcon icon={faMagic} className="me-2" />Recommend
                  </button>
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
                {/* Price Filter */}
<div className="mb-4">
  <h5 className="mb-3">Price Range ($)</h5>
  <div className="mb-2">
    <input
      type="number"
      className="form-control bg-dark text-white"
      placeholder="Min Price"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
      min={minAvailablePrice}
    />
    <small className="text-danger fw-bolder mt-1 d-block">
      Minimum available price: ${minAvailablePrice}
    </small>
  </div>
  <div>
    <input
      type="number"
      className="form-control bg-dark text-white"
      placeholder="Max Price"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
    />
  </div>
</div>
{priceError && (
  <div className="alert alert-danger py-2 text-center" role="alert">
    {priceError}
  </div>
)}
                <div className="d-grid gap-2">
                  <button 
                    onClick={handleSearch}
                    className="btn btn-warning rounded-pill"
                    disabled={
                      !selectedLocation &&
                      !selectedCategory &&
                      !minPrice &&
                      !maxPrice
                    }
                    
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
          <div className="col-md-9 ms-md-3">
            {/* Creative Section Header */}
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-white display-1 fw-bold text-center mb-5 animate__animated animate__fadeInDown" style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}>
                <FontAwesomeIcon icon={faMagic} className="me-3 text-info" />D e s t i n a t i o n s
              </h1>
            </motion.div>
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
        {/* Recommendation Modal */}
        {showRecommendation && recommendedTour && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.7)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-dark text-white border border-info shadow-lg" style={{ borderRadius: 20 }}>
                <div className="modal-header border-0">
                  <h5 className="modal-title text-info fw-bold">
                    <FontAwesomeIcon icon={faMagic} className="me-2" />AI Trip Recommendation
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowRecommendation(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 text-center">
                    <span className="badge bg-info text-dark fs-6 px-3 py-2 mb-2 animate__animated animate__pulse animate__infinite">We picked this trip just for you!</span>
                  </div>
                  <TourCard tour={recommendedTour} onDetailsClick={handleDetailsClick} />
                  <div className="text-center mt-3">
                    <button className="btn btn-outline-info rounded-pill px-4" onClick={() => setShowRecommendation(false)}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Add a floating button for 'Surprise Me!' */}
        <button onClick={handleRecommend} className="btn btn-info rounded-circle position-fixed bottom-0 end-0 m-5 shadow-lg animate__animated animate__bounce animate__infinite" style={{ zIndex: 1050, width: 70, height: 70, fontSize: 32 }} title="AI Recommend">
          <FontAwesomeIcon icon={faMagic} />
        </button>
        {/* Add Chatbot Floating Button and Chat Window */}
      <button
        onClick={() => setShowChatbot((v) => !v)}
        className="btn btn-info rounded-circle position-fixed bottom-0 end-0 m-5 shadow-lg animate__animated animate__bounce animate__infinite"
        style={{ zIndex: 1060, width: 70, height: 70, fontSize: 32 }}
        title="Chat with AI"
      >
        <FaRobot />
      </button>
      {showChatbot && (
        <div className="position-fixed bottom-0 end-0 m-5" style={{ zIndex: 1061, width: 370, maxWidth: '95vw', fontFamily: 'inherit' }}>
          <div className="card bg-dark text-white shadow-lg border-0" style={{ borderRadius: 22, boxShadow: '0 8px 32px #17a2b855' }}>
            <div className="card-header bg-info text-dark d-flex align-items-center justify-content-between" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, fontWeight: 600, fontSize: 18, letterSpacing: 1 }}>
              <span><FaRobot className="me-2" />Travel Chatbot</span>
              <button className="btn btn-sm btn-outline-dark border-0 fs-4" style={{lineHeight:1}} onClick={() => setShowChatbot(false)}>&times;</button>
            </div>
            <div className="card-body p-3" ref={chatBodyRef} style={{ maxHeight: 340, minHeight: 180, overflowY: 'auto', background: 'linear-gradient(120deg,rgba(23,162,184,0.13),rgba(255,193,7,0.10))' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`mb-2 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`} style={{alignItems:'center'}}>
                  <div className={`px-3 py-2 rounded-4 shadow-sm ${msg.sender === 'user' ? 'bg-info text-dark' : 'bg-light text-dark'}`} style={{ maxWidth: 260, whiteSpace: 'pre-line', fontSize: 15, fontWeight: 500, border: msg.sender === 'user' ? '1.5px solid #17a2b8' : '1.5px solid #ffc107', boxShadow: '0 2px 8px #0002' }}>
                    <span dangerouslySetInnerHTML={{__html: msg.text}} />
                    {msg.tourId && (
                      <div className="d-grid mt-2">
                        <button className="btn btn-warning btn-sm rounded-pill fw-bold" onClick={() => handleChatViewDetails(msg.tourId)}>
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSend} className="card-footer bg-transparent border-0 d-flex gap-2 align-items-center p-2">
              <input
                type="text"
                className="form-control bg-dark text-white border-info shadow-sm"
                placeholder="Type your message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                style={{ borderRadius: 20, fontWeight: 500, fontSize: 15 }}
                autoFocus
              />
              <button type="submit" className="btn btn-info rounded-circle shadow-sm" style={{ width: 40, height: 40 }}>
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if the token exists in localStorage
    const userToken = localStorage.getItem("userToken");
    setToken(userToken);
  }, []);

  const handleAuthClick = () => {
    if (token) {
      // Logout: Remove token and redirect to login
      localStorage.removeItem("userToken");
      setToken(null);
      navigate("/login");
    } else {
      // Navigate to login page
      navigate("/login");
    }
  };

  return (
    <Navbar
      expand="lg"
      className="text-white"
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        background: "transparent",
        zIndex: 1000,
      }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="text-white mt-3 fw-bolder"
          style={{ cursor: "pointer" }}
        >
          LOCO
        </Navbar.Brand>
        <Navbar.Toggle 
  aria-controls="navbar-nav" 
  style={{ 
    border: 'none',
    backgroundColor: 'black',  // Add black background
    borderRadius: '4px',      // Optional: add some rounded corners
    padding: '8px 10px'       // Adjust padding to make it look better
  }}
>
  <span className="navbar-toggler-icon" style={{ 
    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")" 
  }} />
</Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto mt-3">
            <Nav.Link onClick={() => navigate("/")} className="text-white mx-3">
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/destinations")}
              className="text-white mx-3"
            >
              Destinations
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/about")}
              className="text-white mx-3"
            >
              About Us
            </Nav.Link>
          </Nav>
          <div className="d-flex mt-3">
            <Button variant="outline-light" onClick={handleAuthClick}>
              {token ? "Logout" : "Login"}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
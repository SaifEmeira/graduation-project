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
        <Navbar.Toggle aria-controls="navbar-nav" />
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
            <Nav.Link
              onClick={() => navigate("/contact")}
              className="text-white mx-3"
            >
              Contact Us
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

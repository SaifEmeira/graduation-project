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
      className="text-white shadow-lg animate__animated animate__fadeInDown"
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        background: "rgba(30,30,30,0.45)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        boxShadow: "0 8px 32px #0004",
        borderBottom: "2px solid #ffc10755",
        borderRadius: "0 0 24px 24px",
      }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="text-white mt-3 fw-bolder navbar-logo-glow"
          style={{ cursor: "pointer" }}
        >
          LOCO
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          style={{
            border: "none",
            backgroundColor: "black",
            borderRadius: "4px",
            padding: "8px 10px",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 30 30\'%3e%3cpath stroke=\'rgba%28255, 255, 255, 1%29\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' stroke-width=\'2\' d=\'M4 7h22M4 15h22M4 23h22\'/%3e%3c/svg%3e")',
            }}
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto mt-3">
            <Nav.Link
              onClick={() => navigate("/")}
              className="text-white mx-3 nav-link-creative"
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/destinations")}
              className="text-white mx-3 nav-link-creative"
            >
              Destinations
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/about")}
              className="text-white mx-3 nav-link-creative"
            >
              About Us
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/contact")}
              className="text-white mx-3 nav-link-creative"
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <div className="d-flex mt-3">
            <Button
              variant="outline-light"
              onClick={handleAuthClick}
              className="navbar-login-btn"
            >
              {token ? "Logout" : "Login"}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
      <style>{`
        .nav-link-creative {
          position: relative;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 1px;
          transition: color 0.2s, text-shadow 0.2s;
        }
        .nav-link-creative::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 3px;
          background: linear-gradient(90deg,#ffc107,#17a2b8);
          border-radius: 2px;
          opacity: 0;
          transform: scaleX(0.7);
          transition: opacity 0.2s, transform 0.2s;
        }
        .nav-link-creative:hover, .nav-link-creative:focus {
          color: #ffc107 !important;
          text-shadow: 0 2px 8px #ffc10799, 0 0px 8px #17a2b8;
        }
        .nav-link-creative:hover::after, .nav-link-creative:focus::after {
          opacity: 1;
          transform: scaleX(1);
        }
        .navbar-logo-glow {
          animation: logoGlow 2.5s ease-in-out infinite alternate;
          letter-spacing: 2px;
        }
        @keyframes logoGlow {
          0% { text-shadow: 0 2px 16px #ffc10799, 0 0px 8px #17a2b855; }
          100% { text-shadow: 0 4px 24px #ffc107, 0 0px 16px #17a2b8; }
        }
        .navbar-login-btn {
          transition: transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s;
        }
        .navbar-login-btn:hover, .navbar-login-btn:focus {
          transform: scale(1.08);
          box-shadow: 0 4px 24px #ffc10755;
        }
      `}</style>
    </Navbar>
  );
}
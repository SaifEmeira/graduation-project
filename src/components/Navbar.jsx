import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CustomNavbar() {
  const navigate = useNavigate(); 

  return (
    <Navbar expand="lg" fixed="top" className="text-white" style={{ background: 'transparent' }}>
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} className="text-white mt-3 fw-bolder" style={{ cursor: 'pointer' }}>
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto mt-3">
            <Nav.Link onClick={() => navigate('/')} className="text-white mx-3">Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/destinations')} className="text-white mx-3">Destinations</Nav.Link>
            <Nav.Link onClick={() => navigate('/about')} className="text-white mx-3">About Us</Nav.Link>
            <Nav.Link onClick={() => navigate('/contact')} className="text-white mx-3">Contact Us</Nav.Link>
          </Nav>
          <div className="d-flex mt-3">
            <Button className="me-2 border-0" style={{ backgroundColor: '#AD764A' }}>
              Become a Guide
            </Button>
            <Button variant="outline-light" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

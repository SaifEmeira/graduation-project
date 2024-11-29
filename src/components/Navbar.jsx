import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const CustomNavbar = () => {
    return (
        <Navbar expand="lg" fixed='top' style={{ background: 'transparent' }} className="text-white">
            <Container>
                <Navbar.Brand href="#" className="text-white mt-3 fw-bolder">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto mt-3">
                        <Nav.Link href="#" className="text-white mx-3">Home</Nav.Link>
                        <Nav.Link href="#" className="text-white mx-3">Destinations</Nav.Link>
                        <Nav.Link href="#" className="text-white mx-3">About Us</Nav.Link>
                        <Nav.Link href="#" className="text-white mx-3">Contact Us</Nav.Link>
                    </Nav>
                    <div className="d-flex mt-3">
                        <Button style={{backgroundColor:'#AD764A'}} className="me-2 border-0">Become a Guide</Button>
                        <Button variant="outline-light">Login</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;

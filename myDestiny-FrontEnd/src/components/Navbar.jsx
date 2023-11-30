import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link as Anchor } from "react-router-dom";

const NavbarHome = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" className="navbar-home">
        <Container>
          <Navbar.Brand as={Anchor} to="/" className="brand-link">
            <span className="enlace-navbar">MyDestiny</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link eventKey={1} as={Anchor} to="/" className="nav-link">
                <span className="enlace-navbar">Home</span>
              </Nav.Link>
              <Nav.Link eventKey={2} as={Anchor} to="/Posts" className="nav-link">
                <span className="texto-naranja">Posts</span>
              </Nav.Link>
              <Nav.Link eventKey={3} as={Anchor} to="/Register" className="nav-link">
                <span className="texto-naranja">Register</span>
              </Nav.Link>
              <Nav.Link eventKey={4} as={Anchor} to="/Login" className="nav-link">
                <span className="enlace-navbar">Login</span>
              </Nav.Link>
              <Navbar.Brand as={Anchor} to="/" className="profile-brand">
                <img
                  src="/assets/images/profile.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="User"
                />
              </Navbar.Brand>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarHome;

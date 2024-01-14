import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContext";

export default function AppNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Ecommerce App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Products</Nav.Link>
            <Nav.Link as={NavLink} to="/b4/admin-dashboard">
              Admin Dashboard
            </Nav.Link>
            <Nav.Link>Orders</Nav.Link>
            <Nav.Link>Checkout</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/b4/register" className="register-link">
              Register
            </Nav.Link>
            <Link as={NavLink} to="/b4/login" className="login-link">
              <Button variant="primary">Log In</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

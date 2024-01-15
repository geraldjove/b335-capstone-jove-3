import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContext";

export default function AppNavbar() {
  
  const { user } = useContext(UserContext);
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid>
    <Navbar.Brand as={Link} to="/">
    Ecommerce App
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
    <Nav.Link as={NavLink} to="/b4/products">
      Products
      </Nav.Link>
    { (user.id !== null)?
      (user.isAdmin === true)?
      <>
      <Nav.Link as={NavLink} to="/b4/orders">Orders</Nav.Link>
      <Nav.Link as={NavLink} to="/b4/cart/get-cart">Cart</Nav.Link>
      <Link as={NavLink} to="/b4/logout" className="login-link">
      <Button variant="danger">Log Out</Button>
      </Link>
      </>
      :
      <>
      <Nav.Link as={NavLink} to="/b4/cart/get-cart">Cart</Nav.Link>
      <Link as={NavLink} to="/b4/logout" className="login-link">
      <Button variant="danger">Log Out</Button>
      </Link>
      </>
      :
      <>
      <Nav.Link as={NavLink} to="/b4/register" className="register-link">
      Register
      </Nav.Link>
      <Link as={NavLink} to="/b4/login" className="login-link">
      <Button variant="primary">Log In</Button>
      </Link>
      </>
    }
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
    );
  }
  
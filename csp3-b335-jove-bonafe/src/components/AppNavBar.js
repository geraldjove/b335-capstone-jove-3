import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from '../UserContext';

export default function AppNavbar(){
    const {user} = useContext(UserContext);
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
        <Navbar.Brand as={Link} to="/">Ecommerce App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link>Home</Nav.Link>
        <Nav.Link>Products</Nav.Link>
        <Nav.Link>Orders</Nav.Link>
        <Nav.Link>Checkout</Nav.Link>
        <Nav.Link as={NavLink} to="/b4/register">Register</Nav.Link>
        <Nav.Link as={NavLink} to="/b4/login">Login</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        );
    };
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the logout logic here
        // For example, redirecting to the logout route
        window.location.href = "/b4/logout";
      }
    });
  };

  return (
    <Navbar
      expand="lg"
      className="text-center d-flex justify-content-center align-items-center text-white"
    >
      <Container fluid class>
        <Navbar.Brand as={Link} to="/" className="text-white">
          Ecommerce App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="text-white">
              HOME
            </Nav.Link>
            <span className="divider mx-3 d-flex justify-content-center align-items-center">
                    |
                  </span>
            <Nav.Link as={NavLink} to="/b4/products" className="text-white">
              SHOP
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user.id !== null ? (
              user.isAdmin === true ? (
                <>
                  <Nav.Link as={NavLink} to="/b4/orders">
                    Orders
                  </Nav.Link>
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="logout-link"
                  >
                    <Button variant="danger" className="rounded-0">
                      Log Out
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/b4/cart/get-cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#e4e4e6" stroke-width="1" stroke-linecap="butt" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg>
                  </Nav.Link>
                  <span className="divider mx-3 d-flex justify-content-center align-items-center">
                    |
                  </span>
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="logout-link d-flex justify-content-center align-items-center" style={{ textDecoration: 'none' }}
                  >
                    <Button variant="danger" className="rounded-0 px-4">
                      Log Out
                    </Button>
                  </Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/b4/register" className="register-link text-white">
                  Register
                </Nav.Link>
                <span className="divider mx-3 d-flex justify-content-center align-items-center">
                    |
                  </span>
                <Link as={NavLink} to="/b4/login" style={{ textDecoration: 'none' }}>
                  <Button className="btn-pink rounded-0 px-5">LOG IN</Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

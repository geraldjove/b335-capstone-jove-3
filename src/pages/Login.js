import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  // State hooks to store the values of the input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(true);

  const { user, setUser } = useContext(UserContext);

  // useEffect() will be triggered every time the state of email and password changes
  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function authenticate(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch("http://localhost:4004/b4/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // successful login
        if (data.access) {
          localStorage.setItem("access", data.access);
          // setUser(data); // user = {access: adskjaslkdqwk }
          retrieveUserDetails(data.access);

          alert(`You are now logged in`);
        } else if (data.error == "No Email Found") {
          alert(`Email not found`);
        } else {
          alert(data.message);
        }
      });
    // Clear input fields after submission
    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch("http://localhost:4004/b4/users/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });

        console.log(user);
      });
  };

  return (
    <div className="container mt-5 d-flex align-items-center justify-content-center">
      <div className="row col-md-8 mt-5">
        <div className="col-md-6 p-4 bg-primary d-flex align-items-center">
          {/* Your content for the left side */}
        </div>
        <div className="col-md-6 p-4 shadow-lg d-flex align-items-center">
          <div className="mx-auto">
            <h2 className="text-center mb-4">Account Log In</h2>
            <hr className="mx-auto" style={{ width: "80px" }}></hr>
            <Form className="mt-5" onSubmit={(e) => authenticate(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="text-center mt-4">
                <Button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={!isActive}
                >
                  LOG IN
                </Button>
              </div>
            </Form>
            <div className="text-center mt-5">
              <p>
                Don't have an account?{" "}
                <Link to="/b4/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

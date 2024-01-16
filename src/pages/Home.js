import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ShopOnline from "../images/shopping-online.png";

const Home = () => {
  return (
    <>
      <Container className="my-5 d-flex justify-content-center align-items-center">
        <Row>
          {/* Left side with large text */}
          <Col
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <h1 className="display-4">
              Elevate Your <span className="h1-pink">Style</span>, Elevate Your{" "}
              <span className="h1-pink">Cart</span>. Shop Now!
            </h1>
          </Col>

          {/* Right side with large image */}
          <Col
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img src={ShopOnline} className="w-100" />
          </Col>
        </Row>
      </Container>
      <Container>
        <footer className="text-light text-left py-5">
          <p className="footer-text">
            contact us: gerald@mail.com | lehi@mail.com
          </p>
        </footer>
      </Container>
    </>
  );
};

export default Home;

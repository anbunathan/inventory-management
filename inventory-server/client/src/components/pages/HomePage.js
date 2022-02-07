import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import logo from "./logo.png";

const HomePage = () => (
  <Container
    fluid
    style={{
      height: "100vh",
      color: "white",
      background: "linear-gradient(to right, #692022, #1b1819)"
    }}
  >
    <Row
      className="align-items-center justify-content-center text-center"
      style={{ height: "100%" }}
    >
      <Col xs={12} sm={6}>
        <img
          className="img-fluid"
          alt="DigiTran Solutions Logo"
          src={logo}
        />
      </Col>
      <Col
        xs={12}
        sm={6}
        style={{
          fontFamily: "'Open Sans', sans-serif"
        }}
      >
        <h1
          style={{
            boxShadow:
              "6px 0 0 rgba(20,12,10, .7), -6px 0 0 rgba(20,12,10, .7)",
            background: "rgba(20,12,10, .7)",
            lineHeight: "3rem"
          }}
        >
          BECOME AN USER!
        </h1>
        <br />
        <div className="text-center">
          <Link
            to="/signup"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#9c0b0e",
              border: "none"
            }}
          >
            JOIN THE INVENTORY MANAGEMENT SYSTEM!
          </Link>
        </div>
      </Col>
    </Row>
  </Container>
);

export default HomePage;

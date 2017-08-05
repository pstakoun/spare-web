import React, { Component } from "react";
import {
  Button,
  Jumbotron,
  Nav,
  Navbar,
  NavItem,
  Row,
  Col
} from "react-bootstrap";
import Login from "./Login";
import { Link } from "react-router-dom";
import "./Landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginKey: 0
    };
  }

  handleClose() {
    this.setState({
      loginKey: 0
    });
  }

  handleLogin() {
    this.setState({
      loginKey: 1
    });
  }

  handleSignup() {
    this.setState({
      loginKey: 2
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Navbar collapseOnSelect fixedTop fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">
                  <img src="/logo.png" style={{ height: `100%` }} />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem onClick={this.handleSignup.bind(this)}>
                  Find a Space
                </NavItem>
                <NavItem onClick={this.handleSignup.bind(this)}>
                  Be a Provider
                </NavItem>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <NavItem onClick={this.handleLogin.bind(this)}>Log In</NavItem>
                <NavItem onClick={this.handleSignup.bind(this)}>
                  Sign Up
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Row>
          <Jumbotron>
            <h1>SPARE</h1>
            <h2>
              If there's room to spare<br />There's room to share
            </h2>
            <Button onClick={this.handleSignup.bind(this)}>
              Find a provider
            </Button>
          </Jumbotron>
        </Row>
        <Row>
          <Col sm={12}>
            <h3>Optimize your storage experience</h3>
          </Col>
          <Col sm={4}>
            <div className="step1">
              <img src="https://cl.ly/1H2A2M2i0p3T/search.png" />
              <h4>STEP 1</h4>
              <p>Find a Spare provider near you</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="step2">
              <img src="https://cl.ly/3n2r0H2C3C07/pack.png" />
              <h4>STEP 2</h4>
              <p>Drop off items at your convenience</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="step3">
              <img src="https://cl.ly/1B0T1s250u0T/star.png" />
              <h4>STEP 3</h4>
              <p>Pick up and rate your provider</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h3>Features</h3>
          </Col>
        </Row>
        <Row className="feature">
          <Col xs={12} md={2} className="feature-col">
            <Row>
              <img
                className="feature-icon"
                src="https://cl.ly/313k2P0C1E1R/dollar.png"
              />
            </Row>
            <Row className="feature-font">Instant Quote</Row>
          </Col>
          <Col xs={12} md={2} className="feature-col">
            <Row>
              <img
                className="feature-icon"
                src="https://cl.ly/2V290s0w011A/daytime.png"
              />
            </Row>
            <Row className="feature-font">24/7 Access</Row>
          </Col>
          <Col xs={12} md={2} className="feature-col">
            <Row>
              <img
                className="feature-icon"
                src="https://cl.ly/3q1z0X23010S/sync.png"
              />
            </Row>
            <Row className="feature-font">Smart Match</Row>
          </Col>
          <Col xs={12} md={2} className="feature-col">
            <Row>
              <img
                className="feature-icon"
                src="https://cl.ly/1P2D0j0X3725/location.png"
              />
            </Row>
            <Row className="feature-font">Best Locations</Row>
          </Col>
          <Col xs={12} md={2} className="feature-col">
            <Row>
              <img
                className="feature-icon"
                src="https://cl.ly/0W152T3M0R2B/message.png"
              />
            </Row>
            <Row className="feature-font">Feedback</Row>
          </Col>
          <Col xs={12} md={2} className="feature-col">
            <Row>
              <img
                className="feature-icon"
                src="https://cl.ly/012W1b190l39/security.png"
              />
            </Row>
            <Row className="feature-font">Security</Row>
          </Col>
        </Row>
        <Row>
          <Button
            className="btn-provider"
            onClick={this.handleSignup.bind(this)}
          >
            Find a provider
          </Button>
        </Row>
        <Login
          handleClose={this.handleClose.bind(this)}
          activeKey={this.state.loginKey}
        />
      </div>
    );
  }
}

export default Landing;

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
            <Button
              onClick={this.handleSignup.bind(this)}
              className="find-provider"
            >
              Find a provider
            </Button>
          </Jumbotron>
        </Row>
        <Row>
          <Col sm={12}>
            <h3>How it works</h3>
          </Col>
          <Col sm={4}>
            <div className="step1">
              <img src="https://cl.ly/1H2A2M2i0p3T/search.png" />
              <h4>STEP 1</h4>
              <p>Get matched with a Spare provider near you</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="step2">
              <img src="https://cl.ly/3n2r0H2C3C07/pack.png" />
              <h4>STEP 2</h4>
              <p>Drop off belongings and start storing immediately</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="step3">
              <img src="https://cl.ly/1B0T1s250u0T/star.png" />
              <h4>STEP 3</h4>
              <p>
                When you're done, pick up your things and rate your provider
              </p>
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
        <Row className="pricing">
          <Col sm={12}>
            <h3>Cheap and convenient</h3>
          </Col>
          <Col sm={3} className="priceCol">
            <Row className="priceRow">
              <p>Small | 3' * 3' * 4'</p>
            </Row>
            <Row>
              <p>Perfect for travelers!</p>
              <img src="/size-sm.png" className="img-responsive center-block" />
            </Row>
            <Row>
              <p>Starting at</p>
              <p>$ 5.99</p>
            </Row>
          </Col>
          <Col sm={4} className="priceCol">
            <Row className="priceRow">
              <p>Medium | 5' * 6' * 4'</p>
            </Row>
            <Row>
              <p>Perfect for college students!</p>
              <img src="/size-md.png" className="img-responsive center-block" />
            </Row>
            <Row>
              <p>Starting at</p>
              <p>$ 7.99</p>
            </Row>
          </Col>
          <Col sm={5} className="priceCol">
            <Row className="priceRow">
              <p>Large | 8' * 8' * 6'</p>
            </Row>
            <Row>
              <p>Perfect for moving and long-term storage!</p>
              <img src="/size-lg.png" className="img-responsive center-block" />
            </Row>
            <Row>
              <p>Starting at</p>
              <p>$ 9.99</p>
            </Row>
          </Col>
          <Col sm={12}>
            <Button
              onClick={this.handleSignup.bind(this)}
              className="find-provider"
            >
              Find a provider
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h3>Join the Spare community today!</h3>
          </Col>
          <Col sm={6}>
            <img
              src="https://cl.ly/2A1m1t2z2h1M/flierimgs-01.png"
              className="img-responsive"
            />
          </Col>
          <Col sm={6}>
            <img
              src="https://cl.ly/3b2i3N293h45/flierimgs-02.png"
              className="img-responsive"
            />
          </Col>
        </Row>
        <Row>
          <h5>
            To learn more, reach us at{" "}
            <a href="mailto:info@spare.ly">info@spare.ly</a>
          </h5>
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

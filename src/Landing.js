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
        <Row className="step">
          <Col sm={12}>
            <h3>How it works</h3>
          </Col>
          <Col sm={4}>
            <div className="step1">
              <img src="/search.png" />
              <h4>STEP 1</h4>
              <p>Get matched with a Spare provider near you</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="step2">
              <img src="/pack.png" />
              <h4>STEP 2</h4>
              <p>Drop off belongings and start storing immediately</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="step3">
              <img src="/star.png" />
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
          <Col xs={6} sm={3} md={2} className="feature-col">
            <Row>
              <img className="feature-icon" src="/dollar.png" />
            </Row>
            <Row className="feature-font">Instant Quote</Row>
          </Col>
          <Col xs={6} sm={3} md={2} className="feature-col">
            <Row>
              <img className="feature-icon" src="/daytime.png" />
            </Row>
            <Row className="feature-font">24/7 Access</Row>
          </Col>
          <Col xs={6} sm={3} md={2} className="feature-col">
            <Row>
              <img className="feature-icon" src="/sync.png" />
            </Row>
            <Row className="feature-font">Smart Match</Row>
          </Col>
          <Col xs={6} sm={3} md={2} className="feature-col">
            <Row>
              <img className="feature-icon" src="/location.png" />
            </Row>
            <Row className="feature-font">Best Locations</Row>
          </Col>
          <Col xs={6} sm={3} md={2} className="feature-col">
            <Row>
              <img className="feature-icon" src="/message.png" />
            </Row>
            <Row className="feature-font">Feedback</Row>
          </Col>
          <Col xs={6} sm={3} md={2} className="feature-col">
            <Row>
              <img className="feature-icon" src="/security.png" />
            </Row>
            <Row className="feature-font">Security</Row>
          </Col>
        </Row>
        <Row className="pricing">
          <Col sm={12}>
            <h3>Cheap and Convenient</h3>
          </Col>
          <Col sm={3} className="priceCol">
            <Row className="planRow">
              <p>
                Small <br />3' &#215; 3' &#215; 4'
              </p>
            </Row>
            <Row className="descRow">
              <p>Perfect for travelers!</p>
            </Row>
            <Row className="graphicRow">
              <img src="/size-sm.png" className="img-responsive center-block" />
            </Row>
            <Row className="priceRow">
              <p>
                Starting at: <br /> $ 5.99
              </p>
            </Row>
          </Col>
          <Col sm={4} className="priceCol">
            <Row className="planRow">
              <p>
                Medium <br /> 5' &#215; 6' &#215; 4'
              </p>
            </Row>
            <Row className="descRow">
              <p>Perfect for college students!</p>
            </Row>
            <Row className="graphicRow">
              <img src="/size-md.png" className="img-responsive center-block" />
            </Row>
            <Row className="priceRow">
              <p>
                Starting at: <br /> $ 7.99
              </p>
            </Row>
          </Col>
          <Col sm={5} className="priceCol">
            <Row className="planRow">
              <p>
                Large <br /> 8' &#215; 8' &#215; 6'
              </p>
            </Row>
            <Row className="descRow">
              <p>Perfect for moving and long-term storage!</p>
            </Row>
            <Row className="graphicRow">
              <img src="/size-lg.png" className="img-responsive center-block" />
            </Row>
            <Row className="priceRow">
              <p>
                Starting at: <br /> $ 9.99
              </p>
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
        <Row className="cta">
          <Col sm={12}>
            <h3>Join the Spare community today!</h3>
          </Col>
          <Col sm={6} className="providerPanel">
            <Row className="ctaText">
              <p>Want to make money off your unused space?</p>
            </Row>
            <Row className="ctaImg">
              <img
                src="/flierimgs-01.png"
                className="img-responsive center-block"
              />
            </Row>
            <Row className="ctaBtn">
              <Button
                onClick={this.handleSignup.bind(this)}
                className="btn-cta"
              >
                Be a Provider
              </Button>
            </Row>
          </Col>
          <Col sm={6} className="userPanel">
            <Row className="ctaText">
              <p>Need cheap and convenient storage space?</p>
            </Row>
            <Row className="ctaImg">
              <img
                src="/flierimgs-02.png"
                className="img-responsive center-block"
              />
            </Row>
            <Row className="ctaBtn">
              <Button
                onClick={this.handleSignup.bind(this)}
                className="btn-cta"
              >
                Find a Space
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <h5 style={{ fontSize: `2em`, marginBottom: `40px` }}>
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

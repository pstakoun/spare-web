import React, { Component } from 'react';
import { Button, Grid, Jumbotron, Nav, Navbar, NavItem, Row, Col } from 'react-bootstrap';
import Login from './Login';
import './App.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar collapseOnSelect fixedTop fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">S</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">About</NavItem>
                <NavItem eventKey={2} href="#">Become a Provider</NavItem>
                <NavItem eventKey={3} href="#">Sign Up</NavItem>
                <NavItem eventKey={4} href="#">Log In</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Row>
          <Jumbotron>
            <h1>SPARE</h1>
            <h2>If there's room to spare<br/>There's room to share</h2>
            <Button>Find a provider</Button>
          </Jumbotron>
        </Row>
        <Row>
          <Col sm={12}>
          	<h3>Optimize your storage experience</h3>
          </Col>
          <Col sm={4}>
            <div className="step1">
              <h4>STEP 1</h4>
              <p>Find a Spare provider near you</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="step2">
              <h4>STEP 2</h4>
              <p>Drop off items at your convenience</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="step3">
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
            <Col xs={6} md={2}>
                <Row><img src="https://cl.ly/313k2P0C1E1R/dollar.png" /></Row>
                <Row>ABS</Row>
            </Col>
            <Col xs={6} md={2}></Col>
            <Col xs={6} md={2}></Col>
            <Col xs={6} md={2}></Col>
            <Col xs={6} md={2}></Col>
            <Col xs={6} md={2}></Col>
        </Row>
        <Row>
          <Login />
        </Row>
      </div>
    );
  }
}

export default Landing;

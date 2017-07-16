import React, { Component } from 'react';
import { Button, Grid, Jumbotron, Nav, Navbar, NavItem, Row } from 'react-bootstrap';
import Login from './Login';
import './App.css';

class Landing extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Navbar collapseOnSelect>
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
          <center><h3>Optimize your storage experience</h3></center>
        </Row>
        <Row>
          <center><h3>Features</h3></center>
        </Row>
        <Row>
          <Login />
        </Row>
      </Grid>
    );
  }
}

export default Landing;

import React, { Component } from "react";
import { Grid, Nav, Navbar, NavItem, Row, Tab } from "react-bootstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

class SpareNav extends Component {
  render() {
    return (
      <Navbar collapseOnSelect fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLinkContainer to="/">
              <NavItem>
                <img src="/logo.png" style={{ height: `100%` }} />
              </NavItem>
            </IndexLinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.user ? (
            <Nav pullRight>
              <LinkContainer to="/find">
                <NavItem>Find a Space</NavItem>
              </LinkContainer>
              <LinkContainer to="/spaces">
                <NavItem>My Spaces</NavItem>
              </LinkContainer>
              <LinkContainer to="/history">
                <NavItem>History</NavItem>
              </LinkContainer>
              <LinkContainer to="/profile">
                <NavItem>Profile</NavItem>
              </LinkContainer>
              <NavItem onClick={this.props.handleLogout.bind(this)}>
                Log Out
              </NavItem>
            </Nav>
          ) : (
            <Nav pullRight>
              <IndexLinkContainer
                to="/"
                onClick={this.props.handleSignup.bind(this)}
              >
                <NavItem>Find a Space</NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer
                to="/"
                onClick={this.props.handleSignup.bind(this)}
              >
                <NavItem>Be a Provider</NavItem>
              </IndexLinkContainer>
              <LinkContainer to="/faq" className="faq-nav">
                <NavItem>FAQ</NavItem>
              </LinkContainer>
              <IndexLinkContainer
                to="/"
                onClick={this.props.handleLogin.bind(this)}
              >
                <NavItem>Log In</NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer
                to="/"
                onClick={this.props.handleSignup.bind(this)}
              >
                <NavItem>Sign Up</NavItem>
              </IndexLinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SpareNav;

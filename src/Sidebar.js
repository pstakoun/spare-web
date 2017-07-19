import React, { Component } from 'react';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';
import * as firebase from 'firebase';

class Sidebar extends Component {
  render() {
    return (
      <Nav bsStyle="pills" stacked={true}>
        <NavItem>Profile</NavItem>
        <NavItem>History</NavItem>
        <NavItem>Preferences</NavItem>
      </Nav>
    );
  }
}

export default Sidebar;

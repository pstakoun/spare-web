import React, { Component } from 'react';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import Preferences from './Preferences';

class Account extends Component {
  render() {
    return (
      <Row>
        <Col sm={3}>
          <Nav bsStyle="pills" stacked={true}>
            <NavItem>Profile</NavItem>
            <NavItem>History</NavItem>
            <NavItem>Preferences</NavItem>
          </Nav>
        </Col>
        <Col sm={9}>
          <Preferences />
        </Col>
      </Row>
    );
  }
}

export default Account;

import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Login from './Login';
import './App.css';

class Landing extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <h1>DPS</h1>
            <Login />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Landing;

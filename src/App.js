import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Login from './Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <h1>DPS</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Login />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

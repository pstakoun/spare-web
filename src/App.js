import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Login from './Login';

class App extends Component {
  authHandler(user) {
    if (user) {
      alert('IN');
    } else {
      alert('OUT');
    }
  }

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
            <Login authHandler = {this.authHandler} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

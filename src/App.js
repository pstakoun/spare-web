import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  authHandler(newUser) {
    if (newUser) {
      this.setState({
        user: newUser
      });
    } else {
      this.setState({
        user: null
      });
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

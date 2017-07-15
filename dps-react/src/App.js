import React, { Component } from 'react';
import { Grid, Row, Col, Panel, ButtonGroup, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <h1>DPS</h1>
        </Row>
        <Row>
          <Col lg={12}>
            <Panel>
              <ButtonGroup>
                <Button>Log In</Button>
                <Button>Register</Button>
              </ButtonGroup>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

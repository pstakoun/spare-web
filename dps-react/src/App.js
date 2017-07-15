import React, { Component } from 'react';
import { Col, Form, FormControl, FormGroup, Grid, Panel, Row, Tab, Tabs } from 'react-bootstrap';
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
              <Tabs>
                <Tab title="Log In"></Tab>
                <Tab title="Register"></Tab>
              </Tabs>
              <Form>
                <FormGroup>
                  Email <FormControl type="email" />
                </FormGroup>
              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

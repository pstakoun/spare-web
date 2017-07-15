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
              <Tabs defaultActiveKey={1}>
                <Tab title="Log In" eventKey={1}>
                  <Form>
                    <FormGroup>
                      Email <FormControl type="email" />
                      Password <FormControl type="password" />
                    </FormGroup>
                  </Form>
                </Tab>
                <Tab title="Register" eventKey={2}>
                  <Form>
                    <FormGroup>
                      Email <FormControl type="email" />
                      Password <FormControl type="password" />
                      Confirm Password <FormControl type="password" />
                    </FormGroup>
                  </Form>
                </Tab>
              </Tabs>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

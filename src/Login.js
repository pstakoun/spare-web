import React, { Component } from 'react';
import { Form, FormControl, FormGroup, Panel, Tab, Tabs } from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
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
    );
  }
}

export default Login;

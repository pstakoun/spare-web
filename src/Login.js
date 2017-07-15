import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup, Panel, Tab, Tabs } from 'react-bootstrap';

class Login extends Component {
  handleLogin(event) {
    event.preventDefault();
  }

  handleRegister(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Panel>
        <Tabs defaultActiveKey={1}>
          <Tab title="Log In" eventKey={1}>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                Email
                <FormControl type="email" />
              </FormGroup>
              <FormGroup>
                Password
                <FormControl type="password" />
              </FormGroup>
              <FormGroup>
                <Button type="submit">
                  Log In
                </Button>
              </FormGroup>
            </Form>
          </Tab>
          <Tab title="Register" eventKey={2}>
            <Form onSubmit={this.handleRegister}>
              <FormGroup>
                First Name
                <FormControl type="text" />
              </FormGroup>
              <FormGroup>
                Last Nane
                <FormControl type="text" />
              </FormGroup>
              <FormGroup>
                Email
                <FormControl type="email" />
              </FormGroup>
              <FormGroup>
                Password
                <FormControl type="password" />
              </FormGroup>
              <FormGroup>
                Confirm Password
                <FormControl type="password" />
              </FormGroup>
              <FormGroup>
                <Button type="submit">
                  Register
                </Button>
              </FormGroup>
            </Form>
          </Tab>
        </Tabs>
      </Panel>
    );
  }
}

export default Login;

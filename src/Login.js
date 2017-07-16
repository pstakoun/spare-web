import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup, Panel, Tab, Tabs } from 'react-bootstrap';
import * as firebase from 'firebase';
import './App.css';

class Login extends Component {
  handleLogin(event) {
    event.preventDefault();

    var email = 'peter@stakoun.com';
    var password = 'password';

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      alert(error.code);
      console.log(error.code);
      console.log(error.message);
    });
  }

  handleRegister(event) {
    event.preventDefault();

    var email = 'peter@stakoun.com';
    var password = 'password';

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      alert(error.code);
      console.log(error.code);
      console.log(error.message);
    });
  }

  render() {
    return (
      <Panel className="panel panel-login panel-heading">
        <Tabs defaultActiveKey={1}>
          <Tab className="panel-heading" title="Log In" eventKey={1}>
            <Form className="panel-body" onSubmit={this.handleLogin}>
              <FormGroup>
                <FormControl className="form-control" type="email" placeholder="Email Address"/>
              </FormGroup>
              <FormGroup>
                <FormControl className="form-control" type="password" placeholder="Password"/>
              </FormGroup>
              <FormGroup>
                <Button className="form-control btn btn-login" type="submit">
                  Log In
                </Button>
              </FormGroup>
              <center><p>
                New to SPARE? Sign Up.
              </p></center>
              <center><p className="forgot-password">
                Forgot Password?
              </p></center>
            </Form>
          </Tab>
          <Tab className="panel-heading" title="Register" eventKey={2}>
            <Form onSubmit={this.handleRegister}>
              <FormGroup>
                <FormControl className="form-control" type="text" placeholder="First Name" />
              </FormGroup>
              <FormGroup>
                <FormControl className="form-control" type="text" placeholder="Last Name" />
              </FormGroup>
              <FormGroup>
                <FormControl className="form-control" type="email" placeholder="Email Address" />
              </FormGroup>
              <FormGroup>
                <FormControl className="form-control" type="password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <FormControl className="form-control" type="password" placeholder="Confirm Password" />
              </FormGroup>
              <FormGroup>
                <Button className="form-control btn btn-register" type="submit">
                  Register Now
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

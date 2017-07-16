import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormControl, FormGroup, Panel, Tab, Tabs } from 'react-bootstrap';
import * as firebase from 'firebase';
import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: '',
      registerError: ''
    };
  }

  handleLogin(event) {
    event.preventDefault();

    var email = ReactDOM.findDOMNode(this.refs.loginEmail).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.loginPassword).value.trim();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      alert(error.code);
      console.log(error.code);
      console.log(error.message);
    });
  }

  handleRegister(event) {
    event.preventDefault();

    var firstName = ReactDOM.findDOMNode(this.refs.registerFirstName).value.trim();
    var lastName = ReactDOM.findDOMNode(this.refs.registerLastName).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.registerEmail).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.registerPassword).value.trim();
    var confirmPassword = ReactDOM.findDOMNode(this.refs.registerConfirmPassword).value.trim();

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
            <Form className="panel-body" onSubmit={this.handleLogin.bind(this)}>
              <center><p className="error">{this.state.loginError}</p></center>
              <FormGroup>
                <FormControl ref="loginEmail" type="email" placeholder="Email Address"/>
              </FormGroup>
              <FormGroup>
                <FormControl ref="loginPassword" type="password" placeholder="Password"/>
              </FormGroup>
              <FormGroup>
                <Button className="form-control btn-login" type="submit">
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
            <Form onSubmit={this.handleRegister.bind(this)}>
              <center><p className="error">{this.state.registerError}</p></center>
              <FormGroup>
                <FormControl ref="registerFirstName" type="text" placeholder="First Name" />
              </FormGroup>
              <FormGroup>
                <FormControl ref="registerLastName" type="text" placeholder="Last Name" />
              </FormGroup>
              <FormGroup>
                <FormControl ref="registerEmail" type="email" placeholder="Email Address" />
              </FormGroup>
              <FormGroup>
                <FormControl ref="registerPassword" type="password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <FormControl ref="registerConfirmPassword" type="password" placeholder="Confirm Password" />
              </FormGroup>
              <FormGroup>
                <Button className="form-control btn-register" type="submit">
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

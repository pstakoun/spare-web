import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormControl, FormGroup, Modal, Tab, Tabs } from 'react-bootstrap';
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
    var password = ReactDOM.findDOMNode(this.refs.loginPassword).value;

    var that = this;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      that.setState({
        loginError: error.message,
        registerError: ''
      });
    });
  }

  handleRegister(event) {
    event.preventDefault();

    var firstName = ReactDOM.findDOMNode(this.refs.registerFirstName).value.trim();
    var lastName = ReactDOM.findDOMNode(this.refs.registerLastName).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.registerEmail).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.registerPassword).value;
    var confirmPassword = ReactDOM.findDOMNode(this.refs.registerConfirmPassword).value;

    var that = this;
    if (password === confirmPassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
          firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                fname: firstName,
                lname: lastName,
            });
            firebase.auth().currentUser.sendEmailVerification();
          });
        }, function(error) {
          that.setState({
            loginError: '',
            registerError: error.message
          });
        });
    }
    else {
        console.log('Password mismatch.');
    }
  }

  render() {
    return (
      <Modal show={this.props.activeKey > 0} onHide={this.props.handleClose}>
        <Button className="close" onClick={this.props.handleClose}>&times;</Button>
        <Tabs defaultActiveKey={this.props.activeKey}>
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
          <Tab className="panel-heading" title="Sign Up" eventKey={2}>
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
                  Sign Up Now
                </Button>
              </FormGroup>
            </Form>
          </Tab>
        </Tabs>
      </Modal>
    );
  }
}

export default Login;

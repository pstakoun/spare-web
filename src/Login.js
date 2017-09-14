import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
  Tab,
  Tabs
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as firebase from "firebase";
import "./App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: "",
      registerError: ""
    };
  }

  handleLogin(event) {
    event.preventDefault();

    var email = ReactDOM.findDOMNode(this.refs.loginEmail).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.loginPassword).value;

    var that = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        that.setState({
          loginError: error.message,
          registerError: ""
        });
      });
  }

  handlePasswordReset(event) {
    event.preventDefault();

    var email = ReactDOM.findDOMNode(this.refs.loginEmail).value.trim();

    var that = this;
    if (email != null) {
      /*firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
          that.setState({
            loginError: "Please check your email for Password reset email."
          });
        })
        .catch(function(error) {
          that.setState({
            loginError: "User with this Email does not exist!"
          });
        });*/
    } else {
      that.setState({
        loginError: "Please enter your email address"
      });
    }
  }

  handleRegister(event) {
    event.preventDefault();

    var firstName = ReactDOM.findDOMNode(
      this.refs.registerFirstName
    ).value.trim();
    var lastName = ReactDOM.findDOMNode(
      this.refs.registerLastName
    ).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.registerEmail).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.registerPassword).value;
    var confirmPassword = ReactDOM.findDOMNode(
      this.refs.registerConfirmPassword
    ).value;

    var that = this;
    if (this.refs.accept_tos.checked === true) {
      if (password === confirmPassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(
            function() {
              firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(function() {
                  firebase
                    .database()
                    .ref("users/" + firebase.auth().currentUser.uid)
                    .set({
                      fname: firstName,
                      lname: lastName,
                      email: email,
                      addInfo: false
                    });
                  firebase.auth().currentUser.sendEmailVerification();
                  window.location.href = "https://spare.ly/find";
                });
            },
            function(error) {
              that.setState({
                loginError: "",
                registerError: error.message
              });
            }
          );
      } else {
        that.setState({
          registerError: "Password Mismatch"
        });
      }
    } else {
      that.setState({
        registerError: "You must accept our Terms of Use"
      });
      return;
    }
  }

  render() {
    return (
      <Modal show={this.props.activeKey > 0} onHide={this.props.handleClose}>
        <Button className="close" onClick={this.props.handleClose}>
          &times;
        </Button>
        <Tabs defaultActiveKey={this.props.activeKey}>
          <Tab className="login-tab" title="Log In" eventKey={1}>
            <Form onSubmit={this.handleLogin.bind(this)}>
              <center>
                <p className="error">{this.state.loginError}</p>
              </center>
              <FormGroup>
                <FormControl
                  ref="loginEmail"
                  type="email"
                  placeholder="Email Address"
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  ref="loginPassword"
                  type="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <Button className="form-control btn-login" type="submit">
                  Log In
                </Button>
                {/* <Button className="form-control btn-info" onClick={this.handlePasswordReset.bind(this)}>
                  Password Reset
                </Button> */}
              </FormGroup>
            </Form>
          </Tab>
          <Tab className="login-tab" title="Sign Up" eventKey={2}>
            <Form onSubmit={this.handleRegister.bind(this)}>
              <center>
                <p className="error">{this.state.registerError}</p>
              </center>
              <FormGroup>
                <FormControl
                  ref="registerFirstName"
                  type="text"
                  placeholder="First Name"
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  ref="registerLastName"
                  type="text"
                  placeholder="Last Name"
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  ref="registerEmail"
                  type="email"
                  placeholder="Email Address"
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  ref="registerPassword"
                  type="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  ref="registerConfirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
              </FormGroup>
              <FormGroup>
                <label>
                  <input type="checkbox" ref="accept_tos" /> By Signing Up, I
                  agree to the <Link to="/tos">Terms of Use</Link>.
                </label>
                <br />
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

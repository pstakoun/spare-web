import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup, Panel, Tab, Tabs } from 'react-bootstrap';
import * as firebase from 'firebase';

class Login extends Component {
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyDISmmf3W3F_1pAhcZw804Zny7w2ApYjJ8",
      databaseURL: "https://decentralizedps.firebaseio.com",
      authDomain: "decentralizedps.firebaseapp.com",
      storageBucket: "decentralizedps.appspot.com"
    };
    firebase.initializeApp(config);
  }

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

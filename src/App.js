import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import Settings from './Settings';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    if (firebase.apps.length === 0) {
      var config = {
        apiKey: "AIzaSyDISmmf3W3F_1pAhcZw804Zny7w2ApYjJ8",
        databaseURL: "https://decentralizedps.firebaseio.com",
        authDomain: "decentralizedps.firebaseapp.com",
        storageBucket: "decentralizedps.appspot.com"
      };
      firebase.initializeApp(config);
    }
    firebase.auth().onAuthStateChanged(this.authHandler.bind(this));
  }

  authHandler(newUser) {
    if (newUser) {
      this.setState({
        user: newUser
      });
    } else {
      this.setState({
        user: null
      });
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <h1>DPS</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {this.state.user ? <Settings /> :  <Login />}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

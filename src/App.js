import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import Landing from './Landing';
import Map from './Map';
import Sidebar from './Sidebar';

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
      <Grid fluid>
        {this.state.user ? (
          <Row>
            <Col sm={2}>
              <Sidebar user = {this.state.user} />
            </Col>
            <Col sm={10}>
              <Map user = {this.state.user} />
            </Col>
          </Row>
        ) : (
          <Landing />
        )}
      </Grid>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Col, Grid, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import * as firebase from 'firebase';
import Landing from './Landing';
import Preferences from './Preferences';
import Profile from './Profile';
import Map from './Map';

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
          <Tab.Container defaultActiveKey={1}>
            <Row>
              <Col sm={2}>
                <Nav stacked>
                  <NavItem eventKey={1}>
                    Map
                  </NavItem>
                  <NavItem eventKey={2}>
                    Profile
                  </NavItem>
                  <NavItem eventKey={3}>
                    Preferences
                  </NavItem>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content animation>
                  <Tab.Pane eventKey={1}>
                    <Map />
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    <Profile />
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    <Preferences />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        ) : (
          <Landing />
        )}
      </Grid>
    );
  }
}

export default App;

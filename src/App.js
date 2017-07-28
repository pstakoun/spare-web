import React, { Component } from 'react';
import { Grid, Nav, Navbar, NavItem, Row, Tab } from 'react-bootstrap';
import * as firebase from 'firebase';
import Landing from './Landing';
import Preferences from './Preferences';
import Profile from './Profile';
import Spaces from './Spaces';
import AddSpace from './AddSpace';
import Confirmation from './Confirmation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      space: null
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

  selectSpace(newSpace) {
    this.setState({
      space: newSpace
    });
  }

  render() {
    return (
      <Grid fluid>
        {this.state.user ? (
          <Tab.Container defaultActiveKey={1}>
            <Row>
              <Navbar collapseOnSelect fixedTop fluid>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#">S</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                    <NavItem eventKey={1}>Map</NavItem>
                    <NavItem eventKey={2}>Profile</NavItem>
                    <NavItem eventKey={3}>Add a Space</NavItem>
                    <NavItem eventKey={4}>Preferences</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Tab.Content animation>
                <Tab.Pane eventKey={1}>
				{this.state.space ? <Confirmation space={this.state.space} selectSpace={this.selectSpace.bind(this)} /> : <Spaces selectSpace={this.selectSpace.bind(this)} />}
                </Tab.Pane>
                <Tab.Pane eventKey={2}>
                  <Profile />
                </Tab.Pane>
                <Tab.Pane eventKey={3}>
                  <AddSpace />
                </Tab.Pane>
                <Tab.Pane eventKey={4}>
                  <Preferences />
                </Tab.Pane>
              </Tab.Content>
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

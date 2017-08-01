import React, { Component } from 'react';
import { Grid, Nav, Navbar, NavItem, Row, Tab } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom'
import * as firebase from 'firebase';
import Landing from './Landing';
import Preferences from './Preferences';
import History from './History';
import Profile from './Profile';
import FindSpace from './FindSpace';
import MySpaces from './MySpaces';
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
                  <NavItem><Link to='/'>Find a Space</Link></NavItem>
                  <NavItem><Link to='/spaces'>My Spaces</Link></NavItem>
                  <NavItem><Link to='/history'>History</Link></NavItem>
                  <NavItem><Link to='/profile'>Profile</Link></NavItem>
                  <NavItem><Link to='/preferences'>Preferences</Link></NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Switch>
              <Route exact path='/' render={() => this.state.space ? <Confirmation space={this.state.space} selectSpace={this.selectSpace.bind(this)} /> : <FindSpace selectSpace={this.selectSpace.bind(this)} />} />
              <Route exact path='/spaces' component={MySpaces} />
              <Route exact path='/spaces/add' component={AddSpace} />
              <Route exact path='/history' component={History} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/preferences' component={Preferences} />
            </Switch>
          </Row>
        ) : (
          <Landing />
        )}
      </Grid>
    );
  }
}

export default App;

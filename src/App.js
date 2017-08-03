import React, { Component } from 'react';
import { Grid, Nav, Navbar, NavItem, Row, Tab } from 'react-bootstrap';
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import * as firebase from 'firebase';
import moment from 'moment';
import Landing from './Landing';
import Preferences from './Preferences';
import History from './History';
import Profile from './Profile';
import FindSpace from './FindSpace';
import MySpaces from './MySpaces';
import AddSpace from './AddSpace';
import Confirmation from './Confirmation';
import EditSpace from './EditSpace';
import BookingHistory from './BookingHistory';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      space: null,
      startDate: moment(),
      endDate: moment(),
      confirmation: false
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

  setStartDate(newDate) {
    this.setState({
      startDate: newDate
    });
  }

  setEndDate(newDate) {
    this.setState({
      endDate: newDate
    });
  }

  selectSpace(newSpace) {
    this.setState({
      space: newSpace,
      confirmation: true
    });
  }

  deselectSpace() {
    this.setState({
      space: null,
      confirmation: false
    });
  }

  editSpace(newSpace) {
    this.setState({
      space: newSpace
    });
  }

  manageSpace(newSpace) {
    this.setState({
      space: newSpace
    });
  }

  render() {
    return (
      <Grid fluid>
        {this.state.user && this.state.confirmation && <Redirect to='/confirm' push />}
        {this.state.user ? (
          <Row>
            <Navbar collapseOnSelect fixedTop fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to='/'><img src="logo.png" style={{ height: `100%` }} /></Link>
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
              <Route exact path='/' render={() => <FindSpace setStartDate={this.setStartDate.bind(this)} setEndDate={this.setEndDate.bind(this)} selectSpace={this.selectSpace.bind(this)} />} />
              <Route exact path='/confirm' render={() => <Confirmation space={this.state.space} startDate={this.state.startDate} endDate={this.state.endDate} deselectSpace={this.deselectSpace.bind(this)} />} />
              <Route exact path='/spaces' render={() => <MySpaces editSpace={this.editSpace.bind(this)} />} />
              <Route exact path='/spaces/add' component={AddSpace} />
              <Route exact path='/spaces/edit' render={() => <EditSpace space={this.state.space} />} />
              <Route exact path='/spaces/manage' render={() => <BookingHistory space={this.state.space} />} />
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

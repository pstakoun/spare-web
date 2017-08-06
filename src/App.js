/* eslint-disable no-undef */

import React, { Component } from "react";
import { Grid, Nav, Navbar, NavItem, Row, Tab } from "react-bootstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import * as firebase from "firebase";
import moment from "moment";
import Landing from "./Landing";
import History from "./History";
import Profile from "./Profile";
import FindSpace from "./FindSpace";
import MySpaces from "./MySpaces";
import AddSpace from "./AddSpace";
import Confirmation from "./Confirmation";
import EditSpace from "./EditSpace";
import BookingHistory from "./BookingHistory";
import ToS from "./ToS";
import FAQ from "./FAQ";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      space: null,
      startDate: moment(),
      endDate: moment(),
      confirmation: false,
      loggedOut: false
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

  resetSpace() {
    this.setState({
      space: null,
      startDate: moment(),
      endDate: moment(),
      confirmation: false
    });
  }

  authHandler(newUser) {
    if (newUser) {
      this.setState({
        user: newUser
      });
      firebase.database().ref("users/" + newUser.uid).on("value", snapshot =>
        FS.identify(newUser.uid, {
          displayName: snapshot.val().fname + " " + snapshot.val().lname,
          email: newUser.email
        })
      );
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

  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut();
    this.setState({ loggedOut: true });
  }

  render() {
    return (
      <Grid fluid>
        {this.state.user &&
          this.state.confirmation &&
          <Redirect to="/confirm" push />}
        {this.state.loggedOut && <Redirect to="/" push />}
        {this.state.user
          ? <Row>
              <Navbar collapseOnSelect fixedTop fluid>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">
                      <img src="/logo.png" style={{ height: `100%` }} />
                    </Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                    <IndexLinkContainer to="/">
                      <NavItem>Find a Space</NavItem>
                    </IndexLinkContainer>
                    <LinkContainer to="/spaces">
                      <NavItem>My Spaces</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/history">
                      <NavItem>History</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <NavItem>Profile</NavItem>
                    </LinkContainer>
                    <NavItem onClick={this.handleLogout.bind(this)}>
                      Log Out
                    </NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() =>
                    <FindSpace
                      resetSpace={this.resetSpace.bind(this)}
                      setStartDate={this.setStartDate.bind(this)}
                      setEndDate={this.setEndDate.bind(this)}
                      selectSpace={this.selectSpace.bind(this)}
                    />}
                />
                <Route
                  exact
                  path="/confirm"
                  render={() =>
                    <Confirmation
                      space={this.state.space}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      deselectSpace={this.deselectSpace.bind(this)}
                    />}
                />
                <Route
                  exact
                  path="/spaces"
                  render={() =>
                    <MySpaces editSpace={this.editSpace.bind(this)} />}
                />
                <Route exact path="/spaces/add" component={AddSpace} />
                <Route
                  exact
                  path="/spaces/edit"
                  render={() => <EditSpace space={this.state.space} />}
                />
                <Route
                  exact
                  path="/spaces/manage"
                  render={() => <BookingHistory space={this.state.space} />}
                />
                <Route exact path="/history" component={History} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/tos" component={ToS} />
                <Route exact path="/faq" component={FAQ} />
              </Switch>
            </Row>
          : <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/tos" component={ToS} />
              <Route exact path="/faq" component={FAQ} />
            </Switch>}
      </Grid>
    );
  }
}

export default App;

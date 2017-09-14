/* eslint-disable no-undef */

import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import * as firebase from "firebase";
import moment from "moment";
import SpareNav from "./SpareNav";
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
import Feedback from "./Feedback";
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
      loggedOut: false,
      loginKey: 0,
      loggedIn: false
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
        user: newUser,
        loggedIn: true
      });
      firebase
        .database()
        .ref("users/" + newUser.uid)
        .on("value", snapshot =>
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
    window.location.href = "https://spare.ly/";
  }

  handleClose() {
    this.setState({
      loginKey: 0
    });
  }

  handleLogin() {
    this.setState({
      loginKey: 1
    });
  }

  handleSignup() {
    this.setState({
      loginKey: 2
    });
  }

  render() {
    return (
      <Grid fluid>
        {this.state.user &&
        this.state.confirmation && <Redirect to="/confirm" push />}
        {this.state.loggedIn &&
        this.props.location === "/" && <Redirect to="/find" push />}
        {this.state.loggedOut && <Redirect to="/" push />}
        <SpareNav
          user={this.state.user}
          handleLogin={this.handleLogin.bind(this)}
          handleSignup={this.handleSignup.bind(this)}
          handleLogout={this.handleLogout.bind(this)}
        />
        {this.state.user ? (
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Landing
                  handleLogin={this.handleLogin.bind(this)}
                  handleSignup={this.handleSignup.bind(this)}
                  handleClose={this.handleClose.bind(this)}
                  loginKey={this.state.loginKey}
                />
              )}
            />
            <Route
              exact
              path="/find"
              render={() => (
                <FindSpace
                  resetSpace={this.resetSpace.bind(this)}
                  setStartDate={this.setStartDate.bind(this)}
                  setEndDate={this.setEndDate.bind(this)}
                  selectSpace={this.selectSpace.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/confirm"
              render={() => (
                <Confirmation
                  space={this.state.space}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  deselectSpace={this.deselectSpace.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/spaces"
              render={() => <MySpaces editSpace={this.editSpace.bind(this)} />}
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
            <Route exact path="/feedback" component={Feedback} />
          </Switch>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Landing
                  handleLogin={this.handleLogin.bind(this)}
                  handleSignup={this.handleSignup.bind(this)}
                  handleClose={this.handleClose.bind(this)}
                  loginKey={this.state.loginKey}
                />
              )}
            />
            <Route exact path="/tos" component={ToS} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/feedback" component={Feedback} />
          </Switch>
        )}
      </Grid>
    );
  }
}

export default App;

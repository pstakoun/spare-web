import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as firebase from 'firebase';
import './App.css';

class Profile extends Component {
  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut();
  }

  handleInfoChange(event) {
    event.preventDefault();

    var firstName = ReactDOM.findDOMNode(this.refs.userFirstName).value.trim();
    var lastName = ReactDOM.findDOMNode(this.refs.userLastName).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.userEmail).value.trim();
    var phone = ReactDOM.findDOMNode(this.refs.userPhoneNum).value;

    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        fname: firstName,
        lname: lastName,
        email: email,
        phone: phone,
    });
  }

  render() {
    return (
        <Form className="panel-body" onSubmit={this.handleInfoChange.bind(this)}>
          <center><h4>User Profile</h4></center>
          <FormGroup>
            <FormControl ref="userFirstName" placeholder="First Name"/>
          </FormGroup>
          <FormGroup>
            <FormControl ref="userLastName" placeholder="Last Name"/>
          </FormGroup>
          <FormGroup>
            <FormControl ref="userEmail" type="email" placeholder="Email Address for Correspondence"/>
          </FormGroup>
          <FormGroup>
            <FormControl ref="userPhoneNum" placeholder="Phone Number"/>
          </FormGroup>
          <FormGroup>
            <Button className="form-control btn" type="submit">
              Submit Info
            </Button>
          </FormGroup>
          <FormGroup onSubmit={this.handleLogout}>
            <Button type="submit">
              Log Out
            </Button>
          </FormGroup>
        </Form>
    );
  }
}

export default Profile;

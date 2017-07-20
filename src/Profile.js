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
        <div>
            <h4 className="profile-title">PROFILE</h4>
            <Form className="profile-form" onSubmit={this.handleInfoChange.bind(this)}>
                <FormGroup>
                    <p className="profile-qtitle">First Name</p>
                    <FormControl className="profile-input" ref="userFirstName"/>
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Last Name</p>
                    <FormControl className="profile-input" ref="userLastName"/>
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Email Address to Communicate</p>
                    <FormControl className="profile-input" ref="userEmail" type="email"/>
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Phone Number</p>
                    <FormControl className="profile-input" ref="userPhoneNum"/>
                </FormGroup>
                <FormGroup>
                    <Button className="form-control btn" type="submit">Submit Info</Button>
                </FormGroup>
            </Form>
        </div>
    );
  }
}

export default Profile;

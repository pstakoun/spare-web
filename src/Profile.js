import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as firebase from 'firebase';
import './App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  fname: null,
	  lname: null,
	  email: null,
	  phone: null
    };
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', (snapshot) => this.setState({ fname: snapshot.val().fname, lname: snapshot.val().lname, email: snapshot.val().email, phone: snapshot.val().phone }));
  }

  handleInfoChange(event) {
    event.preventDefault();

    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        fname: this.state.fname.trim(),
        lname: this.state.lname.trim(),
        email: this.state.email.trim(),
        phone: this.state.phone.trim(),
    });
  }

  render() {
    return (
        <div>
            <h4 className="profile-title">PROFILE</h4>
            <Form className="profile-form" onSubmit={this.handleInfoChange.bind(this)}>
                <FormGroup>
                    <p className="profile-qtitle">First Name</p>
                    <FormControl className="profile-input" ref="userFirstName" value={this.state.fname ? this.state.fname : undefined} onChange={(event) => this.setState({fname: event.target.value})} />
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Last Name</p>
                    <FormControl className="profile-input" ref="userLastName" value={this.state.lname ? this.state.lname : undefined} onChange={(event) => this.setState({lname: event.target.value})} />
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Email Address</p>
                    <FormControl className="profile-input" ref="userEmail" type="email" value={this.state.email ? this.state.email : undefined} onChange={(event) => this.setState({email: event.target.value})} />
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Phone Number</p>
                    <FormControl className="profile-input" ref="userPhoneNum" value={this.state.phone ? this.state.phone : undefined} onChange={(event) => this.setState({phone: event.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Button className="profile-button" type="submit">Submit Info</Button>
                </FormGroup>
            </Form>
        </div>
    );
  }
}

export default Profile;

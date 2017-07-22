import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as firebase from 'firebase';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import RandomString from 'randomstring';

import './App.css';

class AddSpace extends Component {
  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut();
  }

  handleSubmission(event) {
    event.preventDefault();

    var lat = ReactDOM.findDOMNode(this.refs.listingLatitude).value.trim();
    var long = ReactDOM.findDOMNode(this.refs.listingLongtitude).value.trim();
    var photoURL = ReactDOM.findDOMNode(this.refs.listingCoverPhotoURL).value;
    var address = ReactDOM.findDOMNode(this.refs.listingAddress).value;

    firebase.database().ref('spaces/' + RandomString.generate(28)).set({
        lat: lat,
        lng: long,
        photoURL: photoURL,
        address: address,
        user: firebase.auth().currentUser.uid,
    });
  }

  render() {
    return (
        <div>
            <h4 className="profile-title">ADD A SPACE</h4>
            <Form className="profile-form" onSubmit={this.handleSubmission.bind(this)}>
                <FormGroup>
                    <p className="profile-qtitle">Latitude</p>
                    <FormControl className="profile-input" ref="listingLatitude"/>
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Longtitude</p>
                    <FormControl className="profile-input" ref="listingLongtitude"/>
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">CoverPhotoURL</p>
                    <FormControl className="profile-input" ref="listingCoverPhotoURL"/>
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Address</p>
                    <FormControl className="profile-input" ref="listingAddress"/>
                </FormGroup>
                <FormGroup>
                    <Button className="profile-button" type="submit">Submit Info</Button>
                </FormGroup>
            </Form>
        </div>
    );
  }
}

export default AddSpace;

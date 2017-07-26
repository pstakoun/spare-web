import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as firebase from 'firebase';
import RandomString from 'randomstring';
import Geosuggest from 'react-geosuggest';
import * as GeoFire from 'geofire';

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
    var geofireRef = firebase.database().ref('geofire/');
    var geoFire = new GeoFire(geofireRef);
    var spaceId = RandomString.generate(28);

    firebase.database().ref('spaces/' + spaceId).set({
        lat: Number(lat),
        lng: Number(long),
        photoURL: photoURL,
        address: address,
        user: firebase.auth().currentUser.uid,
    });

    geoFire.set(spaceId, [Number(lat), Number(long)]).then(function() {
      console.log("Provided key has been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
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
                    <Geosuggest className="profile-input" ref="listingAddress"/>
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

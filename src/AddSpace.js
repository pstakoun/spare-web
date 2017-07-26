import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as firebase from 'firebase';
import RandomString from 'randomstring';
import Geosuggest from 'react-geosuggest';
import * as GeoFire from 'geofire';

import './App.css';

class AddSpace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      address: null
    };
  }

  updateLocation(suggest) {
    this.setState({
      location: suggest.location,
      address: suggest.description
    });
  }

  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut();
  }

  handleSubmission(event) {
    event.preventDefault();

    var photoURL = ReactDOM.findDOMNode(this.refs.listingCoverPhotoURL).value;
    var geofireRef = firebase.database().ref('geofire/');
    var geoFire = new GeoFire(geofireRef);
    var spaceId = RandomString.generate(28);

    firebase.database().ref('spaces/' + spaceId).set({
        lat: this.state.location.lat,
        lng: this.state.location.lng,
        photoURL: photoURL,
        address: this.state.address,
        user: firebase.auth().currentUser.uid,
    });

    geoFire.set(spaceId, [Number(this.state.location.lat), Number(this.state.location.lng)]).then(function() {
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
                    <p className="profile-qtitle">CoverPhotoURL</p>
                    <FormControl className="profile-input" ref="listingCoverPhotoURL"/>
                </FormGroup>
                <FormGroup>
                    <p className="profile-qtitle">Address</p>
                    <Geosuggest className="profile-input" ref="listingAddress" onSuggestSelect={this.updateLocation.bind(this)}/>
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

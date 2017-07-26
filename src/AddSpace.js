import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as firebase from 'firebase';
import RandomString from 'randomstring';
import Geosuggest from 'react-geosuggest';
import * as GeoFire from 'geofire';
import FileUploader from 'react-firebase-file-uploader';

import './App.css';

class AddSpace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      address: null,
      isUploading: false,
      progress: 0,
      spaceId: RandomString.generate(28)
    };
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});

  handleProgress = (progress) => this.setState({progress});

  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }

  handleUploadSuccess = (filename) => {
    this.setState({progress: 100, isUploading: false});
    console.log("Upload Success");

  };

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

    var geofireRef = firebase.database().ref('geofire/');
    var geoFire = new GeoFire(geofireRef);


    firebase.database().ref('spaces/' + this.state.spaceId).set({
        lat: this.state.location.lat,
        lng: this.state.location.lng,
        address: this.state.address,
        user: firebase.auth().currentUser.uid,
        photoURL: "gs://decentralizedps.appspot.com/images/"+ this.state.spaceId + ".jpg"
    });

    geoFire.set(this.state.spaceId, [Number(this.state.location.lat), Number(this.state.location.lng)]).then(function() {
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
                    <FileUploader
                      accept="image/jpg"
                      filename={this.state.spaceId}
                      storageRef={firebase.storage().ref('images')}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                    />
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

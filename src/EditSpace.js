import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, FormControl, Col, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Geosuggest from 'react-geosuggest';
import * as GeoFire from 'geofire';
import FileUploader from 'react-firebase-file-uploader';

import './App.css';

class EditSpace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: this.props.coords ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude } : { lat: 42.361145, lng: -71.057083 },
      address: null,
      isUploading: false,
      progress: 0,
      spaceId: this.props.space.spaceId,
      phoneNum: null
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

  renderLocation() {
    return [<Marker defaultPosition={this.state.location} title="current" />];
  }

  handleSubmission(event) {
    event.preventDefault();

    var geofireRef = firebase.database().ref('geofire/');
    new GeoFire(geofireRef);

    firebase.database().ref('spaces/' + this.state.spaceId).set({
        lat: this.state.location.lat,
        lng: this.state.location.lng,
        address: this.state.address,
        type: ReactDOM.findDOMNode(this.refs.spaceType).value,
        size: ReactDOM.findDOMNode(this.refs.spaceSize).value,
        climate_control: this.refs.climate_control.checked,
        all_access: this.refs.all_access.checked,
        has_lock: this.refs.has_lock.checked,
        has_insurance: this.refs.has_insurance.checked,
        user: firebase.auth().currentUser.uid,
        photoURL: "gs://decentralizedps.appspot.com/images/"+ this.state.spaceId + ".jpg",
        spaceId: this.state.spaceId,
        contactNum: this.state.phoneNum
    });
  }

  handleDeletion(event) {
    event.preventDefault();
    firebase.database().ref('spaces/' + this.state.spaceId).remove();
    firebase.database().ref('geofire/' + this.state.spaceId).remove();
  }

  render() {

    const SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} defaultCenter={this.state.location}>
        {this.renderLocation()}
      </GoogleMap>
    ));

    return (
      <div style={{ paddingTop: `50px` }}>
        <Row>
          <h4>Edit Space Information</h4>
        </Row>
        <Row>
          <Col xs={12} md={6}>
          <Form className="profile-form" onSubmit={this.handleSubmission.bind(this)}>
            <FormGroup>
              <p className="profile-qtitle">Address</p>
              <Geosuggest className="profile-input" ref="listingAddress" onSuggestSelect={this.updateLocation.bind(this)}/>
            </FormGroup>
            <FormGroup>
              <p className="profile-qtitle">Storage Type</p>
              <FormControl componentClass="select" placeholder="Please select..." ref="spaceType" required="true">
                <option value="default"></option>
                <option value="Garage">Garage</option>
                <option value="Storage Unit">Storage Unit</option>
                <option value="Attic">Attic</option>
                <option value="Basement">Basement</option>
                <option value="Closet">Closet</option>
                <option value="Shed">Shed</option>
                <option value="Room">Room</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <p className="profile-qtitle">Additional Features</p>
              <label><input type="checkbox" ref="climate_control" /> Has Climate Control</label><br/>
              <label><input type="checkbox" ref="all_access" /> 24/7 Access</label><br/>
              <label><input type="checkbox" ref="has_lock" /> Locks Provided</label><br/>
              <label><input type="checkbox" ref="has_insurance" /> Insurance Provided</label>
            </FormGroup>
            <FormGroup>
              <p className="profile-qtitle">Storage Size</p>
              <FormControl componentClass="select" placeholder="Please select..." ref="spaceSize" required="true">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <p className="profile-qtitle">Select Cover Photo</p>
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
              <Button className="profile-button" type="submit">Submit Info</Button>
              <Button className="profile-button" bsStyle="danger" onClick={this.handleDeletion.bind(this)}>Delete Space</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col xs={12} md={6}>
          <SpareMap
            containerElement={ <div style={{ height: '80vh' }} /> }
            mapElement={ <div style={{ height: '80vh' }} /> }
          />
        </Col>
      </Row>
    </div>
    );
  }
}

export default EditSpace;

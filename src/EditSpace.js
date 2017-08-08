import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Row
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geosuggest from "react-geosuggest";
import * as GeoFire from "geofire";
import FileUploader from "react-firebase-file-uploader";

class EditSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.space
        ? { lat: this.props.space.lat, lng: this.props.space.lng }
        : { lat: 42.361145, lng: -71.057083 },
      address: this.props.space ? this.props.space.address : undefined,
      isUploading: false,
      progress: 0,
      spaceId: this.props.space ? this.props.space.spaceId : null,
      phoneNum: null,
      done: false,
      length: this.props.space ? this.props.space.length : undefined,
      width: this.props.space ? this.props.space.width : undefined,
      height: this.props.space ? this.props.space.width : undefined,
      type: this.props.space ? this.props.space.type : undefined,
      climate_control: this.props.space
        ? this.props.space.climate_control
        : undefined,
      all_access: this.props.space ? this.props.space.all_access : undefined,
      has_lock: this.props.space ? this.props.space.has_lock : undefined,
      has_insurance: this.props.space
        ? this.props.space.has_insurance
        : undefined
    };
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ progress: 100, isUploading: false });
    console.log("Upload Success");
  };

  updateLocation(suggest) {
    this.setState({
      location: suggest.location,
      address: suggest.description
    });
  }

  renderLocation() {
    return [<Marker defaultPosition={this.state.location} />];
  }

  handleSubmission(event) {
    event.preventDefault();

    var geofireRef = firebase.database().ref("geofire/");
    new GeoFire(geofireRef);

    firebase.database().ref("spaces/" + this.state.spaceId).update(
      {
        lat: this.state.location.lat,
        lng: this.state.location.lng,
        address: this.state.address,
        type: this.state.type,
        width: this.state.width,
        length: this.state.length,
        height: this.state.height,
        climate_control: this.state.climate_control,
        all_access: this.state.all_access,
        has_lock: this.state.has_lock,
        has_insurance: this.state.has_insurance,
        user: firebase.auth().currentUser.uid,
        photoURL:
          "gs://decentralizedps.appspot.com/images/" +
          this.state.spaceId +
          ".jpg",
        spaceId: this.state.spaceId,
        contactNum: this.state.phoneNum
      },
      function() {
        this.setState({ done: true });
      }.bind(this)
    );
  }

  handleDeletion(event) {
    event.preventDefault();
    firebase.database().ref("spaces/" + this.state.spaceId).update(
      { status: "inactive" },
      function() {
        this.setState({ done: true });
      }.bind(this)
    );
    firebase.database().ref("geofire/" + this.state.spaceId).remove();
  }

  render() {
    const SpareMap = withGoogleMap(props =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={this.state.location}
        defaultOptions={{
          styles: [
            { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f5f5" }]
            },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#bdbdbd" }]
            },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }]
            },
            {
              featureType: "road",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "road.arterial",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#dadada" }]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }]
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }]
            },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }]
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#c9c9c9" }]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false
        }}
      >
        {this.renderLocation()}
      </GoogleMap>
    );

    return (
      <div style={{ paddingTop: `50px` }}>
        {(this.state.done || !this.props.space) &&
          <Redirect to="/spaces" push />}
        <Row>
          <h4>EDIT SPACE</h4>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form
              className="profile-form"
              onSubmit={this.handleSubmission.bind(this)}
            >
              <FormGroup>
                <p className="profile-qtitle">Address</p>
                <Geosuggest
                  className="geosuggest_space profile-input"
                  ref={el => (this._geoSuggest = el)}
                  onSuggestSelect={this.updateLocation.bind(this)}
                  initialValue={this.state.address}
                />
              </FormGroup>
              <FormGroup>
                <p className="profile-qtitle">Storage Type</p>
                <FormControl
                  componentClass="select"
                  placeholder="Please select..."
                  ref="spaceType"
                  required="true"
                  value={this.state.type}
                  onChange={event =>
                    this.setState({ type: event.target.value })}
                >
                  <option value="default" />
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
                <label>
                  <input
                    type="checkbox"
                    ref="climate_control"
                    defaultChecked={
                      this.props.space && this.props.space.climate_control
                    }
                    onChange={event =>
                      this.setState({ climate_control: event.target.checked })}
                  />{" "}
                  Has Climate Control
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    ref="all_access"
                    defaultChecked={
                      this.props.space && this.props.space.all_access
                    }
                    onChange={event =>
                      this.setState({ all_access: event.target.checked })}
                  />{" "}
                  24/7 Access
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    ref="has_lock"
                    defaultChecked={
                      this.props.space && this.props.space.has_lock
                    }
                    onChange={event =>
                      this.setState({ has_lock: event.target.checked })}
                  />{" "}
                  Locks Provided
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    ref="has_insurance"
                    defaultChecked={
                      this.props.space && this.props.space.has_insurance
                    }
                    onChange={event =>
                      this.setState({ has_insurance: event.target.checked })}
                  />{" "}
                  Insurance Provided
                </label>
              </FormGroup>
              <FormGroup>
                <p className="profile-qtitle">Storage Dimensions (feet)</p>
                <Col md={4} xs={12}>
                  <label>
                    Length{" "}
                    <FormControl
                      type="number"
                      ref="spaceLength"
                      required="true"
                      placeholder="0 ft"
                      style={{ width: `100%` }}
                      className="dimension"
                      value={this.state.length ? this.state.length : undefined}
                      onChange={event =>
                        this.setState({ length: event.target.value })}
                    />
                  </label>
                </Col>
                <Col md={4} xs={12}>
                  <label>
                    Width{" "}
                    <FormControl
                      type="number"
                      ref="spaceWidth"
                      required="true"
                      placeholder="0 ft"
                      style={{ width: `100%` }}
                      className="dimension"
                      value={this.state.width ? this.state.width : undefined}
                      onChange={event =>
                        this.setState({ width: event.target.value })}
                    />
                  </label>
                </Col>
                <Col md={4} xs={12}>
                  <label>
                    Height{" "}
                    <FormControl
                      type="number"
                      ref="spaceHeight"
                      required="true"
                      placeholder="0 ft"
                      style={{ width: `100%` }}
                      className="dimension"
                      value={this.state.height ? this.state.height : undefined}
                      onChange={event =>
                        this.setState({ height: event.target.value })}
                    />
                  </label>
                </Col>
              </FormGroup>
              <FormGroup>
                <p className="profile-qtitle">Select Cover Photo</p>
                <FileUploader
                  accept="image/jpg"
                  filename={this.state.spaceId}
                  storageRef={firebase.storage().ref("images")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  className="profile-button"
                  type="submit"
                  style={{ marginRight: `10px` }}
                >
                  Submit Info
                </Button>
                <Button
                  className="profile-button"
                  bsStyle="danger"
                  onClick={this.handleDeletion.bind(this)}
                >
                  Delete Space
                </Button>
              </FormGroup>
            </Form>
          </Col>
          <Col xs={12} md={6}>
            <SpareMap
              containerElement={<div style={{ height: "80vh" }} />}
              mapElement={<div style={{ height: "80vh" }} />}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditSpace;

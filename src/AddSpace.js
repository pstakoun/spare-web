import React, { Component } from "react";
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
import RandomString from "randomstring";
import Geosuggest from "react-geosuggest";
import * as GeoFire from "geofire";
import FileUploader from "react-firebase-file-uploader";

class AddSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.coords
        ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude }
        : { lat: 42.361145, lng: -71.057083 },
      address: null,
      type: undefined,
      width: undefined,
      length: undefined,
      height: undefined,
      climate_control: false,
      all_access: false,
      has_lock: false,
      has_insurance: false,
      isUploading: false,
      progress: 0,
      spaceId: RandomString.generate(28),
      phoneNum: null,
      errorMsg: "",
      done: false
    };

    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot =>
        this.setState({ phoneNum: snapshot.val().phone })
      );
  }

  handleUploadStart = () =>
    this.setState({ isUploading: true, progress: 0, errorMsg: "Uploading..." });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({
      progress: 100,
      isUploading: false,
      errorMsg: "Upload Success"
    });
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
    var geoFire = new GeoFire(geofireRef);
    if (
      this.state.address !== (null || undefined) &&
      this.state.length !== (null || undefined) &&
      this.state.width !== (null || undefined) &&
      this.state.height !== (null || undefined) &&
      this.state.type !== (null || undefined)
    ) {
      firebase.database().ref("spaces/" + this.state.spaceId).set({
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
        contactNum: this.state.phoneNum,
        status: "active"
      });

      geoFire
        .set(this.state.spaceId, [
          Number(this.state.location.lat),
          Number(this.state.location.lng)
        ])
        .then(
          function() {
            this.setState({ done: true });
          }.bind(this),
          function(error) {
            console.log("Error: " + error);
          }
        );
    }
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
        {this.state.done && <Redirect to="/spaces" push />}
        <Row>
          <h4>ADD A SPACE</h4>
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
                  onSuggestSelect={this.updateLocation.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <p className="profile-qtitle">Storage Type</p>
                <FormControl
                  componentClass="select"
                  placeholder="Please select..."
                  required="true"
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
                      placeholder="0 ft"
                      style={{ width: `100%` }}
                      required="true"
                      className="dimension"
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
                      placeholder="0 ft"
                      style={{ width: `100%` }}
                      required="true"
                      className="dimension"
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
                      placeholder="0 ft"
                      style={{ width: `100%` }}
                      required="true"
                      className="dimension"
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
                <p className="error">
                  {this.state.errorMsg}
                </p>
                <Button className="profile-button" type="submit">
                  Submit Info
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

export default AddSpace;

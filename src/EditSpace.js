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
      location: this.props.coords
        ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude }
        : { lat: 42.361145, lng: -71.057083 },
      address: null,
      isUploading: false,
      progress: 0,
      spaceId: this.props.space ? this.props.space.spaceId : null,
      phoneNum: null,
      done: false,
      length: undefined,
      width: undefined,
      height: undefined,
      type: null
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("spaces/" + this.state.spaceId)
      .on("value", snapshot =>
        this.setState({
          address: snapshot.val().address,
          location: { lat: snapshot.val().lat, lng: snapshot.val().lng },
          length: snapshot.val().length,
          width: snapshot.val().width,
          height: snapshot.val().height,
          type: snapshot.val().type
        })
      );
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
    return [<Marker defaultPosition={this.state.location} title="current" />];
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
        type: ReactDOM.findDOMNode(this.refs.spaceType).value,
        width: ReactDOM.findDOMNode(this.refs.spaceWidth).value,
        length: ReactDOM.findDOMNode(this.refs.spaceLength).value,
        height: ReactDOM.findDOMNode(this.refs.spaceHeight).value,
        climate_control: this.refs.climate_control.checked,
        all_access: this.refs.all_access.checked,
        has_lock: this.refs.has_lock.checked,
        has_insurance: this.refs.has_insurance.checked,
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
      <GoogleMap defaultZoom={15} defaultCenter={this.state.location}>
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
                  ref="listingAddress"
                  onSuggestSelect={this.updateLocation.bind(this)}
                  placeholder={this.state.address}
                />
              </FormGroup>
              <FormGroup>
                <p className="profile-qtitle">Storage Type</p>
                <FormControl
                  componentClass="select"
                  placeholder="Please select..."
                  ref="spaceType"
                  required="true"
                  value={this.state.type ? this.state.type : null}
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
                    checked={this.props.space.climate_control}
                    defaultChecked={
                      this.state.space && this.props.space.climate_control
                    }
                  />{" "}
                  Has Climate Control
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    ref="all_access"
                    checked={this.props.space.all_access}
                    defaultChecked={
                      this.state.space && this.props.space.all_access
                    }
                  />{" "}
                  24/7 Access
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    ref="has_lock"
                    checked={this.props.space.has_lock}
                    defaultChecked={
                      this.state.space && this.props.space.has_lock
                    }
                  />{" "}
                  Locks Provided
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    ref="has_insurance"
                    checked={this.props.space.has_insurance}
                    defaultChecked={
                      this.state.space && this.props.space.has_insurance
                    }
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

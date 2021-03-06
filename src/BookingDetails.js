import React, { Component } from "react";
import { Panel, Col } from "react-bootstrap";
import * as firebase from "firebase";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class BookingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space: null,
      user: null,
      location: null
    };
  }

  componentDidMount() {
    firebase.database().ref("spaces/" + this.props.trans.spaceId).on(
      "value",
      function(snapshot) {
        this.setState({
          space: snapshot.val(),
          location: { lat: snapshot.val().lat, lng: snapshot.val().lng }
        });
      }.bind(this)
    );
    firebase.database().ref("users/" + this.props.trans.userId).on(
      "value",
      function(snapshot) {
        this.setState({ user: snapshot.val() });
      }.bind(this)
    );
  }

  handleImg() {
    firebase
      .storage()
      .refFromURL(
        "gs://decentralizedps.appspot.com/images/" +
          this.props.trans.spaceId +
          ".jpg"
      )
      .getDownloadURL()
      .then(function(url) {
        document.querySelector(".space-overlay").src = url;
        console.log("succeeded" + url);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  renderLocation() {
    return [<Marker defaultPosition={this.state.location} title="current" />];
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

    var transAmount = this.props.trans.charge.amount / 100;

    return (
      <Panel className="transPanel">
        <Col md={3}>
          <SpareMap
            containerElement={<div style={{ height: "15vw" }} />}
            mapElement={<div style={{ height: "15vw" }} />}
          />
        </Col>
        <Col md={3}>
          <p className="p-title">Location</p>
          <p className="p-body">
            {this.state.space ? this.state.space.address : null}
          </p>
          <p className="p-title">Duration</p>
          <p className="p-body">
            {this.props.trans.duration} Days
          </p>
          <p className="p-title">Size</p>
          <p className="p-body">
            {this.state.space ? this.state.space.size : null}
          </p>
        </Col>
        <Col md={3}>
          <p className="p-title">Transaction Timestamp</p>
          <p className="p-body">
            {this.props.trans.time}
          </p>
          <p className="p-title">Payment Method</p>
          <p className="p-body">
            {this.props.trans.charge.source.brand}{" "}
            {this.props.trans.charge.source.last4}
          </p>
          <p className="p-title">Amount</p>
          <p className="p-body">
            USD$ {transAmount}
          </p>
        </Col>
        <Col md={3}>
          <p className="p-title">Contact Name</p>
          <p className="p-body">
            {this.state.user
              ? this.state.user.fname + " " + this.state.user.lname
              : null}
          </p>
          <p className="p-title">Contact Email</p>
          <p className="p-body">
            {this.state.user ? this.state.user.email : null}
          </p>
          <p className="p-title">Contact Phone</p>
          <p className="p-body">
            {this.state.user ? this.state.user.phone : null}
          </p>
        </Col>
      </Panel>
    );
  }
}

export default BookingDetails;

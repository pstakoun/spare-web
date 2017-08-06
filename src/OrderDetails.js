/* eslint-disable no-undef */

import React, { Component } from "react";
import { Button, Panel, Col } from "react-bootstrap";
import * as firebase from "firebase";
import moment from "moment";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transAmount: 0,
      location: null
    };
  }

  componentDidMount() {
    firebase.database().ref("spaces/" + this.props.space.spaceId).on(
      "value",
      function(snapshot) {
        this.setState({
          location: { lat: snapshot.val().lat, lng: snapshot.val().lng }
        });
      }.bind(this)
    );
    this.getPrice();
    this.handleImg();
  }

  handleImg() {
    firebase
      .storage()
      .refFromURL(this.props.space.photoURL)
      .getDownloadURL()
      .then(function(url) {
        document.querySelector(".cover-image").src = url;
      })
      .catch(function(error) {
        return;
      });
  }

  getPrice() {
    $.post(
      "/price",
      {
        spaceId: this.props.space.spaceId,
        startDate: this.props.startDate.format(),
        endDate: this.props.endDate.format()
      },
      data => {
        this.setState({ transAmount: data });
      }
    );
  }

  renderLocation() {
    return [<Marker defaultPosition={this.state.location} title="current" />];
  }

  render() {
    let has_lock_local,
      has_insurance_local,
      all_access_local,
      climate_control_local = null;

    if (this.props.space.has_lock) {
      has_lock_local = [<p className="p-body"> Has Security Locks </p>];
    }
    if (this.props.space.has_insurance) {
      has_insurance_local = [<p className="p-body"> Has Insurance Plans </p>];
    }
    if (this.props.space.all_access) {
      all_access_local = [<p className="p-body"> 24/7 Access </p>];
    }
    if (this.props.space.climate_control) {
      climate_control_local = [
        <p className="p-body"> Has Climate Control System </p>
      ];
    }
    var Amount = this.state.transAmount / 100;

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
      <Panel className="orderPanel">
        <Col md={4}>
          <SpareMap
            containerElement={<div style={{ height: "15vw" }} />}
            mapElement={<div style={{ height: "15vw" }} />}
          />
        </Col>
        <Col md={4}>
          <p className="p-title">Location</p>
          <p className="p-body">
            {this.props.space ? this.props.space.address : null}
          </p>
          <p className="p-title">Features</p>
          {has_lock_local}
          {has_insurance_local}
          {all_access_local}
          {climate_control_local}
        </Col>
        <Col md={4}>
          <p className="p-title">Duration</p>
          <p className="p-body">
            {moment(this.props.endDate).diff(
              moment(this.props.startDate),
              "days"
            ) + 1}{" "}
            Day(s)
          </p>
          <p className="p-title">Size</p>
          <p className="p-body">
            {this.props.space ? this.props.space.size : null}
          </p>
          <p className="p-title">Amount</p>
          <p className="p-body">
            USD$ {Amount}
          </p>
        </Col>
      </Panel>
    );
  }
}

export default OrderDetails;

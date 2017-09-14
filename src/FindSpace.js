/* eslint-disable no-undef */

import React, { Component } from "react";
import { Row } from "react-bootstrap";
import * as firebase from "firebase";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from "react-google-maps";
import { geolocated } from "react-geolocated";
import * as GeoFire from "geofire";
import Geosuggest from "react-geosuggest";
import DatePicker from "react-datepicker";
import moment from "moment";
import SizePicker from "./SizePicker";
import SpaceOverlay from "./SpaceOverlay";

import "react-datepicker/dist/react-datepicker.css";

class FindSpace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spaces: {},
      location: this.getDefaultLocation(),
      activeSpace: null,
      size: "Small",
      startDate: moment(),
      endDate: moment()
    };

    this.updateMarkers();
  }

  componentDidMount() {
    this.props.resetSpace();
    this.setState({ location: this.getDefaultLocation() });
  }

  getSize(length, width, height) {
    if (length >= 8 && width >= 8 && height >= 6) {
      return 2;
    } else if (length >= 5 && width >= 5 && height >= 5) {
      return 1;
    } else {
      return 0;
    }
  }

  getSpaceSize(space) {
    return this.getSize(space.length, space.width, space.height);
  }

  getDefaultLocation() {
    return this.props.coords
      ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude }
      : { lat: 42.361145, lng: -71.057083 };
  }

  getSelectedSize(str) {
    var sizeDict = { Small: 0, Medium: 1, Large: 2 };
    return sizeDict[str];
  }

  onMapLoad(map) {
    if (map && !this.state.activeSpace) {
      map.fitBounds(this.getBounds());
    }
  }

  getBounds() {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(this.state.location);
    for (var key in this.state.spaces) {
      if (
        this.getSelectedSize(this.state.size) <=
        this.getSpaceSize(this.state.spaces[key])
      ) {
        bounds.extend({
          lat: this.state.spaces[key].lat,
          lng: this.state.spaces[key].lng
        });
      }
    }
    return bounds;
  }

  renderMarkers() {
    var arr = [<Marker defaultPosition={this.state.location} key="pos" />];
    for (var key in this.state.spaces) {
      if (
        this.getSelectedSize(this.state.size) <=
        this.getSpaceSize(this.state.spaces[key])
      ) {
        arr.push(
          <Marker
            key={key}
            icon={{
              url: "/marker_orange.png",
              size: new google.maps.Size(20, 20)
            }}
            defaultPosition={{
              lat: this.state.spaces[key].lat,
              lng: this.state.spaces[key].lng
            }}
          />
        );
      }
    }
    return arr;
  }

  updateMarkers() {
    var firebaseRef = firebase.database().ref("geofire");
    var geoFire = new GeoFire(firebaseRef);

    var geoQuery = geoFire.query({
      center: [this.state.location.lat, this.state.location.lng],
      radius: 10
    });

    geoQuery.on(
      "key_entered",
      function(key) {
        firebase.database().ref("spaces/" + key).on(
          "value",
          function(snapshot) {
            var newSpaces = this.state.spaces;
            newSpaces[key] = snapshot.val();
            this.setState({ spaces: newSpaces });
          }.bind(this)
        );
      }.bind(this)
    );
  }

  handleSuggestSelect(suggest) {
    this.setState(
      {
        spaces: {},
        location: suggest.location
          ? suggest.location
          : this.getDefaultLocation(),
        activeSpace: null
      },
      this.updateMarkers.bind(this)
    );
  }

  handleSizeUpdate(e) {
    this.setState({
      activeSpace: null,
      size: e.target.value
    });
  }

  handleGo(e) {
    var space = null;
    for (var key in this.state.spaces) {
      if (
        this.getSelectedSize(this.state.size) <=
          this.getSpaceSize(this.state.spaces[key]) &&
        (!space ||
          GeoFire.distance(
            [this.state.location.lat, this.state.location.lng],
            [this.state.spaces[key].lat, this.state.spaces[key].lng]
          ) <
            GeoFire.distance(
              [this.state.location.lat, this.state.location.lng],
              [this.state.spaces[space].lat, this.state.spaces[space].lng]
            ))
      ) {
        space = key;
      }
    }
    this.setState({
      activeSpace: space
    });
  }

  render() {
    var SpareMap = withGoogleMap(props =>
      <GoogleMap
        ref={this.onMapLoad.bind(this)}
        defaultZoom={this.state.activeSpace ? 16 : 14}
        defaultCenter={
          this.state.activeSpace
            ? {
                lat: this.state.spaces[this.state.activeSpace].lat,
                lng: this.state.spaces[this.state.activeSpace].lng
              }
            : this.state.location
        }
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
        {this.state.activeSpace &&
          <OverlayView
            position={{
              lat: this.state.spaces[this.state.activeSpace].lat,
              lng: this.state.spaces[this.state.activeSpace].lng
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <SpaceOverlay
              space={this.state.spaces[this.state.activeSpace]}
              selectSpace={this.props.selectSpace.bind(this)}
            />
          </OverlayView>}
        {this.renderMarkers()}
      </GoogleMap>
    );
    return (
      <Row>
        <div className="filters">
          <p>I need a</p>
          <SizePicker handleSizeUpdate={this.handleSizeUpdate.bind(this)} />
          <p>space near</p>
          <Geosuggest onSuggestSelect={this.handleSuggestSelect.bind(this)} />
          <p>from</p>
          <DatePicker
            placeholderText="Start Date"
            selected={this.state.startDate}
            onChange={date => {
              this.setState({ startDate: date });
              this.props.setStartDate(date);
              if (this.state.endDate.diff(date) < 0) {
                this.setState({ endDate: date });
                this.props.setEndDate(date);
              }
            }}
            minDate={moment()}
          />
          <p>to</p>
          <DatePicker
            placeholderText="End Date"
            selected={this.state.endDate}
            onChange={date => {
              this.setState({ endDate: date });
              this.props.setEndDate(date);
            }}
            minDate={this.state.startDate}
          />
          <div>
            <button onClick={this.handleGo.bind(this)}>Find Match</button>
          </div>
        </div>
        <SpareMap
          containerElement={<div className="spareMap" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Row>
    );
  }
}

export default geolocated()(FindSpace);

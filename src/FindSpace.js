/* eslint-disable no-undef */

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import { withGoogleMap, GoogleMap, Marker, OverlayView } from 'react-google-maps';
import {geolocated} from 'react-geolocated';
import * as GeoFire from 'geofire';
import Geosuggest from 'react-geosuggest';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SizePicker from './SizePicker';
import SpaceOverlay from './SpaceOverlay';

import 'react-datepicker/dist/react-datepicker.css';

class FindSpace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spaces: {},
      location: this.getDefaultLocation(),
      activeSpace: null,
      size: "0",
      startDate: moment(),
      endDate: moment()
    };

	this.updateMarkers();
  }

  getDefaultLocation() {
    return this.props.coords ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude } : { lat: 42.361145, lng: -71.057083 };
  }

  onMapLoad(map) {
    if (map) {
      map.fitBounds(this.getBounds());
    }
  }

  getBounds() {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(this.state.location);
    for (var key in this.state.spaces) {
      if (this.state.size <= this.state.spaces[key].size) {
        bounds.extend({ lat: this.state.spaces[key].lat, lng: this.state.spaces[key].lng });
      }
    }
    return bounds;
  }

  renderMarkers() {
    var arr = [<Marker defaultPosition={this.state.location} title="current" />];
    for (var key in this.state.spaces) {
      if (this.state.size <= this.state.spaces[key].size) {
        arr.push(<Marker defaultPosition={{ lat: this.state.spaces[key].lat, lng: this.state.spaces[key].lng }} title={key} />);
      }
    }
    return arr;
  }

  updateMarkers() {
    var firebaseRef = firebase.database().ref('geofire');
    var geoFire = new GeoFire(firebaseRef);

    var geoQuery = geoFire.query({
      center: [this.state.location.lat, this.state.location.lng],
      radius: 5
    });

    geoQuery.on("key_entered", function(key) {
      firebase.database().ref('spaces/' + key).on('value', function(snapshot) {
        this.state.spaces[key] = snapshot.val();
	    this.setState({});
      }.bind(this));
    }.bind(this));
  }

  handleSuggestSelect(suggest) {
    this.setState({
      spaces: {},
      location: suggest.location ? suggest.location : this.getDefaultLocation(),
      activeSpace: null
    }, this.updateMarkers.bind(this));
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
      if (this.state.size <= this.state.spaces[key].size && (!space || GeoFire.distance([this.state.location.lat, this.state.location.lng], [this.state.spaces[key].lat, this.state.spaces[key].lng]) < GeoFire.distance([this.state.location.lat, this.state.location.lng], [this.state.spaces[space].lat, this.state.spaces[space].lng]))) {
        space = key;
      }
    }
    this.setState({
      activeSpace: space
    });
  }

  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap ref={this.onMapLoad.bind(this)} defaultZoom={14} defaultCenter={this.state.location}>
        {this.state.activeSpace &&
          <OverlayView
            position={{ lat: this.state.spaces[this.state.activeSpace].lat, lng: this.state.spaces[this.state.activeSpace].lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <SpaceOverlay space={this.state.spaces[this.state.activeSpace]} selectSpace={this.props.selectSpace.bind(this)} />
          </OverlayView>
        }
        {this.renderMarkers()}
      </GoogleMap>
    ));
    return (
      <div style={{ height: `100vh`, paddingTop: `50px` }}>
        <div className="filters">
          <Geosuggest onSuggestSelect={this.handleSuggestSelect.bind(this)} />
          <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({ startDate: date })} />
          <DatePicker selected={this.state.endDate} onChange={(date) => this.setState({ endDate: date })} />
          <SizePicker handleSizeUpdate={this.handleSizeUpdate.bind(this)} />
          <Button onClick={this.handleGo.bind(this)}>Go</Button>
		</div>
        <SpareMap
          containerElement={ <div style={{ height: `100%` }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    );
  }
}

export default geolocated()(FindSpace);
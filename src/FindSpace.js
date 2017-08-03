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
      size: 'Small',
      startDate: moment(),
      endDate: moment()
    };

	this.updateMarkers();
  }

  getDefaultLocation() {
    return this.props.coords ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude } : { lat: 42.361145, lng: -71.057083 };
  }

  onMapLoad(map) {
    if (map && !this.state.activeSpace) {
      map.fitBounds(this.getBounds());
    }
  }

  getBounds() {
    var sizeDict = { 'Small': 0, 'Medium': 1, 'Large': 2 };
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(this.state.location);
    for (var key in this.state.spaces) {
      if (sizeDict[this.state.size] <= sizeDict[this.state.spaces[key].size]) {
        bounds.extend({ lat: this.state.spaces[key].lat, lng: this.state.spaces[key].lng });
      }
    }
    return bounds;
  }

  renderMarkers() {
    var sizeDict = { 'Small': 0, 'Medium': 1, 'Large': 2 };
    var arr = [<Marker icon={{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/600px-000080_Navy_Blue_Square.svg.png', size: new google.maps.Size(20, 20) }} defaultPosition={this.state.location} title="current" />];
    for (var key in this.state.spaces) {
      if (sizeDict[this.state.size] <= sizeDict[this.state.spaces[key].size]) {
        arr.push(<Marker icon={{ url: 'http://i.imgur.com/9yILi61.png', size: new google.maps.Size(20, 20) }} defaultPosition={{ lat: this.state.spaces[key].lat, lng: this.state.spaces[key].lng }} title={key} />);
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
    var sizeDict = { 'Small': 0, 'Medium': 1, 'Large': 2 };
    var space = null;
    for (var key in this.state.spaces) {
      if (sizeDict[this.state.size] <= sizeDict[this.state.spaces[key].size] && (!space || GeoFire.distance([this.state.location.lat, this.state.location.lng], [this.state.spaces[key].lat, this.state.spaces[key].lng]) < GeoFire.distance([this.state.location.lat, this.state.location.lng], [this.state.spaces[space].lat, this.state.spaces[space].lng]))) {
        space = key;
      }
    }
    this.setState({
      activeSpace: space
    });
  }

  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap
        ref={this.onMapLoad.bind(this)}
        defaultZoom={this.state.activeSpace ? 16 : 14}
        defaultCenter={this.state.activeSpace ? { lat: this.state.spaces[this.state.activeSpace].lat, lng: this.state.spaces[this.state.activeSpace].lng } : this.state.location}
        defaultOptions={{ styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}], mapTypeControl: false, streetViewControl: false }}
      >
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
          <DatePicker
            selected={this.state.startDate}
            onChange={(date) => {
              this.setState({ startDate: date });
              this.props.setStartDate(date);
              if (this.state.endDate.diff(date) < 0) {
                this.setState({ endDate: date });
                this.props.setEndDate(date);
              }
            }}
            minDate={moment()}
          />
          <DatePicker
            selected={this.state.endDate}
            onChange={(date) => {
              this.setState({ endDate: date });
              this.props.setEndDate(date);
            }}
            minDate={this.state.startDate}
          />
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

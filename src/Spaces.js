import React, { Component } from 'react';
import * as firebase from 'firebase';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import {geolocated} from 'react-geolocated';
import * as GeoFire from 'geofire';
import Geosuggest from 'react-geosuggest';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SizePicker from './SizePicker';
import Space from './Space';

import 'react-datepicker/dist/react-datepicker.css';

class Spaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spaces: {},
      location: this.props.coords ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude } : { lat: 42.361145, lng: -71.057083 },
	  size: "0",
      startDate: moment(),
      endDate: moment()
    };

	this.updateMarkers();
  }

  renderMarkers() {
    var arr = [<Marker defaultPosition={this.state.location} title="current" />];
    for (var key in this.state.spaces) {
      if (this.state.size == this.state.spaces[key].size) {
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

    geoQuery.on("key_entered", function(key, location) {
      firebase.database().ref('spaces/' + key).on('value', function(snapshot) {
        this.state.spaces[key] = snapshot.val();
	    this.setState({});
      }.bind(this));
    }.bind(this));
  }

  handleSuggestSelect(suggest) {
    this.setState({
      spaces: {},
      location: suggest.location
    }, this.updateMarkers.bind(this));
  }

  handleSizeUpdate(e) {
    this.setState({
      size: e.target.value
    });
  }

  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} defaultCenter={this.state.location}>
        {this.renderMarkers()}
      </GoogleMap>
    ));
    return (
      <div style={{ height: `100vh`, paddingTop: `50px` }}>
        <div className="filters">
          <Geosuggest onSuggestSelect={this.handleSuggestSelect.bind(this)} />
          <DatePicker selected={this.state.startDate} />
          <DatePicker selected={this.state.endDate} />
          <SizePicker handleSizeUpdate={this.handleSizeUpdate.bind(this)} />
		</div>
        <SpareMap
          containerElement={ <div style={{ height: `100%` }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    );
  }
}

export default geolocated()(Spaces);

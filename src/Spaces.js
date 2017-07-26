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
      location: this.props.coords ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude } : null,
      startDate: moment(),
      endDate: moment()
    };
  }

  renderMarkers() {
    var arr = [<Marker defaultPosition={this.state.location} title="current" />];
    for (var key in this.state.spaces) {
      arr.push(<Marker defaultPosition={{ lat: this.state.spaces[key].lat, lng: this.state.spaces[key].lng }} title={key} />);
    }
    return arr;
  }

  handleSuggestSelect(suggest) {
    this.setState({
		location: suggest.location,
		spaces: null
    });

    var firebaseRef = firebase.database().ref('spaces');
    var geoFire = new GeoFire(firebaseRef);

    var geoQuery = geoFire.query({
      center: [this.state.location.lat, this.state.location.lng],
      radius: 10
    });

    geoQuery.on("key_entered", function(key, location) {
      this.state.spaces[key] = { lat: location[0], lng: location[1] };
    });

    geoQuery.on("key_exited", function(key, location) {
      delete this.state.spaces[key];
    });
  }

  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} defaultCenter={this.state.location || { lat: 42.361145, lng: -71.057083 }}>
        {this.renderMarkers()}
      </GoogleMap>
    ));
    return (
      <div style={{ height: `100vh`, paddingTop: `50px` }}>
        <div className="filters">
          <Geosuggest onSuggestSelect={this.handleSuggestSelect.bind(this)} />
          <DatePicker selected={this.state.startDate} />
          <DatePicker selected={this.state.endDate} />
          <SizePicker />
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

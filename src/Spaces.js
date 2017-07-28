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
import Space from './Space';

import 'react-datepicker/dist/react-datepicker.css';

class Spaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spaces: {},
      location: this.props.coords ? { lat: this.props.coords.latitude, lng: this.props.coords.longitude } : { lat: 42.361145, lng: -71.057083 },
      activeSpace: null,
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
      location: suggest.location,
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
      if (this.state.size == this.state.spaces[key].size && (!space || GeoFire.distance([this.state.location.lat, this.state.location.lng], [this.state.spaces[key].lat, this.state.spaces[key].lng]) < GeoFire.distance([this.state.location.lat, this.state.location.lng], [this.state.spaces[space].lat, this.state.spaces[space].lng]))) {
        space = key;
      }
    }
    this.setState({
      activeSpace: space
    });
  }

  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={14} defaultCenter={this.state.location}>
        {this.state.activeSpace &&
          <OverlayView
            position={{ lat: this.state.spaces[this.state.activeSpace].lat, lng: this.state.spaces[this.state.activeSpace].lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <Space space={this.state.spaces[this.state.activeSpace]} />
          </OverlayView>
        }
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

export default geolocated()(Spaces);

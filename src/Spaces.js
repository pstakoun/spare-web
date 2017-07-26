import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
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
      spaces: null,
      location: null,
      startDate: moment(),
      endDate: moment()
    };
    firebase.database().ref('spaces').orderByKey().once('value').then((snapshot) =>
      this.setState({
        spaces: snapshot.val()
      })
    );
  }

  renderMarkers() {
    var arr = [];
    for (var key in this.state.spaces) {
      arr.push(<Marker defaultPosition={{ lat: this.state.spaces[key].lat, lng: this.state.spaces[key].lng }} title={key} />);
    }
    return arr;
  }

  updateLocation(suggest) {
    this.setState({
      location: suggest.location
    });
  }

  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {this.renderMarkers()}
      </GoogleMap>
    ));
    return (
      <div style={{ height: `100vh`, paddingTop: `50px` }}>
        <div className="filters">
          <Geosuggest ref={el=>this.geoSuggest=el} onSuggestSelect={this.updateLocation.bind(this)} />
          <DatePicker selected={this.state.startDate} />
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

export default Spaces;

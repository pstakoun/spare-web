import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} />
    ));
    return (
      <SpareMap
        containerElement={
          <Row/>
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    );
  }
}

export default Map;

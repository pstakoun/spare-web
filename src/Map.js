import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
  render() {
    return (
      <Row>
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} />
      </Row>
    );
  }
}

export default Map;

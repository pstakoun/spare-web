import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} />
    ));
    return (
      <div>
        <Col sm={6}>
          <h2>List</h2>
        </Col>
        <SpareMap
          containerElement={ <Col sm={6} /> }
          mapElement={ <div style={{ height: `100vh` }} /> }
        />
      </div>
    );
  }
}

export default Map;

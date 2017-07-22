import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: null
    }
    firebase.database().ref('spaces').on('value', function(snapshot) {
      this.setState({
        spaces: snapshot.val()
      });
    });
  }

  renderSpaces() {
    return JSON.stringify(this.state.spaces);
  }

  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} />
    ));
    return (
      <div>
        <Col sm={6}>
          <h2>List</h2>
          {this.renderSpaces()}
        </Col>
        <SpareMap
          containerElement={ <Col sm={6} /> }
          mapElement={ <div style={{ height: `100vh` }} /> }
        />
      </div>
    );
  }
}

export default Spaces;

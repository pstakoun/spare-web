import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Space from './Space';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: null
    }
    var that = this;
    firebase.database().ref('spaces').orderByKey().once('value').then(function(snapshot) {
      that.setState({
        spaces: snapshot.val()
      });
    });
  }

  renderMarkers() {
    var arr = [];
    for (var key in this.state.spaces) {
      arr.push(<Marker defaultPosition={{ lat: this.state.spaces[key].lat, lng: this.state.spaces[key].lng }} title={key} />);
    }
    return arr;
  }

  renderSpaces() {
    var arr = [];
    for (var key in this.state.spaces) {
      arr.push(<Space space={this.state.spaces[key]} />);
    }
    return arr;
  }

  render() {
    var SpareMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {this.renderMarkers()}
      </GoogleMap>
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

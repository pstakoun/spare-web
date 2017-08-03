import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class SpaceListing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null
    }
  }

  componentDidMount() {
    firebase.database().ref('spaces/' + this.props.space.spaceId).on('value', function(snapshot) {
      this.setState({ space: snapshot.val(), location: { lat: snapshot.val().lat, lng: snapshot.val().lng}});
    }.bind(this));
  }

  handleImg() {
    firebase.storage().refFromURL(this.props.space.photoURL).getDownloadURL().then(function(url) {
      document.querySelector('img').src = url;
    }).catch(function(error) {
      console.error(error);
    });
  }

  renderLocation() {
    return [<Marker defaultPosition={this.state.location} title="" />];
  }

  render() {

    const SpareMap = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={this.state.location}
        defaultOptions={{ styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}], mapTypeControl: false, streetViewControl: false }}
      >
        {this.renderLocation()}
      </GoogleMap>
    ));

    let has_lock_local, has_insurance_local, all_access_local, climate_control_local = null;

    if (this.props.space.has_lock) {
      has_lock_local = [<h5> Has Security Locks </h5>];
    }
    if (this.props.space.has_insurance) {
      has_insurance_local = [<h5> Has Insurance Plans </h5>];
    }
    if (this.props.space.all_access) {
      all_access_local = [<h5> 24/7 Access </h5>];
    }
    if (this.props.space.climate_control) {
      climate_control_local = [<h5> Has Climate Control System </h5>];
    }

    return (
      <div>
        <Col xs={12} md={4}>
          <SpareMap
            containerElement={ <div style={{ height: '15vw' }} /> }
            mapElement={ <div style={{ height: '15vw' }} /> }
          />
        </Col>
        <Col xs={12} md={3}>
		      <p className="p-title">Listing Address</p>
          <p className="p-body">{this.props.space.address}</p>
          <Col xs={12} md={6} className="col-no-padding">
            <p className="p-title">Type</p>
            <p className="p-body">{this.props.space.type}</p>
          </Col>
          <Col xs={12} md={6} className="col-no-padding">
            <p className="p-title">Size</p>
            <p className="p-body">{this.props.space.size}</p>
          </Col>
        </Col>
        <Col xs={12} md={3}>
          <p className="p-title">Features</p>
            {has_lock_local}
            {has_insurance_local}
            {all_access_local}
            {climate_control_local}
        </Col>
        <Col xs={12} md={2}>
          <Link to='/spaces/manage' onClick={() => this.props.editSpace(this.state.space)} className="btn btn-default btn-info">Manage Booking</Link>
          <Link to='/spaces/edit' onClick={() => this.props.editSpace(this.state.space)} className="btn btn-default">Edit Info</Link>
        </Col>
      </div>
    );
  }
}

export default SpaceListing;

import React, { Component } from 'react';
import { Panel, Col } from 'react-bootstrap';
import * as firebase from 'firebase';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class TransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space: null,
      location: null
    }
  }

  componentDidMount() {
    firebase.database().ref('spaces/' + this.props.trans.spaceId).on('value', function(snapshot) {
      this.setState({ space: snapshot.val(), location: { lat: snapshot.val().lat, lng: snapshot.val().lng}});
    }.bind(this));
  }

  handleImg() {
    firebase.storage().refFromURL("gs://decentralizedps.appspot.com/images/"+ this.props.trans.spaceId + ".jpg").getDownloadURL().then(function(url) {
      document.querySelector('.space-overlay').src = url;
      console.log("succeeded" + url);
    }).catch(function(error) {
      console.error(error);
    });
  }

  renderLocation() {
    return [<Marker defaultPosition={this.state.location} title="current" />];
  }

  getSize(length, width, height) {
    if (length >= 8 && width >= 8 && height >= 6) { return 'Large'; }
    else if (length >= 5 && width >= 5 && height >= 6) { return 'Medium'; }
    else { return 'Small'; }
  }

  getSpaceSize(space) {
    return this.getSize(space.length, space.width, space.height);
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

    var transAmount = this.props.trans.charge.amount / 100;

    return (
      <Panel className="transPanel">
        <Col xs={12} md={4}>
          <SpareMap
            containerElement={ <div style={{ height: '15vw' }} /> }
            mapElement={ <div style={{ height: '15vw' }} /> }
          />
        </Col>
        <Col xs={12} md={4}>
          <p className="p-title">Location</p>
          <p className="p-body">{this.state.space ? this.state.space.address : null}</p>
          <p className="p-title">Duration</p>
          <p className="p-body">{this.props.trans.duration} Days</p>
          <p className="p-title">Size</p>
          <p className="p-body">{this.state.space ? this.getSpaceSize(this.state.space) : null}</p>
        </Col>
        <Col xs={12} md={4}>
          <p className="p-title">Transaction Timestamp</p>
          <p className="p-body">{this.props.trans.time}</p>
          <p className="p-title">Payment Method</p>
          <p className="p-body">{this.props.trans.charge.source.brand} {this.props.trans.charge.source.last4}</p>
          <p className="p-title">Amount</p>
          <p className="p-body">USD$ {transAmount}</p>
        </Col>
      </Panel>
    );
  }
}

export default TransactionDetails;

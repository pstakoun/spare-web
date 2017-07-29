import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import * as firebase from 'firebase';

class SpaceDetails extends Component {
  handleImg() {
    firebase.storage().refFromURL(this.props.space.photoURL).getDownloadURL().then(function(url) {
      document.querySelector('img').src = url;
    }).catch(function(error) {
      console.error(error);
    });
  }

  render() {
    {this.handleImg()}
    return (
      <Panel>
        <img className="img-responsive center-block" />
		<p>{this.props.space.address}</p>
      </Panel>
    );
  }
}

export default SpaceDetails;

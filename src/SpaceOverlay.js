import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import * as firebase from 'firebase';

class SpaceOverlay extends Component {
  handleImg() {
    firebase.storage().refFromURL(this.props.space.photoURL).getDownloadURL().then(function(url) {
      document.querySelector('.space-overlay').src = url;
    }).catch(function(error) {
      console.error(error);
    });
  }

  handleGo(e) {
    this.props.selectSpace(this.props.space);
  }

  render() {
    {this.handleImg()}
    return (
      <Panel>
        <img className="center-block space-overlay" style={{ width: `500px` }} />
		<p>{this.props.space.address}</p>
		<Button onClick={this.handleGo.bind(this)}>Go</Button>
      </Panel>
    );
  }
}

export default SpaceOverlay;

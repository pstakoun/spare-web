import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import * as firebase from 'firebase';

class SpaceDetails extends Component {

  handleImg() {
    firebase.storage().refFromURL(this.props.space.photoURL).getDownloadURL().then(function(url) {
      document.querySelector('.cover-image').src = url;
    }).catch(function(error) {
      console.error(error);
    });
  }

  render() {

    let has_lock_local, has_insurance_local, all_access_local, climate_control_local = null;

    if (this.props.space.has_lock) {
      has_lock_local = [<p> Has Security Locks </p>];
    }
    if (this.props.space.has_insurance) {
      has_insurance_local = [<p> Has Insurance Plans </p>];
    }
    if (this.props.space.all_access) {
      all_access_local = [<p> 24/7 Access </p>];
    }
    if (this.props.space.climate_control) {
      climate_control_local = [<p> Has Climate Control System </p>];
    }

    {this.handleImg()}
    return (
      <Panel className="spaceinfo">
        <img className="img-responsive center-block cover-image" />
		    <p>{this.props.space.address}</p>
        <hr/>
        {has_lock_local}
        {has_insurance_local}
        {all_access_local}
        {climate_control_local}
        <hr/>

      </Panel>
    );
  }
}

export default SpaceDetails;

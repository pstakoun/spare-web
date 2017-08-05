import React, { Component } from 'react';
import { Button, Col, Row, Panel } from 'react-bootstrap';
import * as firebase from 'firebase';

class SpaceOverlay extends Component {
  handleImg() {
    firebase.storage().refFromURL(this.props.space.photoURL).getDownloadURL().then(function(url) {
      document.querySelector('.space-overlay').src = url;
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
      <Panel style={{ width: `30vw` }}>
        <Row style={{ padding: `none` }}>
          <p style={{ fontSize: `1.5em` }}>{this.props.space.address}</p>
        </Row>
        <Row>
          <Col xs={6} style={{ padding: `none` }}>
            <img className="img-responsive space-overlay" style={{ maxWidth: `100%` }} />
          </Col>
          <Col xs={6} style={{ padding: `none`, textAlign: `left` }}>
            <p style={{ fontSize: `1.2em`, fontWeight: `400` }}> Features </p>
            {has_lock_local}
            {has_insurance_local}
            {all_access_local}
            {climate_control_local}
            <hr/>
            <p style={{ fontSize: `1.2em`, fontWeight: `400` }}> Contact </p>
            {this.props.space.contactNum}
          </Col>
        </Row>
        <Row>
          <Button style={{ marginTop: `1vh`, width: `40%` }} onClick={() => this.props.selectSpace(this.props.space)}>Book this Space</Button>
        </Row>
      </Panel>
    );
  }
}

export default SpaceOverlay;

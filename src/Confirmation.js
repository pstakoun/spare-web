import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Payment from './Payment';
import SpaceDetails from './SpaceDetails';
import * as firebase from 'firebase';
import RandomString from 'randomstring';
import moment from 'moment';

class Confirmation extends Component {

  handlePayment (event) {
    event.preventDefault();

    firebase.database().ref('trans/' + RandomString.generate(28)).set({
      time: moment().format(),
      userId: firebase.auth().currentUser.uid,
      spaceId: this.props.space.spaceId,
      paymentToken: ""
    });
  }

  render() {
    return (
      <div style={{ paddingTop: `50px` }}>
	    <Row>
		  <Col lg={12}>
            <h1>Confirm</h1>
		  </Col>
		  <Col sm={6}>
		    <Payment />
		  </Col>
		  <Col sm={6}>
		    <SpaceDetails space={this.props.space} />
		  </Col>
		  <Col lg={12}>
	        <Button onClick={this.handlePayment.bind(this)}>Go</Button>
	        <Button onClick={() => this.props.selectSpace(null)}>Cancel</Button>
		  </Col>
		</Row>
      </div>
    );
  }
}

export default Confirmation;

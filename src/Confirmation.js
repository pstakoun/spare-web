/* eslint-disable no-undef */

import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Payment from './Payment';
import SpaceDetails from './SpaceDetails';
import * as firebase from 'firebase';
import RandomString from 'randomstring';
import moment from 'moment';

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentCompleted: false
    };
  }

  handlePayment(token) {
    $.post('/charge', { stripeToken: token, spaceId: this.props.space.spaceId, startDate: this.props.startDate.format(), endDate: this.props.endDate.format() }, (data) => {
      if (data.status === 'succeeded') {
        firebase.database().ref('trans/' + RandomString.generate(28)).set({
          time: moment().format(),
          userId: firebase.auth().currentUser.uid,
          spaceId: this.props.space.spaceId,
          charge: data
        }, () => this.setState({ paymentCompleted: true }));
      }
    });
  }

  render() {
    return (
      <div style={{ paddingTop: `50px` }}>
        {this.props.space ? null : <Redirect to='/' push />}
        {this.state.paymentCompleted && <Redirect to='/history' push />}
	    <Row>
		  <Col lg={12}>
            <h1>Confirm</h1>
		  </Col>
		  <Col sm={6}>
		    <Payment handlePayment={this.handlePayment.bind(this)} />
		  </Col>
		  <Col sm={4}>
		    <SpaceDetails space={this.props.space} />
		  </Col>
		  <Col lg={12}>
	        <Link to='/' onClick={this.props.deselectSpace.bind(this)} className='btn btn-default'>Cancel</Link>
		  </Col>
		</Row>
      </div>
    );
  }
}

export default Confirmation;

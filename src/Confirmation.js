import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Payment from './Payment';
import SpaceDetails from './SpaceDetails';

class Confirmation extends Component {
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
	        <Button onClick={() => this.props.selectSpace(null)}>Go</Button>
	        <Button onClick={() => this.props.selectSpace(null)}>Cancel</Button>
		  </Col>
		</Row>
      </div>
    );
  }
}

export default Confirmation;

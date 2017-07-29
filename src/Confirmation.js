import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
		    <h2>Payment</h2>
		  </Col>
		  <Col sm={6}>
		    <SpaceDetails space={this.props.space} />
		  </Col>
		</Row>
	    <Button onClick={() => this.props.selectSpace(null)}>Cancel</Button>
      </div>
    );
  }
}

export default Confirmation;

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Confirmation extends Component {
  render() {
    return (
      <div style={{ paddingTop: `50px` }}>
        <h1>Confirm</h1>
	    <Button onClick={() => this.props.selectSpace(null)}>Cancel</Button>
      </div>
    );
  }
}

export default Confirmation;

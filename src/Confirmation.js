import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Confirmation extends Component {
  render() {
    return (
      <div>
        <h1>{JSON.stringify(this.props.space)}</h1>
	    <Button onClick={() => this.props.selectSpace(null)}>Cancel</Button>
      </div>
    );
  }
}

export default Confirmation;

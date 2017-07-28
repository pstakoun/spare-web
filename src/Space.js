import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

class Space extends Component {
  render() {
    return (
      <Panel>
        <img src={this.props.space.photoURL} className="img-responsive center-block" />
		<Button>Go</Button>
      </Panel>
    );
  }
}

export default Space;

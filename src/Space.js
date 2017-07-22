import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Space extends Component {
  render() {
    return (
      <Panel>
        <img src={this.props.space.photoURL} className="img-responsive center-block" />
      </Panel>
    );
  }
}

export default Space;

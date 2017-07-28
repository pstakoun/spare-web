import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

class Space extends Component {
  handleGo(e) {
    this.props.selectSpace(this.props.space);
  }

  render() {
    return (
      <Panel>
        <img src={this.props.space.photoURL} className="img-responsive center-block" />
		<Button onClick={this.handleGo.bind(this)}>Go</Button>
      </Panel>
    );
  }
}

export default Space;

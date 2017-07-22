import React, { Component } from 'react';

class Space extends Component {
  render() {
    return (
      <img src={this.props.space.photoURL} style={{ width: `100px` }} />
    );
  }
}

export default Space;

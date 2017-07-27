import React, { Component } from 'react';

class SizePicker extends Component {
  render() {
    return (
      <select onChange={this.props.handleSizeUpdate}>
        <option value="0">Small</option>
        <option value="1">Medium</option>
        <option value="2">Large</option>
      </select>
    );
  }
}

export default SizePicker;

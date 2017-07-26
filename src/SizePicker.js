import React, { Component } from 'react';

class SizePicker extends Component {
  render() {
    return (
      <select>
        <option value="1">Small</option>
        <option value="2">Medium</option>
        <option value="3">Large</option>
      </select>
    );
  }
}

export default SizePicker;

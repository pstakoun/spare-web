import React, { Component } from "react";

class SizePicker extends Component {
  render() {
    return (
      <div>
        <select onChange={this.props.handleSizeUpdate}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
    );
  }
}

export default SizePicker;

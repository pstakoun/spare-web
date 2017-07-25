import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class SizePicker extends Component {
  render() {
    return (
      <DropdownButton title={'test'}>
        <MenuItem eventKey="1">test</MenuItem>
      </DropdownButton>
    );
  }
}

export default SizePicker;

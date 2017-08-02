import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import * as firebase from 'firebase';

class DurationDetails extends Component {

  render() {
    return (
      <Panel className="spaceinfo">
        <p> {this.props.state.startDate} </p>
        <p> {this.props.state.endDate} </p>
      </Panel>
    );
  }
}

export default DurationDetails;

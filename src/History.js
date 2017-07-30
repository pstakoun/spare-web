import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  trans: {}
    };
  }

  render() {
    return (
        <div style={{ paddingTop: `50px` }}>
            <h4>HISTORY</h4>
        </div>
    );
  }
}

export default History;

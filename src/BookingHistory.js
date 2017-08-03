import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import { Table, Col } from 'react-bootstrap';
import BookingDetails from './BookingDetails';

class BookingHistory extends Component  {
  constructor(props) {
    super(props);
    this.state = {
	    trans: null,
      spaceId: this.props.space.spaceId
    };
  }

  componentDidMount() {
    firebase.database().ref('trans/').orderByChild('spaceId').equalTo(this.state.spaceId).on('value', (snapshot) => {
      this.setState({ trans: snapshot.val() });
    });
  }

  renderBookingHistory() {
    var arr = [];
    for (var key in this.state.trans) {
      arr.push(<Col md={12}><BookingDetails trans={this.state.trans[key]} /></Col>);
      setTimeout(1000);
    }
    return arr;
  }

  render() {
    return (
      <div style={{ paddingTop: `50px` }}>
        <h4>BOOKING HISTORY</h4>
        {this.renderBookingHistory()}
      </div>
    );
  }
}

export default BookingHistory;

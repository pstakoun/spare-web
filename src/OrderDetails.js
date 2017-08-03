/* eslint-disable no-undef */

import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import * as firebase from 'firebase';
import moment from 'moment';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
  }

  handleImg() {
    firebase.storage().refFromURL(this.props.space.photoURL).getDownloadURL().then(function(url) {
      document.querySelector('.cover-image').src = url;
    }).catch(function(error) {
      console.error(error);
    });
  }

  getPrice() {
    $.post('/price', { spaceId: this.props.space.spaceId, startDate: this.props.startDate.format(), endDate: this.props.endDate.format() }, (data) => {
      return data;
    });
  }

  render() {

    let has_lock_local, has_insurance_local, all_access_local, climate_control_local = null;

    if (this.props.space.has_lock) {
      has_lock_local = [<p> Has Security Locks </p>];
    }
    if (this.props.space.has_insurance) {
      has_insurance_local = [<p> Has Insurance Plans </p>];
    }
    if (this.props.space.all_access) {
      all_access_local = [<p> 24/7 Access </p>];
    }
    if (this.props.space.climate_control) {
      climate_control_local = [<p> Has Climate Control System </p>];
    }
    var transAmount = Number(this.getPrice()) / 100;
    console.log(this.getPrice());
    {this.handleImg()}
    {this.getPrice()}
    return (
      <Panel className="orderPanel">
        <h3>Your Order Confirmation</h3>
        <img className="img-responsive center-block cover-image" />
		    <h4>{this.props.space.address}</h4>
        <hr/>
        <h4>Features</h4>
        {has_lock_local}
        {has_insurance_local}
        {all_access_local}
        {climate_control_local}
        <hr/>
        <h4>Duration</h4>
        {moment(this.props.endDate).diff(moment(this.props.startDate), 'days') + 1}
        <hr/>
        <h4>Price</h4>
        {transAmount}
      </Panel>
    );
  }
}

export default OrderDetails;

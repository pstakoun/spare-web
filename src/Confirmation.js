/* eslint-disable no-undef */

import React, { Component } from "react";
import { Button, Col, Row, Panel } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Payment from "./Payment";
import OrderDetails from "./OrderDetails";
import * as firebase from "firebase";
import RandomString from "randomstring";
import moment from "moment";

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentCompleted: false
    };
  }

  handlePayment(token) {
    $.post(
      "/charge",
      {
        stripeToken: token,
        spaceId: this.props.space.spaceId,
        startDate: this.props.startDate.format(),
        endDate: this.props.endDate.format()
      },
      data => {
        if (data.status === "succeeded") {
          firebase.database().ref("trans/" + RandomString.generate(28)).set({
            time: moment().format(),
            userId: firebase.auth().currentUser.uid,
            spaceId: this.props.space.spaceId,
            charge: data,
            duration:
              moment(this.props.endDate).diff(
                moment(this.props.startDate),
                "days"
              ) + 1
          }, () => this.setState({ paymentCompleted: true }));
        }
      }
    );
  }

  render() {
    return (
      <div style={{ paddingTop: `50px` }}>
        {this.props.space ? null : <Redirect to="/" push />}
        {this.state.paymentCompleted && <Redirect to="/history" push />}
        <h4>CONFIRM</h4>
        <OrderDetails
          space={this.props.space}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />
        <Payment handlePayment={this.handlePayment.bind(this)} />
        <Link
          to="/"
          onClick={this.props.deselectSpace.bind(this)}
          className="btn-cancel"
        >
          Cancel Transaction
        </Link>
      </div>
    );
  }
}

export default Confirmation;
